
course_engine_js = '''// ========================================
// INSIDE THE ENGINE — Course Engine (Universal)
// ========================================
// Ten silnik dziala z dowolnym plikiem courses/<course>/data.js
// Wymaga globalnej zmiennej: window.COURSE_DATA
// ========================================

(function() {
    'use strict';

    // --- KONFIGURACJA ---
    const COURSE_ID = new URLSearchParams(window.location.search).get('course') || 'ignition';
    const STORAGE_KEY = `ite_course_${COURSE_ID}`;

    // --- IKONY SVG (wspólne + z kursu) ---
    const DEFAULT_ICONS = {
        'default': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="24"/><path d="M32 16v32M16 32h32"/></svg>`,
        'check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        'arrow-left': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
        'arrow-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
        'home': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
    };

    function getIcon(id, sizeClass = '') {
        const icons = { ...DEFAULT_ICONS, ...(window.COURSE_DATA?.icons || {}) };
        const svg = icons[id] || icons['default'];
        return `<div class="component-icon ${sizeClass}">${svg}</div>`;
    }

    function getDiagramIcon(id) {
        const icons = { ...DEFAULT_ICONS, ...(window.COURSE_DATA?.icons || {}) };
        const svg = icons[id] || icons['default'];
        return `<div class="diagram-node__icon">${svg}</div>`;
    }

    // --- PERSISTENCE ---
    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                modules: state.modules.map(m => ({ id: m.id, unlocked: m.unlocked, completed: m.completed })),
                view: state.view,
                currentModuleId: state.currentModuleId
            }));
        } catch (e) {
            console.warn('Nie udalo sie zapisac stanu', e);
        }
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
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
        const completed = modules.filter(m => m.completed).length;
        const total = modules.length;
        const pct = Math.round((completed / total) * 100);
        return `
            <div class="progress-bar" aria-label="Postep kursu: ukonczono ${completed} z ${total} modulów">
                <div class="progress-bar__track" role="progressbar" aria-valuenow="${completed}" aria-valuemin="0" aria-valuemax="${total}">
                    <div class="progress-bar__fill" style="width: ${pct}%"></div>
                </div>
                <span class="progress-bar__label">${completed}/${total}</span>
            </div>`;
    }

    function renderModuleCard(module, index) {
        const statusClass = module.completed ? 'module-card--completed' : module.unlocked ? '' : 'module-card--locked';
        const statusText = module.completed ? 'Ukonczony' : module.unlocked ? 'Dostepny' : 'Zablokowany';
        const statusClassName = module.completed ? 'module-card__status--completed' : 'module-card__status--locked';
        return `
            <article class="module-card ${statusClass}" data-module-id="${module.id}" role="button" tabindex="${module.unlocked ? '0' : '-1'}" aria-label="Modul ${index + 1}: ${module.title.replace(/<[^>]*>/g, ' ')}. Status: ${statusText}">
                <div class="module-card__header">
                    <h3 class="module-card__title">${index + 1}. ${module.title}</h3>
                </div>
                ${getIcon(module.id)}
                <span class="module-card__status ${statusClassName}">${statusText}</span>
            </article>`;
    }

    function renderQuestionCard(question, options, stageLabel = '') {
        const letters = ['A', 'B', 'C'];
        return `
            <div class="question-card">
                ${stageLabel ? `<span class="question-card__counter">${stageLabel}</span>` : ''}
                <h2 class="question-card__title">${question}</h2>
                <div class="answers-list" role="radiogroup" aria-label="Opcje odpowiedzi">
                    ${options.map((opt, i) => `
                        <button class="answer-button" data-index="${i}" role="radio" aria-checked="false" aria-label="Opcja ${letters[i]}: ${opt}">
                            <span class="answer-button__letter" aria-hidden="true">${letters[i]}</span>
                            <span>${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>`;
    }

    function updateAnswerButtonState(btn, state) {
        btn.classList.remove('answer-button--selected', 'answer-button--correct', 'answer-button--incorrect');
        btn.setAttribute('aria-checked', 'false');
        if (state === 'selected') { btn.classList.add('answer-button--selected'); btn.setAttribute('aria-checked', 'true'); }
        else if (state === 'correct') { btn.classList.add('answer-button--correct'); btn.setAttribute('aria-checked', 'true'); }
        else if (state === 'incorrect') { btn.classList.add('answer-button--incorrect'); }
        btn.disabled = state !== 'default';
    }

    function renderExplanationCard(explanation) {
        return `
            <div class="explanation-card" role="alert" aria-live="polite">
                <div class="explanation-card__title">Wyjasnienie</div>
                <p class="explanation-card__text">${explanation}</p>
            </div>`;
    }

    function renderSketchImage(id, caption = '') {
        return `
            <figure class="sketch-image">
                ${getIcon(id, 'sketch-icon')}
                ${caption ? `<figcaption class="sketch-image__caption">${caption}</figcaption>` : ''}
            </figure>`;
    }

    function renderNavigationFooter({ prev = null, next = null, center = null } = {}) {
        return `
            <button class="nav-button ${prev?.primary ? 'nav-button--primary' : ''}" id="nav-prev" ${prev?.disabled ? 'disabled' : ''} aria-label="${prev?.label || 'Poprzedni'}">${prev?.label || 'Poprzedni'}</button>
            ${center ? `<button class="nav-button ${center.primary ? 'nav-button--primary' : ''}" id="nav-center" ${center.disabled ? 'disabled' : ''} aria-label="${center.label}">${center.label}</button>` : '<div aria-hidden="true"></div>'}
            <button class="nav-button ${next?.primary ? 'nav-button--primary' : ''}" id="nav-next" ${next?.disabled ? 'disabled' : ''} aria-label="${next?.label || 'Nastepny'}">${next?.label || 'Nastepny'}</button>
        `;
    }

    function showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0'; toast.style.transform = 'translateX(16px)'; toast.style.transition = 'all 200ms ease-out';
            setTimeout(() => toast.remove(), 200);
        }, duration);
    }

    function renderCompletionScreen(completed, courseTitle) {
        return `
            <div class="completion-screen">
                <div class="completion-screen__icon" aria-hidden="true">?</div>
                <h1 class="completion-screen__title">Szkolenie ukonczone</h1>
                <p class="completion-screen__text">Pomyslnie ukonczyles wszystkie ${completed} moduly kursu ${courseTitle}. Pelny diagram systemu jest teraz dostepny do przegladu.</p>
                <div style="display: flex; flex-direction: column; gap: var(--space-md); align-items: center;">
                    <button class="nav-button nav-button--primary" id="btn-view-diagram" style="min-width: 220px;">Zobacz pelny diagram</button>
                    <button class="nav-button" id="btn-start-final-quiz" style="min-width: 220px; border-color: var(--color-accent); color: var(--color-accent);">Rozpocznij quiz koncowy</button>
                </div>
            </div>`;
    }

    function renderSpacedRetrievalBanner() {
        return `
            <div class="spaced-retrieval-banner">
                <div class="spaced-retrieval-banner__label">Aktywne Przypomnienie</div>
                <p style="font-size: 0.875rem; color: var(--color-text-secondary);">Krótkie pytanie z wczesniejszego modulu na utrwalenie wiedzy.</p>
            </div>`;
    }

    // --- DIAGRAM ---
    class CourseDiagram {
        constructor(containerId, modules, diagramOrder) {
            this.container = document.getElementById(containerId);
            this.modules = modules;
            this.diagramOrder = diagramOrder;
        }

        render() {
            if (!this.container) return;
            const completedIds = this.modules.filter(m => m.completed).map(m => m.id);
            const visibleIds = new Set();
            this.diagramOrder.forEach((id, index) => {
                if (index === 0) visibleIds.add(id);
                else {
                    const prevId = this.diagramOrder[index - 1];
                    const prevModule = this.modules.find(m => m.id === prevId);
                    if (prevModule?.completed || completedIds.includes(id)) visibleIds.add(id);
                }
            });
            this.modules.forEach(m => { if (m.unlocked) visibleIds.add(m.id); });

            this.container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'diagram-container';
            const nodesContainer = document.createElement('div');
            nodesContainer.className = 'diagram-nodes';

            this.diagramOrder.forEach((id, index) => {
                if (!visibleIds.has(id)) return;
                const module = this.modules.find(m => m.id === id);
                const isCompleted = module?.completed;
                const isActive = module?.unlocked && !module?.completed;
                const node = document.createElement('div');
                node.className = `diagram-node ${isActive ? 'diagram-node--active' : ''} ${!module?.unlocked ? 'diagram-node--locked' : ''}`;
                node.dataset.id = id;
                node.innerHTML = `
                    <div class="diagram-node__number">${index + 1}</div>
                    ${getDiagramIcon(id)}
                    <span class="diagram-node__label">${module.title.replace(/<[^>]*>/g, ' ')}</span>
                `;
                nodesContainer.appendChild(node);
            });

            wrapper.appendChild(nodesContainer);
            this.container.appendChild(wrapper);
        }
    }

    // --- LEARNING MODULE ---
    class LearningModule {
        constructor(moduleId, modules, onComplete, onSpacedRetrieval) {
            this.module = modules.find(m => m.id === moduleId);
            this.modules = modules;
            this.onComplete = onComplete;
            this.onSpacedRetrieval = onSpacedRetrieval;
            this.container = document.getElementById('main-content');
            this.attempts = 0;
            this.selectedAnswer = null;
        }

        start() { this.renderPredictionStage(); }

        renderPredictionStage() {
            this.container.innerHTML = `
                <div class="learning-stage">
                    <div class="learning-stage__header">
                        <span class="learning-stage__component-subtitle">Sprawdzenie wstepne</span>
                        <h2 class="learning-stage__component-title">${this.module.title}</h2>
                    </div>
                    ${renderQuestionCard(this.module.quiz.question, this.module.quiz.options, 'Zanim zaczniemy — przewidz odpowiedz')}
                    <div id="stage-actions" class="mt-lg text-center">
                        <button class="nav-button nav-button--primary" id="btn-continue" disabled>Przejdz do teorii</button>
                    </div>
                </div>`;
            this.attachAnswerListeners('prediction');
        }

        renderTheoryStage() {
            this.container.innerHTML = `
                <div class="learning-stage">
                    <div class="learning-stage__header">
                        <span class="learning-stage__component-subtitle">Omówienie komponentu</span>
                        <h2 class="learning-stage__component-title">${this.module.title}</h2>
                    </div>
                    ${renderSketchImage(this.module.id)}
                    <div class="learning-stage__description">${this.module.description}</div>
                    <div class="text-center">
                        <button class="nav-button nav-button--primary" id="btn-continue">Przejdz do sprawdzianu</button>
                    </div>
                </div>`;
            document.getElementById('btn-continue').addEventListener('click', () => this.renderRecallStage());
        }

        renderRecallStage() {
            this.container.innerHTML = `
                <div class="learning-stage">
                    <div class="learning-stage__header">
                        <span class="learning-stage__component-subtitle">Sprawdzenie wiedzy</span>
                        <h2 class="learning-stage__component-title">${this.module.title}</h2>
                    </div>
                    ${renderQuestionCard(this.module.quiz.question, this.module.quiz.options, 'Sprawdz swoja wiedze')}
                    <div id="feedback-area"></div>
                    <div id="stage-actions" class="mt-lg text-center hidden">
                        <button class="nav-button nav-button--primary" id="btn-continue">Kontynuuj</button>
                    </div>
                </div>`;
            this.attachAnswerListeners('recall');
        }

        attachAnswerListeners(stage) {
            const buttons = this.container.querySelectorAll('.answer-button');
            const continueBtn = document.getElementById('btn-continue');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    buttons.forEach(b => updateAnswerButtonState(b, 'default'));
                    updateAnswerButtonState(btn, 'selected');
                    this.selectedAnswer = index;
                    if (stage === 'prediction') {
                        continueBtn.disabled = false;
                        continueBtn.addEventListener('click', () => this.renderTheoryStage(), { once: true });
                    } else if (stage === 'recall') {
                        this.handleRecallAnswer(index, buttons);
                    }
                });
            });
        }

        handleRecallAnswer(selectedIndex, buttons) {
            const correctIndex = this.module.quiz.answer;
            const feedbackArea = document.getElementById('feedback-area');
            const actionsArea = document.getElementById('stage-actions');
            const continueBtn = document.getElementById('btn-continue');
            buttons.forEach(b => b.disabled = true);

            if (selectedIndex === correctIndex) {
                updateAnswerButtonState(buttons[selectedIndex], 'correct');
                showToast('Poprawnie! Swietna robota.', 'success', 2000);
                actionsArea.classList.remove('hidden');
                continueBtn.addEventListener('click', () => this.completeModule(), { once: true });
            } else {
                this.attempts++;
                updateAnswerButtonState(buttons[selectedIndex], 'incorrect');
                if (this.attempts === 1) {
                    showToast('Nie tym razem. Spróbuj jeszcze raz.', 'error', 2500);
                    feedbackArea.innerHTML = `<div class="mt-lg" style="text-align: center; color: var(--color-text-secondary); font-weight: 500; font-size: 0.9375rem;">Nie tym razem. Spróbuj jeszcze raz.</div>`;
                    setTimeout(() => {
                        buttons.forEach(b => { updateAnswerButtonState(b, 'default'); b.disabled = false; });
                        this.selectedAnswer = null;
                    }, 1600);
                } else {
                    showToast('Sprawdz poprawna odpowiedz ponizej.', 'info', 3000);
                    updateAnswerButtonState(buttons[correctIndex], 'correct');
                    feedbackArea.innerHTML = renderExplanationCard(this.module.quiz.explanation);
                    actionsArea.classList.remove('hidden');
                    continueBtn.addEventListener('click', () => this.completeModule(), { once: true });
                }
            }
        }

        completeModule() {
            this.module.completed = true;
            const currentIndex = this.modules.findIndex(m => m.id === this.module.id);
            if (currentIndex < this.modules.length - 1) this.modules[currentIndex + 1].unlocked = true;
            const completedCount = this.modules.filter(m => m.completed).length;
            if (completedCount % 3 === 0 && completedCount > 0) {
                if (this.onSpacedRetrieval) { this.onSpacedRetrieval(); return; }
            }
            if (this.onComplete) this.onComplete();
        }

        static getRandomPreviousQuestion(modules, excludeModuleId) {
            const completedModules = modules.filter(m => m.completed && m.id !== excludeModuleId);
            if (completedModules.length === 0) return null;
            return completedModules[Math.floor(Math.random() * completedModules.length)];
        }

        renderSpacedRetrieval(callback) {
            const randomModule = LearningModule.getRandomPreviousQuestion(this.modules, this.module.id);
            if (!randomModule) { if (callback) callback(); return; }
            this.container.innerHTML = `
                <div class="learning-stage">
                    ${renderSpacedRetrievalBanner()}
                    <div class="learning-stage__header">
                        <h2 class="learning-stage__component-title">Szybkie przypomnienie: ${randomModule.title.replace(/<[^>]*>/g, ' ')}</h2>
                    </div>
                    ${renderQuestionCard(randomModule.quiz.question, randomModule.quiz.options)}
                    <div id="feedback-area"></div>
                    <div id="stage-actions" class="mt-lg text-center hidden">
                        <button class="nav-button nav-button--primary" id="btn-continue">Kontynuuj</button>
                    </div>
                </div>`;
            const buttons = this.container.querySelectorAll('.answer-button');
            let answered = false;
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (answered) return;
                    answered = true;
                    const index = parseInt(btn.dataset.index);
                    buttons.forEach(b => b.disabled = true);
                    if (index === randomModule.quiz.answer) {
                        updateAnswerButtonState(btn, 'correct');
                        showToast('Poprawnie!', 'success', 2000);
                    } else {
                        updateAnswerButtonState(btn, 'incorrect');
                        updateAnswerButtonState(buttons[randomModule.quiz.answer], 'correct');
                        document.getElementById('feedback-area').innerHTML = renderExplanationCard(randomModule.quiz.explanation);
                    }
                    document.getElementById('stage-actions').classList.remove('hidden');
                    document.getElementById('btn-continue').addEventListener('click', () => { if (callback) callback(); }, { once: true });
                });
            });
        }
    }

    // --- FINAL QUIZ ---
    class FinalQuiz {
        constructor(quizData, onFinish) {
            this.quizData = quizData;
            this.onFinish = onFinish;
            this.container = document.getElementById('main-content');
            this.current = 0;
            this.score = 0;
            this.answers = [];
            this.answered = false;
        }

        start() {
            this.current = 0;
            this.score = 0;
            this.answers = [];
            this.renderQuestion();
        }

        renderQuestion() {
            const q = this.quizData[this.current];
            const total = this.quizData.length;
            this.answered = false;

            this.container.innerHTML = `
                <div class="learning-stage">
                    <div class="quiz-progress">
                        <div class="quiz-progress__dots">
                            ${this.quizData.map((_, i) => {
                                let cls = 'quiz-progress__dot';
                                if (i < this.current) {
                                    cls += this.answers[i].correct ? ' quiz-progress__dot--correct' : ' quiz-progress__dot--incorrect';
                                } else if (i === this.current) {
                                    cls += ' quiz-progress__dot--current';
                                }
                                return `<div class="${cls}" aria-hidden="true"></div>`;
                            }).join('')}
                        </div>
                        <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">Pytanie ${this.current + 1} / ${total}</span>
                    </div>
                    ${renderQuestionCard(q.question, q.options)}
                    <div id="feedback-area"></div>
                    <div id="stage-actions" class="mt-lg text-center hidden">
                        <button class="nav-button nav-button--primary" id="btn-continue">${this.current < total - 1 ? 'Nastepne pytanie' : 'Zobacz wynik'}</button>
                    </div>
                </div>
            `;

            const buttons = this.container.querySelectorAll('.answer-button');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (this.answered) return;
                    this.answered = true;
                    const index = parseInt(btn.dataset.index);
                    this.handleAnswer(index, buttons);
                });
            });
        }

        handleAnswer(selectedIndex, buttons) {
            const q = this.quizData[this.current];
            const correct = selectedIndex === q.answer;
            const feedbackArea = document.getElementById('feedback-area');
            const actionsArea = document.getElementById('stage-actions');

            buttons.forEach(b => b.disabled = true);

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

            document.getElementById('btn-continue').addEventListener('click', () => {
                this.current++;
                if (this.current < this.quizData.length) {
                    this.renderQuestion();
                } else {
                    this.renderSummary();
                }
            }, { once: true });
        }

        renderSummary() {
            const total = this.quizData.length;
            const percentage = Math.round((this.score / total) * 100);
            let grade = '';
            if (percentage >= 90) grade = 'Celujacy';
            else if (percentage >= 80) grade = 'Bardzo dobry';
            else if (percentage >= 70) grade = 'Dobry';
            else if (percentage >= 60) grade = 'Dostateczny';
            else grade = 'Wymaga powtórki';

            const rewardUrl = window.COURSE_DATA?.rewardUrl || '#';

            this.container.innerHTML = `
                <div class="quiz-summary">
                    <div class="completion-screen__icon" aria-hidden="true">?</div>
                    <h1 class="completion-screen__title">Quiz ukonczony</h1>
                    <div class="quiz-summary__score">${percentage}%</div>
                    <div class="quiz-summary__label">${this.score} / ${total} poprawnych · ${grade}</div>
                    
                    <div class="quiz-summary__details">
                        ${this.answers.map((a, i) => `
                            <div class="quiz-summary__item">
                                <div class="quiz-summary__marker ${a.correct ? 'quiz-summary__marker--correct' : 'quiz-summary__marker--incorrect'}" aria-hidden="true">${a.correct ? '?' : '?'}</div>
                                <div>
                                    <div class="quiz-summary__question">${i + 1}. ${a.question}</div>
                                    ${!a.correct ? `<div class="quiz-summary__answer">Poprawna: ${this.quizData[i].options[a.correctIndex]}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display: flex; flex-direction: column; gap: var(--space-md); align-items: center;">
                        <a href="${rewardUrl}" class="nav-button nav-button--primary" id="btn-reward" style="min-width: 220px; text-decoration: none; display: inline-flex; justify-content: center; align-items: center;">Odbierz nagrode</a>
                        <button class="nav-button nav-button--primary" id="btn-retry-quiz" style="min-width: 220px;">Powtórz quiz</button>
                        <button class="nav-button" id="btn-back-modules" style="min-width: 220px;">Wróc do modulów</button>
                    </div>
                </div>
            `;

            document.getElementById('btn-retry-quiz').addEventListener('click', () => this.start());
            document.getElementById('btn-back-modules').addEventListener('click', () => {
                if (this.onFinish) this.onFinish();
            });
        }
    }

    // --- MAIN APP ---
    class CourseApp {
        constructor(data) {
            this.data = data;
            this.state = { view: 'modules', currentModuleId: null };
            this.diagram = null;
            this.learning = null;
            this.finalQuiz = null;
            this.init();
        }

        init() {
            // Ustaw tytul
            document.title = this.data.title;
            const brandTitle = document.querySelector('.app-header__brand h1');
            if (brandTitle) brandTitle.textContent = this.data.title;

            // Wczytaj stan
            const saved = loadState();
            if (saved) {
                if (saved.modules) {
                    saved.modules.forEach(savedMod => {
                        const mod = this.data.modules.find(m => m.id === savedMod.id);
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
        }

        attachGlobalEvents() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && (this.state.view === 'learning' || this.state.view === 'diagram' || this.state.view === 'final-quiz')) {
                    this.navigateTo('modules');
                }
            });

            const saveBtn = document.getElementById('btn-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    this.persist();
                    const originalText = saveBtn.textContent;
                    saveBtn.textContent = 'Zapisano!';
                    saveBtn.classList.add('save-button--saved');
                    showToast('Postep zapisany pomyslnie!', 'success', 2000);
                    setTimeout(() => {
                        saveBtn.textContent = originalText;
                        saveBtn.classList.remove('save-button--saved');
                    }, 2000);
                });
            }

            const resetBtn = document.getElementById('btn-reset');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('Czy na pewno chcesz zresetowac caly postep? Ta operacja jest nieodwracalna.')) {
                        clearState();
                        this.data.modules.forEach((m, i) => {
                            m.unlocked = i === 0;
                            m.completed = false;
                        });
                        window.location.reload();
                    }
                });
            }
        }

        persist() {
            saveState({
                modules: this.data.modules,
                view: this.state.view,
                currentModuleId: this.state.currentModuleId
            });
        }

        updateProgressBar() {
            const container = document.getElementById('progress-container');
            if (container) container.innerHTML = renderProgressBar(this.data.modules);
        }

        renderFooter() {
            const footer = document.getElementById('navigation-footer');
            if (!footer) return;

            if (this.state.view === 'modules') {
                footer.innerHTML = renderNavigationFooter({
                    prev: { label: '? Strona glówna', disabled: false },
                    center: { label: 'Diagram', primary: false },
                    next: { label: 'Dalej', disabled: true }
                });
                document.getElementById('nav-prev')?.addEventListener('click', () => {
                    window.location.href = 'index.html';
                });
                document.getElementById('nav-center')?.addEventListener('click', () => this.navigateTo('diagram'));
            } else if (this.state.view === 'learning') {
                const moduleIndex = this.data.modules.findIndex(m => m.id === this.state.currentModuleId);
                footer.innerHTML = renderNavigationFooter({
                    prev: { label: 'Moduly', disabled: false },
                    center: { label: 'Diagram', primary: false },
                    next: { label: 'Dalej', disabled: moduleIndex >= this.data.modules.length - 1 }
                });
                document.getElementById('nav-prev')?.addEventListener('click', () => this.navigateTo('modules'));
                document.getElementById('nav-center')?.addEventListener('click', () => this.navigateTo('diagram'));
                document.getElementById('nav-next')?.addEventListener('click', () => {
                    const nextIndex = moduleIndex + 1;
                    if (nextIndex < this.data.modules.length) {
                        const nextModule = this.data.modules[nextIndex];
                        if (nextModule.unlocked) this.startLearning(nextModule.id);
                        else showToast('Najpierw ukoncz biezacy modul.', 'info', 2000);
                    }
                });
            } else if (this.state.view === 'diagram') {
                footer.innerHTML = renderNavigationFooter({
                    prev: { label: 'Wstecz', disabled: false },
                    next: { label: 'Dalej', disabled: true }
                });
                document.getElementById('nav-prev')?.addEventListener('click', () => this.navigateTo('modules'));
            } else if (this.state.view === 'completion') {
                footer.innerHTML = renderNavigationFooter({
                    prev: { label: 'Moduly', disabled: false },
                    center: { label: 'Diagram', primary: false },
                    next: { label: 'Dalej', disabled: true }
                });
                document.getElementById('nav-prev')?.addEventListener('click', () => this.navigateTo('modules'));
                document.getElementById('nav-center')?.addEventListener('click', () => this.navigateTo('diagram'));
            } else if (this.state.view === 'final-quiz') {
                footer.innerHTML = renderNavigationFooter({
                    prev: { label: '? Zakoncz quiz', disabled: false },
                    next: { label: 'Dalej', disabled: true }
                });
                document.getElementById('nav-prev')?.addEventListener('click', () => this.navigateTo('completion'));
            }
        }

        navigateTo(view, moduleId = null, skipPersist = false) {
            this.state.view = view;
            this.state.currentModuleId = moduleId;
            const main = document.getElementById('main-content');
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
        }

        renderModulesView(container) {
            container.innerHTML = '';
            const allCompleted = this.data.modules.every(m => m.completed);
            if (allCompleted && this.data.modules.length > 0) {
                container.innerHTML = `
                    <div style="background: var(--color-accent-light); border: 1.5px solid var(--color-accent); border-radius: var(--radius-md); padding: var(--space-lg); margin-bottom: var(--space-xl); text-align: center;">
                        <strong style="color: var(--color-accent); font-size: 0.9375rem;">Wszystkie moduly ukonczone!</strong>
                        <p style="margin-top: var(--space-sm); font-size: 0.875rem; color: var(--color-text-secondary);">Mozesz teraz przejrzec pelny diagram ukladu lub rozwiazac quiz koncowy.</p>
                    </div>`;
            } else {
                container.innerHTML = '<h2 class="mb-lg" style="font-size: 1rem; color: var(--color-text-secondary); font-weight: 500;">Wybierz modul, aby rozpoczac</h2>';
            }
            const grid = document.createElement('div');
            grid.className = 'modules-grid';
            grid.setAttribute('role', 'list');
            this.data.modules.forEach((module, index) => {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('role', 'listitem');
                wrapper.innerHTML = renderModuleCard(module, index);
                grid.appendChild(wrapper);
            });
            container.appendChild(grid);

            grid.querySelectorAll('.module-card').forEach(card => {
                const moduleId = card.dataset.moduleId;
                const module = this.data.modules.find(m => m.id === moduleId);
                const handleActivate = () => {
                    if (module.unlocked) this.startLearning(moduleId);
                    else showToast('Ukoncz wczesniejsze moduly, aby odblokowac.', 'info', 2000);
                };
                card.addEventListener('click', handleActivate);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); }
                });
            });
        }

        startLearning(moduleId) {
            this.state.view = 'learning';
            this.state.currentModuleId = moduleId;
            this.persist();
            this.renderFooter();
            const module = this.data.modules.find(m => m.id === moduleId);
            if (!module.unlocked) { showToast('Modul jest zablokowany.', 'error', 2000); this.navigateTo('modules'); return; }

            this.learning = new LearningModule(
                moduleId,
                this.data.modules,
                () => {
                    this.persist();
                    const allCompleted = this.data.modules.every(m => m.completed);
                    if (allCompleted) this.navigateTo('completion');
                    else { showToast('Modul ukonczony!', 'success', 2000); this.navigateTo('modules'); }
                },
                () => {
                    this.learning.renderSpacedRetrieval(() => {
                        this.persist();
                        const allCompleted = this.data.modules.every(m => m.completed);
                        if (allCompleted) this.navigateTo('completion');
                        else { showToast('Modul ukonczony!', 'success', 2000); this.navigateTo('modules'); }
                    });
                }
            );
            this.learning.start();
        }

        renderDiagramView(container) {
            container.innerHTML = `<h2 class="mb-lg" style="text-align: center; font-size: 1.125rem;">Diagram: ${this.data.title}</h2><div id="diagram-root"></div>`;
            this.diagram = new CourseDiagram('diagram-root', this.data.modules, this.data.diagramOrder);
            this.diagram.render();
        }

        renderCompletionView(container) {
            const completed = this.data.modules.filter(m => m.completed).length;
            container.innerHTML = renderCompletionScreen(completed, this.data.title);
            document.getElementById('btn-view-diagram')?.addEventListener('click', () => this.navigateTo('diagram'));
            document.getElementById('btn-start-final-quiz')?.addEventListener('click', () => this.navigateTo('final-quiz'));
        }

        renderFinalQuizView(container) {
            container.innerHTML = '';
            this.finalQuiz = new FinalQuiz(this.data.finalQuiz, () => this.navigateTo('modules'));
            this.finalQuiz.start();
        }
    }

    // --- INICJALIZACJA ---
    window.initCourse = function() {
        if (!window.COURSE_DATA) {
            console.error('Brak danych kursu! Upewnij sie, ze zaladowales plik data.js przed courseEngine.js');
            document.getElementById('main-content').innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem;">
                    <h2 style="color: var(--color-error); margin-bottom: 1rem;">Blad ladowania kursu</h2>
                    <p>Nie udalo sie zaladowac danych kursu. Sprawdz parametr <code>?course=</code> w adresie URL.</p>
                    <a href="index.html" class="nav-button nav-button--primary" style="margin-top: 2rem; display: inline-block;">Wróc do strony glównej</a>
                </div>`;
            return;
        }
        new CourseApp(window.COURSE_DATA);
    };
})();
'''

with open('/mnt/agents/output/engine-learning/assets/js/courseEngine.js', 'w', encoding='utf-8') as f:
    f.write(course_engine_js)

print("courseEngine.js zapisany.")
