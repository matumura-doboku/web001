import { loadJSON } from '../data/loader.js';
import manifest from '../data/manifest.json' assert { type: 'json' };
import { THRESHOLDS } from '../config/thresholds.js';

function buildColorExpression(){
  const defaultColor = THRESHOLDS[0].color;
  const expr = ['step', ['coalesce', ['get','vc_ratio'], 0.2], defaultColor];
  // sort thresholds by min
  const arr = [...THRESHOLDS].sort((a,b)=>a.min-b.min);
  for(const t of arr){
    if (typeof t.min==='number' && t.min>0){
      expr.push(t.min, t.color);
    }
  }
  return expr;
}

export async function addBaseLayers(map){
  // remove existing
  if (map.getLayer('segments-heat')) map.removeLayer('segments-heat');
  if (map.getSource('roads')) map.removeSource('roads');

  // prefer prefecture 34 in manifest, fall back to sample
  const rel = manifest['34'] || 'prefectures/34_hiroshima/roads.geojson';
  let dataUrl = `js/data/${rel}`;
  let geojson;
  try{
    geojson = await loadJSON(dataUrl);
  }catch(e){
    console.warn('GeoJSON 読込失敗。サンプルにフォールバック', e);
    dataUrl = 'js/data/prefectures/34_hiroshima/roads.geojson';
    geojson = await loadJSON(dataUrl);
  }

  // ensure vc_ratio default
  for(const f of geojson.features){
    if(!f.properties) f.properties = {};
    if(typeof f.properties.vc_ratio !== 'number'){
      f.properties.vc_ratio = 0.2;
    }
  }

  map.addSource('roads', { type: 'geojson', data: geojson });

  map.addLayer({
    id: 'segments-heat',
    type: 'line',
    source: 'roads',
    paint: {
      'line-color': buildColorExpression(),
      'line-width': [
        'interpolate', ['linear'], ['zoom'],
        10, 1.5,
        13, 3.0,
        15, 5.0
      ],
      'line-opacity': 0.9
    }
  });

  console.log('道路レイヤを追加しました');
}

export function applyResultsToLayer(map, results){
  const src = map.getSource('roads');
  if(!src || !src._data) { console.warn('roads ソースが未追加'); return; }
  let updated=0;
  for(const f of src._data.features){
    const id = (f.properties && (f.properties.linkId || f.properties.id));
    if(id && results && results[id] && typeof results[id].vc_ratio==='number'){
      f.properties.vc_ratio = results[id].vc_ratio;
      updated++;
    }
  }
  src.setData(src._data);
  console.log(`計算結果を ${updated} 件反映しました`);
}
