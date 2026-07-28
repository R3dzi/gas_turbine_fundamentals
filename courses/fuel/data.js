// ========================================
// COURSE: Układ Paliwowy (Fuel System)
// ========================================

window.COURSE_DATA = {

    id: 'fuel',

    title: 'Układ Paliwowy',

    rewardUrl: 'https://sites.google.com/view/inside-the-engine/systemy/paliwowy/mind_map_fuel',

    rewardImage: 'courses/fuel/images/mindmap.png',



    // ========================================
    // IKONY SVG
    // ========================================

    icons: {


        'fuel-pump': `
        <svg viewBox="0 0 64 64" fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

            <circle cx="32" cy="32" r="18"/>
            <path d="M32 14v36"/>
            <path d="M14 32h36"/>
            <circle cx="32" cy="32" r="5"/>

        </svg>
        `,



        'heat-exchanger': `
        <svg viewBox="0 0 64 64" fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

            <rect x="12" y="14" width="40" height="36" rx="3"/>

            <path d="M20 22h24"/>
            <path d="M20 30h24"/>
            <path d="M20 38h24"/>

            <path d="M20 46h24"/>

        </svg>
        `,



        'fuel-filter': `
        <svg viewBox="0 0 64 64" fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

            <path d="M12 18h40"/>
            <path d="M18 18v28"/>
            <path d="M46 18v28"/>

            <rect x="18" y="28" width="28" height="16"/>

            <path d="M24 32h16"/>
            <path d="M24 38h16"/>

        </svg>
        `,



        'flow-meter': `
        <svg viewBox="0 0 64 64" fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

            <circle cx="32" cy="32" r="20"/>

            <path d="M32 32l12-10"/>

            <circle cx="32" cy="32" r="3"/>

            <path d="M32 12v5"/>
            <path d="M52 32h-5"/>

        </svg>
        `,



        'injectors': `
        <svg viewBox="0 0 64 64" fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

            <path d="M22 12h20"/>
            <path d="M28 12v18"/>
            <path d="M36 12v18"/>

            <rect x="20" y="30" width="24" height="12"/>

            <path d="M32 42v10"/>

            <path d="M26 52h12"/>

        </svg>
        `

    },



    // ========================================
    // KOLEJNOŚĆ DIAGRAMU
    // ========================================

    diagramOrder:[

        "fuel-pump",
        "heat-exchanger",
        "fuel-filter",
        "flow-meter",
        "injectors"

    ],




    // ========================================
    // MODUŁY
    // ========================================

    modules:[



// =================================================
// 1. POMPA PALIWOWA
// =================================================


{
id:"fuel-pump",

title:"Pompa Paliwowa",

description:"",


sections:[


{
title:"Jak działa?",
audio:"courses/fuel/images/1.mp3",
content:`

<img src="courses/fuel/images/1.jpg" class="theory-image">
<p>Wyobraź sobie, że podjeżdżasz samochodem na stację paliw. Pod powierzchnią ziemi znajdują się duże zbiorniki, w których magazynowane jest paliwo. Samo paliwo nie wydostanie się jednak na powierzchnię. Dopiero gdy naciśniesz spust pistoletu, uruchamia się pompa, która zasysa paliwo ze zbiornika i tłoczy je do dystrybutora. To właśnie pompa wykonuje całą pracę związaną z transportem paliwa. Dokładnie taką samą rolę pełni pompa paliwa w silniku turbinowym.</p>
<p><b>Zbiornik pod stacją = zbiorniki w skrzydłach.</b></p>
<img src="courses/fuel/images/1_2.jpg" class="theory-image">
<p>W samolocie paliwo również jest magazynowane w dużych zbiornikach. Zamiast znajdować się pod ziemią, są one umieszczone głównie wewnątrz skrzydeł. Skrzydła można więc porównać do podziemnego zbiornika na stacji paliw – są miejscem przechowywania zapasu paliwa. Jednak samo umieszczenie paliwa w skrzydłach nie wystarczy. Tak jak na stacji paliwo nie popłynie do dystrybutora bez pompy, tak w samolocie paliwo nie dotrze do silnika tylko dlatego, że znajduje się w zbiorniku.</p>`

},



{
title:"Jaka jest jej funkcja?",
audio:"courses/fuel/images/2.mp3",
content:`
<img src="courses/fuel/images/2.jpg" class="theory-image">
<p>Pompa jest pierwszym aktywnym elementem układu paliwowego. Jej zadaniem jest:</p>
<ul><li>pobranie paliwa ze zbiornika w skrzydle,</li>
<li>wytworzenie odpowiedniego ciśnienia,</li>
<li>zapewnienie ciągłego przepływu paliwa do kolejnych elementów układu.</li></ul>
<p>Można powiedzieć, że pompa jest „sercem” układu paliwowego. Bez niej paliwo pozostałoby w skrzydłach, a silnik nie otrzymałby paliwa niezbędnego do pracy.</p>
<p>Bez prawidłowej pracy pompy układ wtryskowy nie otrzyma odpowiedniej ilości paliwa, co może prowadzić do utraty mocy lub zgaśnięcia silnika.</p>`

},



{
title:"Gdzie jest zamontowana?",

content:`
<img src="courses/fuel/images/3.jpg" class="theory-image">
<img src="courses/fuel/images/4.jpg" class="theory-image">
<p>Pompa paliwowa znajduje się zazwyczaj na przekładni akcesoriów silnika. Ten moduł miałeś okazję poznać na kursie o anatomii silnika.</p>
<p>Pompa paliwowa jest połączona mechanicznie z silnikiem, dzięki czemu jej wydajność rośnie wraz z prędkością obrotową jednostki.</p>`

},



{
title:"Informacje techniczne",

content:`
<p>Poniższe informacje są zgodne z ogólną zasadą działania pomp paliwowych stosowanych w silnikach turbinowych. Szczegółowe rozwiązania konstrukcyjne mogą różnić się między producentami (np. Rolls-Royce, GE Aerospace, Pratt & Whitney, Safran).</p>

<b>1. Pompa nie "tworzy" paliwa – tworzy ciśnienie</b>

<p>Pompa nie zwiększa ilości paliwa. Jej zadaniem jest wytworzenie odpowiedniego ciśnienia i przepływu, aby paliwo mogło pokonać opory przewodów, filtrów, wymienników ciepła i ostatecznie dotrzeć do wtryskiwaczy.</p>

<b>2. Jest napędzana przez silnik</b>

<p>W większości silników turbinowych główna pompa paliwa jest mechanicznie napędzana przez przekładnię akcesoriów (Accessory Gearbox – AGB). Oznacza to, że obraca się zawsze wtedy, gdy obraca się silnik.</p>

<b>3. Wydajność pompy jest większa niż potrzeby silnika</b>

<p>Pompa tłoczy więcej paliwa, niż silnik aktualnie zużywa. Nadmiar paliwa jest zawracany do obiegu lub wykorzystywany przez inne elementy układu, co pozwala utrzymać stabilne ciśnienie.</p>

<b>4. Pompa pracuje z bardzo wysokim ciśnieniem</b>

<p>W zależności od konstrukcji silnika, ciśnienie za pompą wysokiego ciśnienia może wynosić od kilkudziesięciu do nawet ponad 100 barów, aby zapewnić prawidłowe rozpylanie paliwa przez wtryskiwacze.</p>

<b>5. W jednym zespole często znajdują się dwie pompy</b>

<p>Typowy zespół pomp paliwowych składa się z:

<ul><li>pompy niskiego ciśnienia (LP – Low Pressure),</li>
<li>pompy wysokiego ciśnienia (HP – High Pressure).</ul></li>

<p>Pierwsza zapewnia stały dopływ paliwa do drugiej, a druga podnosi jego ciśnienie do wartości wymaganej przez układ wtryskowy.</p>

<b>6. Pompa smarowana jest paliwem</b>

<p>Pompa nie wymaga osobnego układu olejowego. Samo paliwo przepływające przez pompę smaruje jej elementy ruchome oraz częściowo odbiera ciepło powstające podczas pracy.</p>

<b>7. Musi działać w każdych warunkach lotu</b>

<p>Pompa jest projektowana tak, aby zapewnić ciągły dopływ paliwa podczas:</p>

<ul><li>startu,</li>
<li>lotu odwróconego (w silnikach wojskowych, jeśli konstrukcja na to pozwala),</li>
<li>dużych przeciążeń,</li>
<li>gwałtownych zmian wysokości,</li>
<li>bardzo niskich temperatur na wysokości przelotowej.</ul></li>

<b>8. Nawet niewielkie zanieczyszczenia mogą być niebezpieczne</b>

<p>Elementy pompy wykonane są z bardzo małymi tolerancjami. Dlatego przed pompą i za pompą stosuje się filtry chroniące układ przed drobinami metalu, rdzą lub innymi zanieczyszczeniami.</p>

<b>9. Pompa nie decyduje o ilości paliwa</b>

<p>Pompa zapewnia odpowiednie ciśnienie i przepływ, natomiast ilość paliwa kierowanego do komory spalania jest regulowana przez jednostkę dozującą paliwo (Fuel Metering Unit – FMU) lub odpowiedni układ sterowania silnikiem (FADEC sterujący FMU).</p>

<b>10. Niezawodność jest kluczowa</b>

<p>Pompa paliwa należy do elementów o bardzo wysokiej niezawodności. Jest projektowana na tysiące godzin pracy bez utraty parametrów, ponieważ jej awaria mogłaby doprowadzić do utraty zasilania silnika.
</p>
`

}


],


unlocked:true,

completed:false,


quiz:{

question:
"Jaka jest główna funkcja pompy paliwowej?",


options:[

"Zapewnienie odpowiedniego ciśnienia i przepływu paliwa",

"Zapłon mieszanki paliwowo-powietrznej",

"Pomiar temperatury gazów spalinowych"

],


answer:0,


explanation:
"Pompa paliwowa zwiększa ciśnienie paliwa i zapewnia jego dostarczenie do kolejnych elementów układu."

}


},





// =================================================
// 2. WYMIENNIK CIEPŁA
// =================================================


{
id:"heat-exchanger",

title:"Wymiennik Ciepła Paliwa",

description:"",


sections:[
{
    
title:"Jak działa?",

content:`
<img src="courses/fuel/images/5.jpg" class="theory-image">
<p>Wróćmy na stację paliw. Nadal stoisz przy samochodzie. Wyobraź sobie teraz kolejny krok. Paliwo zostało już zassane ze zbiornika przez pompę i płynie przewodami. Ale zanim trafi bezpośrednio do silnika, musi przejść przez specjalny element – przypominający mikro-podgrzewacz usytuowany tuż przy wylocie pistoletu na stacji.</p>
<p>Na wysokim pułapie przelotowym, gdzie temperatura spada nawet poniżej -50°C, paliwo w skrzydłach mocno się wychładza. Gdyby tak zimne paliwo trafiło do precyzyjnych elementów silnika, mocno zgęstniałoby, a zawarta w nim mikroskopijna woda mogłaby zamienić się w kryształki lodu i zablokować filtry.
`

},



{
title:"Jaka jest jego funkcja?",

content:`
<img src="courses/fuel/images/6.jpg" class="theory-image">
<p>Działa on jak sprytny system "oddawania gorąca". Wymiennik ciepła przepuszcza tuż obok siebie dwa strumienie: zimne paliwo oraz gorący olej (lub gorące powietrze). <b>Paliwo działa tu jak chłodziwo dla oleju, a olej ogrzewa paliwo.</b> Dzięki temu paliwo dociera do wtryskiwaczy w idealnej temperaturze – jest dostatecznie płynne, bez droinek lodu i gotowe do czystego, wydajnego spalenia w komorze.</p>
`

},



{
title:"Gdzie jest zamontowany?",

content:`
<img src="courses/fuel/images/7.jpg" class="theory-image">
<p>Wymiennik paliwowo-olejowy znajduje się zazwyczaj w pobliżu układu olejowego i paliwowego silnika. Jego dokładna lokalizacja zależy od konstrukcji danego silnika.</p>
`

},



{
title:"Informacje techniczne",

content:`
<p>Lotnicze wymienniki ciepła odgrywają kluczową rolę w utrzymaniu stabilnych parametrów pracy zespołu napędowego. W systemach paliwowo-olejowych stanowią one element krytyczny dla bezpieczeństwa i wydajności lotu.</p>

<b>1. Zasada działania i konstrukcja</b>

<p>Typ urządzenia: Najczęściej stosuje się wymienniki typu paliwo-olej (ang. Fuel-Oil Heat Exchanger – FOHE). Mechanizm wymiany ciepła: Urządzenie wykorzystuje naturalną różnicę temperatur pomiędzy mediami. Gorący olej silnikowy oddaje ciepło do zimnego paliwa pobieranego ze skrzydeł, co realizuje dwa cele jednocześnie:</p>

<ul><li>Chłodzenie oleju: Zapewnia właściwą lepkość i właściwości smarne oleju w silniku.</li>
<li>Podgrzewanie paliwa: Podnosi temperaturę paliwa, zapobiegając zamarzaniu śladowych ilości wody zawartej w nafcie lotniczej.</li></ul>

<p>Charakterystyka pracy: Wymiennik jest układem pasywnym — nie posiada własnego napędu ani części ruchomych. Jego działanie opiera się całkowicie na przepływie wymuszonym przez główne pompy paliwowe i olejowe silnika.</p>

<b>2. Studium przypadku i bezpieczeństwo (Warto zobaczyć)</b>

<p>Chociaż wymienniki typu FOHE są urządzeniami niezawodnymi, ich konstrukcja stała się obiektem przełomowych badań po incydencie lotniczym z 2008 roku. Rekomendacja materiału szkoleniowego:</p>
<p>Warto zapoznać się z dokumentem przedstawiającym analizę lotu British Airways 38 (BA38) z 17 stycznia 2008 roku. Został on zrealizowany w ramach serii Katastrofa w przestworzach (Sezon 10, Odcinek 2: „Lądowanie bez napędu” / ang. „The Final Push”).</p> 

<b><p>Wnioski inżynieryjne z katastrofy BA38:</p></b>
<b>Problem:</b>
<p>Wstępna konstrukcja wymiennika w silnikach Rolls-Royce Trent 800 posiadała wąskie rurki, na których podczas długiego lotu w niskich temperaturach osiadały drobne kryształki lodu. Zwiększenie przepływu paliwa tuż przed lądowaniem zepchnęło lód na wymiennik, tworząc zator i odcinając dopływ paliwa do obu silników.</p> 
<b>Rozwiązanie:</b>
<p>Śledztwo po tym wypadku doprowadziło do całkowitego przeprojektowania wewnętrznej geometrii rurek wymiennika FOHE, co wymusiło nowe standardy certyfikacji komponentów paliwowych w lotnictwie cywilnym.</p>
`

}



],


unlocked:false,

completed:false,


quiz:{

question:
"Jaka jest główna funkcja wymiennika ciepła paliwa?",


options:[

"Kontrola temperatury paliwa oraz chłodzenie oleju",

"Wytwarzanie iskry zapłonowej",

"Pomiar ilości paliwa"

],


answer:0,


explanation:
"Wymiennik ciepła wykorzystuje paliwo do kontroli temperatury oraz odbioru ciepła z oleju silnikowego."

}


},


// =================================================
// 3. FILTR PALIWA
// =================================================


{
id:"fuel-filter",

title:"Filtr Paliwa",

description:"",


sections:[


{
title:"Jak działa?",

content:`

<img src="courses/fuel/images/8.jpg" class="theory-image">
<p>Wyobraźmy sobie, że paliwo, które tankujemy do samochodu odbywa się w morżny grudniowy dzień. Paliwo jest zimne, ale w zbiorniku, z powodu wilgoci w powietrzu, zawsze znajduje się odrobina wody. W normalnych warunkach ta woda jest rozpuszczona w paliwie i niewidoczna. W naszym zmodyfikowanym dystrybutorze paliwo przechodzi najpierw przez „Wymiennik Ciepła”, gdzie jest ogrzewane przez „Gorący Olej”. Dlaczego? Ponieważ tuż za wymiennikiem znajduje się gęsty Filtr Paliwa. Gdyby paliwo było zbyt zimne, rozpuszczona w nim woda zaczęłaby krystalizować. Te mikroskopijne kryształki lodu, choć pojedynczo nieszkodliwe, w filtrze zachowywałyby się jak lepki śnieg. Szybko oblepiłyby gęstą siatkę filtracyjną, tworząc nieprzepuszczalną barierę. W rezultacie, mimo że pompa w zbiorniku działałaby z pełną mocą, paliwo nie dotarłoby do pistoletu dystrybutora, a tankowanie samochodu zostałoby przerwane.</p>

<p>Filtr paliwa jest elementem ochronnym układu paliwowego. Jego zadaniem jest zatrzymywanie zanieczyszczeń znajdujących się w paliwie przed dostaniem się do precyzyjnych elementów układu wtryskowego.</p>

<p>Podczas przepływu paliwa przez filtr:</p>
<ul><li>cząstki stałe zostają zatrzymane przez materiał filtracyjny,</li>
<li>większe zanieczyszczenia pozostają wewnątrz obudowy filtra,</li>
<li>oczyszczone paliwo trafia do kolejnych elementów układu.</li></ul>
`
},

{
title:"Jaka jest jego funkcja?",

content:`
<img src="courses/fuel/images/9.jpg" class="theory-image">
  <p>Podstawową funkcją filtra paliwa jest ochrona układu przed uszkodzeniem. Filtr chroni szczególnie:</p>
  <ul><li>pompę wysokiego ciśnienia,</li>
    <li>zawory sterujące przepływem paliwa,</li>
    <li>wtryskiwacze paliwa.</li></ul>
  <p>Zanieczyszczenia mogą powodować zużycie elementów, blokowanie przepływu lub nieprawidłowe rozpylanie paliwa.</p>
`

},



{
title:"Gdzie jest zamontowany?",

content:`

<img src="courses/fuel/images/10.jpg" class="theory-image">
<p>Filtr paliwa znajduje się za pompą paliwową oraz przed elementami odpowiedzialnymi za dokładne dozowanie paliwa. </p>
<p>Typowa kolejność przepływu jaką poznałeś do tej pory:</p>
<ul><li>pompa paliwa,</li>
<li>wymiennik ciepła,</li>
<li>filtr paliwa,</li></ul>
`

},



{
title:"Informacje techniczne",

content:`
<img src="courses/fuel/images/11.jpg" class="theory-image">

<p><b>Zawór Obejściowy.</p></b>
<p><b>Filtracja vs. Przepływ:</b> Zatrzymywanie zanieczyszczeń jest priorytetem, ale z czasem wkład ulega nasyceniu. W ekstremalnych warunkach (np. bardzo zanieczyszczone paliwo lub intensywne tworzenie się lodu, jak w katastrofie BA38), wkład może zostać całkowicie zablokowany.</p>
<p><b>Priorytet Bezpieczeństwa (Fail-Safe):</b> W lotnictwie cywilnym obowiązuje zasada, że lepiej dostarczyć do silnika brudne paliwo niż nie dostarczyć go wcale. Zgaśnięcie silnika w locie z powodu braku paliwa jest gorszym scenariuszem niż potencjalne uszkodzenie precyzyjnych elementów silnika w dłuższej perspektywie.</p>
<p><b>Mechanizm działania:</b> Zawór obejściowy (zazwyczaj sprężynowy) jest ustawiony na otwarcie przy konkretnej różnicy ciśnień. Gdy filtr jest tak zatkany, że pompa nie jest w stanie przepchnąć paliwa przez wkład, wzrost ciśnienia przed filtrem otwiera zawór sprężynowy, kierując paliwo drogą awaryjną (bypass) bezpośrednio do wyjścia z obudowy, omijając wkład filtrujący.</p>
<p><b>Czujnik Różnicy Ciśnień.</p></b>
<p><b>Monitorowanie stanu filtra:</b> Wkład filtrujący stanowi opór dla przepływu. Im bardziej jest zabrudzony, tym większy jest ten opór i tym większa różnica ciśnień między paliwem wchodzącym a wychodzącym z filtra.</p>
<p><b>Zasada działania czujnika:</b> Jest to sensor pomiarowy, który mierzy różnicę między ciśnieniem na wejściu do obudowy (przed wkładem) a ciśnieniem na wyjściu (za wkładem).</p>
`

}



],


unlocked:false,

completed:false,


quiz:{

question:
"Jaka jest główna funkcja filtra paliwa?",


options:[

"Ochrona układu przed zanieczyszczeniami",

"Zwiększenie temperatury paliwa",

"Generowanie ciśnienia paliwa"

],


answer:0,


explanation:
"Filtr usuwa zanieczyszczenia i chroni precyzyjne elementy układu paliwowego przed uszkodzeniem."

}


},






// =================================================
// 4. PRZEPŁYWOMIERZ
// =================================================


{
id:"flow-meter",

title:"Przepływomierz Paliwa",

description:"",


sections:[



{
title:"Jak działa?",

content:`
<img src="courses/fuel/images/12.jpg" class="theory-image">
<p>Gdy ogrzane paliwo bezpiecznie pokona już wkład filtracyjny i zostanie oczyszczone z wszelkich zanieczyszczeń oraz ewentualnych kryształków lodu, trafia wprost do Licznika Przepływu (widocznego na samej górze naszego dystrybutora).</p>
<p>Na stacji benzynowej mechanizm ten odpowiada za proste zadanie: mierzy dokładną objętość wydawanego paliwa i wyświetla cyfry na ekranie dystrybutora, informując kierowcę, ile litrów trafiło do baku. Umieszczenie go za filtrem, a nie przed nim, ma kluczowe znaczenie — licznik jest urządzeniem o wysokiej precyzji. Gdyby trafiły do niego drobinki rdzy, piasek czy podstępne kryształki lodu, jego delikatne elementy pomiarowe mogłyby ulec zatarciu lub podawać błędne odczyty.</p>
`

},



{
title:"Jaka jest jego funkcja?",
content:`
<img src="courses/fuel/images/13.jpg" class="theory-image">
<p>Dokładny pomiar paliwa jest niezbędny do prawidłowego sterowania ciągiem oraz zużyciem paliwa. Główne zadania przepływomierza:</p>
<ul><li>pomiar aktualnego przepływu paliwa,
<li>dostarczanie informacji do systemu sterowania
<li>kontrola poprawności działania układu paliwowego.</ul>`

},



{
title:"Gdzie jest zamontowany?",
content:`
<img src="courses/fuel/images/14.jpg" class="theory-image">
<p>Przepływomierz znajduje się w układzie paliwowym pomiędzy filtrem a wtryskiwaczami. Jest umieszczony w miejscu, gdzie przepływ paliwa jest już oczyszczony i stabilny.</p>
`
},



{
title:"Informacje techniczne",

content:`
<p>Choć z perspektywy pilota Fuel Flow Transmitter wygląda jedynie jak niepozorny wskaźnik zużycia paliwa na ekranie, w rzeczywistości jest jednym z najbardziej zapracowanych sensorów na pokładzie nowoczesnego samolotu cywilnego. Dane z tego małego urządzenia trafiają równolegle do kilku kluczowych systemów, pełniając funkcję krytycznego „strażnika” bezpieczeństwa i wydajności lotu.</p>
<p>Przede wszystkim sygnał z przepływomierza trafia bezpośrednio do cyfrowego komputera sterującego pracą silnika, czyli FADEC (Full Authority Digital Engine Control). Komputer ten nieustannie porównuje żądanie pilota (ruch manetki ciągu) z rzeczywistym strumieniem paliwa mierzonego przez przetwornik. Jeśli FADEC wykryje nagły spadek przepływu przy stałym położeniu manetki, może natychmiast wykryć usterkę – np. początki zatoru w magistrali lub uszkodzenie pompy – i zareagować przed wystąpieniem niebezpiecznego przeciągnięcia płomienia (flameout) w komorze spalania.</p>
<p>Jednocześnie dane o zużyciu paliwa są stale przekazywane do FMC (Flight Management Computer), czyli głównego komputera pokładowego zarządzającego trasą. To właśnie tam odbywają się skomplikowane kalkulacje w czasie rzeczywistym. FMC przelicza chwilowe zużycie paliwa, uwzględniając masę samolotu, wiatr oraz wysokość, i precyzyjnie szacuje tzw. EFOB (Estimated Fuel On Board) dla punktu docelowego. Dzięki temu załoga w każdej chwili wie, z jaką rezerwą paliwa wyląduje na lotnisku docelowym lub zapasowym.</p>
<p>Co ciekawe, w nowożytnych systemach diagnostyki lotniczej (takich jak ACARS) dane z przetwornika są na bieżąco wysyłane drogą satelitarną... prosto do centrum obsługi technicznej linii lotniczej na ziemi. Inżynierowie w bazie potrafią wykryć mikroskopijne zmiany w zużyciu paliwa przez dany silnik na przestrzeni miesięcy. Jeśli wskaźnik pokazuje stopniowy, minimalny wzrost zużycia przy tych samych parametrach lotu, jest to dla mechaników sygnał, że silnik traci sprawność aero-termodynamiczną i wymaga przeglądu, zanim jeszcze jakakolwiek usterka stanie się widoczna dla pilota.</p>
`

}



],


unlocked:false,

completed:false,


quiz:{

question:
"Co mierzy przepływomierz paliwa?",


options:[

"Ilość paliwa przepływającego przez układ",

"Temperaturę gazów spalinowych",

"Ciśnienie oleju silnikowego"

],


answer:0,


explanation:
"Przepływomierz dostarcza informacji o ilości paliwa przepływającego przez instalację."

}


},

// =================================================
// 5. WTRYSKIWACZE PALIWA
// =================================================


{
id:"injectors",

title:"Wtryskiwacze Paliwa",

description:"",


sections:[



{
title:"Jak działają?",

content:`
<img src="courses/fuel/images/16.jpg" class="theory-image">
<p>Wtryskiwacze paliwa są ostatnim elementem układu paliwowego przed procesem spalania.</p>
<p>Działają one na bardzo podobnej zasadzie jak dysza (pistolet) w dystrybutorze na stacji paliw – tam również paliwo pod ciśnieniem jest wypuszczane dopiero w momencie zwolnienia blokady (naciśnięcia spustu) i trafia wprost do celu. Główna różnica polega na precyzji: pistolet na stacji wlewa paliwo zwartym strumieniem do baku, natomiast wtryskiwacz w silniku musi wyrzucić je w ułamku sekundy pod znacznie wyższym ciśnieniem.</p>
<p>Ich zadaniem jest dostarczenie paliwa do komory spalania w postaci bardzo drobnej mgły. Proces rozpylania paliwa nazywany jest atomizacją. Ma on ogromne znaczenie dla jakości spalania, ponieważ drobniejsze krople paliwa mieszają się szybciej z powietrzem.</p>
<ul><li>paliwo pod wysokim ciśnieniem dociera do wtryskiwacza
<li>zawór wtryskiwacza otwiera przepływ,
<li>paliwo zostaje rozpylone przez końcówkę dyszy,
<li>powstaje mieszanka paliwowo-powietrzna.</ul>
`

},



{
title:"Jaka jest ich funkcja?",

content:`
<img src="courses/fuel/images/15.jpg" class="theory-image">
<p> Główną funkcją wtryskiwaczy jest precyzyjne dostarczenie odpowiedniej ilości paliwa do komory spalania.</p>
<p>Wtryskiwacz musi kontrolować:</p>
<ul><li>ilość podawanego paliwa,
<li>moment rozpoczęcia wtrysku,
<li>jakość rozpylania paliwa.</ul>
<p>Nieprawidłowa praca wtryskiwaczy może prowadzić do:</p>
<ul><li>nierównomiernego spalania,
<li>wzrostu temperatury gazów spalinowych,
<li>spadku sprawności silnika.</ul>
`

},



{
title:"Gdzie są zamontowane?",

content:`
<img src="courses/fuel/images/17.jpg" class="theory-image">
<p>Wtryskiwacze są zamontowane bezpośrednio w obudowie komory spalania. Końcówka wtryskiwacza znajduje się w miejscu, gdzie paliwo jest mieszane ze sprężonym powietrzem dostarczonym przez sprężarkę.</p>
<p>Liczba wtryskiwaczy zależy od konstrukcji silnika. W wielu silnikach stosuje się pierścieniowy układ wielu dysz rozmieszczonych wokół komory spalania.</p>
`
},

{
title:"Informacje techniczne",

content:`
<p>Główną funkcją wtryskiwaczy (dysz paliwowych) jest precyzyjne dostarczenie odpowiedniej ilości paliwa do obszaru spalania w postaci silnie zatomizowanej, drobnokroplistej mgły o ściśle określonym kształcie strumienia (ang. spray pattern). Konstrukcja dysz jest ściśle powiązana z typem komory spalania, w której są zamontowane, a ich poprawny dobór i synchronizacja gwarantują, że każde z nich podaje identyczną ilość paliwa.</p>
<p>Typy dysz paliwowych i ich zastosowanie:</p>
<p><b>Dysze Simplex</p></b>
<ul><li><b>Opis:</b> Był to pierwszy typ dysz stosowany w silnikach turbinowych. Każda taka dysza składa się z końcówki (nozzle tip), wkładki (insert) oraz sitka filtrującego o drobnych oczkach (strainer). Posiadają pojedynczy przewód doprowadzający paliwo (single manifold).
<li><b>Kiedy są używane:</b> Głównie w starszych lub prostszych instalacjach, które nie wymagają skomplikowanego podziału przepływu paliwa.
<li><b>Ograniczenia:</b> Wykazują gorszą atomizację paliwa przy niskich prędkościach (podczas rozruchu i na biegu jałowym), co spowodowało ich zastąpienie nowszymi rozwiązaniami.</ul>
<p><b>Dysze Duplex</p></b>
<ul><li><b>Opis:</b> Bardzo rozpowszechnione we współczesnych silnikach turbinowych. Potrafią wytwarzać dwa różne strumienie rozpylenia.
<li><b>Kiedy są używane:</b> Stosowane tam, gdzie wymagana jest doskonała atomizacja i stabilny proces spalania w szerokim zakresie ciśnień oraz prędkości obrotowych silnika – zwłaszcza przy rozruchu, na biegu jałowym oraz podczas pracy na pełnej mocy.</ul>
<p>W niektórych rozwiązaniach (zwłaszcza w silnikach, które łączą zalety obu systemów) stosuje się mieszany układ dysz:</p>
<ul><li>Dysze Simplex jako wtryskiwacze rozruchowe / pomocnicze: Są wykorzystywane podczas rozruchu silnika oraz przy pracy na biegu jałowym (jałowy ciąg / niskie obciążenie). Pozwalają na szybkie utworzenie stabilnego płomienia przy stosunkowo niskim ciśnieniu paliwa.</li>
<li>Dysze Duplex jako wtryskiwacze główne: Dołączają do pracy w kolejnych fazach lotu – podczas startu (takeoff), wznoszenia (climb) oraz lotu przelotowego (cruise).</ul></li>
<p>Dzięki takiemu podziałowi silnik zachowuje łatwość rozruchu i stabilność na niskich obrotach, a jednocześnie ma pełną wydajność i czyste spalanie na dużych wysokościach oraz przy wysokim ciągu.
`

}



],


unlocked:false,

completed:false,


quiz:{

question:
"Jaka jest główna funkcja wtryskiwaczy paliwa?",


options:[

"Precyzyjne rozpylanie paliwa w komorze spalania",

"Chłodzenie oleju silnikowego",

"Pomiar ilości paliwa w przewodzie"

],


answer:0,


explanation:
"Wtryskiwacze dostarczają paliwo do komory spalania i rozpylają je w celu uzyskania prawidłowego procesu spalania."

}


}

],




// ========================================
// QUIZ KOŃCOWY
// ========================================


finalQuiz:[



{
question:
"Jaka jest prawidłowa kolejność przepływu paliwa w układzie?",


options:[

"Pompa → Wymiennik ciepła → Filtr → Przepływomierz → Wtryskiwacze",

"Filtr → Pompa → Przepływomierz → Wymiennik → Wtryskiwacze",

"Wtryskiwacze → Przepływomierz → Filtr → Pompa"

],


answer:0,


explanation:
"Paliwo przepływa kolejno przez pompę paliwową, wymiennik ciepła, filtr, przepływomierz i następnie trafia do wtryskiwaczy."

},



{
question:
"Jaki jest główny cel stosowania filtra paliwa?",


options:[

"Ochrona elementów układu przed zanieczyszczeniami",

"Zwiększenie temperatury paliwa",

"Sterowanie zapłonem silnika"

],


answer:0,


explanation:
"Filtr usuwa zanieczyszczenia, które mogłyby uszkodzić pompę lub wtryskiwacze."

},



{
question:
"Do czego służy wymiennik ciepła paliwa?",


options:[

"Do kontroli temperatury paliwa i chłodzenia oleju",

"Do generowania ciśnienia paliwa",

"Do rozpylania paliwa"

],


answer:0,


explanation:
"Wymiennik paliwowo-olejowy wykorzystuje paliwo jako medium chłodzące dla oleju silnikowego."

},



{
question:
"Co mierzy przepływomierz paliwa?",


options:[

"Ilość paliwa przepływającego przez układ",

"Temperaturę płomienia",

"Ciśnienie w komorze spalania"

],


answer:0,


explanation:
"Przepływomierz dostarcza informacji o aktualnym przepływie paliwa."

},



{
question:
"Który element kończy drogę paliwa przed spalaniem?",


options:[

"Wtryskiwacze paliwa",

"Pompa paliwowa",

"Filtr paliwa"

],


answer:0,


explanation:
"Wtryskiwacze są ostatnim elementem układu paliwowego i dostarczają paliwo do komory spalania."

},



{
question:
"Dlaczego jakość rozpylania paliwa jest ważna?",


options:[

"Poprawia mieszanie paliwa z powietrzem i efektywność spalania",

"Zmniejsza ilość powietrza dostarczanego przez sprężarkę",

"Zastępuje działanie układu zapłonowego"

],


answer:0,


explanation:
"Drobne rozpylanie paliwa poprawia mieszanie z powietrzem i stabilność procesu spalania."

},



{
question:
"Który element zwiększa ciśnienie paliwa?",


options:[

"Pompa paliwowa",

"Przepływomierz",

"Wtryskiwacz"

],


answer:0,


explanation:
"Pompa paliwowa odpowiada za zapewnienie odpowiedniego ciśnienia paliwa w układzie."

},



{
question:
"Który element znajduje się bezpośrednio przed wtryskiwaczami?",


options:[

"Przepływomierz",

"Wymiennik ciepła",

"Pompa paliwowa"

],


answer:0,


explanation:
"W typowym układzie paliwowym przepływomierz znajduje się za filtrem i przed wtryskiwaczami."

}



]

};