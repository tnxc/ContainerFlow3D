function showReport() {
    const currentContainerId = sessionStorage.getItem("currentContainerId");
    const placedBoxes = JSON.parse(sessionStorage.getItem("placedBoxesData")) || [];
    const containerDataString = sessionStorage.getItem("containers");
    const containers = containerDataString ? JSON.parse(containerDataString) : [];
    const container = containers.find(c => parseInt(c.id) === parseInt(currentContainerId));

    if (container) {
        // สร้างรายงานคอนเทนเนอร์
        const reportData = `
            <h2>Report</h2>
            <p>Container ID: ${currentContainerId}</p>
            <p>Container Name: ${container.name}</p>
            <ul>
                <li>Width: ${container.width} meters</li>
                <li>Length: ${container.length} meters</li>
                <li>Height: ${container.height} meters</li>
                <li>Weight Capacity: ${container.weightCapacity} kg</li>
            </ul>
        `;
        
        // สร้างตารางสำหรับแสดงข้อมูลกล่อง
        let boxesTable = `
            <h3>Placed Boxes</h3>
            <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                    <tr>
                        <th>Box name</th>
                        <th>Count</th>
                        <th>Width</th>
                        <th>Length</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // คัดเลือกกล่องที่มี count มากที่สุดสำหรับแต่ละ id
        const maxCountBoxes = [];
        placedBoxes.forEach((box) => {
            const existingBox = maxCountBoxes.find(b => b.id === box.id);
            if (!existingBox) {
                // ถ้าไม่เคยมีข้อมูลกล่อง id นี้ ให้เพิ่มเข้าไป
                maxCountBoxes.push(box);
            } else {
                // ถ้ามีกล่อง id นี้แล้ว ให้ตรวจสอบว่า count มากกว่าไหม
                if (box.count > existingBox.count) {
                    existingBox.count = box.count;
                    existingBox.width = box.width;
                    existingBox.length = box.length;
                    existingBox.height = box.height;
                    existingBox.weight = box.weight;
                    existingBox.color = box.color;
                }
            }
        });

        // เติมข้อมูลกล่องที่มี count มากที่สุดลงในตาราง
        maxCountBoxes.forEach((box, index) => {
            boxesTable += `
                <tr>
                    <td>${box.id}</td>
                    <td>${box.count}</td>
                    <td>${box.width}</td>
                    <td>${box.length}</td>
                    <td>${box.height}</td>
                    <td>${box.weight}</td>
                    <td style="background-color: ${box.color}; color: #fff;"></td>
                </tr>
            `;
        });

        boxesTable += `
                </tbody>
            </table>
        `;

        // แสดงภาพที่บันทึกไว้ในรูปแบบตาราง
        let imagesHtml = '';
        let index = 0;
        const viewNames = ['Left Side', 'Right Side', 'Font Side', 'Back Side'];

        while (true) {
            const imgData = sessionStorage.getItem(`sceneImage_${index}`);
            if (!imgData) break;

            const viewName = viewNames[index] || `Camera View ${index + 1}`;
            imagesHtml += `
                <table border="1" cellpadding="5" cellspacing="0" style="width: 320px;">
                    <tr>
                        <td><img src="${imgData}" style="width: 600px; margin: 10px;"></td>
                    </tr>
                    <tr>
                        <td colspan="1">${viewName}</td>
                    </tr>
                </table>
            `;
            index++;
        }

        // แสดงผลข้อมูลใน HTML
        const reportContainer = document.getElementById("report-container");
        reportContainer.innerHTML = reportData + boxesTable + imagesHtml;
    } else {
        console.error("No container data found for currentContainerId.");
    }
}

function hideNavAndPrint() {
    // ซ่อนส่วนที่เป็น nav
    const nav = document.querySelector('nav');
    nav.style.display = 'none';

    // เรียกใช้ฟังก์ชันพิมพ์
    window.print();

    // รอให้การพิมพ์เสร็จสิ้นแล้วแสดง nav อีกครั้ง
    setTimeout(() => {
        nav.style.display = '';
    }, 1000); // หน่วงเวลา 1 วินาที (ปรับได้ตามต้องการ)
}

// เรียก showReport() ทันทีเมื่อหน้าเว็บโหลดเสร็จ
window.addEventListener("DOMContentLoaded", showReport);
