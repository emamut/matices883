$(function () {
  $.scrollify({
    section: 'section',
    scrollbars: false,
    standardScrollElements: 'iframe',
    before: function (e) {
      // if(e == 2) {
      //   this.find('video').play()
      // }
    }
  });

  var map = L.map('map').setView([51.505, -0.09], 15);
  L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

  $.when(
    $.getJSON('js/map.geojson', function (data) {
      mapData = data
    })
  ).then(function () {
    var geoJSONLayer = L.geoJSON(mapData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h5>' + feature.properties.name + ': <small>' + feature.properties.site + '</small></h5>');
        layer.on('mouseover', function (e) {
          this.openPopup();
        });
        layer.on('mouseout', function (e) {
          this.closePopup();
        });
      }
    }).addTo(map);

    map.fitBounds(geoJSONLayer.getBounds());
  })
})