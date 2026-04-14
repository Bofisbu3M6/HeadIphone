const ADMIN_KEY = "0933653553adminappmenu";

window.onload = function() {
    const savedKey = localStorage.getItem('strongest_key');
    if (savedKey) {
        document.getElementById('license-key').value = savedKey;
        checkLogin();
    }
};

function checkLogin() {
    const keyInput = document.getElementById('license-key').value;
    const remember = document.getElementById('remember-key').checked;
    
    if (keyInput === "") return;

    if (remember) {
        localStorage.setItem('strongest_key', keyInput);
    }

    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-panel').classList.remove('hidden');

    // Nếu là Admin thì mở tab Developer
    if (keyInput === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type').innerText = "ADMIN ACCESS";
        document.getElementById('key-type').style.color = "#ff4757";
    }
}

function switchTab(element, tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
}

// Logic gạt nút để thay đổi trạng thái (Nếu cần thay đổi màu sắc mạnh hơn)
document.getElementById('master-toggle').addEventListener('change', function() {
    const appTitle = document.getElementById('app-title');
    if (this.checked) {
        appTitle.style.color = "#2067e1";
        appTitle.style.textShadow = "0 0 20px rgba(32, 103, 225, 0.6)";
    } else {
        appTitle.style.color = "#4a8df8";
        appTitle.style.textShadow = "0 0 10px rgba(74, 141, 248, 0.3)";
    }
});

function logout() {
    localStorage.removeItem('strongest_key');
    location.reload();
}
