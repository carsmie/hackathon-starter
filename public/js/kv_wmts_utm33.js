const sProjection = 'EPSG:32633';
const extent = {
  'EPSG:3857': [20037508.34, 20037508.34, 20037508.34, 20037508.34],
  'EPSG:32633': [-2500000, 3500000, 3045984, 9045984]
};

const projection = new ol.proj.Projection({
  code: sProjection,
  extent: extent[sProjection]
});
ol.proj.addProjection(projection);

const view = new ol.View({
  projection,
  center: [352474, 6945724],
  zoom: 4
});

const projectionExtent = projection.getExtent();
const size = ol.extent.getWidth(projectionExtent) / 256;
const resolutions = [];
const matrixIds = [];

for (let z = 0; z < 21; ++z) { // Max 18?
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = `${sProjection}:${z}`;
}

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      title: 'Norges grunnkart',
      source: new ol.source.WMTS({
        url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
        layer: 'norges_grunnkart',
        matrixSet: sProjection,
        format: 'image/png',
        projection,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(projection.getExtent()),
          resolutions,
          matrixIds
        }),
        style: 'default'
      })
    })
  ],
  view
});
