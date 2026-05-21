/**
 * SELSKAPSSPILL HUB - Core Logic
 * Strukturert modulært slik at du lett kan utvide databasene og funksjonene.
 */

// ==========================================
// 1. STATE & DATA (Spillere og Mock-Data)
// ==========================================

let players = [];

// Mock-data. Her kan du legge til hundrevis av dine egne strings/objekter senere.
const gameData = {
    imposterLocations: [
        "Sykehus", "Polstistasjon", "Ubåt", "Kino", "Passasjerfly", 
        "Piratskip", "Casino", "Barneskole", "Dyrehage", "Romstasjon"
    ],
    todTruth: [
        "Hva er din pinligste opplevelse?",
        "Hvem i rommet ville du overlevd lengst med på en øde øy?",
        "Hva er den verste løgnen du har fortalt foreldrene dine?",
        "Hva er din mest uvanlige frykt?",
        "Har du noen gang sniklest andres meldinger?"
    ],
    todDare: [
        "Gjør 10 pushups mens du roper navnet til spilleren til høyre for deg.",
        "La personen til venstre for deg sende en valgfri emoji til den siste du tekstet.",
        "Snakk med en oppdiktet dialekt i de neste 3 rundene.",
        "Gi telefonen din til spilleren overfor deg og la dem se på bildene dine i 30 sekunder.",
        "Spis en skje med sennep eller ketchup."
    ],
    wyr: [
        { opt1: "Alltid ha en stein i skoen", opt2: "Alltid ha våte sokker" },
        { opt1: "Kunne fly (men maks 1 meter over bakken)", opt2: "Være usynlig (men bare når ingen ser på deg)" },
        { opt1: "Alltid måtte hviske", opt2: "Alltid måtte rope" },
        { opt1: "Spise pizza med ananas resten av livet", opt2: "Aldri spise pizza igjen" },
        { opt1: "Ha fingre som ben", opt2: "Ha ben som fingre" }
    ],
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
let imposterState = { currentPlayerIndex: 0, roles: [] };

function initImposter() {
    document.getElementById('imposter-setup-view').classList.remove('hidden');
    document.getElementById('imposter-play-view').classList.add('hidden');
}

document.getElementById('btn-imposter-start').addEventListener('click', () => {
    // Generer roller
    const location = getRandomItem(gameData.imposterLocations);
    const imposterIndex = Math.floor(Math.random() * players.length);
    
    imposterState.roles = players.map((player, i) => {
        return { name: player, role: i === imposterIndex ? 'Du er IMPOSTER!' : `Sted: ${location}` };
    });
    
    // Shuffle arrayet slik at turn-ordenen er tilfeldig (valgfritt, men gøy)
    imposterState.roles.sort(() => Math.random() - 0.5);
    imposterState.currentPlayerIndex = 0;

    document.getElementById('imposter-setup-view').classList.add('hidden');
    document.getElementById('imposter-play-view').classList.remove('hidden');
    updateImposterTurn();
});

function updateImposterTurn() {
    if (imposterState.currentPlayerIndex >= imposterState.roles.length) {
        // Alle har sett rollen sin
        document.getElementById('imposter-play-view').classList.add('hidden');
        document.getElementById('imposter-setup-view').classList.remove('hidden');
        alert("Alle har sett rollene sine. Diskuter og finn Imposteren!");
        return;
    }

    const currentPlayer = imposterState.roles[imposterState.currentPlayerIndex];
    document.getElementById('imposter-turn-text').innerText = `Gi telefonen til ${currentPlayer.name}`;
    document.getElementById('btn-imposter-reveal').classList.remove('hidden');
    document.getElementById('imposter-role-display').classList.add('hidden');
}

document.getElementById('btn-imposter-reveal').addEventListener('click', () => {
    const role = imposterState.roles[imposterState.currentPlayerIndex].role;
    document.getElementById('imposter-role-text').innerText = role;
    
    document.getElementById('btn-imposter-reveal').classList.add('hidden');
    document.getElementById('imposter-role-display').classList.remove('hidden');
});

document.getElementById('btn-imposter-next').addEventListener('click', () => {
    imposterState.currentPlayerIndex++;
    updateImposterTurn();
});


// ==========================================
// 6. SPILL: NØDT ELLER SANNHET
// ==========================================

function initToD() {
    document.getElementById('tod-player-turn').innerText = "Trykk for å trekke spiller";
    document.getElementById('btn-tod-draw').classList.remove('hidden');
    document.getElementById('tod-choices').classList.add('hidden');
    document.getElementById('tod-result').classList.add('hidden');
}

document.getElementById('btn-tod-draw').addEventListener('click', () => {
    const randomPlayer = getRandomItem(players);
    document.getElementById('tod-player-turn').innerText = `${randomPlayer} sin tur!`;
    document.getElementById('btn-tod-draw').classList.add('hidden');
    document.getElementById('tod-choices').classList.remove('hidden');
});

function showToDResult(type) {
    const list = type === 'truth' ? gameData.todTruth : gameData.todDare;
    const text = getRandomItem(list);
    
    document.getElementById('tod-choices').classList.add('hidden');
    document.getElementById('tod-result').classList.remove('hidden');
    document.getElementById('tod-result-text').innerText = text;
}

document.getElementById('btn-truth').addEventListener('click', () => showToDResult('truth'));
document.getElementById('btn-dare').addEventListener('click', () => showToDResult('dare'));

document.getElementById('btn-tod-next').addEventListener('click', initToD);


// ==========================================
// 7. SPILL: WOULD YOU RATHER
// ==========================================

function loadNextWYR() {
    const dilemma = getRandomItem(gameData.wyr);
    document.getElementById('wyr-opt1').innerText = dilemma.opt1;
    document.getElementById('wyr-opt2').innerText = dilemma.opt2;
}

document.getElementById('btn-wyr-next').addEventListener('click', loadNextWYR);


// ==========================================
// 8. SPILL: BASIC KNOWLEDGE TRIVIA
// ==========================================

let currentTrivia = {};

function loadNextTrivia() {
    currentTrivia = getRandomItem(gameData.trivia);
    document.getElementById('trivia-question').innerText = currentTrivia.q;
    document.getElementById('trivia-answer').innerText = currentTrivia.a;
    
    document.getElementById('trivia-answer').classList.add('hidden');
    document.getElementById('btn-trivia-reveal').classList.remove('hidden');
}

document.getElementById('btn-trivia-reveal').addEventListener('click', () => {
    document.getElementById('trivia-answer').classList.remove('hidden');
    document.getElementById('btn-trivia-reveal').classList.add('hidden');
});

document.getElementById('btn-trivia-next').addEventListener('click', loadNextTrivia);