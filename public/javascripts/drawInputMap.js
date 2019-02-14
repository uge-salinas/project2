document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

var mapDOM = document.getElementById("map");

var theMap = new google.maps.Map(mapDOM, {
  zoom: 16,
  center: tomellosoCoordinates,
  mapTypeId: "satellite"
});
var markers = [];
var myTerritory = []; //inicializar lista a cero, para borrar coordenadas
var myTerritoryPolygon;

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
  myTerritoryPolygon = drawPolygon({ coordsList: markerCoords, map: theMap, currentPolygon: myTerritoryPolygon} );

  calculateArea();
});

document.getElementById("clear-button").onclick = function() {
  deletePolygon(myTerritoryPolygon);
  markers.map(deleteMarker);
  markers = [];
};
