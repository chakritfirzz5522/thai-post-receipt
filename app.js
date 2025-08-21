
function sumTotal(){
  const n = (v)=> Number((v||'0').toString().replace(/[^\d.]/g,'')) || 0;
  const material = n(document.getElementById('materialFee').value);
  const postage  = n(document.getElementById('postage').value);
  const service  = n(document.getElementById('serviceFee').value);
  const total = material + postage + service;
  document.getElementById('grandTotal').value = total.toString();
}

['materialFee','postage','serviceFee'].forEach(id=>{
  document.getElementById(id).addEventListener('input', sumTotal);
});

document.getElementById('btnPrint').addEventListener('click', ()=>{
  window.print();
});

document.getElementById('btnClear').addEventListener('click', ()=>{
  document.querySelectorAll('input').forEach(el=>{
    if(el.type==='checkbox'){ el.checked=false; }
    else if(!el.readOnly){ el.value=''; }
  });
  sumTotal();
});

// Basic UX: auto move ZIP focus
const zipInputs = Array.from(document.querySelectorAll('#zipBoxes input'));
zipInputs.forEach((el, idx)=>{
  el.addEventListener('input', ()=>{
    if(el.value && idx < zipInputs.length - 1){
      zipInputs[idx+1].focus();
    }
  });
});

// Pre-fill example values for quick preview
(function demoFill(){
  document.getElementById('shipDate').value = '07/08/68';
  document.getElementById('roundMorning').checked = true;
  document.getElementById('receiver').value = 'K. รชา อินทรภพ';
  document.getElementById('destination').value = 'กรุงเทพฯ';
  ['8','2','1','5','0'].forEach((d,i)=> zipInputs[i].value=d);
  document.getElementById('svcNorm').checked = true;
  document.getElementById('box').value = 'B3';
  document.getElementById('postage').value = '82';
  document.getElementById('serviceFee').value = '25';
  document.getElementById('materialFee').value = '30';
  sumTotal();
  document.getElementById('tracking').value = 'ET169561524TH';
})();
