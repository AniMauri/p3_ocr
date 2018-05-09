//Objet Slider

var diapos = document.querySelectorAll(".slide");

var Slider = { 
    slideActuel: 0,
    
    allerADroite: function () {       
      	diapos[Slider.slideActuel].style.display = "none";       
        Slider.slideActuel++;
        
        if (Slider.slideActuel > diapos.length - 1) {
            Slider.slideActuel = 0;
        };
      	diapos[Slider.slideActuel].style.display = "block";      
    },
    
    allerAGauche: function () {
      	diapos[Slider.slideActuel].style.display = "none";
        Slider.slideActuel--;
        
        if (Slider.slideActuel < 0) {
            Slider.slideActuel = diapos.length - 1;
        };       
      	diapos[Slider.slideActuel].style.display = "block";        
    },
    
    clavier: function(e) {   
        var code = e.keyCode;
        switch(code) {
        case 39: Slider.allerADroite();
        break;
        case 37: Slider.allerAGauche();
        break;
        }
        
        clearInterval(defiler);
    }
}

//Fait défiler le slider toutes les 5 secondes
var defiler = setInterval(Slider.allerADroite, 5000);
defiler;

//Evenements: définition des éléments
var boutonDroitElt = document.getElementById("fleche_droite");
var boutonGaucheElt = document.getElementById("fleche_gauche");

//contrôle au clic
boutonDroitElt.addEventListener("click", function() {
    Slider.allerADroite();
    clearInterval(defiler);
});

boutonGaucheElt.addEventListener("click", function() {
    Slider.allerAGauche();
    clearInterval(defiler);
});

//contrôle clavier
document.addEventListener("keydown", Slider.clavier);

