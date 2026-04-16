const ADMIN_PASS = "adminappmenunguyenlong";
const ZALO = "0933653553 (nguyen long)";
let countdownInterval;

window.onload = () => {
    updateDeviceList();
    renderAdminKeys();
    if(localStorage.getItem('hide_until') > Date.now()) enterSystem();
};

function checkLogin() {
    const input = document.getElementById('license-key').value.trim();
    if (input === ADMIN_PASS) { enterSystem("ADMIN"); return; }

    let keys = JSON.parse(localStorage.getItem('strongest_keys') || '{}');
    if (!keys[input]) {
        alert("KEY KHÔNG TỒN TẠI TRÊN HỆ THỐNG HOẶC ĐÃ BỊ XOÁ\nVui lòng liên hệ Admin Zalo: " + ZALO);
        return;
    }
    if (Date.now() > keys[input].expiry) {
        delete keys[input];
        localStorage.setItem('strongest_keys', JSON.stringify(keys));
        alert("KEY ĐÃ HẾT HẠN!");
        return;
    }
    showKeyPopup(keys[input].expiry);
}

function showKeyPopup(expiry) {
    const popup = document.getElementById('key-popup');
    popup.classList.remove('hidden');
    const display = document.getElementById('popup-time');

    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const diff = expiry - Date.now();
        if (diff <= 0) {
            clearInterval(countdownInterval);
            location.reload();
        }
        if (expiry > Date.now() + 3153600000000) {
            display.innerText = "VĨNH VIỄN (∞)";
        } else {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            display.innerText = `${d}N : ${h}G : ${m}P : ${s}S`;
        }
    }, 1000);
}

function closePopupAction() {
    document.getElementById('key-popup').classList.add('hidden');
    enterSystem();
}

function hideFor2Hours() {
    localStorage.setItem('hide_until', Date.now() + 7200000);
    closePopupAction();
}

function enterSystem(role) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    if (role === "ADMIN") document.getElementById('dev-tab').classList.remove('hidden');
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
        container.innerHTML += `
            <div class="key-card">
                <span><b>${k}</b><br><small>${isVV ? 'VĨNH VIỄN' : new Date(keys[k].expiry).toLocaleString()}</small></span>
                <button class="btn-delete" onclick="deleteKey('${k}')">XOÁ</button>
            </div>`;
    }
}

function uploadFile() {
    const file = document.getElementById('file-input').files[0];
    const target = document.getElementById('target-mod').value;
    if(!file) return alert("Chọn file!");
    alert(`ĐÃ THÊM FILE THÀNH CÔNG VÀO MỤC ${target.toUpperCase()}!`);
}

function scanDevices() {
    const btn = document.querySelector('.btn-action');
    btn.innerText = "ĐANG QUÉT THIẾT BỊ...";
    setTimeout(() => {
        document.getElementById('scan-result').classList.remove('hidden');
        btn.innerText = "QUÉT THÀNH CÔNG ✅";
    }, 1500);
}

function toggleMod(name, el) {
    const box = document.getElementById('mod-status-box');
    const txt = document.getElementById('mod-text');
    if (el.checked) {
        box.classList.remove('hidden');
        txt.innerText = `ĐÃ KÍCH HOẠT THÀNH CÔNG: ${name.toUpperCase()}`;
    } else {
        box.classList.add('hidden');
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
    const data = { android: ["SAMSUNG GALAXY S24", "XIAOMI 14 PRO", "ROG PHONE 8"], ios: ["IPHONE 15 PRO MAX", "IPHONE 14", "IPAD PRO M2"] };
    dev.innerHTML = "";
    data[os].forEach(d => dev.innerHTML += `<option>${d}</option>`);
}
