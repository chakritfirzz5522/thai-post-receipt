# Receipt Web App (Thai Post-style)

เว็บแอปสำหรับออกใบรับฝากส่งพัสดุไปรษณีย์ หน้าตาแบบฟอร์มไทย เหมือนตัวอย่างที่ให้มา
- พิมพ์/บันทึกเป็น PDF ได้ (สเกล A5)
- รวมค่าบริการอัตโนมัติ
- รองรับภาษาไทย (ใช้ฟอนต์ Google Noto Sans Thai)
- โค้ดเป็น HTML/CSS/JS ธรรมดา อัปขึ้น GitHub Pages ได้ทันที

## โครงสร้าง
```
receipt-app/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## การใช้งานบน GitHub Pages
1. สร้าง repo ใหม่ใน GitHub แล้วอัปโหลดไฟล์ทั้งโฟลเดอร์นี้
2. เปิด **Settings → Pages → Source: Deploy from a branch**
3. เลือก branch `main` และโฟลเดอร์ `/ (root)` แล้วกด Save
4. เปิดลิงก์ที่ GitHub แสดงเพื่อใช้งานเว็บแอป

> หมายเหตุ: หากต้องการปรับขนาดพิมพ์ให้ตรงกระดาษจริง ปรับ `@media print` ใน `styles.css` (ค่าดีฟอลต์กำหนด A5)
