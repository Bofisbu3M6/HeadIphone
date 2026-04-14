const ADMIN_KEY = "bofisbuadminapp";
let activeFiles = { aimlock: null, norecoil: null };

// Tự động quét khi load
window.onload = function() {
    autoDetectDevice();
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        checkLogin();
    }
};

function switchTab(element, tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    element.classList.add('active');
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    if (keyInput === "") return;

    localStorage.setItem('strongest_key', keyInput);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    document.getElementById('display-key').innerText = keyInput;

    if (keyInput === ADMIN_KEY) {
        document.getElementById('admin-controls-area').classList.remove('hidden');
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
        document.getElementById('display-key-type').innerText = "Premium Admin";
    }
}

function handleFileSelect(type) {
    const fileInput = document.getElementById('input-file-' + type);
    const status = document.getElementById('status-' + type);
    if (fileInput.files.length > 0) {
        activeFiles[type] = fileInput.files[0].name;
        status.innerText = "● Đã nạp: " + activeFiles[type];
        status.style.color = "#2ecc71";
    }
}

function toggleHack(name, checkbox) {
    const targetApp = document.getElementById('app-target-input').value;
    const typeKey = name === "Aimlock" ? "aimlock" : "norecoil";
    const fileName = activeFiles[typeKey];

    if (checkbox.checked) {
        if (!fileName) {
            alert(`Lỗi: Admin chưa nạp file cho ${name}!`);
            checkbox.checked = false;
            return;
        }
        alert(`INJECTING SUCCESS!\nFile: ${fileName}\nTarget: ${targetApp}`);
    }
}

function generateKey() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    const r = () => chars.charAt(Math.floor(Math.random() * chars.length));
    const expiry = document.getElementById('key-expiry-select').value;
    const key = `FF-${r()}${r()}${r()}-${r()}${r()}${r()}`;
    document.getElementById('generated-key').value = key;
    alert(`Đã tạo Key: ${key}\nHạn: ${expiry}`);
}

function autoDetectDevice() {
    const ua = navigator.userAgent;
    let device = "PC / Desktop";
    if (/iPhone|iPad|iPod/i.test(ua)) device = "iPhone / iOS";
    else if (/Android/i.test(ua)) device = "Android Device";
    
    document.getElementById('os-info').innerText = device;
    document.getElementById('browser-info').innerText = navigator.vendor || "Strongest Engine";
}

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
