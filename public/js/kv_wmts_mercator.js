    // Start: projection & tileGrid definitions
  const sProjection = 'EPSG:3857';
  const projection = ol.proj.get(sProjection);
  const projectionExtent = projection.getExtent();
  const size = ol.extent.getWidth(projectionExtent) / 256;
  const resolutions = [];
  const matrixIds = [];

  for (let z = 0; z < 15; ++z) { // Max 18?
        // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = `${sProjection}:${z}`;
  }
    // End: projection & tileGrid definitions

    // start View definitions
  const view = new ol.View({
    projection: sProjection,
    center: [1891337, 9772319],
    zoom: 5
  });
    // End View definitions

    // Start: Map definitions
  const map = new ol.Map({
    target: 'map',
    view
  });
    // End: Map definitions

    //* **********************
  const _url = 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?';
    // Start: source
  const sourceWMTS = new ol.source.WMTS({
    url: _url,
    layer: 'norges_grunnkart',
    matrixSet: 'EPSG:3857',
    format: 'image/png',
    projection,
    tileGrid: new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(projectionExtent),
      resolutions,
      matrixIds
    }),
    style: 'default'
  });
    // End: source

    // Start: layer
  const tileLayerWMTS = new ol.layer.Tile({
    title: 'Norges grunnkart',
    source: sourceWMTS
  });
    // End: layer
    //* **********************

    // Add layers to map
  map.addLayer(tileLayerWMTS); // norges_grunnkart
