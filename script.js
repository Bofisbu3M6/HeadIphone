const ADMIN_KEY = "adminappmenunguyenlong";
let countdownTimer;

// Khởi tạo tuyết rơi chậm
function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 40; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        // Tốc độ chậm từ 8s đến 15s
        flake.style.animationDuration = (Math.random() * 7 + 8) + 's'; 
        flake.style.opacity = Math.random();
        flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(flake);
    }
}

// Hệ thống quản lý Key (Lưu vào localStorage để giả lập server)
function checkLogin() {
    const inputKey = document.getElementById('license-key').value.trim();
    if (!inputKey) return;

    // 1. Kiểm tra nếu là Admin
    if (inputKey === ADMIN_KEY) {
        showMainPanel("OWNER");
        return;
    }

    // 2. Kiểm tra Key trong hệ thống
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    
    if (!keys[inputKey]) {
        alert("❌ KEY KHÔNG TỒN TẠI TRÊN HỆ THỐNG!");
        return;
    }

    // 3. Kiểm tra thời hạn
    const now = new Date().getTime();
    if (now > keys[inputKey].expiry) {
        delete keys[inputKey]; // Xóa key hết hạn
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
        alert("❌ KEY ĐÃ HẾT HẠN VÀ BỊ XÓA KHỎI HỆ THỐNG!");
        return;
    }

    // 4. Đăng nhập thành công
    showMainPanel("MEMBER", keys[inputKey].expiry);
}

function showMainPanel(role, expiryMs) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    
    if (role === "OWNER") {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER";
    }

    // Kiểm tra ẩn thông báo 2h
    const hideUntil = localStorage.getItem('hide_notif_until');
    if (!hideUntil || new Date().getTime() > hideUntil) {
        document.getElementById('notification-overlay').classList.remove('hidden');
    }

    if (expiryMs) startCountdown(expiryMs);
    else document.getElementById('key-countdown').innerText = "VĨNH VIỄN";
}

// Đếm ngược thời gian Key
function startCountdown(expiryMs) {
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const diff = expiryMs - now;

        if (diff <= 0) {
            clearInterval(countdownTimer);
            alert("Hết thời gian sử dụng!");
            location.reload();
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('key-countdown').innerText = 
            `${d}d : ${h.toString().padStart(2,'0')}h : ${m.toString().padStart(2,'0')}m : ${s.toString().padStart(2,'0')}s`;
    }, 1000);
}

// Admin Tạo Key
function adminCreateKey() {
    const duration = parseInt(document.getElementById('key-duration').value);
    const newKey = "STR-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const expiry = new Date().getTime() + (duration * 1000);

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[newKey] = { expiry: expiry };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));

    navigator.clipboard.writeText(newKey);
    document.getElementById('admin-log').innerText = "Đã tạo và copy Key: " + newKey;
}

function hideNotificationFor2Hours() {
    const twoHours = new Date().getTime() + (2 * 60 * 60 * 1000);
    localStorage.setItem('hide_notif_until', twoHours);
    closeNotification();
}

function closeNotification() {
    document.getElementById('notification-overlay').classList.add('hidden');
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function logout() { location.reload(); }
window.onload = initSnow;
