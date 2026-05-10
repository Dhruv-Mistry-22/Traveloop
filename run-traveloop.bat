@echo off
echo ==========================================
echo       TRAVELOOP SYSTEM RUNNER
echo ==========================================

:: Start Podman machine
echo [1/3] Starting Podman machine...
podman machine start

:: Start Backend
echo [2/3] Starting Backend in new window...
start "Traveloop Backend" cmd /c "cd backend && npm run dev"

:: Start Frontend
echo [3/3] Starting Frontend in new window...
start "Traveloop Frontend" cmd /c "cd frontend && npm run dev"

echo.
echo ==========================================
echo Traveloop is starting up!
echo Backend API: http://localhost:5000
echo Frontend UI:  http://localhost:3000
echo ==========================================
echo.
echo Press any key to stop the Podman machine and exit.
pause > nul

echo Stopping Podman machine...
podman machine stop
exit
