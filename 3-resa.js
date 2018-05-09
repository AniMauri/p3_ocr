//Affichage zone de signature 
var divStation = document.getElementById("station");
var titreDiv = document.getElementById("titre_resa");
var divSignature = document.getElementById("signature");
var boutonResa = document.getElementById("bouton_resa");

boutonResa.addEventListener("click", function() {
    $("#station").fadeOut(500);
    divStation.style.display = "none";
    $("#signature").fadeIn(500);    
    divSignature.style.display = "block";
    titreDiv.textContent = "Réservation";
});

//Zone de Signature

var Sign = {
    
    //signature
    canvas: document.getElementById("canvas"),
    context: this.canvas.getContext("2d"),
    
    //dernière position non définie pour l'instant
    lastPos: null,
    
    position: function(pos) {
        var rect = Sign.canvas.getBoundingClientRect(); //va chercher la position relative et la taille de l'élément par rapport à sa zone d'affichage
        pos.x = (pos.x - rect.left) / (rect.right - rect.left) * Sign.canvas.width; //récupère la position exacte de la souris en X
        pos.y = (pos.y - rect.top) / (rect.bottom - rect.top) * Sign.canvas.height; //idem en Y
        return pos;
    },
    
    positionSouris: function(e) {
        return Sign.position({
            x: e.clientX,
            y: e.clientY
        }); //récupère la position du clic dans le navigateur
    },
    
    positionToucher: function(e) {
        return Sign.position({
            x: e.touches[0].clientX, 
            y: e.touches[0].clientY
        }); //récupère la position du premier toucher dans le navigateur
    },
    
    dessiner: function(pos1, pos2) {
        Sign.context.moveTo(pos1.x, pos1.y); //point de départ
        Sign.context.lineTo(pos2.x, pos2.y); //point d'arrivée
        Sign.context.stroke();
    },
    
    start: function(pos) {
        Sign.lastPos = pos; //prend la dernière pos connue
    },
    
    stop: function(pos) {
        if(Sign.lastPos) { //si lastpos n'est pas null, on dessine et on arrête pour finir le dessin
            Sign.dessiner(Sign.lastPos, pos);
            Sign.lastPos = null; //on a fini de dessiner, évite de lier le dernier tracé à un nouveau tracé
        }
    },
    
    move: function(pos) {
        if(Sign.lastPos) {
            var newPos = pos;
            Sign.dessiner(Sign.lastPos, newPos);
            Sign.lastPos = newPos; //relie la dernière pos avec la nouvelle pour signifier le mouvement
        }
    },
    
    clear: function() {
        Sign.canvas.width = Sign.canvas.width;
    }, 
    
    saveData: this.canvas.toDataURL(),
};

Sign.context.strokeStyle = "#000000";
Sign.context.lineWidth = 1.5;
Sign.context.lineCap = "round";

//action à la souris


//effacer canvas
var boutonClear = document.getElementById("clear");
boutonClear.addEventListener("click", Sign.clear);


// Mouse events
Sign.canvas.addEventListener("mousedown", function(e) {
    if(e.buttons === 1) Sign.start(Sign.positionSouris(e));
});
Sign.canvas.addEventListener("mouseup", function(e) { 
    Sign.stop(Sign.positionSouris(e));
});
Sign.canvas.addEventListener("mousemove", function(e) { 
    Sign.move(Sign.positionSouris(e));
});
Sign.canvas.addEventListener("mouseleave", function(e) { 
    Sign.stop(Sign.positionSouris(e));
});
Sign.canvas.addEventListener("mouseenter", function(e) {
    if(e.buttons === 1) Sign.start(Sign.positionSouris(e));
});

// Touchs events
Sign.canvas.addEventListener("touchstart", function(e) { 
    e.preventDefault(); 
    if(e.touches.length > 0) Sign.start(Sign.positionToucher(e)); 
});
Sign.canvas.addEventListener("touchend", function(e) { 
    e.preventDefault(); 
    if(e.touches.length > 0) Sign.stop(Sign.positionToucher(e)); 
});
Sign.canvas.addEventListener("touchmove", function(e) { 
    e.preventDefault(); 
    if(e.touches.length > 0) Sign.move(Sign.positionToucher(e)); 
});
