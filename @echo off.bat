@echo off
setlocal enabledelayedexpansion

for /l %%i in (1, 1, 100) do (
    md "Que%%i"
)

echo Folders created successfully.
pause
