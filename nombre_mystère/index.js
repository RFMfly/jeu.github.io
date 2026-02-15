// VARIABLE
let reponse = Math.floor(Math.random() * 101);//commence à 0 et finit à 100



//Balise P -> ZONE DE TEXTE
let zoneIndication = document.getElementById("ma-zone-indication"); //sert à établir la zone du texte

//BOUTON ET INPUT ET LISTE
let boutonOk = document.querySelector(".check");
let input = document.getElementById("name");
let boutonReset = document.querySelector(".reset");


//FUNCTION

console.log(reponse)
function verifierChiffre() {
    zoneIndication.textContent  = ""
    let essais = Number(input.value); // récupère le chiffre tapée
    console.log(essais) ;
    if (!Number.isNaN(Number.parseInt(essais))==false) { //on vérifie si c'est un chiffre
        alert("Erreur : n'utilisez que des chiffres !");
        essais = ""; // On vide la réponse car elle est invalide
        input.value = ""; 
        return;
    }
    if (essais=undefined){
        alert("Merci de compléter le champs.")
    }
    if (essais == reponse) { //Gagner
        alert("Bravo vous avez trouvez le chiffre !")
    }
    else {
        if (essais > reponse) { // la valeur entré > que reponse
            zoneIndication.textContent  = "C'est moins !"
            input.value = "";
        }
        else {
            zoneIndication.textContent  = "C'est plus !" // la valeur entré < que reponse
            input.value = "";
        }
    }


input.value = ""; // vide le champ après validation
};


/*function reset() { //Reset le jeu a faire après 
    reponse = []
    zoneTexte.textContent = ""; // Pour afficher les tirets
    input.value = "";

};*/


//ADDEVENTLISTENER
boutonOk.addEventListener("click", verifierChiffre);
//boutonReset.addEventListener("click", reset);