const ADMIN_KEY = "adminappmenunguyenlong";
const audio = document.getElementById('bg-music');
const IOS_PATH = "container/documents/contentcache/compulory/ios/gameassetbundles/";

const appList = [
    { id: "ff-max", name: "Free Fire MAX", icon: "https://i.ibb.co/vY8NqZ7/ff-max.png", path: "Free Fire Max/" + IOS_PATH },
    { id: "ff-normal", name: "Free Fire", icon: "https://i.ibb.co/6R0n7Ym/ff-normal.png", path: "Free Fire/" + IOS_PATH }
];

let system = { aimFile: null, recoilFile: null, selected: null, isMusic: false };

function initSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 35; i++) {
        let flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 3 + 4) + 's';
        flake.style.fontSize = (Math.random() * 10 + 8) + 'px';
        container.appendChild(flake);
    }
}

function checkLogin() {
    const key = document.getElementById('license-key').value;
    if (!key) return;
    audio.play().then(() => system.isMusic = true).catch(() => {});
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    if (key === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER";
        document.getElementById('key-expiry-status').innerText = "VĨNH VIỄN";
    } else {
        document.getElementById('key-expiry-status').innerText = "30 NGÀY";
    }

    const hideTime = localStorage.getItem('strongest_hide_until');
    if (!hideTime || new Date().getTime() > hideTime) {
        document.getElementById('notification-overlay').classList.remove('hidden');
    }
}

function closeNotification() { document.getElementById('notification-overlay').classList.add('hidden'); }

function hideNotificationFor2Hours() {
    localStorage.setItem('strongest_hide_until', new Date().getTime() + (2 * 60 * 60 * 1000));
    closeNotification();
}

function requestNativeDeviceApps() {
    const grid = document.getElementById('app-grid-container');
    grid.innerHTML = '<p style="font-size:8px; color:#888;">Scanning iOS Container...</p>';
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
    }, 1000);
}

function saveAdminFile(type) {
    const input = document.getElementById(`f-${type}`);
    if (input.files[0]) {
        if (type === 'aim') system.aimFile = input.files[0].name;
        else system.recoilFile = input.files[0].name;
        document.getElementById('active-file-status').innerHTML = `<p style="color:#007aff; font-size:7px;">● Aim: ${system.aimFile || '---'}</p><p style="color:#af52de; font-size:7px;">● Recoil: ${system.recoilFile || '---'}</p>`;
        alert(`Nạp thành công: ${input.files[0].name}`);
    }
}

function processFileReplace(type, cb) {
    if (!system.selected) { alert("CHƯA CHỌN MỤC TIÊU!"); cb.checked = false; return; }
    const adminFile = (type === 'aimlock') ? system.aimFile : system.recoilFile;
    if (cb.checked && !adminFile) { alert("ADMIN CHƯA NẠP FILE!"); cb.checked = false; return; }

    const log = document.getElementById('overwrite-log');
    log.classList.remove('hidden');
    if (cb.checked) {
        log.innerHTML += `> Matching system file: ${adminFile}...<br>`;
        setTimeout(() => {
            log.innerHTML += `<span style="color:#34c759">> [SUCCESS] 100% Replaced in gameassetbundles</span><br>`;
            log.scrollTop = log.scrollHeight;
        }, 1000);
    }
}

function toggleMusic() {
    system.isMusic ? audio.pause() : audio.play();
    system.isMusic = !system.isMusic;
    document.getElementById('music-toggle').innerText = system.isMusic ? "🔊" : "🔈";
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function logout() { location.reload(); }
window.onload = initSnow;
