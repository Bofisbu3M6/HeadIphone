// --- 1. DANH SÁCH KEY HỆ THỐNG (MÁY NÀO CŨNG NHẬP ĐƯỢC) ---
// Bạn có thể đặt tên bất kỳ vào đây, ví dụ: "Anh Yêu Em", "123", "Key_Vip_99"...
const HE_THONG_KEYS = {
    "TUANHIEP-VIP": Date.now() + (365 * 24 * 60 * 60 * 1000), 
    "ADMIN-LUON-THANG": Date.now() + (999 * 24 * 60 * 60 * 1000),
    "123": Date.now() + (1 * 24 * 60 * 60 * 1000) 
};

// --- 2. THIẾT BỊ ---
const DEVICES = {
    "ANDROID": ["Android 10", "Android 11", "Android 12", "Android 13", "Android 14", "Android 15"],
    "iOS": ["iOS 16", "iOS 17", "iOS 18", "iOS 26"],
    "WINDOWS": ["Windows 10", "Windows 11"],
    "macOS": ["macOS 14", "macOS 15"]
};

// --- 3. KHỞI TẠO ---
window.onload = () => {
    const osSel = document.getElementById('os-select');
    if(osSel) {
        Object.keys(DEVICES).forEach(os => osSel.add(new Option(os, os)));
        updateDevices();
    }
    const appSel = document.getElementById('app-select');
    if(appSel) {
        appSel.add(new Option("Free Fire", "ff"));
        appSel.add(new Option("Free Fire MAX", "ffm"));
        changeLogo();
    }
    renderKeys();
    syncFiles();
};

function updateDevices() {
    const os = document.getElementById('os-select').value;
    const devSel = document.getElementById('device-select');
    if(devSel) {
        devSel.innerHTML = "";
        DEVICES[os].forEach(d => devSel.add(new Option(d, d)));
    }
}

function changeLogo() {
    const app = document.getElementById('app-select').value;
    const img = document.getElementById('logo-img');
    if(img) {
        img.src = app === 'ff' 
            ? "https://i.ibb.co/LnMZ6pG/ff-normal.png" 
            : "https://i.ibb.co/0X8y0Xm/ff-max.png";
    }
}

// --- 4. ĐĂNG NHẬP (CHẤP NHẬN TẤT CẢ TÊN KEY) ---
function handleLogin() {
    const keyInput = document.getElementById('input-key').value.trim();
    
    if (!keyInput) {
        alert("Vui lòng nhập Key!");
        return;
    }

    // Kiểm tra Key Admin cố định
    if (keyInput === "adminappmenunguyenlong") {
        openApp(true);
        return;
    }

    // Kiểm tra Key Hệ Thống (Viết trong code)
    if (HE_THONG_KEYS[keyInput]) {
        let expiry = HE_THONG_KEYS[keyInput];
        if (Date.now() > expiry) {
            alert("Key hệ thống này đã hết hạn!");
        } else {
            showExpiry(expiry);
        }
        return;
    }

    // Kiểm tra Key Local (Tạo từ tab Admin trên máy này)
    let localKeys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    if (localKeys[keyInput]) {
        if (Date.now() > localKeys[keyInput]) {
            alert("Key này đã hết hạn!");
        } else {
            showExpiry(localKeys[keyInput]);
        }
    } else {
        alert("Key không tồn tại! Nếu bạn vừa tạo key trên máy khác, hãy thêm nó vào mục HE_THONG_KEYS trong code.");
    }
}

function showExpiry(expiryTime) {
    const modal = document.getElementById('info-modal');
    if(modal) modal.classList.remove('hidden');
    
    if (window.loginTimer) clearInterval(window.loginTimer);
    window.loginTimer = setInterval(() => {
        let diff = expiryTime - Date.now();
        if (diff <= 0) {
            clearInterval(window.loginTimer);
            logout();
        }
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('expiry-countdown').innerText = `HẠN DÙNG: ${d}N ${h}:${m}:${s}`;
    }, 1000);
}

function openApp(isAdmin) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (isAdmin) document.getElementById('admin-tab').classList.remove('hidden');
}

// --- 5. QUẢN LÝ KEY (TẠO TÊN BẤT KỲ) ---
function createKey() {
    const name = document.getElementById('new-key-name').value.trim(); // Lấy tên bất kỳ
    const days = parseInt(document.getElementById('key-expiry').value);
    
    if (!name) {
        alert("Vui lòng nhập tên Key!");
        return;
    }

    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    keys[name] = Date.now() + (days * 24 * 60 * 60 * 1000);
    localStorage.setItem('app_keys', JSON.stringify(keys));
    
    renderKeys();
    document.getElementById('new-key-name').value = ""; // Xóa sau khi tạo
    alert("Đã tạo Key: " + name);
}

function renderKeys() {
    const list = document.getElementById('key-list');
    if(!list) return;
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

// --- 6. FILE & MODS ---
function confirmAdminFiles() {
    const aim = document.getElementById('admin-file-aimlock').files[0];
    const rec = document.getElementById('admin-file-norecoil').files[0];
    if (aim) localStorage.setItem('share_aim', aim.name);
    if (rec) localStorage.setItem('share_rec', rec.name);
    alert("Cập nhật file thành công!");
    syncFiles();
}

function syncFiles() {
    const aim = localStorage.getItem('share_aim');
    const rec = localStorage.getItem('share_rec');
    const aimBox = document.querySelector('#file-Aimlock .status-text');
    const recBox = document.querySelector('#file-NoRecoil .status-text');
    if (aim && aimBox) aimBox.innerHTML = `✅ File: <b style="color:#f1c40f">${aim}</b>`;
    if (rec && recBox) recBox.innerHTML = `✅ File: <b style="color:#f1c40f">${rec}</b>`;
}

function toggleMod(cb, name) {
    const statusBox = document.getElementById('file-' + name.replace(/\s+/g, ''));
    if (cb.checked) {
        document.getElementById('mod-name-title').innerText = "MOD: " + name;
        document.getElementById('game-modal').classList.remove('hidden');
        if(statusBox) statusBox.classList.remove('hidden');
    } else {
        if(statusBox) statusBox.classList.add('hidden');
    }
}

// --- 7. UI ---
function startScan() {
    const btn = document.getElementById('btn-scan');
    btn.innerText = "ĐANG QUÉT...";
    setTimeout(() => {
        btn.innerText = "XONG!"; btn.style.background = "#34c759";
        setTimeout(() => { btn.innerText = "QUÉT DỮ LIỆU GAME"; btn.style.background = ""; }, 2000);
    }, 1000);
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
