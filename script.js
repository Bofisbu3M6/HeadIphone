const ADMIN_KEY = "bofisbuadminapp";
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
    document.getElementById('os-info').innerText = /Android/i.test(ua) ? "Android Device" : (/iPhone|iPad|iPod/i.test(ua) ? "iOS Device" : "PC / Web");
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
    if (key === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
        document.getElementById('key-type-badge').style.color = "#ff4757";
    }
}

// --- NATIVE BRIDGE: QUÉT ỨNG DỤNG TRÊN MÁY ---
function requestDeviceApps() {
    const select = document.getElementById('user-app-select');
    select.innerHTML = '<option>Đang quét...</option>';
    
    if (window.AndroidBridge) {
        window.AndroidBridge.getInstalledApps();
    } else if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.getInstalledApps.postMessage("scan");
    } else {
        // Mô phỏng trên Trình duyệt
        setTimeout(() => {
            const mock = [{name:"App Mục Tiêu 1", pkg:"com.your.app1"}, {name:"App Mục Tiêu 2", pkg:"com.your.app2"}];
            receiveDeviceApps(JSON.stringify(mock));
        }, 1000);
    }
}

function receiveDeviceApps(json) {
    const apps = JSON.parse(json);
    const select = document.getElementById('user-app-select');
    select.innerHTML = apps.map(a => `<option value="${a.pkg}">${a.name} (${a.pkg})</option>`).join('');
}

// --- FILE SYSTEM: NẠP VÀ XÁC NHẬN ---
function prepareFile(type) {
    document.getElementById(type === 'aimlock' ? 'confirm-aim' : 'confirm-recoil').style.display = "block";
}

function confirmAndLoad(type) {
    const input = document.getElementById(type === 'aimlock' ? 'input-aim' : 'input-recoil');
    const label = document.getElementById(type === 'aimlock' ? 'label-aim' : 'label-recoil');
    const btn = document.getElementById(type === 'aimlock' ? 'confirm-aim' : 'confirm-recoil');

    if (input.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileStorage[type] = { name: input.files[0].name, content: e.target.result };
            label.innerText = "● ĐÃ XÁC NHẬN: " + input.files[0].name;
            label.style.color = "#2ecc71";
            btn.style.display = "none";
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// --- THỰC THI GHI ĐÈ / KHÔI PHỤC ---
function toggleHack(name, cb) {
    const target = document.getElementById('user-app-select').value;
    const type = name === "Aimlock" ? "aimlock" : "norecoil";
    const data = fileStorage[type];

    if (!target) { alert("Vui lòng chọn App mục tiêu trước!"); cb.checked = false; return; }

    if (cb.checked) {
        if (!data.content) { alert("Admin chưa nạp file!"); cb.checked = false; return; }
        // Gửi lệnh ghi đè file thật qua Bridge
        executeNativeAction("overwrite", target, data.name, data.content);
    } else {
        // Gửi lệnh khôi phục file thật qua Bridge
        executeNativeAction("restore", target, data.name, null);
    }
}

function executeNativeAction(action, pkg, fileName, content) {
    console.log(`Action: ${action} on ${pkg}`);
    // Đây là nơi Web gọi xuống mã Java/Swift của bạn để ghi file
    alert(`HỆ THỐNG: ${action.toUpperCase()} THÀNH CÔNG\nApp: ${pkg}\nFile: ${fileName}`);
}

function logout() { localStorage.removeItem('strongest_key'); location.reload(); }
