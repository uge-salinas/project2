var mapDOM = document.getElementById("map");

let center = tomellosoCoordinates;

if (plotsInfo.length == 1) {
  center = computeCenter(plotsInfo[0].coordenadas);
}

var theMap = new google.maps.Map(mapDOM, {
  zoom: 15,
  center,
  mapTypeId: "satellite"
});

var infoWindow = new google.maps.InfoWindow();

plotsInfo.map(({ coordenadas, venta, tipo, precio, dimensiones }) => {
  var contentString = `<div class="card text-white mb-3" style="max-width: 18rem;  background-color: ${
    venta === "venta" ? "#2255CC" : "#22CC55"
  }";">
      <div class="card-header">${dimensiones}</div>
      <div class="card-body">
        <h5 class="card-title">Estado: ${venta} </h5>
        <p class="card-text">Parcela de ${tipo}<br>Precio: ${precio} </p>
      </div>
    </div>`;
  drawPolygon({
    coordsList: coordenadas,
    map: theMap,
    fillColor: venta === "venta" ? "#2255CC" : "#22CC55",
    onClick: () => {
      infoWindow.setPosition(computeCenter(coordenadas));
      infoWindow.setContent(contentString);
      infoWindow.open(theMap);
    }
  });
});
