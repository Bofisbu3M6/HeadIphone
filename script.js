const ADMIN_KEY = "bofisbuadminapp";
let activeFiles = { aimlock: null, norecoil: null };

window.onload = function() {
    autoDetect();
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        checkLogin();
    }
};

function autoDetect() {
    const ua = navigator.userAgent;
    let device = "iPhone / iOS";
    if (/Android/i.test(ua)) device = "Android Device";
    if (/Windows/i.test(ua)) device = "Windows PC";
    
    document.getElementById('os-info').innerText = device;
    document.getElementById('browser-info').innerText = navigator.vendor || "Engine v4.0";
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function checkLogin() {
    const key = document.getElementById('license-key').value;
    if (!key) return;

    localStorage.setItem('strongest_key', key);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    document.getElementById('display-key').innerText = key;
    syncApps();

    if (key === ADMIN_KEY) {
        document.getElementById('admin-controls-area').classList.remove('hidden');
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
    }
}

function syncApps() {
    const a1 = document.getElementById('admin-app1').value;
    const a2 = document.getElementById('admin-app2').value;
    document.getElementById('opt-app1').value = a1;
    document.getElementById('opt-app1').innerText = a1;
    document.getElementById('opt-app2').value = a2;
    document.getElementById('opt-app2').innerText = a2;
}

function handleFile(type) {
    const input = document.getElementById(type === 'aimlock' ? 'file-aim' : 'file-recoil');
    const status = document.getElementById(type === 'aimlock' ? 'status-aim' : 'status-recoil');
    if (input.files.length > 0) {
        activeFiles[type] = input.files[0].name;
        status.innerText = "● Đã nạp: " + activeFiles[type];
        status.style.color = "#2ecc71";
    }
}

function toggleHack(name, cb) {
    const target = document.getElementById('user-app-select').value;
    const file = activeFiles[name === 'Aimlock' ? 'aimlock' : 'norecoil'];

    if (cb.checked) {
        if (!file) {
            alert("Lỗi: Admin chưa nạp file cho " + name);
            cb.checked = false;
            return;
        }
        alert(`INJECTING...\nFunction: ${name}\nFile: ${file}\nTarget: ${target}\nStatus: SUCCESS`);
    }
}

function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    const r = () => chars[Math.floor(Math.random() * chars.length)];
    const expiry = document.getElementById('key-expiry').value;
    const newKey = `FF-${r()}${r()}${r()}-${r()}${r()}${r()}`;
    document.getElementById('gen-key-display').value = newKey;
    alert(`Key: ${newKey}\nHạn dùng: ${expiry}\nĐã sẵn sàng!`);
}

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
