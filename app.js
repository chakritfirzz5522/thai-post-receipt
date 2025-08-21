
function num(v){ return Number((v||'').toString().replace(/[^\d.]/g,'')) || 0; }
function calcTotal(){
  const total = num(document.getElementById('boxPrice')?.value)
             + num(document.getElementById('feePrice')?.value)
             + num(document.getElementById('servicePrice')?.value);
  const out = document.getElementById('totalPrice');
  if(out) out.value = total ? total : '';
}
['boxPrice','feePrice','servicePrice'].forEach(id=>{
  document.addEventListener('input', e=>{ if(e.target && e.target.id===id) calcTotal(); });
});
function clearForm(){
  document.querySelectorAll('input').forEach(el=>{
    if(el.type==='checkbox'){ el.checked=false; }
    else if(!el.readOnly){ el.value=''; }
  });
  calcTotal();
}
document.addEventListener('DOMContentLoaded', ()=>{
  const z = Array.from(document.querySelectorAll('.zip input'));
  z.forEach((el,i)=> el.addEventListener('input', ()=>{ if(el.value && i<z.length-1) z[i+1].focus(); }));
});
