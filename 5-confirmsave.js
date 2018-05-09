//Appel Timer
var timer = new Timer(20 * 60);

//confirmation
var ValidAndSave = {
    //elements du dom
    boutonValid: document.getElementById("valider"),
    divConfirm: document.getElementById("confirm"),
    footer: document.querySelector("footer"),
    infosResa: document.getElementById("infosResa"),
    recapNomStation: document.getElementById("recapNomStation"),
    recapAdresse: document.getElementById("recapAdresseStation"),
    recapNomClient: document.getElementById("recapNomClient"),
    
    //action à l'appui du bouton "valider"
    
    validation: function() {
        divStation.style.display = "none";
        $("#signature").fadeOut(500);        
        divSignature.style.display = "none";
        $("#titre_resa").fadeOut(1000);
        titreDiv.style.display = "none";
        //apparition du message de confirmation
        $("#confirm").fadeIn(1000);
        ValidAndSave.divConfirm.style.display = "block";
        //disparition message et apparition compteur + infos au bout de 2sec
        setTimeout(function() {
            ValidAndSave.divConfirm.style.display = "none";
            MapVelib.affichageDebut();
        }, 3000);    
        
        ValidAndSave.saveConfirmation();
        ValidAndSave.recapResa();
        
        //décompte
        timer.restart0();
    },

        //web storage
    saveConfirmation: function() {
        //formulaire
        var nomElt = document.getElementById("nom");
        var prenomElt = document.getElementById("prenom");
        //valeurs du formulaire
        var valeurNom = nomElt.value;
        var valeurPrenom = prenomElt.value;
        
        sessionStorage.setItem("Nom", valeurNom);
        sessionStorage.setItem("Prenom", valeurPrenom);
        sessionStorage.setItem("signature", Sign.saveData);
    },

    recapResa: function() {
        $("#infosResa").fadeIn(1000);
        ValidAndSave.infosResa.style.display = "block";
        ValidAndSave.recapNomStation.textContent = sessionStorage.getItem("Station");
        ValidAndSave.recapAdresse.textContent = sessionStorage.getItem("Adresse") + ", " + sessionStorage.getItem("Commune");
        ValidAndSave.recapNomClient.textContent = sessionStorage.getItem("Prenom") + " " + sessionStorage.getItem("Nom") + ",";
    },

    refresh: function() {
        if (sessionStorage.length > 2) {
            window.onload = function() {
                ValidAndSave.recapResa();
                var minutes = Number(sessionStorage.getItem("Minutes"));
                var secondes = Number(sessionStorage.getItem("Secondes"));
                timer.restartFrom(minutes, secondes);
            }
        } else {
            ValidAndSave.infosResa.style.display = "none";
        }
    }
}

ValidAndSave.refresh();
var submit = ValidAndSave.boutonValid;
submit.addEventListener("click", ValidAndSave.validation);