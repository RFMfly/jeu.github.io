// VARIABLE
let tiret = [];
let lettreS = [];
let reponse = "";
let jeuEtat = true;

//Balise P -> ZONE DE TEXTE
let zoneTexte = document.getElementById("ma-zone-pendu"); //sert a établir la zone du texte
let zoneLettreFausse = document.getElementById("lettre-fausse"); //sert a établir la zone du texte

//BOUTON ET INPUT
let boutonOk = document.querySelector(".check");
let input = document.getElementById("name");
let boutonReset = document.querySelector(".reset");
let boutonStart = document.querySelector(".start");


//FUNCTION
function start() {
    reponse = prompt("Ecrivez le mot de la partie.").toUpperCase();// prompt pour faire une saisie et toUpperCase pour mettre en majuscule
    for (let i = 0; i < reponse.length; i++) {
        tiret.push("_");
    };
    zoneTexte.textContent = tiret.join(" "); // Pour afficher les tirets
    zoneLettreFausse.textContent = lettreS.join(" ");
    input.value = "";
}
function win() {
    if (!tiret.includes("_")) { // S'il n'y a plus de "_" alors c'est gagné
        alert(`Bravo vous avez touver le mot ${reponse} !!`)
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
        win()

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
    input.value = ""; // vide le champ après validation
};


function reset() { //Reset le jeu
    tiret = []
    reponse = []
    lettreS = []
    jeuEtat = true
    zoneTexte.textContent = tiret.join(" "); // Pour afficher les tirets
    zoneLettreFausse.textContent = lettreS.join(" ");
    input.value = "";

};


//ADDEVENTLISTENER
boutonStart.addEventListener("click", start);
boutonOk.addEventListener("click", verifierLettre);
boutonReset.addEventListener("click", reset);