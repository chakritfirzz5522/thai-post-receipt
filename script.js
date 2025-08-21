function toNum(v){ return Number((v||'').toString().replace(/[^0-9.]/g,'')) || 0; }
function calc(){
  const t = toNum(document.getElementById('pricePkg').value)
        + toNum(document.getElementById('feePost').value)
        + toNum(document.getElementById('feeService').value);
  document.getElementById('sumTotal').value = t ? t : '';
}
['pricePkg','feePost','feeService'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', calc);
});
function clearForm(){
  document.querySelectorAll('input').forEach(el=>{
    if(el.type==='checkbox') el.checked=false; else el.value='';
  });
}
document.getElementById('btnClear').addEventListener('click', clearForm);

// Fit scaling for phones
(function(){
  const stage = document.getElementById('stage');
  const app = document.getElementById('app');
  const DESIGN_W = parseFloat(getComputedStyle(stage).width);
  const DESIGN_H = parseFloat(getComputedStyle(stage).height);
  function fit(){
    const padTop=10, padSide=10, padBottom=96;
    const availW = Math.max(320, app.clientWidth - padSide*2);
    const availH = Math.max(560, app.clientHeight - (padTop + padBottom));
    const scale = Math.min(availW / DESIGN_W, availH / DESIGN_H);
    stage.style.transform = `translateX(-50%) scale(${scale})`;
  }
  window.addEventListener('resize', fit, {passive:true});
  window.addEventListener('orientationchange', fit);
  document.addEventListener('DOMContentLoaded', fit);
  fit();
})();

// Simple print
document.getElementById('btnPrint').addEventListener('click', ()=>{
  const stage = document.getElementById('stage');
  const prev = stage.style.transform;
  stage.style.transform='translateX(-50%) scale(1)';
  setTimeout(()=>{
    window.print();
    setTimeout(()=>{ stage.style.transform = prev; }, 200);
  }, 100);
});