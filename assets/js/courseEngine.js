// ========================================
// INSIDE THE ENGINE - Course Engine (Universal)
// ========================================
// This engine works with any courses/<course>/data.js file
// Requires global variable: window.COURSE_DATA
// ========================================

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
        'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
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

    function renderModuleCard(module, index) {
        var statusClass = module.completed ? 'module-card--completed' : module.unlocked ? '' : 'module-card--locked';
        var statusText = module.completed ? 'Ukonczony' : module.unlocked ? 'Dostepny' : 'Zablokowany';
        var statusClassName = module.completed ? 'module-card__status--completed' : 'module-card__status--locked';
        var cleanTitle = module.title.replace(/<[^>]*>/g, ' ');
        return '<article class="module-card ' + statusClass + '" data-module-id="' + module.id + '" role="button" tabindex="' + (module.unlocked ? '0' : '-1') + '" aria-label="Modul ' + (index + 1) + ': ' + cleanTitle + '. Status: ' + statusText + '">' +
            '<div class="module-card__header">' +
                '<h3 class="module-card__title">' + (index + 1) + '. ' + module.title + '</h3>' +
            '</div>' +
            getIcon(module.id) +
            '<span class="module-card__status ' + statusClassName + '">' + statusText + '</span>' +
        '</article>';
    }

    function renderQuestionCard(question, options, stageLabel) {
        stageLabel = stageLabel || '';
        var letters = ['A', 'B', 'C'];
        var optionsHtml = options.map(function(opt, i) {
            return '<button class="answer-button" data-index="' + i + '" role="radio" aria-checked="false" aria-label="Opcja ' + letters[i] + ': ' + opt + '">' +
                '<span class="answer-button__letter" aria-hidden="true">' + letters[i] + '</span>' +
                '<span>' + opt + '</span>' +
            '</button>';
        }).join('');
        return '<div class="question-card">' +
            (stageLabel ? '<span class="question-card__counter">' + stageLabel + '</span>' : '') +
            '<h2 class="question-card__title">' + question + '</h2>' +
            '<div class="answers-list" role="radiogroup" aria-label="Opcje odpowiedzi">' + optionsHtml + '</div>' +
        '</div>';
    }

    function updateAnswerButtonState(btn, state) {
        btn.classList.remove('answer-button--selected', 'answer-button--correct', 'answer-button--incorrect');
        btn.setAttribute('aria-checked', 'false');
        if (state === 'selected') {
            btn.classList.add('answer-button--selected');
            btn.setAttribute('aria-checked', 'true');
        } else if (state === 'correct') {
            btn.classList.add('answer-button--correct');
            btn.setAttribute('aria-checked', 'true');
        } else if (state === 'incorrect') {
            btn.classList.add('answer-button--incorrect');
        }
        btn.disabled = state !== 'default';
    }

    function renderExplanationCard(explanation) {
        return '<div class="explanation-card" role="alert" aria-live="polite">' +
            '<div class="explanation-card__title">Wyjasnienie</div>' +
            '<p class="explanation-card__text">' + explanation + '</p>' +
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
        var center = cfg.center || null;
        var prevHtml = prev
            ? '<button class="nav-button ' + (prev.primary ? 'nav-button--primary' : '') + '" id="nav-prev" ' + (prev.disabled ? 'disabled' : '') + ' aria-label="' + (prev.label || 'Poprzedni') + '">' + (prev.label || 'Poprzedni') + '</button>'
            : '<button class="nav-button" id="nav-prev" disabled aria-label="Poprzedni">Poprzedni</button>';
        var centerHtml = center
            ? '<button class="nav-button ' + (center.primary ? 'nav-button--primary' : '') + '" id="nav-center" ' + (center.disabled ? 'disabled' : '') + ' aria-label="' + center.label + '">' + center.label + '</button>'
            : '<div aria-hidden="true"></div>';
        var nextHtml = next
            ? '<button class="nav-button ' + (next.primary ? 'nav-button--primary' : '') + '" id="nav-next" ' + (next.disabled ? 'disabled' : '') + ' aria-label="' + (next.label || 'Nastepny') + '">' + (next.label || 'Nastepny') + '</button>'
            : '<button class="nav-button" id="nav-next" disabled aria-label="Nastepny">Nastepny</button>';
        return prevHtml + centerHtml + nextHtml;
    }

    function showToast(message, type, duration) {
        type = type || 'info';
        duration = duration || 3000;
        var container = document.getElementById('toast-container');
        if (!container) return;
        var toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        container.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(16px)';
            toast.style.transition = 'all 200ms ease-out';
            setTimeout(function() { toast.remove(); }, 200);
        }, duration);
    }

    function renderCompletionScreen(completed, courseTitle) {
        return '<div class="completion-screen">' +
            '<div class="completion-screen__icon" aria-hidden="true">&#10003;</div>' +
            '<h1 class="completion-screen__title">Szkolenie ukonczone</h1>' +
            '<p class="completion-screen__text">Pomyslnie ukonczyles wszystkie ' + completed + ' moduly kursu ' + courseTitle + '. Pelny diagram systemu jest teraz dostepny do przegladu.</p>' +
            '<div style="display: flex; flex-direction: column; gap: var(--space-md); align-items: center;">' +
                '<button class="nav-button nav-button--primary" id="btn-view-diagram" style="min-width: 220px;">Zobacz pelny diagram</button>' +
                '<button class="nav-button" id="btn-start-final-quiz" style="min-width: 220px; border-color: var(--color-accent); color: var(--color-accent);">Rozpocznij quiz koncowy</button>' +
            '</div>' +
        '</div>';
    }

    function renderSpacedRetrievalBanner() {
        return '<div class="spaced-retrieval-banner">' +
            '<div class="spaced-retrieval-banner__label">Aktywne Przypomnienie</div>' +
            '<p style="font-size: 0.875rem; color: var(--color-text-secondary);">Krotkie pytanie z wczesniejszego modulu na utrwalenie wiedzy.</p>' +
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
            node.innerHTML = '<div class="diagram-node__number">' + (index + 1) + '</div>' +
                getDiagramIcon(id) +
                '<span class="diagram-node__label">' + module.title.replace(/<[^>]*>/g, ' ') + '</span>';
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
    }

    LearningModule.prototype.start = function() { this.renderPredictionStage(); };

    LearningModule.prototype.renderPredictionStage = function() {
        var self = this;
        this.container.innerHTML = '<div class="learning-stage">' +
            '<div class="learning-stage__header">' +
                '<span class="learning-stage__component-subtitle">Sprawdzenie wstepne</span>' +
                '<h2 class="learning-stage__component-title">' + this.module.title + '</h2>' +
            '</div>' +
            renderQuestionCard(this.module.quiz.question, this.module.quiz.options, 'Zanim zaczniemy - przewidz odpowiedz') +
            '<div id="stage-actions" class="mt-lg text-center">' +
                '<button class="nav-button nav-button--primary" id="btn-continue" disabled>Przejdz do teorii</button>' +
            '</div>' +
        '</div>';
        this.attachAnswerListeners('prediction');
    };

    LearningModule.prototype.renderTheoryStage = function() {
        var self = this;
        this.container.innerHTML = '<div class="learning-stage">' +
            '<div class="learning-stage__header">' +
                '<span class="learning-stage__component-subtitle">Omowienie komponentu</span>' +
                '<h2 class="learning-stage__component-title">' + this.module.title + '</h2>' +
            '</div>' +
            renderSketchImage(this.module.id) +
            '<div class="learning-stage__description">' + this.module.description + '</div>' +
            '<div class="text-center">' +
                '<button class="nav-button nav-button--primary" id="btn-continue">Przejdz do sprawdzianu</button>' +
            '</div>' +
        '</div>';
        document.getElementById('btn-continue').addEventListener('click', function() { self.renderRecallStage(); });
    };

    LearningModule.prototype.renderRecallStage = function() {
        var self = this;
        this.container.innerHTML = '<div class="learning-stage">' +
            '<div class="learning-stage__header">' +
                '<span class="learning-stage__component-subtitle">Sprawdzenie wiedzy</span>' +
                '<h2 class="learning-stage__component-title">' + this.module.title + '</h2>' +
            '</div>' +
            renderQuestionCard(this.module.quiz.question, this.module.quiz.options, 'Sprawdz swoja wiedze') +
            '<div id="feedback-area"></div>' +
            '<div id="stage-actions" class="mt-lg text-center hidden">' +
                '<button class="nav-button nav-button--primary" id="btn-continue">Kontynuuj</button>' +
            '</div>' +
        '</div>';
        this.attachAnswerListeners('recall');
    };

    LearningModule.prototype.attachAnswerListeners = function(stage) {
        var self = this;
        var buttons = this.container.querySelectorAll('.answer-button');
        var continueBtn = document.getElementById('btn-continue');
        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var index = parseInt(btn.dataset.index);
                buttons.forEach(function(b) { updateAnswerButtonState(b, 'default'); });
                updateAnswerButtonState(btn, 'selected');
                self.selectedAnswer = index;
                if (stage === 'prediction') {
                    continueBtn.disabled = false;
                    continueBtn.addEventListener('click', function() { self.renderTheoryStage(); }, { once: true });
                } else if (stage === 'recall') {
                    self.handleRecallAnswer(index, buttons);
                }
            });
        });
    };

    LearningModule.prototype.handleRecallAnswer = function(selectedIndex, buttons) {
        var self = this;
        var correctIndex = this.module.quiz.answer;
        var feedbackArea = document.getElementById('feedback-area');
        var actionsArea = document.getElementById('stage-actions');
        var continueBtn = document.getElementById('btn-continue');
        buttons.forEach(function(b) { b.disabled = true; });

        if (selectedIndex === correctIndex) {
            updateAnswerButtonState(buttons[selectedIndex], 'correct');
            showToast('Poprawnie! Swietna robota.', 'success', 2000);
            actionsArea.classList.remove('hidden');
            continueBtn.addEventListener('click', function() { self.completeModule(); }, { once: true });
        } else {
            this.attempts++;
            updateAnswerButtonState(buttons[selectedIndex], 'incorrect');
            if (this.attempts === 1) {
                showToast('Nie tym razem. Sprobuj jeszcze raz.', 'error', 2500);
                feedbackArea.innerHTML = '<div class="mt-lg" style="text-align: center; color: var(--color-text-secondary); font-weight: 500; font-size: 0.9375rem;">Nie tym razem. Sprobuj jeszcze raz.</div>';
                setTimeout(function() {
                    buttons.forEach(function(b) { updateAnswerButtonState(b, 'default'); b.disabled = false; });
                    self.selectedAnswer = null;
                }, 1600);
            } else {
                showToast('Sprawdz poprawna odpowiedz ponizej.', 'info', 3000);
                updateAnswerButtonState(buttons[correctIndex], 'correct');
                feedbackArea.innerHTML = renderExplanationCard(this.module.quiz.explanation);
                actionsArea.classList.remove('hidden');
                continueBtn.addEventListener('click', function() { self.completeModule(); }, { once: true });
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
        var randomModule = LearningModule.getRandomPreviousQuestion(this.modules, this.module.id);
        if (!randomModule) { if (callback) callback(); return; }
        this.container.innerHTML = '<div class="learning-stage">' +
            renderSpacedRetrievalBanner() +
            '<div class="learning-stage__header">' +
                '<h2 class="learning-stage__component-title">Szybkie przypomnienie: ' + randomModule.title.replace(/<[^>]*>/g, ' ') + '</h2>' +
            '</div>' +
            renderQuestionCard(randomModule.quiz.question, randomModule.quiz.options) +
            '<div id="feedback-area"></div>' +
            '<div id="stage-actions" class="mt-lg text-center hidden">' +
                '<button class="nav-button nav-button--primary" id="btn-continue">Kontynuuj</button>' +
            '</div>' +
        '</div>';
        var buttons = this.container.querySelectorAll('.answer-button');
        var answered = false;
        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (answered) return;
                answered = true;
                var index = parseInt(btn.dataset.index);
                buttons.forEach(function(b) { b.disabled = true; });
                if (index === randomModule.quiz.answer) {
                    updateAnswerButtonState(btn, 'correct');
                    showToast('Poprawnie!', 'success', 2000);
                } else {
                    updateAnswerButtonState(btn, 'incorrect');
                    updateAnswerButtonState(buttons[randomModule.quiz.answer], 'correct');
                    document.getElementById('feedback-area').innerHTML = renderExplanationCard(randomModule.quiz.explanation);
                }
                document.getElementById('stage-actions').classList.remove('hidden');
                document.getElementById('btn-continue').addEventListener('click', function() { if (callback) callback(); }, { once: true });
            });
        });
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
            '<div class="quiz-progress">' +
                '<div class="quiz-progress__dots">' + dotsHtml + '</div>' +
                '<span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">Pytanie ' + (this.current + 1) + ' / ' + total + '</span>' +
            '</div>' +
            renderQuestionCard(q.question, q.options) +
            '<div id="feedback-area"></div>' +
            '<div id="stage-actions" class="mt-lg text-center hidden">' +
                '<button class="nav-button nav-button--primary" id="btn-continue">' + (this.current < total - 1 ? 'Nastepne pytanie' : 'Zobacz wynik') + '</button>' +
            '</div>' +
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
    };

    FinalQuiz.prototype.handleAnswer = function(selectedIndex, buttons) {
        var self = this;
        var q = this.quizData[this.current];
        var correct = selectedIndex === q.answer;
        var feedbackArea = document.getElementById('feedback-area');
        var actionsArea = document.getElementById('stage-actions');

        buttons.forEach(function(b) { b.disabled = true; });

        if (correct) {
            this.score++;
            updateAnswerButtonState(buttons[selectedIndex], 'correct');
            showToast('Poprawnie!', 'success', 1500);
        } else {
            updateAnswerButtonState(buttons[selectedIndex], 'incorrect');
            updateAnswerButtonState(buttons[q.answer], 'correct');
        }

        this.answers.push({ question: q.question, selected: selectedIndex, correct: correct, correctIndex: q.answer });

        feedbackArea.innerHTML = renderExplanationCard(q.explanation);
        actionsArea.classList.remove('hidden');

        document.getElementById('btn-continue').addEventListener('click', function() {
            self.current++;
            if (self.current < self.quizData.length) {
                self.renderQuestion();
            } else {
                self.renderSummary();
            }
        }, { once: true });
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

        var detailsHtml = this.answers.map(function(a, i) {
            var markerClass = a.correct ? 'quiz-summary__marker--correct' : 'quiz-summary__marker--incorrect';
            var markerText = a.correct ? '&#10003;' : '&#10005;';
            var answerHtml = !a.correct ? '<div class="quiz-summary__answer">Poprawna: ' + self.quizData[i].options[a.correctIndex] + '</div>' : '';
            return '<div class="quiz-summary__item">' +
                '<div class="quiz-summary__marker ' + markerClass + '" aria-hidden="true">' + markerText + '</div>' +
                '<div>' +
                    '<div class="quiz-summary__question">' + (i + 1) + '. ' + a.question + '</div>' +
                    answerHtml +
                '</div>' +
            '</div>';
        }).join('');

        this.container.innerHTML = '<div class="quiz-summary">' +
            '<div class="completion-screen__icon" aria-hidden="true">&#10003;</div>' +
            '<h1 class="completion-screen__title">Quiz ukonczony</h1>' +
            '<div class="quiz-summary__score">' + percentage + '%</div>' +
            '<div class="quiz-summary__label">' + this.score + ' / ' + total + ' poprawnych &middot; ' + grade + '</div>' +
            '<div class="quiz-summary__details">' + detailsHtml + '</div>' +
            '<div style="display: flex; flex-direction: column; gap: var(--space-md); align-items: center;">' +
                '<a href="' + rewardUrl + '" class="nav-button nav-button--primary" id="btn-reward" style="min-width: 220px; text-decoration: none; display: inline-flex; justify-content: center; align-items: center;">Odbierz nagrode</a>' +
                '<button class="nav-button nav-button--primary" id="btn-retry-quiz" style="min-width: 220px;">Powtorz quiz</button>' +
                '<button class="nav-button" id="btn-back-modules" style="min-width: 220px;">Wroc do modulow</button>' +
            '</div>' +
        '</div>';

        document.getElementById('btn-retry-quiz').addEventListener('click', function() { self.start(); });
        document.getElementById('btn-back-modules').addEventListener('click', function() {
            if (self.onFinish) self.onFinish();
        });
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
        var brandTitle = document.querySelector('.app-header__brand h1');
        if (brandTitle) brandTitle.textContent = this.data.title;

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

        this.updateProgressBar();
        this.renderFooter();
        this.navigateTo(this.state.view, this.state.currentModuleId, true);
        this.attachGlobalEvents();
    };

    CourseApp.prototype.attachGlobalEvents = function() {
        var self = this;
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && (self.state.view === 'learning' || self.state.view === 'diagram' || self.state.view === 'final-quiz')) {
                self.navigateTo('modules');
            }
        });

        var saveBtn = document.getElementById('btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                self.persist();
                var originalText = saveBtn.textContent;
                saveBtn.textContent = 'Zapisano!';
                saveBtn.classList.add('save-button--saved');
                showToast('Postep zapisany pomyslnie!', 'success', 2000);
                setTimeout(function() {
                    saveBtn.textContent = originalText;
                    saveBtn.classList.remove('save-button--saved');
                }, 2000);
            });
        }

        var resetBtn = document.getElementById('btn-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                if (confirm('Czy na pewno chcesz zresetowac caly postep? Ta operacja jest nieodwracalna.')) {
                    clearState();
                    self.data.modules.forEach(function(m, i) {
                        m.unlocked = i === 0;
                        m.completed = false;
                    });
                    window.location.reload();
                }
            });
        }
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
                prev: { label: '<- Strona glowna', disabled: false },
                center: { label: 'Diagram', primary: false },
                next: { label: 'Dalej', disabled: true }
            });
            var navPrev = document.getElementById('nav-prev');
            if (navPrev) navPrev.addEventListener('click', function() { window.location.href = 'index.html'; });
            var navCenter = document.getElementById('nav-center');
            if (navCenter) navCenter.addEventListener('click', function() { self.navigateTo('diagram'); });
        } else if (this.state.view === 'learning') {
            var moduleIndex = this.data.modules.findIndex(function(m) { return m.id === self.state.currentModuleId; });
            footer.innerHTML = renderNavigationFooter({
                prev: { label: 'Moduly', disabled: false },
                center: { label: 'Diagram', primary: false },
                next: { label: 'Dalej', disabled: moduleIndex >= this.data.modules.length - 1 }
            });
            var navPrev2 = document.getElementById('nav-prev');
            if (navPrev2) navPrev2.addEventListener('click', function() { self.navigateTo('modules'); });
            var navCenter2 = document.getElementById('nav-center');
            if (navCenter2) navCenter2.addEventListener('click', function() { self.navigateTo('diagram'); });
            var navNext = document.getElementById('nav-next');
            if (navNext) navNext.addEventListener('click', function() {
                var nextIndex = moduleIndex + 1;
                if (nextIndex < self.data.modules.length) {
                    var nextModule = self.data.modules[nextIndex];
                    if (nextModule.unlocked) self.startLearning(nextModule.id);
                    else showToast('Najpierw ukoncz biezacy modul.', 'info', 2000);
                }
            });
        } else if (this.state.view === 'diagram') {
            footer.innerHTML = renderNavigationFooter({
                prev: { label: 'Wstecz', disabled: false },
                next: { label: 'Dalej', disabled: true }
            });
            var navPrev3 = document.getElementById('nav-prev');
            if (navPrev3) navPrev3.addEventListener('click', function() { self.navigateTo('modules'); });
        } else if (this.state.view === 'completion') {
            footer.innerHTML = renderNavigationFooter({
                prev: { label: 'Moduly', disabled: false },
                center: { label: 'Diagram', primary: false },
                next: { label: 'Dalej', disabled: true }
            });
            var navPrev4 = document.getElementById('nav-prev');
            if (navPrev4) navPrev4.addEventListener('click', function() { self.navigateTo('modules'); });
            var navCenter4 = document.getElementById('nav-center');
            if (navCenter4) navCenter4.addEventListener('click', function() { self.navigateTo('diagram'); });
        } else if (this.state.view === 'final-quiz') {
            footer.innerHTML = renderNavigationFooter({
                prev: { label: '<- Zakoncz quiz', disabled: false },
                next: { label: 'Dalej', disabled: true }
            });
            var navPrev5 = document.getElementById('nav-prev');
            if (navPrev5) navPrev5.addEventListener('click', function() { self.navigateTo('completion'); });
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
            container.innerHTML = '<div style="background: var(--color-accent-light); border: 1.5px solid var(--color-accent); border-radius: var(--radius-md); padding: var(--space-lg); margin-bottom: var(--space-xl); text-align: center;">' +
                '<strong style="color: var(--color-accent); font-size: 0.9375rem;">Wszystkie moduly ukonczone!</strong>' +
                '<p style="margin-top: var(--space-sm); font-size: 0.875rem; color: var(--color-text-secondary);">Mozesz teraz przejrzec pelny diagram układu lub rozwiazac quiz koncowy.</p>' +
            '</div>';
        } else {
            container.innerHTML = '<h2 class="mb-lg" style="font-size: 1rem; color: var(--color-text-secondary); font-weight: 500;">Wybierz modul, aby rozpoczac</h2>';
        }
        var grid = document.createElement('div');
        grid.className = 'modules-grid';
        grid.setAttribute('role', 'list');
        this.data.modules.forEach(function(module, index) {
            var wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'listitem');
            wrapper.innerHTML = renderModuleCard(module, index);
            grid.appendChild(wrapper);
        });
        container.appendChild(grid);

        grid.querySelectorAll('.module-card').forEach(function(card) {
            var moduleId = card.dataset.moduleId;
            var module = self.data.modules.find(function(m) { return m.id === moduleId; });
            var handleActivate = function() {
                if (module.unlocked) self.startLearning(moduleId);
                else showToast('Ukoncz wczesniejsze moduly, aby odblokowac.', 'info', 2000);
            };
            card.addEventListener('click', handleActivate);
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); }
            });
        });
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
                else { showToast('Modul ukonczony!', 'success', 2000); self.navigateTo('modules'); }
            },
            function() {
                self.learning.renderSpacedRetrieval(function() {
                    self.persist();
                    var allCompleted = self.data.modules.every(function(m) { return m.completed; });
                    if (allCompleted) self.navigateTo('completion');
                    else { showToast('Modul ukonczony!', 'success', 2000); self.navigateTo('modules'); }
                });
            }
        );
        this.learning.start();
    };

    CourseApp.prototype.renderDiagramView = function(container) {
        container.innerHTML = '<h2 class="mb-lg" style="text-align: center; font-size: 1.125rem;">Diagram: ' + this.data.title + '</h2><div id="diagram-root"></div>';
        this.diagram = new CourseDiagram('diagram-root', this.data.modules, this.data.diagramOrder);
        this.diagram.render();
    };

    CourseApp.prototype.renderCompletionView = function(container) {
        var completed = this.data.modules.filter(function(m) { return m.completed; }).length;
        container.innerHTML = renderCompletionScreen(completed, this.data.title);
        var self = this;
        var btnDiagram = document.getElementById('btn-view-diagram');
        if (btnDiagram) btnDiagram.addEventListener('click', function() { self.navigateTo('diagram'); });
        var btnQuiz = document.getElementById('btn-start-final-quiz');
        if (btnQuiz) btnQuiz.addEventListener('click', function() { self.navigateTo('final-quiz'); });
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
                main.innerHTML = '<div style="text-align: center; padding: 4rem 2rem;">' +
                    '<h2 style="color: var(--color-error); margin-bottom: 1rem;">Blad ladowania kursu</h2>' +
                    '<p>Nie udalo sie zaladowac danych kursu. Sprawdz parametr <code>?course=</code> w adresie URL.</p>' +
                    '<a href="index.html" class="nav-button nav-button--primary" style="margin-top: 2rem; display: inline-block;">Wroc do strony glownej</a>' +
                '</div>';
            }
            return;
        }
        new CourseApp(window.COURSE_DATA);
    };
})();