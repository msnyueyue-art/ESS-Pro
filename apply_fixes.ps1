# 简单的PowerShell修复脚本
$html = Get-Content "electricity-price-new.html" -Raw
$common = Get-Content "common.js" -Raw

# 修复common.js - 添加缺失翻译键
Write-Host "修复common.js..." -ForegroundColor Cyan
if ($common -notmatch "elecPriceUnitMonth") {
    # 中文部分
    $common = $common.Replace(
        "elecPriceTierRangeAbove: '{from}度以上/月',",
        "elecPriceTierRangeAbove: '{from}度以上/月',`n        elecPriceUnitMonth: '月',`n        elecPriceUnitDegree: '度',"
    )

    # 英文部分
    $common = $common.Replace(
        "elecPriceTierRangeAbove: 'Above {from} kWh/month',",
        "elecPriceTierRangeAbove: 'Above {from} kWh/month',`n        elecPriceUnitMonth: 'Month',`n        elecPriceUnitDegree: 'kWh',"
    )

    $common | Set-Content "common.js" -Encoding UTF8 -NoNewline
    Write-Host "  ✓ 翻译键已添加" -ForegroundColor Green
}

Write-Host "修复electricity-price-new.html..." -ForegroundColor Cyan

# 简单替换 - 一个一个来
$replacements = @(
    @{
        Old = '                        <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">固定电价</div>'
        New = '                        <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">${typeof getTranslation === ''function'' ? getTranslation(''elecPriceFixedPriceLabel'') : ''固定电价''}</div>'
    }
)

foreach ($r in $replacements) {
    if ($html.Contains($r.Old)) {
        $html = $html.Replace($r.Old, $r.New)
        Write-Host "  ✓ 已替换" -ForegroundColor Green
    }
}

$html | Set-Content "electricity-price-new.html" -Encoding UTF8 -NoNewline
Write-Host "完成!" -ForegroundColor Green
