// sum + print + clear + center-fit scale
function toNum(v){ return Number((v||'').toString().replace(/[^0-9.]/g,'')) || 0; }
function calcTotal(){
  const t = toNum(document.querySelector('.amt1')?.value) + toNum(document.querySelector('.amt2')?.value);
  const out = document.querySelector('.total'); if(out) out.value = t ? t : '';
}
['.amt1','.amt2'].forEach(sel=>{ document.addEventListener('input', e=>{ if(e.target && e.target.matches(sel)) calcTotal(); }); });
function clearForm(){ document.querySelectorAll('input').forEach(el=>{ if(el.type==='checkbox'){el.checked=false;} else {el.value='';} }); calcTotal(); }
document.getElementById('btnClear')?.addEventListener('click', clearForm);
document.getElementById('btnPrint')?.addEventListener('click', ()=> window.print());

(function(){ const stage=document.querySelector('.stage'); const app=document.getElementById('app');
  const DESIGN_W=parseFloat(getComputedStyle(stage).width); const DESIGN_H=parseFloat(getComputedStyle(stage).height);
  function fit(){ const padTop=10,padSide=10,padBottom=96;
    const availW=Math.max(320,app.clientWidth-padSide*2); const availH=Math.max(500,app.clientHeight-(padTop+padBottom));
    const scale=Math.min(availW/DESIGN_W, availH/DESIGN_H); stage.style.transform=`translateX(-50%) scale(${scale})`; }
  window.addEventListener('resize', fit, {passive:true}); window.addEventListener('orientationchange', fit); document.addEventListener('DOMContentLoaded', fit); fit();
})(); 
