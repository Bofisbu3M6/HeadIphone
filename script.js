const ADMIN_KEY = "bofisbuadminapp";

// Bộ nhớ chứa nội dung file thật (Base64) để ứng dụng của bạn gọi ra sử dụng
let fileStorage = {
    aimlock: { name: "", content: null },
    norecoil: { name: "", content: null }
};

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
        document.getElementById('key-type-badge').style.color = "#ff4757";
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

// 1. Chuẩn bị file
function prepareFile(type) {
    const input = document.getElementById(type === 'aimlock' ? 'input-aim' : 'input-recoil');
    const confirmBtn = document.getElementById(type === 'aimlock' ? 'confirm-aim' : 'confirm-recoil');
    const label = document.getElementById(type === 'aimlock' ? 'label-aim' : 'label-recoil');
    
    if (input.files.length > 0) {
        confirmBtn.style.display = "block";
        label.innerText = `Đã chọn: ${input.files[0].name}. Vui lòng XÁC NHẬN.`;
        label.style.color = "#444";
    }
}

// 2. Xác nhận và Load dữ liệu vào bộ nhớ Web
function confirmAndLoad(type) {
    const input = document.getElementById(type === 'aimlock' ? 'input-aim' : 'input-recoil');
    const label = document.getElementById(type === 'aimlock' ? 'label-aim' : 'label-recoil');
    const confirmBtn = document.getElementById(type === 'aimlock' ? 'confirm-aim' : 'confirm-recoil');

    if (input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            fileStorage[type].name = file.name;
            fileStorage[type].content = e.target.result; // Lưu dữ liệu file gốc
            
            label.innerText = "● ĐÃ NẠP DỮ LIỆU: " + file.name;
            label.style.color = "#2ecc71";
            confirmBtn.style.display = "none";
        };
        reader.readAsDataURL(file); 
    }
}

// 3. Thực thi File ngay lập tức
function toggleHack(name, checkbox) {
    const targetApp = document.getElementById('user-app-select').value;
    const typeKey = (name === "Aimlock") ? "aimlock" : "norecoil";
    const fileData = fileStorage[typeKey];

    if (checkbox.checked) {
        if (!fileData.content) {
            alert(`Lỗi: Hệ thống chưa được cấp quyền dữ liệu cho file ${name}.`);
            checkbox.checked = false;
            return;
        }

        // Gọi hàm API tới App gốc của bạn
        saveFileToAppSystem(targetApp, fileData.name, fileData.content);
        
    } else {
        // Gỡ bỏ và Khôi phục
        restoreOriginalFile(targetApp, fileData.name);
    }
}

// Hàm kết nối Bridge của bạn (Thực thi ghi file)
function saveFileToAppSystem(app, fileName, data) {
    // Nếu bạn dùng WebView (JavascriptInterface), hãy truyền 'data' qua đây.
    console.log(`Sending file data to native app: ${app}, File: ${fileName}`);
    alert(`ĐÃ THỰC THI!\nTiến trình ghi đè file ${fileName} vào ${app} hoàn tất.`);
}

// Hàm kết nối Bridge của bạn (Thực thi khôi phục)
function restoreOriginalFile(app, fileName) {
    console.log(`Requesting native app to restore backup for: ${app}`);
    alert(`ĐÃ KHÔI PHỤC!\nHệ thống đã dọn dẹp file hack và hoàn trả bản gốc cho ${app}.`);
}

function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    const r = () => chars[Math.floor(Math.random() * chars.length)];
    const expiry = document.getElementById('key-expiry').value;
    const newKey = `FF-${r()}${r()}${r()}-${r()}${r()}${r()}`;
    document.getElementById('gen-key-display').value = newKey;
    alert(`Tạo Key Thành Công: ${newKey}\nHạn: ${expiry}`);
}

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
