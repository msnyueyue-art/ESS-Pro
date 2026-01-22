# 为所有触摸屏页面添加国际化脚本引用
# PowerShell脚本

$scriptTag = '    <script src="touchscreen-i18n.js"></script>'

$htmlFiles = @(
    "data.html",
    "history.html",
    "control.html",
    "alarms.html",
    "logs.html",
    "settings.html"
)

$successCount = 0
$skipCount = 0
$errorCount = 0

foreach ($filename in $htmlFiles) {
    $filePath = Join-Path "." $filename

    try {
        if (-not (Test-Path $filePath)) {
            Write-Host "⚠️  跳过: $filename (文件不存在)" -ForegroundColor Yellow
            $skipCount++
            continue
        }

        $content = Get-Content $filePath -Raw -Encoding UTF8

        if ($content -match "touchscreen-i18n\.js") {
            Write-Host "⏭️  跳过: $filename (已包含国际化脚本)" -ForegroundColor Cyan
            $skipCount++
            continue
        }

        # 在</head>之前插入脚本引用
        if ($content -match "</head>") {
            $newContent = $content -replace "</head>", "$scriptTag`n</head>"
            $newContent | Set-Content $filePath -Encoding UTF8 -NoNewline
            Write-Host "✅ 成功: $filename" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "❌ 失败: $filename (未找到</head>标签)" -ForegroundColor Red
            $errorCount++
        }

    } catch {
        Write-Host "❌ 错误: $filename - $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host ("=" * 50) -ForegroundColor White
Write-Host "处理完成！" -ForegroundColor White
Write-Host ("=" * 50) -ForegroundColor White
Write-Host "✅ 成功: $successCount 个文件" -ForegroundColor Green
Write-Host "⏭️  跳过: $skipCount 个文件" -ForegroundColor Cyan
Write-Host "❌ 失败: $errorCount 个文件" -ForegroundColor Red
Write-Host "📝 总计: $($htmlFiles.Count) 个文件" -ForegroundColor White
Write-Host ("=" * 50) -ForegroundColor White
