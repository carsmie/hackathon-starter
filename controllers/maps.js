/**
 * GET /
 * List of maps examples.
 */
exports.getMaps = (req, res) => {
  res.render('maps/index', {
    title: 'MAPS Examples'
  });
};

exports.getKartverket_wmts_utm33 = (req, res) => {
  res.render('maps/kartverket_wmts_utm33', {
    title: 'Kartverket WMTS UTM33'
  });
};

exports.getKartverket_wmts_mercator = (req, res) => {
  res.render('maps/kartverket_wmts_mercator', {
    title: 'Kartverket WMTS Mercator'
  });
};
exports.getKartverket_wms_c_mercator = (req, res) => {
  res.render('maps/kartverket_wms_c_mercator', {
    title: 'Kartverket WMS Mercator'
  });
};

