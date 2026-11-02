@echo off
title Export DOCX to PDF
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "export_pdfs.ps1"
echo.
pause
