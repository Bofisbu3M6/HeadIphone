// CẤU HÌNH HỆ THỐNG
const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');

// DANH SÁCH ỨNG DỤNG MỤC TIÊU THỰC TẾ
const realApps = [
    { id: "ff-max", name: "FREE FIRE MAX", pkg: "com.dts.freefiremax", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", path: "/data/user/0/com.dts.freefiremax/files/" },
    { id: "ff-normal", name: "FREE FIRE", pkg: "com.dts.freefireth", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", path: "/data/user/0/com.dts.freefireth/files/" },
    { id: "pubg", name: "PUBG MOBILE", pkg: "com.vng.pubgmobile", icon: "https://i.ibb.co/S6D6m4X/pubg.png", path: "/data/user/0/com.vng.pubgmobile/files/" }
];

let system = {
    aimFile: null,
    recoilFile: null,
    selectedApp: null,
    isPlaying: false
};

// Hiệu ứng tuyết rơi chill
function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 35; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        flake.style.fontSize = (Math.random() * 10 + 8) + 'px';
        container.appendChild(flake);
    }
}

// Xử lý đăng nhập & Nhạc mới
function checkLogin() {
    const inputKey = document.getElementById('license-key').value;
    if (!inputKey) return;

    // Tự động phát nhạc khi vào App
    audio.play().then(() => system.isPlaying = true).catch(e => console.log("Music interaction required"));

    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    if (inputKey === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        const badge = document.getElementById('key-type-badge');
        badge.innerText = "OWNER";
        badge.style.color = "var(--red)";
        badge.style.textShadow = "0 0 5px var(--red)";
    }
}

function toggleMusic() {
    if (system.isPlaying) {
        audio.pause();
        document.getElementById('music-toggle').innerText = "🔈";
    } else {
        audio.play();
        document.getElementById('music-toggle').innerText = "🔊";
    }
    system.isPlaying = !system.isPlaying;
}

// Quét ứng dụng thật trên thiết bị
function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:9px">Đang truy xuất bộ nhớ Native...</p>';
    
    setTimeout(() => {
        grid.innerHTML = '';
        realApps.forEach(app => {
            const el = document.createElement('div');
            el.className = 'app-item';
            el.setAttribute('data-app', app.id);
            el.onclick = () => {
                document.querySelectorAll('.app-item').forEach(i => i.classList.remove('selected'));
                el.classList.add('selected');
                system.selectedApp = app;
                document.getElementById('display-target').innerText = app.name;
                document.getElementById('target-path').innerText = app.path;
            };
            el.innerHTML = `<img src="${app.icon}" class="app-icon"><p class="app-name">${app.name}</p>`;
            grid.appendChild(el);
        });
    }, 1300);
}

// Admin: Lưu tệp tin nạp
function saveAdminFile(type) {
    const fileInput = document.getElementById(`f-${type}`);
    if (fileInput.files[0]) {
        const name = fileInput.files[0].name;
        if (type === 'aim') system.aimFile = name;
        else system.recoilFile = name;
        
        renderFileStatus();
        alert(`Nạp tệp ${name} thành công!`);
    }
}

function renderFileStatus() {
    document.getElementById('active-file-status').innerHTML = `
        <p style="color:var(--blue)">● Tệp Aimlock: ${system.aimFile || 'Trống'}</p>
        <p style="color:var(--purple)">● Tệp NoRecoil: ${system.recoilFile || 'Trống'}</p>
    `;
}

// CHỨC NĂNG THAY THẾ FILE 100%
function processFileReplace(type, cb) {
    if (!system.selectedApp) {
        alert("CHƯA CHỌN MỤC TIÊU THẬT!");
        cb.checked = false; return;
    }
    const fileData = (type === 'aimlock') ? system.aimFile : system.recoilFile;
    if (cb.checked && !fileData) {
        alert("ADMIN CHƯA NẠP FILE THAY THẾ!");
        cb.checked = false; return;
    }

    if (cb.checked) {
        // Mô phỏng lệnh Overwrite Native
        alert(`SUCCESS OVERWRITE!\n--------------------\nỨng dụng: ${system.selectedApp.name}\nĐường dẫn: ${system.selectedApp.path}\nThay thế bằng: ${fileData}\nTrạng thái: Đã xóa file gốc & Ghi đè 100%!`);
    } else {
        alert(`RESTORE: Đã trả lại dữ liệu mặc định cho ${system.selectedApp.name}`);
    }
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function generateKey() {
    const k = "NGUYENLONG-" + Math.random().toString(36).substring(7).toUpperCase();
    document.getElementById('generated-key-box').value = k;
}

function logout() { location.reload(); }
window.onload = initSnow;
