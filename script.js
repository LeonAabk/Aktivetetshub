/**
 * SELSKAPSSPILL HUB - Core Logic
 * Strukturert modulært slik at du lett kan utvide databasene og funksjonene.
 */

// ==========================================
// 1. STATE & DATA (Spillere og Mock-Data)
// ==========================================

let players = [];

// Mock-data. Her kan du fortsette å legge til hundrevis av dine egne strings/objekter senere.
const gameData = {
    imposterLocations: [
        "Sykehus", "Politistasjon", "Ubåt", "Kino", "Passasjerfly", 
        "Piratskip", "Casino", "Barneskole", "Dyrehage", "Romstasjon",
        "Rockekonsert", "Fangehull", "Luksushotell", "Spøkelseshus", 
        "Sirkus", "Sjokoladefabrikk", "Militærbase", "Cruise-skip",
        "Fotballstadion", "Bibliotek", "Nattklubb", "IKEA", "Spa/Velværesenter"
    ],
    
    // --- NØDT ELLER SANNHET DATA ---
    todTruth: {
        mild: [
            "Hva er den pinligste sangen du har på din mest spilte spilleliste?",
            "Hvem i rommet ville du overlevd lengst med i en zombie-apokalypse?",
            "Hva er den verste løgnen du noen gang har fortalt foreldrene dine?",
            "Hva er din mest uvanlige, irrasjonelle frykt?",
            "Når gråt du sist, og hvorfor?",
            "Hva er det dummeste du har kjøpt på nettet midt på natten?",
            "Hvilken fiktiv karakter var din første store forelskelse?",
            "Hva er ditt pinligste kallenavn fra barndommen?",
            "Har du noen gang latet som du kjente noen for å slippe unna en klein situasjon?",
            "Hva er det mest flaut du har gjort foran en du var forelsket i?",
            "Hvilken film har du sett flest ganger i skjul?",
            "Hva er din merkeligste uvane når du er alene?",
            "Har du noen gang stjålet noe, uansett hvor lite det var?",
            "Hva er den dummeste grunnen til at du har kranglet med noen?",
            "Hvem sin stil her inne misunner du mest?",
            "Hvis du kunne vært usynlig for en dag, hva ville du gjort?",
            "Hva er det verste måltidet du noensinne har laget til noen andre?",
            "Har du noen gang blitt tatt i å snakke med deg selv i speilet?",
            "Hva er din aller største 'guilty pleasure' på TV?",
            "Hvem av personene i rommet ville vært verst å sitte fast i en heis med?"
        ],
        spicy: [
            "Hvem i rommet har du hatt et godt øye til i skjul?",
            "Hva er det drøyeste du noen gang har gjort på en fest?",
            "Har du noen gang sniklest andres meldinger? Hvem sine?",
            "Hvem i rommet tror du har den mørkeste søkehistorikken?",
            "Har du noen gang sendt en flørtende melding til feil person? Fortell!",
            "Hva er din verste eller pinligste date-opplevelse noensinne?",
            "Hvem i dette rommet ville du helst vært fanget på en øde øy med, romantisk sett?",
            "Hva er det mest ulovlige du noen gang har gjort (uten å bli tatt)?",
            "Hva er den største aldersforskjellen mellom deg og noen du har datet/holdt på med?",
            "Hvem i rommet har de mest irriterende vanene, og hva er de?",
            "Har du noen gang kysset noen i dette rommet? (Hold det hemmelig eller avslør hvem).",
            "Har du noen gang ghostet noen fordi du fant noen bedre?",
            "Hva er ditt hemmelige partytriks for å sjekke opp noen på byen?",
            "Nevn én ting du har gjort dritings, som du angrer dypt på i edru tilstand.",
            "Hvilken kjendis ville du krevd et 'frikort' for i et parforhold?",
            "Hva er den mest upassende tanken du har hatt i løpet av det siste døgnet?"
        ]
    },
    todDare: {
        mild: [
            "Gjør 10 pushups mens du roper navnet til spilleren til høyre for deg.",
            "Snakk med en overdreven, oppdiktet dialekt i de neste 3 rundene.",
            "La gruppen style håret ditt slik de vil, og behold det slik resten av spillet.",
            "Gjenskap din favoritt-emoji med ansiktet og kroppen, og hold posituren i 10 sekunder.",
            "Stå på ett bein de neste to rundene. Hvis du faller, må du ta en ny nødt.",
            "Syng alt du sier de neste to rundene. Ingen vanlig snakking lov!",
            "Mime en scene fra en kjent film helt til noen gjetter den.",
            "Gå ut av rommet, kom inn igjen og gjør din mest dramatiske entré noensinne.",
            "Prøv å sleike albuen din foran alle.",
            "Spis en teskje med noe fra kjøleskapet som gruppen velger (ketchup, sennep, etc.).",
            "La spilleren overfor deg tegne noe i ansiktet ditt med en penn eller sminke.",
            "Snurr rundt 10 ganger og prøv deretter å gå i en rett linje.",
            "Fortell din beste pappavits. Hvis ingen ler, må du ta en straff.",
            "Bytt sokker med personen til venstre for deg for resten av spillet.",
            "Oppfør deg som en robot hver gang det er din tur, til spillet er over.",
            "La de andre spillerne stille deg et 'ja eller nei'-spørsmål som du MÅ svare ærlig på.",
            "Gjeip og lag det styggeste ansiktet du klarer til hver person i rommet en etter en.",
            "Bjeff som en hund hver gang noen sier navnet ditt i de neste 3 rundene.",
            "Legg deg på gulvet og rull tvers over rommet som en tømmerstokk.",
            "Gi telefonen din til personen til venstre og la dem like 3 tilfeldige innlegg på Instagram for deg."
        ],
        spicy: [
            "La personen til venstre for deg sende en valgfri emoji til den siste du tekstet med.",
            "Gi telefonen din til spilleren overfor deg og la dem se på bildene dine i 30 sekunder.",
            "La personen til høyre for deg skrive en statusoppdatering på dine sosiale medier.",
            "Ring en tilfeldig kontakt i telefonboken og syng 'Gratulerer med dagen' til dem.",
            "Vis gruppen det aller siste bildet du lagret/tok på kamerarullen din, uansett hva det er.",
            "Lukk øynene og la gruppen mate deg med noe ukjent fra kjøkkenet.",
            "Vis den siste meldingen du sendte til eksen din, eller til en du nylig flørtet med.",
            "Spill ut hvordan du tror personen til høyre for deg er når de prøver å sjekke opp noen.",
            "Send en SMS til din tredje mest nylige kontakt og skriv 'Jeg vet hva du gjorde'.",
            "La personen til venstre for deg se gjennom nettleserhistorikken din i 1 minutt.",
            "Sitt på fanget til personen overfor deg helt til det er din tur igjen.",
            "Hold hender med personen til høyre for deg de neste 3 rundene uten å slippe.",
            "Vis gruppen din aller mest pinlige eller stygge selfie du har på telefonen.",
            "Les høyt de tre siste meldingene i din mest aktive gruppechat.",
            "Send en DM til din 'celebrity crush' på Instagram og si at du er ulykkelig forelsket i dem.",
            "Dans forførende (uten musikk) i 30 sekunder foran gruppen.",
            "Vis gruppen nøyaktig hva du har i bankkonto-saldoen din akkurat nå.",
            "Gå inn i kamerarullen din, scroll i blinde, og vis bildet du lander på.",
            "Bytt et klesplagg med spilleren til venstre."
        ]
    },
    
    // --- WOULD YOU RATHER DATA ---
    wyr: [
        { opt1: "Alltid ha en stein i skoen", opt2: "Alltid ha våte sokker" },
        { opt1: "Kunne fly (maks 1 meter over bakken)", opt2: "Være usynlig (bare når ingen ser på deg)" },
        { opt1: "Måtte hviske alt du sier", opt2: "Måtte rope alt du sier" },
        { opt1: "Spise pizza med ananas resten av livet", opt2: "Aldri spise pizza igjen" },
        { opt1: "Ha fingre som ben", opt2: "Ha ben som fingre" },
        { opt1: "Bli angrepet av én hest på størrelse med en and", opt2: "Bli angrepet av 100 ender på størrelse med hester" },
        { opt1: "Alltid komme 10 minutter for sent til alt", opt2: "Alltid komme 20 minutter for tidlig til alt" },
        { opt1: "Ha ubegrenset med penger, men ingen venner", opt2: "Være fattig, men ha fantastiske venner" },
        { opt1: "Miste evnen til å lyve", opt2: "Tro på alt alle sier til deg" },
        { opt1: "Aldri mer kunne bruke internett", opt2: "Aldri mer kunne forlate hjembyen din" },
        { opt1: "Ha en knapp som spoler tiden frem", opt2: "Ha en knapp som setter tiden på pause" },
        { opt1: "Ha maur kravlende på armen din for alltid", opt2: "Alltid ha følelsen av et hårstrå i munnen" },
        { opt1: "Gjenoppleve den samme dagen om og om igjen", opt2: "Leve et liv der du aldri husker hva du gjorde i går" },
        { opt1: "Finne ekte kjærlighet", opt2: "Vinne 100 millioner i lotto" },
        { opt1: "Kunne snakke alle språk flytende", opt2: "Kunne snakke med dyr" }
    ],
    
    // --- TRIVIA DATA ---
    trivia: [
        { q: "Hvilken planet er nærmest solen?", a: "Merkur" },
        { q: "Hvor mange hjerter har en blekksprut?", a: "Tre" },
        { q: "Hva heter hovedstaden i Australia?", a: "Canberra" },
        { q: "Hvem malte Mona Lisa?", a: "Leonardo da Vinci" },
        { q: "Hvilket grunnstoff har kjemisk symbol 'O'?", a: "Oksygen" }
    ]
};

// ==========================================
// 2. SPA ROUTING (Navigasjon)
// ==========================================

const screens = document.querySelectorAll('.screen');
const btnBack = document.getElementById('btn-back');
const headerTitle = document.getElementById('header-title');

// Bytter skjerm ved å fjerne 'active' og legge til på target
function showScreen(screenId, title = "Selskapsspill Hub") {
    screens.forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    
    const targetScreen = document.getElementById(screenId);
    if(targetScreen) {
        targetScreen.classList.remove('hidden');
        targetScreen.classList.add('active');
    }

    headerTitle.innerText = title;

    // Vis tilbake-knapp på alle andre skjermer enn setup og hovedmeny
    if (screenId === 'screen-setup' || screenId === 'screen-menu') {
        btnBack.classList.add('hidden');
    } else {
        btnBack.classList.remove('hidden');
    }
}

// Eventlistener for hovedmeny-knappene
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        const title = card.querySelector('h3').innerText;
        showScreen(target, title);
        
        // Nullstill spillspesifikk UI når vi går inn i dem
        if(target === 'screen-imposter') initImposter();
        if(target === 'screen-tod') initToD();
        if(target === 'screen-wyr') loadNextWYR();
        if(target === 'screen-trivia') loadNextTrivia();
    });
});

// Tilbakeknapp sender oss til hovedmenyen
btnBack.addEventListener('click', () => {
    showScreen('screen-menu');
});

// ==========================================
// 3. SPILLER-REGISTRERING LOGIKK
// ==========================================

const playerInput = document.getElementById('player-input');
const btnAddPlayer = document.getElementById('btn-add-player');
const playerList = document.getElementById('player-list');
const btnStartApp = document.getElementById('btn-start-app');

function renderPlayers() {
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${player}</span> <span class="remove-player" data-index="${index}">✖</span>`;
        playerList.appendChild(li);
    });

    // Vis "Start"-knapp kun hvis vi har minst 2 spillere
    if (players.length >= 2) {
        btnStartApp.classList.remove('hidden');
    } else {
        btnStartApp.classList.add('hidden');
    }
}

function addPlayer() {
    const name = playerInput.value.trim();
    if (name && !players.includes(name)) {
        players.push(name);
        playerInput.value = '';
        renderPlayers();
    }
}

btnAddPlayer.addEventListener('click', addPlayer);
playerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addPlayer();
});

// Fjern spiller (Event delegation)
playerList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-player')) {
        const index = e.target.getAttribute('data-index');
        players.splice(index, 1);
        renderPlayers();
    }
});

// Start appen (gå til meny)
btnStartApp.addEventListener('click', () => {
    showScreen('screen-menu');
});


// ==========================================
// 4. HJELPEFUNKSJONER
// ==========================================

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// ==========================================
// 5. SPILL: IMPOSTER
// ==========================================
let imposterState = { 
    currentPlayerIndex: 0, 
    roles: [],
    timerInterval: null,
    timeLeft: 300,
    currentLocation: "" // Ny state for å huske stedet
};

const imposterSetup = document.getElementById('imposter-setup-view');
const imposterPlay = document.getElementById('imposter-play-view');
const imposterTimerView = document.getElementById('imposter-timer-view');
const flipCard = document.getElementById('imposter-flip-card');
const flipCardInner = document.getElementById('imposter-card-inner');
const imposterDuration = document.getElementById('imposter-duration');
const btnImposterNext = document.getElementById('btn-imposter-next');
const imposterRoleText = document.getElementById('imposter-role-text');
const guessSection = document.getElementById('imposter-guess-section');
const locationSelect = document.getElementById('imposter-location-select');

flipCardInner.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform' && !flipCard.classList.contains('flipped')) {
        flipCard.style.visibility = '';
    }
});

function initImposter() {
    imposterSetup.classList.remove('hidden');
    imposterPlay.classList.add('hidden');
    imposterTimerView.classList.add('hidden');
    guessSection.classList.add('hidden');
    
    document.getElementById('imposter-location-list').innerText = gameData.imposterLocations.join(" • ");
    imposterDuration.value = imposterDuration.value || '300';

    clearInterval(imposterState.timerInterval);
    imposterState.timerInterval = null;
    imposterState.timeLeft = parseInt(imposterDuration.value, 10);
}

document.getElementById('btn-imposter-start').addEventListener('click', () => {
    if (players.length < 3) {
        alert("Imposter krever minst 3 spillere!");
        return;
    }

    imposterState.timeLeft = parseInt(imposterDuration.value, 10) || 300;
    imposterState.currentLocation = getRandomItem(gameData.imposterLocations);
    const imposterIndex = Math.floor(Math.random() * players.length);
    
    imposterState.roles = players.map((player, i) => {
        if (i === imposterIndex) {
            return { name: player, isImposter: true, text: `<span class="imposter-red">Du er IMPOSTER!</span><br><br><span class="small-text">Prøv å gjett hvor dere er.</span>` };
        } else {
            return { name: player, isImposter: false, text: `Stedet er:<br><span class="imposter-green" style="font-size: 1.5rem; font-weight: bold;">${imposterState.currentLocation}</span>` };
        }
    });
    
    imposterState.roles.sort(() => Math.random() - 0.5);
    imposterState.currentPlayerIndex = 0;

    imposterSetup.classList.add('hidden');
    imposterPlay.classList.remove('hidden');
    updateImposterTurn();
});

function updateImposterTurn() {
    btnImposterNext.classList.add('hidden');
    const wasFlipped = flipCard.classList.contains('flipped');
    flipCard.style.visibility = 'hidden';
    flipCard.classList.remove('flipped');

    if (imposterState.currentPlayerIndex >= imposterState.roles.length) {
        startImposterTimerPhase();
        return;
    }

    const currentPlayer = imposterState.roles[imposterState.currentPlayerIndex];
    document.getElementById('imposter-turn-text').innerText = `Gi telefonen til ${currentPlayer.name}`;
    imposterRoleText.innerHTML = currentPlayer.text;

    if (!wasFlipped) {
        flipCard.style.visibility = '';
    }
}

flipCard.addEventListener('click', () => {
    if (!flipCard.classList.contains('flipped')) {
        flipCard.classList.add('flipped');
        btnImposterNext.classList.remove('hidden');
    }
});

btnImposterNext.addEventListener('click', () => {
    imposterState.currentPlayerIndex++;
    updateImposterTurn();
});

// Timer og Gjetting
function startImposterTimerPhase() {
    imposterPlay.classList.add('hidden');
    imposterTimerView.classList.remove('hidden');
    updateTimerDisplay();

    // Fyll dropdown med steder sortert alfabetisk
    locationSelect.innerHTML = "";
    const sortedLocations = [...gameData.imposterLocations].sort();
    sortedLocations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.innerText = loc;
        locationSelect.appendChild(option);
    });
}

function updateTimerDisplay() {
    const minutes = Math.floor(imposterState.timeLeft / 60);
    const seconds = imposterState.timeLeft % 60;
    document.getElementById('imposter-timer').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('btn-imposter-timer-toggle').addEventListener('click', (e) => {
    if (imposterState.timerInterval) {
        clearInterval(imposterState.timerInterval);
        imposterState.timerInterval = null;
        e.target.innerText = "Start";
        e.target.classList.replace('btn-warning', 'btn-success');
    } else {
        e.target.innerText = "Pause";
        e.target.classList.replace('btn-success', 'btn-warning');
        imposterState.timerInterval = setInterval(() => {
            imposterState.timeLeft--;
            updateTimerDisplay();
            if (imposterState.timeLeft <= 0) {
                clearInterval(imposterState.timerInterval);
                document.getElementById('imposter-timer').innerText = "TIDEN ER UTE!";
            }
        }, 1000);
    }
});

// Avslører gjette-panelet
document.getElementById('btn-imposter-wants-guess').addEventListener('click', () => {
    guessSection.classList.remove('hidden');
    // Pauser timeren automatisk
    if (imposterState.timerInterval) {
        document.getElementById('btn-imposter-timer-toggle').click();
    }
});

// Håndterer gjettingen
document.getElementById('btn-imposter-submit-guess').addEventListener('click', () => {
    const guessedLocation = locationSelect.value;
    if (guessedLocation === imposterState.currentLocation) {
        alert(`🚨 RIKTIG! Stedet var ${imposterState.currentLocation}. Imposteren vinner!`);
    } else {
        alert(`❌ FEIL! Stedet var ${imposterState.currentLocation}. Imposteren tapte!`);
    }
    initImposter(); // Reset etter ferdig runde
});

document.getElementById('btn-imposter-end').addEventListener('click', initImposter);

// ==========================================
// 6. SPILL: NØDT ELLER SANNHET (Oppdatert)
// ==========================================

const todPlayerTurn = document.getElementById('tod-player-turn');
const btnTodDraw = document.getElementById('btn-tod-draw');
const todChoices = document.getElementById('tod-choices');
const todResult = document.getElementById('tod-result');

// State for valg av modus
let currentSpiciness = 'mild';

// Event listeners for modus-knappene
document.getElementById('btn-mode-mild').addEventListener('click', (e) => {
    currentSpiciness = 'mild';
    e.target.classList.add('active');
    document.getElementById('btn-mode-spicy').classList.remove('active');
});

document.getElementById('btn-mode-spicy').addEventListener('click', (e) => {
    currentSpiciness = 'spicy';
    e.target.classList.add('active');
    document.getElementById('btn-mode-mild').classList.remove('active');
});

function initToD() {
    todPlayerTurn.innerText = "Hvem er nestemann?";
    todPlayerTurn.className = "roulette-text"; 
    btnTodDraw.classList.remove('hidden');
    todChoices.classList.add('hidden');
    todResult.classList.add('hidden');
}

btnTodDraw.addEventListener('click', () => {
    if (players.length < 2) {
        alert("Dere må være minst 2 spillere!");
        return;
    }

    btnTodDraw.classList.add('hidden');
    todPlayerTurn.classList.add('roulette-active');
    
    let spins = 0;
    const maxSpins = 20; 
    const spinDelay = 100; 

    const spinInterval = setInterval(() => {
        const randomPlayer = getRandomItem(players);
        todPlayerTurn.innerText = randomPlayer;
        spins++;

        if (spins >= maxSpins) {
            clearInterval(spinInterval);
            finishRoulette();
        }
    }, spinDelay);
});

function finishRoulette() {
    todPlayerTurn.className = "roulette-text roulette-winner";
    todPlayerTurn.innerText = `${todPlayerTurn.innerText} sin tur!`;
    
    setTimeout(() => {
        todChoices.classList.remove('hidden');
    }, 500);
}

// Oppdatert for å trekke fra riktig modus (mild eller spicy)
function showToDResult(type) {
    const categoryObj = type === 'truth' ? gameData.todTruth : gameData.todDare;
    const list = categoryObj[currentSpiciness];
    const text = getRandomItem(list);
    
    todChoices.classList.add('hidden');
    todResult.classList.remove('hidden');
    document.getElementById('tod-result-text').innerText = text;
}

document.getElementById('btn-truth').addEventListener('click', () => showToDResult('truth'));
document.getElementById('btn-dare').addEventListener('click', () => showToDResult('dare'));

document.getElementById('btn-tod-next').addEventListener('click', initToD);

// ==========================================
// 7. SPILL: BASIC KNOWLEDGE / TRIVIA
// ==========================================

const triviaQuestion = document.getElementById('trivia-question');
const triviaAnswer = document.getElementById('trivia-answer');
const btnTriviaReveal = document.getElementById('btn-trivia-reveal');
const btnTriviaNext = document.getElementById('btn-trivia-next');

function loadNextTrivia() {
    const item = getRandomItem(gameData.trivia);
    triviaQuestion.innerText = item.q;
    triviaAnswer.innerText = item.a;
    triviaAnswer.classList.add('hidden');
    btnTriviaReveal.classList.remove('hidden');
    btnTriviaNext.classList.remove('hidden');
}

btnTriviaReveal.addEventListener('click', () => {
    triviaAnswer.classList.remove('hidden');
    btnTriviaReveal.classList.add('hidden');
});

btnTriviaNext.addEventListener('click', loadNextTrivia);

// ==========================================
// 8. SPILL: WOULD YOU RATHER
// ==========================================

const opt1Box = document.getElementById('wyr-opt1');
const opt2Box = document.getElementById('wyr-opt2');
const btnWyrNext = document.getElementById('btn-wyr-next');

function loadNextWYR() {
    const dilemma = getRandomItem(gameData.wyr);
    opt1Box.innerText = dilemma.opt1;
    opt2Box.innerText = dilemma.opt2;
    
    // Nullstill klasser
    opt1Box.className = "wyr-box bg-blue interactive-box";
    opt2Box.className = "wyr-box bg-pink interactive-box";
    btnWyrNext.classList.add('hidden');
}

// Håndter klikk på valgene
function handleWyrChoice(selectedBox, otherBox) {
    selectedBox.classList.add('selected');
    selectedBox.classList.remove('dimmed');
    otherBox.classList.add('dimmed');
    otherBox.classList.remove('selected');
    
    // Vis neste-knapp etter et valg er tatt
    btnWyrNext.classList.remove('hidden');
}

opt1Box.addEventListener('click', () => handleWyrChoice(opt1Box, opt2Box));
opt2Box.addEventListener('click', () => handleWyrChoice(opt2Box, opt1Box));

btnWyrNext.addEventListener('click', loadNextWYR);