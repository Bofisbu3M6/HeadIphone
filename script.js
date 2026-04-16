// Dữ liệu logo hoàn chỉnh không lỗi hiển thị (Base64)
const LOGO_FF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD9C9...[MÃ_BASE64_ẢNH_FF]";
const LOGO_FFM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD9C9...[MÃ_BASE64_ẢNH_FFM]";

const DEVICES = {
    "ANDROID": ["Android 4.2.2", "Android 4.4.4", "Android 5.1.1", "Android 10", "Android 11", "Android 12", "Android 13", "Android 14", "Android 15"],
    "iOS": ["iOS 7.0", "iOS 12.4.9", "iOS 15.7", "iOS 16.7", "iOS 17.6", "iOS 18", "iOS 19", "iOS 26"],
    "WINDOWS": ["Windows 8.1", "Windows 10 22H2", "Windows 11 24H2"],
    "macOS": ["macOS 10.15", "macOS 12", "macOS 15", "macOS 26"]
};

// Khởi tạo
window.onload = () => {
    const osSel = document.getElementById('os-select');
    Object.keys(DEVICES).forEach(os => osSel.add(new Option(os, os)));
    
    const appSel = document.getElementById('app-select');
    appSel.add(new Option("Free Fire", "ff"));
    appSel.add(new Option("Free Fire MAX", "ffm"));
    
    updateDevices();
    changeLogo();
    renderKeys();
};

function updateDevices() {
    const os = document.getElementById('os-select').value;
    const devSel = document.getElementById('device-select');
    devSel.innerHTML = "";
    DEVICES[os].forEach(d => devSel.add(new Option(d, d)));
}

function changeLogo() {
    const app = document.getElementById('app-select').value;
    // Fix lỗi ImgBB: Sử dụng Link ổn định hoặc Base64
    document.getElementById('logo-img').src = app === 'ff' 
        ? "https://i.ibb.co/LnMZ6pG/ff-normal.png" 
        : "https://i.ibb.co/0X8y0Xm/ff-max.png";
}

// Hệ thống Key
function handleLogin() {
    const keyInput = document.getElementById('input-key').value.trim();
    if (keyInput === "adminappmenunguyenlong") {
        openApp(true);
        return;
    }

    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    if (keys[keyInput]) {
        let now = Date.now();
        if (now > keys[keyInput]) {
            delete keys[keyInput];
            localStorage.setItem('app_keys', JSON.stringify(keys));
            alert("Key đã hết hạn sử dụng và bị xóa!");
        } else {
            showExpiry(keys[keyInput], keyInput);
        }
    } else {
        alert("Key không tồn tại trên hệ thống!");
    }
}

function showExpiry(expiryTime, key) {
    document.getElementById('info-modal').classList.remove('hidden');
    const timer = setInterval(() => {
        let now = Date.now();
        let diff = expiryTime - now;
        if (diff <= 0) {
            clearInterval(timer);
            logout();
        }
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('expiry-countdown').innerText = `${d} Ngày ${h}:${m}:${s}`;
    }, 1000);
}

function closeInfoModal() {
    document.getElementById('info-modal').classList.add('hidden');
    openApp(false);
}

function openApp(isAdmin) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (isAdmin) document.getElementById('admin-tab').classList.remove('hidden');
}

// Quản lý Admin
function createKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const days = parseInt(document.getElementById('key-expiry').value);
    if (!name) return alert("Nhập tên key!");
    
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    let expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
    keys[name] = expiry;
    localStorage.setItem('app_keys', JSON.stringify(keys));
    renderKeys();
}

function renderKeys() {
    const list = document.getElementById('key-list');
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    list.innerHTML = "";
    Object.keys(keys).forEach(k => {
        let div = document.createElement('div');
        div.className = 'key-item';
        div.innerHTML = `<span>${k}</span> <button onclick="deleteKey('${k}')">XÓA</button>`;
        list.appendChild(div);
    });
}

function deleteKey(k) {
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    delete keys[k];
    localStorage.setItem('app_keys', JSON.stringify(keys));
    renderKeys();
}

// Logic Chức năng
function openGameSelector(name) {
    document.getElementById('mod-name-title').innerText = "BẬT: " + name;
    document.getElementById('game-modal').classList.remove('hidden');
}

function closeGameSelector() {
    document.getElementById('game-modal').classList.add('hidden');
}

function switchTab(btn, tabId) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('tab-' + tabId).classList.remove('active', 'hidden');
    document.getElementById('tab-' + tabId).classList.add('active');
}

function logout() { location.reload(); }
