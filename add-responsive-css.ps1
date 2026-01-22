# 批量添加响应式CSS到HTML文件
# PowerShell脚本

$cssLink = '    <link rel="stylesheet" href="responsive-1024.css">'

$htmlFiles = @(
    "dashboard.html",
    "site1.html",
    "devices.html",
    "devices1.html",
    "alarm-management.html",
    "alarm-statistics.html",
    "alarm-notifications.html",
    "power-report.html",
    "electricity-price-new.html",
    "rule-engine.html",
    "data-analysis.html",
    "account-settings.html",
    "personalization.html",
    "roles.html",
    "cabinet-detail.html",
    "energy-flow.html"
)

$successCount = 0
$skipCount = 0
$errorCount = 0

foreach ($filename in $htmlFiles) {
    try {
        if (-not (Test-Path $filename)) {
            Write-Host "⚠️  跳过: $filename (文件不存在)" -ForegroundColor Yellow
            $skipCount++
            continue
        }

        $content = Get-Content $filename -Raw -Encoding UTF8

        if ($content -match "responsive-1024\.css") {
            Write-Host "⏭️  跳过: $filename (已包含响应式CSS)" -ForegroundColor Cyan
            $skipCount++
            continue
        }

        if ($content -match "</head>") {
            $newContent = $content -replace "</head>", "$cssLink`n</head>"
            $newContent | Set-Content $filename -Encoding UTF8 -NoNewline
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
