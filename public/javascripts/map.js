const tomellosoCoordinates = {
  lat: 39.156907,
  lng: -3.038381
};

const deleteMarker = marker => marker.setMap(null);
const deletePolygon = polygon => polygon.setMap(null);

function drawPolygon({
  coordsList,
  map,
  currentPolygon,
  fillColor = "#FFcc00",
  strokeColor = "#FF0000",
  onClick
}) {
  if (currentPolygon) {
    deletePolygon(currentPolygon);
  }

  const newPolygon = new google.maps.Polygon({
    paths: coordsList,
    strokeColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor,
    fillOpacity: 0.35
  });
  newPolygon.setMap(map);
  newPolygon.addListener('click', onClick);
  return newPolygon;
}

function onMarkerDragEnd() {
  const markerCoords = extractCoords(markers);
  myTerritoryPolygon = drawPolygon({ coordsList: markerCoords, map: theMap, currentPolygon: myTerritoryPolygon });
  calculateArea();
}

function extractCoords(markers) {
  return markers.map(marker => marker.getPosition().toJSON());
}

function calculateArea() {
  let totalArea = 0;
  if (markers.length > 2) {
    totalArea = google.maps.geometry.spherical.computeArea(
      myTerritoryPolygon.getPath()
    );
    totalArea = (totalArea / 10000).toFixed(2);
    document.querySelector("#dimensiones").value = totalArea + " hectáreas";
    document.querySelector("#coordenadas").value = JSON.stringify(
      extractCoords(markers)
    );
  }
  let prueba = extractCoords(markers);
  console.log(prueba);
  return totalArea;
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
