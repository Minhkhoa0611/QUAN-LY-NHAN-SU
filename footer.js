function renderFooter() {
    // Xóa footer cũ nếu có
    const oldFooter = document.querySelector('footer#mk-footer');
    if (oldFooter) oldFooter.remove();

    // Tạo phần tử footer
    const footer = document.createElement('footer');
    footer.id = 'mk-footer';
    footer.style.background = '#1976d2';
    footer.style.color = '#fff';
    footer.style.textAlign = 'center';
    footer.style.padding = '24px 10px 18px 10px';
    footer.style.fontSize = '16px';
    footer.style.marginTop = '40px';
    footer.style.borderTopLeftRadius = '18px';
    footer.style.borderTopRightRadius = '18px';
    footer.style.boxShadow = '0 -2px 8px #0002';

    // Nội dung chính
    const mainDiv = document.createElement('div');
    mainDiv.innerHTML = '<b style="color:#ffd600;">TimePro HRM – Giải pháp chấm công & nhân sự</b>';
    footer.appendChild(mainDiv);

    const sloganDiv = document.createElement('div');
    sloganDiv.textContent = 'Tối ưu hóa nguồn nhân lực, nâng tầm doanh nghiệp.';
    footer.appendChild(sloganDiv);

    // Thông tin liên hệ
    const contactDiv = document.createElement('div');
    contactDiv.className = 'footer-contact';
    contactDiv.style.marginTop = '10px';
    contactDiv.style.fontSize = '15px';
    contactDiv.style.color = '#e3f0ff';
    contactDiv.innerHTML = `
        <div>Liên hệ</div>
        <div>📍 Trụ sở chính: Ninh Hòa, Khánh Hòa</div>
        <div>📞 Hotline: 0867 544 809</div>
        <div>📧 Email: khoaminhtran9@gmail.com</div>
    `;
    footer.appendChild(contactDiv);

    // Thêm vào cuối body
    document.body.appendChild(footer);
}
