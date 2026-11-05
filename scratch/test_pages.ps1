$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $files = @("scratch/CV_test_et.docx", "scratch/CV_test_en.docx")
    foreach ($f in $files) {
        $fullPath = (Get-Item $f).FullName
        $pdfPath = [System.IO.Path]::ChangeExtension($fullPath, ".pdf")
        $doc = $word.Documents.Open($fullPath, [System.Reflection.Missing]::Value, $true)
        $pages = $doc.ComputeStatistics([Microsoft.Office.Interop.Word.WdStatistic]::wdStatisticPages)
        $doc.SaveAs([ref]$pdfPath, [ref]17)
        $doc.Close([Microsoft.Office.Interop.Word.WdSaveOptions]::wdDoNotSaveChanges)
        Write-Host "$f -> Pages: $pages"
    }
} finally {
    $word.Quit()
}
