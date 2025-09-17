import { THRESHOLDS } from '../config/thresholds.js';

function categoryOf(v){
  for(const t of THRESHOLDS){
    if(v>=t.min && v<t.max) return t.key;
  }
  return THRESHOLDS[THRESHOLDS.length-1].key;
}

export async function recomputeCounts(map){
  const src = map.getSource('roads');
  if(!src || !src._data) return {};
  const counts = {};
  for(const t of THRESHOLDS) counts[t.key]=0;
  for(const f of src._data.features){
    const v = (f.properties && typeof f.properties.vc_ratio==='number') ? f.properties.vc_ratio : 0.2;
    counts[categoryOf(v)]++;
  }
  return counts;
}
