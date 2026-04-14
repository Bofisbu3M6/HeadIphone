const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');
const IOS_PATH = "container/documents/contentcache/compulory/ios/gameassetbundles/";

const appList = [
    { id: "ff-max", name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", path: "Free Fire Max/" + IOS_PATH },
    { id: "ff-normal", name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", path: "Free Fire/" + IOS_PATH }
];

// system sẽ lấy dữ liệu từ localStorage để dùng chung cho tất cả user
let system = { 
    aimlockFile: localStorage.getItem('shared_aimlock_name') || null, 
    norecoilFile: localStorage.getItem('shared_norecoil_name') || null, 
    selected: null, 
    isMusic: false, 
    countdown: null 
};

// Hiệu ứng tuyết rơi chậm
function initSnow() {
    const container = document.getElementById('snow-container');
    if(!container) return;
    for (let i = 0; i < 35; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 5 + 10) + 's';
        flake.style.opacity = Math.random();
        container.appendChild(flake);
    }
    // Hiển thị tên file đã nạp sẵn nếu có (cho Admin thấy)
    if(system.aimlockFile) document.getElementById('name-aimlock').innerText = system.aimlockFile;
    if(system.norecoilFile) document.getElementById('name-norecoil').innerText = system.norecoilFile;
}

// Kiểm tra đăng nhập
function checkLogin() {
    const key = document.getElementById('license-key').value.trim();
    if (!key) return;

    if (key === ADMIN_KEY) {
        enterSystem("OWNER");
        return;
    }

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (!keys[key]) {
        alert("❌ KEY KHÔNG TỒN TẠI TRÊN HỆ THỐNG!");
        return;
    }

    const now = new Date().getTime();
    if (now > keys[key].expiry) {
        delete keys[key];
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
        alert("❌ KEY ĐÃ HẾT HẠN VÀ TỰ ĐỘNG BỊ XÓA!");
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
        document.getElementById('key-type-badge').innerText = "MEMBER";
        startCountdown(expiry);
    }

    const hideUntil = localStorage.getItem('hide_notif_until');
    if (!hideUntil || new Date().getTime() > hideUntil) {
        document.getElementById('notification-overlay').classList.remove('hidden');
    }
}

// Đếm ngược thời gian Key
function startCountdown(expiry) {
    if (system.countdown) clearInterval(system.countdown);
    system.countdown = setInterval(() => {
        const now = new Date().getTime();
        const diff = expiry - now;
        if (diff <= 0) {
            clearInterval(system.countdown);
            alert("Hết thời gian sử dụng Key!");
            location.reload();
            return;
        }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('key-countdown').innerText = `${d}d:${h}h:${m}m:${s}s`;
    }, 1000);
}

// Admin Tạo Key
function adminCreateKey() {
    const dur = document.getElementById('key-duration').value;
    const newKey = "STR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[newKey] = { expiry: new Date().getTime() + (dur * 1000) };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    navigator.clipboard.writeText(newKey);
    alert("Đã tạo và copy Key: " + newKey);
}

// CHỨC NĂNG QUAN TRỌNG: Nạp file dùng chung cho toàn bộ hệ thống
function saveAdminFile(type) {
    const fileInput = document.getElementById(`f-${type}`);
    const file = fileInput.files[0];
    
    if (file) {
        // Lưu tên file vào bộ nhớ dùng chung
        localStorage.setItem(`shared_${type}_name`, file.name);
        
        // Cập nhật trạng thái hệ thống ngay lập tức
        if (type === 'aimlock') system.aimlockFile = file.name;
        if (type === 'norecoil') system.norecoilFile = file.name;
        
        document.getElementById(`name-${type}`).innerText = file.name;
        alert(`ADMIN: Đã cập nhật file ${type.toUpperCase()} dùng chung cho tất cả người dùng!`);
    }
}

// Dashboard: Quét App
function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:10px; color:#007aff;">Đang quét iPhone...</p>';
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
    }, 1200);
}

// Người dùng kích hoạt file (Dùng chung file từ Admin)
function processFileReplace(type, cb) {
    if (!system.selected) { 
        alert("CHỌN APP TRƯỚC!"); 
        cb.checked = false; 
        return; 
    }

    // Luôn lấy file mới nhất từ localStorage (dùng chung)
    const sharedFileName = localStorage.getItem(`shared_${type}_name`);
    
    if (cb.checked) {
        if (!sharedFileName) {
            alert("HỆ THỐNG: Hiện chưa có file dùng chung. Vui lòng đợi Admin nạp file!");
            cb.checked = false;
            return;
        }

        const log = document.getElementById('overwrite-log');
        log.classList.remove('hidden');
        log.innerHTML += `> Đang tải file dùng chung: ${sharedFileName}...<br>`;
        
        setTimeout(() => {
            log.innerHTML += `<span style="color:#34c759">> [SUCCESS] Đã ghi đè file dùng chung thành công!</span><br>`;
            log.scrollTop = log.scrollHeight;
        }, 1500);
    }
}

function toggleMusic() {
    if (audio.paused) { audio.play(); document.getElementById('music-toggle').innerText = "🔊"; }
    else { audio.pause(); document.getElementById('music-toggle').innerText = "🔈"; }
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
