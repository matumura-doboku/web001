export function initMap(){
  const gsiStyle = {
    version: 8,
    sources: {
      gsi: {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '地理院タイル'
      }
    },
    layers: [{ id:'gsi', type:'raster', source:'gsi', minzoom:0, maxzoom:18 }]
  };
  const map = new maplibregl.Map({
    container: 'map',
    style: gsiStyle,
    center: [132.46,34.40],
    zoom: 12
  });
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  return map;
}
