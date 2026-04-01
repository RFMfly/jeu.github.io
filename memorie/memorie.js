const foodTheme = ['🍎', '🍌', '🍇', '🥦', '🍕', '🍦', '🍩', '🥑', '🍔', '🍓'];
const animalsTheme = ['🦁', '🐸', '🦒', '🐧', '🐙', '🦋', '🦉', '🐘', '🐷', '🐝'];
const adventureTheme = ['🚀', '🚲', '🚁', '⛵', '🚜', '🛸', '🚂', '🚒', '🛹', '🎈'];
const objectsTheme = ['🎁', '🕶️', '🎸', '☂️', '🔑', '🎨', '⚽', '⏰', '💡', '🌵'];

let premiereCarte = null;
let deuxiemeCarte = null;
let stopclick = false;


let zoneJeu = document.querySelector(".jeu");
function preparation() {
    const deck = [...foodTheme, ...foodTheme]
    deck.sort(() => Math.random() - 0.5);
    generate(deck)
}
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

