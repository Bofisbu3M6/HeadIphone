/* ============================================================
   STRONGEST SUPPORT SYSTEM - FULL SCRIPT 2024
   Hệ thống quản lý Mod Menu qua Web (Bypass Manual Steps)
   ============================================================ */

// 1. CẤU HÌNH HỆ THỐNG
const ADMIN_KEY = "adminappmenunguyenlong"; // Key vào trang quản trị
const audio = document.getElementById('bg-music');

// Đường dẫn Game (Giữ lại để hệ thống không lỗi logic chọn game)
const IOS_PATH = "container/documents/contentcache/compulory/ios/gameassetbundles/";

const appList = [
    { id: "ff-max", name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", path: "Free Fire Max/" + IOS_PATH, scheme: "freefiremax://" },
    { id: "ff-normal", name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", path: "Free Fire/" + IOS_PATH, scheme: "freefire://" }
];

let system = { 
    selected: null, 
    countdown: null,
    role: "GUEST"
};

// 2. KHỞI TẠO KHI MỞ TRANG
window.onload = function() {
    initSnow();
    checkExistingSession(); 
    updateAdminFileInfo(); 
};

function initSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 5 + 7) + 's';
        flake.style.opacity = Math.random();
        container.appendChild(flake);
    }
}

// 3. HỆ THỐNG ĐĂNG NHẬP
function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if (!key) return alert("VUI LÒNG NHẬP KEY!");

    if (key === ADMIN_KEY) {
        enterSystem("OWNER");
        return;
    }

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (!keys[key]) return alert("KEY KHÔNG HỢP LỆ!");

    const now = new Date().getTime();
    if (now > keys[key].expiry) return alert("KEY ĐÃ HẾT HẠN!");

    enterSystem("MEMBER", keys[key].expiry);
}

function enterSystem(role, expiry) {
    system.role = role;
    if (audio) audio.play().catch(() => {});
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    const badge = document.getElementById('key-type-badge');
    const devTab = document.getElementById('dev-tab');

    if (role === "OWNER") {
        badge.innerText = "OWNER (ADMIN)";
        badge.style.background = "#ff3b30";
        devTab.classList.remove('hidden');
    } else {
        badge.innerText = "MEMBER (VIP)";
        startCountdown(expiry);
    }
    
    localStorage.setItem('session_role', role);
    if(expiry) localStorage.setItem('session_expiry', expiry);
}

function startCountdown(expiry) {
    if (system.countdown) clearInterval(system.countdown);
    system.countdown = setInterval(() => {
        const diff = expiry - new Date().getTime();
        if (diff <= 0) { logout(); }
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('key-countdown').innerText = `${h}h : ${m}m : ${s}s`;
    }, 1000);
}

// 4. CHỨC NĂNG QUẢN TRỊ
function saveAdminFile(type) {
    const fileInput = document.getElementById(`f-${type}`);
    const file = fileInput.files[0];
    if (file) {
        localStorage.setItem(`shared_${type}_name`, file.name);
        updateAdminFileInfo();
        alert(`NẠP FILE ${type.toUpperCase()} THÀNH CÔNG!`);
    }
}

function updateAdminFileInfo() {
    ['aimlock', 'norecoil'].forEach(t => {
        const name = localStorage.getItem(`shared_${t}_name`) || "Trống";
        const el = document.getElementById(`name-${t}`);
        if(el) el.innerText = name;
    });
}

function adminCreateKey() {
    const dur = document.getElementById('key-duration').value;
    const key = "STR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[key] = { expiry: new Date().getTime() + (dur * 1000) };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    navigator.clipboard.writeText(key);
    alert("ĐÃ TẠO & COPY KEY: " + key);
}

// 5. CHỨC NĂNG NGƯỜI DÙNG (CHỈNH SỬA NÚT MỞ GAME)
function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:10px; color:#8e8e93;">Đang quét Game...</p>';
    
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
                document.getElementById('target-path').innerText = "Sẵn sàng kích hoạt";
            };
            el.innerHTML = `<img src="${app.icon}" class="app-icon"><span class="app-name">${app.name}</span>`;
            grid.appendChild(el);
        });
    }, 500);
}

function processFileReplace(type, cb) {
    if (!system.selected) {
        alert("⚠️ VUI LÒNG CHỌN GAME Ở DASHBOARD TRƯỚC!");
        cb.checked = false;
        return;
    }

    const log = document.getElementById('overwrite-log');
    const sharedFileName = localStorage.getItem(`shared_${type}_name`);

    if (cb.checked) {
        if (!sharedFileName) {
            alert("FILE CHƯA ĐƯỢC ADMIN CẬP NHẬT!");
            cb.checked = false;
            return;
        }

        log.classList.remove('hidden');
        log.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <span style="color: #34c759; font-weight: 800; font-size: 12px;">● ĐÃ KÍCH HOẠT: ${type.toUpperCase()}</span><br>
                <small style="color: #8e8e93;">File hệ thống: ${sharedFileName}</small>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
                <div style="display:flex; gap:8px;">
                    <button onclick="launchGame('freefire://')" style="background:#007aff; border:none; color:#fff; padding:10px; border-radius:8px; flex:1; font-weight:800; font-size:10px;">MỞ FREE FIRE</button>
                    <button onclick="launchGame('freefiremax://')" style="background:#34c759; border:none; color:#fff; padding:10px; border-radius:8px; flex:1; font-weight:800; font-size:10px;">MỞ FF MAX</button>
                </div>
            </div>
        `;
    } else {
        log.classList.add('hidden');
    }
}

// 6. TIỆN ÍCH
function launchGame(scheme) {
    window.location.href = scheme;
    const log = document.getElementById('overwrite-log');
    log.innerHTML += `<br><span style="color:#ffcc00; font-size:9px;">> Đang yêu cầu mở Game...</span>`;
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
    if(id === 'dashboard') requestNativeDeviceApps();
}

function toggleMusic() {
    if (audio.paused) audio.play(); else audio.pause();
}

function logout() {
    localStorage.removeItem('session_role');
    localStorage.removeItem('session_expiry');
    location.reload();
}

function checkExistingSession() {
    const role = localStorage.getItem('session_role');
    const expiry = localStorage.getItem('session_expiry');
    if (role) enterSystem(role, expiry ? parseInt(expiry) : null);
}
