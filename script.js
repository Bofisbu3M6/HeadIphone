const ADMIN_KEY = "adminappmenunguyenlong";
const music = document.getElementById('bg-music');

// Dữ liệu ứng dụng thực tế
const mockApps = [
    { name: "Free Fire MAX", pkg: "com.dts.freefiremax", icon: "https://i.ibb.co/image-0.png" },
    { name: "Free Fire", pkg: "com.dts.freefireth", icon: "https://i.ibb.co/image-1.png" },
    { name: "PUBG Mobile", pkg: "com.vng.pubgmobile", icon: "https://via.placeholder.com/45" }
];

let adminData = {
    aimFile: null,
    isMusicPlaying: false
};

// --- HIỆU ỨNG TUYẾT RƠI ---
function createSnow() {
    const container = document.getElementById('snow-container');
    const snowCount = 30;
    for (let i = 0; i < snowCount; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 3 + 4) + 's';
        flake.style.opacity = Math.random();
        flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(flake);
    }
}

// --- LOGIN & MUSIC ---
function checkLogin() {
    const key = document.getElementById('license-key').value;
    if (!key) return;
    
    // Tự động phát nhạc khi vào app
    music.play().catch(() => console.log("Cần tương tác để phát nhạc"));
    adminData.isMusicPlaying = true;

    localStorage.setItem('strongest_session', key);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    if (key === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER";
    }
}

function toggleMusic() {
    if (adminData.isMusicPlaying) {
        music.pause();
        document.getElementById('music-toggle').innerText = "🔈";
    } else {
        music.play();
        document.getElementById('music-toggle').innerText = "🔊";
    }
    adminData.isMusicPlaying = !adminData.isMusicPlaying;
}

// --- ADMIN: TẠO KEY (KEYGEN) ---
function generateKey() {
    const time = document.getElementById('key-time').value;
    const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newKey = `STR-${time}D-${randomStr}`;
    document.getElementById('generated-key-box').value = newKey;
    alert(`Đã tạo key thành công!\nHạn dùng: ${time === '999' ? 'Vĩnh viễn' : time + ' ngày'}`);
}

// --- QUẢN LÝ APP & FILE ---
function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p class="hint">Đang quét vạn vật...</p>';
    
    setTimeout(() => {
        grid.innerHTML = '';
        mockApps.forEach(app => {
            const item = document.createElement('div');
            item.className = 'app-item';
            item.onclick = () => {
                document.querySelectorAll('.app-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                document.getElementById('selected-target-pkg').value = app.pkg;
                document.getElementById('display-target').innerText = app.name;
            };
            item.innerHTML = `<img src="${app.icon}" class="app-icon"><p class="app-name">${app.name}</p>`;
            grid.appendChild(item);
        });
    }, 1000);
}

function prepareFile(type) {
    document.getElementById('ok-aim').classList.remove('hidden');
}

function confirmFile(type) {
    const f = document.getElementById('file-aim').files[0];
    if (f) {
        adminData.aimFile = f.name;
        document.getElementById('active-files').innerHTML = `<p style="font-size:9px; color:green">● File đã nạp: ${f.name}</p>`;
        document.getElementById('ok-aim').classList.add('hidden');
        alert("Admin đã xác nhận file!");
    }
}

// --- THỰC THI ---
function toggleHack(name, cb) {
    const pkg = document.getElementById('selected-target-pkg').value;
    if (!pkg) { alert("Chưa chọn mục tiêu!"); cb.checked = false; return; }
    if (cb.checked) {
        alert(`Đang Inject ${name} vào ${pkg}...\nVật chất đang thay đổi!`);
    }
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function logout() {
    // Nhạc vẫn bật cho đến khi tắt hẳn app theo yêu cầu
    localStorage.removeItem('strongest_session');
    location.reload();
}

window.onload = () => {
    createSnow();
    autoDetect();
};

function autoDetect() {
    document.getElementById('os-info').innerText = navigator.platform;
}
