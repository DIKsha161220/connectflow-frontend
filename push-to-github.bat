@echo off
title Push Frontend to GitHub
color 0A
echo ========================================================
echo        Pushing Frontend Code to GitHub...
echo ========================================================
echo.

cd /d "d:\frontendd\crm-frontend"

echo [1/4] Checking Git Status...
git status

echo.
echo [2/4] Adding modified files (git add .)...
git add .

echo.
echo [3/4] Creating Commit...
git commit -m "Update CRM frontend: full page layout, date autofill, and data persistence"

echo.
echo [4/4] Pushing to GitHub (origin main)...
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo ========================================================
    echo   [SUCCESS] Frontend code successfully pushed to GitHub!
    echo ========================================================
) else (
    color 0C
    echo ========================================================
    echo   [ERROR] Push failed. Please check your GitHub login.
    echo ========================================================
)

echo.
pause
