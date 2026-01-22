#!/bin/bash
# 只修复electricity-price-new.html中generatePriceHTML函数的国际化问题

file="electricity-price-new.html"

# 备份
cp "$file" "${file}.backup_i18n"

# 使用sed进行替换
sed -i '
# 固定电价标题
s|<div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">固定电价</div>|<div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">${typeof getTranslation === '"'"'function'"'"' ? getTranslation('"'"'elecPriceFixedPriceLabel'"'"') : '"'"'固定电价'"'"'}</div>|g

# 电价单位标签 - 所有出现的地方
s|<label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">电价 (元/kWh)</label>|<label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${typeof getTranslation === '"'"'function'"'"' ? getTranslation('"'"'cabinetChartAxisElectricityPrice'"'"') : '"'"'电价 (元/kWh)'"'"'}</label>|g

# 阶梯标题和范围 - generatePriceHTML中所有"第X阶梯"
s|第\${index + 1}阶梯 (\${tier\.end !== null ? \`\${tier\.start}-\${tier\.end}度\` : \`\${tier\.start}度以上\`})|${typeof getTranslation === '"'"'function'"'"' ? getTranslation('"'"'elecPriceTierTitle'"'"').replace('"'"'{n}'"'"', index + 1) : \`第${index + 1}阶梯\`} (${tier.end !== null ? \`${tier.start}-${tier.end}${typeof getTranslation === '"'"'function'"'"' ? getTranslation('"'"'elecPriceUnitDegree'"'"') || '"'"'度'"'"' : '"'"'度'"'"'}\` : (typeof getTranslation === '"'"'function'"'"' ? getTranslation('"'"'elecPriceTierRangeAbove'"'"').replace('"'"'{from}'"'"', tier.start) : \`${tier.start}度以上/月\`)})|g

# 月份标记 - season.months中的"月"
s|\${season\.months\.map(m => m + '"'"'月'"'"')\.join('"'"'、'"'"')}|${season.months.map(m => m + (typeof getTranslation === '"'"'function'"'"' ? getTranslation('"'"'elecPriceUnitMonth'"'"') || '"'"'月'"'"' : '"'"'月'"'"')).join('"'"'、'"'"')}|g

# 月份数组
s|const months = \['"'"'一月'"'"', '"'"'二月'"'"', '"'"'三月'"'"', '"'"'四月'"'"', '"'"'五月'"'"', '"'"'六月'"'"', '"'"'七月'"'"', '"'"'八月'"'"', '"'"'九月'"'"', '"'"'十月'"'"', '"'"'十一月'"'"', '"'"'十二月'"'"'\];|const months = typeof getTranslation === '"'"'function'"'"' ? [getTranslation('"'"'elecPriceMonthJan'"'"'), getTranslation('"'"'elecPriceMonthFeb'"'"'), getTranslation('"'"'elecPriceMonthMar'"'"'), getTranslation('"'"'elecPriceMonthApr'"'"'), getTranslation('"'"'elecPriceMonthMay'"'"'), getTranslation('"'"'elecPriceMonthJun'"'"'), getTranslation('"'"'elecPriceMonthJul'"'"'), getTranslation('"'"'elecPriceMonthAug'"'"'), getTranslation('"'"'elecPriceMonthSep'"'"'), getTranslation('"'"'elecPriceMonthOct'"'"'), getTranslation('"'"'elecPriceMonthNov'"'"'), getTranslation('"'"'elecPriceMonthDec'"'"')] : ['"'"'一月'"'"', '"'"'二月'"'"', '"'"'三月'"'"', '"'"'四月'"'"', '"'"'五月'"'"', '"'"'六月'"'"', '"'"'七月'"'"', '"'"'八月'"'"', '"'"'九月'"'"', '"'"'十月'"'"', '"'"'十一月'"'"', '"'"'十二月'"'"'];|g

# 季节名称
s|\${season\.name}|${getTemplateI18nText(season.name)}|g

# 时段名称 (分时电价)
s|\${p\.name} (\${p\.start} - \${p\.end})|${getTemplateI18nText(p.name)} (${p.start} - ${p.end})|g
' "$file"

echo "✅ 修复完成！"
echo "备份文件: ${file}.backup_i18n"
