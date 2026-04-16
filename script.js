// --- 1. DANH SÁCH KEY HỆ THỐNG (DÙNG CHUNG CHO TẤT CẢ MỌI NGƯỜI) ---
// Thêm key bạn muốn chia sẻ cho bạn bè vào đây.
const HE_THONG_KEYS = {
    "NGUYENLONG-VIP": Date.now() + (365 * 24 * 60 * 60 * 1000), // Hạn 1 năm
    "FREE-KEY": Date.now() + (1 * 24 * 60 * 60 * 1000)         // Hạn 1 ngày
};

// --- 2. DANH SÁCH THIẾT BỊ (GIỮ NGUYÊN 100% KHÔNG XOÁ) ---
const DEVICES = {
    "ANDROID": [
        "Android 4.2.2", "Android 4.3", "Android 4.3.1", "Android 4.4", "Android 4.4.1", "Android 4.4.2", "Android 4.4.3", "Android 4.4.4",
        "Android 5.0", "Android 5.0.1", "Android 5.0.2", "Android 5.1", "Android 5.1.1", "Android 6.0", "Android 6.0.1", "Android 7.0",
        "Android 7.1", "Android 7.1.1", "Android 7.1.2", "Android 8.0", "Android 8.1", "Android 9", "Android 10", "Android 10.0.1",
        "Android 10.0.2", "Android 11", "Android 11.0.1", "Android 12", "Android 12.0.1", "Android 12L", "Android 12.1", "Android 13",
        "Android 13 QPR1", "Android 13 QPR2", "Android 14", "Android 14 QPR1", "Android 14 QPR2", "Android 15"
    ],
    "iOS": [
        "iOS 7.0", "iOS 7.0.1", "iOS 7.0.2", "iOS 7.0.3", "iOS 7.0.4", "iOS 7.0.5", "iOS 7.0.6", "iOS 7.1", "iOS 7.1.1", "iOS 7.1.2",
        "iOS 8.0", "iOS 8.0.1", "iOS 8.0.2", "iOS 8.1", "iOS 8.1.1", "iOS 8.1.2", "iOS 8.1.3", "iOS 8.2", "iOS 8.3", "iOS 8.4", "iOS 8.4.1",
        "iOS 9.0", "iOS 9.0.1", "iOS 9.0.2", "iOS 9.1", "iOS 9.2", "iOS 9.2.1", "iOS 9.3", "iOS 9.3.1", "iOS 9.3.2", "iOS 9.3.3", "iOS 9.3.4", "iOS 9.3.5", "iOS 9.3.6",
        "iOS 10.0", "iOS 10.0.1", "iOS 10.0.2", "iOS 10.0.3", "iOS 10.1", "iOS 10.1.1", "iOS 10.2", "iOS 10.2.1", "iOS 10.3", "iOS 10.3.1", "iOS 10.3.2", "iOS 10.3.3", "iOS 10.3.4",
        "iOS 11.0", "iOS 11.0.1", "iOS 11.0.2", "iOS 11.0.3", "iOS 11.1", "iOS 11.1.1", "iOS 11.1.2", "iOS 11.2", "iOS 11.2.1", "iOS 11.2.2", "iOS 11.2.5", "iOS 11.2.6", "iOS 11.3", "iOS 11.3.1", "iOS 11.4", "iOS 11.4.1",
        "iOS 12.0", "iOS 12.0.1", "iOS 12.1", "iOS 12.1.1", "iOS 12.1.2", "iOS 12.1.3", "iOS 12.1.4", "iOS 12.2", "iOS 12.3", "iOS 12.3.1", "iOS 12.4", "iOS 12.4.1", "iOS 12.4.2", "iOS 12.4.3", "iOS 12.4.4", "iOS 12.4.5", "iOS 12.4.6", "iOS 12.4.7", "iOS 12.4.8", "iOS 12.4.9",
        "iOS 13.0", "iOS 13.1", "iOS 13.1.1", "iOS 13.1.2", "iOS 13.1.3", "iOS 13.2", "iOS 13.2.1", "iOS 13.2.2", "iOS 13.2.3", "iOS 13.3", "iOS 13.3.1", "iOS 13.4", "iOS 13.4.1", "iOS 13.5", "iOS 13.5.1", "iOS 13.6", "iOS 13.6.1", "iOS 13.7",
        "iOS 14.0", "iOS 14.0.1", "iOS 14.1", "iOS 14.2", "iOS 14.2.1", "iOS 14.3", "iOS 14.4", "iOS 14.4.1", "iOS 14.4.2", "iOS 14.5", "iOS 14.5.1", "iOS 14.6", "iOS 14.7", "iOS 14.7.1", "iOS 14.8", "iOS 14.8.1",
        "iOS 15.0", "iOS 15.0.1", "iOS 15.0.2", "iOS 15.1", "iOS 15.1.1", "iOS 15.2", "iOS 15.2.1", "iOS 15.3", "iOS 15.3.1", "iOS 15.4", "iOS 15.4.1", "iOS 15.5", "iOS 15.6", "iOS 15.6.1", "iOS 15.7", "iOS 15.7.1", "iOS 15.7.2", "iOS 15.7.3", "iOS 15.7.4", "iOS 15.7.5", "iOS 15.7.6", "iOS 15.7.7", "iOS 15.7.8",
        "iOS 16.0", "iOS 16.0.1", "iOS 16.0.2", "iOS 16.1", "iOS 16.1.1", "iOS 16.1.2", "iOS 16.2", "iOS 16.3", "iOS 16.3.1", "iOS 16.4", "iOS 16.4.1", "iOS 16.5", "iOS 16.5.1", "iOS 16.6", "iOS 16.6.1", "iOS 16.7",
        "iOS 17.0", "iOS 17.0.1", "iOS 17.0.2", "iOS 17.1", "iOS 17.1.1", "iOS 17.2", "iOS 17.3", "iOS 17.4", "iOS 17.5", "iOS 17.6",
        "iOS 18", "iOS 19", "iOS 26"
    ],
    "WINDOWS": [
        "Windows 8.1", "Windows 10 1507", "Windows 10 1511", "Windows 10 1607", "Windows 10 1703", "Windows 10 1709", "Windows 10 1803",
        "Windows 10 1809", "Windows 10 1903", "Windows 10 1909", "Windows 10 2004", "Windows 10 20H2", "Windows 10 21H1", "Windows 10 21H2", "Windows 10 22H2",
        "Windows 11 21H2", "Windows 11 22H2", "Windows 11 23H2", "Windows 11 24H2"
    ],
    "macOS": [
        "macOS 10.9.5", "macOS 10.10", "macOS 10.10.1", "macOS 10.10.2", "macOS 10.10.3", "macOS 10.10.4", "macOS 10.10.5", "macOS 10.11",
        "macOS 10.11.1", "macOS 10.11.2", "macOS 10.11.3", "macOS 10.11.4", "macOS 10.11.5", "macOS 10.11.6", "macOS 10.12", "macOS 10.12.1",
        "macOS 10.12.2", "macOS 10.12.3", "macOS 10.12.4", "macOS 10.12.5", "macOS 10.12.6", "macOS 10.13", "macOS 10.13.1", "macOS 10.13.2",
        "macOS 10.13.3", "macOS 10.13.4", "macOS 10.13.5", "macOS 10.13.6", "macOS 10.14", "macOS 10.14.1", "macOS 10.14.2", "macOS 10.14.3",
        "macOS 10.14.4", "macOS 10.14.5", "macOS 10.14.6", "macOS 10.15", "macOS 10.15.1", "macOS 10.15.2", "macOS 10.15.3", "macOS 10.15.4",
        "macOS 10.15.5", "macOS 10.15.6", "macOS 10.15.7", "macOS 11", "macOS 12", "macOS 13", "macOS 14", "macOS 15", "macOS 26"
    ]
};

// --- 3. LOGIC HỆ THỐNG ---

window.onload = () => {
    const osSel = document.getElementById('os-select');
    Object.keys(DEVICES).forEach(os => osSel.add(new Option(os, os)));
    
    const appSel = document.getElementById('app-select');
    appSel.add(new Option("Free Fire", "ff"));
    appSel.add(new Option("Free Fire MAX", "ffm"));
    
    updateDevices();
    changeLogo();
    renderKeys();
    syncFiles();
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

// FIX LỖI KEY: Kiểm tra cả Key Hệ thống và Key Local
function handleLogin() {
    const keyInput = document.getElementById('input-key').value.trim();
    
    // 1. Check Key Admin
    if (keyInput === "adminappmenunguyenlong") {
        openApp(true);
        return;
    }

    // 2. Check Key Hệ Thống (Mã bạn tự tay thêm vào code JS này)
    if (HE_THONG_KEYS[keyInput]) {
        let expiry = HE_THONG_KEYS[keyInput];
        if (Date.now() > expiry) {
            alert("Mã Key hệ thống này đã hết hạn!");
        } else {
            showExpiry(expiry);
            return;
        }
    }

    // 3. Check Key Local (Máy nào tạo máy đó dùng)
    let localKeys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    if (localKeys[keyInput]) {
        if (Date.now() > localKeys[keyInput]) {
            alert("Key cá nhân này đã hết hạn!");
        } else {
            showExpiry(localKeys[keyInput]);
        }
    } else {
        alert("LỖI: Key không chính xác hoặc không tồn tại!");
    }
}

function showExpiry(expiryTime) {
    document.getElementById('info-modal').classList.remove('hidden');
    if (window.timer) clearInterval(window.timer);
    window.timer = setInterval(() => {
        let diff = expiryTime - Date.now();
        if (diff <= 0) logout();
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('expiry-countdown').innerText = `CÒN LẠI: ${d} ngày ${h}:${m}:${s}`;
    }, 1000);
}

function openApp(isAdmin) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (isAdmin) document.getElementById('admin-tab').classList.remove('hidden');
}

function toggleMod(cb, name) {
    const statusBox = document.getElementById('file-' + name.replace(/\s+/g, ''));
    if (cb.checked) {
        document.getElementById('mod-name-title').innerText = "KÍCH HOẠT: " + name;
        document.getElementById('game-modal').classList.remove('hidden');
        statusBox.classList.remove('hidden');
    } else {
        statusBox.classList.add('hidden');
    }
}

// ADMIN FILE
function confirmAdminFiles() {
    const aim = document.getElementById('admin-file-aimlock').files[0];
    const rec = document.getElementById('admin-file-norecoil').files[0];
    if (aim) localStorage.setItem('share_aim', aim.name);
    if (rec) localStorage.setItem('share_rec', rec.name);
    alert("Đã lưu cấu hình file hệ thống!");
    syncFiles();
}

function syncFiles() {
    const aim = localStorage.getItem('share_aim');
    const rec = localStorage.getItem('share_rec');
    if (aim) document.querySelector('#file-Aimlock .status-text').innerHTML = `✅ Đã nạp: <b style="color:var(--gold)">${aim}</b>`;
    if (rec) document.querySelector('#file-NoRecoil .status-text').innerHTML = `✅ Đã nạp: <b style="color:var(--gold)">${rec}</b>`;
}

// TIỆN ÍCH
function startScan() {
    const btn = document.getElementById('btn-scan');
    btn.innerText = "ĐANG PHÂN TÍCH...";
    setTimeout(() => {
        btn.innerText = "HOÀN TẤT!"; btn.style.background = "#34c759";
        setTimeout(() => { btn.innerText = "QUÉT DỮ LIỆU GAME"; btn.style.background = ""; }, 1500);
    }, 1000);
}

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

function switchTab(btn, tabId) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

function closeGameSelector() { document.getElementById('game-modal').classList.add('hidden'); }
function closeInfoModal() { document.getElementById('info-modal').classList.add('hidden'); openApp(false); }
function logout() { location.reload(); }
