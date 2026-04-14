const ADMIN_KEY = "bofisbuadminkey";

// Dữ liệu mô phỏng từ ảnh của bạn
const mockApps = [
    { name: "Free Fire MAX", pkg: "com.dts.freefiremax", icon: "https://i.ibb.co/image-0.png" },
    { name: "Free Fire", pkg: "com.dts.freefireth", icon: "https://i.ibb.co/image-1.png" },
    { name: "PUBG Mobile VN", pkg: "com.vng.pubgmobile", icon: "https://via.placeholder.com/45" }
];

let adminFiles = {
    aimlock: { active: null, pending: null },
    norecoil: { active: null, pending: null }
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
    document.getElementById('os-info').innerText = /iPhone|iPad|iPod/i.test(ua) ? "iOS Device" : "Android Device";
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

    if (key === ADMIN_KEY) {
        document.getElementById('dev-tab').classList.remove('hidden');
        document.getElementById('key-type-badge').innerText = "OWNER / ADMIN";
    }
}

// --- QUẢN LÝ APP MỤC TIÊU ---
function requestNativeDeviceApps() {
    const container = document.getElementById('app-grid-container');
    container.innerHTML = '<p class="placeholder-text">Đang quét máy...</p>';
    
    setTimeout(() => {
        container.innerHTML = '';
        mockApps.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.onclick = () => {
                document.querySelectorAll('.app-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                document.getElementById('selected-target-pkg').value = app.pkg;
                document.getElementById('display-target').innerText = app.name;
            };
            card.innerHTML = `<img src="${app.icon}" class="app-card-icon"><p class="app-card-name">${app.name}</p>`;
            container.appendChild(card);
        });
        alert("Đã tìm thấy " + mockApps.length + " ứng dụng Native!");
    }, 1000);
}

// --- QUẢN LÝ DẠNH MỤC FILE ---
function prepareFile(type) {
    const input = document.getElementById('file-' + type);
    if (input.files.length > 0) {
        adminFiles[type].pending = input.files[0].name;
        document.getElementById('confirm-' + type).style.display = 'inline-block';
    }
}

function confirmAndLoad(type) {
    if (adminFiles[type].pending) {
        adminFiles[type].active = adminFiles[type].pending;
        adminFiles[type].pending = null;
        document.getElementById('confirm-' + type).style.display = 'none';
        renderFileList();
        alert("Đã nạp file vào dạnh mục!");
    }
}

function renderFileList() {
    const list = document.getElementById('active-file-list');
    list.innerHTML = '';
    for (let key in adminFiles) {
        if (adminFiles[key].active) {
            list.innerHTML += `
                <div class="file-item-edit">
                    <span>● [${key.toUpperCase()}] ${adminFiles[key].active}</span>
                    <span style="color:red; cursor:pointer" onclick="deleteFile('${key}')">XÓA</span>
                </div>`;
        }
    }
    if (!list.innerHTML) list.innerHTML = '<p class="placeholder-text">Chưa có file nạp...</p>';
}

function deleteFile(type) {
    if (confirm("Xóa file khỏi dạnh mục?")) {
        adminFiles[type].active = null;
        renderFileList();
    }
}

// --- THỰC THI ---
function toggleHack(name, cb) {
    const pkg = document.getElementById('selected-target-pkg').value;
    const type = name.toLowerCase().includes('aim') ? 'aimlock' : 'norecoil';
    const file = adminFiles[type].active;

    if (!pkg) { alert("Chưa chọn App mục tiêu!"); cb.checked = false; return; }
    if (cb.checked && !file) { alert("Admin chưa nạp file!"); cb.checked = false; return; }

    alert(cb.checked ? `INJECT: ${file}\nTARGET: ${pkg}` : `RESTORE: ${pkg}`);
}

function logout() { localStorage.removeItem('strongest_key'); location.reload(); }
