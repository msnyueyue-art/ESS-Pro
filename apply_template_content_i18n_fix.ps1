# 应用电价配置弹框模板内容国际化修复
# PowerShell脚本

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " 电价配置弹框模板内容国际化修复工具" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 步骤1: 添加缺失的翻译键到common.js
Write-Host "[1/3] 添加缺失的翻译键..." -ForegroundColor Yellow
$commonFile = "common.js"
$commonContent = [System.IO.File]::ReadAllText($commonFile, [System.Text.Encoding]::UTF8)

$updated = $false

# 检查是否已经存在
if ($commonContent -notmatch "elecPriceUnitMonth") {
    # 中文部分 - 在 elecPriceTierRangeAbove 后添加
    $commonContent = $commonContent -replace (
        "elecPriceTierRangeAbove: '\{from\}度以上/月',"
    ), (
        "elecPriceTierRangeAbove: '{from}度以上/月',`n        elecPriceUnitMonth: '月',`n        elecPriceUnitDegree: '度',"
    )

    # 英文部分
    $commonContent = $commonContent -replace (
        "elecPriceTierRangeAbove: 'Above \{from\} kWh/month',"
    ), (
        "elecPriceTierRangeAbove: 'Above {from} kWh/month',`n        elecPriceUnitMonth: 'Month',`n        elecPriceUnitDegree: 'kWh',"
    )

    [System.IO.File]::WriteAllText($commonFile, $commonContent, [System.Text.Encoding]::UTF8)
    Write-Host "  ✓ 翻译键已添加到 common.js" -ForegroundColor Green
    $updated = $true
} else {
    Write-Host "  ○ 翻译键已存在，跳过" -ForegroundColor Gray
}

# 步骤2: 替换 generatePriceHTML 函数
Write-Host "`n[2/3] 替换 generatePriceHTML 函数..." -ForegroundColor Yellow
$htmlFile = "electricity-price-new.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlFile, [System.Text.Encoding]::UTF8)

# 读取修复后的函数
$fixedFunction = [System.IO.File]::ReadAllText("generatePriceHTML_fixed.js", [System.Text.Encoding]::UTF8)

# 找到原函数的开始和结束位置
$pattern = '(?s)(\s+// 生成价格配置HTML的辅助函数\s+)(function generatePriceHTML\(template\) \{.*?^\s+\})\s+(?=\s+function onConsumptionTemplateSelect)'

if ($htmlContent -match $pattern) {
    # 保留注释,替换函数体
    $htmlContent = $htmlContent -replace $pattern, "`${1}$fixedFunction`n`n        "
    [System.IO.File]::WriteAllText($htmlFile, $htmlContent, [System.Text.Encoding]::UTF8)
    Write-Host "  ✓ generatePriceHTML 函数已更新" -ForegroundColor Green
    $updated = $true
} else {
    Write-Host "  ✗ 未能找到 generatePriceHTML 函数，请手动检查" -ForegroundColor Red
}

# 步骤3: 验证
Write-Host "`n[3/3] 验证修复..." -ForegroundColor Yellow

# 检查关键翻译调用是否存在
$checks = @(
    @{ Pattern = "getTranslation\('elecPriceFixedPriceLabel'\)"; Desc = "固定电价标签" },
    @{ Pattern = "getTranslation\('elecPriceTierTitle'\)"; Desc = "阶梯标题" },
    @{ Pattern = "getTranslation\('elecPriceUnitMonth'\)"; Desc = "月份单位" },
    @{ Pattern = "getTranslation\('elecPriceUnitDegree'\)"; Desc = "度数单位" },
    @{ Pattern = "getTemplateI18nText\(p\.name\)"; Desc = "时段名称翻译" },
    @{ Pattern = "getTemplateI18nText\(season\.name\)"; Desc = "季节名称翻译" }
)

$htmlContent = [System.IO.File]::ReadAllText($htmlFile, [System.Text.Encoding]::UTF8)
$allPassed = $true

foreach ($check in $checks) {
    if ($htmlContent -match $check.Pattern) {
        Write-Host "  ✓ $($check.Desc)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $($check.Desc) - 未找到" -ForegroundColor Red
        $allPassed = $false
    }
}

# 总结
Write-Host "`n========================================" -ForegroundColor Cyan
if ($allPassed -and $updated) {
    Write-Host " ✓ 修复成功完成！" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    Write-Host "修复内容:" -ForegroundColor White
    Write-Host "  • 添加翻译键: elecPriceUnitMonth, elecPriceUnitDegree"
    Write-Host "  • 固定电价: 标题和单位国际化"
    Write-Host "  • 阶梯电价: 标题、范围和单位国际化"
    Write-Host "  • 月份标签: 完全国际化"
    Write-Host "  • 季节名称: 使用 getTemplateI18nText"
    Write-Host "  • 分时电价: 时段名称国际化"
    Write-Host "`n请在浏览器中切换到英文环境测试验证。" -ForegroundColor Yellow
} elseif (-not $updated) {
    Write-Host " ○ 无需修复" -ForegroundColor Gray
    Write-Host "========================================" -ForegroundColor Cyan
} else {
    Write-Host " ⚠ 修复部分完成，请检查错误" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
}
