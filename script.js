const ADMIN_KEY = "0933653553adminappmenu";

// NHẬN DẠNG THIẾT BỊ NGAY LẬP TỨC KHI VỪA TẢI
window.onload = function() {
    autoDetectDevice();
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        checkLogin();
    }
};

function autoDetectDevice() {
    const ua = navigator.userAgent;
    let deviceName = "Unknown Device";
    let osName = "Unknown OS";

    if (/iPhone/i.test(ua)) { deviceName = "iPhone"; osName = "iOS"; }
    else if (/iPad/i.test(ua)) { deviceName = "iPad"; osName = "iOS"; }
    else if (/Android/i.test(ua)) { deviceName = "Android Phone"; osName = "Android"; }
    else if (/Windows/i.test(ua)) { deviceName = "PC / Desktop"; osName = "Windows"; }

    // Gắn vào giao diện
    if(document.getElementById('os-info')) {
        document.getElementById('os-info').innerText = osName + " (" + deviceName + ")";
        document.getElementById('browser-info').innerText = navigator.vendor || "Strongest Engine";
    }
}

// LOGIC KÍCH HOẠT VÀ CHẠY CODE FILE
function toggleHack(name, checkbox) {
    const targetApp = document.getElementById('app-target-input').value;
    
    // Lấy đoạn code script tương ứng từ Admin Panel
    let scriptToRun = "";
    if (name === "Aimlock") {
        scriptToRun = document.getElementById('script-aimlock').value;
    } else if (name === "No Recoil") {
        scriptToRun = document.getElementById('script-norecoil').value;
    }

    if (checkbox.checked) {
        console.log(`[INJECTING] ${name} to ${targetApp}`);
        console.log(`[CODE] ${scriptToRun}`);
        
        // Hiển thị thông báo (thay thế cho quick status cũ)
        alert(`Đang nạp Script ${name} vào ${targetApp}...\nCode: ${scriptToRun.substring(0, 20)}...`);
    } else {
        alert(`Đã ngắt kết nối Script ${name}`);
    }
}

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    const adminArea = document.getElementById('admin-controls-area');
    
    if (keyInput === "") return;

    localStorage.setItem('strongest_key', keyInput);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');
    autoDetectDevice(); // Chạy lại lần nữa để chắc chắn hiển thị

    if (keyInput === ADMIN_KEY) {
        adminArea.classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
        document.getElementById('key-type-badge').style.color = "#ff4757";
    }
}

// Giữ nguyên hàm tạo key FF-XXX
function generateKey() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    const r = () => chars.charAt(Math.floor(Math.random() * chars.length));
    document.getElementById('generated-key').value = `FF-${r()}${r()}${r()}-${r()}${r()}${r()}`;
}
