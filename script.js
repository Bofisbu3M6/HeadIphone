// Dán mã ảnh vào đây (Dạng Base64 để không bao giờ bị lỗi hiển thị)
const CODE_LOGO_FF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // Thay dấu ... bằng mã ảnh FF của bạn
const CODE_LOGO_FFMAX = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."; // Thay dấu ... bằng mã ảnh FF MAX của bạn

function changeAppLogo() {
    const val = document.getElementById('select-app').value;
    const img = document.getElementById('app-logo-display');
    // Nếu bạn chưa có mã code, tôi tạm để placeholder chất lượng cao
    img.src = (val === 'ff') ? "https://i.imgur.com/rN9S7aP.png" : "https://i.imgur.com/V7Yq7M0.png";
}

const OS_VERSIONS = {
    android: ["Android 4.4.4", "Android 10", "Android 11", "Android 13", "Android 14", "Android 15"],
    ios: ["iOS 12", "iOS 15", "iOS 16", "iOS 17", "iOS 18", "iOS 26"],
    windows: ["Win 10 22H2", "Win 11 24H2"],
    macos: ["macOS 14", "macOS 15", "macOS 26"]
};

function updateDeviceList() {
    const os = document.getElementById('select-os').value;
    const dev = document.getElementById('select-device');
    dev.innerHTML = "";
    OS_VERSIONS[os].forEach(v => {
        let o = document.createElement("option"); o.text = v; dev.appendChild(o);
    });
}

// Admin: Thêm tệp vào mục cụ thể
function uploadToMod() {
    const folder = document.getElementById('target-mod-folder').value;
    const file = document.getElementById('admin-file-upload').value;
    if(!file) return alert("Vui lòng chọn tệp!");
    alert(`Đã thêm tệp thành công vào mục: ${folder.toUpperCase()}`);
}

function checkLogin() {
    const k = document.getElementById('license-key').value;
    if(k === "adminappmenunguyenlong") return enterSystem("ADMIN");
    let stored = JSON.parse(localStorage.getItem('strong_keys') || '{}');
    if(stored[k]) enterSystem();
    else alert("KEY KHÔNG HỢP LỆ!");
}

function enterSystem(role) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-panel').classList.remove('hidden');
    if(role === "ADMIN") document.getElementById('dev-tab').classList.remove('hidden');
    changeAppLogo();
    updateDeviceList();
}

function switchTab(el, id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    el.classList.add('active');
    document.getElementById('tab-' + id).classList.remove('hidden');
}

function logoutKey() { if(confirm("Đăng xuất?")) location.reload(); }

function scanDevices() { 
    const b = document.querySelector('.btn-action');
    b.innerText = "ĐANG PHÂN TÍCH...";
    setTimeout(() => { alert("KẾT NỐI THÀNH CÔNG!"); b.innerText = "QUÉT LẠI"; }, 1500);
}
