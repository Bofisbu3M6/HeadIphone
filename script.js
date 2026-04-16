const ADMIN_PASS = "adminappmenunguyenlong";
const ZALO = "0933653553 (nguyen long)";
let countdownInterval;

window.onload = () => {
    updateDeviceList();
    renderAdminKeys();
    if(localStorage.getItem('hide_until') > Date.now()) enterSystem();
};

const OS_DATA = {
    android: ["Android 4.2.2", "Android 4.3", "Android 4.4.4", "Android 5.1.1", "Android 6.0.1", "Android 7.1.2", "Android 8.1", "Android 9", "Android 10", "Android 11", "Android 12.1", "Android 13", "Android 14", "Android 15"],
    ios: ["iOS 7.1.2", "iOS 8.4.1", "iOS 9.3.6", "iOS 10.3.4", "iOS 11.4.1", "iOS 12.4.9", "iOS 13.7", "iOS 14.8.1", "iOS 15.7.8", "iOS 16.7", "iOS 17.6", "iOS 18", "iOS 19", "iOS 26"],
    windows: ["Windows 8.1", "Windows 10 22H2", "Windows 11 23H2", "Windows 11 24H2"],
    macos: ["macOS 10.15.7", "macOS 11", "macOS 12", "macOS 13", "macOS 14", "macOS 15", "macOS 26"]
};

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const dev = document.getElementById('select-device');
    dev.innerHTML = "";
    OS_DATA[os].forEach(v => {
        let opt = document.createElement("option");
        opt.value = v; opt.text = v;
        dev.appendChild(opt);
    });
}

function checkLogin() {
    const input = document.getElementById('license-key').value.trim();
    if (input === ADMIN_PASS) { enterSystem("ADMIN"); return; }
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (!keys[input]) return alert("KEY KHÔNG TỒN TẠI TRÊN HỆ THỐNG HOẶC ĐÃ BỊ XOÁ\nVui lòng liên hệ Admin Zalo: " + ZALO);
    if (Date.now() > keys[input].expiry) {
        delete keys[input]; localStorage.setItem('strongest_keys', JSON.stringify(keys));
        return alert("KEY ĐÃ HẾT HẠN!");
    }
    showKeyPopup(keys[input].expiry);
}

function showKeyPopup(expiry) {
    document.getElementById('key-popup').classList.remove('hidden');
    const display = document.getElementById('popup-time');
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const diff = expiry - Date.now();
        if (diff <= 0) { clearInterval(countdownInterval); location.reload(); }
        if (expiry > Date.now() + 3153600000000) display.innerText = "VĨNH VIỄN (∞)";
        else {
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            display.innerText = `${h} Giờ : ${m} Phút : ${s} Giây`;
        }
    }, 1000);
}

function closePopupAction() { document.getElementById('key-popup').classList.add('hidden'); enterSystem(); }
function hideFor2Hours() { localStorage.setItem('hide_until', Date.now() + 7200000); closePopupAction(); }
function logoutKey() { if (confirm("Bạn có muốn đăng xuất Key?")) { localStorage.removeItem('hide_until'); location.reload(); } }
function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (role === "ADMIN") document.getElementById('dev-tab').classList.remove('hidden');
}

// Admin
function createKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const dur = parseInt(document.getElementById('key-duration').value);
    if(!name) return;
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[name] = { expiry: Date.now() + dur };
    localStorage.setItem('strongest_keys', JSON.stringify(keys)); renderAdminKeys();
}

function deleteKey(name) {
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    delete keys[name]; localStorage.setItem('strongest_keys', JSON.stringify(keys)); renderAdminKeys();
}

function renderAdminKeys() {
    const container = document.getElementById('admin-key-list');
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    container.innerHTML = "";
    for (let k in keys) {
        container.innerHTML += `<div class="key-card"><span><b>${k}</b></span><button class="btn-delete" onclick="deleteKey('${k}')">XOÁ</button></div>`;
    }
}

function uploadFile() { alert("Đã thêm file thành công!"); }
function scanDevices() { 
    const btn = document.querySelector('.btn-action'); btn.innerText = "ĐANG QUÉT...";
    setTimeout(() => { document.getElementById('scan-result').classList.remove('hidden'); btn.innerText = "XONG ✅"; }, 1500); 
}

function toggleMod(name, el) {
    const box = document.getElementById('mod-status-box');
    const txt = document.getElementById('mod-text');
    if (el.checked) { box.classList.remove('hidden'); txt.innerText = `KÍCH HOẠT THÀNH CÔNG: ${name.toUpperCase()}`; }
    else box.classList.add('hidden');
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active'); document.getElementById('tab-' + id).classList.remove('hidden');
}
