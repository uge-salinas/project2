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

const deleteMarker = marker => marker.setMap(null);
const deletePolygon = polygon => polygon.setMap(null);

function drawPolygon(coordsList, map, currentPolygon) {
  if (currentPolygon) {
    deletePolygon(currentPolygon);
  }

  const newPolygon = new google.maps.Polygon({
    paths: coordsList,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFcc00",
    fillOpacity: 0.35
  });
  newPolygon.setMap(map);
  return newPolygon;
}

function onMarkerDragEnd() {
  const markerCoords = extractCoords(markers);
  myTerritoryPolygon = drawPolygon(markerCoords, theMap, myTerritoryPolygon);
}

function extractCoords(markers) {
  return markers.map(marker => marker.getPosition().toJSON());
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

theMap.addListener("click", function(e) {
  const coords = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng()
  };

  const marker = new google.maps.Marker({
    map: theMap,
    position: coords,
    // animation: google.maps.Animation.DROP,
    draggable: true
  });

  marker.addListener("dragend", onMarkerDragEnd);
  // marker.addListener("click", () => toggleBounce(marker));
  markers.push(marker);

  const markerCoords = extractCoords(markers);
  myTerritoryPolygon = drawPolygon(markerCoords, theMap, myTerritoryPolygon);

  if (markers.length > 1) {
    console.log(
      google.maps.geometry.spherical.computeArea(myTerritoryPolygon.getPath())
    );
  }
});

document.getElementById("clear-button").onclick = function() {
  deletePolygon(myTerritoryPolygon);
  markers.map(deleteMarker);
  markers = [];
};
