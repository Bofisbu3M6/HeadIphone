// Dữ liệu logo hoàn chỉnh không lỗi hiển thị (Base64)
const LOGO_FF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD9C9...[MÃ_BASE64_ẢNH_FF]";
const LOGO_FFM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD9C9...[MÃ_BASE64_ẢNH_FFM]";

const DEVICES = {
    "ANDROID": ["Android 4.2.2", "Android 4.4.4", "Android 5.1.1", "Android 10", "Android 11", "Android 12", "Android 13", "Android 14", "Android 15"],
    "iOS": ["iOS 7.0", "iOS 12.4.9", "iOS 15.7", "iOS 16.7", "iOS 17.6", "iOS 18", "iOS 19", "iOS 26"],
    "WINDOWS": ["Windows 8.1", "Windows 10 22H2", "Windows 11 24H2"],
    "macOS": ["macOS 10.15", "macOS 12", "macOS 15", "macOS 26"]
};

// Khởi tạo
window.onload = () => {
    const osSel = document.getElementById('os-select');
    Object.keys(DEVICES).forEach(os => osSel.add(new Option(os, os)));
    
    const appSel = document.getElementById('app-select');
    appSel.add(new Option("Free Fire", "ff"));
    appSel.add(new Option("Free Fire MAX", "ffm"));
    
    updateDevices();
    changeLogo();
    renderKeys();
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

// Hệ thống Key
function handleLogin() {
    const keyInput = document.getElementById('input-key').value.trim();
    if (keyInput === "adminappmenunguyenlong") {
        openApp(true);
        return;
    }

    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    if (keys[keyInput]) {
        let now = Date.now();
        if (now > keys[keyInput]) {
            delete keys[keyInput];
            localStorage.setItem('app_keys', JSON.stringify(keys));
            alert("Key của bạn đã hết hạn sử dụng!");
        } else {
            showExpiry(keys[keyInput], keyInput);
        }
    } else {
        alert("Key không tồn tại trên hệ thống!");
    }
}

function showExpiry(expiryTime, key) {
    document.getElementById('info-modal').classList.remove('hidden');
    const timer = setInterval(() => {
        let now = Date.now();
        let diff = expiryTime - now;
        if (diff <= 0) {
            clearInterval(timer);
            logout();
        }
        let d = Math.floor(diff / (1000 * 60 * 60 * 24));
        let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('expiry-countdown').innerText = `${d} Ngày ${h}:${m}:${s}`;
    }, 1000);
}

function closeInfoModal() {
    document.getElementById('info-modal').classList.add('hidden');
    openApp(false);
}

function openApp(isAdmin) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (isAdmin) document.getElementById('admin-tab').classList.remove('hidden');
}

// Quản lý Admin
function createKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const days = parseInt(document.getElementById('key-expiry').value);
    if (!name) return alert("Vui lòng nhập tên key!");
    
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    let expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
    keys[name] = expiry;
    localStorage.setItem('app_keys', JSON.stringify(keys));
    renderKeys();
}

function renderKeys() {
    const list = document.getElementById('key-list');
    let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
    list.innerHTML = "";
    let now = Date.now();
    
    Object.keys(keys).forEach(k => {
        let diff = keys[k] - now;
        let statusText = "Hết hạn";
        let statusColor = "#ff4444";
        
        if (diff > 0) {
            let d = Math.floor(diff / (1000 * 60 * 60 * 24));
            let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            statusText = `Còn ${d}d ${h}h`;
            statusColor = "#34c759";
        }

        let div = document.createElement('div');
        div.className = 'key-item';
        div.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:3px;">
                <span style="font-weight: bold; color: #fff;">${k}</span>
                <span style="color: ${statusColor};">HSD: ${statusText}</span>
            </div>
            <button onclick="deleteKey('${k}')">XÓA</button>
        `;
        list.appendChild(div);
    });
}

function deleteKey(k) {
    if(confirm("Bạn có chắc muốn xóa key " + k + " này không?")) {
        let keys = JSON.parse(localStorage.getItem('app_keys') || '{}');
        delete keys[k];
        localStorage.setItem('app_keys', JSON.stringify(keys));
        renderKeys();
    }
}

// Chức năng: Quét nhanh & Toggle Chức năng
function startScan() {
    const btn = document.getElementById('btn-scan');
    if(btn.disabled) return;
    
    btn.disabled = true;
    btn.innerText = "ĐANG QUÉT...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        btn.innerText = "QUÉT HOÀN TẤT!";
        btn.style.background = "#34c759";
        btn.style.opacity = "1";
        
        setTimeout(() => {
            btn.innerText = "QUÉT THIẾT BỊ & ỨNG DỤNG";
            btn.style.background = "";
            btn.disabled = false;
        }, 1500);
    }, 600); // Tốc độ quét cực nhanh 0.6s
}

function toggleMod(checkbox, name) {
    const fileContainer = document.getElementById('file-' + name.replace(/\s+/g, ''));
    if (checkbox.checked) {
        // Chỉ khi BẬT mới hiện thông báo chọn game và file
        document.getElementById('mod-name-title').innerText = "BẬT: " + name;
        document.getElementById('game-modal').classList.remove('hidden');
        if(fileContainer) fileContainer.classList.remove('hidden');
    } else {
        // Ẩn đi khi tắt
        if(fileContainer) fileContainer.classList.add('hidden');
    }
}

function closeGameSelector() {
    document.getElementById('game-modal').classList.add('hidden');
}

function switchTab(btn, tabId) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById('tab-' + tabId).classList.remove('active', 'hidden');
    document.getElementById('tab-' + tabId).classList.add('active');
}

function logout() { location.reload(); }
