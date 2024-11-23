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

const gridSize = 100;
const gridDivisions = gridSize / 5; 
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xe3e3e3, 0xe3e3e3); // กริดสีฟ้า
gridHelper.rotation.y = -Math.PI / 2; 
gridHelper.position.y = -2.5;
gridHelper.position.x = -2.5;
gridHelper.position.z = -2.5;
scene.add(gridHelper);

function animate() {
    requestAnimationFrame(animate);
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

// สร้างกล่อง (Cube) พร้อมความโปร่งใส
const geometry = new THREE.BoxGeometry(15,5,5);
const material = new THREE.MeshBasicMaterial({ color: 0xcfd8ff, transparent: true, opacity: 0.5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// เพิ่มเส้นขอบให้กับ Cube
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const line = new THREE.LineSegments(edges, lineMaterial);
scene.add(line);

// สร้าง Cube ที่สอง (สีเข้มกว่า)
const darkerMaterial = new THREE.MeshBasicMaterial({ color: 0x32343d, transparent: true, opacity: 0.5 });
const darkerCubeGeometry = new THREE.BoxGeometry(15, 0.1, 5); // ขนาด y เป็น 0.2
const darkerCube = new THREE.Mesh(darkerCubeGeometry, darkerMaterial);
darkerCube.position.set(0, gridHelper.position.y - 0.1, 0); // เริ่มต้นใต้ Grid
scene.add(darkerCube);

// กำหนดตำแหน่งให้ Cube ใหม่นี้อยู่ใต้ grid เล็กน้อย
darkerCube.position.y = gridHelper.position.y - 0;

function updateCubeSize() {
    const newWidth = parseFloat(document.getElementById('width').value);
    const newHeight = parseFloat(document.getElementById('height').value);
    const newDepth = parseFloat(document.getElementById('depth').value);

    // อัปเดต Cube
    cube.geometry.dispose();
    cube.geometry = new THREE.BoxGeometry(newWidth, newHeight, newDepth);
    cube.position.y = gridHelper.position.y + newHeight / 2;

    // อัปเดตเส้นขอบ Cube
    line.geometry.dispose();
    const edges = new THREE.EdgesGeometry(cube.geometry);
    line.geometry = edges;
    line.position.copy(cube.position);

    // อัปเดต Cube ที่เป็นเส้นบางๆ ด้านล่าง
    darkerCube.geometry.dispose();
    darkerCube.geometry = new THREE.BoxGeometry(newWidth, 0.2, newDepth);
    darkerCube.position.set(cube.position.x, gridHelper.position.y - 0.1, cube.position.z);

    // อัปเดตไม้บรรทัด
    updateRulerX();
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
    rulerLine.position.set(
        cube.position.x, // แก้ให้ตามตำแหน่ง x ของ cube
        cube.position.y - cubeHeight / 2 + 5.1, // คำนวณตาม y
        cube.position.z + cube.geometry.parameters.depth / 2 - 0.05 // คำนวณตาม z
    );
    rulerGroup.add(rulerLine);

    // สร้างเครื่องหมายระยะ 1 หน่วยบนไม้บรรทัด
    const markMaterial = new THREE.MeshBasicMaterial({ color: 0x5b6a85 }); // สีเทา
    const unitLength = 1; // ระยะห่างของเครื่องหมาย
    const startX = -cubeWidth / 2; // เริ่มจาก x ที่น้อยที่สุดของ Cube
    const endX = cubeWidth / 2; // ไปจนถึง x ที่มากที่สุดของ Cube
    const posY = cube.position.y - cubeHeight / 2 + 5; // ล่างสุด
    const posZ = cube.position.z + cube.geometry.parameters.depth / 2 + 0.1; // หน้าสุด

    for (let x = startX; x <= endX; x += unitLength) {
        // ตรวจสอบว่าตำแหน่งนี้เป็นขีดยาวหรือไม่
        const isLongMark = Math.round((x - startX) / unitLength) % 5 === 0;

        // สร้างเครื่องหมายเป็น BoxGeometry
        const markGeometry = new THREE.BoxGeometry(0.12, isLongMark ? 1 : 0.5, 0.12); // ขนาดความยาวต่างกัน
        const mark = new THREE.Mesh(markGeometry, markMaterial);

        // ตำแหน่งของเครื่องหมาย: X คงเดิม, Y ล่างสุด, Z ตามแนวลึก
        const adjustedX = cube.position.x + x; // อิงตำแหน่ง x ตาม cube
        const adjustedY = posY; // คงเดิมที่ระนาบด้านล่าง
        const adjustedZ = posZ;
        
        mark.position.set(
            adjustedX,
            adjustedY + (isLongMark ? 0.8 / 2 : 0.4 / 2) + 0.2,
            adjustedZ - 0.15 + cube.position.z // ปรับให้ขยับตามแกน Z ของ Cube
        );
        rulerGroup.add(mark);
    }

    // หมุนกลุ่มไม้บรรทัด 90 องศาตามแกน X
    rulerGroup.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2); // หมุน 90 องศาตามแกน X

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

        const unitLength = 5; // ระยะห่างของข้อความเป็น 5 หน่วย
        const startX = -size / 2; // เริ่มจาก x ที่น้อยที่สุดของ Cube
        const endX = size / 2; // ไปจนถึงขนาดของ Cube
        const posY = line.geometry.attributes.position.array[1]; // ล่างสุด
        const posZ = line.geometry.attributes.position.array[2]; // หน้าสุด

        let number = 0; // เริ่มต้นตัวเลขที่จะแสดง
        for (let x = startX; x <= endX; x += unitLength) {
            const textGeometry = new THREE.TextGeometry(`${number}`, {
                font: font,
                size: 0.8, // เพิ่มขนาดข้อความ
                height: 0.1,
            });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(x, posY + 4.5, posZ + 2.4); // ตำแหน่งข้อความ

            // หมุนข้อความกลับด้านในแกน X
            textMesh.rotateX(Math.PI); // หมุน 180 องศาในแกน X

            // ปรับตำแหน่งข้อความไปทางฝั่งตรงข้ามของไม้บรรทัด
            textMesh.position.x = x - 0.35;

            rulerGroup.add(textMesh); // เพิ่มข้อความเข้าในกลุ่ม
            number++; // เพิ่มตัวเลขทีละ 1
        }
    });
}


updateRulerX();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

