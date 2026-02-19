// VARIABLE
let reponse = Math.floor(Math.random() * 100 + 1);//commence à 1 et finit à 100
let historique = []



//Balise P -> ZONE DE TEXTE
let zoneIndication = document.getElementById("ma-zone-indication"); //sert à établir la zone du texte
let zoneBravo = document.getElementById("ma-zone-bravo");
let zoneHistorique = document.getElementById("ma-zone-historique");

//BOUTON ET INPUT ET LISTE
let boutonOk = document.querySelector(".check");
let input = document.getElementById("name");
let boutonReset = document.querySelector(".reset");
let confettis = document.querySelector('#confetti-canvas');


input.value = "";





//FUNCTION
console.log(reponse)

let essais = 0;

function verifierChiffre() {
    zoneIndication.textContent = ""
    zoneBravo.textContent = ""
    essais = Number(input.value)
    // récupère le chiffre tapée
    console.log(essais);
    if (!Number.isNaN(Number.parseInt(essais)) == false || essais == historique) { //on vérifie si c'est un chiffre
        alert("Erreur : n'utilisez que des chiffres et des nouveaux chiffres !");
        essais = ""; // On vide la réponse car elle est invalide
        input.value = "";
        return;
    }
    if (essais == 0) {
        alert("Merci de compléter le champs, ça ne peut pas être 0.")
        input.value = "";
    }
    if (essais == reponse) { //Gagner
        let endconfettis = Date.now() + (9 * 300); //durée confettis
        let colorsconfettis = ['#053C5E', '#ffffff'];

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
        zoneIndication.style.display = "none";
        zoneBravo.style.display = "block";
        zoneBravo.textContent = "Bravo vous avez trouvez le chiffre !"
        input.value = "";

    }
    else {
        if (essais > reponse) { // la valeur entré > que reponse
            addhistorique()
            zoneIndication.textContent = "C'est moins !"
            input.value = "";
        }
        if (essais < reponse) {
            addhistorique()
            zoneIndication.textContent = "C'est plus !" // la valeur entré < que reponse
            input.value = "";
        }
    }


    input.value = ""; // vide le champ après validation
};

function addhistorique() {
    historique.push(essais)
    historique.sort((a, b) => a - b);
    zoneHistorique.innerHTML = "";
    historique.forEach((nombre, index) => {

        let monSpan = document.createElement("span"); // Création du span
        monSpan.textContent = nombre;

        if (Math.abs(nombre - reponse) <= 20) {// Vérification de la proximité (reponse - 5 <= nombre <= reponse + 5)
            monSpan.style.color = "#ffc400";
        }
        if (Math.abs(nombre - reponse) <= 10) {// Vérification de la proximité (reponse - 5 <= nombre <= reponse + 5)
            monSpan.style.color = "#fc7b02";
        }
        if (Math.abs(nombre - reponse) <= 5) {// Vérification de la proximité (reponse - 5 <= nombre <= reponse + 5)
            monSpan.style.color = "#ff2424";
        }
        zoneHistorique.appendChild(monSpan);// Ajout au HTML

        if (index < historique.length - 1) {
            let tiret = document.createTextNode(" - ");
            zoneHistorique.appendChild(tiret);
        }
    });


    console.log(historique)
}

function reset() { //Reset le jeu a faire après 
    reponse = Math.floor(Math.random() * 100 + 1);
    zoneHistorique.innerHTML = "";
    historique = [];
    zoneIndication.style.display = "block";
    zoneBravo.style.display = "none";
    zoneBravo.textContent = "";
    
    zoneIndication.textContent = "Un nouveaux nombre a été choisit.";
    input.value = "";
    console.log(reponse)
};


//ADDEVENTLISTENER
boutonOk.addEventListener("click", verifierChiffre);
boutonReset.addEventListener("click", reset);