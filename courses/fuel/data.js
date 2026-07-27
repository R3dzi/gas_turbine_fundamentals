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
<p>Pompa paliwowa znajduje się zazwyczaj na przekładni akcesoriów silnika. Ten komponent silnika miałeś okazję poznać na kursie o anatomii silnika.</p>
<p>Jest ona połączona mechanicznie z silnikiem, dzięki czemu jej wydajność rośnie wraz z prędkością obrotową jednostki.</p>`

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

<img src="courses/fuel/images/heat_exchanger.jpg" class="theory-image">


<p>
Wymiennik ciepła kontroluje temperaturę paliwa
przed jego dalszym przepływem do układu wtryskowego.
</p>


<p>
W silnikach turbinowych paliwo często jest wykorzystywane
jako medium chłodzące dla oleju silnikowego.
</p>


<p>
Podczas tego procesu paliwo odbiera ciepło od oleju,
a następnie trafia do dalszych elementów układu.
</p>

`

},



{
title:"Jaka jest jego funkcja?",

content:`

<p>
Podstawowe zadania wymiennika:

</p>


<ul>

<li>
utrzymanie odpowiedniej temperatury paliwa,
</li>

<li>
chłodzenie oleju silnikowego,
</li>

<li>
zapobieganie problemom związanym z niską temperaturą paliwa.
</li>

</ul>


<p>
Zbyt zimne paliwo może powodować problemy
z przepływem oraz powstawaniem kryształów lodu.
</p>

`

},



{
title:"Gdzie jest zamontowany?",

content:`

<p>
Wymiennik paliwowo-olejowy znajduje się zazwyczaj
w pobliżu układu olejowego i paliwowego silnika.
</p>


<p>
Jego dokładna lokalizacja zależy od konstrukcji
danego silnika.
</p>

`

},



{
title:"Informacje techniczne",

content:`

<ul>

<li>
Najczęściej jest to wymiennik typu paliwo-olej.
</li>

<li>
Wykorzystuje różnicę temperatur pomiędzy mediami.
</li>

<li>
Nie posiada własnego napędu — działa dzięki przepływowi obu cieczy.
</li>

</ul>

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

<img src="courses/fuel/images/fuel_filter.jpg" class="theory-image">


<p>
Filtr paliwa jest elementem ochronnym układu paliwowego.
Jego zadaniem jest zatrzymywanie zanieczyszczeń znajdujących
się w paliwie przed dostaniem się do precyzyjnych elementów
układu wtryskowego.
</p>


<p>
Współczesne silniki turbinowe wykorzystują filtry o bardzo
wysokiej dokładności filtracji, ponieważ elementy takie jak
pompy wysokiego ciśnienia oraz wtryskiwacze posiadają bardzo
małe tolerancje wykonania.
</p>


<p>
Podczas przepływu paliwa przez filtr:

</p>


<ul>

<li>
cząstki stałe zostają zatrzymane przez materiał filtracyjny,
</li>

<li>
większe zanieczyszczenia pozostają wewnątrz obudowy filtra,
</li>

<li>
oczyszczone paliwo trafia do kolejnych elementów układu.
</li>

</ul>

`

},



{
title:"Jaka jest jego funkcja?",

content:`

<p>
Podstawową funkcją filtra paliwa jest ochrona układu
przed uszkodzeniem.
</p>


<p>
Filtr chroni szczególnie:

</p>


<ul>

<li>
pompę wysokiego ciśnienia,
</li>

<li>
zawory sterujące przepływem paliwa,
</li>

<li>
wtryskiwacze paliwa.
</li>

</ul>


<p>
Zanieczyszczenia mogą powodować zużycie elementów,
blokowanie przepływu lub nieprawidłowe rozpylanie paliwa.
</p>

`

},



{
title:"Gdzie jest zamontowany?",

content:`

<img src="courses/fuel/images/filter_location.jpg" class="theory-image">


<p>
Filtr paliwa znajduje się za pompą paliwową oraz
przed elementami odpowiedzialnymi za dokładne dozowanie paliwa.
</p>


<p>
Typowa kolejność przepływu:

</p>


<ul>

<li>
pompa paliwa,
</li>

<li>
wymiennik ciepła,
</li>

<li>
filtr paliwa,
</li>

<li>
przepływomierz,
</li>

<li>
wtryskiwacze.
</li>

</ul>


`

},



{
title:"Informacje techniczne",

content:`

<ul>

<li>
Filtry posiadają określoną dokładność filtracji.
</li>

<li>
Mogą posiadać zawór obejściowy (bypass valve).
</li>

<li>
W przypadku zatkania filtr może umożliwić przepływ paliwa
awaryjnego przez obejście.
</li>

<li>
Stan filtra może być monitorowany przez różnicę ciśnień
przed i za filtrem.
</li>

</ul>


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

<img src="courses/fuel/images/flow_meter.jpg" class="theory-image">


<p>
Przepływomierz paliwa mierzy ilość paliwa przepływającą
przez układ w określonym czasie.
</p>


<p>
Informacja o przepływie paliwa jest wykorzystywana przez
system sterowania silnikiem do kontroli parametrów pracy.
</p>


<p>
W nowoczesnych silnikach dane te mogą być przekazywane
do układu FADEC, który na ich podstawie reguluje pracę
układu paliwowego.
</p>


`

},



{
title:"Jaka jest jego funkcja?",

content:`

<p>
Główne zadania przepływomierza:

</p>


<ul>

<li>
pomiar aktualnego przepływu paliwa,
</li>

<li>
dostarczanie informacji do systemu sterowania,
</li>

<li>
kontrola poprawności działania układu paliwowego.
</li>

</ul>


<p>
Dokładny pomiar paliwa jest niezbędny do prawidłowego
sterowania ciągiem oraz zużyciem paliwa.
</p>


`

},



{
title:"Gdzie jest zamontowany?",

content:`

<p>
Przepływomierz znajduje się w przewodzie paliwowym
pomiędzy filtrem paliwa a wtryskiwaczami.
</p>


<p>
Jest umieszczony w miejscu, gdzie przepływ paliwa jest
już oczyszczony i stabilny.
</p>


`

},



{
title:"Informacje techniczne",

content:`

<ul>

<li>
Pomiar może być realizowany mechanicznie lub elektronicznie.
</li>

<li>
Sygnał przepływu może być wykorzystywany przez FADEC.
</li>

<li>
Nie steruje bezpośrednio przepływem — tylko go mierzy.
</li>

</ul>


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

<img src="courses/fuel/images/injectors.jpg" class="theory-image">


<p>
Wtryskiwacze paliwa są ostatnim elementem układu
paliwowego przed procesem spalania.
</p>


<p>
Ich zadaniem jest dostarczenie paliwa do komory spalania
w postaci bardzo drobnej mgły.
</p>


<p>
Proces rozpylania paliwa nazywany jest atomizacją.
Ma on ogromne znaczenie dla jakości spalania, ponieważ
drobniejsze krople paliwa mieszają się szybciej
z powietrzem.
</p>


<ul>

<li>
paliwo pod wysokim ciśnieniem dociera do wtryskiwacza,
</li>

<li>
zawór wtryskiwacza otwiera przepływ,
</li>

<li>
paliwo zostaje rozpylone przez końcówkę dyszy,
</li>

<li>
powstaje mieszanka paliwowo-powietrzna.
</li>

</ul>

`

},



{
title:"Jaka jest ich funkcja?",

content:`

<p>
Główną funkcją wtryskiwaczy jest precyzyjne dostarczenie
odpowiedniej ilości paliwa do komory spalania.
</p>


<p>
Wtryskiwacz musi kontrolować:

</p>


<ul>

<li>
ilość podawanego paliwa,
</li>

<li>
moment rozpoczęcia wtrysku,
</li>

<li>
jakość rozpylania paliwa.
</li>

</ul>


<p>
Nieprawidłowa praca wtryskiwaczy może prowadzić do:
</p>


<ul>

<li>
nierównomiernego spalania,
</li>

<li>
wzrostu temperatury gazów spalinowych,
</li>

<li>
spadku sprawności silnika.
</li>

</ul>


`

},



{
title:"Gdzie są zamontowane?",

content:`

<img src="courses/fuel/images/injector_location.jpg" class="theory-image">


<p>
Wtryskiwacze są zamontowane bezpośrednio w obudowie
komory spalania.
</p>


<p>
Końcówka wtryskiwacza znajduje się w miejscu,
gdzie paliwo jest mieszane ze sprężonym powietrzem
dostarczonym przez sprężarkę.
</p>


<p>
Liczba wtryskiwaczy zależy od konstrukcji silnika.
W wielu silnikach stosuje się pierścieniowy układ
wielu dysz rozmieszczonych wokół komory spalania.
</p>


`

},



{
title:"Informacje techniczne",

content:`

<ul>

<li>
Wtryskiwacze mogą posiadać wielootworowe końcówki rozpylające.
</li>

<li>
Niektóre konstrukcje posiadają dodatkowy obwód paliwa
dla pracy przy różnych zakresach silnika.
</li>

<li>
Dokładność wykonania jest bardzo wysoka ze względu
na wymagania dotyczące rozpylania paliwa.
</li>

<li>
Są elementami krytycznymi dla stabilności spalania.
</li>

</ul>


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