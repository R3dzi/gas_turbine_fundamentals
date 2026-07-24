// ========================================
// COURSE: Układ Zapłonowy (Ignition System)
// ========================================

window.COURSE_DATA = {
    id: 'ignition',
    title: 'Układ Zapłonowy',
    rewardUrl: 'https://sites.google.com/view/inside-the-engine/systemy/zaplonowy/mind_map_ignition',
    rewardImage: 'courses/ignition/images/mindmap.png',
    
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

            description:
                "",

            sections: [

                {
                    title: "Jak działa?",
                    content: `
                    
        <img src="courses/ignition/images/aparat.jpg" class="theory-image">
            
        <p>Wyobraź sobie lampę błyskową podłączoną do aparatu fotograficznego. Jej zadaniem <b>nie jest</b> świecenie przez cały czas. Proces wygląda następująco:</p>
        <ul>
            <li>bateria powoli ładuje kondensator,</li>
            <li>energia jest magazynowana,</li>
            <li>po naciśnięciu migawki cała energia zostaje oddana w ułamku sekundy,</li>
            <li>powstaje bardzo jasny błysk.</li>
        </ul>
        <p>Agregat zapłonowy działa dokładnie na tej samej zasadzie co aparat fotograficzny. Nie produkuje wysokiego napięcia w sposób ciągły. Najpierw magazynuje energię, a następnie oddaje ją jako bardzo krótki, lecz niezwykle silny impuls elektryczny. Jedyna różnica polega na tym, że zamiast lampy błyskowej zasila świecę zapłonową.
        </p>`
                },

                {
                    title: "Jaka jest jego funkcja?",
                    content: `
        <img src="courses/ignition/images/exciter.png" class="theory-image">
        <p>Agregat zapłonowy sam <b>nie zapala</b> paliwa. Jego jedynym zadaniem jest dostarczenie odpowiednio dużej energii elektrycznej do świecy zapłonowej. Dopiero świeca wykorzystuje ten impuls do wytworzenia iskry inicjującej zapłon mieszanki paliwowo-powietrznej.</p>
        `
                },

                {
                    title: "Gdzie jest zamontowany?",
                    content: `
        <img src="courses/ignition/images/location_ex.png" class="theory-image">
                    
        <p>W nowoczesnych silnikach turbinowych Agregat Zapłonowy znajduje się na zewnętrznej części silnika. Najczęściej montowany jest na obudowie wentylatora (Fan Case) <b>lub</b> obudowie rdzenia silnika (Core Engine)</p>
        <p>Nie montuje się go wewnątrz gorącej części silnika. Istnieją dwa główne powody:</p>
        <ul>
            <li>Ochrona przed wysoką temperaturą</li>
            <li>Łatwiejsza obsługa techniczna</li>
        </ul>
        <p>Exciter zawiera elektronikę, kondensatory oraz transformator impulsowy. Elementy te mają ograniczoną dopuszczalną temperaturę pracy, dlatego montowane są z dala od komory spalania. Agregat zapłonowy jest elementem typu LRU (Line Replaceable Unit). Mechanik może wymienić go stosunkowo szybko, bez demontażu dużej części silnika.</p>
        `
                },

                {
                    title: "Ile agregatów znajduje się w silniku?",
                    content: `
        <img src="courses/ignition/images/exciter2.png" class="theory-image">

        <p>Większość współczesnych silników turbinowych (CFM56, LEAP, Trent, GEnx, PW1000G i inne) posiada: dwa niezależne agregaty zapłonowe <b>lub</b> jeden moduł wyposażony w dwa całkowicie niezależne kanały wyjściowe (zdjęcie poglądowe powyżej). Oba rozwiązania zapewniają redundancję układu zapłonowego. Podwójny układ zwiększa niezawodność pracy silnika. Podczas rozruchu oba kanały mogą pracować jednocześnie lub naprzemiennie — zależy to od konstrukcji silnika oraz logiki sterowania FADEC. Podczas Continuous Ignition dwa kanały zapewniają zapłon nawet w trudnych warunkach, takich jak: intensywne opady deszczu, turbulencje, ryzyko zgaśnięcia płomienia (Flameout). Dzięki temu zwiększa się bezpieczeństwo pracy silnika.</p>
        `
                }

            ],

            unlocked: true,
            completed: false,

            quiz: {
                question: "Jaka jest główna funkcja Agregatu Zapłonowego?",
                options: [
                    "Dostarczenie odpowiednio dużej energii elektrycznej do świecy zapłonowej",
                    "Pomiary temperatury gazów w komorze spalania",
                    "Dostarczanie ciśnienia do iskrowników"
                ],
                answer: 0,
                explanation: "Agregat zapłonowy pobiera zasilanie (np. 28 V DC lub 115 V AC), magazynuje energię w kondensatorach, a następnie przekształca ją w impuls wysokiego napięcia potrzebny do wytworzenia iskry o wysokiej energii."
            }
        },
        {
            id: "ignition-leads",
            title: "Wiązka Zapłonowa",
            description: "",

            sections: [

                {
                    title: "Jak działa?",
                    content: `
                    
                <img src="courses/ignition/images/kabel.jpg" class="theory-image">

                <p>Wrócmy do lampy błyskowej aparatu fotograficznego. Wyobraźmy sobie kabel, który zasila taką bardzo mocną lampę błyskową. Sam kabel nie tworzy światła — jego zadaniem jest jedynie bezpieczne przesłanie energii z miejsca, gdzie jest ona wytwarzana, do miejsca, gdzie zostanie wykorzystana.</p>

                <p>Tak samo działają <b>wiązki zapłonowe</b>. Ich zadaniem jest przesłanie impulsu wysokiego napięcia z agregatu zapłonowego do świecy zapłonowej znajdującej się w komorze spalania.</p>

                <ul>
                    <li>Agregat zapłonowy magazynuje i generuje energię elektryczną,</li>
                    <li>wiązka zapłonowa transportuje impuls wysokiego napięcia,</li>
                </ul>

                <p>Ze względu na bardzo wysokie napięcie oraz trudne warunki pracy, wiązki zapłonowe posiadają specjalną konstrukcję chroniącą przed przebiciem elektrycznym oraz zakłóceniami elektromagnetycznymi.</p>
                `
                },

                {
                    title: "Jaka jest jego funkcja?",
                    content: `
                    
                <img src="courses/ignition/images/leads.png" class="theory-image">
                <p>Główną funkcją <b>wiązek zapłonowych</b> jest niezawodne przekazanie impulsu wysokiego napięcia pomiędzy agregatem zapłonowym a świecą zapłonową.</p>
                <p>Podczas pracy silnika wiązka musi spełniać kilka wymagań:</p>
                <ul>
                    <li>przewodzić bardzo wysokie napięcie bez strat,</li>
                    <li>wytrzymywać wysoką temperaturę oraz drgania silnika,</li>
                    <li>chronić sygnał przed zakłóceniami elektromagnetycznymi,</li>
                    <li>zapobiegać przebiciom elektrycznym do konstrukcji silnika.</li>
                </ul>
                <p>Uszkodzenie wiązki zapłonowej może spowodować utratę energii iskry, niestabilny zapłon lub całkowity brak możliwości uruchomienia układu zapłonowego.</p>
                `
                },

                {
                    title: "Gdzie jest zamontowany?",
                    content: `
                    
                <img src="courses/ignition/images/location_lead.png" class="theory-image">
                <p>Jedna z końcówek <b>Wiązki zapłonowej</b> jest zamontowana do agregatu zapłonowego. Ich przebieg zależy od konstrukcji konkretnego silnika, ale zawsze prowadzone są w sposób zapewniający ochronę przed ekstremalnymi warunkami pracy.</p>
                <p>Typowa instalacja wygląda następująco:</p>
                <ul>
                    <li>Agregat zapłonowy znajduje się na zewnętrznej części silnika,</li>
                    <li>Wiązka zapłonowa jest prowadzona wzdłuż obudowy silnika,</li>
                </ul>
                <p>W pobliżu komory spalania wiązki są szczególnie narażone na wysoką temperaturę, dlatego stosuje się specjalne osłony termiczne oraz materiały odporne na działanie gorących gazów.</p>
                `
                },

                {
                    title: "Ile wiązek zapłonowych znajduje się w silniku?",
                    content: `
                    
                <img src="courses/ignition/images/leads2.png" class="theory-image">

                <p>Liczba <b>wiązek zapłonowych</b> zależy od konstrukcji silnika. W większości nowoczesnych silników turbinowych stosuje się dwa niezależne kanały zapłonowe:</p>

                <ul>
                    <li>kanał A — agregat zapłonowy oraz świeca zapłonowa A,</li>
                    <li>kanał B — agregat zapłonowy oraz świeca zapłonowa B.</li>
                </ul>

                <p>Każdy kanał posiada własną wiązkę zapłonową, co zapewnia redundancję układu. Dzięki temu awaria jednej części systemu nie powoduje całkowitej utraty możliwości zapłonu.</p>

                <p>Podczas normalnego rozruchu silnika oba kanały mogą zostać aktywowane jednocześnie. W trakcie pracy ciągłego zapłonu (Continuous Ignition) układ może wykorzystywać jeden lub oba kanały — zależnie od logiki sterowania silnika oraz decyzji systemu FADEC.</p>
                `
                }

            ],

            unlocked: false,
            completed: false,

            quiz: {
                question: "Jaka jest główna funkcja wiązek zapłonowych?",
                options: [
                    "Przesłanie impulsu wysokiego napięcia z agregatu zapłonowego do świecy zapłonowej",
                    "Pomiar temperatury w komorze spalania",
                    "Regulacja ilości paliwa dostarczanego do silnika"
                ],
                answer: 0,
                explanation: "Wiązki zapłonowe nie generują energii zapłonowej. Ich zadaniem jest bezpieczne przesłanie impulsu wysokiego napięcia z agregatu zapłonowego do świecy zapłonowej, gdzie powstaje iskra inicjująca zapłon mieszanki paliwowo-powietrznej."
            }
        },
        {
            id: "igniter-plugs",
            title: "Świeca Zapłonowa",
            description: "",

            sections: [

                {
                    title: "Jak działa?",
                    content: `
                    
                <img src="courses/ignition/images/lampa.jpg" class="theory-image">

                <p>Można powiedzieć, że świeca zapłonowa działa jak lampa błyskowa. Zacznijmy od początku. Agregat zapłonowy wytwarza impuls wysokiego napięcia, wiązka zapłonowa dostarcza go do świecy, a dopiero świeca zamienia tę energię w iskrę.</p>

                <p>Na końcu świecy znajdują się dwie elektrody oddzielone niewielką szczeliną. Gdy impuls wysokiego napięcia dotrze do elektrod, powietrze w szczelinie zostaje zjonizowane i powstaje wyładowanie elektryczne.</p>

                <ul>
                    <li>agregat zapłonowy dostarcza energię,</li>
                    <li>wiązka zapłonowa transportuje impuls,</li>
                    <li>świeca zapłonowa wytwarza iskrę,</li>
                    <li>iskra zapala mieszankę paliwowo-powietrzną.</li>
                </ul>

                <p>Cały proces trwa zaledwie ułamek sekundy i może być wielokrotnie powtarzany podczas rozruchu lub pracy Continuous Ignition.</p>
                `
                },

                {
                    title: "Jaka jest jego funkcja?",
                    content: `
                    
                <img src="courses/ignition/images/plugs.png" class="theory-image">

                <p>Jedyną funkcją <b>świecy zapłonowej</b> jest wytworzenie iskry o odpowiednio dużej energii, która zapoczątkuje spalanie mieszanki paliwowo-powietrznej w komorze spalania.</p>

                <p>Po ustabilizowaniu procesu spalania płomień utrzymuje się samoczynnie i świeca nie bierze udziału w dalszej pracy silnika. Ponownie jest wykorzystywana jedynie wtedy, gdy system zapłonowy zostanie ponownie włączony, np. podczas Continuous Ignition lub próby ponownego uruchomienia silnika.</p>
                `
                },

                {
                    title: "Gdzie jest zamontowana?",
                    content: `
                    
                <img src="courses/ignition/images/location_plug.png" class="theory-image">

                <p><b>Świece zapłonowe</b> są zamontowane bezpośrednio w obudowie komory spalania. Ich końcówka znajduje się wewnątrz komory, gdzie powstaje iskra zapalająca mieszankę paliwowo-powietrzną.</p>

                <p>Świeca musi pracować w wyjątkowo trudnych warunkach:</p>

                <ul>
                    <li>bardzo wysoka temperatura,</li>
                    <li>wysokie ciśnienie,</li>
                    <li>silne drgania silnika,</li>
                    <li>kontakt z gorącymi gazami spalinowymi.</li>
                </ul>

                <p>Z tego powodu wykonuje się ją z materiałów odpornych na wysoką temperaturę, korozję oraz erozję elektryczną powstającą podczas kolejnych wyładowań.</p>
                `
                },

                {
                    title: "Ile świec zapłonowych znajduje się w silniku?",
                    content: `
                    
                <img src="courses/ignition/images/plugs.png" class="theory-image">

                <p>Większość współczesnych silników turbinowych posiada <b>dwie świece zapłonowe</b>, oznaczane jako kanał A oraz kanał B.</p>

                <p>Każda świeca współpracuje z własnym kanałem zapłonowym obejmującym:</p>

                <ul>
                    <li>agregat zapłonowy,</li>
                    <li>wiązkę zapłonową,</li>
                    <li>świecę zapłonową.</li>
                </ul>

                <p>Zastosowanie dwóch niezależnych świec zwiększa niezawodność układu zapłonowego. Nawet w przypadku awarii jednego kanału drugi nadal może zapewnić zapłon mieszanki paliwowo-powietrznej.</p>

                <p>Podczas rozruchu oraz pracy Continuous Ignition obie świece mogą pracować jednocześnie lub naprzemiennie — zależnie od konstrukcji silnika oraz logiki sterowania FADEC.</p>
                `
                }

            ],

            unlocked: false,
            completed: false,

            quiz: {
                question: "Czym różni się świeca zapłonowa silnika turbinowego (Igniter Plug) od zwykłej świecy samochodowej?",
                options: [
                    "Wytwarza wyładowanie o znacznie wyższej energii i pracuje głównie podczas rozruchu oraz Continuous Ignition",
                    "Działa nieprzerwanie przez cały czas pracy silnika",
                    "Nie wymaga doprowadzenia energii elektrycznej"
                ],
                answer: 0,
                explanation: "Świeca zapłonowa silnika turbinowego nie pracuje w sposób ciągły. Otrzymuje impulsy wysokiego napięcia z agregatu zapłonowego i wytwarza iskry o bardzo wysokiej energii, wykorzystywane głównie podczas rozruchu oraz pracy Continuous Ignition."
            }
        }
    ],

    // --- QUIZ KOŃCOWY ---
    finalQuiz: [
        {
            question: "Jaka jest prawidłowa kolejność działania elementów układu zapłonowego?",
            options: [
                "Świeca zapłonowa → Wiązka zapłonowa → Agregat zapłonowy",
                "Agregat zapłonowy → Wiązka zapłonowa → Świeca zapłonowa",
                "Wiązka zapłonowa → Agregat zapłonowy → Świeca zapłonowa"
            ],
            answer: 1,
            explanation: "Agregat zapłonowy wytwarza impuls wysokiego napięcia, wiązka zapłonowa transportuje go do świecy, a świeca zamienia energię elektryczną w iskrę."
        },
        {
            question: "Kiedy układ zapłonowy jest wykorzystywany w silniku turbinowym?",
            options: [
                "Przez cały czas pracy silnika",
                "Podczas rozruchu oraz w sytuacjach wymagających Continuous Ignition",
                "Wyłącznie po wyłączeniu silnika"
            ],
            answer: 1,
            explanation: "Po ustabilizowaniu spalania zapłon jest zwykle wyłączany. Ponownie uruchamia się go podczas rozruchu lub pracy Continuous Ignition, np. w trudnych warunkach."
        },
        {
            question: "Jaka jest główna funkcja agregatu zapłonowego?",
            options: [
                "Magazynowanie energii elektrycznej i generowanie impulsów wysokiego napięcia",
                "Wytwarzanie iskry w komorze spalania",
                "Transport impulsu do świecy zapłonowej"
            ],
            answer: 0,
            explanation: "Agregat zapłonowy magazynuje energię i przekształca ją w krótki impuls wysokiego napięcia potrzebny do zapłonu."
        },
        {
            question: "Jaką funkcję pełni wiązka zapłonowa?",
            options: [
                "Wytwarza iskrę zapłonową",
                "Transportuje impuls wysokiego napięcia z agregatu zapłonowego do świecy",
                "Steruje pracą systemu FADEC"
            ],
            answer: 1,
            explanation: "Wiązka zapłonowa nie generuje energii. Jej zadaniem jest bezpieczne przesłanie impulsu wysokiego napięcia do świecy zapłonowej."
        },
        {
            question: "Jaka jest główna funkcja świecy zapłonowej?",
            options: [
                "Magazynowanie energii elektrycznej",
                "Przekształcenie impulsu wysokiego napięcia w iskrę zapalającą mieszankę paliwowo-powietrzną",
                "Chłodzenie komory spalania"
            ],
            answer: 1,
            explanation: "Świeca zapłonowa wykorzystuje impuls dostarczony przez agregat zapłonowy do wytworzenia iskry inicjującej spalanie."
        },
        {
            question: "Dlaczego agregat zapłonowy montowany jest na zewnętrznej części silnika?",
            options: [
                "Aby chronić go przed wysoką temperaturą oraz ułatwić wymianę",
                "Aby skrócić drogę dopływu paliwa",
                "Ponieważ musi być chłodzony przez przepływające paliwo"
            ],
            answer: 0,
            explanation: "Agregat zawiera elementy elektroniczne wrażliwe na wysoką temperaturę i jest wykonany jako LRU, co ułatwia jego wymianę."
        },
        {
            question: "Dlaczego większość współczesnych silników posiada dwa kanały zapłonowe?",
            options: [
                "Aby zwiększyć niezawodność i zapewnić redundancję układu",
                "Jeden kanał pracuje tylko na ziemi, a drugi wyłącznie w locie",
                "Każdy kanał obsługuje inną komorę spalania"
            ],
            answer: 0,
            explanation: "Dwa niezależne kanały (A i B) zwiększają bezpieczeństwo. Awaria jednego z nich nie powoduje całkowitej utraty możliwości zapłonu."
        },
        {
            question: "Który element układu znajduje się bezpośrednio w komorze spalania?",
            options: [
                "Agregat zapłonowy",
                "Wiązka zapłonowa",
                "Świeca zapłonowa"
            ],
            answer: 2,
            explanation: "Końcówka świecy zapłonowej znajduje się wewnątrz komory spalania, gdzie powstaje iskra zapalająca mieszankę paliwowo-powietrzną."
        }
    ]
};