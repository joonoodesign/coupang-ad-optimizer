import http.server
import socketserver
import webbrowser
import os

PORT = 8092
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

if __name__ == '__main__':
    url = f'http://localhost:{PORT}'
    print(f'🚀 주누디자인 쿠팡 윙 최적화 대시보드 서버 실행 중: {url}')
    webbrowser.open(url)
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        httpd.serve_forever()
