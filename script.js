const ADMIN_KEY = "0933653553adminappmenu";

window.onload = function() {
    getDeviceInfo();
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        checkLogin();
    }
};

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    if (keyInput === "") return;

    localStorage.setItem('strongest_key', keyInput);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    document.getElementById('display-key').innerText = keyInput;
    
    if (keyInput === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
        document.getElementById('key-type-badge').style.color = "#ff4757";
        document.getElementById('display-type').innerText = "Premium Admin";
    }
}

// Hàm tạo Key dành riêng cho Admin
function generateKey() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let result = 'FF-';
    
    // Tạo chuỗi ngẫu nhiên định dạng FF-XXXX-XXXX
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    result += '-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    
    document.getElementById('generated-key').value = result;
}

// Hàm kích hoạt chức năng với mục tiêu ứng dụng đã chọn
function toggleHack(name, checkbox) {
    const info = document.getElementById('process-info');
    const targetApp = document.getElementById('app-select').value; // Lấy bundle ID từ Admin chọn

    if (checkbox.checked) {
        info.innerHTML = `<span style="color:#4a8df8; font-size: 9px;">Đang nạp file code ${name} vào ${targetApp}...</span>`;
        
        setTimeout(() => {
            info.innerHTML = `
                <span style="color:#2ecc71; font-size: 9px;">✓ SUCCESS: ${name} INJECTED!</span><br>
                <span style="font-size: 8px; color: #8c9cb0;">Target: ${targetApp}</span>
            `;
        }, 2500);
    } else {
        info.innerHTML = `<span style="color:#ff4757; font-size: 9px;">Đã ngắt kết nối file code ${name}.</span>`;
    }
}

// Các hàm bổ trợ khác
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let os = "iOS/iPhone";
    if (ua.indexOf("Android") != -1) os = "Android OS";
    document.getElementById('os-info').innerText = os;
    document.getElementById('browser-info').innerText = "Strongest Engine v1";
}

function switchTab(element, tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
