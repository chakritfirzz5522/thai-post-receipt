function toNum(v){ return Number((v||'').toString().replace(/[^0-9.]/g,'')) || 0; }
function calc(){
  const t = toNum(document.getElementById('priceBox').value)
        + toNum(document.getElementById('priceEnv').value)
        + toNum(document.getElementById('feePost').value)
        + toNum(document.getElementById('feeService').value);
  document.getElementById('sumTotal').value = t ? t : '';
}
['priceBox','priceEnv','feePost','feeService'].forEach(id=>{
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

// RELIABLE PRINT: clone into new window & replace inputs -> spans so Safari/iOS prints correctly
function printA5(){
  // Calculate before print
  calc();
  // Clone stage
  const stage = document.getElementById('stage');
  const clone = stage.cloneNode(true);
  // Replace inputs with spans/boxes
  clone.querySelectorAll('input').forEach(inp=>{
    if(inp.type === 'checkbox'){
      const box = document.createElement('span');
      box.className = 'print-box' + (inp.checked ? ' checked' : '');
      inp.parentNode.replaceChild(box, inp);
    } else {
      const span = document.createElement('span');
      span.className = 'print-val';
      span.textContent = inp.value || '';
      inp.parentNode.replaceChild(span, inp);
    }
  });
  // Open new window
  const w = window.open('', '_blank');
  w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>พิมพ์ A5</title>');
  w.document.write('<style>' + document.querySelector('style[data-inline]')?.textContent + '</style>');
  // Inline minimal CSS for print (fallback if link not accessible)
  w.document.write(`<style>
    @page{size:A5 portrait;margin:0}
    body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .print-wrap{width:148mm;height:210mm}
    .stage{position:static;width:148mm;height:210mm;transform:none;box-shadow:none;border-radius:0}
    .header-red{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .print-box{width:20px;height:20px;border:3px solid #d31924;display:inline-block;border-radius:6px;margin-right:6px}
    .print-box.checked{background:#d31924}
  </style>`);
  w.document.write('</head><body><div class="print-wrap"></div></body></html>');
  const wrap = w.document.querySelector('.print-wrap');
  wrap.appendChild(clone);
  w.document.close();
  w.focus();
  w.print();
  w.onafterprint = () => w.close();
}
document.getElementById('btnPrint').addEventListener('click', printA5);
