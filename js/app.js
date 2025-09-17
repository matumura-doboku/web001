import { initMap } from './map/init.js';
import { setupControls } from './ui/controls.js';
import { initLegend } from './map/legend.js';
import { CREDITS } from './config/credits.js';
import { addBaseLayers } from './map/layers.js';

window.addEventListener('DOMContentLoaded', async ()=>{
  const map = initMap();
  initLegend();

  const creditsEl = document.getElementById('credits');
  if(creditsEl){ creditsEl.innerHTML = CREDITS; }

  setupControls(map);

  map.on('load', async ()=>{
    await addBaseLayers(map);
  });
});
