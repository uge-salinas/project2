
var mapDOM = document.getElementById("map");
const tomellosoCoordinates = {
  lat: 39.156907,
  lng: -3.038381
};

var theMap = new google.maps.Map(mapDOM, {
  zoom: 15,
  center: tomellosoCoordinates,
  mapTypeId: "satellite"
});
var markers = [];
var myTerritory = []; //inicializar lista a cero, para borrar coordenadas
var myTerritoryPolygon;

function drawPolygon(coordenadas, map, currentPolygon) {
  if (currentPolygon) {
    deletePolygon(currentPolygon);
  }

  const newPolygon = new google.maps.Polygon({
    paths: coordenadas,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFcc00",
    fillOpacity: 0.35
  });
  newPolygon.setMap(map);
  return newPolygon;
}
drawPolygon(coordenadas, theMap, myTerritoryPolygon);

// function extractCoords(markers) {
//   return markers.map(marker => marker.getPosition().toJSON());
// }

// function calculateArea() {
//   let totalArea = 0;
//   if (markers.length > 2) {
//     totalArea = google.maps.geometry.spherical.computeArea(myTerritoryPolygon.getPath())
//     totalArea = (totalArea / 10000).toFixed(2);
//     document.querySelector("#dimensiones").value = totalArea + " hectáreas";
//     document.querySelector("#coordenadas").value = extractCoords(markers);
//   }
//   let prueba = extractCoords(markers);
//   console.log(prueba);
//   return totalArea;
// }

