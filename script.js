const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');
const IOS_PATH = "container/documents/contentcache/compulory/ios/gameassetbundles/";

const appList = [
    { id: "ff-max", name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", path: "Free Fire Max/" + IOS_PATH },
    { id: "ff-normal", name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", path: "Free Fire/" + IOS_PATH }
];

let system = { aimFile: null, recoilFile: null, selected: null, isMusic: false, countdown: null };

function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 35; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 5 + 10) + 's';
        container.appendChild(flake);
    }
}

function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if (!key) return;

    // Admin Login
    if (key === ADMIN_KEY) {
        enterSystem("OWNER");
        return;
    }

    // Member Login
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (!keys[key]) {
        alert("❌ KEY KHÔNG TỒN TẠI TRÊN HỆ THỐNG!");
        return;
    }

    const now = new Date().getTime();
    if (now > keys[key].expiry) {
        delete keys[key];
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
        alert("❌ KEY ĐÃ HẾT HẠN!");
        return;
    }

    enterSystem("MEMBER", keys[key].expiry);
}

function enterSystem(role, expiry) {
    audio.play().catch(() => {});
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    if (role === "OWNER") {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER";
        document.getElementById('key-countdown').innerText = "VĨNH VIỄN";
    } else {
        startCountdown(expiry);
    }

    const hideUntil = localStorage.getItem('hide_notif_until');
    if (!hideUntil || new Date().getTime() > hideUntil) {
        document.getElementById('notification-overlay').classList.remove('hidden');
    }
}

function startCountdown(expiry) {
    clearInterval(system.countdown);
    system.countdown = setInterval(() => {
        const diff = expiry - new Date().getTime();
        if (diff <= 0) { location.reload(); return; }
        
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 600000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('key-countdown').innerText = `${d}d:${h}h:${m}m:${s}s`;
    }, 1000);
}

function adminCreateKey() {
    const dur = document.getElementById('key-duration').value;
    const newKey = "STR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[newKey] = { expiry: new Date().getTime() + (dur * 1000) };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    navigator.clipboard.writeText(newKey);
    alert("Đã tạo và copy: " + newKey);
}

function saveAdminFile(type) {
    const file = document.getElementById(`f-${type}`).files[0];
    if (file) {
        if (type === 'aim') system.aimFile = file.name;
        else system.recoilFile = file.name;
        document.getElementById(`name-${type}`).innerText = file.name;
    }
}

function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:8px">Scanning...</p>';
    setTimeout(() => {
        grid.innerHTML = '';
        appList.forEach(app => {
            const el = document.createElement('div');
            el.className = 'app-item';
            el.onclick = () => {
                document.querySelectorAll('.app-item').forEach(i => i.classList.remove('selected'));
                el.classList.add('selected');
                system.selected = app;
                document.getElementById('display-target').innerText = app.name;
                document.getElementById('target-path').innerText = app.path;
            };
            el.innerHTML = `<img src="${app.icon}" class="app-icon"><span class="app-name">${app.name}</span>`;
            grid.appendChild(el);
        });
    }, 800);
}

function processFileReplace(type, cb) {
    if (!system.selected) { alert("CHỌN APP!"); cb.checked = false; return; }
    const file = (type === 'aimlock') ? system.aimFile : system.recoilFile;
    if (cb.checked && !file) { alert("ADMIN CHƯA NẠP FILE!"); cb.checked = false; return; }

    const log = document.getElementById('overwrite-log');
    log.classList.remove('hidden');
    if (cb.checked) {
        log.innerHTML += `> Overwriting: ${file}...<br>`;
        setTimeout(() => { log.innerHTML += `<span style="color:#34c759">> SUCCESS 100%</span><br>`; }, 1000);
    }
}

function hideNotificationFor2Hours() {
    localStorage.setItem('hide_notif_until', new Date().getTime() + 7200000);
    closeNotification();
}
function closeNotification() { document.getElementById('notification-overlay').classList.add('hidden'); }
function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}
function logout() { location.reload(); }
window.onload = initSnow;
