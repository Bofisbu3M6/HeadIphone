// GIỮ NGUYÊN DANH SÁCH THIẾT BỊ KHÔNG XOÁ
const DEVICES = {
    "ANDROID": [
        "Android 4.2.2", "Android 4.4.4", "Android 5.1.1", 
        "Android 10", "Android 11", "Android 12", 
        "Android 13", "Android 14", "Android 15"
    ],
    "iOS": [
        "iOS 7.0", "iOS 12.4.9", "iOS 15.7", 
        "iOS 16.7", "iOS 17.6", "iOS 18", 
        "iOS 19", "iOS 26"
    ],
    "WINDOWS": [
        "Windows 8.1", "Windows 10 22H2", "Windows 11 24H2"
    ],
    "macOS": [
        "macOS 10.15", "macOS 12", "macOS 15", "macOS 26"
    ]
};

window.onload = () => {
    const osSel = document.getElementById('os-select');
    Object.keys(DEVICES).forEach(os => osSel.add(new Option(os, os)));
    
    const appSel = document.getElementById('app-select');
    appSel.add(new Option("Free Fire", "ff"));
    appSel.add(new Option("Free Fire MAX", "ffm"));
    
    updateDevices();
    changeLogo();
    renderKeys();
    syncSharedFiles(); // Tự động load file admin đã nạp cho người dùng
};

function updateDevices() {
    const os = document.getElementById('os-select').value;
    const devSel = document.getElementById('device-select');
    devSel.innerHTML = "";
    DEVICES[os].forEach(d => devSel.add(new Option(d, d)));
}

function changeLogo() {
    const app = document.getElementById('app-select').value;
    document.getElementById('logo-img').src = app === 'ff' 
        ? "https://i.ibb.co/LnMZ6pG/ff-normal.png" 
        : "https://i.ibb.co/0X8y0Xm/ff-max.png";
}

// LOGIN & KEY
function handleLogin() {
    const keyInput = document.getElementById('input-key').value.trim();
    if (keyInput === "adminappmenunguyenlong") {
        openApp(true);
        return;
    }

    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    if (keys[keyInput]) {
        if (Date.now() > keys[keyInput]) {
            alert("Key đã hết hạn!");
        } else {
            showExpiry(keys[keyInput]);
        }
    } else {
        alert("Key không chính xác!");
    }
}

function showExpiry(expiryTime) {
    document.getElementById('info-modal').classList.remove('hidden');
    setInterval(() => {
        let diff = expiryTime - Date.now();
        if (diff <= 0) logout();
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('expiry-countdown').innerText = `${d} Ngày ${h}:${m}:${s}`;
    }, 1000);
}

function openApp(isAdmin) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (isAdmin) document.getElementById('admin-tab').classList.remove('hidden');
}

// ADMIN KEY
function createKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const days = parseInt(document.getElementById('key-expiry').value);
    if (!name) return;
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    keys[name] = Date.now() + (days * 24 * 60 * 60 * 1000);
    localStorage.setItem('app_keys', JSON.stringify(keys));
    renderKeys();
}

function renderKeys() {
    const list = document.getElementById('key-list');
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    list.innerHTML = "";
    Object.keys(keys).forEach(k => {
        let div = document.createElement('div');
        div.className = 'key-item';
        div.innerHTML = `<span>${k}</span><button onclick="deleteKey('${k}')">XÓA</button>`;
        list.appendChild(div);
    });
}

function deleteKey(k) {
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    delete keys[k];
    localStorage.setItem('app_keys', JSON.stringify(keys));
    renderKeys();
}

// ADMIN FILE (DÙNG CHUNG)
function confirmAdminFiles() {
    const aimFile = document.getElementById('admin-file-aimlock').files[0];
    const recFile = document.getElementById('admin-file-norecoil').files[0];

    if (aimFile) localStorage.setItem('shared_aim', aimFile.name);
    if (recFile) localStorage.setItem('shared_rec', recFile.name);

    alert("Xác nhận thành công! File đã được nạp cho toàn bộ người dùng.");
    syncSharedFiles();
}

function syncSharedFiles() {
    const aim = localStorage.getItem('shared_aim');
    const rec = localStorage.getItem('shared_rec');
    if (aim) document.querySelector('#file-Aimlock .status-text').innerHTML = `✅ Hệ thống đã nạp: <b>${aim}</b>`;
    if (rec) document.querySelector('#file-NoRecoil .status-text').innerHTML = `✅ Hệ thống đã nạp: <b>${rec}</b>`;
}

// CHỨC NĂNG
function toggleMod(checkbox, name) {
    const statusDiv = document.getElementById('file-' + name.replace(/\s+/g, ''));
    if (checkbox.checked) {
        // Chỉ hiện thông báo khi bật (ON)
        document.getElementById('mod-name-title').innerText = "BẬT: " + name;
        document.getElementById('game-modal').classList.remove('hidden');
        statusDiv.classList.remove('hidden');
    } else {
        // Tắt thì im lặng ẩn đi
        statusDiv.classList.add('hidden');
    }
}

function startScan() {
    const btn = document.getElementById('btn-scan');
    btn.innerText = "ĐANG QUÉT...";
    setTimeout(() => {
        btn.innerText = "QUÉT HOÀN TẤT!";
        btn.style.background = "#34c759";
        setTimeout(() => {
            btn.innerText = "QUÉT THIẾT BỊ & ỨNG DỤNG";
            btn.style.background = "";
        }, 1500);
    }, 800);
}

function switchTab(btn, tabId) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

function closeGameSelector() { document.getElementById('game-modal').classList.add('hidden'); }
function closeInfoModal() { document.getElementById('info-modal').classList.add('hidden'); openApp(false); }
function logout() { location.reload(); }
