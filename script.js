const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');

// 3 ỨNG DỤNG MỤC TIÊU THẬT
const realApps = [
    { name: "FREE FIRE MAX", pkg: "com.dts.freefiremax", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png" },
    { name: "FREE FIRE", pkg: "com.dts.freefireth", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png" },
    { name: "PUBG MOBILE", pkg: "com.vng.pubgmobile", icon: "https://i.ibb.co/S6D6m4X/pubg.png" }
];

let system = {
    aimFile: null,
    recoilFile: null,
    musicPlaying: false,
    selectedPkg: ""
};

// --- SNOW EFFECT ---
function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 35; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        flake.style.opacity = Math.random();
        flake.style.fontSize = (Math.random() * 10 + 8) + 'px';
        container.appendChild(flake);
    }
}

// --- MUSIC CONTROL ---
function toggleMusic() {
    if (system.musicPlaying) {
        audio.pause();
        document.getElementById('music-toggle').innerText = "🔈";
    } else {
        audio.play();
        document.getElementById('music-toggle').innerText = "🔊";
    }
    system.musicPlaying = !system.musicPlaying;
}

// --- LOGIN ---
function checkLogin() {
    const key = document.getElementById('license-key').value;
    if (!key) return;

    // Phát nhạc tự động
    audio.play().then(() => system.musicPlaying = true).catch(() => {});

    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    if (key === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER";
    }
}

// --- APP SCANNER ---
function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:9px; color:#7b8b9e">Đang quét vạn vật...</p>';
    
    setTimeout(() => {
        grid.innerHTML = '';
        realApps.forEach(app => {
            const el = document.createElement('div');
            el.className = 'app-item';
            el.onclick = () => {
                document.querySelectorAll('.app-item').forEach(i => i.classList.remove('selected'));
                el.classList.add('selected');
                system.selectedPkg = app.pkg;
                document.getElementById('display-target').innerText = app.name;
            };
            el.innerHTML = `<img src="${app.icon}" class="app-icon"><p class="app-name">${app.name}</p>`;
            grid.appendChild(el);
        });
    }, 1200);
}

// --- ADMIN FILE MGMT ---
function prepareFile(type) {
    document.getElementById(`ok-${type}`).classList.remove('hidden');
}

function confirmFile(type) {
    const fileInput = document.getElementById(`file-${type}`);
    if (fileInput.files[0]) {
        const name = fileInput.files[0].name;
        if (type === 'aim') system.aimFile = name;
        else system.recoilFile = name;
        
        renderFileStatus();
        document.getElementById(`ok-${type}`).classList.add('hidden');
        alert(`Đã nạp file ${name} thành công!`);
    }
}

function renderFileStatus() {
    const status = document.getElementById('active-files');
    status.innerHTML = `
        <p style="color:green">● Aimlock: ${system.aimFile || 'Trống'}</p>
        <p style="color:green">● NoRecoil: ${system.recoilFile || 'Trống'}</p>
    `;
}

// --- KEY GENERATOR ---
function generateKey() {
    const days = document.getElementById('key-time').value;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const finalKey = `ST-${days}D-${code}`;
    document.getElementById('generated-key-box').value = finalKey;
    alert("Key mới đã được tạo!");
}

// --- FUNCTION CONTROL ---
function toggleHack(name, cb) {
    if (!system.selectedPkg) {
        alert("Vui lòng chọn Ứng dụng mục tiêu!");
        cb.checked = false; return;
    }
    const file = (name === 'Aimlock') ? system.aimFile : system.recoilFile;
    if (cb.checked && !file) {
        alert(`Admin chưa nạp file cho ${name}!`);
        cb.checked = false; return;
    }
    alert(cb.checked ? `INJECT: ${file}\nTARGET: ${system.selectedPkg}` : `RESORE: ${system.selectedPkg}`);
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function logout() { location.reload(); }

window.onload = () => {
    initSnow();
    document.getElementById('os-info').innerText = navigator.platform;
};
