// Key Admin của bạn
const MY_ADMIN_KEY = "0933653553adminappmenu";

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    const loginScreen = document.getElementById('login-screen');
    const mainPanel = document.getElementById('main-panel');
    const keyTypeBadge = document.getElementById('key-type');
    
    // Các phần tử chỉ dành cho Admin
    const adminTab = document.getElementById('admin-only-tab');
    const adminSettings = document.getElementById('admin-settings');

    if (keyInput === "") {
        alert("Vui lòng nhập Key!");
        return;
    }

    loginScreen.classList.add('hidden');
    mainPanel.classList.remove('hidden');

    // Nếu là Admin
    if (keyInput === MY_ADMIN_KEY) {
        keyTypeBadge.innerText = "ADMIN ACCESS";
        keyTypeBadge.style.color = "#ff4757";
        // Hiện menu bí mật
        adminTab.classList.remove('hidden');
        adminSettings.classList.remove('hidden');
        console.log("Welcome Admin!");
    } else {
        keyTypeBadge.innerText = "MEMBER";
    }
}

// Logic gạt nút thay đổi tiêu đề (Chỉ hoạt động khi Admin gạt)
document.getElementById('master-toggle').addEventListener('change', function() {
    const appTitle = document.getElementById('app-title');
    const webTitle = document.getElementById('web-title');

    if (this.checked) {
        appTitle.innerText = "Aimlock Strongest iPhone❄️";
        appTitle.style.color = "#2067e1";
        webTitle.innerText = "Aimlock Strongest iPhone❄️";
    } else {
        appTitle.innerText = "Aimlock Strongest iPhone❄️";
        appTitle.style.color = "#4a8df8";
        webTitle.innerText = "Aimlock Strongest iPhone❄️";
    }
});
