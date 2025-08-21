// Prevent iOS zoom on focus
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
  const z = [...document.querySelectorAll('.zip .cell')];
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

// Share PDF to LINE via Web Share API + jsPDF
async function sharePDF(){
  try{
    const stage = document.getElementById('stage');
    // Capture stage as canvas (scale x2 for quality)
    const canvas = await html2canvas(stage, {scale: 2, useCORS: true});
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // A5 portrait (mm)
    const {{ jsPDF }} = window.jspdf;
    const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a5' });
    const pageW = 148, pageH = 210;
    doc.addImage(imgData, 'JPEG', 0, 0, pageW, pageH);

    const blob = doc.output('blob');
    const file = new File([blob], 'receipt.pdf', {{ type: 'application/pdf' }});

    if(navigator.canShare && navigator.canShare({ files:[file] })){
      await navigator.share({ files:[file], title:'ใบรับฝากส่งพัสดุ', text:'แชร์ผ่าน LINE' });
    }else{
      // fallback: trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'receipt.pdf'; a.click();
      URL.revokeObjectURL(url);
      alert('เบราว์เซอร์ไม่รองรับแชร์ไฟล์โดยตรง จึงดาวน์โหลดไฟล์แทนครับ');
    }
  }catch(err){
    alert('แชร์ไม่สำเร็จ: ' + err.message);
  }
}
document.getElementById('btnShare')?.addEventListener('click', sharePDF);

// Responsive scale
(function(){
  const stage = document.getElementById('stage') || document.querySelector('.stage');
  const app   = document.getElementById('app');
  const DESIGN_W = parseFloat(getComputedStyle(stage).width);
  const DESIGN_H = parseFloat(getComputedStyle(stage).height);
  function fit(){
    const padTop=10, padSide=10, padBottom=86;
    const availW = Math.max(320, app.clientWidth - padSide*2);
    const availH = Math.max(480, app.clientHeight - (padTop + padBottom));
    const scale = Math.min(availW / DESIGN_W, availH / DESIGN_H);
    stage.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', fit, {passive:true});
  window.addEventListener('orientationchange', fit);
  document.addEventListener('DOMContentLoaded', fit);
  fit();
})();
