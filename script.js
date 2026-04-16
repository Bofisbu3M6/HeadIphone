const DEVICE_DB = {
    "🤖 ANDROID": ["Android 4.2.2", "Android 5.1.1", "Android 10.0.1", "Android 13 QPR2", "Android 14", "Android 15"],
    "🍎 iOS": ["iOS 7.1.2", "iOS 12.4.9", "iOS 15.7", "iOS 16.7", "iOS 17.6", "iOS 18", "iOS 26"],
    "💻 WINDOWS": ["Windows 10 22H2", "Windows 11 24H2"],
    "🍏 macOS": ["macOS 12", "macOS 15", "macOS 26"]
};

// Khởi tạo ban đầu
window.onload = () => {
    const osSelect = document.getElementById('os-selector');
    Object.keys(DEVICE_DB).forEach(os => osSelect.add(new Option(os, os)));
    loadDevices();
    refreshLogo();
    renderKeyList();
};

function loadDevices() {
    const os = document.getElementById('os-selector').value;
    const devSelect = document.getElementById('device-selector');
    devSelect.innerHTML = "";
    DEVICE_DB[os].forEach(d => devSelect.add(new Option(d, d)));
}

function refreshLogo() {
    const app = document.getElementById('app-selector').value;
    const img = document.getElementById('app-logo-display');
    // Fix lỗi bằng link trực tiếp ổn định
    img.src = app === 'ff' 
        ? "https://i.imgur.com/rN9S7aP.png" 
        : "https://i.imgur.com/V7Yq7M0.png";
}

// HỆ THỐNG XỬ LÝ KEY
function handleLogin() {
    const key = document.getElementById('key-input').value.trim();
    if (key === "adminappmenunguyenlong") {
        enterSystem(true);
        return;
    }

    let keys = JSON.parse(localStorage.getItem('system_keys') || '{}');
    if (keys[key]) {
        let now = Date.now();
        if (now > keys[key]) {
            delete keys[key];
            localStorage.setItem('system_keys', JSON.stringify(keys));
            alert("Key của bạn đã hết hạn và bị xóa khỏi hệ thống!");
        } else {
            alert("Nhận Key thành công! Hạn dùng: " + new Date(keys[key]).toLocaleString());
            enterSystem(false);
        }
    } else {
        alert("Key không tồn tại hoặc đã bị xóa!");
    }
}

function enterSystem(isAdmin) {
    document.getElementById('login-screen').classList.remove('active-screen');
    document.getElementById('main-app').classList.remove('hidden');
    if (isAdmin) document.getElementById('admin-access').classList.remove('hidden');
}

// ADMIN LOGIC
function adminCreateKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const days = parseInt(document.getElementById('new-key-time').value);
    if (!name) return alert("Vui lòng nhập tên Key!");

    let keys = JSON.parse(localStorage.getItem('system_keys') || '{}');
    let expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
    keys[name] = expiry;
    localStorage.setItem('system_keys', JSON.stringify(keys));
    renderKeyList();
    alert("Tạo Key thành công!");
}

function renderKeyList() {
    const container = document.getElementById('admin-key-list');
    let keys = JSON.parse(localStorage.getItem('system_keys') || '{}');
    container.innerHTML = "";
    for (let k in keys) {
        let hsd = keys[k] > Date.now() + 100000000 ? "Vĩnh Viễn" : new Date(keys[k]).toLocaleDateString();
        container.innerHTML += `<div class="key-row"><span>${k} (${hsd})</span> <button onclick="deleteKey('${k}')">XÓA</button></div>`;
    }
}

function deleteKey(k) {
    let keys = JSON.parse(localStorage.getItem('system_keys') || '{}');
    delete keys[k];
    localStorage.setItem('system_keys', JSON.stringify(keys));
    renderKeyList();
}

// CHỨC NĂNG MOD
function askGameVersion(modName) {
    document.getElementById('modal-title').innerText = "KÍCH HOẠT: " + modName;
    document.getElementById('modal-selector').classList.remove('hidden');
}

function closeGameModal() {
    document.getElementById('modal-selector').classList.add('hidden');
}

function changeTab(btn, id) {
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + id).classList.add('active');
}

function logout() { location.reload(); }
