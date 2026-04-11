const foodTheme = ['🍎', '🍌', '🍇', '🥦', '🍕', '🍦', '🍩', '🥑', '🍔', '🍓'];
const animalsTheme = ['🦁', '🐸', '🦒', '🐧', '🐙', '🦋', '🦉', '🐘', '🐷', '🐝'];
const adventureTheme = ['🚀', '🚲', '🚁', '⛵', '🚜', '🛸', '🚂', '🚒', '🛹', '🎈'];
const objectsTheme = ['🎁', '🕶️', '🎸', '☂️', '🔑', '🎨', '⚽', '⏰', '💡', '🌵'];
const objects2Theme = ['🎁', '🕶️'];
const theme = [foodTheme, adventureTheme, animalsTheme, objectsTheme, objects2Theme]

const gameState = {
    premiereCarte: null,
    deuxiemeCarte: null,
    stopclick: false,
    nbCoups: 0,
    secondes: 0,
    interval: null,
    etatChrono: false
};

const zoneJeu = document.querySelector(".jeu");
const start = document.querySelector(".checkstart");
const btnReinitialiser = document.querySelectorAll(".reinitialiser");
const themeSelect = document.querySelector("#topic-select");
const divTheme = document.querySelector(".div-theme");
const defi = document.querySelector(".defi");
const coup = document.querySelector(".coups");
const tempsAffiche = document.querySelector('.temps');
const confettis = document.querySelector('#confetti-canvas');
/*modale*/
const overlay = document.querySelector(".overlay");
const fermerModaleBtn = document.querySelector(".fermermodale");



/*ZONE SCORE + TEMPS */
function updateScore() {
    coup.textContent = `Nombre de coups : ${gameState.nbCoups}`;
}
function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function updateTime() {
    const resTime = formatTime(gameState.secondes)

    tempsAffiche.textContent = `Temps : ${resTime}`;
}


function demarrerChrono() {
    if (gameState.etatChrono === false) {
        gameState.etatChrono = true
        gameState.interval = setInterval(() => {
            gameState.secondes++
            updateTime()
        }, 1000);
    }

}
function arreterChrono() {
    clearInterval(gameState.interval);
    gameState.etatChrono = false;
    gameState.interval = null;

}

/*JEU - CARTE*/
function choisirTheme() {
    const selectedValue = Number(themeSelect.value);

    if (Number.isNaN(selectedValue) || selectedValue === 0) {
        return null;
    }

    const indexTheme = selectedValue - 1;
    if (!theme[indexTheme]) return null;

    return theme[indexTheme];

}



function preparation() {
    const choix = choisirTheme();
    if (!choix) return;

    gameState.nbCoups = 0;
    updateScore();

    const deck = [...choix, ...choix]
    deck.sort(() => Math.random() - 0.5);
    generate(deck)
    divTheme.style.display = "none";
    defi.style.display = "grid";
    console.log(deck);
}


function generate(tab) {
    zoneJeu.innerHTML = "";
    tab.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("carte");
        card.dataset.emoji = emoji;
        card.innerHTML = `<div class='derriere'>  ???</div> <div class='devant'> ${emoji} </div>`;
        card.addEventListener("click", retourner);
        zoneJeu.appendChild(card)
    })

}
function retourner() {
    demarrerChrono()
    // SÉCURITÉ : On ne fait rien si le jeu est bloqué OU si on clique sur une carte déjà retournée
    if (gameState.stopclick || this.classList.contains("retournee")) return;

    this.classList.add("retournee");

    if (gameState.premiereCarte === null) {
        // C'est le premier clic
        gameState.premiereCarte = this;
    } else {
        // C'est le deuxième clic
        gameState.deuxiemeCarte = this;
        gameState.stopclick = true;
        gameState.nbCoups++;
        updateScore();
        verifier(); // On lance la comparaison
    }
}

function verifier() {

    if (gameState.premiereCarte.dataset.emoji === gameState.deuxiemeCarte.dataset.emoji) {
        gameState.premiereCarte.classList.add("match");
        gameState.deuxiemeCarte.classList.add("match");
        gameState.premiereCarte = null;
        gameState.deuxiemeCarte = null;
        gameState.stopclick = false;
        win();


    } else {
        setTimeout(() => {
            gameState.premiereCarte.classList.remove("retournee");
            gameState.deuxiemeCarte.classList.remove("retournee");

            gameState.premiereCarte = null;
            gameState.stopclick = false;
        }, 2000);
    }
}

themeSelect.selectedIndex = 0;


function win() {
    const themeActuel = choisirTheme();
    if (!themeActuel) return;

    const cartesMatch = document.querySelectorAll(".carte.match");
    if (cartesMatch.length === themeActuel.length * 2) {
        arreterChrono();
        overlay.classList.add("active");

        var count = 200;
        var defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }
}


function reinitialiser() {
    gameState.premiereCarte = null;
    gameState.deuxiemeCarte = null;
    gameState.stopclick = false;
    gameState.nbCoups = 0;
    gameState.secondes = 0;
    themeSelect.selectedIndex = 0;
    zoneJeu.innerHTML = "";
    divTheme.style.display = "block";
    defi.style.display = "none";
    arreterChrono();
    updateScore();
    updateTime();
    preparation();
    fermerModale();
}
function fermerModale() {
    overlay.classList.remove("active");
}

/*ÉVÉNEMENTS*/
start.addEventListener("click", preparation);
preparation();
fermerModaleBtn.addEventListener("click", fermerModale);

btnReinitialiser.forEach((btn) => { /*Pour que les deux boutons de réinitialisation fonctionnent*/
    btn.addEventListener("click", reinitialiser);
});