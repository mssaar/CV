# PowerShell script to export all DOCX files in this directory to PDF via Word COM
$ErrorActionPreference = "Stop"

$dir = $PSScriptRoot
if (-not $dir) { $dir = Get-Location }

$word = New-Object -ComObject Word.Application
$word.Visible = $false

try {
    $docxFiles = Get-ChildItem -Path $dir -Filter "*.docx" | Where-Object { $_.Name -notlike "~$*" }
    Write-Host "Found $($docxFiles.Count) DOCX files to process in $dir."

    foreach ($file in $docxFiles) {
        $pdfPath = [System.IO.Path]::ChangeExtension($file.FullName, ".pdf")
        Write-Host "Converting '$($file.Name)' -> '$(Split-Path $pdfPath -Leaf)'..."
        
        $doc = $word.Documents.Open($file.FullName, [System.Reflection.Missing]::Value, $true) # ReadOnly
        $pages = $doc.ComputeStatistics([Microsoft.Office.Interop.Word.WdStatistic]::wdStatisticPages)
        
        # 17 = wdFormatPDF
        $doc.SaveAs([ref]$pdfPath, [ref]17)
        $doc.Close([Microsoft.Office.Interop.Word.WdSaveOptions]::wdDoNotSaveChanges)
        
        Write-Host "  -> Generated: $(Split-Path $pdfPath -Leaf) (Pages: $pages, Size: $((Get-Item $pdfPath).Length) bytes)"
    }
}
finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}

Write-Host "All PDFs successfully generated!"
