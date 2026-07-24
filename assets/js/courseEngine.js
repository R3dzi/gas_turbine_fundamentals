(function() {
    'use strict';

    // --- CONFIG ---
    var COURSE_ID = new URLSearchParams(window.location.search).get('course') || 'ignition';
    var STORAGE_KEY = 'ite_course_' + COURSE_ID;

    // --- SVG ICONS (default + from course) ---
    var DEFAULT_ICONS = {
        'default': '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="24"/><path d="M32 16v32M16 32h32"/></svg>',
        'check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        'arrow-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
        'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
        'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        'unlock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
        'skip': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
        'help-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    };

    function getIcon(id, sizeClass) {
        sizeClass = sizeClass || '';
        var icons = Object.assign({}, DEFAULT_ICONS, (window.COURSE_DATA && window.COURSE_DATA.icons) || {});
        var svg = icons[id] || icons['default'];
        return '<div class="component-icon ' + sizeClass + '">' + svg + '</div>';
    }

    function getDiagramIcon(id) {
        var icons = Object.assign({}, DEFAULT_ICONS, (window.COURSE_DATA && window.COURSE_DATA.icons) || {});
        var svg = icons[id] || icons['default'];
        return '<div class="diagram-node__icon">' + svg + '</div>';
    }

    // --- PERSISTENCE ---
    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                modules: state.modules.map(function(m) { return { id: m.id, unlocked: m.unlocked, completed: m.completed }; }),
                view: state.view,
                currentModuleId: state.currentModuleId
            }));
        } catch (e) {
            console.warn('Failed to save state', e);
        }
    }

    function loadState() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function clearState() {
        localStorage.removeItem(STORAGE_KEY);
    }

    // --- ACCESSIBILITY ---
    function setInitialFocus(container) {
        if (!container) return;
        setTimeout(function() {
            var focusable = container.querySelector('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) focusable.focus();
        }, 100);
    }

    // --- UI HELPERS ---
    function renderProgressBar(modules) {
        var completed = modules.filter(function(m) { return m.completed; }).length;
        var total = modules.length;
        var pct = Math.round((completed / total) * 100);
        return '<div class="progress-bar" aria-label="Postep kursu: ukonczono ' + completed + ' z ' + total + ' modulow">' +
            '<div class="progress-bar__track" role="progressbar" aria-valuenow="' + completed + '" aria-valuemin="0" aria-valuemax="' + total + '">' +
                '<div class="progress-bar__fill" style="width: ' + pct + '%"></div>' +
            '</div>' +
            '<span class="progress-bar__label">' + completed + '/' + total + '</span>' +
        '</div>';
    }

    function renderStepIndicator(current, total, labels) {
        labels = labels || [];
        var html = '<div class="step-indicator" aria-label="Krok ' + current + ' z ' + total + '" style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 2rem; flex-wrap: wrap;">';
        for (var i = 1; i <= total; i++) {
            var isActive = i === current;
            var isDone = i < current;
            var color = isActive ? 'var(--accent, #2563eb)' : (isDone ? 'var(--success, #16a34a)' : 'var(--border, #d1d5db)');
            var bg = isActive ? 'var(--accent, #2563eb)' : (isDone ? 'var(--success, #16a34a)' : 'transparent');
            var textColor = isActive || isDone ? '#fff' : 'var(--text-secondary, #6b7280)';
            var label = labels[i - 1] || ('Krok ' + i);
            html += '<div style="display: flex; align-items: center; gap: 8px;">' +
                '<div style="width: 28px; height: 28px; border-radius: 50%; background: ' + bg + '; border: 2px solid ' + color + '; color: ' + textColor + '; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0;">' + (isDone ? '&#10003;' : i) + '</div>' +
                '<span style="font-size: 0.8125rem; font-weight: 600; color: ' + (isActive ? 'var(--text-primary, #111827)' : 'var(--text-secondary, #6b7280)') + ';">' + label + '</span>' +
                '</div>';
            if (i < total) {
                html += '<div style="width: 24px; height: 2px; background: ' + (isDone ? 'var(--success, #16a34a)' : 'var(--border, #e5e7eb)') + '; flex-shrink: 0;"></div>';
            }
        }
        html += '</div>';
        return html;
    }

    function renderModuleCard(module, index, allModules) {
        var locked = !module.unlocked;
        var completed = module.completed;

        var prereqInfo = '';
        if (locked && index > 0) {
            var prevModule = allModules[index - 1];
            if (prevModule && !prevModule.completed) {
                prereqInfo = 'Ukoncz modul "' + prevModule.title.replace(/<[^>]*>/g, ' ') + '"';
            }
        }

        var statusClass = completed ? 'done' : locked ? 'locked' : 'available';
        var statusText = completed ? 'ukończony' : locked ? 'Zablokowany' : 'Dostepny';
        var btnText = locked ? 'Zablokowany' : completed ? 'Powtorz' : 'Rozpocznij';
        var btnClass = completed ? 'primary' : (locked ? 'disabled' : '');
        var iconId = locked ? 'lock' : module.id;
        var lockBadge = locked ? '<div style="position: absolute; top: 12px; right: 12px; color: var(--text-muted, #9ca3af);">' + DEFAULT_ICONS.lock + '</div>' : '';
        const displayTitle = locked
            ? 'Nazwa części niedostępna'
            : module.title;
            
        return `
        <article class="course-card ${statusClass}" 
            data-module-id="${module.id}"
            role="button"
            tabindex="${locked ? '-1':'0'}"
            style="position: relative; transition: transform 150ms ease, box-shadow 150ms ease;">

            ${lockBadge}

            <div style="
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                gap:1rem;
                padding:1rem 0;
            ">
            
                <div style="
                    text-align: center;
                    font-size: 0.95rem;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-bottom: 0.5rem;
                    color: var(--text-primary, #111827);
                ">
                    ${displayTitle}
                </div>

            <div class="course-icon">
                ${getIcon(iconId)}
            </div>

                <div style="
                    width: 100%;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: ${locked ? 'var(--text-muted, #9ca3af)' : (completed ? 'var(--success, #16a34a)' : 'var(--accent, #2563eb)')};
                ">
                    ${statusText}
                </div>

</div>

        </article>
        `;
    }

    function renderQuestionCard(question, options, stageLabel, attemptInfo) {
        stageLabel = stageLabel || '';
        attemptInfo = attemptInfo || '';
        var letters = ['A', 'B', 'C'];
        var optionsHtml = options.map(function(opt, i) {
            return '<button class="answer-button" data-index="' + i + '" role="radio" aria-checked="false" aria-label="Opcja ' + letters[i] + ': ' + opt + '">' +
                '<span class="answer-button__letter" aria-hidden="true">' + '</span>' +
                '<span class="answer-button__text">' + opt + '</span>' +
            '</button>';
        }).join('');
        return '<div class="question-card">' +
            (stageLabel ? '<span class="question-card__counter">' + stageLabel + '</span>' : '') +
            (attemptInfo ? '<div style="margin-bottom: 0.75rem; font-size: 0.8125rem; font-weight: 600; color: var(--warning, #d97706);">' + attemptInfo + '</div>' : '') +
            '<h2 class="question-card__title" style="font-size: 1.25rem; line-height: 1.4; margin-bottom: 1.5rem;">' + question + '</h2>' +
            '<div class="answers-list" role="radiogroup" aria-label="Opcje odpowiedzi">' + optionsHtml + '</div>' +
        '</div>';
    }

    function updateAnswerButtonState(btn, state) {
        btn.classList.remove('answer-button--selected', 'answer-button--correct', 'answer-button--incorrect', 'answer-button--revealed');
        btn.setAttribute('aria-checked', 'false');
        if (state === 'selected') {
            btn.classList.add('answer-button--selected');
            btn.setAttribute('aria-checked', 'true');
        } else if (state === 'correct') {
            btn.classList.add('answer-button--correct');
            btn.setAttribute('aria-checked', 'true');
        } else if (state === 'incorrect') {
            btn.classList.add('answer-button--incorrect');
        } else if (state === 'revealed') {
            btn.classList.add('answer-button--revealed');
        }
        btn.disabled = (state !== 'default' && state !== 'selected');
    }

    function renderExplanationCard(explanation, isCorrect) {
        var borderColor = isCorrect ? 'var(--success, #16a34a)' : 'var(--warning, #d97706)';
        var bgColor = isCorrect ? 'rgba(22, 163, 74, 0.06)' : 'rgba(217, 119, 6, 0.06)';
        var title = isCorrect ? 'Dobrze!' : 'Wyjasnienie';
        var icon = isCorrect ? '&#10003;' : '&#9432;';
        return '<div class="explanation-card" role="alert" aria-live="polite" style="border-left: 4px solid ' + borderColor + '; background: ' + bgColor + '; padding: 1.25rem; border-radius: 0 8px 8px 0; margin-top: 1.5rem;">' +
            '<div class="explanation-card__title" style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: ' + borderColor + '; margin-bottom: 0.5rem;">' +
                '<span style="font-size: 1.125rem;">' + icon + '</span>' + title +
            '</div>' +
            '<p class="explanation-card__text" style="line-height: 1.6; color: var(--text-secondary, #4b5563);">' + explanation + '</p>' +
        '</div>';
    }

    function renderSketchImage(id, caption) {
        caption = caption || '';
        return '<figure class="sketch-image">' +
            getIcon(id, 'sketch-icon') +
            (caption ? '<figcaption class="sketch-image__caption">' + caption + '</figcaption>' : '') +
        '</figure>';
    }

    function renderNavigationFooter(cfg) {
        cfg = cfg || {};
        var prev = cfg.prev || null;
        var next = cfg.next || null;

        var prevHtml = prev
            ? '<button class="nav-button ' + (prev.primary ? 'nav-button--primary' : '') + '" id="nav-prev" ' +
                (prev.disabled ? 'disabled' : '') +
                ' aria-label="' + (prev.label || 'Poprzedni') + '" style="' + (prev.style || '') + '">' +
                (prev.icon ? prev.icon + ' ' : '') + (prev.label || 'Poprzedni') +
              '</button>'
            : '<div></div>';

        var nextHtml = next
            ? '<button class="nav-button ' + (next.primary ? 'nav-button--primary' : '') + '" id="nav-next" ' +
                (next.disabled ? 'disabled' : '') +
                ' aria-label="' + (next.label || 'Nastepny') + '" style="' + (next.style || '') + '">' +
                (next.label || 'Nastepny') + (next.icon ? ' ' + next.icon : '') +
              '</button>'
            : '<div></div>';

        var centerHtml = cfg.center
            ? '<button class="nav-button ' + (cfg.center.primary ? 'nav-button--primary' : '') + '" id="nav-center" ' +
                (cfg.center.disabled ? 'disabled' : '') +
                ' style="' + (cfg.center.style || '') + '">' +
                (cfg.center.icon ? cfg.center.icon + ' ' : '') + cfg.center.label +
              '</button>'
            : '';

        return '<div class="navigation-footer-inner" style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">' +
            prevHtml +
            centerHtml +
            nextHtml +
        '</div>';
    }

    function showToast(message, type, duration) {
        type = type || 'info';
        duration = duration || 3000;
        var container = document.getElementById('toast-container');
        if (!container) return;
        var toast = document.createElement('div');
        var colors = {
            success: 'background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;',
            error: 'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;',
            info: 'background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe;'
        };
        toast.className = 'toast toast--' + type;
        toast.style.cssText = (colors[type] || colors.info) + ' padding: 12px 20px; border-radius: 8px; font-weight: 500; font-size: 0.9375rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-top: 8px; transform: translateX(0); opacity: 1; transition: all 200ms ease-out; max-width: 400px;';
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        container.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(16px)';
            setTimeout(function() { toast.remove(); }, 200);
        }, duration);
    }

    function renderCompletionScreen(completed, courseTitle) {
        return '<div class="completion-screen" style="text-align: center; max-width: 600px; margin: 0 auto;">' +
            '<div class="completion-screen__icon" aria-hidden="true" style="width: 80px; height: 80px; background: var(--accent, #2563eb); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem;">&#10003;</div>' +
            '<h1 class="completion-screen__title" style="font-size: 1.75rem; margin-bottom: 0.75rem;">Szkolenie ukończone</h1>' +
            '<p class="completion-screen__text" style="color: var(--text-secondary, #6b7280); line-height: 1.6; margin-bottom: 2rem;">Pomyślnie ukończyłeś wszystkie ' + completed + ' moduly kursu <strong>' + courseTitle + '</strong>. Aby odblokować nagrodę, należy ukończyć quiz z wynikiem powyżej 60%. Pamiętaj, że quiz możesz powtarzać dowolną ilość razy.</p>' +
            '<div style="display: flex; flex-direction: column; gap: var(--space-md, 12px); align-items: center;">' +
                '<button class="nav-button" id="btn-start-final-quiz" style="min-width: 260px; border-color: var(--accent, #2563eb); color: var(--accent, #2563eb); justify-content: center;">Rozpocznij quiz końcowy</button>' +
            '</div>' +
        '</div>';
    }

    function renderSpacedRetrievalBanner() {
        return '<div class="spaced-retrieval-banner" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; text-align: center; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 12px;">' +
            '<div style="color: #0284c7; flex-shrink: 0;">' + DEFAULT_ICONS['help-circle'] + '</div>' +
            '<div>' +
                '<div style="font-weight: 700; color: #0369a1; text-align: center; font-size: 0.875rem;">Aktywne Przypomnienie</div>' +
                '<p style="font-size: 0.8125rem; color: #0c4a6e; margin: 2px 0 0; line-height: 1.4;">Krotkie pytanie z wczesniejszego modulu na utrwalenie wiedzy.</p>' +
            '</div>' +
        '</div>';
    }

    // --- DIAGRAM ---
    function CourseDiagram(containerId, modules, diagramOrder) {
        this.container = document.getElementById(containerId);
        this.modules = modules;
        this.diagramOrder = diagramOrder;
    }

    CourseDiagram.prototype.render = function() {
        if (!this.container) return;
        var self = this;
        var completedIds = this.modules.filter(function(m) { return m.completed; }).map(function(m) { return m.id; });
        var visibleIds = new Set();
        this.diagramOrder.forEach(function(id, index) {
            if (index === 0) {
                visibleIds.add(id);
            } else {
                var prevId = self.diagramOrder[index - 1];
                var prevModule = self.modules.find(function(m) { return m.id === prevId; });
                if ((prevModule && prevModule.completed) || completedIds.indexOf(id) !== -1) {
                    visibleIds.add(id);
                }
            }
        });
        this.modules.forEach(function(m) { if (m.unlocked) visibleIds.add(m.id); });

        this.container.innerHTML = '';
        var wrapper = document.createElement('div');
        wrapper.className = 'diagram-container';
        var nodesContainer = document.createElement('div');
        nodesContainer.className = 'diagram-nodes';

        this.diagramOrder.forEach(function(id, index) {
            if (!visibleIds.has(id)) return;
            var module = self.modules.find(function(m) { return m.id === id; });
            var isCompleted = module && module.completed;
            var isActive = module && module.unlocked && !module.completed;
            var node = document.createElement('div');
            node.className = 'diagram-node ' + (isActive ? 'diagram-node--active ' : '') + (!module || !module.unlocked ? 'diagram-node--locked' : '');
            node.dataset.id = id;
            node.style.cursor = (module && module.unlocked) ? 'pointer' : 'default';
            node.innerHTML = '<div class="diagram-node__number">' + (index + 1) + '</div>' +
                getDiagramIcon(id) +
                '<span class="diagram-node__label">' + module.title.replace(/<[^>]*>/g, ' ') + '</span>';
            if (module && module.unlocked) {
                node.addEventListener('click', function() {
                    if (window.courseAppInstance) {
                        window.courseAppInstance.startLearning(module.id);
                    }
                });
                node.setAttribute('role', 'button');
                node.setAttribute('tabindex', '0');
                node.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (window.courseAppInstance) window.courseAppInstance.startLearning(module.id);
                    }
                });
            }
            nodesContainer.appendChild(node);
        });

        wrapper.appendChild(nodesContainer);
        this.container.appendChild(wrapper);
    };

    // --- LEARNING MODULE ---
    function LearningModule(moduleId, modules, onComplete, onSpacedRetrieval) {
        this.module = modules.find(function(m) { return m.id === moduleId; });
        this.modules = modules;
        this.onComplete = onComplete;
        this.onSpacedRetrieval = onSpacedRetrieval;
        this.container = document.getElementById('main-content');
        this.attempts = 0;
        this.selectedAnswer = null;
        this.currentStage = 'prediction';
    }

    LearningModule.prototype.start = function() {
        if (this.module.completed) {
            this.renderTheoryStage();
        } else {
            this.renderPredictionStage();
        }
    };


    LearningModule.prototype.renderPredictionStage = function() {
        var self = this;
        this.currentStage = 'prediction';

        this.container.innerHTML = '<div class="learning-stage">' +
            renderStepIndicator(1, 3, ['Sprawdzenie wstepne', 'Omówienie', 'Sprawdzenie wiedzy']) +
            '<div class="learning-stage__header" style="text-align: center; margin-bottom: 2rem;">' +
                '<div style="display: flex; justify-content: center; margin-bottom: 0.5rem;">' +
                    getIcon(this.module.id, 'xl') +
                '</div>' +
            '</div>' +
            renderQuestionCard(this.module.quiz.question, this.module.quiz.options) +
        '</div>';

        this.attachAnswerListeners('prediction');

        setInitialFocus(this.container);

        if (window.courseAppInstance) {
            window.courseAppInstance.learning = self;
            window.courseAppInstance.renderFooter();
        }

    };

    LearningModule.prototype.renderTheoryStage = function() {
        this.currentStage = 'theory';

        var isDone = this.module.completed === true;

        var currentStep = isDone ? 1 : 2;
        var totalSteps = isDone ? 2 : 3;

        var stepLabels = isDone
            ? ['Omówienie', 'Sprawdzenie wiedzy']
            : ['Sprawdzenie wstępne', 'Omówienie', 'Sprawdzenie wiedzy'];

        var html =
            '<div class="learning-stage">' +

                (isDone ? '' : renderStepIndicator(currentStep, totalSteps, stepLabels)) +

                '<div class="learning-stage__header" style="text-align:center;margin-bottom:2rem;">' +

                    '<div style="display:flex;justify-content:center;margin-bottom:.75rem;">' +
                        getIcon(this.module.id, 'xl') +
                    '</div>' +

                    '<h2 style="margin:0;">' +
                        this.module.title +
                    '</h2>' +

                '</div>';

        // Krótki opis
        if (this.module.description) {

            html +=
                '<div class="learning-stage__description" ' +
                'style="max-width:680px;margin:0 auto 2rem auto;line-height:1.7;color:var(--text-secondary,#374151);font-size:1rem;">' +

                    this.module.description +

                '</div>';
        }

        // Sekcje
        if (this.module.sections && this.module.sections.length) {

            html += '<div class="theory-sections">';

            this.module.sections.forEach(function(section, index){

                html +=

                '<div class="theory-section">' +

                    '<button class="theory-section__header" data-index="'+index+'">' +

                        '<span>'+section.title+'</span>' +

                        '<span class="theory-section__arrow">+</span>' +

                    '</button>' +

                    '<div class="theory-section__content">' +

                        '<div>' +
                            section.content.replace(/\n/g,'<br>') +
                        '</div>' +

                    '</div>' +

                '</div>';

            });

            html += '</div>';

        }

        html +=

                '<div class="text-center" style="margin-top:2.5rem;"></div>' +

            '</div>';

        this.container.innerHTML = html;

        // Accordion

        this.container.querySelectorAll('.theory-section__header').forEach(function(button){

            button.addEventListener('click', function(){

                var section = button.parentElement;
                var wasOpen = section.classList.contains('open');

                // Zamknij wszystkie sekcje
                document.querySelectorAll('.theory-section').forEach(function(item){
                    item.classList.remove('open');
                });

                // Otwórz klikniętą tylko jeśli wcześniej była zamknięta
                if (!wasOpen) {
                    section.classList.add('open');

                    setTimeout(function () {

                        var mainContent = document.querySelector('.main-content');
                        var header = document.querySelector('.sticky-header');

                        var offset = header ? header.offsetHeight : 0;

                        var position = section.offsetTop - offset - 120;

                        mainContent.scrollTo({
                            top: position,
                            behavior: 'smooth'
                        });

                    }, 300);
                }
            });

        });

        setInitialFocus(this.container);

        if (window.courseAppInstance) {
            window.courseAppInstance.renderFooter();
        }
    };


    LearningModule.prototype.renderRecallStage = function() {
        var self = this;
        this.currentStage = 'recall';
        this.attempts = 0;
        this.selectedAnswer = null;
        this.recallCompleted = false;
        var attemptText = this.attempts > 0 ? 'Proba ' + (this.attempts + 1) + '/2' : '';
        this.container.innerHTML = '<div class="learning-stage">' +
            renderStepIndicator(3, 3, ['Sprawdzenie wstępne', 'Omówienie', 'Sprawdzenie wiedzy']) +
            '<div class="learning-stage__header" style="text-align: center; margin-bottom: 2rem;">' +
                // '<span class="learning-stage__component-subtitle" style="display: inline-block; padding: 4px 12px; background: var(--accent-light, #eff6ff); color: var(--accent, #2563eb); border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">Sprawdzenie wiedzy</span>' +
                '<div style="display: flex; justify-content: center; margin-bottom: 0.5rem;">' + getIcon(this.module.id, 'xl') + '</div>' +
                '<p style="color: var(--text-secondary, #6b7280); margin-top: 0.5rem;">Wybierz poprawna odpowiedz. Masz dwie proby.</p>' +
            '</div>' +
            renderQuestionCard(this.module.quiz.question, this.module.quiz.options, attemptText) +
            '<div id="feedback-area"></div>' +
            '</div>' +
        '</div>';
        this.attachAnswerListeners('recall');
        setInitialFocus(this.container);
        if (window.courseAppInstance) window.courseAppInstance.renderFooter();
    };

    LearningModule.prototype.attachAnswerListeners = function(stage) {
        var self = this;
        var buttons = this.container.querySelectorAll('.answer-button');

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var index = parseInt(btn.dataset.index);

                buttons.forEach(function(b) {
                    updateAnswerButtonState(b, 'default');
                });

                updateAnswerButtonState(btn, 'selected');

                self.selectedAnswer = index;

                if (stage === 'prediction') {
                    var footerBtn = document.getElementById('nav-center');

                    if (footerBtn) {
                        footerBtn.disabled = false;
                        footerBtn.style.opacity = '1';
                        footerBtn.style.cursor = 'pointer';
                    }
                }

                if (window.courseAppInstance) {
                    window.courseAppInstance.learning = self;

                    console.log('Footer przed render:', {
                        learning: window.courseAppInstance.learning,
                        selected: window.courseAppInstance.learning.selectedAnswer
                    });

                    window.courseAppInstance.renderFooter();
                }

                if (stage === 'recall') {
                    self.handleRecallAnswer(index, buttons);
                }
            });
        });
    };

    LearningModule.prototype.handleRecallAnswer = function(selectedIndex, buttons) {
        var self = this;
        var correctIndex = this.module.quiz.answer;
        var feedbackArea = document.getElementById('feedback-area');

        buttons.forEach(function(b) {
            b.disabled = true;
        });

        if (selectedIndex === correctIndex) {

            updateAnswerButtonState(buttons[selectedIndex], 'correct');

            showToast('Poprawnie! Swietna robota.', 'success', 2500);

            feedbackArea.innerHTML = renderExplanationCard(
                this.module.quiz.explanation,
                true
            );

            // Odblokuj przycisk w stopce
            self.recallCompleted = true;

            if (window.courseAppInstance) {
                window.courseAppInstance.renderFooter();
            }

            setTimeout(function() {
                if (feedbackArea.firstChild) {
                    feedbackArea.firstChild.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 100);

        } else {

            this.attempts++;

            updateAnswerButtonState(buttons[selectedIndex], 'incorrect');

            if (this.attempts === 1) {

                showToast('Nie tym razem. Spróbuj jeszcze raz.', 'error', 2500);

                setTimeout(function() {

                    buttons.forEach(function(b) {
                        updateAnswerButtonState(b, 'default');
                        b.disabled = false;
                    });

                    self.selectedAnswer = null;

                    feedbackArea.innerHTML = '';

                    var counter = self.container.querySelector(
                        '.question-card [style*="color: var(--warning"]'
                    );

                    if (counter) {
                        counter.textContent = 'Proba 2/2';
                    }

                }, 1800);

            } else {

                showToast(
                    'Sprawdz poprawna odpowiedz ponizej.',
                    'info',
                    3000
                );

                updateAnswerButtonState(
                    buttons[correctIndex],
                    'correct'
                );

                buttons.forEach(function(b, i) {
                    if (i !== correctIndex && i !== selectedIndex) {
                        updateAnswerButtonState(b, 'revealed');
                    }
                });

                feedbackArea.innerHTML = renderExplanationCard(
                    this.module.quiz.explanation,
                    false
                );

                // Odblokuj przycisk w stopce po drugiej próbie
                self.recallCompleted = true;

                if (window.courseAppInstance) {
                    window.courseAppInstance.renderFooter();
                }

                setTimeout(function() {
                    if (feedbackArea.firstChild) {
                        feedbackArea.firstChild.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }
                }, 100);
            }
        }
    };

    LearningModule.prototype.completeModule = function() {
        this.module.completed = true;
        var currentIndex = this.modules.findIndex(function(m) { return m.id === this.module.id; }.bind(this));
        if (currentIndex < this.modules.length - 1) this.modules[currentIndex + 1].unlocked = true;
        var completedCount = this.modules.filter(function(m) { return m.completed; }).length;
        if (completedCount % 3 === 0 && completedCount > 0) {
            if (this.onSpacedRetrieval) { this.onSpacedRetrieval(); return; }
        }
        if (this.onComplete) this.onComplete();
    };

    LearningModule.getRandomPreviousQuestion = function(modules, excludeModuleId) {
        var completedModules = modules.filter(function(m) { return m.completed && m.id !== excludeModuleId; });
        if (completedModules.length === 0) return null;
        return completedModules[Math.floor(Math.random() * completedModules.length)];
    };

    LearningModule.prototype.renderSpacedRetrieval = function(callback) {
        var self = this;

        this.spacedRetrievalCallback = callback;
        this.currentStage = 'spacedRetrieval';

        this.spacedRetrievalCompleted = false;

        var randomModule = LearningModule.getRandomPreviousQuestion(this.modules, this.module.id);

        if (!randomModule) {
            if (callback) callback();
            return;
        }

        this.container.innerHTML =
            '<div class="learning-stage">' +
                renderSpacedRetrievalBanner() +
                renderQuestionCard(randomModule.quiz.question, randomModule.quiz.options) +
                '<div id="feedback-area"></div>' +
            '</div>';

        var buttons = this.container.querySelectorAll('.answer-button');
        var answered = false;

        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {

                if (answered) return;
                answered = true;

                var index = parseInt(btn.dataset.index);

                buttons.forEach(function(b) {
                    b.disabled = true;
                });

                if (index === randomModule.quiz.answer) {

                    updateAnswerButtonState(btn, 'correct');

                    showToast('Poprawnie!', 'success', 2000);

                    document.getElementById('feedback-area').innerHTML =
                        renderExplanationCard(randomModule.quiz.explanation, true);

                } else {

                    updateAnswerButtonState(btn, 'incorrect');

                    updateAnswerButtonState(
                        buttons[randomModule.quiz.answer],
                        'correct'
                    );

                    document.getElementById('feedback-area').innerHTML =
                        renderExplanationCard(randomModule.quiz.explanation, false);
                }

                self.spacedRetrievalCompleted = true;

                if (window.courseAppInstance) {
                    window.courseAppInstance.renderFooter();
                }

                setTimeout(function() {
                    var fb = document.getElementById('feedback-area');

                    if (fb && fb.firstChild) {
                        fb.firstChild.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }
                }, 100);

            });
        });

        setInitialFocus(this.container);

        if (window.courseAppInstance) {
            window.courseAppInstance.renderFooter();
        }
    };


    // --- FINAL QUIZ ---
    function FinalQuiz(quizData, onFinish) {
        this.quizData = quizData;
        this.onFinish = onFinish;
        this.container = document.getElementById('main-content');
        this.current = 0;
        this.score = 0;
        this.answers = [];
        this.answered = false;
    }

    FinalQuiz.prototype.start = function() {
        this.current = 0;
        this.score = 0;
        this.answers = [];
        this.renderQuestion();
    };

    FinalQuiz.prototype.renderQuestion = function() {
        var self = this;
        var q = this.quizData[this.current];
        var total = this.quizData.length;
        this.answered = false;
        this.quizContinueEnabled = false;


        var dotsHtml = this.quizData.map(function(_, i) {
            var cls = 'quiz-progress__dot';
            if (i < self.current) {
                cls += self.answers[i].correct ? ' quiz-progress__dot--correct' : ' quiz-progress__dot--incorrect';
            } else if (i === self.current) {
                cls += ' quiz-progress__dot--current';
            }
            return '<div class="' + cls + '" aria-hidden="true"></div>';
        }).join('');

        this.container.innerHTML = '<div class="learning-stage">' +
            '<div class="quiz-progress" style="margin-bottom: 2rem;">' +
                '<div class="quiz-progress__dots" style="display: flex; gap: 6px; justify-content: center; margin-bottom: 0.5rem;">' + dotsHtml + '</div>' +
                '<span style="display: block; text-align: center; font-size: 0.8125rem; color: var(--text-secondary, #6b7280); font-weight: 600;">Pytanie ' + (this.current + 1) + ' z ' + total + '</span>' +
            '</div>' +
            renderQuestionCard(q.question, q.options) +
            '<div id="feedback-area"></div>' +
        '</div>';

        var buttons = this.container.querySelectorAll('.answer-button');
        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (self.answered) return;
                self.answered = true;
                var index = parseInt(btn.dataset.index);
                self.handleAnswer(index, buttons);
            });
        });
        setInitialFocus(this.container);
        if (window.courseAppInstance) window.courseAppInstance.renderFooter();
    };

    FinalQuiz.prototype.handleAnswer = function(selectedIndex, buttons) {
        var self = this;
        var q = this.quizData[this.current];
        var correct = selectedIndex === q.answer;
        var feedbackArea = document.getElementById('feedback-area');

        buttons.forEach(function(b) {
            b.disabled = true;
        });

        if (correct) {

            this.score++;

            updateAnswerButtonState(
                buttons[selectedIndex],
                'correct'
            );

            showToast('Poprawnie!', 'success', 1500);

            feedbackArea.innerHTML = renderExplanationCard(
                q.explanation,
                true
            );

        } else {

            updateAnswerButtonState(
                buttons[selectedIndex],
                'incorrect'
            );

            updateAnswerButtonState(
                buttons[q.answer],
                'correct'
            );

            buttons.forEach(function(b, i) {
                if (i !== q.answer && i !== selectedIndex) {
                    updateAnswerButtonState(b, 'revealed');
                }
            });

            feedbackArea.innerHTML = renderExplanationCard(
                q.explanation,
                false
            );
        }

        this.answers.push({
            question: q.question,
            selected: selectedIndex,
            correct: correct,
            correctIndex: q.answer
        });

        // Odblokowanie przycisku w stopce
        this.quizContinueEnabled = true;

        if (window.courseAppInstance) {
            window.courseAppInstance.renderFooter();
        }

        setTimeout(function() {
            if (feedbackArea.firstChild) {
                feedbackArea.firstChild.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 100);
    };


    FinalQuiz.prototype.renderSummary = function() {
        var self = this;
        var total = this.quizData.length;
        var percentage = Math.round((this.score / total) * 100);
        var grade = '';
        if (percentage >= 90) grade = 'Celujacy';
        else if (percentage >= 80) grade = 'Bardzo dobry';
        else if (percentage >= 70) grade = 'Dobry';
        else if (percentage >= 60) grade = 'Dostateczny';
        else grade = 'Wymaga powtorki';

        var rewardUrl = (window.COURSE_DATA && window.COURSE_DATA.rewardUrl) || '#';
        var isPassed = percentage >= 60;

        var detailsHtml = this.answers.map(function(a, i) {
            var markerClass = a.correct ? 'quiz-summary__marker--correct' : 'quiz-summary__marker--incorrect';
            var markerText = a.correct ? '&#10003;' : '&#10005;';
            var markerBg = a.correct ? '#16a34a' : '#dc2626';
            var answerHtml = !a.correct ? '<div class="quiz-summary__answer" style="margin-top: 4px; font-size: 0.8125rem; color: #16a34a; font-weight: 500;">Poprawna: ' + self.quizData[i].options[a.correctIndex] + '</div>' : '';
            return '<div class="quiz-summary__item" style="display: flex; gap: 12px; padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">' +
                '<div class="quiz-summary__marker ' + markerClass + '" aria-hidden="true" style="width: 28px; height: 28px; border-radius: 50%; background: ' + markerBg + '; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; flex-shrink: 0; font-weight: 700;">' + markerText + '</div>' +
                '<div style="flex: 1;">' +
                    '<div class="quiz-summary__question" style="font-weight: 500; color: #111827; line-height: 1.4;">' + (i + 1) + '. ' + a.question + '</div>' +
                    answerHtml +
                '</div>' +
            '</div>';
        }).join('');

        this.container.innerHTML = '<div class="quiz-summary" style="max-width: 720px; margin: 0 auto;">' +
            '<div style="text-align: center; margin-bottom: 2rem;">' +
                '<div style="width: 80px; height: 80px; background: ' + (isPassed ? 'var(--accent, #2563eb)' : '#d97706') + '; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1rem;">' + (isPassed ? '&#10003;' : '&#9432;') + '</div>' +
                '<h1 class="completion-screen__title" style="font-size: 1.75rem; margin-bottom: 0.5rem;">Quiz ukończony</h1>' +
                '<div class="quiz-summary__score" style="font-size: 3rem; font-weight: 800; color: ' + (isPassed ? 'var(--accent, #2563eb)' : '#d97706') + ';">' + percentage + '%</div>' +
                '<div class="quiz-summary__label" style="font-size: 1rem; color: var(--text-secondary, #6b7280); font-weight: 500;">' + this.score + ' / ' + total + ' poprawnych &middot; Ocena: <strong>' + grade + '</strong></div>' +
            '</div>' +
            '<div class="quiz-summary__details" style="margin-bottom: 2rem;">' + detailsHtml + '</div>' +
            '<div style="display: flex; flex-direction: column; gap: var(--space-md, 12px); align-items: center;">' +
                (isPassed && rewardUrl !== '#' ? 
                    '<a href="' + rewardUrl + '" class="nav-button nav-button--primary" id="btn-reward" style="min-width: 260px; text-decoration: none; display: inline-flex; justify-content: center; align-items: center;">Odbierz nagrode &#127942;</a>' 
                    : '') +
            '</div>' +
        '</div>';

        setInitialFocus(this.container);

        if (window.courseAppInstance) {
            window.courseAppInstance.state.view = 'completion';
            window.courseAppInstance.renderFooter();
        }

    };

    // --- MAIN APP ---
    function CourseApp(data) {
        this.data = data;
        this.state = { view: 'modules', currentModuleId: null };
        this.diagram = null;
        this.learning = null;
        this.finalQuiz = null;
        this.init();
    }

    CourseApp.prototype.init = function() {
        var self = this;
        document.title = this.data.title;
        // Brand title removed per user request

        var saved = loadState();
        if (saved) {
            if (saved.modules) {
                saved.modules.forEach(function(savedMod) {
                    var mod = self.data.modules.find(function(m) { return m.id === savedMod.id; });
                    if (mod) {
                        mod.unlocked = savedMod.unlocked;
                        mod.completed = savedMod.completed;
                    }
                });
            }
            this.state.view = saved.view || 'modules';
            this.state.currentModuleId = saved.currentModuleId || null;
        }

        window.courseAppInstance = this;
        this.updateProgressBar();
        this.renderFooter();
        this.navigateTo(this.state.view, this.state.currentModuleId, true);
        this.attachGlobalEvents();
    };

    CourseApp.prototype.attachGlobalEvents = function() {
        var self = this;
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && (self.state.view === 'learning' || self.state.view === 'diagram' || self.state.view === 'final-quiz')) {
                if (self.state.view === 'learning' && self.learning && self.learning.currentStage === 'recall') {
                    // Nie pozwalamy na wyjscie w trakcie sprawdzianu
                    showToast('Ukoncz sprawdzian, aby wyjsc.', 'info', 2000);
                    return;
                }
                self.navigateTo('modules');
            }
        });
    };

    CourseApp.prototype.persist = function() {
        saveState({
            modules: this.data.modules,
            view: this.state.view,
            currentModuleId: this.state.currentModuleId
        });
    };

    CourseApp.prototype.updateProgressBar = function() {
        var container = document.getElementById('progress-container');
        if (container) container.innerHTML = renderProgressBar(this.data.modules);
    };

    CourseApp.prototype.renderFooter = function() {
        var footer = document.getElementById('navigation-footer');
        if (!footer) return;
        var self = this;

        if (this.state.view === 'modules') {
            footer.innerHTML = renderNavigationFooter({
                prev: { label: 'Powrót do ukladów', disabled: false }
            });
            var navPrev = document.getElementById('nav-prev');
            if (navPrev) navPrev.addEventListener('click', function() { window.location.href = 'engine-systems.html'; });
        } else if (this.state.view === 'learning') {
            var moduleIndex = this.data.modules.findIndex(function(m) { return m.id === self.state.currentModuleId; });
            var currentModule = this.data.modules[moduleIndex];
            var stage = this.learning ? this.learning.currentStage : 'prediction';

            var prevCfg = { label: 'Powrót do modulów', disabled: false };
            var nextCfg = null;
            var centerCfg = null;

            if (stage === 'prediction') {
                centerCfg = {
                    label: 'Zatwierdź',
                    primary: true,
                    disabled: !self.learning || self.learning.selectedAnswer == null
                };
                } else if (stage === 'theory') {

                    if (!self.learning.module.completed) {
                        centerCfg = {
                            label: 'Przejdz do sprawdzianu',
                            primary: true
                        };
                    }

                } else if (stage === 'recall') {
                prevCfg = { label: 'Wróc do teorii', disabled: false };

                centerCfg = {
                    label: 'Kontynuuj',
                    primary: true,
                    disabled: !self.learning || !self.learning.recallCompleted
                };
            } else if (stage === 'spacedRetrieval') {

                centerCfg = {
                    label: 'Kontynuuj',
                    primary: true,
                    disabled: !self.learning || !self.learning.spacedRetrievalCompleted
                };

            }
            
            footer.innerHTML = renderNavigationFooter({
                prev: prevCfg,
                center: centerCfg,
                next: nextCfg
            });

            var navPrev2 = document.getElementById('nav-prev');
            if (navPrev2) {
                navPrev2.addEventListener('click', function() {
                    if (stage === 'recall') {
                        if (self.learning) self.learning.renderTheoryStage();
                    } else {
                        self.navigateTo('modules');
                    }
                });
            }

            var navCenter2 = document.getElementById('nav-center');

            if (navCenter2) {
                navCenter2.addEventListener('click', function() {

                    if (stage === 'prediction') {

                        if (self.learning && self.learning.selectedAnswer !== null) {
                            self.learning.renderTheoryStage();
                        }

                    } else if (stage === 'theory') {

                        if (self.learning) {
                            self.learning.renderRecallStage();
                        }

                    } else if (stage === 'recall') {

                        if (self.learning) {
                            self.learning.completeModule();
                        }

                    } else if (stage === 'spacedRetrieval') {

                        if (self.learning && self.learning.spacedRetrievalCallback) {
                            self.learning.spacedRetrievalCallback();
                        }

                    }
                });
            }

            var navNext = document.getElementById('nav-next');
            if (navNext) {
                navNext.addEventListener('click', function() {
                    var nextIndex = moduleIndex + 1;
                    if (nextIndex < self.data.modules.length) {
                        var nextModule = self.data.modules[nextIndex];
                        if (nextModule.unlocked) self.startLearning(nextModule.id);
                        else showToast('Najpierw ukoncz biezacy modul.', 'info', 2000);
                    }
                });
            }
        } else if (this.state.view === 'diagram') {
            footer.innerHTML = renderNavigationFooter({
                prev: { label: '&#8592; Wstecz', disabled: false },
                // next: { label: 'Dalej', disabled: true }
            });
            var navPrev3 = document.getElementById('nav-prev');
            if (navPrev3) navPrev3.addEventListener('click', function() { self.navigateTo('modules'); });
            } else if (this.state.view === 'completion') {

                footer.innerHTML = renderNavigationFooter({
                    prev: { 
                        label: 'Powrót do modulów', 
                        disabled: false 
                    }
                });

                var navPrev4 = document.getElementById('nav-prev');

                if (navPrev4) {
                    navPrev4.addEventListener('click', function() {
                        self.navigateTo('modules');
                    });
                }

                var navCenter4 = document.getElementById('nav-center');

                if (navCenter4) {
                    navCenter4.addEventListener('click', function() {
                        self.navigateTo('diagram');
                    });
                }

                } else if (this.state.view === 'final-quiz') {

                    var quiz = this.finalQuiz;

                    footer.innerHTML = renderNavigationFooter({
                        prev: {
                            label: 'Zakończ quiz',
                            disabled: false
                        },

                        center: {
                            label: quiz && quiz.current + 1 < quiz.quizData.length
                                ? 'Następne pytanie'
                                : 'Zobacz wynik',
                            primary: true,
                            disabled: !quiz || !quiz.quizContinueEnabled
                        }
                    });


                    var navPrev5 = document.getElementById('nav-prev');

                    if (navPrev5) {
                        navPrev5.addEventListener('click', function() {
                            self.navigateTo('modules');
                        });
                    }


                    var navCenter5 = document.getElementById('nav-center');

                    if (navCenter5) {
                        navCenter5.addEventListener('click', function() {

                            if (!self.finalQuiz) return;

                            if (self.finalQuiz.current + 1 < self.finalQuiz.quizData.length) {
                                self.finalQuiz.current++;
                                self.finalQuiz.renderQuestion();
                            } else {
                                self.finalQuiz.renderSummary();
                            }

                        });
                    }
                }
    };

    CourseApp.prototype.navigateTo = function(view, moduleId, skipPersist) {
        moduleId = moduleId || null;
        skipPersist = skipPersist || false;
        this.state.view = view;
        this.state.currentModuleId = moduleId;
        var main = document.getElementById('main-content');
        if (this.diagram) { this.diagram = null; }
        switch(view) {
            case 'modules': this.renderModulesView(main); break;
            case 'learning': if (moduleId) this.startLearning(moduleId); break;
            case 'diagram': this.renderDiagramView(main); break;
            case 'completion': this.renderCompletionView(main); break;
            case 'final-quiz': this.renderFinalQuizView(main); break;
            default: this.renderModulesView(main);
        }
        this.updateProgressBar();
        this.renderFooter();
        if (!skipPersist) this.persist();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    CourseApp.prototype.renderModulesView = function(container) {
        var self = this;
        container.innerHTML = '';
        var allCompleted = this.data.modules.every(function(m) { return m.completed; });
        if (allCompleted && this.data.modules.length > 0) {
            container.innerHTML = '<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 1.5px solid #34d399; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; text-align: center;">' +
                '<div style="font-size: 1.5rem; margin-bottom: 0.5rem;">&#127942;</div>' +
                '<strong style="color: #065f46; font-size: 1.0625rem;">Wszystkie moduly ukonczone!</strong>' +
                '<p style="margin-top: var(--space-sm, 8px); font-size: 0.9375rem; color: #047857; line-height: 1.5;">' +
                '<div style="margin-top: 1rem; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">' +
                    '<button class="nav-button" id="banner-start-quiz" style="font-size: 0.875rem; border-color: var(--accent, #2563eb); color: var(--accent, #2563eb);">Quiz końcowy</button>' +
                '</div>' +
            '</div>';
            document.getElementById('banner-start-quiz').addEventListener('click', function() { self.navigateTo('final-quiz'); });
        } else {
            container.innerHTML = `
                <h2 class="mb-lg module-select-title">
                    Wybierz moduł, aby rozpocząć naukę
                </h2>
            `;
        }
        var grid = document.createElement('div');
        grid.className = 'modules-grid';
        grid.setAttribute('role', 'list');
        this.data.modules.forEach(function(module, index) {
            var wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'listitem');
            wrapper.innerHTML = renderModuleCard(module, index, self.data.modules);
            grid.appendChild(wrapper);
        });
        container.appendChild(grid);

        grid.querySelectorAll('.course-card').forEach(function(card) {
            var moduleId = card.dataset.moduleId;
            var module = self.data.modules.find(function(m) { return m.id === moduleId; });
            var handleActivate = function() {
                if (module.unlocked) self.startLearning(moduleId);
                else showToast('Ukończ wcześniejsze moduły, aby odblokować.', 'info', 2500);
            };
            card.addEventListener('click', handleActivate);
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); }
            });
            // Hover effects
            card.addEventListener('mouseenter', function() {
                if (module.unlocked) this.style.transform = 'translateY(-2px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        setInitialFocus(container);
    };

    CourseApp.prototype.startLearning = function(moduleId) {
        var self = this;
        this.state.view = 'learning';
        this.state.currentModuleId = moduleId;
        this.persist();
        this.renderFooter();
        var module = this.data.modules.find(function(m) { return m.id === moduleId; });
        if (!module.unlocked) { showToast('Modul jest zablokowany.', 'error', 2000); this.navigateTo('modules'); return; }

        this.learning = new LearningModule(
            moduleId,
            this.data.modules,
            function() {
                self.persist();
                var allCompleted = self.data.modules.every(function(m) { return m.completed; });
                if (allCompleted) self.navigateTo('completion');
                else { showToast('Modul ukończony! Odblokowano kolejny.', 'success', 2500); self.navigateTo('modules'); }
            },
            function() {
                self.learning.renderSpacedRetrieval(function() {
                    self.persist();
                    var allCompleted = self.data.modules.every(function(m) { return m.completed; });
                    if (allCompleted) self.navigateTo('completion');
                    else { showToast('Modul ukończony! Odblokowano kolejny.', 'success', 2500); self.navigateTo('modules'); }
                });
            }
        );
        this.learning.start();
    };

    CourseApp.prototype.renderDiagramView = function(container) {
        container.innerHTML = '<h2 class="mb-lg" style="text-align: center; font-size: 1.25rem; font-weight: 700; color: var(--text-primary, #111827); margin-bottom: 2rem;">Diagram: ' + this.data.title + '</h2><div id="diagram-root"></div>';
        this.diagram = new CourseDiagram('diagram-root', this.data.modules, this.data.diagramOrder);
        this.diagram.render();
        setInitialFocus(container);
    };

    CourseApp.prototype.renderCompletionView = function(container) {
        var completed = this.data.modules.filter(function(m) { return m.completed; }).length;
        container.innerHTML = renderCompletionScreen(completed, this.data.title);
        var self = this;
        var btnDiagram = document.getElementById('btn-view-diagram');
        if (btnDiagram) btnDiagram.addEventListener('click', function() { self.navigateTo('diagram'); });
        var btnQuiz = document.getElementById('btn-start-final-quiz');
        if (btnQuiz) btnQuiz.addEventListener('click', function() { self.navigateTo('final-quiz'); });
        setInitialFocus(container);
    };

    CourseApp.prototype.renderFinalQuizView = function(container) {
        var self = this;
        container.innerHTML = '';
        this.finalQuiz = new FinalQuiz(this.data.finalQuiz, function() { self.navigateTo('modules'); });
        this.finalQuiz.start();
    };

    // --- INIT ---
    window.initCourse = function() {
        if (!window.COURSE_DATA) {
            console.error('Missing course data! Make sure you loaded data.js before courseEngine.js');
            var main = document.getElementById('main-content');
            if (main) {
                main.innerHTML = '<div class="loading-screen" style="text-align: center; padding: 4rem 2rem;">' +
                    '<div style="font-size: 3rem; margin-bottom: 1rem;">&#128683;</div>' +
                    '<h2 style="color: var(--error, #dc2626); margin-bottom: 1rem; font-size: 1.5rem;">Błąd ładowania kursu</h2>' +
                    '<a href="engine-systems.html" class="nav-button nav-button--primary" style="margin-top: 1rem; display: inline-block; text-decoration: none;">Wróć do strony głównej</a>' +
                '</div>';
            }
            return;
        }
        new CourseApp(window.COURSE_DATA);
    };
})();