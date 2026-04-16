const ADMIN_KEY = "adminappmenunguyenlong";
const ZALO_CONTACT = "0933653553 (Nguyen Long)";

const systemData = {
    android: {
        brands: ["Samsung Galaxy S26 Ultra", "OPPO Find X8", "Xiaomi 16", "Vivo X110", "Realme GT7", "Asus ROG Phone 10", "Nubia RedMagic 11", "Google Pixel 10", "Huawei Mate 70", "Sony Xperia 1 VII", "Vsmart"],
        versions: ["Android 15", "Android 14 QPR2", "Android 14 QPR1", "Android 14", "Android 13 QPR2", "Android 13 QPR1", "Android 13", "Android 12.1", "Android 12L", "Android 12.0.1", "Android 12", "Android 11.0.1", "Android 11", "Android 10.0.2", "Android 10.0.1", "Android 10", "Android 9", "Android 8.1", "Android 8.0", "Android 7.1.2", "Android 7.1.1", "Android 7.1", "Android 7.0", "Android 6.0.1", "Android 6.0", "Android 5.1.1", "Android 5.1", "Android 5.0.2", "Android 5.0.1", "Android 5.0", "Android 4.4.4", "Android 4.4.3", "Android 4.4.2", "Android 4.4.1", "Android 4.4", "Android 4.3.1", "Android 4.3", "Android 4.2.2"]
    },
    ios: {
        brands: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro Max", "iPhone 15 Pro Max", "iPhone 14 Pro Max", "iPhone 13 Pro Max", "iPhone 12 Pro Max", "iPhone 11 Pro Max", "iPhone XS Max", "iPad Pro M4", "iPad Air 6"],
        versions: ["iOS 26.5 Beta", "iOS 26", "iOS 19", "iOS 18", "iOS 17.6", "iOS 17.5", "iOS 17.4", "iOS 17.3", "iOS 17.2", "iOS 17.1.1", "iOS 17.1", "iOS 17.0.2", "iOS 17.0.1", "iOS 17.0", "iOS 16.7", "iOS 16.6.1", "iOS 16.6", "iOS 16.5.1", "iOS 16.5", "iOS 16.4.1", "iOS 16.4", "iOS 16.3.1", "iOS 16.3", "iOS 16.2", "iOS 16.1.2", "iOS 16.1.1", "iOS 16.1", "iOS 16.0.2", "iOS 16.0.1", "iOS 16.0", "iOS 15.7.8", "iOS 15.7.7", "iOS 15.7.6", "iOS 15.7.5", "iOS 15.7.4", "iOS 15.7.3", "iOS 15.7.2", "iOS 15.7.1", "iOS 15.7", "iOS 15.6.1", "iOS 15.6", "iOS 15.5", "iOS 15.4.1", "iOS 15.4", "iOS 15.3.1", "iOS 15.3", "iOS 15.2.1", "iOS 15.2", "iOS 15.1.1", "iOS 15.1", "iOS 15.0.2", "iOS 15.0.1", "iOS 15.0", "iOS 14.8.1", "iOS 14.8", "iOS 14.7.1", "iOS 14.7", "iOS 14.6", "iOS 14.5.1", "iOS 14.5", "iOS 14.4.2", "iOS 14.4.1", "iOS 14.4", "iOS 14.3", "iOS 14.2.1", "iOS 14.2", "iOS 14.1", "iOS 14.0.1", "iOS 14.0", "iOS 13.7", "iOS 13.6.1", "iOS 13.6", "iOS 13.5.1", "iOS 13.5", "iOS 13.4.1", "iOS 13.4", "iOS 13.3.1", "iOS 13.3", "iOS 13.2.3", "iOS 13.2.2", "iOS 13.2.1", "iOS 13.2", "iOS 13.1.3", "iOS 13.1.2", "iOS 13.1.1", "iOS 13.1", "iOS 13.0", "iOS 12.4.9", "iOS 12.4.8", "iOS 12.4.7", "iOS 12.4.6", "iOS 12.4.5", "iOS 12.4.4", "iOS 12.4.3", "iOS 12.4.2", "iOS 12.4.1", "iOS 12.4", "iOS 12.3.1", "iOS 12.3", "iOS 12.2", "iOS 12.1.4", "iOS 12.1.3", "iOS 12.1.2", "iOS 12.1.1", "iOS 12.1", "iOS 12.0.1", "iOS 12.0", "iOS 11.4.1", "iOS 11.4", "iOS 11.3.1", "iOS 11.3", "iOS 11.2.6", "iOS 11.2.5", "iOS 11.2.2", "iOS 11.2.1", "iOS 11.2", "iOS 11.1.2", "iOS 11.1.1", "iOS 11.1", "iOS 11.0.3", "iOS 11.0.2", "iOS 11.0.1", "iOS 11.0", "iOS 10.3.4", "iOS 10.3.3", "iOS 10.3.2", "iOS 10.3.1", "iOS 10.3", "iOS 10.2.1", "iOS 10.2", "iOS 10.1.1", "iOS 10.1", "iOS 10.0.3", "iOS 10.0.2", "iOS 10.0.1", "iOS 10.0", "iOS 9.3.6", "iOS 9.3.5", "iOS 9.3.4", "iOS 9.3.3", "iOS 9.3.2", "iOS 9.3.1", "iOS 9.3", "iOS 9.2.1", "iOS 9.2", "iOS 9.1", "iOS 9.0.2", "iOS 9.0.1", "iOS 9.0", "iOS 8.4.1", "iOS 8.4", "iOS 8.3", "iOS 8.2", "iOS 8.1.3", "iOS 8.1.2", "iOS 8.1.1", "iOS 8.1", "iOS 8.0.2", "iOS 8.0.1", "iOS 8.0", "iOS 7.1.2", "iOS 7.1.1", "iOS 7.1", "iOS 7.0.6", "iOS 7.0.5", "iOS 7.0.4", "iOS 7.0.3", "iOS 7.0.2", "iOS 7.0.1", "iOS 7.0"]
    },
    pc: {
        brands: ["Mainboard ASUS ROG", "Mainboard MSI Gaming", "Mainboard Gigabyte Aorus", "PC Alienware Aurora", "PC HP Omen"],
        versions: ["Windows 11 24H2", "Windows 11 23H2", "Windows 11 22H2", "Windows 11 21H2", "Windows 10 22H2", "Windows 10 21H2", "Windows 10 21H1", "Windows 10 20H2", "Windows 10 2004", "Windows 10 1909", "Windows 10 1903", "Windows 10 1809", "Windows 10 1803", "Windows 10 1709", "Windows 10 1703", "Windows 10 1607", "Windows 10 1511", "Windows 10 1507", "Windows 8.1"]
    },
    laptop: {
        brands: ["MacBook Pro M4", "MacBook Air M3", "Dell Alienware m18", "MSI Titan", "ASUS ROG Strix Scar", "Lenovo Legion 9i"],
        versions: ["macOS 26", "macOS 15", "macOS 14", "macOS 13", "macOS 12", "macOS 11", "macOS 10.15.7", "macOS 10.14.6", "macOS 10.13.6", "macOS 10.12.6", "macOS 10.11.6", "macOS 10.10.5", "macOS 10.9.5"]
    }
};

const appList = [
    { name: "Free Fire MAX", icon: "image_1.png" },
    { name: "Free Fire", icon: "image_0.png" }
];

let selectedApp = null;
let countdownTimer;

window.onload = () => {
    updateDeviceList();
    refreshKeyList();
    if (localStorage.getItem('hide_until') > Date.now()) enterSystem();
};

function checkLogin() {
    const keyInput = document.getElementById('license-key').value.trim();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (keyInput === ADMIN_KEY) { enterSystem("OWNER"); return; }
    if (!keys[keyInput]) { alert(`KEY KHÔNG TỒN TẠI!\nLiên hệ Zalo: ${ZALO_CONTACT}`); return; }
    if (Date.now() > keys[keyInput].expiry) { alert("KEY ĐÃ HẾT HẠN!"); return; }
    startCountdown(keys[keyInput].expiry);
    document.getElementById('key-popup').classList.remove('hidden');
}

function startCountdown(expiry) {
    if (countdownTimer) clearInterval(countdownTimer);
    const update = () => {
        const diff = expiry - Date.now();
        if (expiry > Date.now() + 3153600000000) {
            document.getElementById('popup-time').innerText = "HẠN SỬ DỤNG: VĨNH VIỄN (∞)";
            return;
        }
        if (diff <= 0) location.reload();
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('popup-time').innerText = `${d} Ngày : ${h} Giờ : ${m} Phút : ${s} Giây`;
    };
    update();
    countdownTimer = setInterval(update, 1000);
}

function createKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const dur = parseInt(document.getElementById('key-duration').value);
    if (!name) return;
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[name] = { expiry: Date.now() + dur };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    alert("Tạo thành công Key: " + name);
    refreshKeyList();
}

function refreshKeyList() {
    const list = document.getElementById('key-list');
    if(!list) return;
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    list.innerHTML = "<strong>DANH SÁCH KEY:</strong><br>";
    for (let k in keys) {
        let isVV = keys[k].expiry > Date.now() + 3153600000000;
        list.innerHTML += `● ${k} [${isVV ? 'VĨNH VIỄN' : 'CÓ HẠN'}]<br>`;
    }
}

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const dev = document.getElementById('select-device');
    dev.innerHTML = "";
    systemData[os].brands.forEach(b => dev.innerHTML += `<option value="${b}">${b}</option>`);
    updateVersionList();
}

function updateVersionList() {
    const os = document.getElementById('select-os').value;
    const ver = document.getElementById('select-version');
    ver.innerHTML = "";
    systemData[os].versions.forEach(v => ver.innerHTML += `<option value="${v}">${v}</option>`);
}

function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = "";
    appList.forEach(app => {
        const el = document.createElement('div');
        el.className = 'app-item';
        el.innerHTML = `<img src="${app.icon}" class="app-icon"><span>${app.name}</span>`;
        el.onclick = () => {
            document.querySelectorAll('.app-item').forEach(i => i.style.borderColor = "transparent");
            el.style.borderColor = "gold";
            selectedApp = app;
        };
        grid.appendChild(el);
    });
}

function processMod(name, cb) {
    if (!selectedApp) { alert("Vui lòng chọn Game!"); cb.checked = false; return; }
    const log = document.getElementById('overwrite-log');
    if (cb.checked) {
        log.classList.remove('hidden');
        log.innerHTML = `<div class="active-box">
            <p style="color:gold; font-weight:800; font-size:11px;">● ĐÃ KÍCH HOẠT: ${name.toUpperCase()}</p>
            <button class="btn-launch" onclick="alert('Đang khởi chạy...')">MỞ GAME</button>
        </div>`;
    } else { log.classList.add('hidden'); }
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (role === "OWNER") document.getElementById('dev-tab').classList.remove('hidden');
}
function closePopup() { document.getElementById('key-popup').classList.add('hidden'); enterSystem(); }
function hideFor2Hours() { localStorage.setItem('hide_until', Date.now() + 7200000); closePopup(); }
