@echo off
echo ========================================
echo    SSS Ecommerce - Quick Run (No Tests)
echo ========================================
echo.

echo [1/3] Cleaning previous build...
call mvnw clean
if %ERRORLEVEL% neq 0 (
    echo ERROR: Clean failed!
    pause
    exit /b 1
)
echo ✓ Clean completed
echo.

echo [2/3] Compiling project...
call mvnw compile
if %ERRORLEVEL% neq 0 (
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)
echo ✓ Compilation completed
echo.

echo [3/3] Starting server...
echo Server available at: http://localhost:5454
echo Press Ctrl+C to stop
echo.
call mvnw spring-boot:run

pause