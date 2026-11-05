$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $files = @("scratch/cv_et_linked.docx", "scratch/cv_en_linked.docx")
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
