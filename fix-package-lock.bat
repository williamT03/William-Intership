@echo off
REM Script to fix package-lock.json sync issues on Windows

echo Fixing package-lock.json sync issues...

REM Remove the existing package-lock.json
echo Removing outdated package-lock.json...
del package-lock.json 2>nul

REM Clear npm cache
echo Clearing npm cache...
npm cache clean --force

REM Install dependencies and regenerate package-lock.json
echo Installing dependencies and regenerating package-lock.json...
npm install

echo ✅ package-lock.json has been regenerated successfully!
echo Your dependencies are now in sync.