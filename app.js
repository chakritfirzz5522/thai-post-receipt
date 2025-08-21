
function sumTotal(){
  const n = v => Number((v||'').replace(/[^\d.]/g,''))||0;
  const total = n(document.getElementById('postage').value) + n(document.getElementById('service').value);
  document.getElementById('total').value = total ? total : '';
}
['postage','service'].forEach(id=>{
  const el=document.getElementById(id); el.addEventListener('input', sumTotal);
});
document.getElementById('btnPrint').addEventListener('click', ()=> window.print());
// auto move zip
Array.from(document.querySelectorAll('.zip input')).forEach((el,i,arr)=>{
  el.addEventListener('input', ()=>{ if(el.value && i < arr.length-1) arr[i+1].focus(); });
});
