const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');

const deviceData = {
    ios: {
        models: ["iPhone 13 Pro Max", "iPhone 14 Pro", "iPhone 15 Series", "iPad Pro M4"],
        versions: ["iOS 16.0", "iOS 17.0", "iOS 17.5", "iOS 18.0 Beta"]
    },
    android: {
        models: ["Samsung S24 Ultra", "ROG Phone 8", "Xiaomi 14 Pro", "Nubia RedMagic"],
        versions: ["Android 12", "Android 13", "Android 14", "Android 15"]
    },
    pc: {
        models: ["Alienware Laptop", "MSI Gaming", "Custom PC Windows", "Laptop Office"],
        versions: ["Windows 10 Pro", "Windows 11 Home", "Windows 11 Pro"]
    }
};

const appList = [
    { id: "ff-max", name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", scheme: "freefiremax://" },
    { id: "ff-normal", name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", scheme: "freefire://" }
];

let system = { selected: null, role: "GUEST" };

window.onload = function() {
    initSnow();
    updateDeviceList();
    checkExistingSession();
};

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const deviceSelect = document.getElementById('select-device');
    const versionSelect = document.getElementById('select-version');
    
    deviceSelect.innerHTML = "";
    deviceData[os].models.forEach(dev => {
        let opt = document.createElement('option');
        opt.value = dev; opt.innerHTML = dev;
        deviceSelect.appendChild(opt);
    });

    versionSelect.innerHTML = "";
    deviceData[os].versions.forEach(ver => {
        let opt = document.createElement('option');
        opt.value = ver; opt.innerHTML = ver;
        versionSelect.appendChild(opt);
    });
}

function initSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 5 + 7) + 's';
        flake.style.opacity = Math.random();
        container.appendChild(flake);
    }
}

function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if (key === ADMIN_KEY) enterSystem("OWNER");
    else if (key.startsWith("STR-")) enterSystem("MEMBER");
    else alert("KEY KHÔNG HỢP LỆ!");
}

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (role === "OWNER") document.getElementById('dev-tab').classList.remove('hidden');
}

function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:10px; color:#8e8e93;">Đang quét Game...</p>';
    
    setTimeout(() => {
        grid.innerHTML = '';
        appList.forEach(app => {
            const el = document.createElement('div');
            el.className = 'app-item';
            el.onclick = () => {
                document.querySelectorAll('.app-item').forEach(i => i.classList.remove('selected'));
                el.classList.add('selected');
                system.selected = app;
                
                const os = document.getElementById('select-os').value.toUpperCase();
                const dev = document.getElementById('select-device').value;
                const ver = document.getElementById('select-version').value;

                document.getElementById('display-target').innerText = app.name;
                document.getElementById('target-info').innerText = `${os} | ${dev} | ${ver}`;
            };
            el.innerHTML = `<img src="${app.icon}" class="app-icon"><span class="app-name">${app.name}</span>`;
            grid.appendChild(el);
        });
    }, 500);
}

function processFileReplace(type, cb) {
    if (!system.selected) {
        alert("CHỌN GAME TRƯỚC!");
        cb.checked = false; return;
    }
    const log = document.getElementById('overwrite-log');
    if (cb.checked) {
        log.classList.remove('hidden');
        log.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; text-align: center;">
                <span style="color: #34c759; font-weight: 800; font-size: 12px;">● ĐÃ KÍCH HOẠT: ${type.toUpperCase()}</span>
                <div style="display:flex; gap:8px; margin-top:10px;">
                    <button onclick="window.location.href='freefire://'" style="background:#007aff; border:none; color:#fff; padding:10px; border-radius:8px; flex:1; font-weight:800; font-size:10px;">MỞ FF</button>
                    <button onclick="window.location.href='freefiremax://'" style="background:#34c759; border:none; color:#fff; padding:10px; border-radius:8px; flex:1; font-weight:800; font-size:10px;">MỞ FF MAX</button>
                </div>
            </div>`;
    } else { log.classList.add('hidden'); }
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function toggleMusic() { if (audio.paused) audio.play(); else audio.pause(); }

function checkExistingSession() {
    const role = localStorage.getItem('session_role');
    if (role) enterSystem(role);
}
