from http.server import BaseHTTPRequestHandler, HTTPServer
import socket

class RedirectHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(301)  # Hoặc 302 để redirect tạm thời
        self.send_header('Location', 'https://minhkhoa0611.github.io/quanlynhansu/index.html')
        self.end_headers()

if __name__ == '__main__':
    # Lấy địa chỉ IP LAN của máy chủ
    hostname = socket.gethostname()
    try:
        lan_ip = socket.gethostbyname(hostname)
    except Exception:
        lan_ip = 'Không xác định'

    server_address = ('0.0.0.0', 80)
    httpd = HTTPServer(server_address, RedirectHandler)
    print(f"Server đang chạy tại http://{server_address[0]}:{server_address[1]}")
    print(f"Hãy truy cập bằng IP LAN của máy chủ: http://{lan_ip}/")
    httpd.serve_forever()
