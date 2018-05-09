//Map

var MapVelib = {
    divMap: document.getElementById("map"),
    
    divResa: document.getElementById("resa"),
        
    affichageDebut: function() {
        MapVelib.divMap.style.width = "100%";
        MapVelib.divResa.style.display = "none";
    },
    
    afficherResa: function() {
        $("#resa").fadeIn(1000);
        MapVelib.divResa.style.display = "block";     
    },
    
    infosVelibMap: function (reponse, map) {     
        var datas = JSON.parse(reponse);
        var markers = [];    
        for (var i = 0; i < datas.features.length; i++) { 
            var coords = datas.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var name = datas.features[i].properties.name;
            var adresseStation = datas.features[i].properties.address;
            var communeStation = datas.features[i].properties.commune;
            var nbPlaces = datas.features[i].properties.bike_stands;
            var nbDispo = datas.features[i].properties.available_bikes;
            var statut = datas.features[i].properties.status;
            var icone = function() {
                var image1 = {
                    url: '../img/markers/green-dot.png',
                    size: new google.maps.Size(41, 54),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(0, 20)
                };
                var image2 = {
                    url: '../img/markers/red-dot.png',
                    size: new google.maps.Size(41, 54),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(0, 20)
                };   
                //changement icone selon statut de la station
                if ((nbDispo > 0) && (statut === "OPEN")) 
                        {
                        return image1;
                    } else {
                        return image2;
                        };
                };
            
            var marker = new google.maps.Marker({
                position: latLng,
                adresse: adresseStation,
                commune: communeStation,
                places: nbPlaces,
                dispo: nbDispo,
                map: map,
                icon: icone(),
                name: name
            });
            
            marker.addListener('click', function() {
                MapVelib.afficherResa();
                var divAdresse = document.getElementById("adresse");
                var divPlaces = document.getElementById("places");
                var divDispo = document.getElementById("dispo");
                var divStatut = document.getElementById("statut");
                
                divAdresse.textContent = this.adresse + ", " + this.commune;
                divPlaces.textContent = this.places + " places.";
                divDispo.textContent = this.dispo + " vélos disponibles.";
                
                //En cas de retour depuis la case signature
                var divSignature = document.getElementById("signature");
                var divStation = document.getElementById("station");
                var titreDiv = document.getElementById("titre_resa");
                if (divStation.style.display === "none") {
                    divSignature.style.display = "none";
                    divStation.style.display = "block"; 
                    titreDiv.textContent = "Détails de la station";                    
                }
                
                //web storage
                var dispo = Number(this.dispo);
                var dispoRestante = dispo - 1;
                var nomStation = this.name;
                var adresseStation = this.adresse;
                var communeStation = this.commune;
                function storageStation() {
                    sessionStorage.setItem("Station", nomStation);
                    sessionStorage.setItem("Adresse", adresseStation);
                    sessionStorage.setItem("Commune", communeStation);
                    sessionStorage.setItem("Vélib restants", dispoRestante);
                };
                storageStation();
            });
            
            markers.push(marker);
            };
            
        var markerCluster = new MarkerClusterer(map, markers, {imagePath: '../img/markers/m'});
        }, 
}

//Affichage de la map 

function initMap() {
    var lyon = {lat: 45.764043, lng: 4.835659};
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: lyon
    });

    //affichage des puces de position des stations Vélib
    ajaxGet("https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=1000&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn%3Aogc%3Adef%3Acrs%3AEPSG%3A%3A4171", function(datas) {
        MapVelib.infosVelibMap(datas, map);
    }, true);
};    

MapVelib.affichageDebut();