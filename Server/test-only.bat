@echo off
echo ========================================
echo    SSS Ecommerce - Test Runner
echo ========================================
echo.

echo Compiling and running tests...
call mvnw clean test
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Tests failed! Check the output above for details.
) else (
    echo.
    echo ✅ All tests passed successfully!
)

echo.
pause