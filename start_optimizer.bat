@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [주누디자인 쿠팡 윙 상품·광고 최적화 대시보드]를 시작합니다...
python server.py
pause
