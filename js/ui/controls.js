import { updateLegendCounts } from '../map/legend.js';
import { recomputeCounts } from '../ui/recompute.js';

export function setupControls(map){
  const runBtn = document.getElementById('runCalc');
  if(runBtn){
    runBtn.addEventListener('click', async ()=>{
      runBtn.disabled = true;
      runBtn.textContent = '計算中...';
      try{
        const counts = await recomputeCounts(map);
        updateLegendCounts(counts);
      }catch(e){
        console.error(e);
        alert('計算に失敗しました（コンソール参照）');
      }finally{
        runBtn.disabled = false;
        runBtn.textContent = '計算実行';
      }
    });
  }
  // simple toggles
  const toggles = [
    ['gridToggle','segments-heat'],
  ];
  for(const [btnId, layerId] of toggles){
    const b = document.getElementById(btnId);
    if(!b) continue;
    b.addEventListener('click', ()=>{
      const vis = map.getLayoutProperty(layerId,'visibility') || 'visible';
      map.setLayoutProperty(layerId,'visibility', vis==='none'?'visible':'none');
    });
  }
}
