// VARIABLE
let tiret = [];
let lettreS = [];
let reponse = "";
let jeuEtat = true;
let menuvisible = false;
let aleatoire = false;
let nbpendu = 0;
let maxEssais = 11;

// Balise P -> ZONE DE TEXTE
let zoneInfo = document.getElementById("ma-zone-info");
let zoneTexte = document.getElementById("ma-zone-pendu");
let zoneLettreFausse = document.getElementById("lettre-fausse");
let zoneBravo = document.getElementById("ma-zone-bravo");
let zoneNbfaux = document.querySelector(".nbfaux");

// BOUTON ET INPUT ET LISTE
let boutonOkstart = document.querySelector(".checkstart");
let boutonOk = document.querySelector(".check");
let input = document.getElementById("name");
let theme = document.getElementById("div-theme");
let boutonReset = document.querySelector(".reset");
let topicWord = document.querySelector("#topic-select");
let confettis = document.querySelector('#confetti-canvas');

// --- fonctions d'initialisation et démarrage ---

function typePartie() {
    aleatoire = confirm("Est-ce que vous voulez un mot aléatoire ? Si non, faites annuler.");
    if (aleatoire) {
        theme.style.display = "block";
        menuvisible = true;
        // on attend que l'utilisateur clique sur boutonOkstart
    } else {
        // saisie du mot par l'utilisateur
        let utilisateur = prompt("Écrivez le mot de la partie.").toUpperCase();
        if (/[^A-Z-]/.test(utilisateur) || utilisateur === "") {
            alert("Erreur : n'utilisez que des lettres ou des tirets !");
            utilisateur = "";
        }
        reponse = utilisateur;
        if (reponse !== "") {
            initGame();
        }
    }
}

function choisirTheme() {
    if (!aleatoire) {
        return; // si jamais… rien à faire
    }
    let choixTheme = topicWord.value;
    zoneInfo.textContent = `Thème choisi : ${choixTheme}`;
    console.log("Thème choisi :", choixTheme);
    if (choixTheme === "") {
        alert("Veuillez sélectionner un thème pour jouer.");
        return;
    }
    let indexRamdom = Math.floor(Math.random() * mots[choixTheme].length);
    reponse = mots[choixTheme][indexRamdom];
    theme.style.display = "none";   // masque le sélecteur après validation
    initGame();
    console.log("Thème choisi :", choixTheme);

}

function initGame() {
    tiret = [];
    lettreS = [];
    for (let i = 0; i < reponse.length; i++) {
        tiret.push("_");
    }
    zoneTexte.textContent = tiret.join(" ");
    zoneLettreFausse.textContent = lettreS.join(" ");
    input.value = "";
}

// …le reste des fonctions (reset, win, verifierLettre) reste inchangé…
function reset() {
    tiret = [];
    reponse = [];
    lettreS = [];
    menuvisible = false;
    theme.style.display = "none";
    zoneBravo.style.display = "none";
    jeuEtat = true;
    zoneTexte.textContent = tiret.join(" ");
    zoneLettreFausse.textContent = lettreS.join(" ");
    input.value = "";
}

function win() {
    if (!tiret.includes("_")) { // S'il n'y a plus de "_" alors c'est gagné
        var end = Date.now() + (15 * 1000);

        // go Buckeyes!
        let endconfettis = Date.now() + (9 * 200); // durée confettis
        let colorsconfettis = ['#ffa200', '#031927', '#c5482c'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 250,
                origin: { y: 0 },
                colors: colorsconfettis,
                zIndex: 999
            });
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 250,
                    origin: { y: 1 },
                    colors: colorsconfettis
                });
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 250,
                    origin: { x: 0 },
                    colors: colorsconfettis
                });
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 250,
                    origin: { x: 1 },
                    colors: colorsconfettis
                });

                if (Date.now() < endconfettis) {
                    requestAnimationFrame(frame);
                }
            }());

        zoneBravo.style.display = "block";
        zoneBravo.textContent = `Bravo vous avez trouvé le mot !!`;
        jeuEtat = false;

        // reset after confetti has run
        setTimeout(reset, 2500);
    }
    input.value = ""; // vide le champ après validation
}

function verifierLettre() {
    if (jeuEtat == false) {
        return;
    }
    let essais = input.value.trim().toUpperCase();  // récupère la lettre tapée

    if (essais === "") {
        input.value = "";
        return;
    }

    // n'accepte que lettre A-Z ou espace
    if (!/^[A-Z ]$/.test(essais)) {
        alert("Entrez uniquement une lettre ou un espace.");
        input.value = "";
        return;
    }

    if (tiret.includes(essais) || lettreS.includes(essais)) { // vérifi si essaie est dans tiret ou lettreS
        input.value = ""; // vider la zone de remplissage
        return;
    }

    let trouve = false;
    for (let i = 0; i < reponse.length; i++) {
        if (reponse[i] == essais) { // vérifi si essais est dans la réponse 
            for (let j = 0; j < reponse.length; j++) { //et s'il y est plusisuer fois il les affiches tous
                if (reponse[j] == essais) {
                    tiret[j] = essais;
                }
            }
            zoneTexte.textContent = tiret.join(" ");
            trouve = true;
        }
    }

    if (lettreS.includes(essais) == false && trouve == false) { // vérifi si la lettre n'est pas déjà dans lettreS et que trouve est false
        nbpendu++
        document.querySelector(".image").src = "image/etape" + nbpendu + ".png";
        console.log(reponse);
        if (nbpendu >= maxEssais) {
            zoneBravo.textContent = `Dommage, vous avez perdu ! Le mot était : ${reponse}`;
            reset();
            return;
        }
        lettreS.push(essais);
        zoneLettreFausse.textContent = lettreS.join(" ");
        zoneNbfaux.textContent = lettreS.length + " / 11 lettres fausses";
        console.log(nbpendu);
        
    }

win()

input.value = ""; // vide le champ après validation
}
console.log("Réponse : ", reponse);
// ADDEVENTLISTENER
window.addEventListener("DOMContentLoaded", typePartie);
boutonOkstart.addEventListener("click", choisirTheme);
boutonOk.addEventListener("click", verifierLettre);
boutonReset.addEventListener("click", reset);