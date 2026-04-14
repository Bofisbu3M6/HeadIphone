const ADMIN_KEY = "0933653553adminappmenu";

// Tự động nhận diện khi trang tải xong
window.onload = function() {
    autoDetectDevice();
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        // Nếu muốn tự động vào thẳng thì bỏ comment dòng dưới:
        // checkLogin();
    }
};

// HÀM CHUYỂN TAB (Dành cho thanh ngang)
function switchTab(element, tabId) {
    // 1. Xóa trạng thái active của tất cả các tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // 2. Ẩn tất cả các nội dung tab
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    // 3. Thêm active vào tab vừa nhấn
    element.classList.add('active');
    // 4. Hiện nội dung của tab tương ứng
    const targetContent = document.getElementById('tab-' + tabId);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
}

// HÀM ĐĂNG NHẬP
function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    const adminArea = document.getElementById('admin-controls-area');
    
    if (keyInput === "") {
        alert("Vui lòng nhập Key!");
        return;
    }

    localStorage.setItem('strongest_key', keyInput);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    
    // Cập nhật Key vào mục Logs
    document.getElementById('display-key').innerText = keyInput;

    // Kiểm tra quyền Admin
    if (keyInput === ADMIN_KEY) {
        if(adminArea) adminArea.classList.remove('hidden');
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
        document.getElementById('key-type-badge').style.color = "#ff4757";
    }
}

// HÀM KÍCH HOẠT CHỨC NĂNG (Switch)
function toggleHack(name, checkbox) {
    const targetApp = document.getElementById('app-target-input').value || "com.dts.freefireth";
    let scriptCode = "";

    if (name === "Aimlock") {
        scriptCode = document.getElementById('script-aimlock').value;
    } else {
        scriptCode = document.getElementById('script-norecoil')?.value || "Default Code";
    }

    if (checkbox.checked) {
        alert(`Đang nạp Script ${name} vào ${targetApp}...\nCode: ${scriptCode.substring(0, 30)}...`);
    }
}

// HÀM TẠO KEY
function generateKey() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    const r = () => chars.charAt(Math.floor(Math.random() * chars.length));
    const expiry = document.getElementById('key-expiry-select').value;
    const key = `FF-${r()}${r()}${r()}-${r()}${r()}${r()}`;
    
    document.getElementById('generated-key').value = key;
    alert(`Đã tạo thành công Key: ${key}\nHạn: ${expiry} ngày`);
}

// NHẬN DIỆN THIẾT BỊ
function autoDetectDevice() {
    const ua = navigator.userAgent;
    let device = "iPhone / iOS";
    if (/Android/i.test(ua)) device = "Android Device";
    if (/Windows/i.test(ua)) device = "PC Windows";

    const osElem = document.getElementById('os-info');
    const brElem = document.getElementById('browser-info');
    if(osElem) osElem.innerText = device;
    if(brElem) brElem.innerText = "Strongest Engine v3.1";
}

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
