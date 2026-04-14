const ADMIN_KEY = "0933653553adminappmenu";

window.onload = function() {
    getDeviceInfo();
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        checkLogin();
    }
};

// Hàm lấy thông tin thiết bị thật
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let os = "iOS/Android Device";
    if (ua.indexOf("Win") != -1) os = "Windows PC";
    if (ua.indexOf("Mac") != -1) os = "MacOS / iPhone";
    if (ua.indexOf("Android") != -1) os = "Android OS";

    document.getElementById('os-info').innerText = os;
    document.getElementById('browser-info').innerText = navigator.appName;
}

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    if (keyInput === "") return;

    localStorage.setItem('strongest_key', keyInput);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    // Cập nhật Tab Logs
    document.getElementById('display-key').innerText = keyInput;
    
    if (keyInput === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "ADMIN ACCESS";
        document.getElementById('key-type-badge').style.color = "#ff4757";
        document.getElementById('display-type').innerText = "Admin Special";
    }
}

function switchTab(element, tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

// Giả lập chạy code vào ứng dụng thiết bị
function toggleHack(name, checkbox) {
    const info = document.getElementById('process-info');
    if (checkbox.checked) {
        info.innerHTML = `<span style="color:#4a8df8">Đang Inject ${name} vào com.dts.freefireth...</span>`;
        setTimeout(() => {
            info.innerHTML = `<span style="color:#2ecc71">✓ ${name} Đã kích hoạt thành công!</span>`;
        }, 2000);
    } else {
        info.innerHTML = `<span style="color:#ff4757">Đã gỡ bỏ ${name}</span>`;
    }
}

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
