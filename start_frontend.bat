@echo off
title ConnectFlow Frontend (Port 5173)
cd /d "D:\frontendd\crm-frontend"
echo ====================================================
echo   ConnectFlow Frontend Launcher (Port 5173)
echo ====================================================
echo.
echo Freeing port 5173 if in use...
powershell -NoProfile -Command "Get-Process -Id (Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force"
echo.
echo Starting Vite server...
start chrome "http://localhost:5173/"
npm run dev
pause
