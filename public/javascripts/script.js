document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);
// ----------------------CAPTURE MAP AREA------------------------------
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var mapDOM = document.getElementById("map");
let coordinates = {
  lat: 41.3977381,
  lng: 2.190471916
};

var theMap = new google.maps.Map(mapDOM, {
  zoom: 20,
  center: coordinates
});
var markers = [];
var myTerritory = []; //inicializar lista a cero, para borrar coordenadas
var myTerritoryPolygon;

theMap.addListener("click", function(e) {
  let coords = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng()
  };
  // console.log(coords);
  let marker = new google.maps.Marker({
    map: theMap,
    position: coords
  });

  myTerritory.push(coords);
  markers.push(marker);

  if (myTerritory.length > 2) {
    myTerritoryPolygon.setMap(null);
  }

  myTerritoryPolygon = new google.maps.Polygon({
    paths: myTerritory,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFcc00",
    fillOpacity: 0.35
  });

  myTerritoryPolygon.setMap(theMap);

  if (myTerritory.length > 1) {
    console.log(
      google.maps.geometry.spherical.computeArea(myTerritoryPolygon.getPath())
    );
  }
  document.getElementById("clear-button").onclick = function() {
    myTerritoryPolygon.setMap(null);
    myTerritory = null;

    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    // theMap = new google.maps.Map(mapDOM, {
    //   zoom: 20,
    //   center: myTerritory[myTerritory.length - 1]
    // });
    myTerritory = [];
  };
});
