@echo off
echo ========================================
echo    SSS Ecommerce - Development Mode
echo    (Auto-restart on file changes)
echo ========================================
echo.

echo Starting development server with hot-reload...
echo Server available at: http://localhost:5454
echo.
echo Auto-restart is enabled - changes will trigger restart
echo Press Ctrl+C to stop
echo.

call mvnw spring-boot:run -Dspring-boot.run.profiles=dev

pause