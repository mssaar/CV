@echo off
title DOCX to PDF Live Watcher
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "watch_docx.ps1"
