const ADMIN_KEY = "adminappmenunguyenlong";
const ZALO_CONTACT = "0933653553 (Nguyên Long)";

// Dữ liệu thiết bị khổng lồ
const systemData = {
    adr: {
        brands: ["Samsung", "Oppo", "Redmi", "Xiaomi", "Vivo", "Realme", "Asus ROG", "Nubia RedMagic", "Google Pixel", "Huawei", "Sony", "Nokia", "Motorola", "LG", "Lenovo", "Meizu", "ZTE"],
        versions: ["Android 15", "Android 14", "Android 13", "Android 12", "Android 11", "Android 10", "Android 9.0", "Android 8.0", "Android 7.0"]
    },
    ios: {
        brands: ["iPhone 15 Pro Max", "iPhone 15 Plus", "iPhone 14 Pro Max", "iPhone 13 Pro Max", "iPhone 12 Pro Max", "iPhone 11 Series", "iPhone XS/XR", "iPhone X", "iPhone 8/7/6 Plus", "iPad Pro M4", "iPad Pro M2", "iPad Air 5", "iPad Mini 6"],
        versions: ["iOS 18.0 Beta", "iOS 17.5", "iOS 17.0", "iOS 16.6", "iOS 15.0", "iOS 14.0", "iOS 13.0", "iOS 12.0"]
    },
    pc: {
        brands: ["Mainboard ASUS ROG", "Mainboard MSI Dragon", "Mainboard Gigabyte Aorus", "Mainboard ASRock", "Mainboard EVGA", "Mainboard NZXT"],
        versions: ["Windows 11 Pro 23H2", "Windows 11 Home", "Windows 10 Pro", "Windows 10 Enterprise", "Windows 7 Ultimate", "Windows 8.1"]
    },
    laptop: {
        brands: ["Macbook Pro M3", "Macbook Air M2", "Dell Alienware", "MSI Gaming Series", "ASUS ROG Zephyrus", "HP Omen", "Lenovo Legion", "Acer Predator", "Razer Blade"],
        versions: ["Windows 11 Premium", "macOS Sonoma", "macOS Ventura", "macOS Monterey", "macOS Big Sur"]
    }
};

const appList = [
    { name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png" },
    { name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png" }
];

let system = { selected: null };
let countdownTimer;

window.onload = () => {
    updateDeviceList();
    initSnow();
    // Kiểm tra nếu đã ẩn popup trong 2h
    if (localStorage.getItem('hide_until') > Date.now()) {
        enterSystem();
    }
};

// --- LOGIC ĐĂNG NHẬP & KEY ---
function checkLogin() {
    const keyInput = document.getElementById('license-key').value.trim();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');

    if (keyInput === ADMIN_KEY) { enterSystem("OWNER"); return; }

    if (!keys[keyInput]) {
        alert(`KEY KHÔNG TỒN TẠI HOẶC ĐÃ BỊ XOÁ!\nVui lòng liên hệ Zalo: ${ZALO_CONTACT} để mua key.`);
        return;
    }

    const expiry = keys[keyInput].expiry;
    if (Date.now() > expiry) {
        delete keys[keyInput];
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
        alert(`KEY CỦA BẠN ĐÃ HẾT HẠN!\nVui lòng liên hệ Zalo: ${ZALO_CONTACT} để mua mới.`);
        return;
    }

    startCountdown(expiry);
    document.getElementById('key-popup').classList.remove('hidden');
}

function startCountdown(expiry) {
    if (countdownTimer) clearInterval(countdownTimer);
    
    function update() {
        const now = Date.now();
        const diff = expiry - now;
        if (diff <= 0) { location.reload(); return; }

        const y = Math.floor(diff / 31536000000);
        const mon = Math.floor((diff % 31536000000) / 2592000000);
        const d = Math.floor((diff % 2592000000) / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        let str = "";
        if (y > 0) str += `${y} năm `;
        if (mon > 0) str += `${mon} th `;
        str += `${d}n : ${h}g : ${m}p : ${s}s`;
        document.getElementById('popup-time').innerText = str;
    }
    update();
    countdownTimer = setInterval(update, 1000);
}

function closePopup() {
    document.getElementById('key-popup').classList.add('hidden');
    enterSystem();
}

function hideFor2Hours() {
    localStorage.setItem('hide_until', Date.now() + (2 * 60 * 60 * 1000));
    closePopup();
}

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (role === "OWNER") document.getElementById('dev-tab').classList.remove('hidden');
}

// --- LOGIC THIẾT BỊ ---
function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const devSel = document.getElementById('select-device');
    devSel.innerHTML = "";
    systemData[os].brands.forEach(b => devSel.innerHTML += `<option value="${b}">${b}</option>`);
    updateVersionList();
}

function updateVersionList() {
    const os = document.getElementById('select-os').value;
    const verSel = document.getElementById('select-version');
    verSel.innerHTML = "";
    systemData[os].versions.forEach(v => verSel.innerHTML += `<option value="${v}">${v}</option>`);
}

function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = "";
    appList.forEach(app => {
        const el = document.createElement('div');
        el.className = 'app-item';
        el.innerHTML = `<img src="${app.icon}" class="app-icon"><span class="app-name">${app.name}</span>`;
        el.onclick = () => {
            document.querySelectorAll('.app-item').forEach(i => i.classList.remove('selected'));
            el.classList.add('selected');
            system.selected = app;
        };
        grid.appendChild(el);
    });
}

function processFileReplace(type, cb) {
    if (!system.selected) { alert("CHỌN GAME TRƯỚC!"); cb.checked = false; return; }
    const log = document.getElementById('overwrite-log');
    if (cb.checked) {
        log.classList.remove('hidden');
        log.innerHTML = `
            <div class="active-box">
                <p>● ĐÃ KÍCH HOẠT THÀNH CÔNG: ${type.toUpperCase()}</p>
                <div style="display:flex; gap:8px;">
                    <button class="btn-launch" onclick="window.location.href='freefire://'">MỞ FREE FIRE</button>
                    <button class="btn-launch" onclick="window.location.href='freefiremax://'">MỞ FF MAX</button>
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

function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 20; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(flake);
    }
}
