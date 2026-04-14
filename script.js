const ADMIN_KEY = "0933653553adminappmenu";

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    const adminControls = document.getElementById('admin-controls-area');
    const devTab = document.getElementById('dev-tab');

    if (keyInput === "") return;

    localStorage.setItem('strongest_key', keyInput);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    // Mặc định luôn hiện tab Developer cho tất cả mọi người
    devTab.classList.remove('hidden');

    // KIỂM TRA NẾU LÀ ADMIN THÌ MỚI HIỆN PHẦN THÊM CODE/TẠO KEY
    if (keyInput === ADMIN_KEY) {
        adminControls.classList.remove('hidden'); // Hiện bảng điều khiển code
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
        document.getElementById('key-type-badge').style.color = "#ff4757";
    } else {
        adminControls.classList.add('hidden'); // Ẩn đi nếu là người dùng thường
        document.getElementById('key-type-badge').innerText = "MEMBER";
    }
}

// Hàm kích hoạt chức năng vẫn lấy giá trị từ ô nhập (nếu admin đã chỉnh)
function toggleHack(name, checkbox) {
    const info = document.getElementById('process-info');
    // Nếu admin đã nhập app khác thì lấy app đó, nếu không mặc định là com.dts.freefireth
    const targetApp = document.getElementById('app-target-input').value || "com.dts.freefireth"; 

    if (checkbox.checked) {
        info.innerHTML = `<span style="color:#4a8df8; font-size: 9px;">Đang nạp file code ${name} vào ${targetApp}...</span>`;
        setTimeout(() => {
            info.innerHTML = `<span style="color:#2ecc71; font-size: 9px;">✓ THÀNH CÔNG: Đã kích hoạt ${name} cho ${targetApp}</span>`;
        }, 2000);
    } else {
        info.innerHTML = `<span style="color:#ff4757; font-size: 9px;">Đã ngắt kết nối file code ${name}.</span>`;
    }
}
