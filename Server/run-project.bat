@echo off
echo ========================================
echo    SSS Ecommerce Server - Build & Run
echo ========================================
echo.

echo [1/4] Cleaning previous build...
call mvnw clean
if %ERRORLEVEL% neq 0 (
    echo ERROR: Clean failed!
    pause
    exit /b 1
)
echo ✓ Clean completed successfully
echo.

echo [2/4] Compiling project...
call mvnw compile
if %ERRORLEVEL% neq 0 (
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)
echo ✓ Compilation completed successfully
echo.

echo [3/4] Running tests...
call mvnw test
if %ERRORLEVEL% neq 0 (
    echo WARNING: Some tests failed, but continuing...
)
echo ✓ Tests completed
echo.

echo [4/4] Starting Spring Boot application...
echo Server will be available at: http://localhost:5454
echo Press Ctrl+C to stop the server
echo.
call mvnw spring-boot:run

echo.
echo Server stopped.
pause