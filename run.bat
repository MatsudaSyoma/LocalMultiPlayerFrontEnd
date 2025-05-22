@echo off
chcp 65001
start powershell -ExecutionPolicy RemoteSigned -File "UEFile\Windows\PixelStreamingClient\Samples\PixelStreaming\WebServers\SignallingWebServer\platform_scripts\cmd\Start_SignallingServer.ps1"
start cmd /K "node server\server.js"

set HOST=localhost
set PORT=80
set MAX_RETRIES=100
set RETRY_DELAY=1

echo サーバーの起動を待っています...
set /a COUNT=0

:WAIT_LOOP
powershell -Command "try { (Invoke-WebRequest -Uri 'http://%HOST%:%PORT%' -UseBasicParsing -TimeoutSec 1) | Out-Null; exit 0 } catch { exit 1 }"

if %ERRORLEVEL%==0 (
    echo サーバーが起動しました！
    goto AFTER_SERVER
)

set /a COUNT+=1
if %COUNT% GEQ %MAX_RETRIES% (
    echo サーバーが起動しませんでした。タイムアウト。
    exit /b 1
)

timeout /t %RETRY_DELAY% >nul
goto WAIT_LOOP

:AFTER_SERVER
index.html
cd UEFile\Windows\
PixelStreamingClient.exe -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -windowed
