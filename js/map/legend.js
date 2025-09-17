import { THRESHOLDS } from '../config/thresholds.js';

export function initLegend(){
  const el = document.getElementById('legend');
  if(!el) return;
  el.innerHTML = '<div style="font-weight:600;margin-bottom:6px">交通量 V/C 凡例</div>';
  for(const t of THRESHOLDS){
    const item = document.createElement('div');
    item.className = 'legend-item';
    const color = document.createElement('span');
    color.className = 'legend-color';
    color.style.backgroundColor = t.color;
    const label = document.createElement('span');
    label.textContent = t.key;
    label.style.marginRight = '4px';
    const count = document.createElement('span');
    count.id = `legend-count-${t.key}`;
    count.textContent = '';
    item.appendChild(color);
    item.appendChild(label);
    item.appendChild(count);
    el.appendChild(item);
  }
}

export function updateLegendCounts(counts){
  for(const t of THRESHOLDS){
    const span = document.getElementById(`legend-count-${t.key}`);
    if(span){
      const v = counts && counts[t.key] ? counts[t.key] : 0;
      span.textContent = ` (${v})`;
    }
  }
}
