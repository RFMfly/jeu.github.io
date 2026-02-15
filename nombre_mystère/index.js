// VARIABLE
let reponse = Math.floor(Math.random() * 100 + 1);//commence à 1 et finit à 100

let colorsconfettis = ['#053C5E', '#ffffff'];


//Balise P -> ZONE DE TEXTE
let zoneIndication = document.getElementById("ma-zone-indication"); //sert à établir la zone du texte
let zoneBravo = document.getElementById("ma-zone-bravo");
//BOUTON ET INPUT ET LISTE
let boutonOk = document.querySelector(".check");
let input = document.getElementById("name");
let boutonReset = document.querySelector(".reset");
let confettis = document.querySelector('#confetti-canvas');


input.value = "";





//FUNCTION

console.log(reponse)
function verifierChiffre() {
    zoneIndication.textContent = ""
    zoneBravo.textContent = ""
    let essais = Number(input.value); // récupère le chiffre tapée
    console.log(essais);
    if (!Number.isNaN(Number.parseInt(essais)) == false) { //on vérifie si c'est un chiffre
        alert("Erreur : n'utilisez que des chiffres !");
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
            zoneIndication.textContent = "C'est moins !"
            input.value = "";
        }
        if (essais < reponse) {
            zoneIndication.textContent = "C'est plus !" // la valeur entré < que reponse
            input.value = "";
        }
    }


    input.value = ""; // vide le champ après validation
};


function reset() { //Reset le jeu a faire après 
    reponse = Math.floor(Math.random() * 100 + 1);
    zoneIndication.style.display = "block";
        zoneBravo.style.display = "none";
    zoneBravo.textContent = ""
    zoneIndication.textContent = "Un nouveaux nombre a été choisit.";
    input.value = "";
    console.log(reponse)
};


//ADDEVENTLISTENER
boutonOk.addEventListener("click", verifierChiffre);
boutonReset.addEventListener("click", reset);