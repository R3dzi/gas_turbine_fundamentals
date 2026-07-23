// ========================================
// COURSE: Układ Zapłonowy (Ignition System)
// ========================================

window.COURSE_DATA = {
    id: 'ignition',
    title: 'Układ Zapłonowy',
    rewardUrl: 'https://sites.google.com/view/inside-the-engine/systemy/zaplonowy/mind_map_ignition',

    // --- IKONY SVG ---
    icons: {
        'exciter': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="36" height="36" rx="4"/><path d="M33 20l-7 12h8l-3 12 11-14h-8l3-10z"/><path d="M50 24h6"/><path d="M50 40h6"/><path d="M22 50v6"/><path d="M42 50v6"/></svg>`,

        'ignition-leads': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18h8v12h-8z"/><path d="M44 34h8v12h-8z"/><path d="M20 24c12 0 12 20 24 20"/><path d="M12 24H8"/><path d="M56 40h-4"/><path d="M24 16v16"/><path d="M40 32v16"/></svg>`,

        'igniter-plugs': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 10h16v10H24z"/><rect x="20" y="20" width="24" height="12" rx="1"/><path d="M24 32v12h16V32"/><path d="M24 36h16"/><path d="M24 40h16"/><path d="M28 44v8h8v-8"/><path d="M26 58h12"/><path d="M32 52v3"/><path d="M30 57l2-2 2 2"/></svg>`
    },

    // --- KOLEJNOŚĆ W DIAGRAMIE ---
    diagramOrder: [
        "exciter",
        "ignition-leads",
        "igniter-plugs"
    ],

    // --- MODUŁY ---
    modules: [
        {
            id: "exciter",
            title: "Agregat Zapłonowy",
            description: "Przetwarza niskie napięcie z instalacji pokładowej samolotu na wysokowoltowe impulsy elektryczne magazynowane w kondensatorach i przekazywane do świec zapłonowych.",
            unlocked: true,
            completed: false,
            quiz: {
                question: "Jaka jest główna funkcja agregatu zapłonowego (Ignition Exciter)?",
                options: [
                    "Przekształcanie niskiego napięcia w wysokowoltowe wyładowania prądowe",
                    "Pomiary temperatury gazów w komorze spalania",
                    "Dostarczanie ciśnienia do iskrowników"
                ],
                answer: 0,
                explanation: "Agregat zapłonowy pobiera zasilanie (np. 28V DC lub 115V AC) i podwyższa je do bardzo wysokiego napięcia, niezbędnego do wytworzenia iskry o wysokiej energii."
            }
        },
        {
            id: "ignition-leads",
            title: "Przewody Zapłonowe",
            description: "Pancerne, ekranowane przewody wysokonapięciowe łączące agregat zapłonowy ze świecami. Chronią przed zakłóceniami elektromagnetycznymi (EMI) oraz trudnymi warunkami termicznymi.",
            unlocked: false,
            completed: false,
            quiz: {
                question: "Dlaczego przewody zapłonowe w silnikach odrzutowych są silnie ekranowane?",
                options: [
                    "Aby chronić je przed wyciekami oleju",
                    "Zapobiega to zakłóceniom radiowym (EMI) oraz chroni przed bardzo wysokim napięciem",
                    "Dla zwiększenia wagi i stabilności konstrukcji"
                ],
                answer: 1,
                explanation: "Ekranowanie zapobiega emisji zakłóceń elektromagnetycznych, które mogłyby zakłócić pracę avioniki, oraz chroni przewód przed wysokimi temperaturami i przebiciami."
            }
        },
        {
            id: "igniter-plugs",
            title: "Świece Zapłonowe",
            description: "Elementy wykonane z materiałów żaroodpornych montowane w komorze spalania. Wytwarzają iskrę o wysokiej energii elektrycznej, inicjując zapłon mieszanki paliwowo-powietrznej.",
            unlocked: false,
            completed: false,
            quiz: {
                question: "Czym różni się świeca zapłonowa silnika turbinowego (Igniter Plug) od zwykłej świecy samochodowej?",
                options: [
                    "Wytwarza wyładowanie o znacznie wyższej energii i pracuje w krótkich cyklach (głównie przy rozruchu)",
                    "Działa w sposób ciągły przez cały czas lotu samolotu",
                    "Nie wymaga dopływu prądu, bo działa na zasadzie tarcia"
                ],
                answer: 0,
                explanation: "Świece w silnikach turbinowych generują iskry o bardzo wysokiej energii (wyrażanej w dżulach) do pewnego zapalenia paliwa w trudnych warunkach i pracują głównie podczas startu, lądowania i rozruchu."
            }
        }
    ],

    // --- QUIZ KOŃCOWY ---
    finalQuiz: [
        {
            question: "Jaka jest prawidłowa kolejność przepływu energii elektrycznej w układzie zapłonowym?",
            options: [
                "Świece zapłonowe → Przewody → Agregat zapłonowy",
                "Agregat zapłonowy (Exciter) → Przewody zapłonowe → Świece zapłonowe",
                "Przewody zapłonowe → Agregat zapłonowy → Świece zapłonowe"
            ],
            answer: 1,
            explanation: "Energia z sieci elektrycznej samolotu trafia najpierw do agregatu zapłonowego, skąd prąd o wysokim napięciu płynie przewodami wysokonapięciowymi do świec."
        },
        {
            question: "Kiedy układ zapłonowy silnika turbinowego jest zazwyczaj włączany podczas normalnej eksploatacji?",
            options: [
                "Przez cały czas pracy silnika od uruchomienia do wyłączenia",
                "Wyłącznie podczas procedury rozruchu, a także podczas startu, lądowania i w trudnych warunkach pogodowych",
                "Tylko po wyłączeniu dopływu paliwa"
            ],
            answer: 1,
            explanation: "Po uruchomieniu i ustabilizowaniu płomienia w komorze spalania zapłon jest wyłączany. Ponownie włącza się go profilaktycznie m.in. w ulewnym deszczu lub przy ryzyku zgaszenia (Flameout)."
        },
        {
            question: "Jaka jest główna rola agregatu zapłonowego (Ignition Exciter)?",
            options: [
                "Magazynowanie energii elektrycznej i przekształcanie jej w impulsy wysokiego napięcia",
                "Pomiar prędkości obrotowej sprężarki",
                "Sterowanie zaworami paliwowymi w komorze spalania"
            ],
            answer: 0,
            explanation: "Agregat zapłonowy zawiera kondensatory i układy podwyższające napięcie, co pozwala wygenerować potężną iskrę na świecy."
        },
        {
            question: "Przewody zapłonowe (Ignition Leads) przenoszą napięcie rzędu:",
            options: [
                "Niskiego napięcia bezpiecznego (12V–24V)",
                "Bardzo wysokiego napięcia (kilkunastu tysięcy woltów)",
                "Nie przenoszą napięcia, lecz powietrze pneumatyczne"
            ],
            answer: 1,
            explanation: "Przewody zapłonowe muszą wytrzymać i bezpiecznie doprowadzić do świecy impulsy o napięciu dochodzącym do kilkunastu-kilkudziesięciu kilowoltów (kV)."
        },
        {
            question: "Dlaczego świece zapłonowe (Igniter Plugs) muszą być wykonane ze specjalnych stopów odpornych na wysokie temperatury?",
            options: [
                "Ponieważ ich groty znajdują się bezpośrednio wewnątrz gorącej strefy komory spalania",
                "Aby zapobiec zamarzaniu podczas lotu na wysokich pułapach",
                "Ze względu na chłodzenie ich cieczą chłodzącą"
            ],
            answer: 0,
            explanation: "Końcówki świec zapłonowych są stale wystawione na ekstremalne temperatury panujące w komorze spalania pracującego silnika turbinowego."
        },
        {
            question: "Co osłania przewody zapłonowe przed uszkodzeniami mechanicznymi i termicznymi wokół gorącej sekcji silnika?",
            options: [
                "Metalowy oplot/pancerz elastyczny oraz chłodzenie powietrzem",
                "Plastikowa koszulka termokurczliwa",
                "Warstwa oleju silnikowego"
            ],
            answer: 0,
            explanation: "Przewody wysokonapięciowe posiadają solidny metalowy oplot chroniący przed uszkodzeniami mechanicznymi, wysoką temperaturą oraz ekranujący przed zakłóceniami EMI."
        },
        {
            question: "Czym skutkuje całkowita awaria obu kanałów układu zapłonowego podczas procedury uruchamiania silnika na ziemi?",
            options: [
                "Niemożnością dokonania zapłonu mieszanki (brak iskry) i tzw. 'wet start'",
                "Natychmiastowym pożarem przekładni głównej",
                "Uszkodzeniem sprężarki wysokiego ciśnienia"
            ],
            answer: 0,
            explanation: "Bez iskry ze świec paliwo podawane do komory spalania nie zapali się, co doprowadzi do braku wzrostu temperatury (brak zapłonu / wet start)."
        },
        {
            question: "Dlaczego większość silników lotniczych posiada podwójny (zduplikowany) układ zapłonowy?",
            options: [
                "Ze względów bezpieczeństwa (redundancja) i dla dokładniejszego zapłonu mieszanki",
                "Ponieważ jeden układ obsługuje paliwo, a drugi olej",
                "Jednego używa się na ziemi, a drugiego wyłącznie w powietrzu"
            ],
            answer: 0,
            explanation: "Ze względów bezpieczeństwa stosuje się dwa niezależne systemy zapłonowe (dwa agregaty, przewody i świece - kanał A i B), aby awaria jednego nie uniemożliwiła rozruchu lub ponownego zapalenia silnika w locie."
        }
    ]
};