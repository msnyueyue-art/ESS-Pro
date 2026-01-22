# PowerShell脚本: 修复电价配置弹框模板内容的国际化问题

$ErrorActionPreference = "Stop"

# 1. 首先在common.js中添加缺失的翻译键
Write-Host "==> 步骤1: 添加缺失的翻译键到common.js" -ForegroundColor Cyan

$commonFile = "common.js"
$content = Get-Content $commonFile -Raw -Encoding UTF8

# 在中文部分添加
if ($content -notmatch "elecPriceUnitMonth:") {
    $content = $content -replace "(elecPriceTierRangeAbove: '\{from\}度以上/月',)", "`$1`n        elecPriceUnitMonth: '月',`n        elecPriceUnitDegree: '度',"
    Write-Host "  ✓ 添加中文翻译键" -ForegroundColor Green
}

# 在英文部分添加
if ($content -notmatch "elecPriceUnitMonth: 'Month'") {
    $content = $content -replace "(elecPriceTierRangeAbove: 'Above \{from\} kWh/month',)", "`$1`n        elecPriceUnitMonth: 'Month',`n        elecPriceUnitDegree: 'kWh',"
    Write-Host "  ✓ 添加英文翻译键" -ForegroundColor Green
}

Set-Content $commonFile $content -Encoding UTF8 -NoNewline

# 2. 修复electricity-price-new.html中的generatePriceHTML函数
Write-Host "`n==> 步骤2: 修复electricity-price-new.html中的国际化" -ForegroundColor Cyan

$htmlFile = "electricity-price-new.html"
$html = Get-Content $htmlFile -Raw -Encoding UTF8

# 2.1 固定电价部分
Write-Host "  - 修复固定电价部分..." -ForegroundColor Yellow
$html = $html -replace "(?s)(\s+// 生成价格配置HTML的辅助函数\s+function generatePriceHTML\(template\) \{\s+if \(template\.type === 'fixed'\) \{\s+return ``\s+<div class=`"price-item`" style=`"[^`"]+`">\s+<div style=`"[^`"]+`">)固定电价(</div>)", "`${1}`${typeof getTranslation === 'function' ? getTranslation('elecPriceFixedPriceLabel') : '固定电价'}`$2"

$html = $html -replace '(<label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">)电价 \(元/kWh\)(</label>\s+<input type="number" class="form-input price-input" step="0\.01" min="0" placeholder="0\.00" data-type="fixed" required>)', '${1}${typeof getTranslation === ''function'' ? getTranslation(''cabinetChartAxisElectricityPrice'') : ''电价 (元/kWh'')}`$2'

# 2.2 阶梯电价 - 固定模式
Write-Host "  - 修复阶梯电价固定模式..." -ForegroundColor Yellow
$html = $html -replace "第\`$\{index \+ 1\}阶梯 \(\`$\{tier\.end !== null \? ``\`$\{tier\.start\}-\`$\{tier\.end\}度`` : ``\`$\{tier\.start\}度以上``\}\)", "`${typeof getTranslation === 'function' ? getTranslation('elecPriceTierTitle').replace('{n}', index + 1) : ``第`${index + 1}阶梯``} (`${tier.end !== null ? ```${tier.start}-`${tier.end}`${typeof getTranslation === 'function' ? getTranslation('elecPriceUnitDegree') : '度'}`` : (typeof getTranslation === 'function' ? getTranslation('elecPriceTierRangeAbove').replace('{from}', tier.start) : ```${tier.start}度以上/月``)})"

# 2.3 月份数组
Write-Host "  - 修复月份数组..." -ForegroundColor Yellow
$html = $html -replace "const months = \['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'\];", @"
const months = typeof getTranslation === 'function' ? [
                        getTranslation('elecPriceMonthJan'), getTranslation('elecPriceMonthFeb'), getTranslation('elecPriceMonthMar'),
                        getTranslation('elecPriceMonthApr'), getTranslation('elecPriceMonthMay'), getTranslation('elecPriceMonthJun'),
                        getTranslation('elecPriceMonthJul'), getTranslation('elecPriceMonthAug'), getTranslation('elecPriceMonthSep'),
                        getTranslation('elecPriceMonthOct'), getTranslation('elecPriceMonthNov'), getTranslation('elecPriceMonthDec')
                    ] : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
"@

# 2.4 季节名称和月份
Write-Host "  - 修复季节名称..." -ForegroundColor Yellow
$html = $html -replace "\`$\{season\.name\} \(\`$\{season\.months\.map\(m => m \+ '月'\)\.join\('、'\)\}\)", "`${getTemplateI18nText(season.name)} (`${season.months.map(m => m + (typeof getTranslation === 'function' ? getTranslation('elecPriceUnitMonth') : '月')).join('、')})"

# 2.5 分时电价时段名称
Write-Host "  - 修复分时电价时段名称..." -ForegroundColor Yellow
$html = $html -replace "\`$\{p\.name\} \(\`$\{p\.start\} - \`$\{p\.end\}\)", "`${getTemplateI18nText(p.name)} (`${p.start} - `${p.end})"

# 2.6 所有剩余的电价单位
Write-Host "  - 修复所有电价单位标签..." -ForegroundColor Yellow
$html = $html -replace '电价 \(元/kWh\)', '${typeof getTranslation === ''function'' ? getTranslation(''cabinetChartAxisElectricityPrice'') : ''电价 (元/kWh''}'

Set-Content $htmlFile $html -Encoding UTF8 -NoNewline

Write-Host "`n==> 修复完成！" -ForegroundColor Green
Write-Host @"

已修复的内容:
✓ 添加翻译键: elecPriceUnitMonth, elecPriceUnitDegree
✓ 固定电价标题和单位
✓ 阶梯电价标题和范围显示
✓ 月份标签国际化
✓ 季节名称国际化
✓ 分时电价时段名称国际化
✓ 所有电价单位标签

"@ -ForegroundColor Cyan
