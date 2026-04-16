const ADMIN_KEY = "adminappmenunguyenlong";
const ZALO_CONTACT = "0933653553 (Nguyen Long)";

// Dữ liệu thiết bị và phiên bản từ cũ nhất đến mới nhất
const systemData = {
    adr: {
        brands: ["Samsung", "Oppo", "Redmi", "Xiaomi", "Vivo", "Realme", "Asus ROG", "Nubia RedMagic", "Google Pixel", "Huawei", "Sony", "Nokia", "Motorola", "LG", "Lenovo", "Meizu", "ZTE", "Vsmart", "HTC", "BlackBerry"],
        versions: [
            "Android 16 (2026 - Latest)", "Android 15 (V)", "Android 14 (U)", "Android 13 (T)", "Android 12 (S)", "Android 11 (R)", 
            "Android 10 (Q)", "Android 9.0 (Pie)", "Android 8.0 (Oreo)", "Android 7.0 (Nougat)", 
            "Android 6.0 (Marshmallow)", "Android 5.0 (Lollipop)", "Android 4.4 (KitKat)"
        ]
    },
    ios: {
        brands: [
            "iPhone 17 Pro Max (2026)", "iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 Series", 
            "iPhone 12 Series", "iPhone 11 Series", "iPhone XS/XR", "iPhone X", "iPhone 8/7/6 Plus", "iPhone 5s/5c/SE",
            "iPad Pro M4", "iPad Pro M2", "iPad Air 5", "iPad Mini 6"
        ],
        versions: [
            "iOS 19.x (2026 - Latest)", "iOS 18.x", "iOS 17.x", "iOS 16.x", "iOS 15.x", "iOS 14.x", 
            "iOS 13.x", "iOS 12.x", "iOS 11.x", "iOS 10.x", "iOS 9.x"
        ]
    },
    pc: {
        brands: ["Mainboard ASUS ROG", "Mainboard MSI Dragon", "Mainboard Gigabyte Aorus", "Mainboard ASRock", "Mainboard EVGA", "Mainboard NZXT", "Workstation Dell Precision", "Workstation HP Z"],
        versions: [
            "Windows 12 Pro (Early Access)", "Windows 11 Pro 24H2", "Windows 11 Pro 23H2", "Windows 10 Pro (All Builds)", 
            "Windows 10 Enterprise LTSC", "Windows 8.1 Pro", "Windows 7 Ultimate (SP1)", "Windows XP Professional"
        ]
    },
    laptop: {
        brands: [
            "Macbook Pro M4 (2026)", "Macbook Pro M3", "Macbook Air M2", "Dell Alienware X16", 
            "MSI Titan/Raider", "ASUS ROG Zephyrus/Strix", "HP Omen/Victus", "Lenovo Legion 9i", 
            "Acer Predator Helios", "Razer Blade 16", "Microsoft Surface Laptop"
        ],
        versions: [
            "Windows 11 Premium", "macOS 16.x (2026)", "macOS Sonoma (14.x)", "macOS Ventura (13.x)", 
            "macOS Monterey (12.x)", "macOS Big Sur (11.x)", "macOS Catalina (10.15)"
        ]
    }
};

// ĐÃ CẬP NHẬT ĐƯỜNG DẪN ẢNH ICON THEO HÌNH BẠN GỬI
const appList = [
    { name: "Free Fire MAX", icon: "image_1.png" }, // Sử dụng ảnh image_1.png cho Free Fire MAX
    { name: "Free Fire", icon: "image_0.png" }      // Sử dụng ảnh image_0.png cho Free Fire thường
];

let system = { selected: null };
let countdownTimer;

window.onload = () => {
    updateDeviceList();
    initSnow();
    if (localStorage.getItem('hide_until') > Date.now()) {
        enterSystem();
    }
};

// --- HỆ THỐNG KIỂM TRA KEY & ĐẾM NGƯỢC ---
function checkLogin() {
    const keyInput = document.getElementById('license-key').value.trim();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');

    // Mẫu Key test (Bạn có thể tạo thêm trong Admin Panel)
    if (!keys["TEST-GOLD"]) {
        keys["TEST-GOLD"] = { expiry: Date.now() + 31536000000 }; // 1 năm
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
    }

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
        if (y > 0) str += `${y}n `;
        if (mon > 0) str += `${mon}th `;
        str += `${d}d : ${h}h : ${m}m : ${s}s`;
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

// --- LOGIC HIỂN THỊ DANH MỤC THIẾT BỊ ---
function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const devSel = document.getElementById('select-device');
    if(!devSel) return;
    devSel.innerHTML = "";
    systemData[os].brands.forEach(b => devSel.innerHTML += `<option value="${b}">${b}</option>`);
    updateVersionList();
}

function updateVersionList() {
    const os = document.getElementById('select-os').value;
    const verSel = document.getElementById('select-version');
    if(!verSel) return;
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

// --- LOGIC KÍCH HOẠT (ĐÃ XOÁ DÒNG FILE HỆ THỐNG) ---
function processFileReplace(type, cb) {
    if (!system.selected) { alert("CHỌN GAME TRƯỚC!"); cb.checked = false; return; }
    const log = document.getElementById('overwrite-log');
    if (cb.checked) {
        log.classList.remove('hidden');
        log.innerHTML = `
            <div class="active-box">
                <p>● KÍCH HOẠT THÀNH CÔNG: ${type.toUpperCase()}</p>
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
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(flake);
    }
}
