// ป้องกัน iOS ซูมตอนโฟกัส
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault(), {passive:false});

function toNum(v){ return Number((v||'').toString().replace(/[^0-9.]/g,'')) || 0; }
function calcTotal(){
  const t = toNum(document.querySelector('.amt1')?.value)
          + toNum(document.querySelector('.amt2')?.value)
          + toNum(document.querySelector('.amt3')?.value);
  const out = document.querySelector('.total');
  if(out) out.value = t ? t : '';
}
['.amt1','.amt2','.amt3'].forEach(sel=>{
  document.addEventListener('input', e=>{
    if(e.target && e.target.matches(sel)) calcTotal();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const z = [...document.querySelectorAll('.zip input')];
  z.forEach((el,i)=> el.addEventListener('input', ()=>{
    if(el.value && i<z.length-1) z[i+1].focus();
  }));
});

function clearForm(){
  document.querySelectorAll('input').forEach(el=>{
    if(el.type==='checkbox'){ el.checked=false; }
    else { el.value=''; }
  });
  calcTotal();
}
document.getElementById('btnClear')?.addEventListener('click', clearForm);
document.getElementById('btnPrint')?.addEventListener('click', ()=> window.print());

(function(){
  const stage = document.getElementById('stage') || document.querySelector('.stage');
  const app   = document.getElementById('app');
  const DESIGN_W = parseFloat(getComputedStyle(stage).width);
  const DESIGN_H = parseFloat(getComputedStyle(stage).height);
  function fit(){
    const padTop=12, padSide=12, padBottom=76;
    const availW = Math.max(320, app.clientWidth - padSide*2);
    const availH = Math.max(480, app.clientHeight - (padTop + padBottom));
    const scale = Math.min(availW / DESIGN_W, availH / DESIGN_H);
    stage.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
  document.addEventListener('DOMContentLoaded', fit);
  fit();
})();
