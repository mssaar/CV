# File watcher that automatically regenerates PDFs whenever any DOCX file is saved
param(
    [string]$Directory = $PSScriptRoot
)

if (-not $Directory) { $Directory = (Get-Location).Path }

Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host " Watching DOCX files in: $Directory" -ForegroundColor Cyan
Write-Host " Whenever you save a .docx in Word, PDF regenerates auto." -ForegroundColor Cyan
Write-Host " Press Ctrl+C in this window to stop watching." -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $Directory
$watcher.Filter = "*.docx"
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName
$watcher.EnableRaisingEvents = $true

$lastRun = [DateTime]::MinValue

try {
    while ($true) {
        $change = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::Changed -bor [System.IO.WatcherChangeTypes]::Created, 1000)
        if ($change.TimedOut) { continue }
        
        $fileName = $change.Name
        if ($fileName -like "~$*") { continue } # Ignore Word temporary lock files

        # Debounce: skip duplicate events fired in rapid succession
        if ((Get-Date) - $lastRun -lt [TimeSpan]::FromSeconds(3)) {
            continue
        }
        $lastRun = Get-Date

        Write-Host "`n[$((Get-Date).ToString('HH:mm:ss'))] Detected save: $fileName" -ForegroundColor Yellow
        Start-Sleep -Milliseconds 800 # Allow Word to flush buffer

        try {
            & "$Directory\export_pdfs.ps1"
        } catch {
            Write-Warning "PDF export error: $_"
        }
    }
} finally {
    $watcher.Dispose()
}
