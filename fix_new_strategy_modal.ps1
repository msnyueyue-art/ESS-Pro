# 修复新建策略弹框中的国际化问题
$filePath = "rule-engine.html"

Write-Host "正在读取文件..." -ForegroundColor Yellow
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

$originalContent = $content

# 1. 修复 JavaScript 中的硬编码 '新建策略'
$content = $content -replace "modalTitle\.textContent = '新建策略';", "modalTitle.textContent = getTranslation('ruleNewRule');"

# 2. 修复下拉选项 '参数恢复正常范围'
$content = $content -replace '<option value="normal" selected>参数恢复正常范围</option>', '<option value="normal" selected data-translate="ruleResolutionNormalRange">参数恢复正常范围</option>'

# 3. 修复消除延迟的 '分钟' 单位文本
$content = $content -replace '<span style="font-size: 13px; color: var\(--text-secondary\);">分钟</span>', '<span style="font-size: 13px; color: var(--text-secondary);" data-translate="ruleMinutes">分钟</span>'

# 4. 修复时间窗口下拉选项中的硬编码文本
$content = $content -replace '<option value="5">5分钟</option>', '<option value="5" data-translate-template="ruleTimeWindowMinutes" data-value="5">5分钟</option>'
$content = $content -replace '<option value="10" selected>10分钟</option>', '<option value="10" selected data-translate-template="ruleTimeWindowMinutes" data-value="10">10分钟</option>'
$content = $content -replace '<option value="30">30分钟</option>', '<option value="30" data-translate-template="ruleTimeWindowMinutes" data-value="30">30分钟</option>'
$content = $content -replace '<option value="60">1小时</option>', '<option value="60" data-translate="ruleTimeWindow1Hour">1小时</option>'
$content = $content -replace '<option value="120">2小时</option>', '<option value="120" data-translate="ruleTimeWindow2Hours">2小时</option>'

# 5. 修复降噪配置中的 "分钟内最多发送" 和 "次"
$content = $content -replace '<span>分钟内最多发送</span>', '<span data-translate="ruleMinutesMaxSend">分钟内最多发送</span>'
$content = $content -replace '<span>次</span>', '<span data-translate="ruleTimes">次</span>'

if ($content -ne $originalContent) {
    Write-Host "正在写入修复后的内容..." -ForegroundColor Yellow
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "✅ 成功修复 $filePath" -ForegroundColor Green
} else {
    Write-Host "ℹ️  $filePath 无需修改" -ForegroundColor Cyan
}

Write-Host "`n✅ 所有修复完成!" -ForegroundColor Green
