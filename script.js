const ADMIN_PASS = "adminappmenunguyenlong";
const ZALO = "0933653553 (nguyen long)";

let currentKey = null;

// Khởi tạo
window.onload = () => {
    updateDeviceList();
    renderAdminKeys();
    if(localStorage.getItem('hide_until') > Date.now()) {
        enterSystem();
    }
};

function checkLogin() {
    const input = document.getElementById('license-key').value.trim();
    if (input === ADMIN_PASS) {
        enterSystem("ADMIN");
        return;
    }

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    
    if (!keys[input]) {
        alert("KEY KHÔNG TỒN TẠI TRÊN HỆ THỐNG HOẶC ĐÃ BỊ XOÁ\nVui lòng liên hệ Admin Zalo: " + ZALO);
        return;
    }

    if (Date.now() > keys[input].expiry) {
        delete keys[input];
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
        alert("KEY CỦA BẠN ĐÃ HẾT HẠN VÀ BỊ XOÁ KHỎI HỆ THỐNG!");
        location.reload();
        return;
    }

    currentKey = input;
    showKeyPopup(keys[input].expiry);
}

function showKeyPopup(expiry) {
    const popup = document.getElementById('key-popup');
    popup.classList.remove('hidden');
    
    const timer = setInterval(() => {
        const diff = expiry - Date.now();
        if (diff <= 0) {
            clearInterval(timer);
            location.reload();
        }
        
        if (expiry > Date.now() + 3153600000000) {
            document.getElementById('popup-time').innerText = "TRẠNG THÁI: VĨNH VIỄN (∞)";
        } else {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            document.getElementById('popup-time').innerText = `${d} Ngày : ${h} Giờ : ${m} Phút : ${s} Giây`;
        }
    }, 1000);
}

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('key-popup').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (role === "ADMIN") document.getElementById('dev-tab').classList.remove('hidden');
}

function hideFor2Hours() {
    localStorage.setItem('hide_until', Date.now() + 7200000);
    enterSystem();
}

// Admin Logic
function createKey() {
    const name = document.getElementById('new-key-name').value.trim();
    const dur = parseInt(document.getElementById('key-duration').value);
    if(!name) return;

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    keys[name] = { expiry: Date.now() + dur };
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    renderAdminKeys();
}

function deleteKey(name) {
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    delete keys[name];
    localStorage.setItem('strongest_keys', JSON.stringify(keys));
    renderAdminKeys();
}

function renderAdminKeys() {
    const container = document.getElementById('admin-key-list');
    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    container.innerHTML = "";

    for (let k in keys) {
        let isVV = keys[k].expiry > Date.now() + 3153600000000;
        let timeStr = isVV ? "VĨNH VIỄN" : new Date(keys[k].expiry).toLocaleString();
        
        container.innerHTML += `
            <div class="key-card">
                <div>
                    <b style="color: gold;">${k}</b><br>
                    <small>HSD: ${timeStr}</small>
                </div>
                <button class="btn-delete" onclick="deleteKey('${k}')">XOÁ</button>
            </div>
        `;
    }
}

function uploadFile() {
    const file = document.getElementById('file-input').files[0];
    const target = document.getElementById('target-mod').value;
    if(!file) { alert("Vui lòng chọn file!"); return; }
    
    // Giả lập lưu file vào hệ thống chung
    localStorage.setItem(`global_file_${target}`, file.name);
    alert(`ĐÃ THÊM FILE "${file.name}" VÀO MỤC ${target.toUpperCase()} THÀNH CÔNG!`);
}

// Giao diện người dùng
function scanDevices() {
    const btn = document.querySelector('.btn-action');
    btn.innerText = "ĐANG QUÉT...";
    setTimeout(() => {
        document.getElementById('scan-result').classList.remove('hidden');
        btn.innerText = "QUÉT HOÀN TẤT ✅";
    }, 1500);
}

function toggleMod(name, el) {
    const statusBox = document.getElementById('mod-status-box');
    const modText = document.getElementById('mod-text');
    
    if (el.checked) {
        statusBox.classList.remove('hidden');
        modText.innerText = `ĐÃ KÍCH HOẠT THÀNH CÔNG: ${name.toUpperCase()}`;
    } else {
        statusBox.classList.add('hidden');
    }
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const dev = document.getElementById('select-device');
    const data = {
        android: ["Samsung Galaxy S24 Ultra", "ROG Phone 8", "Xiaomi 14 Pro"],
        ios: ["iPhone 15 Pro Max", "iPhone 14 Pro", "iPad Pro M2"],
        pc: ["Windows 11 High End", "Windows 10 Gaming", "MacOS Sonoma"]
    };
    dev.innerHTML = "";
    data[os].forEach(d => dev.innerHTML += `<option>${d}</option>`);
}
