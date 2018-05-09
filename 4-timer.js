function Timer(duree) {
    var self = this; //crée la variable qui contient l'objet pour que le this corresponde à l'objet
    var _duree = duree; //stocke la durée du timer
    var elementMin = document.getElementById("minutes");
    var elementSec = document.getElementById("seconds");
    var timer = _duree; //variable à décrémenter
    var intervalID;
    
    self.onComplete = null;

    self.updateDisplay = function() {
        elementMin.textContent = Math.floor(timer / 60); //renvoie plus grand entier inférieur ou égal
        elementSec.textContent = timer % 60; //divise par 60 et le reste donne les sec
    };

    self.update = function() {
        timer--; //défile à rebours
        self.updateDisplay(); //affiche les valeurs des opérations
        var min = elementMin.textContent;
        var sec = elementSec.textContent;

        //arrête le compteur + info utilisateur, efface la reservation
        if(timer === 0) {
            clearInterval(intervalID);
            document.getElementById("decompte").textContent = "Votre réservation a expiré, veuillez renouveler l'opération.";
            sessionStorage.clear(); // vide le stockage de données au bout de 20 minutes
        }
        
        //affiche un 0 devant les secondes de 0 à 9
        if ((sec >= 0) && (sec < 10))  {
            elementSec.textContent = "0" + timer % 60;
        }
        
        //affiche le minuteur en rouge sous 5 minutes
        if (min < 5) {
            var timerElt = document.getElementById("timer");
            timerElt.style.color = "#ff0000";
        }

        sessionStorage.setItem("Minutes", min);
        sessionStorage.setItem("Secondes", sec);
    };

    //démarre le compteur avec un intervalle de 1sec
    self.start = function() {
        intervalID = setInterval(function() {
            self.update();
        }, 1000);
    };

    //arrête le compteur
    self.stop = function() {
        clearInterval(intervalID);
    };

    self.restartFrom = function(minutes, secondes) {
        timer = minutes * 60 + secondes; //remet le timer où il était
        self.updateDisplay();
        self.start();
    };

    //arrête, met à jour et redémarre le compteur
    self.restart0 = function() {
        timer = _duree; //remet le timer au début
        self.stop();
        self.updateDisplay();
        self.start();
    };

    self.updateDisplay();
}


