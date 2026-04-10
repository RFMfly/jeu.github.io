const foodTheme = ['🍎', '🍌', '🍇', '🥦', '🍕', '🍦', '🍩', '🥑', '🍔', '🍓'];
const animalsTheme = ['🦁', '🐸', '🦒', '🐧', '🐙', '🦋', '🦉', '🐘', '🐷', '🐝'];
const adventureTheme = ['🚀', '🚲', '🚁', '⛵', '🚜', '🛸', '🚂', '🚒', '🛹', '🎈'];
const objectsTheme = ['🎁', '🕶️', '🎸', '☂️', '🔑', '🎨', '⚽', '⏰', '💡', '🌵'];
let theme = [foodTheme, adventureTheme, animalsTheme, objectsTheme]

let premiereCarte = null;
let deuxiemeCarte = null;
let stopclick = false;

let zoneJeu = document.querySelector(".jeu");
let btnReinitialiser = document.querySelector(".reinitialiser");
let themeSelect = document.querySelector("#topic-select");
let start = document.querySelector(".checkstart");




function choisirTheme (){
    const indexTheme = Number(themeSelect.value) ;

    if (Number.isNaN(indexTheme) || !theme[indexTheme]) {
        return null;
    }

    return theme[indexTheme];
}



function preparation() {
    const choix = choisirTheme();
    if (!choix) return;

    const deck = [...choix, ...choix]
    deck.sort(() => Math.random() - 0.5);
    generate(deck)
}
start.addEventListener("click", preparation);
function generate(tab) {
    zoneJeu.innerHTML = "";
    tab.forEach(emoji => {
        let card = document.createElement("div");
        card.classList.add("carte");
        card.dataset.emoji = emoji;
        card.innerHTML = `<div class='derriere'>  ???</div> <div class='devant'> ${emoji} </div>`;
        card.addEventListener("click", retourner);
        zoneJeu.appendChild(card)
    })
}
function retourner() {
    // SÉCURITÉ : On ne fait rien si le jeu est bloqué OU si on clique sur une carte déjà retournée
    if (stopclick || this.classList.contains("retournee")) return;

    this.classList.add("retournee");

    if (premiereCarte == null) {
        // C'est le premier clic
        premiereCarte = this;
    } else {
        // C'est le deuxième clic
        deuxiemeCarte = this;
        stopclick = true;
        verifier(); // On lance la comparaison
    }
}

function verifier() {
    if (premiereCarte.dataset.emoji == deuxiemeCarte.dataset.emoji) {
        premiereCarte.classList.add("match");
        deuxiemeCarte.classList.add("match");
        premiereCarte = null;
        deuxiemeCarte = null;
        stopclick = false;
    } else {
        setTimeout(() => {
            premiereCarte.classList.remove("retournee");
            deuxiemeCarte.classList.remove("retournee");
            
            premiereCarte = null;
            deuxiemeCarte = null;
            stopclick = false;
        }, 2000);
    }
}

preparation();

function reinitialiser() {
    premiereCarte = null;
    deuxiemeCarte = null;
    stopclick = false;
    preparation();
}
btnReinitialiser.addEventListener("click", reinitialiser);


