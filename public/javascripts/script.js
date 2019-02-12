document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);
// ----------------------CAPTURE MAP AREA------------------------------
// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

var mapDOM = document.getElementById("map");
const tomellosoCoordinates = {
  lat: 39.156907,
  lng: -3.038381
};

var theMap = new google.maps.Map(mapDOM, {
  zoom: 16,
  center: tomellosoCoordinates,
  mapTypeId: "satellite"
});
var markers = [];
var myTerritory = []; //inicializar lista a cero, para borrar coordenadas
var myTerritoryPolygon;

// Josevi begin
function resetPolygon(polygon) {
  polygon.setMap(null);
}

function drawPolygon(markersList, currentPolygon) {
  if (currentPolygon) {
    resetPolygon(currentPolygon);
  }

  const newPolygon = new google.maps.Polygon({
    paths: markersList,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFcc00",
    fillOpacity: 0.35
  });
  return newPolygon;
}

// function onMarkerDragEnd(event) {

// }
// Josevi end

theMap.addListener("click", function(e) {
  let coords = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng()
  };
  let marker = new google.maps.Marker({
    map: theMap,
    position: coords,
    animation: google.maps.Animation.DROP,
    draggable: true
  });

  marker.addListener("dragend", function(event) {
    console.log(markers.map(marker => marker.getPosition().toJSON()));
  });

  myTerritory.push(coords);
  markers.push(marker);

  if (myTerritory.length > 2) {
    //reinicia el ultimo poligono dibujado
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
    myTerritory = [];
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };
});
