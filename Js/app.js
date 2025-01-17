window.onload = function() {
    camera.position.set(20, 20, 20);
    controls.update();
    
    // เรียกใช้ updateRulerX หลังจากสร้าง cube เสร็จ
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
gridHelper.position.y = -2.5;
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
    const otherFluxes = ['ContainerContent', 'boxContent', 'listContent', 'backupContent'].filter(flux => flux !== id);
    const buttons = document.querySelectorAll('.btn');

    otherFluxes.forEach(function (otherFlux) {
        const otherFluxElement = document.getElementById(otherFlux);
        if (otherFluxElement.style.display === 'block') {
            if (otherFlux === 'listContent' || otherFlux === 'backupContent') {
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
        if (id === 'listContent' || id === 'backupContent') {
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
        if (id === 'listContent' || id === 'backupContent') {
            fluxContent.style.animation = 'slideTop 0.5s forwards';
        } else {
            fluxContent.style.animation = 'slideLeft 0.5s forwards';
        }

        buttons.forEach(button => button.classList.remove('active-btn'));
        const activeButton = document.querySelector(button[onclick="toggleFlux('${id}')"]);
        activeButton.classList.add('active-btn');
    }
}
document.getElementById("toggleButton").addEventListener("click", function() {
    const footer = document.getElementById("FooterContent");
    const button = document.getElementById("toggleButton");
    
    // Toggle the bottom value of the footer and button
    if (footer.style.bottom === "0px") {
        footer.style.bottom = "-60px"; // Slide footer down
        button.style.bottom = "95px";  // Keep button in place
    } else {
        footer.style.bottom = "0px";  // Slide footer up
        button.style.bottom = "155px"; // Move button up
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

}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let boxCounter = 1; // ตัวแปรสำหรับนับจำนวน box

function getRandomColor() {
    const letters = '0123456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addBox() {

    // สร้างสีสุ่ม
    const randomColor = getRandomColor();

    // สร้าง div ใหม่สำหรับฟอร์ม
    const newBox = document.createElement("div");
    newBox.className = "box";
    const defaultID = `Box ${boxCounter}`; // ใช้ "Box" แทน "box" และเพิ่มช่องว่าง
    newBox.setAttribute('data-box-id', defaultID); // เพิ่ม ID เริ่มต้น
    newBox.id = defaultID; // ตั้งค่า id ให้กล่อง
    
    // กำหนดสไตล์ให้กับ newBox
    newBox.style.margin = "15px 0";
    newBox.style.padding = "15px";
    newBox.style.border = "1px solid #ccc";
    newBox.style.borderRadius = "5px";
    newBox.style.backgroundColor = "#f9f9f9";
    newBox.style.cursor = "pointer";
    // เพิ่มเหตุการณ์ mouseover และ mouseout เพื่อเปลี่ยนสีพื้นหลัง
    newBox.addEventListener('mouseover', function() {
        newBox.style.backgroundColor = "#e0e0e0";  // เปลี่ยนสีพื้นหลังเมื่อเมาส์ชี้
    });

    newBox.addEventListener('mouseout', function() {
        newBox.style.backgroundColor = "#f9f9f9";  // คืนค่าสีพื้นหลังเมื่อเมาส์ออก
    });

    // ข้อมูลที่แสดงใน box
    const boxContent = document.createElement("div");
    boxContent.innerHTML = `
        <div><strong>${defaultID}</strong></div>
        <div>Width: 1.00 m, Length: 1.00 m, Height: 1.00 m</div>
        <div>Weight: 10.0 kg, Quantity: 1 unit</div>
        <div>Color: ${randomColor}</div> <!-- แสดงสีสุ่ม -->
    `;
    newBox.appendChild(boxContent);

    // เพิ่ม newBox เข้าไปใน div boxContent
    document.getElementById("boxContent").appendChild(newBox);

    // สร้าง div สำหรับฟอร์มแก้ไข
    const editForm = document.createElement("div");
    editForm.className = "editForm";
    editForm.style.display = "none"; // ซ่อนไว้ก่อน
    newBox.appendChild(editForm);

    // สร้าง input fields สำหรับแก้ไขข้อมูล
    const idInput = createInput('Box ID:', defaultID); // Input สำหรับเปลี่ยน ID
    const widthInput = createInput('Width :', '1');
    const lengthInput = createInput('Length :', '1');
    const heightInput = createInput('Height :', '1');
    const weightInput = createInput('Weight :', '10');
    const quantityInput = createInput('Quantity :', '1');
    const colorInput = createColorInput('Color :', randomColor); // เพิ่ม input สีพร้อมค่าเริ่มต้นเป็นสีสุ่ม

    // สร้างปุ่มบันทึกและลบ
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.backgroundColor = "#4CAF50";
    saveButton.style.color = "white";
    saveButton.style.padding = "10px 20px";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "4px";
    saveButton.style.fontSize = "16px";
    saveButton.style.cursor = "pointer";
    saveButton.addEventListener('click', function() {
        // อัปเดตข้อมูล ID ทันทีโดยไม่ตรวจสอบ
        const newID = idInput.querySelector('input').value.trim();
        newBox.setAttribute('data-box-id', newID);
        newBox.id = newID.replace(/\s+/g, '-');
        boxContent.querySelector('strong').textContent = newID;
        saveBoxData(newBox, widthInput, lengthInput, heightInput, weightInput, quantityInput, colorInput, editForm , defaultID);

        // แสดงข้อมูลที่บันทึกใน console log
        console.log('Box Saved:');
        console.log('ID:', newID);
        console.log('Width:', widthInput.querySelector('input').value);
        console.log('Length:', lengthInput.querySelector('input').value);
        console.log('Height:', heightInput.querySelector('input').value);
        console.log('Weight:', weightInput.querySelector('input').value);
        console.log('Quantity:', quantityInput.querySelector('input').value);
        console.log('Color:', colorInput.querySelector('input').value);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor = "#f44336";
    deleteButton.style.color = "white";
    deleteButton.style.padding = "10px 20px";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "4px";
    deleteButton.style.fontSize = "16px";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener('click', function() {
        deleteBox(newBox);
    });

    // เพิ่ม input และปุ่มลงใน editForm
    editForm.appendChild(idInput);
    editForm.appendChild(widthInput);
    editForm.appendChild(lengthInput);
    editForm.appendChild(heightInput);
    editForm.appendChild(weightInput);
    editForm.appendChild(quantityInput);
    editForm.appendChild(colorInput);
    editForm.appendChild(saveButton);
    editForm.appendChild(deleteButton);

    // เพิ่ม event listener สำหรับคลิกที่ box
    newBox.addEventListener('click', function (event) {
        // ตรวจสอบว่าไม่ใช่การคลิกใน input
        if (event.target.tagName !== "INPUT" && event.target.tagName !== "BUTTON") {
            toggleEditForm(editForm);
        }
    });
    
    // เพิ่มตัวเลข boxCounter
    boxCounter++;
}

function createInput(labelText, defaultValue) {
    const label = document.createElement("label");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = "text";
    input.value = defaultValue;
    input.style.width = 'calc(100% - 20px)';
    input.style.padding = '8px';
    input.style.marginTop = '5px';
    input.style.marginBottom = '10px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '5px';
    input.style.boxSizing = 'border-box';

    
    const container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(input);

    // ใช้ stopPropagation เพื่อป้องกันการคลิกที่ input ที่จะไปกระทบกับ event ของ newBox
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
    input.style.width = '100%';
    input.style.padding = '5px';
    input.style.marginTop = '5px';
    input.style.marginBottom = '10px';
    input.style.border = 'none';
    input.style.boxSizing = 'border-box';

    const container = document.createElement("div");
    container.appendChild(label);
    container.appendChild(input);

    input.addEventListener('click', function (event) {
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        const width = parseFloat(box.querySelector('div').innerText.match(/Width: (\d+(\.\d+)?)/)[1]);
        const length = parseFloat(box.querySelector('div').innerText.match(/Length: (\d+(\.\d+)?)/)[1]);
        const height = parseFloat(box.querySelector('div').innerText.match(/Height: (\d+(\.\d+)?)/)[1]);
        const weight = parseFloat(box.querySelector('div').innerText.match(/Weight: (\d+(\.\d+)?)/)[1].replace('kg', ''));
        const quantity = parseInt(box.querySelector('div').innerText.match(/Quantity: (\d+)/)[1]);
        const color = box.querySelector('input[type="color"]').value;
        const countMatch = box.querySelector('div').innerText.match(/Count: (\d+)/);
        const count = countMatch ? parseInt(countMatch[1]) : 0;


        // เพิ่มข้อมูลแต่ละกล่องเข้า array
        boxDataArray.push({ boxId, width, length, height, weight, quantity,color ,count });
        console.log(box.querySelector('div').innerText);
        console.log(`Color: ${color}`); // แสดงค่าสีใน console เพื่อทดสอบ
        console.log(`Box ID: ${boxId}`); // แสดง Box ID ใน console เพื่อทดสอบ

    });

    // เรียกใช้ placeBoxesFromInside ด้วยข้อมูลกล่องที่ได้
    placeBoxesFromInside(boxDataArray);
}

function create3DModel(width, length, height, x, y, z,color) {
    const geometry = new THREE.BoxGeometry(width, height, length);
    const material = new THREE.MeshBasicMaterial({ color: color }); // ใช้ค่าสีจากพารามิเตอร์
    const cube = new THREE.Mesh(geometry, material);

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
        <div><strong>${boxId}</strong></div>
        <div>Width: ${newWidth.toFixed(2)} m, Length: ${newLength.toFixed(2)} m, Height: ${newHeight.toFixed(2)} m</div>
        <div>Weight: ${newWeight.toFixed(1)} kg, Quantity: ${newQuantity} unit </div>
        <div>Color: ${newColor}</div> <!-- แสดงข้อมูลสี -->
    `;

    // อัปเดตโมเดล 3D ใน boxModels
    const box3D = boxModels[boxId - 1];  // ดึงโมเดลที่ตรงกับ boxId
    if (box3D) {
        box3D.geometry.dispose();  // ลบ geometry เก่า
        box3D.geometry = new THREE.BoxGeometry(newWidth, newHeight, newLength);  // อัปเดต geometry ใหม่
        box3D.material.color.set(newColor); // อัปเดตสีของโมเดล
    }
    // แสดงข้อมูลใน log
    console.log(`Updated ID : ${boxId} ,Width = ${newWidth.toFixed(2)} m, Length = ${newLength.toFixed(2)} m, Height = ${newHeight.toFixed(2)} m, Weight = ${newWeight.toFixed(2)} kg, Quantity = ${newQuantity}`);
    // ซ่อนฟอร์มแก้ไขหลังจากบันทึก
    editForm.style.display = "none";
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function placeBoxesFromInside(boxes) {
    if (!currentContainerId) {
        console.error("No container selected. Please load a container first.");
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
    let totalWeight = 0; // น้ำหนักรวมของกล่องทั้งหมด
    let placedBoxes = 0; // ตัวแปรสำหรับเก็บจำนวนกล่องที่วางได้
    let unplacedBoxes = 0; // ตัวแปรสำหรับเก็บจำนวนกล่องที่วางไม่ได้
    console.log(`Place - Width: ${container.width}, Length: ${container.height}, Height: ${container.length}, Cap: ${container.weightCapacity}`);
    console.log(`Place - Width: ${ConWidth}, Length: ${ConDepth}, Height: ${ConHeight}, Cap: ${ConCap}, TotalCap: ${totalWeight}`);
    console.log(`Placing boxes inside container ID: ${currentContainerId}`);

    const occupiedSpace = []; // เก็บพื้นที่ที่ถูกใช้งาน
    const placedBoxesData = []; // เก็บข้อมูลของกล่องที่วางได้

    let currentX = -ConWidth / 2;
    let currentY = gridHelper.position.y;
    let currentZ = -ConDepth / 2;

    // เรียงลำดับกล่องจากขนาดใหญ่ไปเล็ก
    boxes.sort((a, b) => (b.width * b.length * b.height) - (a.width * a.length * a.height));

        boxes.forEach((box) => {
            const boxId = box.boxId; // ดึง Box ID
            const boxWidth = parseFloat(box.width) * 5;
            const boxLength = parseFloat(box.length) * 5;
            const boxHeight = parseFloat(box.height) * 5;
            const boxWeight = parseFloat(box.weight); // น้ำหนักของกล่อง
            const boxColor = box.color || "#808080"; // ใช้สีจากฟอร์มหรือค่าเริ่มต้น (เทา)
            let boxPlacedCount = 0; // จำนวนกล่องที่วางได้ในรอบนี้
            console.log(`CapacityContainer: ${ConCap}`);
            console.log(`Placing Box with ID: ${boxId}`); // แสดง Box ID ที่กำลังจะวาง

        for (let i = 0; i < box.quantity; i++) {
            // ตรวจสอบว่าน้ำหนักรวมเกิน ConCap หรือไม่
            if (totalWeight + boxWeight > ConCap) {
                console.warn(`ไม่สามารถวางกล่องที่ ${i + 1}/${box.quantity} ได้ เนื่องจากเกินน้ำหนักที่กำหนด!`);
                unplacedBoxes++;
                return;
            }
            let placed = false;

            // พยายามวางกล่องบนพื้นที่ด้านบนของกล่องที่มีอยู่
            for (let baseBox of occupiedSpace) {
                const baseX = baseBox.x;
                const baseY = baseBox.y + baseBox.height; // ความสูงด้านบนของฐาน
                const baseZ = baseBox.z;

                // ตรวจสอบว่าเราสามารถวางกล่องบนฐานนี้ได้หรือไม่
                for (let xOffset = 0; xOffset + boxWidth <= baseBox.width; xOffset += boxWidth) {
                    for (let zOffset = 0; zOffset + boxLength <= baseBox.length; zOffset += boxLength) {
                        const newX = baseX + xOffset;
                        const newZ = baseZ + zOffset;

                        // ตรวจสอบขอบเขตไม่ให้กล่องเกินคอนเทนเนอร์
                        if (newX + boxWidth <= ConWidth / 2 && newZ + boxLength <= ConDepth / 2 && baseY + boxHeight <= ConHeight / 2) {
                            const collision = occupiedSpace.some((space) =>
                                newX < space.x + space.width &&
                                newX + boxWidth > space.x &&
                                newZ < space.z + space.length &&
                                newZ + boxLength > space.z &&
                                baseY < space.y + space.height &&
                                baseY + boxHeight > space.y
                            );

                            if (!collision) {
                                // วางกล่องที่ตำแหน่งนี้
                                create3DModel(
                                    boxWidth,
                                    boxLength,
                                    boxHeight,
                                    newX + boxWidth / 2,
                                    baseY,
                                    newZ + boxLength / 2,
                                    boxColor // ส่งสีไปยัง create3DModel
                                );
                                // อัปเดตน้ำหนักรวม
                                totalWeight += boxWeight;

                                // แสดงใน console
                                console.log(`วางกล่องสำเร็จ! กล่องที่ ${i + 1}/${box.quantity}`);
                                console.log(`น้ำหนักรวม: ${totalWeight}, น้ำหนักกล่อง: ${boxWeight}`);

                                occupiedSpace.push({
                                    x: newX,
                                    y: baseY,
                                    z: newZ,
                                    width: boxWidth,
                                    height: boxHeight,
                                    length: boxLength,
                                });
                                placed = true;
                                boxPlacedCount++;
                                placedBoxes++; // เพิ่มจำนวนกล่องที่วางได้
                                break;
                            }
                        }
                    }
                    if (placed) break;
                }
                if (placed) break;
            }

            if (!placed) {
                for (let x = currentX; x + boxWidth <= ConWidth / 2; x += boxWidth) {
                    for (let z = currentZ; z + boxLength <= ConDepth / 2; z += boxLength) {
                        for (let y = currentY; y + boxHeight <= ConHeight / 2; y += boxHeight) {
                            const collision = occupiedSpace.some((space) =>
                                x < space.x + space.width &&
                                x + boxWidth > space.x &&
                                z < space.z + space.length &&
                                z + boxLength > space.z &&
                                y < space.y + space.height &&
                                y + boxHeight > space.y
                            );

                            
                            if (x + boxWidth <= ConWidth / 2 && z + boxLength <= ConDepth / 2 && y + boxHeight <= ConHeight / 2 && !collision) {
                                create3DModel(
                                    boxWidth,
                                    boxLength,
                                    boxHeight,
                                    x + boxWidth / 2,
                                    y,
                                    z + boxLength / 2,
                                    boxColor 
                                );

                                occupiedSpace.push({
                                    x,
                                    y,
                                    z,
                                    width: boxWidth,
                                    height: boxHeight,
                                    length: boxLength,
                                });
                                placed = true;

                                // อัปเดตน้ำหนักรวม
                                totalWeight += boxWeight;
                                boxPlacedCount++;

                                // แสดงใน console
                                console.log(`วางกล่องสำเร็จ! กล่องที่ ${i + 1}/${box.quantity}`);
                                console.log(`น้ำหนักรวม: ${totalWeight}, น้ำหนักกล่อง: ${boxWeight}`);

                                // เก็บข้อมูลกล่องใน placedBoxesData พร้อมกับจำนวนกล่อง
                                placedBoxesData.push({
                                    id: box.boxId,
                                    width: box.width,
                                    length: box.length,
                                    height: box.height,
                                    weight: box.weight,
                                    color: boxColor,
                                    count: ++box.count
                                });
                                // เพิ่มกล่องที่วางได้ใน placedBoxesData
                                break;
                            }
                        }
                        if (placed) break;
                    }
                    if (placed) break;
                }
            }

            // เพิ่มคอลัมน์ใหม่ถ้ายังมีพื้นที่ว่าง
            if (!placed) {
                for (let baseBox of occupiedSpace) {
                    const baseX = baseBox.x;
                    const baseY = baseBox.y + baseBox.height; // ความสูงด้านบนของฐาน
                    const baseZ = baseBox.z;

                    // ตรวจสอบว่าเราสามารถเพิ่มคอลัมน์ได้
                    if (baseY + boxHeight <= ConHeight / 2) {
                        for (let xOffset = 0; xOffset + boxWidth <= baseBox.width; xOffset += boxWidth) {
                            for (let zOffset = 0; zOffset + boxLength <= baseBox.length; zOffset += boxLength) {
                                const newX = baseX + xOffset;
                                const newZ = baseZ + zOffset;

                                // ตรวจสอบขอบเขตไม่ให้กล่องเกินคอนเทนเนอร์
                                if (newX + boxWidth <= ConWidth / 2 && newZ + boxLength <= ConDepth / 2 && baseY + boxHeight <= ConHeight / 2) {
                                    const collision = occupiedSpace.some((space) =>
                                        newX < space.x + space.width &&
                                        newX + boxWidth > space.x &&
                                        newZ < space.z + space.length &&
                                        newZ + boxLength > space.z &&
                                        baseY < space.y + space.height &&
                                        baseY + boxHeight > space.y
                                    );

                                    if (!collision) {
                                        // วางกล่องที่ตำแหน่งนี้
                                        create3DModel(
                                            boxWidth,
                                            boxLength,
                                            boxHeight,
                                            newX + boxWidth / 2,
                                            baseY,
                                            newZ + boxLength / 2
                                        );

                                        occupiedSpace.push({
                                            x: newX,
                                            y: baseY,
                                            z: newZ,
                                            width: boxWidth,
                                            height: boxHeight,
                                            length: boxLength,
                                        });
                                        placed = true;
                                        boxPlacedCount++;

                                        // อัปเดตน้ำหนักรวม
                                        totalWeight += boxWeight;

                                        // แสดงใน console
                                        console.log(`วางกล่องสำเร็จ! กล่องที่ ${i + 1}/${box.quantity}`);
                                        console.log(`น้ำหนักรวม: ${totalWeight}, น้ำหนักกล่อง: ${boxWeight}`);

                                        break;
                                    }
                                }
                            }
                            if (placed) break;
                        }
                    }
                    if (placed) break;
                }
            }

            if (!placed) {
                console.log("พื้นที่ไม่เพียงพอสำหรับวางกล่อง");
                unplacedBoxes++; // เพิ่มจำนวนกล่องที่วางไม่ได้
            }
        }
    });
    footerDetails(currentContainerId, currentContainerId,placedBoxes, unplacedBoxes,totalWeight);

    // ก่อนที่จะเก็บข้อมูลใน sessionStorage
    console.log("ข้อมูลที่เก็บใน placedBoxesData:", placedBoxesData);
    // เก็บข้อมูล placedBoxesData ใน sessionStorage
    sessionStorage.setItem("placedBoxesData", JSON.stringify(placedBoxesData));
    // หลังจากเก็บข้อมูลแล้ว สามารถดึงข้อมูลออกมาแสดงใน console ได้
    const storedData = JSON.parse(sessionStorage.getItem("placedBoxesData"));
    console.log("ข้อมูลที่เก็บไว้ใน sessionStorage:", storedData);
    // แสดงผลรวมใน console

    console.log(`จำนวนกล่องที่วางได้: ${placedBoxes}`);
    console.log(`จำนวนกล่องที่วางไม่ได้: ${unplacedBoxes}`);
    console.log(`Box ID: ${box.id}`);
    // เรียกฟังก์ชัน footerDetails พร้อมส่งค่าตัวแปร
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// กำหนดตัวแปรทั่วโลกสำหรับใช้ในฟังก์ชันอื่น
window.cwidth = 1; 
window.clength = 1; 
window.cheight = 3;

// ตัวแปร global สำหรับเก็บ ID ของคอนเทนเนอร์ที่กำลังใช้งานอยู่
let currentContainerId = null;

function loadForms() {
    const formsContainer = document.getElementById('ContainerForms');
    formsContainer.innerHTML = ''; // ล้างเนื้อหาก่อนสร้างใหม่

    containerData.forEach((container, index) => {
        const formHtml = `
            <div class="container-wrapper">
                <!-- ส่วนแสดงข้อมูล -->
                <div id="display-${container.id}" class="container-display" onclick="toggleForm(${container.id})">
                    <h4>${container.name || `Container ${index + 1}`}</h4>
                    <div class="dimensions">
                        <p>Width: ${container.width} m</p>
                        <p>Length: ${container.length} m</p>
                        <p>Height: ${container.height} m</p>
                        <p>Weight Capacity: ${container.weightCapacity} kg</p>
                    </div>
                    <button onclick="updateCubeSize(${container.id}); event.stopPropagation();">Load</button>
                </div>
                <!-- ส่วนฟอร์มแก้ไข -->
                <div id="form-${container.id}" class="container-form hidden">
                    <label for="cwidth-${container.id}">Width :</label>
                    <input type="number" id="cwidth-${container.id}" value="${container.width}" />
                    <label for="clength-${container.id}">Length :</label>
                    <input type="number" id="clength-${container.id}" value="${container.length}" />
                    <label for="cheight-${container.id}">Height :</label>
                    <input type="number" id="cheight-${container.id}" value="${container.height}" />
                    <label for="cweight-${container.id}">Weight Capacity (kg):</label>
                    <input type="number" id="cweight-${container.id}" value="${container.weightCapacity}" />
                    <button onclick="saveData(${container.id}); event.stopPropagation();">Save</button>
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
            <p>Width: ${width} m</p>
            <p>Length: ${length} m</p>
            <p>Height: ${height} m</p>
            <p>Weight Capacity: ${weightCapacity} kg</p>
        `;
        footerDetails(containerId); // อัปเดต footer เมื่อบันทึกข้อมูลใหม่
    }

    toggleForm(containerId); // ซ่อนฟอร์มหลังบันทึก
}

function footerDetails(containerId,currentContainerId, placedBoxes, unplacedBoxes,totalWeight) {
    const footerDetailsDiv = document.getElementById('FooterDetails');
    footerDetailsDiv.innerHTML = ''; // ล้างเนื้อหาก่อนเพิ่มข้อมูลใหม่
    
    console.log(`Placed Boxes: ${placedBoxes}`);
    console.log(`Unplaced Boxes: ${unplacedBoxes}`);

    const container = containerData.find(c => c.id === containerId);
    if (container) {
        footerDetailsDiv.innerHTML = `
            <table border="1" style="border-collapse: collapse; width: 80%; text-align: left; font-size: 12px; margin: auto; margin-top: 2px; border: 2px solid black;">
                <tr style="border-bottom: 2px solid black;">
                    <td colspan="4" style="text-align: center; font-weight: bold; padding: 2px; border: 2px solid black;">
                        ${container.name || `Container ${containerId}`}
                    </td>
                    <td rowspan="2" style="border: 2px solid black; padding: 10px; text-align: center;">
                        <button onclick="captureAndSave(${containerId}); window.open('/report', '_blank');" style="font-size: 24px; padding: 10px; border: none; background-color: transparent;">
                        <i class="bi bi-filetype-pdf"></i>
                    </button>
                    </td>
                </tr>
                <tr>
                    <td style="border: 2px solid black; padding: 10px;">Width: ${container.width} m</td>
                    <td style="border: 2px solid black; padding: 10px;">Length: ${container.length} m</td>
                    <td style="border: 2px solid black; padding: 10px;">Height: ${container.height} m</td>
                    <td style="border: 2px solid black; padding: 10px;">Weight Capacity: ${container.weightCapacity} kg</td>
                </tr>
                
            </table>

        <table style="width: 500px; text-align: left; font-size: 14px; margin-left: auto; margin-right: auto; margin-top: 7px;">
            <tr>
                <td style="border: 2px solid black; padding: 10px; font-weight: bold; line-height: 1.2; width: 40%;">
                    Loaded Boxes: ${placedBoxes} Box <br>
                    Unloaded Boxes: ${unplacedBoxes} Box
                </td>
                <td style="border: 2px solid black; padding: 10px; font-weight: bold; line-height: 1;">
                    <div style="margin-bottom: 20px; text-align: center;"> remaining weight : ${container.weightCapacity - totalWeight} kg </div>

                    <div style="width: 100%; background-color: rgb(177, 177, 177); border-radius: 5px; height: 20px; margin-top: -12px;">
                        <div style="width: ${Math.min(totalWeight / container.weightCapacity * 100, 100)}%; background-color: #4caf50; height: 100%; border-radius: 5px;">
                            <span style="color: white; font-weight: bold; text-align: center; line-height: 20px; display: block;">
                                ${Math.round(totalWeight / container.weightCapacity * 100)}%<br>
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
    formDiv.classList.toggle('hidden');
    // อัปเดต footer ให้แสดงข้อมูลจาก container ที่ถูกเลือก
    if (!formDiv.classList.contains('hidden')) {
        footerDetails(containerId); // แสดงข้อมูลใน footer เมื่อเปิดฟอร์ม
    }
}   


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

        // แสดงเนื้อหาหลัก
        document.getElementById('content').style.display = 'block';
    }, 1000);  // 1000 มิลลิวินาที = 1 วินาที
};