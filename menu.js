// CODE_VERSION: Đổi chuỗi này mỗi lần thay đổi code để hiển thị version mới trên menu
const CODE_VERSION = '2.0.0'; // ví dụ: '2.0.0'

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
        Pro:    { menu: '#ec4899', label: '#ec4899' }, // hồng cánh sen
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
        <div class="navbar-logo" style="position:relative;">
            <span class="navbar-logo-icon">🕒</span>
            TimePro <span style="position:relative;display:inline-block;">
                HRM
                <span id="app-version-number" style="
                    position: absolute;
                    left: 85%;
                    top: -15px;
                    font-size: 11px;
                    color: #fff;
                    font-weight: bold;
                    letter-spacing: 0.5px;
                    background: none;
                    padding: 0;
                    border: none;
                    z-index: 2;
                    cursor: pointer;
                    text-decoration: underline dotted;
                    "
                    title="Xem lịch sử phiên bản"
                >
                    V${CODE_VERSION}
                </span>
            </span>
            <span id="app-version-label" class="app-version-label" title="Nhấn để nhập Key">
                ${appVersion}
            </span>
        </div>
        <div class="navbar-menu">
            ${(() => {
                // Danh sách menu mặc định
                const defaultMenus = [
                    { id: 'index', label: 'Trang Chủ', href: 'index.html' },
                    { id: 'emp', label: 'Danh sách nhân viên', href: 'emp.html' },
                    { id: 'work_schedule', label: 'Lịch làm việc', href: 'work_schedule.html' },
                    { id: 'setup', label: 'Thiết Lập', href: 'setup.html' },
                    { id: 'att', label: 'Chấm công', href: 'att.html' },
                    { id: 'payroll', label: 'Bảng lương', href: 'payroll.html' },
                    { id: 'payroll_report', label: 'Lập BC Lương', href: 'payroll_report.html' },
                    { id: 'about', label: 'Giới thiệu', href: 'about-mksof.html' }
                ];
                // Lấy cấu hình menu từ localStorage
                let menuConfig = [];
                try {
                    menuConfig = JSON.parse(localStorage.getItem('menuConfig') || '[]');
                } catch {}
                let menus = menuConfig.length ? menuConfig : defaultMenus.map(m => ({...m, visible: true}));
                // Đảm bảo luôn có đủ các menu mặc định (nếu thiếu do cập nhật)
                defaultMenus.forEach(def => {
                    if (!menus.some(m => m.id === def.id)) menus.push({...def, visible: true});
                });
                // Sắp xếp lại đúng thứ tự theo config
                menus = menus.filter(m => defaultMenus.some(d => d.id === m.id));
                // Render các menu visible
                return menus.filter(m => m.visible !== false).map(m =>
                    `<button onclick="location.href='${m.href}'"${active===m.id?' class="active"':''}>${m.label}</button>`
                ).join('');
            })()}
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
                <button type="button" class="menu-setting-btn" onclick="showMenuSettingPopup()" style="color:#1976d2;">⚙️ Cài đặt menu</button>
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
        <div id="popup-version-history-overlay" style="display:none; position:fixed; z-index:10001; left:0; top:0; width:100vw; height:100vh; background:#0007; align-items:center; justify-content:center;">
            <div id="popup-version-history-box" style="background:#fff; border-radius:12px; box-shadow:0 8px 32px #0003; padding:28px 32px 22px 32px; min-width:320px; max-width:95vw; display:flex; flex-direction:column; align-items:center; position:relative;">
                <div style="font-size:20px; font-weight:600; color:#1976d2; margin-bottom:18px; letter-spacing:1px;">Lịch sử các phiên bản</div>
                <div id="popup-version-history-content" style="width:100%; max-height:55vh; overflow-y:auto; font-size:15px; color:#333; text-align:left;">
                    <!-- Nội dung lịch sử sẽ được render ở đây -->
                </div>
                <button id="popup-version-history-ok" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer; margin-top:18px; transition:background 0.18s;">Đóng</button>
                <span id="popup-version-history-close" style="position:absolute; top:8px; right:12px; font-size:20px; color:#888; cursor:pointer;" title="Đóng">&times;</span>
            </div>
        </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = popupHtml;
        // Chỉ append nếu còn phần tử con
        while (div.firstElementChild) {
            if (div.firstElementChild) {
                document.body.appendChild(div.firstElementChild);
            } else {
                break;
            }
        }
    }

    // BỎ popup QR Checkin nếu chưa có
    // if (!document.getElementById('popup-qr-checkin-overlay')) {
    //     const qrPopupHtml = `
    //     <div id="popup-qr-checkin-overlay" style="display:none; position:fixed; z-index:10010; left:0; top:0; width:100vw; height:100vh; background:#0007; align-items:center; justify-content:center;">
    //         <div id="popup-qr-checkin-box" style="background:#fff; border-radius:12px; box-shadow:0 8px 32px #0003; padding:28px 24px 22px 24px; min-width:320px; max-width:95vw; display:flex; flex-direction:column; align-items:center; position:relative;">
    //             <div style="font-size:20px; font-weight:600; color:#1976d2; margin-bottom:12px;">Chấm Công Bằng Mã QR</div>
    //             <div id="qr-reader" style="width:320px; height:240px; background:#eee; border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:12px;">
    //                 <span style="color:#888;">[Camera QR sẽ hiển thị ở đây]</span>
    //             </div>
    //             <div id="qr-result" style="font-size:15px; color:#43a047; margin-bottom:10px;"></div>
    //             <button id="popup-qr-checkin-close" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.18s;">Đóng</button>
    //         </div>
    //     </div>
    //     `;
    //     const div = document.createElement('div');
    //     div.innerHTML = qrPopupHtml;
    //     document.body.appendChild(div.firstElementChild);
    // }

    // XÓA popup lịch sử thao tác và các hàm liên quan
    // XÓA window.addHistoryLog, window.showHistoryLogPopup, setupAutoHistoryLog, popup-history-log-overlay

    // Hàm ghi log thao tác (ghi lại mọi thao tác, chỉ lưu local, không gửi bot)
    window.addHistoryLog = function(action, detail) {
        const logs = JSON.parse(localStorage.getItem('historyLogs') || '[]');
        const user = localStorage.getItem('currentUser') || 'Ẩn danh';
        logs.unshift({
            time: new Date().toLocaleString(),
            user,
            action,
            detail
        });
        // Giới hạn tối đa 2000 dòng log
        if (logs.length > 2000) logs.length = 2000;
        localStorage.setItem('historyLogs', JSON.stringify(logs));
    };

    // Ghi lại thao tác vào phần mềm (vào phần mềm, chuyển tab, mở popup, chấm công, xuất/nhập dữ liệu, v.v.)
    (function setupAutoHistoryLog() {
        // Ghi lại lần đầu vào phần mềm
        if (!sessionStorage.getItem('loggedThisSession')) {
            window.addHistoryLog('Đăng nhập/Truy cập', 'Vào phần mềm lúc ' + new Date().toLocaleString());
            sessionStorage.setItem('loggedThisSession', '1');
        }
        // Ghi lại chuyển tab menu
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.navbar-menu button');
            if (btn) {
                window.addHistoryLog('Chuyển tab', btn.textContent.trim());
            }
        }, true);
        // Ghi lại mở popup lịch sử phiên bản
        document.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'app-version-number') {
                window.addHistoryLog('Xem lịch sử phiên bản', '');
            }
        }, true);
        // Ghi lại mở popup nhập key
        document.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'app-version-label') {
                window.addHistoryLog('Mở popup nhập key', '');
            }
        }, true);
        // Ghi lại mở popup lịch sử thao tác
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('menu-history-btn')) {
                window.addHistoryLog('Xem lịch sử thao tác', '');
            }
        }, true);
        // Ghi lại xuất dữ liệu
        window.exportAllData = (function(orig) {
            return function() {
                window.addHistoryLog('Xuất dữ liệu', 'Xuất toàn bộ dữ liệu ra file');
                if (orig) orig.apply(this, arguments);
            };
        })(window.exportAllData);
        // Ghi lại nhập dữ liệu
        window.importAllData = (function(orig) {
            return function() {
                window.addHistoryLog('Nhập dữ liệu', 'Nhập dữ liệu từ file');
                if (orig) orig.apply(this, arguments);
            };
        })(window.importAllData);
        // Ghi lại gửi dữ liệu về bot
        window.sendAllDataToTelegramBot = (function(orig) {
            return function() {
                window.addHistoryLog('Gửi dữ liệu về Bot', '');
                if (orig) orig.apply(this, arguments);
            };
        })(window.sendAllDataToTelegramBot);
        // Ghi lại mở các popup khác nếu muốn...
    })();

    // Hàm hiển thị popup lịch sử thao tác
    window.showHistoryLogPopup = function() {
        const overlay = document.getElementById('popup-history-log-overlay');
        const content = document.getElementById('popup-history-log-content');
        const logs = JSON.parse(localStorage.getItem('historyLogs') || '[]');
        if (logs.length === 0) {
            content.innerHTML = '<div style="color:#888; text-align:center; padding:24px 0;">Chưa có lịch sử thao tác nào.</div>';
        } else {
            content.innerHTML = logs.map(log =>
                `<div style="padding:7px 18px; border-bottom:1px solid #e3eaf2;">
                    <div style="font-size:13px; color:#1976d2; font-weight:600;">${log.time} - ${log.user}</div>
                    <div style="margin-left:8px; margin-top:2px;"><b>${log.action}</b> ${log.detail ? ('- ' + log.detail) : ''}</div>
                </div>`
            ).join('');
        }
        overlay.style.display = 'flex';
        document.getElementById('popup-history-log-ok').onclick = function() {
            overlay.style.display = 'none';
        };
        document.getElementById('popup-history-log-close').onclick = function() {
            overlay.style.display = 'none';
        };
        overlay.onkeydown = function(e) {
            if (e.key === 'Escape') overlay.style.display = 'none';
        };
        setTimeout(() => {
            document.getElementById('popup-history-log-ok').focus();
        }, 100);
    };

    // Hàm mở popup thông báo thành công
    function showSuccessPopup(msg) {
        const overlay = document.getElementById('popup-success-overlay');
        const msgDiv = document.getElementById('popup-success-msg');
        // Sửa lỗi: Nếu overlay hoặc msgDiv chưa tồn tại, không làm gì
        if (!overlay || !msgDiv) return;
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
            const okBtn = document.getElementById('popup-success-ok');
            if (okBtn) okBtn.focus();
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
                // Tự động F5 lại trang sau khi chọn phiên bản
                setTimeout(() => {
                    location.reload();
                }, 600);
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

    // Thêm hàm hiển thị popup lịch sử phiên bản
    function showVersionHistoryPopup() {
        const overlay = document.getElementById('popup-version-history-overlay');
        const content = document.getElementById('popup-version-history-content');
        // Danh sách lịch sử phiên bản (từ 1.0.0 đến 2.0.0, mỗi bản một cải tiến)
        const history = [
            {
                version: '2.0.0',
                date: '15/6/2025',
                note: 'Nâng cấp lên V2: Thêm tính năng Chấm Công Bằng Mã QR và tinh chỉnh danh sách nhân viên đa năng.'
            },
            {
                version: '1.1.5',
                date: '10/6/2025',
                note: 'Thêm popup lịch sử phiên bản khi nhấn vào số version.'
            },
            {
                version: '1.1.4',
                date: '5/6/2025',
                note: 'Cải thiện tốc độ xuất dữ liệu và sửa lỗi nhỏ giao diện.'
            },
            {
                version: '1.1.3',
                date: '30/5/2025',
                note: 'Thêm chức năng gửi dữ liệu về Telegram Bot.'
            },
            {
                version: '1.1.2',
                date: '25/5/2025',
                note: 'Bổ sung xuất lịch làm việc và ca mẫu lịch làm việc vào dữ liệu xuất file.'
            },
            {
                version: '1.1.1',
                date: '20/5/2025',
                note: 'Tối ưu popup nhập key và giao diện menu.'
            },
            {
                version: '1.1.0',
                date: '15/5/2025',
                note: 'Thêm popup nhập key nâng cấp phiên bản (Free/Pro/Business).'
            },
            {
                version: '1.0.9',
                date: '10/5/2025',
                note: 'Thêm chức năng nhập/xuất toàn bộ dữ liệu (JSON).'
            },
            {
                version: '1.0.8',
                date: '7/5/2025',
                note: 'Thêm chức năng ghi chú cá nhân cho từng nhân viên.'
            },
            {
                version: '1.0.7',
                date: '5/5/2025',
                note: 'Thêm chức năng lập báo cáo lương tổng hợp theo tháng.'
            },
            {
                version: '1.0.6',
                date: '3/5/2025',
                note: 'Thêm chức năng bảng lương chi tiết từng nhân viên.'
            },
            {
                version: '1.0.5',
                date: '2/5/2025',
                note: 'Thêm chức năng chấm công theo ca và lịch làm việc.'
            },
            {
                version: '1.0.4',
                date: '1/5/2025',
                note: 'Thêm chức năng thiết lập ca làm việc và lịch làm việc tuần.'
            },
            {
                version: '1.0.3',
                date: '30/4/2025',
                note: 'Thêm chức năng quản lý danh sách nhân viên.'
            },
            {
                version: '1.0.2',
                date: '28/4/2025',
                note: 'Thêm giao diện menu mới và tối ưu trải nghiệm người dùng.'
            },
            {
                version: '1.0.1',
                date: '25/4/2025',
                note: 'Thêm chức năng đăng nhập và phân quyền cơ bản.'
            },
            {
                version: '1.0.0',
                date: '20/4/2025',
                note: 'Ra mắt phiên bản đầu tiên với các chức năng cơ bản: chấm công, xem danh sách nhân viên, xuất dữ liệu.'
            }
        ];
        // Lấy version hiện tại
        let currentVersion = CODE_VERSION;
        // Nếu đã từng chuyển version thủ công thì lấy version đó để hiển thị
        if (localStorage.getItem('selectedCodeVersion')) {
            currentVersion = localStorage.getItem('selectedCodeVersion');
        }
        content.innerHTML = history.map(h =>
            `<div style="margin-bottom:12px;">
                <b style="color:#1976d2;">V${h.version}</b>
                <span style="color:#888; font-size:13px; margin-left:8px;">(${h.date})</span>
                <div style="margin-left:12px; margin-top:2px;">- ${h.note}</div>
                ${h.version === currentVersion ? `<span style="margin-left:12px; color:#43a047; font-size:13px;">(Đang dùng)</span>` : ''}
            </div>`
        ).join('') +
        `<div style="margin-top:18px; text-align:center;">
            <button id="btn-check-update" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.18s;">
                Kiểm tra cập nhật
            </button>
            <span id="check-update-msg" style="display:inline-block; margin-left:12px; color:#1976d2; font-size:14px;"></span>
        </div>`;
        overlay.style.display = 'flex';

        // Bỏ sự kiện chuyển về bản khác

        // Sự kiện kiểm tra cập nhật
        document.getElementById('btn-check-update').onclick = function() {
            const msg = document.getElementById('check-update-msg');
            msg.textContent = 'Đang kiểm tra...';
            setTimeout(() => {
                if (currentVersion === history[0].version) {
                    msg.textContent = 'Bạn đang dùng phiên bản mới nhất!';
                } else {
                    msg.innerHTML = `Có phiên bản mới: V${history[0].version}. <button id="btn-update-now" style="background:#43a047; color:#fff; border:none; border-radius:5px; padding:3px 12px; font-size:13px; cursor:pointer; margin-left:8px;">Cập nhật ngay</button>`;
                    document.getElementById('btn-update-now').onclick = function() {
                        localStorage.setItem('selectedCodeVersion', history[0].version);
                        showSuccessPopup('Đã cập nhật lên phiên bản mới nhất V' + history[0].version + '. Đang cập nhật lại giao diện...');
                        setTimeout(() => {
                            renderMenu(window._lastActiveMenu || 'index');
                        }, 600);
                    };
                }
            }, 900);
        };

        document.getElementById('popup-version-history-ok').onclick = function() {
            overlay.style.display = 'none';
        };
        document.getElementById('popup-version-history-close').onclick = function() {
            overlay.style.display = 'none';
        };
        overlay.onkeydown = function(e) {
            if (e.key === 'Escape') overlay.style.display = 'none';
        };
        setTimeout(() => {
            document.getElementById('popup-version-history-ok').focus();
        }, 100);
    }

    // Thêm hàm mở popup QR Checkin
    // function showQRCheckinPopup() {
    //     const overlay = document.getElementById('popup-qr-checkin-overlay');
    //     const qrReader = document.getElementById('qr-reader');
    //     const qrResult = document.getElementById('qr-result');
    //     if (!overlay) return;
    //     overlay.style.display = 'flex';
    //     qrResult.textContent = '';
    //     // TODO: Tích hợp thư viện quét QR tại đây (ví dụ html5-qrcode hoặc jsQR)
    //     // Hiện tại chỉ là demo khung, bạn sẽ tích hợp sau
    //     qrReader.innerHTML = '<span style="color:#888;">[Camera QR sẽ hiển thị ở đây]</span>';
    //     // Đóng popup
    //     document.getElementById('popup-qr-checkin-close').onclick = function() {
    //         overlay.style.display = 'none';
    //         // TODO: Dừng camera nếu có
    //     };
    //     overlay.onkeydown = function(e) {
    //         if (e.key === 'Escape') overlay.style.display = 'none';
    //     };
    //     // Ghi log mở popup QR
    //     window.addHistoryLog && window.addHistoryLog('Mở popup Chấm công QR', '');
    // }

    // Gợi ý các hàm đa năng cho danh sách nhân viên (bạn sẽ xử lý chi tiết ở emp.html)
    // window.searchEmployee = function() {
    //     window.addHistoryLog && window.addHistoryLog('Tìm kiếm nhân viên', '');
    //     alert('Tính năng tìm kiếm sẽ được xử lý ở emp.html!');
    // };
    // window.exportEmployeeExcel = function() {
    //     window.addHistoryLog && window.addHistoryLog('Xuất Excel nhân viên', '');
    //     alert('Tính năng xuất Excel sẽ được xử lý ở emp.html!');
    // };
    // window.quickAddEmployee = function() {
    //     window.addHistoryLog && window.addHistoryLog('Thêm nhanh nhân viên', '');
    //     alert('Tính năng thêm nhanh sẽ được xử lý ở emp.html!');
    // };

    // Thêm popup cài đặt menu nếu chưa có
    if (!document.getElementById('popup-menu-setting-overlay')) {
        const popupMenuSettingHtml = `
        <div id="popup-menu-setting-overlay" style="display:none; position:fixed; z-index:10010; left:0; top:0; width:100vw; height:100vh; background:#0007; align-items:center; justify-content:center;">
            <div id="popup-menu-setting-box" style="background:#fff; border-radius:12px; box-shadow:0 8px 32px #0003; padding:28px 24px 22px 24px; min-width:340px; max-width:95vw; display:flex; flex-direction:column; align-items:center; position:relative;">
                <div style="font-size:18px; font-weight:600; color:#1976d2; margin-bottom:12px;">Cài đặt menu</div>
                <div id="menu-setting-list" style="width:100%; max-height:50vh; overflow-y:auto; margin-bottom:16px;">
                    <!-- Danh sách menu sẽ render ở đây -->
                </div>
                <div style="display:flex; gap:12px; width:100%; justify-content:center;">
                    <button id="popup-menu-setting-ok" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer;">Lưu</button>
                    <button id="popup-menu-setting-cancel" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer;">Hủy</button>
                </div>
                <span id="popup-menu-setting-close" style="position:absolute; top:8px; right:12px; font-size:20px; color:#888; cursor:pointer;" title="Đóng">&times;</span>
                <div style="font-size:13px; color:#888; margin-top:10px;">Kéo thả để đổi vị trí, tick để ẩn/hiện menu</div>
            </div>
        </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = popupMenuSettingHtml;
        document.body.appendChild(div.firstElementChild);
    }

    // Thêm hàm hiển thị popup cài đặt menu
    function showMenuSettingPopup() {
        const overlay = document.getElementById('popup-menu-setting-overlay');
        const listDiv = document.getElementById('menu-setting-list');
        // Danh sách menu mặc định
        const defaultMenus = [
            { id: 'index', label: 'Trang Chủ', href: 'index.html' },
            { id: 'emp', label: 'Danh sách nhân viên', href: 'emp.html' },
            { id: 'work_schedule', label: 'Lịch làm việc', href: 'work_schedule.html' },
            { id: 'setup', label: 'Thiết Lập', href: 'setup.html' },
            { id: 'att', label: 'Chấm công', href: 'att.html' },
            { id: 'payroll', label: 'Bảng lương', href: 'payroll.html' },
            { id: 'payroll_report', label: 'Lập BC Lương', href: 'payroll_report.html' },
            { id: 'about', label: 'Giới thiệu', href: 'about-mksof.html' }
        ];
        // Lấy cấu hình menu từ localStorage
        let menuConfig = [];
        try {
            menuConfig = JSON.parse(localStorage.getItem('menuConfig') || '[]');
        } catch {}
        // Đưa biến menus ra ngoài để giữ trạng thái khi kéo thả
        let menus = menuConfig.length ? menuConfig : defaultMenus.map(m => ({...m, visible: true}));
        defaultMenus.forEach(def => {
            if (!menus.some(m => m.id === def.id)) menus.push({...def, visible: true});
        });
        menus = menus.filter(m => defaultMenus.some(d => d.id === m.id));

        // Hàm render lại danh sách menu trong popup (không gọi lại showMenuSettingPopup)
        function renderMenuSettingList() {
            listDiv.innerHTML = menus.map((m, idx) => `
                <div class="menu-setting-item" draggable="true" data-idx="${idx}" style="display:flex;align-items:center;gap:10px;padding:7px 0;cursor:grab;border-bottom:1px solid #eee;">
                    <span style="font-size:18px;cursor:grab;">&#9776;</span>
                    <input type="checkbox" class="menu-setting-visible" data-idx="${idx}" ${m.visible!==false?'checked':''} style="accent-color:#1976d2;">
                    <span style="flex:1;">${m.label}</span>
                </div>
            `).join('');

            // Kéo thả đổi vị trí
            let dragIdx = null;
            let dragOverIdx = null;
            listDiv.querySelectorAll('.menu-setting-item').forEach(item => {
                item.ondragstart = function(e) {
                    dragIdx = Number(item.getAttribute('data-idx'));
                    e.dataTransfer.effectAllowed = 'move';
                    item.style.opacity = '0.5';
                };
                item.ondragend = function() {
                    dragIdx = null;
                    dragOverIdx = null;
                    listDiv.querySelectorAll('.menu-setting-item').forEach(i => i.style.background = '');
                    item.style.opacity = '';
                };
                item.ondragover = function(e) {
                    e.preventDefault();
                    dragOverIdx = Number(item.getAttribute('data-idx'));
                    listDiv.querySelectorAll('.menu-setting-item').forEach(i => i.style.background = '');
                    item.style.background = '#e3f2fd';
                };
                item.ondragleave = function() {
                    item.style.background = '';
                };
                item.ondrop = function(e) {
                    e.preventDefault();
                    item.style.background = '';
                    const dropIdx = Number(item.getAttribute('data-idx'));
                    if (dragIdx !== null && dragIdx !== dropIdx) {
                        const moved = menus.splice(dragIdx, 1)[0];
                        menus.splice(dropIdx, 0, moved);
                        renderMenuSettingList(); // chỉ render lại danh sách, không gọi lại popup
                    }
                };
            });

            // Tick ẩn/hiện
            listDiv.querySelectorAll('.menu-setting-visible').forEach(cb => {
                cb.onchange = function() {
                    const idx = Number(cb.getAttribute('data-idx'));
                    menus[idx].visible = cb.checked;
                };
            });
        }

        renderMenuSettingList();
        overlay.style.display = 'flex';

        // Lưu
        document.getElementById('popup-menu-setting-ok').onclick = function() {
            localStorage.setItem('menuConfig', JSON.stringify(menus));
            overlay.style.display = 'none';
            renderMenu(window._lastActiveMenu || 'index');
        };
        // Hủy
        document.getElementById('popup-menu-setting-cancel').onclick = function() {
            overlay.style.display = 'none';
        };
        // Đóng bằng dấu X
        document.getElementById('popup-menu-setting-close').onclick = function() {
            overlay.style.display = 'none';
        };
        // Đóng bằng phím ESC
        overlay.onkeydown = function(e) {
            if (e.key === 'Escape') overlay.style.display = 'none';
        };
        setTimeout(() => {
            document.getElementById('popup-menu-setting-ok').focus();
        }, 100);
    }

    // Gán sự kiện click cho label phiên bản
    document.getElementById('app-version-label').onclick = showKeyPopup;

    // Gán sự kiện click cho số version để mở popup lịch sử phiên bản
    document.getElementById('app-version-number').onclick = showVersionHistoryPopup;

    // Gợi ý tinh chỉnh menu nhân viên đa năng (bạn sẽ xử lý chi tiết ở emp.html)
    // if (active === 'emp') {
    //     setTimeout(() => {
    //         const empMenu = document.querySelector('.navbar-menu');
    //         if (empMenu && !document.getElementById('emp-quick-actions')) {
    //             const div = document.createElement('div');
    //             div.id = 'emp-quick-actions';
    //             div.style.display = 'flex';
    //             div.style.gap = '8px';
    //             div.style.marginLeft = '16px';
    //             div.innerHTML = `
    //                 <button onclick="searchEmployee()" style="background:#fff; color:#1976d2; border:1px solid #1976d2; border-radius:6px; padding:6px 14px; font-size:14px; font-weight:600; cursor:pointer;">Tìm kiếm</button>
    //                 <button onclick="exportEmployeeExcel()" style="background:#fff; color:#43a047; border:1px solid #43a047; border-radius:6px; padding:6px 14px; font-size:14px; font-weight:600; cursor:pointer;">Xuất Excel</button>
    //                 <button onclick="quickAddEmployee()" style="background:#fff; color:#ff9800; border:1px solid #ff9800; border-radius:6px; padding:6px 14px; font-size:14px; font-weight:600; cursor:pointer;">Thêm nhanh</button>
    //             `;
    //             empMenu.appendChild(div);
    //         }
    //     }, 300);
    // }

    // Lưu lại menu đang active để render lại đúng tab khi đổi version
    window._lastActiveMenu = active;

    // Khi renderMenu, nếu có selectedCodeVersion thì cập nhật lại số version hiển thị
    const selectedCodeVersion = localStorage.getItem('selectedCodeVersion');
    if (selectedCodeVersion && selectedCodeVersion !== CODE_VERSION) {
        const versionNumberEl = document.getElementById('app-version-number');
        if (versionNumberEl) versionNumberEl.textContent = 'V' + selectedCodeVersion;
    }

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

// Gợi ý sử dụng addHistoryLog ở các thao tác chính (ví dụ):
// window.addHistoryLog('Chấm công', 'Nhân viên Nguyễn Văn A chấm công ngày 10/6/2025');
// window.addHistoryLog('Xem bảng lương', 'Mở bảng lương tháng 5/2025');
// window.addHistoryLog('Xuất dữ liệu', 'Xuất toàn bộ dữ liệu ra file');
// window.addHistoryLog('Nhập dữ liệu', 'Nhập dữ liệu từ file qlnv_data.json');

// Thêm lịch sử version mới
function showVersionHistoryPopup() {
    const overlay = document.getElementById('popup-version-history-overlay');
    const content = document.getElementById('popup-version-history-content');
    // Danh sách lịch sử phiên bản (từ 1.0.0 đến 2.0.0, mỗi bản một cải tiến)
    const history = [
        {
            version: '2.0.0',
            date: '15/6/2025',
            note: 'Nâng cấp lên V2: Thêm tính năng Chấm Công Bằng Mã QR và tinh chỉnh danh sách nhân viên đa năng.'
        },
        {
            version: '1.1.5',
            date: '10/6/2025',
            note: 'Thêm popup lịch sử phiên bản khi nhấn vào số version.'
        },
        {
            version: '1.1.4',
            date: '5/6/2025',
            note: 'Cải thiện tốc độ xuất dữ liệu và sửa lỗi nhỏ giao diện.'
        },
        {
            version: '1.1.3',
            date: '30/5/2025',
            note: 'Thêm chức năng gửi dữ liệu về Telegram Bot.'
        },
        {
            version: '1.1.2',
            date: '25/5/2025',
            note: 'Bổ sung xuất lịch làm việc và ca mẫu lịch làm việc vào dữ liệu xuất file.'
        },
        {
            version: '1.1.1',
            date: '20/5/2025',
            note: 'Tối ưu popup nhập key và giao diện menu.'
        },
        {
            version: '1.1.0',
            date: '15/5/2025',
            note: 'Thêm popup nhập key nâng cấp phiên bản (Free/Pro/Business).'
        },
        {
            version: '1.0.9',
            date: '10/5/2025',
            note: 'Thêm chức năng nhập/xuất toàn bộ dữ liệu (JSON).'
        },
        {
            version: '1.0.8',
            date: '7/5/2025',
            note: 'Thêm chức năng ghi chú cá nhân cho từng nhân viên.'
        },
        {
            version: '1.0.7',
            date: '5/5/2025',
            note: 'Thêm chức năng lập báo cáo lương tổng hợp theo tháng.'
        },
        {
            version: '1.0.6',
            date: '3/5/2025',
            note: 'Thêm chức năng bảng lương chi tiết từng nhân viên.'
        },
        {
            version: '1.0.5',
            date: '2/5/2025',
            note: 'Thêm chức năng chấm công theo ca và lịch làm việc.'
        },
        {
            version: '1.0.4',
            date: '1/5/2025',
            note: 'Thêm chức năng thiết lập ca làm việc và lịch làm việc tuần.'
        },
        {
            version: '1.0.3',
            date: '30/4/2025',
            note: 'Thêm chức năng quản lý danh sách nhân viên.'
        },
        {
            version: '1.0.2',
            date: '28/4/2025',
            note: 'Thêm giao diện menu mới và tối ưu trải nghiệm người dùng.'
        },
        {
            version: '1.0.1',
            date: '25/4/2025',
            note: 'Thêm chức năng đăng nhập và phân quyền cơ bản.'
        },
        {
            version: '1.0.0',
            date: '20/4/2025',
            note: 'Ra mắt phiên bản đầu tiên với các chức năng cơ bản: chấm công, xem danh sách nhân viên, xuất dữ liệu.'
        }
    ];
    // Lấy version hiện tại
    let currentVersion = CODE_VERSION;
    // Nếu đã từng chuyển version thủ công thì lấy version đó để hiển thị
    if (localStorage.getItem('selectedCodeVersion')) {
        currentVersion = localStorage.getItem('selectedCodeVersion');
    }
    content.innerHTML = history.map(h =>
        `<div style="margin-bottom:12px;">
            <b style="color:#1976d2;">V${h.version}</b>
            <span style="color:#888; font-size:13px; margin-left:8px;">(${h.date})</span>
            <div style="margin-left:12px; margin-top:2px;">- ${h.note}</div>
            ${h.version === currentVersion ? `<span style="margin-left:12px; color:#43a047; font-size:13px;">(Đang dùng)</span>` : ''}
        </div>`
    ).join('') +
    `<div style="margin-top:18px; text-align:center;">
        <button id="btn-check-update" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.18s;">
            Kiểm tra cập nhật
        </button>
        <span id="check-update-msg" style="display:inline-block; margin-left:12px; color:#1976d2; font-size:14px;"></span>
    </div>`;
    overlay.style.display = 'flex';

    // Bỏ sự kiện chuyển về bản khác

    // Sự kiện kiểm tra cập nhật
    document.getElementById('btn-check-update').onclick = function() {
        const msg = document.getElementById('check-update-msg');
        msg.textContent = 'Đang kiểm tra...';
        setTimeout(() => {
            if (currentVersion === history[0].version) {
                msg.textContent = 'Bạn đang dùng phiên bản mới nhất!';
            } else {
                msg.innerHTML = `Có phiên bản mới: V${history[0].version}. <button id="btn-update-now" style="background:#43a047; color:#fff; border:none; border-radius:5px; padding:3px 12px; font-size:13px; cursor:pointer; margin-left:8px;">Cập nhật ngay</button>`;
                document.getElementById('btn-update_now').onclick = function() {
                    localStorage.setItem('selectedCodeVersion', history[0].version);
                    showSuccessPopup('Đã cập nhật lên phiên bản mới nhất V' + history[0].version + '. Đang cập nhật lại giao diện...');
                    setTimeout(() => {
                        renderMenu(window._lastActiveMenu || 'index');
                    }, 600);
                };
            }
        }, 900);
    };

    document.getElementById('popup-version-history-ok').onclick = function() {
        overlay.style.display = 'none';
    };
    document.getElementById('popup-version-history-close').onclick = function() {
        overlay.style.display = 'none';
    };
    overlay.onkeydown = function(e) {
        if (e.key === 'Escape') overlay.style.display = 'none';
    };
    setTimeout(() => {
        document.getElementById('popup-version-history-ok').focus();
    }, 100);
}

// Thêm hàm mở popup QR Checkin
// function showQRCheckinPopup() {
//     const overlay = document.getElementById('popup-qr-checkin-overlay');
//     const qrReader = document.getElementById('qr-reader');
//     const qrResult = document.getElementById('qr-result');
//     if (!overlay) return;
//     overlay.style.display = 'flex';
//     qrResult.textContent = '';
//     // TODO: Tích hợp thư viện quét QR tại đây (ví dụ html5-qrcode hoặc jsQR)
//     // Hiện tại chỉ là demo khung, bạn sẽ tích hợp sau
//     qrReader.innerHTML = '<span style="color:#888;">[Camera QR sẽ hiển thị ở đây]</span>';
//     // Đóng popup
//     document.getElementById('popup-qr-checkin-close').onclick = function() {
//         overlay.style.display = 'none';
//         // TODO: Dừng camera nếu có
//     };
//     overlay.onkeydown = function(e) {
//         if (e.key === 'Escape') overlay.style.display = 'none';
//     };
//     // Ghi log mở popup QR
//     window.addHistoryLog && window.addHistoryLog('Mở popup Chấm công QR', '');
// }

// Gợi ý các hàm đa năng cho danh sách nhân viên (bạn sẽ xử lý chi tiết ở emp.html)
// window.searchEmployee = function() {
//     window.addHistoryLog && window.addHistoryLog('Tìm kiếm nhân viên', '');
//     alert('Tính năng tìm kiếm sẽ được xử lý ở emp.html!');
// };
// window.exportEmployeeExcel = function() {
//     window.addHistoryLog && window.addHistoryLog('Xuất Excel nhân viên', '');
//     alert('Tính năng xuất Excel sẽ được xử lý ở emp.html!');
// };
// window.quickAddEmployee = function() {
//     window.addHistoryLog && window.addHistoryLog('Thêm nhanh nhân viên', '');
//     alert('Tính năng thêm nhanh sẽ được xử lý ở emp.html!');
// };

// Thêm popup cài đặt menu nếu chưa có
if (!document.getElementById('popup-menu-setting-overlay')) {
    const popupMenuSettingHtml = `
    <div id="popup-menu-setting-overlay" style="display:none; position:fixed; z-index:10010; left:0; top:0; width:100vw; height:100vh; background:#0007; align-items:center; justify-content:center;">
        <div id="popup-menu-setting-box" style="background:#fff; border-radius:12px; box-shadow:0 8px 32px #0003; padding:28px 24px 22px 24px; min-width:340px; max-width:95vw; display:flex; flex-direction:column; align-items:center; position:relative;">
            <div style="font-size:18px; font-weight:600; color:#1976d2; margin-bottom:12px;">Cài đặt menu</div>
            <div id="menu-setting-list" style="width:100%; max-height:50vh; overflow-y:auto; margin-bottom:16px;">
                <!-- Danh sách menu sẽ render ở đây -->
            </div>
            <div style="display:flex; gap:12px; width:100%; justify-content:center;">
                <button id="popup-menu-setting-ok" style="background:#1976d2; color:#fff; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer;">Lưu</button>
                <button id="popup-menu-setting-cancel" style="background:#eee; color:#1976d2; border:none; border-radius:6px; padding:7px 22px; font-size:15px; font-weight:600; cursor:pointer;">Hủy</button>
            </div>
            <span id="popup-menu-setting-close" style="position:absolute; top:8px; right:12px; font-size:20px; color:#888; cursor:pointer;" title="Đóng">&times;</span>
            <div style="font-size:13px; color:#888; margin-top:10px;">Kéo thả để đổi vị trí, tick để ẩn/hiện menu</div>
        </div>
    </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = popupMenuSettingHtml;
    document.body.appendChild(div.firstElementChild);
}

// Thêm hàm hiển thị popup cài đặt menu
function showMenuSettingPopup() {
    const overlay = document.getElementById('popup-menu-setting-overlay');
    const listDiv = document.getElementById('menu-setting-list');
    // Danh sách menu mặc định
    const defaultMenus = [
        { id: 'index', label: 'Trang Chủ', href: 'index.html' },
        { id: 'emp', label: 'Danh sách nhân viên', href: 'emp.html' },
        { id: 'work_schedule', label: 'Lịch làm việc', href: 'work_schedule.html' },
        { id: 'setup', label: 'Thiết Lập', href: 'setup.html' },
        { id: 'att', label: 'Chấm công', href: 'att.html' },
        { id: 'payroll', label: 'Bảng lương', href: 'payroll.html' },
        { id: 'payroll_report', label: 'Lập BC Lương', href: 'payroll_report.html' },
        { id: 'about', label: 'Giới thiệu', href: 'about-mksof.html' }
    ];
    // Lấy cấu hình menu từ localStorage
    let menuConfig = [];
    try {
        menuConfig = JSON.parse(localStorage.getItem('menuConfig') || '[]');
    } catch {}
    // Đưa biến menus ra ngoài để giữ trạng thái khi kéo thả
    let menus = menuConfig.length ? menuConfig : defaultMenus.map(m => ({...m, visible: true}));
    defaultMenus.forEach(def => {
        if (!menus.some(m => m.id === def.id)) menus.push({...def, visible: true});
    });
    menus = menus.filter(m => defaultMenus.some(d => d.id === m.id));

    // Hàm render lại danh sách menu trong popup (không gọi lại showMenuSettingPopup)
    function renderMenuSettingList() {
        listDiv.innerHTML = menus.map((m, idx) => `
            <div class="menu-setting-item" draggable="true" data-idx="${idx}" style="display:flex;align-items:center;gap:10px;padding:7px 0;cursor:grab;border-bottom:1px solid #eee;">
                <span style="font-size:18px;cursor:grab;">&#9776;</span>
                <input type="checkbox" class="menu-setting-visible" data-idx="${idx}" ${m.visible!==false?'checked':''} style="accent-color:#1976d2;">
                <span style="flex:1;">${m.label}</span>
            </div>
        `).join('');

        // Kéo thả đổi vị trí
        let dragIdx = null;
        let dragOverIdx = null;
        listDiv.querySelectorAll('.menu-setting-item').forEach(item => {
            item.ondragstart = function(e) {
                dragIdx = Number(item.getAttribute('data-idx'));
                e.dataTransfer.effectAllowed = 'move';
                item.style.opacity = '0.5';
            };
            item.ondragend = function() {
                dragIdx = null;
                dragOverIdx = null;
                listDiv.querySelectorAll('.menu-setting-item').forEach(i => i.style.background = '');
                item.style.opacity = '';
            };
            item.ondragover = function(e) {
                e.preventDefault();
                dragOverIdx = Number(item.getAttribute('data-idx'));
                listDiv.querySelectorAll('.menu-setting-item').forEach(i => i.style.background = '');
                item.style.background = '#e3f2fd';
            };
            item.ondragleave = function() {
                item.style.background = '';
            };
            item.ondrop = function(e) {
                e.preventDefault();
                item.style.background = '';
                const dropIdx = Number(item.getAttribute('data-idx'));
                if (dragIdx !== null && dragIdx !== dropIdx) {
                    const moved = menus.splice(dragIdx, 1)[0];
                    menus.splice(dropIdx, 0, moved);
                    renderMenuSettingList(); // chỉ render lại danh sách, không gọi lại popup
                }
            };
        });

        // Tick ẩn/hiện
        listDiv.querySelectorAll('.menu-setting-visible').forEach(cb => {
            cb.onchange = function() {
                const idx = Number(cb.getAttribute('data-idx'));
                menus[idx].visible = cb.checked;
            };
        });
    }

    renderMenuSettingList();
    overlay.style.display = 'flex';

    // Lưu
    document.getElementById('popup-menu-setting-ok').onclick = function() {
        localStorage.setItem('menuConfig', JSON.stringify(menus));
        overlay.style.display = 'none';
        renderMenu(window._lastActiveMenu || 'index');
    };
    // Hủy
    document.getElementById('popup-menu-setting-cancel').onclick = function() {
        overlay.style.display = 'none';
    };
    // Đóng bằng dấu X
    document.getElementById('popup-menu-setting-close').onclick = function() {
        overlay.style.display = 'none';
    };
    // Đóng bằng phím ESC
    overlay.onkeydown = function(e) {
        if (e.key === 'Escape') overlay.style.display = 'none';
    };
    setTimeout(() => {
        document.getElementById('popup-menu-setting-ok').focus();
    }, 100);
}