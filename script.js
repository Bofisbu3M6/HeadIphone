const ADMIN_PASS = "adminappmenunguyenlong";
const LOGO_FF = "https://i.ibb.co/LnMZ6pG/ff-normal.png";
const LOGO_FFMAX = "https://i.ibb.co/0X8y0Xm/ff-max.png";
let countdown;

// Khởi tạo
window.onload = () => {
    updateDeviceList();
    renderAdminKeys();
    if(localStorage.getItem('hide_popup') > Date.now()) enterSystem();
};

function changeAppLogo() {
    const val = document.getElementById('select-app').value;
    document.getElementById('current-app-icon').src = (val === 'ff') ? LOGO_FF : LOGO_FFMAX;
}

const OS_DATA = {
    android: ["Android 4.4.4", "Android 5.1.1", "Android 10", "Android 11", "Android 12", "Android 13", "Android 14", "Android 15"],
    ios: ["iOS 12.4.9", "iOS 14.8", "iOS 15.7", "iOS 16.7", "iOS 17.6", "iOS 18", "iOS 19", "iOS 26"],
    windows: ["Windows 10 22H2", "Windows 11 24H2"],
    macos: ["macOS 14", "macOS 15", "macOS 26"]
};

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const dev = document.getElementById('select-device');
    dev.innerHTML = "";
    OS_DATA[os].forEach(v => {
        let o = document.createElement("option"); o.value = v; o.text = v;
        dev.appendChild(o);
    });
}

function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if(key === ADMIN_PASS) { enterSystem("ADMIN"); return; }
    
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if(!keys[key]) return alert("KEY KHÔNG TỒN TẠI!");
    if(Date.now() > keys[key].expiry) return alert("KEY HẾT HẠN!");

    showPopup(keys[key].expiry);
}

function showPopup(expiry) {
    document.getElementById('key-popup').classList.remove('hidden');
    const display = document.getElementById('popup-time');
    if(countdown) clearInterval(countdown);
    countdown = setInterval(() => {
        const diff = expiry - Date.now();
        if(diff <= 0) location.reload();
        if(expiry > Date.now() + 1000000000) display.innerText = "VĨNH VIỄN (∞)";
        else {
            const h = Math.floor(diff/3600000);
            const m = Math.floor((diff%3600000)/60000);
            const s = Math.floor((diff%60000)/1000);
            display.innerText = `${h}G : ${m}P : ${s}S`;
        }
    }, 1000);
}

function closePopupAction() { document.getElementById('key-popup').classList.add('hidden'); enterSystem(); }
function hideFor2Hours() { localStorage.setItem('hide_popup', Date.now() + 7200000); closePopupAction(); }

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if(role === "ADMIN") document.getElementById('dev-tab').classList.remove('hidden');
}

function logoutKey() { if(confirm("Xác nhận đăng xuất Key?")) { localStorage.removeItem('hide_popup'); location.reload(); } }

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function adminAddKey() {
    const name = document.getElementById('new-key').value.trim();
    const time = parseInt(document.getElementById('key-time').value);
    if(!name) return;
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[name] = { expiry: Date.now() + time };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    renderAdminKeys();
}

function deleteKey(k) {
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    delete keys[k];
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    renderAdminKeys();
}

function renderAdminKeys() {
    const list = document.getElementById('admin-list-keys');
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    list.innerHTML = "";
    for(let k in keys) {
        list.innerHTML += `<div class="k-item"><span>${k}</span><button onclick="deleteKey('${k}')">XÓA</button></div>`;
    }
}

function scanDevices() {
    const btn = document.querySelector('.btn-action');
    btn.innerText = "ĐANG QUÉT...";
    setTimeout(() => { alert("QUÉT THÀNH CÔNG ✅"); btn.innerText = "QUÉT LẠI"; }, 1500);
}

function toggleMod(name, el) {
    const box = document.getElementById('mod-active-box');
    const txt = document.getElementById('mod-active-text');
    if(el.checked) { box.classList.remove('hidden'); txt.innerText = `KÍCH HOẠT: ${name}`; }
    else box.classList.add('hidden');
}
