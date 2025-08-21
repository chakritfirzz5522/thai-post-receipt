function addItem() {
    const itemsDiv = document.getElementById('items');
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = '<input type="text" placeholder="ชื่อสินค้า" class="itemName"> <input type="number" placeholder="ราคา" class="itemPrice">';
    itemsDiv.appendChild(div);
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const customerName = document.getElementById('customerName').value;
    const date = document.getElementById('date').value;

    let y = 10;
    doc.setFontSize(18);
    doc.text('ใบเสร็จรับเงิน', 80, y);

    y += 10;
    doc.setFontSize(12);
    doc.text('ร้านเหนือดวง', 80, y);

    y += 10;
    doc.text('ชื่อลูกค้า: ' + customerName, 10, y);

    y += 10;
    doc.text('วันที่: ' + date, 10, y);

    y += 10;
    doc.text('รายการสินค้า', 10, y);

    const items = document.querySelectorAll('.item');
    let total = 0;
    items.forEach(item => {
        const name = item.querySelector('.itemName').value;
        const price = parseFloat(item.querySelector('.itemPrice').value) || 0;
        y += 10;
        doc.text(name + ' - ' + price.toFixed(2) + ' บาท', 10, y);
        total += price;
    });

    y += 10;
    doc.text('รวมทั้งหมด: ' + total.toFixed(2) + ' บาท', 10, y);

    doc.save('receipt.pdf');
}
