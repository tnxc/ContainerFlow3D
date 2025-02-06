window.onload = function() {
    camera.position.set(20, 20, 20);
    controls.update();
    updateRulerX();
};

const scene = new THREE.Scene();
scene.background = new THREE.Color("#edeff0");
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff); // สีเทาอ่อน
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

const gridSize = 300;
const gridDivisions = gridSize / 5; 
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xe3e3e3, 0xe3e3e3); // กริดสีฟ้า
gridHelper.rotation.y = -Math.PI / 2; 
gridHelper.position.y = 0;
gridHelper.position.x = -2.5;
gridHelper.position.z = -2.5;
scene.add(gridHelper);

function animate() {
    requestAnimationFrame(animate);
    // อัพเดตข้อมูลกล้อง
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
camera.position.z = 30;
// เรียกใช้งานฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
window.addEventListener('DOMContentLoaded', (event) => {
    const containerId = 1; // หรือใช้ค่าที่ต้องการ เช่น จากการกำหนด containerId
    updateCubeSize(containerId);
});

animate();
function toggleFlux(id) {
    const fluxContent = document.getElementById(id);
    const otherFluxes = ['ContainerContent', 'boxContent', 'listContent'].filter(flux => flux !== id); 
    const buttons = document.querySelectorAll('.btn');

    otherFluxes.forEach(function (otherFlux) {
        const otherFluxElement = document.getElementById(otherFlux);
        if (otherFluxElement.style.display === 'block') {
            if (otherFlux === 'listContent') {
                otherFluxElement.style.animation = 'slideOutTop 0.5s forwards';
            } else {
                otherFluxElement.style.animation = 'slideOut 0.5s forwards';
            }
            setTimeout(function() {
                otherFluxElement.style.display = 'none';
            }, 500);
        }
    });

    if (fluxContent.style.display === 'block') {
        if (id === 'listContent') {
            fluxContent.style.animation = 'slideOutTop 0.5s forwards';
        } else {
            fluxContent.style.animation = 'slideOut 0.5s forwards';
        }
        setTimeout(function() {
            fluxContent.style.display = 'none';
        }, 500);
        
        buttons.forEach(button => button.classList.remove('active-btn'));
    } else {
        fluxContent.style.display = 'block';
        if (id === 'listContent') {
            fluxContent.style.animation = 'slideTop 0.5s forwards';
        } else {
            fluxContent.style.animation = 'slideLeft 0.5s forwards';
        }

        buttons.forEach(button => button.classList.remove('active-btn'));
    }
}


document.getElementById("toggleButton").addEventListener("click", function() {
    const footer = document.getElementById("FooterContent");
    const button = document.getElementById("toggleButton");
    
    // Toggle the bottom value of the footer and button
    if (footer.style.bottom === "0px") {
        footer.style.bottom = "-60px"; // Slide footer down
        button.style.bottom = "100px";  // Keep button in place
    } else {
        footer.style.bottom = "0px";  // Slide footer up
        button.style.bottom = "160px"; // Move button up
    }
});
function detailToggle(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
        element.style.animation = "slideDetail 0.5s forwards"; // ใช้แอนิเมชันสไลด์แสดง
    } else {
        element.style.animation = "slideDetailHide 0.5s forwards"; // ใช้แอนิเมชันสไลด์ซ่อน
        setTimeout(function() {
            element.style.display = "none"; // ซ่อนหลังจากแอนิเมชันเสร็จ
        }, 500); // เวลาแอนิเมชัน 0.5s
    }
}
function toggleIcon() {
    var icon = document.getElementById("toggleIcon");
    
    // เช็คว่าไอคอนปัจจุบันคือ caret-up หรือไม่
    if (icon.classList.contains("bi-caret-up-fill")) {
        // ถ้าใช่ ให้เปลี่ยนเป็น caret-down
        icon.classList.remove("bi-caret-up-fill");
        icon.classList.add("bi-caret-down-fill");
    } else {
        // ถ้าไม่ใช่ ให้เปลี่ยนกลับเป็น caret-up
        icon.classList.remove("bi-caret-down-fill");
        icon.classList.add("bi-caret-up-fill");
    }
}

// สร้างกล่อง (Cube) พร้อมความโปร่งใส
const geometry = new THREE.BoxGeometry(15,5,5);
const material = new THREE.MeshBasicMaterial({ color: 0xcfd8ff, transparent: true, opacity: 0.5 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0); // ขยับ Cube ขึ้น 0.1
scene.add(cube);

// เพิ่มเส้นขอบให้กับ Cube
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const line = new THREE.LineSegments(edges, lineMaterial);
line.position.copy(cube.position); // กำหนดตำแหน่งเส้นขอบให้ตรงกับ Cube แรก
scene.add(line);

// สร้าง Cube ที่สอง (สีเข้มกว่า)
const darkerMaterial = new THREE.MeshBasicMaterial({ color: 0x32343d, transparent: true, opacity: 0.5 });
const darkerCubeGeometry = new THREE.BoxGeometry(15, 0.05, 5); // ขนาด y เป็น 0.2
const darkerCube = new THREE.Mesh(darkerCubeGeometry, darkerMaterial);
darkerCube.position.set(0, gridHelper.position.y -0.0245, 0); // เริ่มต้นใต้ Grid
scene.add(darkerCube);

function updateCubeSize(containerId) {
    // ดึงค่าจาก input โดยอิงตาม containerId
    console.log("Received containerId:", containerId); 
    const newLength = parseFloat(document.getElementById(`clength-${containerId}`).value);
    const newHeight = parseFloat(document.getElementById(`cheight-${containerId}`).value);
    const newWidth = parseFloat(document.getElementById(`cwidth-${containerId}`).value);
    

    // คูณค่าทั้งสามก่อนใช้งาน
    const multipliedWidth = newLength * 5;  // คุณสามารถปรับค่า 5 ตามต้องการ
    const multipliedHeight = newHeight * 5; 
    const multipliedDepth = newWidth * 5;

    // ปรับขนาด Cube ตามค่าที่คูณแล้ว
    cube.geometry.dispose();
    cube.geometry = new THREE.BoxGeometry(multipliedWidth, multipliedHeight, multipliedDepth);
    // แสดงค่าของตัวแปรใน console
    console.log("multipliedWidth: ", multipliedWidth);
    console.log("multipliedHeight: ", multipliedHeight);
    console.log("multipliedDepth: ", multipliedDepth);
    cube.position.y = gridHelper.position.y + multipliedHeight / 2;

    line.geometry.dispose();
    line.geometry = new THREE.EdgesGeometry(cube.geometry);
    line.position.copy(cube.position);

    // ปรับขนาด darkerCube ให้เหมือนกับ cube แต่กำหนดให้ y เป็น gridHelper.position.y + 0.1
    darkerCube.geometry.dispose();
    darkerCube.geometry = new THREE.BoxGeometry(multipliedWidth, -0.0245, multipliedDepth); // ใช้ขนาดจาก cube
    darkerCube.position.set(cube.position.x, gridHelper.position.y -0.0245 , cube.position.z);

    // อัปเดตไม้บรรทัด
    updateRulerX();
    updateRulerY();
    updateRulerZ();

    console.log(window.cwidth, window.clength, window.cheight);  // สามารถเข้าถึงตัวแปรได้

     // อัปเดตตัวแปรทั่วโลก
     cwidth = newWidth;
     clength = newLength;
     cheight = newHeight;

    
     
     currentContainerId = containerId; // เก็บ id ที่ถูกเลือก
     console.log(`Container ID Loaded: ${containerId}`);
      // อัปเดต containerData
    // เก็บข้อมูลทั้งหมดของ container ใน sessionStorage
    sessionStorage.setItem("containers", JSON.stringify(containerData)); // เก็บข้อมูลทั้งชุด

    // เก็บ currentContainerId ใน sessionStorage
    sessionStorage.setItem("currentContainerId", containerId);
    const container = containerData.find(c => c.id === containerId);
    if (container) {
        container.width = newWidth;
        container.length = newLength;
        container.height = newHeight;
    }
    console.log("updateCubeSize: containerId =", containerId);
    console.log("Updated dimensions:", { newWidth, newLength, newHeight });
    // อัปเดตค่าตัวแปรใน sessionStorage
    sessionStorage.setItem("cwidth", cwidth);
    sessionStorage.setItem("clength", clength);
    sessionStorage.setItem("cheight", cheight);
    sessionStorage.setItem("currentContainerId", currentContainerId);
    
    // เรียก footerDetails เพื่ออัปเดตข้อมูลใน footer
    footerDetails(containerId);
    manageAction();
    placeBoxesFromInside(containerId,multipliedWidth, multipliedHeight, multipliedDepth)
}

function updateRulerX() {
    // ลบกลุ่มไม้บรรทัดเก่า
    if (scene.getObjectByName("rulerGroup")) {
        scene.remove(scene.getObjectByName("rulerGroup"));
    }

    // สร้างกลุ่มใหม่สำหรับไม้บรรทัด
    const rulerGroup = new THREE.Group();
    rulerGroup.name = "rulerGroup";

    // ขนาดของ Cube
    const cubeWidth = cube.geometry.parameters.width;
    const cubeHeight = cube.geometry.parameters.height;

    // สร้างเส้นหลักของไม้บรรทัดเป็น BoxGeometry
    const rulerMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const rulerGeometry = new THREE.BoxGeometry(cubeWidth, 0.12, 0.12); // ความหนาเล็กน้อย
    const rulerLine = new THREE.Mesh(rulerGeometry, rulerMaterial);
    const offsetZ = 0.15; // ระยะห่างจากด้านหน้าสุดของ cube
    rulerLine.position.set(
        cube.position.x + 0.05,
        cube.position.y - cubeHeight / 2 + 0.05, // ตำแหน่ง Y ให้อยู่ใต้ Cube เล็กน้อย
        cube.position.z + cube.geometry.parameters.depth / 2 + offsetZ // ด้านหน้าสุดของ Cube
    );

    rulerGroup.add(rulerLine);

    // สร้างเครื่องหมายระยะ 1 หน่วยบนไม้บรรทัด
    const markMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const unitLength = 1; // ระยะห่างของเครื่องหมาย
    const startX = -cubeWidth / 2 ; // เริ่มจาก x ที่น้อยที่สุดของ Cube
    const endX = cubeWidth / 2; // ไปจนถึง x ที่มากที่สุดของ Cube
    const posY = cube.position.y - cubeHeight / 2 + 0.05; // ล่างสุด
    const posZ = cube.position.z + cube.geometry.parameters.depth / 2 + 0.1; // หน้าสุด

    for (let x = startX; x <= endX; x += unitLength) {
        // ตรวจสอบว่าตำแหน่งนี้เป็นขีดยาวหรือไม่
        const isLongMark = Math.round((x - startX) / unitLength) % 5 === 0;

        // สร้างเครื่องหมายเป็น BoxGeometry
        const markGeometry = new THREE.BoxGeometry(
            0.12, // ความหนาของเครื่องหมาย
            0.12, // ความกว้างของเครื่องหมาย
            isLongMark ? 1 : 0.5 // ความยาวต่างกันระหว่างขีดยาวและขีดสั้น
        );
        const mark = new THREE.Mesh(markGeometry, markMaterial);

        // ตำแหน่งของเครื่องหมาย: X คงเดิม, Y ล่างสุด, Z ตามแนวลึก
        const adjustedX = cube.position.x + x; // อิงตำแหน่ง x ตาม cube
        const adjustedY = posY; // คงเดิมที่ระนาบด้านล่าง
        const adjustedZ = posZ + 0.25;

        mark.position.set(
            adjustedX,
            adjustedY,
            adjustedZ // ปรับระยะยืดด้านเดียว
        );
        
        // การยืดเครื่องหมายในแนวแกน Z เพื่อให้ขีดยาวและสั้นตรงตามตำแหน่ง
        mark.geometry.translate(0, 0, (isLongMark ? 0.5 : 0.25) / 2); // ยืดด้านเดียว
        rulerGroup.add(mark);
    }

    scene.add(rulerGroup); // เพิ่มกลุ่มเข้าใน scene

    // สร้างข้อความบนไม้บรรทัด
    createRulerText(cubeWidth, rulerLine);
}

function createRulerText(size, line) {
    const rulerGroup = scene.getObjectByName("rulerGroup"); // อ้างอิงถึงกลุ่มไม้บรรทัด
    if (!rulerGroup) return;

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา

        const unitLength = 5; // ระยะห่างของข้อความบนไม้บรรทัด
        const startX = -size / 2; // จุดเริ่มต้น X
        const endX = size / 2;   // จุดสิ้นสุด X
        const textY = cube.position.y - cube.geometry.parameters.height / 2 + 0.05; // ต่ำกว่า Cube เล็กน้อย
        const textZ = cube.position.z + cube.geometry.parameters.depth / 2 + 2.2; // หน้าสุดของ Cube

        let number = 0; // ตัวแปรที่เก็บตัวเลขเริ่มต้นที่ 0
        for (let x = startX; x <= endX; x += unitLength) {
            // สร้างข้อความจากค่าของ x ที่ใช้เป็นตำแหน่ง
            const textGeometry = new THREE.TextGeometry(number.toFixed(0), { // ใช้ number แทนค่าของ x
                font: font,
                size: 0.7,
                height: 0.1,
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // ตรวจสอบตำแหน่งของตัวเลขว่าเป็นหลักหน่วยหรือหลักสิบ
            const adjustedX = cube.position.x + x - 0.1;
            const offset = (Math.abs(x) % 10 === 0) ? 0 : -0.2; // ปรับตำแหน่ง X สำหรับหลักสิบ

            // ปรับตำแหน่งของข้อความ
            textMesh.position.set(
                adjustedX + offset, // ปรับตำแหน่ง X
                textY,              // ตำแหน่ง Y คงที่
                textZ               // ตำแหน่ง Z คงที่
            );

            // หมุนข้อความให้หงายขึ้น
            textMesh.rotation.x = -Math.PI / 2; // หมุน 90 องศาในแกน X (ทำให้ข้อความหงายขึ้น)
            textMesh.rotation.y = 0;            // หมุน 0 องศาในแกน Y
            textMesh.rotation.z = 0;            // หมุน 0 องศาในแกน Z

            rulerGroup.add(textMesh);

            number++; // เพิ่มค่า number ทีละ 1
        }
    });
}

updateRulerX();

function updateRulerY() {
    // ลบกลุ่มไม้บรรทัดเก่า
    if (scene.getObjectByName("rulerGroupY")) {
        scene.remove(scene.getObjectByName("rulerGroupY"));
    }

    // สร้างกลุ่มใหม่สำหรับไม้บรรทัด
    const rulerGroupY = new THREE.Group();
    rulerGroupY.name = "rulerGroupY";

    // ขนาดของ Cube
    const cubeWidth = cube.geometry.parameters.width;
    const cubeHeight = cube.geometry.parameters.height;

    // สร้างเส้นหลักของไม้บรรทัดเป็น BoxGeometry
    const rulerMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const rulerGeometry = new THREE.BoxGeometry(0.12, cubeHeight, 0.12); // ความหนาเล็กน้อย
    const rulerLine = new THREE.Mesh(rulerGeometry, rulerMaterial);
    const offsetX = 0.00; // ระยะห่างจากด้านซ้ายสุดของ cube
    rulerLine.position.set(
        cube.position.x - cubeWidth / 2 + offsetX, // ด้านซ้ายสุดของ Cube
        cube.position.y  ,                          // ตรงกลางในแกน Y
        cube.position.z + cube.geometry.parameters.depth / 2 +0.15                          // ตรงกลางในแกน Z
    );

    rulerGroupY.add(rulerLine);

    // สร้างเครื่องหมายระยะ 1 หน่วยบนไม้บรรทัด
    const markMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const unitLength = 1; // ระยะห่างของเครื่องหมาย
    const startY = -cubeHeight / 2; // เริ่มจาก y ที่น้อยที่สุดของ Cube
    const endY = cubeHeight / 2;   // ไปจนถึง y ที่มากที่สุดของ Cube
    const posX = cube.position.x - cubeWidth / 2 - offsetX - 0.1; // ด้านซ้ายสุด
    const posZ = cube.position.z + cube.geometry.parameters.depth / 2; // ตรงกลางในแกน Z

    for (let y = startY; y <= endY; y += unitLength) {
        // ตรวจสอบว่าตำแหน่งนี้เป็นขีดยาวหรือไม่
        const isLongMark = Math.round((y - startY) / unitLength) % 5 === 0;
        if (isLongMark && y === startY) continue;

        // สร้างเครื่องหมายเป็น BoxGeometry
        const markGeometry = new THREE.BoxGeometry(
            0.12, // ความกว้างของเครื่องหมาย
            isLongMark ? 1 : 0.5, // ความยาวต่างกันระหว่างขีดยาวและขีดสั้น
            0.12  // ความหนาของเครื่องหมาย
        );
        const mark = new THREE.Mesh(markGeometry, markMaterial);

        // ตำแหน่งของเครื่องหมาย: Y คงเดิม, X และ Z ตามแนวลึก
        const adjustedX = posX;
        const adjustedY = cube.position.y + y;
        const adjustedZ = posZ;

        mark.position.set(
            adjustedX+0.1, // คงเดิมในแกน X
            adjustedY, // ปรับระยะในแกน Y
            adjustedZ+0.35   // คงเดิมในแกน Z
        );
        mark.rotation.z = Math.PI / 2; // หมุน 90 องศาในแกน Z
        mark.rotation.y = Math.PI / 2; // หมุน 90 องศาในแกน Z

        mark.geometry.translate(0, (isLongMark ? 0.5 : 0.25) / 2, 0); // ยืดด้านเดียวในแกน Y
        rulerGroupY.add(mark);
    }

    scene.add(rulerGroupY); // เพิ่มกลุ่มเข้าใน scene

    // สร้างข้อความบนไม้บรรทัด
    createRulerTextY(cubeHeight, rulerLine);
}

function createRulerTextY(size, line) {
    const rulerGroupY = scene.getObjectByName("rulerGroupY"); // อ้างอิงถึงกลุ่มไม้บรรทัด
    if (!rulerGroupY) return;

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา

        const unitLength = 5; // ระยะห่างของข้อความบนไม้บรรทัด
        const startY = -size / 2; // จุดเริ่มต้น Y
        const endY = size / 2;   // จุดสิ้นสุด Y
        const textX = cube.position.x - cube.geometry.parameters.width / 2 - 2.2; // ซ้ายสุดของ Cube
        const textZ = cube.position.z + cube.geometry.parameters.depth / 2; // ตรงกลางในแกน Z

        let number = 0; // ตัวแปรที่เก็บตัวเลขเริ่มต้นที่ 0
        for (let y = startY; y <= endY; y += unitLength) {
            // ข้ามการสร้างข้อความสำหรับเลข 0 ตัวแรก
            if (number === 0) {
                number++; // เพิ่มตัวเลขก่อนจะข้าม
                continue;
            }
            // สร้างข้อความจากค่าของ y ที่ใช้เป็นตำแหน่ง
            const textGeometry = new THREE.TextGeometry(number.toFixed(0), { // ใช้ number แทนค่าของ y
                font: font,
                size: 0.7,
                height: 0.1,
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // ปรับตำแหน่งของข้อความ
            textMesh.position.set(
                textX +2.15,               // ตำแหน่ง X คงที่
                cube.position.y + y -0.3, // ตำแหน่ง Y ปรับตาม
                textZ + 2                // ตำแหน่ง Z คงที่
            );

            // หมุนข้อความให้หงายขึ้น
            textMesh.rotation.x = 0;
            textMesh.rotation.y = Math.PI / 2; // หมุน 90 องศาในแกน Y
            textMesh.rotation.z = 0;

            rulerGroupY.add(textMesh);

            number++; // เพิ่มค่า number ทีละ 1
        }
    });
}

updateRulerY();

function updateRulerZ() {
    // ลบกลุ่มไม้บรรทัดเก่า
    if (scene.getObjectByName("rulerGroupZ")) {
        scene.remove(scene.getObjectByName("rulerGroupZ"));
    }

    // สร้างกลุ่มใหม่สำหรับไม้บรรทัด
    const rulerGroupZ = new THREE.Group();
    rulerGroupZ.name = "rulerGroupZ";

    // ขนาดของ Cube
    const cubeDepth = cube.geometry.parameters.depth;
    const cubeHeight = cube.geometry.parameters.height;

    // สร้างเส้นหลักของไม้บรรทัดเป็น BoxGeometry
    const rulerMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const rulerGeometry = new THREE.BoxGeometry(0.12, 0.12, cubeDepth); // ความหนาเล็กน้อย
    const rulerLine = new THREE.Mesh(rulerGeometry, rulerMaterial);
    const offsetX = 0.15; // ระยะห่างจากด้านขวาสุดของ cube
    rulerLine.position.set(
        cube.position.x + cube.geometry.parameters.width / 2 + offsetX, // ด้านขวาสุด
        cube.position.y - cubeHeight / 2 + 0.05, // ด้านล่าง
        cube.position.z  // กึ่งกลางแกน Z
    );

    rulerGroupZ.add(rulerLine);

    // สร้างเครื่องหมายระยะ 1 หน่วยบนไม้บรรทัด
    const markMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const unitLength = 1; // ระยะห่างของเครื่องหมาย
    const startZ = -cubeDepth / 2; // เริ่มจาก z ที่น้อยที่สุดของ Cube
    const endZ = cubeDepth / 2;   // ไปจนถึง z ที่มากที่สุดของ Cube
    const posX = cube.position.x + cube.geometry.parameters.width / 2 + 0.2; // ขวาสุด
    const posY = cube.position.y - cubeHeight / 2 + 0.05; // ล่างสุด

    for (let z = startZ; z <= endZ; z += unitLength) {
        // ตรวจสอบว่าตำแหน่งนี้เป็นขีดยาวหรือไม่
        const isLongMark = Math.round((z - startZ) / unitLength) % 5 === 0;


        // สร้างเครื่องหมายเป็น BoxGeometry
        const markGeometry = new THREE.BoxGeometry(
            0.12, // ความกว้างของเครื่องหมาย
            0.12, // ความหนาของเครื่องหมาย
            isLongMark ? 1 : 0.5 // ความยาวต่างกันระหว่างขีดยาวและขีดสั้น
        );
        const mark = new THREE.Mesh(markGeometry, markMaterial);

        // ตำแหน่งของเครื่องหมาย: Z คงเดิม, X และ Y ตามแนวลึก
        const adjustedX = posX;
        const adjustedY = posY;
        const adjustedZ = cube.position.z + z;

        mark.position.set(
            adjustedX,
            adjustedY,
            adjustedZ
        );
        mark.rotation.z = Math.PI / 2; // หมุน 90 องศาในแกน Z
        mark.rotation.y = Math.PI / 2; // หมุน 90 องศาในแกน Z

        mark.geometry.translate(0, 0, (isLongMark ? 0.5 : 0.25) / 2); // ยืดด้านเดียวในแกน Z
        rulerGroupZ.add(mark);
    }

    scene.add(rulerGroupZ); // เพิ่มกลุ่มเข้าใน scene

    // สร้างข้อความบนไม้บรรทัด
    createRulerTextZ(cubeDepth, rulerLine);
}

function createRulerTextZ(size, line) {
    const rulerGroupZ = scene.getObjectByName("rulerGroupZ"); // อ้างอิงถึงกลุ่มไม้บรรทัด
    if (!rulerGroupZ) return;

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา

        const unitLength = 5; // ระยะห่างของข้อความบนไม้บรรทัด
        const startZ = -size / 2; // จุดเริ่มต้น Z
        const endZ = size / 2;   // จุดสิ้นสุด Z
        const textX = cube.position.x + cube.geometry.parameters.width / 2 + 1.2; // ขวาสุดของ Cube
        const textY = cube.position.y - cube.geometry.parameters.height / 2 + 0.05; // ต่ำกว่า Cube เล็กน้อย

        let number = 0; // ตัวแปรที่เก็บตัวเลขเริ่มต้นที่ 0
        for (let z = startZ; z <= endZ; z += unitLength) {

            // สร้างข้อความจากค่าของ z ที่ใช้เป็นตำแหน่ง
            const textGeometry = new THREE.TextGeometry(number.toFixed(0), { // ใช้ number แทนค่าของ z
                font: font,
                size: 0.7,
                height: 0.1,
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // ปรับตำแหน่งของข้อความ
            const adjustedZ = cube.position.z + z;
            textMesh.position.set(
                textX,
                textY,
                adjustedZ +0.3
            );

            // หมุนข้อความให้หงายขึ้น
            textMesh.rotation.x = -Math.PI / 2; // หมุน 90 องศาในแกน X (ทำให้ข้อความหงายขึ้น)
            textMesh.rotation.y = 0;            // หมุน 0 องศาในแกน Y
            textMesh.rotation.z = 0;            // หมุน 0 องศาในแกน Z

            rulerGroupZ.add(textMesh);

            number++; // เพิ่มค่า number ทีละ 1
        }
    });
}

updateRulerZ();
let boxCounter = 1;

let recentColors = []; // รายการเก็บ 10 สีล่าสุด

function getRandomColor() {
    const getValidValue = (excludedValues) => {
        let value;
        do {
            value = Math.floor(Math.random() * 156) + 100; // ค่าสุ่มระหว่าง 100-255
        } while (excludedValues.some(excluded => Math.abs(value - excluded) < 50)); // ตรวจสอบความต่างอย่างน้อย 50
        return value;
    };

    // ฟังก์ชั่นตรวจสอบสีที่แตกต่างจาก 10 สีล่าสุด
    const isDifferentEnough = (newColor, recentColors) => {
        return recentColors.every(color => {
            const diff = newColor.map((value, index) => Math.abs(value - color[index]));
            return diff.some(d => d >= 100); // ให้ความต่างขั้นต่ำที่ 100 หน่วยในแต่ละช่องสี
        });
    };

    let rgb;
    let attempts = 0;

    do {
        // สุ่มตำแหน่งที่กำหนดเป็น 255
        const fixed255Index = Math.floor(Math.random() * 3);

        // สร้าง RGB
        rgb = [0, 0, 0];
        rgb[fixed255Index] = 255; // ช่องที่กำหนดค่าเป็น 255
        const otherIndexes = [0, 1, 2].filter(index => index !== fixed255Index);

        // กำหนดค่าสีที่เหลือโดยตรวจสอบความต่างอย่างน้อย 50
        rgb[otherIndexes[0]] = getValidValue([rgb[fixed255Index]]); // ช่องที่สอง
        rgb[otherIndexes[1]] = getValidValue([rgb[fixed255Index], rgb[otherIndexes[0]]]); // ช่องที่สาม

        // เช็คความแตกต่างกับ 10 สีล่าสุด
        attempts++;
    } while (!isDifferentEnough(rgb, recentColors) && attempts < 10); // จำกัดการลองสุ่มไม่เกิน 10 ครั้ง

    // แปลงค่า RGB เป็น HEX
    const color = rgb.map(value => value.toString(16).padStart(2, '0')).join('');

    // เก็บสีที่สุ่มล่าสุดลงในรายการ
    recentColors.unshift(rgb); // เพิ่มสีที่สุ่มใหม่ที่ต้นรายการ
    if (recentColors.length > 10) {
        recentColors.pop(); // ลบสีเก่าที่สุดเมื่อเก็บครบ 10 สี
    }

    return `#${color}`;
}

function addBox() {

    const randomColor = getRandomColor();
    const newBox = document.createElement("div");
    newBox.className = "box";
    const defaultID = `Box ${boxCounter}`;
    newBox.setAttribute('data-box-id', defaultID);
    newBox.id = defaultID;

    newBox.style.margin = "10px 0";
    newBox.style.padding = "20px";
    newBox.style.border = "1px solid #ccc";
    newBox.style.borderRadius = "5px";
    newBox.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)"; // เพิ่มเงาให้ดูนุ่มนวล
    newBox.style.background = `linear-gradient(to right, #ffffff 90%, ${randomColor} 10%)`;
    newBox.style.borderTopRightRadius = "15px";
    newBox.style.borderBottomRightRadius = "15px";
    newBox.style.cursor = "pointer";
    newBox.style.position = "relative"; // สำหรับจัดตำแหน่งแถบสี

    const boxContent = document.createElement("div");
    boxContent.style.marginRight = "50px";
    boxContent.innerHTML = `
        <div style="font-family: 'Arial', sans-serif; color: #333;"><strong>${defaultID}</strong></div>
        <div style="font-family: 'Arial', sans-serif; font-size:16px; color: #666;">100cm x 100cm x 100cm x 10kg x 1unit</div>
    `;
    newBox.appendChild(boxContent);
    document.getElementById("boxContent").appendChild(newBox);
    const editForm = document.createElement("div");
    editForm.className = "editForm";
    editForm.style.display = "none";
    editForm.style.marginLeft = "50px"; 
    editForm.style.marginTop = "15px";
    newBox.appendChild(editForm);

    // สร้าง input fields สำหรับแก้ไขข้อมูล
    const idInput = createInput('Item Name:', defaultID);
    const widthInput = createInput('Width(cm):', '100');
    const lengthInput = createInput('Length(cm):', '100');
    const heightInput = createInput('Height(cm):', '100');
    const weightInput = createInput('Weight(kg):', '10');
    const quantityInput = createInput('Count:', '1');
    const colorInput = createColorInput('', randomColor);

    // สร้างปุ่มบันทึกและลบ
    const saveButton = document.createElement("button");
    saveButton.innerHTML = '✓'; // เปลี่ยนเป็นเครื่องหมายถูก
    saveButton.style.backgroundColor = '#3b82f6'; // สีฟ้า
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '8px';
    saveButton.style.padding = '8px 16px';
    saveButton.style.fontSize = '18px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.marginTop = '10px';

    saveButton.addEventListener('click', function() {
        const newID = idInput.querySelector('input').value.trim();
        newBox.setAttribute('data-box-id', newID);
        newBox.id = newID.replace(/\s+/g, '-');
        boxContent.querySelector('strong').textContent = newID;
        saveBoxData(newBox, widthInput, lengthInput, heightInput, weightInput, quantityInput, colorInput, editForm, defaultID);
    });

    // อัพเดท: สไตล์ปุ่มลบ
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '🗑️';
    deleteButton.style.backgroundColor = 'transparent';
    deleteButton.style.border = 'none';
    deleteButton.style.fontSize = '20px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.marginTop = '10px';
    deleteButton.addEventListener('click', function() {
        deleteBox(newBox);
    });

    // เพิ่มองค์ประกอบต่างๆ ลงในฟอร์มแก้ไข
    editForm.appendChild(colorInput);
    editForm.appendChild(idInput);
    editForm.appendChild(widthInput);
    editForm.appendChild(lengthInput);
    editForm.appendChild(heightInput);
    editForm.appendChild(weightInput);
    editForm.appendChild(quantityInput);
    editForm.appendChild(saveButton);
    editForm.appendChild(deleteButton);

    // เพิ่ม event listener สำหรับการคลิก
    newBox.addEventListener('click', function(event) {
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "BUTTON") {
            toggleEditForm(editForm);
        }
    });

    document.getElementById("boxContent").appendChild(newBox);
    boxCounter++;
}

function savelist() {
    const containerNameInput = document.getElementById('container-name');
    const nameInput = containerNameInput.value.trim();
    const boxes = document.querySelectorAll('.box'); 
    const SaveDataList = [];
    
    // ดึงชื่อ container จาก footer หรือ input
    const containerDisplayName = document.querySelector('#FooterDetails td:nth-child(2) div:first-child')?.innerText.trim();
    const namecontainer = containerDisplayName;

    // ใช้ userId ที่ส่งมาจาก server
    const userId = window.userId; // ดึง userId ที่เรากำหนดไว้ใน script

    boxes.forEach((box) => {
        const boxId = box.getAttribute('data-box-id');
        const text = box.querySelector('div').innerText;
        const dimensions = text.match(/(\d+(.\d+)?)cm/g)?.map(dim => parseFloat(dim.replace('cm', ''))); 
        const weight = parseFloat(text.match(/(\d+(.\d+)?)kg/)?.[1]) || 0;
        const quantity = parseInt(text.match(/(\d+)unit/)?.[1]) || 0;
        const color = box.querySelector('input[type="color"]').value;

        SaveDataList.push({
            userId, // 🔹 เพิ่ม userId เพื่อเชื่อมโยงข้อมูลกับผู้ใช้
            namecontainer,  
            nameInput,  
            boxId,
            width: dimensions?.[0] || 0,
            length: dimensions?.[1] || 0,
            height: dimensions?.[2] || 0,
            weight,
            quantity,
            color,
            createdDate: new Date().toISOString(),
        });
    });

    fetch('/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(SaveDataList),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Data saved successfully!");
            containerNameInput.value = "";
        } else {
            alert(`❌ Error: ${data.message}`); // แจ้งเตือนหากชื่อซ้ำกัน
        }
    })
    .catch(error => {
        console.error('Error saving data:', error);
        alert("⚠ An error occurred while saving data.");
    });   
}


function createInput(labelText, defaultValue) {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.style.fontSize = '14px';
    label.style.color = '#666';
    label.style.marginRight = '8px'; // เพิ่มระยะห่างระหว่างป้ายกำกับกับช่องกรอก
    label.style.minWidth = '80px'; // กำหนดความกว้างขั้นต่ำให้ป้ายกำกับ
    label.style.display = 'inline-block'; // ทำให้ label อยู่ในแนวนอน

    const input = document.createElement("input");
    input.type = "text";
    input.value = defaultValue;
    input.style.width = '80px'; // ลดขนาดความกว้างของช่องกรอก
    input.style.padding = '8px 12px';
    input.style.border = '1px solid #e2e8f0';
    input.style.borderRadius = '8px';
    input.style.fontSize = '14px';
    input.style.backgroundColor = '#f8fafc';

    const container = document.createElement("div");
    container.style.display = 'inline-block'; // เปลี่ยนเป็น inline-block เพื่อให้อยู่ในแนวนอน
    container.style.marginRight = '15px'; // เพิ่มระยะห่างระหว่างแต่ละช่องกรอก
    container.style.marginBottom = '10px';
    container.style.verticalAlign = 'top'; // จัดให้อยู่ชิดบน

    container.appendChild(label);
    container.appendChild(input);

    input.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    return container;
}

function createColorInput(labelText, defaultValue) {
    const label = document.createElement("label");
    label.textContent = labelText;
    
    const input = document.createElement("input");
    input.type = "color";
    input.value = defaultValue;
    input.style.width = '40px';
    input.style.height = '40px';
    input.style.padding = '2px';
    input.style.border = 'none';
    input.style.borderRadius = '4px';
    input.style.verticalAlign = 'middle';
    
    const container = document.createElement("div");
    container.style.display = 'inline-block';
    container.style.marginRight = '15px';
    container.style.marginBottom = '10px';
    container.style.verticalAlign = 'top';
    
    container.appendChild(input);
    
    input.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    return container;
}

function toggleEditForm(editForm) {
    // ทำการซ่อนหรือแสดงฟอร์มแก้ไข
    if (editForm.style.display === "none") {
        editForm.style.display = "block";
    } else {
        editForm.style.display = "none";
    }
}

function deleteBox(boxElement) {
    // ลบ box ออกจาก DOM
    boxElement.remove();
}

let boxModels = []; // ตัวแปรเก็บโมเดล 3D ที่สร้างขึ้น
let createdModels = [];  // ตัวแปรเก็บโมเดล 3D ที่สร้างขึ้น

// ฟังก์ชันสำหรับอัปเดตข้อมูลฟุตเตอร์
function updateFooterContent(boxDataArray) {
    const FooterDetailsElement = document.getElementById('FooterDetails'); // อ้างอิงฟุตเตอร์
    let FooterDetailsHTML = ""; // ตัวแปรสำหรับเก็บข้อมูล HTML

    boxDataArray.forEach((boxData, index) => {
        const { width, length, height, weight, quantity, color } = boxData;

        // เพิ่มข้อมูลเข้า HTML
        FooterDetailsHTML += `
            <p>Box ${index + 1}:</p>
            <ul>
                <li>Width: ${width}</li>
                <li>Length: ${length}</li>
                <li>Height: ${height}</li>
                <li>Weight: ${weight} kg</li>
                <li>Quantity: ${quantity}</li>
                <li>Color: <span style="display:inline-block; width:20px; height:20px; background-color:${color}; border:1px solid #000;"></span></li>
            </ul>
        `;
    });

    // อัปเดตข้อมูลในฟุตเตอร์
    if (FooterDetailsHTML) {
        FooterDetailsElement.innerHTML = FooterDetailsHTML;
        document.getElementById('FooterContent').classList.add('show'); // แสดงฟุตเตอร์
    } else {
        FooterDetailsElement.innerHTML = "No data available";
        document.getElementById('FooterContent').classList.remove('show'); // ซ่อนฟุตเตอร์
    }
}

function manageAction() {
    // ลบโมเดลเก่าทั้งหมด
    clearPreviousModels();

    const boxes = document.querySelectorAll('.box'); // ดึงทุก box ที่มีอยู่ใน DOM
    const boxDataArray = []; // ตัวแปรเก็บข้อมูลกล่องทั้งหมด

    boxes.forEach((box) => {
        // ดึงข้อมูลจากแต่ละ box
        const boxId = box.getAttribute('data-box-id'); // ดึง ID จาก data-box-id
        const text = box.querySelector('div').innerText;

        // ใช้ Regular Expression เพื่อดึงค่ากว้าง ยาว สูง น้ำหนัก และจำนวน
        const dimensions = text.match(/(\d+(.\d+)?)cm/g)?.map(dim => parseFloat(dim.replace('cm', '')));
        const weight = parseFloat(text.match(/(\d+(.\d+)?)kg/)?.[1]);
        const quantity = parseInt(text.match(/(\d+)unit/)?.[1]);

        // ดึงค่าสีจาก input[type="color"]
        const color = box.querySelector('input[type="color"]').value;

        // เพิ่มข้อมูลแต่ละกล่องเข้า array
        boxDataArray.push({
            boxId,
            width: dimensions?.[0] ||0,
            length: dimensions?.[1] ||0,
            height: dimensions?.[2] ||0,
            weight: weight||0,
            quantity: quantity|| 0,
            color,
        });
    });

    // เรียกใช้ placeBoxesFromInside ด้วยข้อมูลกล่องที่ได้
    placeBoxesFromInside(boxDataArray);
}

function create3DModel(width, length, height, x, y, z, color, boxId) {
    // ฟังก์ชันสร้างพื้นผิวข้อความพร้อมพื้นหลัง
    function createTextTexture(text, boxColor, fontSize) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = 512;
        canvas.height = 512;

        // เติมสีพื้นหลังให้เหมือนกล่อง
        context.fillStyle = boxColor; // ใช้สีเดียวกับกล่อง
        context.fillRect(0, 0, canvas.width, canvas.height);

        // ตั้งค่าฟอนต์และสีของข้อความ
        context.font = `bold ${fontSize || 64}px Arial`;
        context.fillStyle = '#000000'; // สีของตัวอักษร (ดำ)
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // วาดข้อความไว้ตรงกลาง Canvas
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        // สร้าง Texture จาก Canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        return texture;
    }

    // สร้างพื้นผิวข้อความด้วยชื่อ boxId สำหรับแต่ละด้าน
    const textTextureFront = createTextTexture(boxId, color,128);  // ด้านหน้า
    const textTextureBack = createTextTexture(boxId, color, 128);   // ด้านหลัง
    const textTextureTop = createTextTexture(boxId, color, 128);    // ด้านบน
    const textTextureBottom = createTextTexture(boxId, color, 128); // ด้านล่าง
    const textTextureLeft = createTextTexture(boxId, color, 128);   // ด้านซ้าย
    const textTextureRight = createTextTexture(boxId, color, 128);  // ด้านขวา

    // สร้างวัสดุสำหรับแต่ละด้านของกล่อง
    const materials = [
        new THREE.MeshBasicMaterial({ map: textTextureFront }),  // ด้านหน้า
        new THREE.MeshBasicMaterial({ map: textTextureBack }),   // ด้านหลัง
        new THREE.MeshBasicMaterial({ map: textTextureTop }),    // ด้านบน
        new THREE.MeshBasicMaterial({ map: textTextureBottom }), // ด้านล่าง
        new THREE.MeshBasicMaterial({ map: textTextureLeft }),   // ด้านซ้าย
        new THREE.MeshBasicMaterial({ map: textTextureRight }),  // ด้านขวา
    ];

    // สร้างกล่อง
    const geometry = new THREE.BoxGeometry(width, height, length);
    const cube = new THREE.Mesh(geometry, materials);

    cube.position.set(x, y + height / 2, z);

    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const line = new THREE.LineSegments(edges, edgeMaterial);
    line.position.set(x, y + height / 2, z);

    scene.add(cube);
    scene.add(line);

    createdModels.push(cube);
    createdModels.push(line);
}

function clearPreviousModels() {
    // ลบโมเดลเก่าที่มีอยู่ใน createdModels
    createdModels.forEach(model => {
        scene.remove(model);  // ลบจาก scene
    });
    createdModels = [];  // รีเซ็ต array ของโมเดล
}

function saveBoxData(boxElement, widthInput, lengthInput, heightInput, weightInput, quantityInput, colorInput, editForm, defaultID) {
    const boxId = boxElement.getAttribute('data-box-id');  // รับข้อมูล boxId

    // ดึงค่าที่กรอกใน input fields
    const newWidth = parseFloat(widthInput.querySelector("input").value);
    const newLength = parseFloat(lengthInput.querySelector("input").value);
    const newHeight = parseFloat(heightInput.querySelector("input").value);
    const newWeight = parseFloat(weightInput.querySelector("input").value);
    const newQuantity = parseInt(quantityInput.querySelector("input").value);
    const newColor = colorInput.querySelector("input").value; // ดึงสีใหม่ที่เลือก
    
    // อัปเดตข้อมูลใน boxContent
    const boxContent = boxElement.querySelector("div");
    boxContent.innerHTML = `
        <div style="font-family: 'Arial', sans-serif; color: #333;"><strong>${boxId}</strong></div>
        <div style="font-family: 'Arial', sans-serif; font-size:16px; color: #666;">${newWidth}cm x ${newLength}cm x ${newHeight}cm x ${newWeight}kg x ${newQuantity}unit</div>
    `;
    boxElement.style.background = `linear-gradient(to right, #ffffff 90%, ${newColor} 10%)`;
    // อัปเดตโมเดล 3D ใน boxModels
    const box3D = boxModels[boxId - 1];  // ดึงโมเดลที่ตรงกับ boxId
    if (box3D) {
        box3D.geometry.dispose();  // ลบ geometry เก่า
        box3D.geometry = new THREE.BoxGeometry(newWidth, newHeight, newLength);  // อัปเดต geometry ใหม่
        box3D.material.color.set(newColor);
    }
    console.log(`Updated ID : ${boxId} ,Width = ${newWidth.toFixed(2)} m, Length = ${newLength.toFixed(2)} m, Height = ${newHeight.toFixed(2)} m, Weight = ${newWeight.toFixed(2)} kg, Quantity = ${newQuantity}`);

    editForm.style.display = "none";
}

function placeBoxesFromInside(boxes) {
    if (!currentContainerId) {
        console.error("No container selected. Please load a container first.");
        return;
    }
    if (!Array.isArray(boxes)) {
        console.error("Expected 'boxes' to be an array, but got:", boxes);
        return;
    }

    const container = containerData.find(c => c.id === currentContainerId);
    if (!container) {
        console.error(`Container with ID ${currentContainerId} not found.`);
        return;
    }

    const ConWidth = container.length * 5;
    const ConHeight = container.height * 5;
    const ConDepth = container.width * 5;
    const ConCap = container.weightCapacity;
    let totalWeight = 0;
    let placedBoxes = 0;
    let unplacedBoxes = 0;

    const occupiedSpace = [];
    const placedBoxesData = [];

    let currentX = -ConWidth / 2;
    let currentY = gridHelper.position.y;
    let currentZ = -ConDepth / 2;

    // เรียงกล่องตามขนาดพื้นที่ (กว้าง x ยาว) จากมากไปน้อย
    boxes.sort((a, b) => {
        const areaA = parseFloat(a.width) * parseFloat(a.length);
        const areaB = parseFloat(b.width) * parseFloat(b.length);
        return areaB - areaA;
    });

    boxes.forEach((box) => {
        const boxId = box.boxId;
        const boxWidth = parseFloat(box.width) / 20;
        const boxLength = parseFloat(box.length) / 20;
        const boxHeight = parseFloat(box.height) / 20;
        const boxWeight = parseFloat(box.weight);
        const boxColor = box.color || "#808080";

        for (let i = 0; i < box.quantity; i++) {
            if (totalWeight + boxWeight > ConCap) {
                console.warn(`ไม่สามารถวางกล่องที่ ${i + 1}/${box.quantity} ได้ เนื่องจากเกินน้ำหนักที่กำหนด!`);
                unplacedBoxes++;
                return;
            }

            let placed = false;

            // ฟังก์ชันตรวจสอบการชนกัน
            const checkCollision = (x, y, z, width, length, height) => {
                return occupiedSpace.some((space) =>
                    x < space.x + space.width &&
                    x + width > space.x &&
                    z < space.z + space.length &&
                    z + length > space.z &&
                    y < space.y + space.height &&
                    y + height > space.y
                );
            };

            // ฟังก์ชันตรวจสอบว่าสามารถวางกล่องซ้อนบนกล่องฐานได้หรือไม่
            const canStackOnBase = (baseBox, newWidth, newLength, newWeight) => {
                return newWidth <= baseBox.width && newLength <= baseBox.length && newWeight <= baseBox.weightCapacity;
            };

            // ฟังก์ชันหาความสูงที่เหมาะสมและกล่องฐานที่เหมาะสม
            const findSuitableBase = (x, z, width, length, weight) => {
                let suitableBase = null;
                let maxY = 0;
            
                // กรองเฉพาะกล่องที่อยู่ในตำแหน่ง x,z ที่ซ้อนทับกัน
                const potentialBases = occupiedSpace.filter(space =>
                    x >= space.x && x + width <= space.x + space.width && // ตรวจสอบความกว้าง
                    z >= space.z && z + length <= space.z + space.length // ตรวจสอบความยาว
                );
            
                // เรียงตามความสูง
                potentialBases.sort((a, b) => (b.y + b.height) - (a.y + a.height));
            
                // หากล่องฐานที่เหมาะสมที่สุด
                for (const base of potentialBases) {
                    if (canStackOnBase(base, width, length, weight)) {
                        suitableBase = base;
                        maxY = base.y + base.height;
                        break;
                    }
                }
            
                return { suitableBase, maxY };
            };

            // หาพื้นที่ว่างที่เล็กที่สุดที่สามารถวางกล่องได้
            let bestX = currentX;
            let bestZ = currentZ;
            let bestY = currentY;
            let minGap = Infinity;
            let bestBase = null;

            // ลองวางกล่องในแต่ละตำแหน่ง
            for (let x = currentX; x + boxWidth <= ConWidth / 2; x += 0.1) {
                for (let z = currentZ; z + boxLength <= ConDepth / 2; z += 0.1) {
                    const { suitableBase, maxY } = findSuitableBase(x, z, boxWidth, boxLength, boxWeight);
                    const baseY = suitableBase ? maxY : currentY;

                    if (baseY + boxHeight <= ConHeight &&
                        !checkCollision(x, baseY, z, boxWidth, boxLength, boxHeight)) {

                        // คำนวณระยะห่างจากกล่องที่มีอยู่แล้ว
                        let totalGap = 0;
                        occupiedSpace.forEach(space => {
                            const xGap = Math.min(
                                Math.abs(x - (space.x + space.width)),
                                Math.abs((x + boxWidth) - space.x)
                            );
                            const zGap = Math.min(
                                Math.abs(z - (space.z + space.length)),
                                Math.abs((z + boxLength) - space.z)
                            );
                            if (xGap < 0 || zGap < 0) {
                                totalGap += xGap + zGap;
                            }
                        });

                        // อัพเดทตำแหน่งที่ดีที่สุด
                        if (totalGap < minGap) {
                            minGap = totalGap;
                            bestX = x;
                            bestZ = z;
                            bestY = baseY;
                            bestBase = suitableBase;
                            if (minGap < 0) break;
                        }
                    }
                }
                if (minGap < 0) break;
            }

            // ถ้าเจอตำแหน่งที่เหมาะสม
            if (minGap !== 0.0000001) {
                // วางกล่อง
                create3DModel(
                    boxWidth,
                    boxLength,
                    boxHeight,
                    bestX + boxWidth / 2,
                    bestY,
                    bestZ + boxLength / 2,
                    boxColor,
                    boxId
                );

                // บันทึกพื้นที่ที่ใช้
                occupiedSpace.push({
                    x: bestX,
                    y: bestY,
                    z: bestZ,
                    width: boxWidth,
                    height: boxHeight,
                    length: boxLength,
                    id: boxId,
                    weightCapacity: boxWeight
                });

                totalWeight += boxWeight;
                placed = true;
                placedBoxes++;

                placedBoxesData.push({
                    id: boxId,
                    width: box.width,
                    length: box.length,
                    height: box.height,
                    weight: boxWeight,
                    color: boxColor,
                    count: i + 1
                });

                console.log(`วางกล่อง ID: ${boxId} สำเร็จ ที่ตำแหน่ง x:${bestX}, y:${bestY}, z:${bestZ}`);

                if (bestBase) {
                    console.log(`วางซ้อนบนกล่อง ID: ${bestBase.id}`);
                } else {
                    console.log('วางบนพื้น');
                }
            }

            if (!placed) {
                console.log(`ไม่สามารถวางกล่อง ID: ${boxId} ได้`);
                unplacedBoxes++;
            }
        }
    });

    footerDetails(currentContainerId, currentContainerId, placedBoxes, unplacedBoxes, totalWeight);
    sessionStorage.setItem("placedBoxesData", JSON.stringify(placedBoxesData));
}

window.cwidth = 1; 
window.clength = 1; 
window.cheight = 3;

let currentContainerId = null;

function loadForms() {
    const formsContainer = document.getElementById('ContainerForms');
    formsContainer.innerHTML = '';

    containerData.forEach((container, index) => {
        const formHtml = `
            <div class="container-wrapper">
                <!-- ส่วนแสดงข้อมูล -->
                <div id="display-${container.id}" class="container-display" onclick="updateCubeSize(${container.id}); event.stopPropagation();">
                    <div class="content">
                        <h4 class="container-name">${container.name || `Container ${index + 1}`}</h4>
                        <div class="dimensions">
                            ${container.width}m x ${container.length}m x ${container.height}m  ${container.weightCapacity}kg
                        </div>
                    </div>
                    <i class="fas fa-edit edit-icon" onclick="toggleForm(${container.id}); event.stopPropagation();"></i>
                </div>
                <!-- ส่วนฟอร์มแก้ไข -->
                <div id="form-${container.id}" class="container-form hidden">
                    <label for="cwidth-${container.id}">Width :</label>
                    <input type="number" id="cwidth-${container.id}" value="${container.width}" onchange="saveData(${container.id});" />
                    
                    <label for="clength-${container.id}">Length :</label>
                    <input type="number" id="clength-${container.id}" value="${container.length}" onchange="saveData(${container.id});" />
                    
                    <label for="cheight-${container.id}">Height :</label>
                    <input type="number" id="cheight-${container.id}" value="${container.height}" onchange="saveData(${container.id});" />
                    
                    <label for="cweight-${container.id}">Weight Capacity (kg):</label>
                    <input type="number" id="cweight-${container.id}" value="${container.weightCapacity}" onchange="saveData(${container.id});" />
                </div>
            </div>
        `;
        formsContainer.innerHTML += formHtml; // เพิ่มฟอร์มใหม่
    });

    // หากมี container ที่มีการเลือกไว้แล้ว ให้แสดงข้อมูลใน footer
    if (containerData.length > 0) {
        footerDetails(containerData[0].id);  // แสดงข้อมูลของ container แรก
    }
}

function saveData(containerId) {
    const width = document.getElementById(`cwidth-${containerId}`).value;
    const length = document.getElementById(`clength-${containerId}`).value;
    const height = document.getElementById(`cheight-${containerId}`).value;
    const weightCapacity = document.getElementById(`cweight-${containerId}`).value;

    const container = containerData.find(c => c.id === containerId);
    if (container) {
        container.width = width;
        container.length = length;
        container.height = height;
        container.weightCapacity = weightCapacity;

        const displayDiv = document.getElementById(`display-${containerId}`);
        displayDiv.querySelector('.dimensions').innerHTML = `
            <p>${width}m x ${length}m x ${height}m x ${weightCapacity}kg</p>
        `;
        footerDetails(containerId); // อัปเดต footer เมื่อบันทึกข้อมูลใหม่
    }
    toggleForm(containerId);
    updateDisplay(containerId);
}

function footerDetails(containerId, currentContainerId, placedBoxes, unplacedBoxes, totalWeight) {
    const footerDetailsDiv = document.getElementById('FooterDetails');
    footerDetailsDiv.innerHTML = ''; // ล้างเนื้อหาก่อนเพิ่มข้อมูลใหม่

    console.log(`Placed Boxes: ${placedBoxes}`);
    console.log(`Unplaced Boxes: ${unplacedBoxes}`);

    const container = containerData.find(c => c.id === containerId);
    if (container) {
        footerDetailsDiv.innerHTML = `
            <!-- TABLE ด้านบน -->
            <table style="border-collapse: collapse; width: 100%; text-align: left; font-size: 13px; background: #f9f9f9; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                <tr style="background-color: #f1f1f1;">
                    <!-- ส่วนที่ 1: ช่องใส่ชื่อบันทึก + ปุ่ม Save -->
                    <td style="width: 100%; padding: 21px 10px 21px 10px; display: flex; align-items: center; border-right: 1px solid #ccc;">
                        <input type="text" id="container-name" placeholder="Container Name" 
                            style="flex: 1; height: 38px; padding: 5px 8px; font-size: 13px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                        <button class="save-button" onclick="savelist();" style="width: 38px; height: 38px; margin-left: 8px; border: none; background-color: #42a6e1; color: white; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                            <i class="bi bi-floppy" style="font-size: 18px;"></i>
                        </button>
                    </td>

                    <!-- ส่วนที่ 2: รายละเอียดของ Container -->
                    <td style="width: 100%; padding: 6px; text-align: center; border-right: 1px solid #ccc;">
                        <div style="font-size: 16px; font-weight: bold; padding-bottom: 4px; border-bottom: 1px solid #ccc;"> 
                            ${container.name || `Container ${containerId}`}
                        </div>
                        <div style="display: flex; justify-content: space-evenly; font-size: 12px; color: #666;">
                            <span style="border-right: 1px solid #ccc; padding: 7px 7px 0px; 0px;">Length: ${container.length} cm</span>
                            <span style="border-right: 1px solid #ccc; padding: 7px 7px 0px; 0px;">Width: ${container.width} cm</span>
                            <span style="border-right: 1px solid #ccc; padding: 7px 7px 0px; 0px;">Height: ${container.height} cm</span>
                            <span style="border-right: 1px solid #ccc; padding: 7px 7px 0px; 0px;">Max Load: ${container.weightCapacity} kg</span>
                            <span style="padding: 7px 7px 0px 0px;">Volume: ${(container.length * container.width * container.height).toFixed(2)} m³</span>
                        </div>
                    </td>

                    <!-- ส่วนที่ 3: ปุ่ม PDF -->
                    <td style="width: 10%; text-align: center; padding: 10px;">
                        <button class="pdf-button" onclick="captureAndSave(${containerId}); window.open('/report', '_blank');" 
                                style="width: 40px; height: 40px; font-size: 23px; border: none; background-color: #42a6e1; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 6px;">
                            <i class="bi bi-filetype-pdf"></i>
                        </button>
                    </td>
                </tr>
            </table>

            <!-- TABLE ด้านล่าง -->
            <table style="width: 100%; text-align: left; font-size: 13px; border-collapse: collapse; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); margin-top: 8px;">
                <tr style="background-color: #f1f1f1;">
                    <td style="padding: 6px; font-weight: bold; width: 40%; border-right: 1px solid #ccc;">
                        Loaded Items: ${placedBoxes} <br>
                        Not Loaded Items: ${unplacedBoxes}
                    </td>
                    <td style="padding: 6px; font-weight: bold; text-align: center;">
                        <div style="margin-bottom: 2px; font-size: 14px; color: #333;">Remaining Weight: ${container.weightCapacity - totalWeight} kg</div>
                        <div style="width: 100%; background-color: #ddd; border-radius: 4px; height: 25px; position: relative;">
                            <div style="width: ${Math.min(totalWeight / container.weightCapacity * 100, 100)}%; background-color: #28a745; height: 100%; border-radius: 4px; transition: width 0.5s ease;">
                                <span style="position: absolute; width: 100%; text-align: center; color: white; font-weight: bold; line-height: 25px;">
                                    ${Math.round(totalWeight / container.weightCapacity * 100)}%
                                </span>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        `;

    } else {
        footerDetailsDiv.innerHTML = '<p>Container not found.</p>';
    }
}

function toggleForm(containerId) {
    const formDiv = document.getElementById(`form-${containerId}`);
    const displayDiv = document.getElementById(`display-${containerId}`);
    formDiv.classList.toggle('hidden');

    // อัปเดตการแสดงข้อมูลใน display div ก่อนแสดงฟอร์ม
    if (formDiv.classList.contains('hidden')) {
        // หากปิดฟอร์มให้แสดงข้อมูลที่อัปเดต
        updateDisplay(containerId);
    } else {
        // ถ้าเปิดฟอร์มก็แสดงข้อมูลใน footer
        footerDetails(containerId);
    }
}

// ฟังก์ชันเพื่ออัปเดตการแสดงข้อมูลใน display div
function updateDisplay(containerId) {
    const container = containerData.find(c => c.id === containerId);
    const displayDiv = document.getElementById(`display-${containerId}`);

    // อัปเดตค่าต่างๆ ที่แสดงใน display div
    displayDiv.querySelector('.dimensions p:nth-child(1)').textContent = `Width: ${container.width} m`;
    displayDiv.querySelector('.dimensions p:nth-child(2)').textContent = `Length: ${container.length} m`;
    displayDiv.querySelector('.dimensions p:nth-child(3)').textContent = `Height: ${container.height} m`;
    displayDiv.querySelector('.dimensions p:nth-child(4)').textContent = `Weight Capacity: ${container.weightCapacity} kg`;

    // แสดงชื่อใหม่ถ้ามีการเปลี่ยนแปลง
    displayDiv.querySelector('h4').textContent = container.name || `Container ${containerId}`;
}



// กำหนดขนาดของ renderer ที่คงที่
renderer.setSize(window.innerWidth, window.innerHeight);

function captureAndSave(containerId) {
    console.log("captureAndSave() is running...");
    console.log("containerId:", containerId);

    // เก็บตำแหน่งและการหมุนของกล้องปัจจุบัน
    const currentPosition = camera.position.clone();
    const currentRotation = camera.rotation.clone();

    // กำหนดมุมที่ต้องการถ่ายภาพตามเงื่อนไข
    let cameraViews;
    const container = containerData.find(c => c.id === containerId); // ค้นหา container ตาม ID
    if (container && container.length >= 12) {
        // ชุดมุมมองกล้องเมื่อ container.length > 12
        cameraViews = [
            { position: [0, 3, 30], rotation: [0, 0, 0] },
            { position: [0, 7, -35], rotation: [-3.08, 0, -3.14] },
            { position: [-40, 5, 1.5], rotation: [-1.5, -1.5, -1.5] },
            { position: [40, 5.9, 0.5], rotation: [-1.5, 1.4, 1.5] },
            { position: [35, 15, 21], rotation: [-0.5, 0.72, 0.37] },
            { position: [38, 15, -16], rotation: [-2.4, 0.82, 2.57] }
        ];
    } else {
        // ชุดมุมมองกล้องเดิม
        cameraViews = [
            { position: [0, 3, 20], rotation: [0, 0, 0] },
            { position: [0, 4, -20], rotation: [-3.08, 0, -3.14] },
            { position: [-25, 5, 0], rotation: [-1.5, -1.5, -1.5] },
            { position: [25, 5.9, 0], rotation: [-1.5, 1.4, 1.5] },
            { position: [25.5, 15.25, 16.5], rotation: [-0.5, 0.77, 0.37] },
            { position: [22.5, 14.45, -11.7], rotation: [-2.4, 0.87, 2.57] }
        ];
    }

    // ทำการวนลูปถ่ายภาพตามมุมมองที่กำหนด
    cameraViews.forEach((view, index) => {
        console.log(`Processing view ${index + 1}`);

        // ตั้งค่าตำแหน่งและการหมุนของกล้องให้เป็นมุมที่ต้องการ
        camera.position.set(...view.position);
        camera.rotation.set(...view.rotation);

        // เรนเดอร์ภาพจากกล้อง
        renderer.render(scene, camera);

        // สร้าง Data URL จาก canvas ของ renderer
        const dataUrl = renderer.domElement.toDataURL('image/png');

        // บันทึกข้อมูลใน sessionStorage โดยใช้คีย์ที่แตกต่างกันสำหรับแต่ละมุม
        sessionStorage.setItem(`sceneImage_${index}`, dataUrl);

        // แสดง log ว่าภาพถูกบันทึกแล้ว
        console.log(`Scene image ${index + 1} saved in sessionStorage.`);
    });

    // กู้คืนตำแหน่งและการหมุนของกล้องกลับมาเหมือนเดิม
    camera.position.copy(currentPosition);
    camera.rotation.copy(currentRotation);
}

footerDetails(); // เรียกครั้งแรกเพื่อแสดงข้อมูลใน footer
loadForms();

// ฟังก์ชันที่บังคับให้หน้าโหลดค้างเป็นเวลา 1 วินาที
window.onload = function() {
    // ใช้ setTimeout เพื่อแสดง loading screen เป็นเวลา 1 วินาที
    setTimeout(function() {
        // ซ่อนหน้า loading screen
        document.getElementById('loadingScreen').style.display = 'none';


    }, 1000);  // 1000 มิลลิวินาที = 1 วินาที
};