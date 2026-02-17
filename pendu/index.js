// VARIABLE
let tiret = [];
let lettreS = [];
let reponse = "";
let jeuEtat = true;
let menuvisible = false;
let aleatoire = false;

//Balise P -> ZONE DE TEXTE
let zoneTexte = document.getElementById("ma-zone-pendu"); //sert a établir la zone du texte
let zoneLettreFausse = document.getElementById("lettre-fausse"); //sert a établir la zone du texte
let zoneBravo = document.getElementById("ma-zone-bravo");

//BOUTON ET INPUT ET LISTE
let boutonOk = document.querySelector(".check");
let input = document.getElementById("name");
let theme = document.getElementById("div-theme");
let boutonReset = document.querySelector(".reset");
let boutonStart = document.querySelector(".start");
let topicWord = document.querySelector("#topic-select");
let confettis = document.querySelector('#confetti-canvas');

//FUNCTION
function start() {
    if (menuvisible == false) {
        aleatoire = confirm("Est-ce que vous voulez un mot aléatoire? Si non, faites annuler.")
    }

    if (aleatoire == true) { // SI mot ALEATOIRE
        if (menuvisible == false) {
            theme.style.display = "block";
            menuvisible = true;
            return
        }
        else {
            let choixTheme = topicWord.value;
            if (choixTheme == "") {
                alert("Veuillez sélection un thème pour jouer. ")
                return
            }
            else {

                let indexRamdom = Math.floor(Math.random() * mots[choixTheme].length) //Nombre aléatoire entier compris en 0 et la longeur max des thèmes
                let motramdom = mots[choixTheme][indexRamdom];
                reponse = motramdom;
            }

        }
        console.log(reponse);
    }

    else { // SI CHOIX utilisateur = SON mot
        reponse = prompt("Ecrivez le mot de la partie.").toUpperCase();// prompt pour faire une saisie et toUpperCase pour mettre en majuscule
        if (/[^a-zA-Z-]/.test(reponse)) {
            alert("Erreur : n'utilisez que des lettres ou des tirets !");
            reponse = ""; // On vide la réponse car elle est invalide
        }
    }
    for (let i = 0; i < reponse.length; i++) {
        tiret.push("_");
    };
    zoneTexte.textContent = tiret.join(" "); // Pour afficher les tirets
    zoneLettreFausse.textContent = lettreS.join(" ");
    input.value = "";
}

function reset() { //Reset le jeu
    tiret = []
    reponse = []
    lettreS = []
    menuvisible = false;
    theme.style.display = "none"
    zoneBravo.style.display = "none";
    jeuEtat = true
    zoneTexte.textContent = tiret.join(" "); // Pour afficher les tirets
    zoneLettreFausse.textContent = lettreS.join(" ");
    input.value = "";

};

function win() {
    if (!tiret.includes("_")) { // S'il n'y a plus de "_" alors c'est gagné
        var end = Date.now() + (15 * 1000);

        // go Buckeyes!
        let endconfettis = Date.now() + (9 * 200); //durée confettis
        let colorsconfettis = ['#ffa200', '#ffffff','#c5482c'];
        reset()

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 250,
                origin: { y: 0 },
                colors: colorsconfettis
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
        zoneBravo.textContent = `Bravo vous avez touver le mot !!`
        jeuEtat = false
    }
    input.value = ""; // vide le champ après validation
}
function verifierLettre() {
    if (jeuEtat == false) {

        return
    };
    let essais = input.value;  // récupère la lettre tapée
    essais = essais.toUpperCase()
    let trouve = false;

    for (let i = 0; i < reponse.length; i++) {

        if (tiret.includes(essais) || lettreS.includes(essais)) { // vérifi si essaie est dans tiret ou lettreS
            input.value = ""; //vider la zone de remplissage
            return;
        }
        if (reponse[i] == essais) { // vérifi si essais est dans la réponse 
            for (let j = 0; j < reponse.length; j++) { //et s'il y est plusisuer fois il les affiches tous
                if (reponse[j] == essais) {
                    tiret[j] = essais;
                }
            }
            zoneTexte.textContent = tiret.join(" ");
            trouve = true
        }
    }

    if (lettreS.includes(essais) == false && trouve == false) {
        lettreS.push(essais);
        zoneLettreFausse.textContent = lettreS.join(" ");
    }
    win()

    input.value = ""; // vide le champ après validation
};





//ADDEVENTLISTENER
boutonStart.addEventListener("click", start);
boutonOk.addEventListener("click", verifierLettre);
boutonReset.addEventListener("click", reset);