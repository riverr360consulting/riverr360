@echo off
echo ========================================
echo Riverr360 Consulting Website Setup
echo ========================================
echo.

echo Checking if package.json exists...
if not exist package.json (
    echo ERROR: package.json not found!
    echo.
    echo Please make sure you:
    echo 1. Extracted the riverr360-consulting.tar.gz file
    echo 2. Are in the riverr360-consulting folder
    echo 3. Can see files like package.json, README.md, etc.
    echo.
    pause
    exit /b 1
)

echo Found package.json - continuing...
echo.

echo Installing dependencies...
echo This may take a few minutes...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed!
    echo.
    echo Try these solutions:
    echo 1. Make sure Node.js is installed: node --version
    echo 2. Make sure npm is installed: npm --version
    echo 3. Try running as Administrator
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Get your free Web3Forms key at: https://web3forms.com
echo 2. Edit components\ContactForm.tsx (line 22)
echo 3. Replace YOUR_ACCESS_KEY_HERE with your key
echo 4. Run: npm run dev
echo 5. Open: http://localhost:3000
echo.
echo Read README.md for detailed instructions!
echo.
pause
