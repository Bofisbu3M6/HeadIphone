const LOGO_FF = "https://i.ibb.co/LnMZ6pG/ff-normal.png";
const LOGO_FFMAX = "https://i.ibb.co/0X8y0Xm/ff-max.png";

function changeAppLogo() {
    const val = document.getElementById('select-app').value;
    const img = document.getElementById('app-icon-img');
    img.src = (val === 'ff') ? LOGO_FF : LOGO_FFMAX;
}

const OS_VERSIONS = {
    android: ["Android 4.4.4", "Android 5.1.1", "Android 9", "Android 10", "Android 11", "Android 12", "Android 13", "Android 14", "Android 15"],
    ios: ["iOS 12.4.9", "iOS 14.8", "iOS 15.7", "iOS 16.6", "iOS 17.5", "iOS 18", "iOS 19", "iOS 26"],
    windows: ["Windows 10 22H2", "Windows 11 23H2", "Windows 11 24H2"],
    macos: ["macOS 12", "macOS 13", "macOS 14", "macOS 15", "macOS 26"]
};

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const dev = document.getElementById('select-device');
    dev.innerHTML = "";
    OS_VERSIONS[os].forEach(v => {
        let opt = document.createElement("option");
        opt.value = v; opt.text = v;
        dev.appendChild(opt);
    });
}

function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if(key === "adminappmenunguyenlong") { enterSystem("ADMIN"); return; }
    
    let keys = JSON.parse(localStorage.getItem('keys') || '{}');
    if(!keys[key]) return alert("KEY KHÔNG TỒN TẠI!");
    
    document.getElementById('key-popup').classList.remove('hidden');
    document.getElementById('popup-time').innerText = "VĨNH VIỄN (∞)";
}

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if(role === "ADMIN") document.getElementById('dev-tab').classList.remove('hidden');
    updateDeviceList();
}

function logoutKey() {
    if(confirm("Xác nhận đăng xuất?")) location.reload();
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function createKey() {
    const name = document.getElementById('admin-key-input').value;
    if(!name) return;
    let keys = JSON.parse(localStorage.getItem('keys') || '{}');
    keys[name] = { expiry: Infinity };
    localStorage.setItem('keys', JSON.stringify(keys));
    renderAdminKeys();
}

function renderAdminKeys() {
    const list = document.getElementById('key-list-admin');
    let keys = JSON.parse(localStorage.getItem('keys') || '{}');
    list.innerHTML = "";
    for(let k in keys) {
        list.innerHTML += `<div class="key-item"><span>${k}</span><button onclick="deleteKey('${k}')">X</button></div>`;
    }
}

function deleteKey(k) {
    let keys = JSON.parse(localStorage.getItem('keys') || '{}');
    delete keys[k];
    localStorage.setItem('keys', JSON.stringify(keys));
    renderAdminKeys();
}

function scanDevices() {
    alert("QUÉT THIẾT BỊ HOÀN TẤT ✅");
}

function toggleMod(name, el) {
    const box = document.getElementById('status-box');
    const txt = document.getElementById('status-text');
    if(el.checked) {
        box.classList.remove('hidden');
        txt.innerText = `ĐÃ KÍCH HOẠT: ${name}`;
    } else {
        box.classList.add('hidden');
    }
}
window.onload = renderAdminKeys;
