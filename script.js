const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');
const IOS_PATH = "container/documents/contentcache/compulory/ios/gameassetbundles/";

const appList = [
    { id: "ff-max", name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", path: "Free Fire Max/" + IOS_PATH },
    { id: "ff-normal", name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", path: "Free Fire/" + IOS_PATH }
];

let system = { 
    selected: null, 
    countdown: null 
};

// Hiệu ứng tuyết rơi
function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 30; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 5 + 10) + 's';
        container.appendChild(flake);
    }
    // Hiển thị tên file admin đã nạp nếu có
    document.getElementById('name-aimlock').innerText = localStorage.getItem('shared_aimlock_name') || "Trống";
    document.getElementById('name-norecoil').innerText = localStorage.getItem('shared_norecoil_name') || "Trống";
}

// Đăng nhập
function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if (key === ADMIN_KEY) return enterSystem("OWNER");

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (!keys[key]) return alert("KEY KHÔNG TỒN TẠI!");

    const now = new Date().getTime();
    if (now > keys[key].expiry) return alert("KEY HẾT HẠN!");

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
    if (system.countdown) clearInterval(system.countdown);
    system.countdown = setInterval(() => {
        const diff = expiry - new Date().getTime();
        if (diff <= 0) location.reload();
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('key-countdown').innerText = `${d}d:${h}h:${m}m:${s}s`;
    }, 1000);
}

// Admin: Lưu file dùng chung cho tất cả user
function saveAdminFile(type) {
    const file = document.getElementById(`f-${type}`).files[0];
    if (file) {
        localStorage.setItem(`shared_${type}_name`, file.name);
        document.getElementById(`name-${type}`).innerText = file.name;
        alert("Đã cập nhật file dùng chung cho: " + type.toUpperCase());
    }
}

// Dashboard: Quét App
function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:8px">Scanning Apps...</p>';
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
                document.getElementById('target-path').innerText = app.name;
            };
            el.innerHTML = `<img src="${app.icon}" class="app-icon"><span class="app-name">${app.name}</span>`;
            grid.appendChild(el);
        });
    }, 1000);
}

// Chức năng: Xử lý file (Dùng chung và Path cho ESign)
function processFileReplace(type, cb) {
    if (!system.selected) { alert("HÃY CHỌN APP MỤC TIÊU!"); cb.checked = false; return; }

    const sharedFile = localStorage.getItem(`shared_${type}_name`);
    if (cb.checked) {
        if (!sharedFile) { alert("ADMIN CHƯA NẠP FILE!"); cb.checked = false; return; }

        const log = document.getElementById('overwrite-log');
        log.classList.remove('hidden');
        log.innerHTML += `> Chế độ: Dùng chung hệ thống...<br>`;
        log.innerHTML += `> File Mod: ${sharedFile}<br>`;
        log.innerHTML += `> Path: ${system.selected.path}<br>`;
        
        // Cung cấp công cụ cho ESign
        log.innerHTML += `
            <div style="margin-top:8px; display:flex; gap:5px;">
                <button onclick="copyPath('${system.selected.path}')" style="background:#007aff; border:none; color:#fff; padding:5px; border-radius:5px; font-size:9px; cursor:pointer;">COPY PATH</button>
                <button onclick="alert('Đã sẵn sàng! Hãy mở ESign dán file này vào đường dẫn vừa copy.')" style="background:#34c759; border:none; color:#fff; padding:5px; border-radius:5px; font-size:9px; cursor:pointer;">DÁN TRONG ESIGN</button>
            </div><br>
        `;
        log.scrollTop = log.scrollHeight;
    }
}

// Tiện ích
function copyPath(p) { navigator.clipboard.writeText(p); alert("Đã copy Path! Dùng Path này trong ESign để thay thế file."); }
function adminCreateKey() {
    const dur = document.getElementById('key-duration').value;
    const key = "STR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[key] = { expiry: new Date().getTime() + (dur * 1000) };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    navigator.clipboard.writeText(key);
    alert("Đã tạo Key: " + key);
}
function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}
function toggleMusic() { audio.paused ? audio.play() : audio.pause(); }
function hideNotificationFor2Hours() { localStorage.setItem('hide_notif_until', new Date().getTime() + 7200000); closeNotification(); }
function closeNotification() { document.getElementById('notification-overlay').classList.add('hidden'); }
function logout() { location.reload(); }
window.onload = initSnow;
