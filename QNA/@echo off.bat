@echo off
setlocal enabledelayedexpansion

for /l %%i in (1, 1, 100) do (
    md "Folder%%i"
)

echo Folders created successfully.
pause
