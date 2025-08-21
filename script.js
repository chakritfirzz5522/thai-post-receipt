let items = [];

function addItem() {
  const type = document.getElementById('itemType').value;
  const price = parseFloat(document.getElementById('price').value) || 0;
  const qty = parseInt(document.getElementById('qty').value) || 1;
  const total = price * qty;

  items.push({ type, price, qty, total });
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector('#itemTable tbody');
  tbody.innerHTML = '';
  let sum = 0;
  items.forEach((item, index) => {
    sum += item.total;
    tbody.innerHTML += `<tr>
      <td>${item.type}</td>
      <td>${item.qty}</td>
      <td>${item.price}</td>
      <td>${item.total}</td>
      <td><button onclick="removeItem(${index})">ลบ</button></td>
    </tr>`;
  });

  const discount = parseFloat(document.getElementById('discount').value) || 0;
  const net = sum - discount;
  const received = parseFloat(document.getElementById('received').value) || 0;
  const change = received - net;

  document.getElementById('total').textContent = sum;
  document.getElementById('net').textContent = net;
  document.getElementById('change').textContent = change;
}

function removeItem(index) {
  items.splice(index, 1);
  renderTable();
}

function clearAll() {
  items = [];
  document.getElementById('discount').value = 0;
  document.getElementById('received').value = 0;
  renderTable();
}

function printA5() {
  const printWindow = window.open('', '_blank');
  let totalBox = items.filter(i => i.type === 'กล่อง').reduce((s,i)=>s+i.total,0);
  let totalEnvelope = items.filter(i => i.type === 'ซอง').reduce((s,i)=>s+i.total,0);
  let fee = items.filter(i => i.type === 'ค่าธรรมเนียมไปรษณีย์').reduce((s,i)=>s+i.total,0);
  let service = items.filter(i => i.type === 'ค่าบริการฝากส่ง').reduce((s,i)=>s+i.total,0);
  let grand = totalBox + totalEnvelope + fee + service;

  printWindow.document.write(`
    <html><head><title>ใบรับฝากส่ง</title></head>
    <body style="font-family:'Noto Sans Thai',sans-serif;font-size:18px;">
      <div style="background:red;color:white;padding:10px;text-align:center;font-size:22px;font-weight:bold;">
        ใบรับฝากส่งพัสดุไปรษณีย์<br>
        ร้านถ่ายรูปและไปรษณีย์ พฤกษา15 (ตรงข้ามเซเว่น) โทร. 092-524-5522
      </div>
      <div style="padding:20px;">
        <p>กล่อง: ${totalBox} บาท</p>
        <p>ซอง: ${totalEnvelope} บาท</p>
        <p>ค่าธรรมเนียมไปรษณีย์: ${fee} บาท</p>
        <p>ค่าบริการฝากส่ง: ${service} บาท</p>
        <hr>
        <p><b>รวมทั้งหมด: ${grand} บาท</b></p>
      </div>
    </body></html>
  `);
  printWindow.document.close();
  printWindow.print();
}
