#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复电价配置弹框中购电/上网模板选择后的内容国际化问题
"""

import re

def fix_generate_price_html():
    file_path = "electricity-price-new.html"

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 固定电价部分 (第6054-6065行)
    old_fixed_price = r'''        function generatePriceHTML\(template\) \{
            if \(template\.type === 'fixed'\) \{
                return `
                    <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                        <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">固定电价</div>
                        <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                            <div>
                                <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">电价 \(元/kWh\)</label>
                                <input type="number" class="form-input price-input" step="0\.01" min="0" placeholder="0\.00" data-type="fixed" required>
                            </div>
                        </div>
                    </div>
                `;
            \} else if \(template\.type === 'tiered'\) \{'''

    new_fixed_price = '''        function generatePriceHTML(template) {
            if (template.type === 'fixed') {
                const fixedPriceLabel = typeof getTranslation === 'function' ? getTranslation('elecPriceFixedPriceLabel') : '固定电价';
                const priceUnit = typeof getTranslation === 'function' ? getTranslation('cabinetChartAxisElectricityPrice') : '电价 (元/kWh)';
                return `
                    <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                        <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">${fixedPriceLabel}</div>
                        <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                            <div>
                                <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${priceUnit}</label>
                                <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-type="fixed" required>
                            </div>
                        </div>
                    </div>
                `;
            } else if (template.type === 'tiered') {'''

    content = re.sub(old_fixed_price, new_fixed_price, content, flags=re.MULTILINE)

    # 2. 阶梯电价 - 固定模式 (第6068-6080行)
    old_tiered_fixed = r'''                // 阶梯电价
                if \(template\.tiers\.mode === 'fixed'\) \{
                    // 固定模式：一套阶梯
                    return template\.tiers\.data\.map\(\(tier, index\) => `
                        <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                            <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">
                                第\$\{index \+ 1\}阶梯 \(\$\{tier\.end !== null \? `\$\{tier\.start\}-\$\{tier\.end\}度` : `\$\{tier\.start\}度以上`\}\)
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">电价 \(元/kWh\)</label>
                                <input type="number" class="form-input price-input" step="0\.01" min="0" placeholder="0\.00" data-mode="fixed" data-tier="\$\{index\}" required>
                            </div>
                        </div>
                    `\)\.join\(''\);
                \} else if \(template\.tiers\.mode === 'seasonal'\) \{'''

    new_tiered_fixed = '''                // 阶梯电价
                if (template.tiers.mode === 'fixed') {
                    // 固定模式:一套阶梯
                    const priceUnit = typeof getTranslation === 'function' ? getTranslation('cabinetChartAxisElectricityPrice') : '电价 (元/kWh)';
                    return template.tiers.data.map((tier, index) => {
                        const tierTitle = typeof getTranslation === 'function'
                            ? getTranslation('elecPriceTierTitle').replace('{n}', index + 1)
                            : `第${index + 1}阶梯`;
                        const tierRange = tier.end !== null
                            ? `${tier.start}-${tier.end}${typeof getTranslation === 'function' ? getTranslation('elecPriceUnitDegree') || '度' : '度'}`
                            : (typeof getTranslation === 'function' ? getTranslation('elecPriceTierRangeAbove').replace('{from}', tier.start) : `${tier.start}度以上/月`);
                        return `
                        <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                            <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">
                                ${tierTitle} (${tierRange})
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${priceUnit}</label>
                                <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-mode="fixed" data-tier="${index}" required>
                            </div>
                        </div>
                    `;
                    }).join('');
                } else if (template.tiers.mode === 'seasonal') {'''

    content = re.sub(old_tiered_fixed, new_tiered_fixed, content, flags=re.MULTILINE | re.DOTALL)

    # 3. 阶梯电价 - 分季节模式 (第6081-6118行)
    # 由于这部分太复杂,我将直接替换关键文本
    # 替换 "第${index + 1}阶梯" 和 "月"
    content = re.sub(
        r"<h5 style=\"font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0;\">\s*\$\{season\.name\} \(\$\{season\.months\.map\(m => m \+ '月'\)\.join\('、'\)\}\)",
        r"<h5 style=\"font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0;\">\n                                    ${getTemplateI18nText(season.name)} (${season.months.map(m => m + (typeof getTranslation === 'function' ? getTranslation('elecPriceUnitMonth') || '月' : '月')).join('、')})",
        content
    )

    # 替换分季节模式中的阶梯标题
    content = re.sub(
        r"第\$\{index \+ 1\}阶梯 \(\$\{tier\.end !== null \? `\$\{tier\.start\}-\$\{tier\.end\}度` : `\$\{tier\.start\}度以上`\}\)",
        r"${typeof getTranslation === 'function' ? getTranslation('elecPriceTierTitle').replace('{n}', index + 1) : `第${index + 1}阶梯`} (${tier.end !== null ? `${tier.start}-${tier.end}${typeof getTranslation === 'function' ? getTranslation('elecPriceUnitDegree') || '度' : '度'}` : (typeof getTranslation === 'function' ? getTranslation('elecPriceTierRangeAbove').replace('{from}', tier.start) : `${tier.start}度以上/月`)})",
        content
    )

    # 4. 替换逐月模式中的月份标签
    # 替换硬编码的月份数组
    content = re.sub(
        r"const months = \['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'\];",
        r"""const months = typeof getTranslation === 'function' ? [
                        getTranslation('elecPriceMonthJan'),
                        getTranslation('elecPriceMonthFeb'),
                        getTranslation('elecPriceMonthMar'),
                        getTranslation('elecPriceMonthApr'),
                        getTranslation('elecPriceMonthMay'),
                        getTranslation('elecPriceMonthJun'),
                        getTranslation('elecPriceMonthJul'),
                        getTranslation('elecPriceMonthAug'),
                        getTranslation('elecPriceMonthSep'),
                        getTranslation('elecPriceMonthOct'),
                        getTranslation('elecPriceMonthNov'),
                        getTranslation('elecPriceMonthDec')
                    ] : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];""",
        content
    )

    # 5. 替换所有 "电价 (元/kWh)" 标签
    content = re.sub(
        r'<label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">电价 \(元/kWh\)</label>',
        r'<label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${typeof getTranslation === \'function\' ? getTranslation(\'cabinetChartAxisElectricityPrice\') : \'电价 (元/kWh)\'}</label>',
        content
    )

    # 6. 替换分时电价中的时段名称 - 需要调用getTemplateI18nText
    # 分时电价的时段名称已经在templateI18n中定义了,只需调用getTemplateI18nText
    content = re.sub(
        r'\$\{p\.name\} \(\$\{p\.start\} - \$\{p\.end\}\)',
        r'${getTemplateI18nText(p.name)} (${p.start} - ${p.end})',
        content
    )

    # 7. 替换分时电价季节模式中的季节名称和月份
    content = re.sub(
        r"<h5 style=\"font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0;\">\s*\$\{season\.name\} \(\$\{season\.months\.map\(m => m \+ \(typeof getTranslation === 'function' \? getTranslation\('elecPriceUnitMonth'\) \|\| '月' : '月'\)\)\.join\('、'\)\}\)",
        r"<h5 style=\"font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0;\">\n                                    ${getTemplateI18nText(season.name)} (${season.months.map(m => m + (typeof getTranslation === 'function' ? getTranslation('elecPriceUnitMonth') || '月' : '月')).join('、')})",
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ generatePriceHTML函数国际化修复完成")
    print("修复内容:")
    print("  - 固定电价标题和单位")
    print("  - 阶梯电价标题、范围和单位")
    print("  - 月份标签")
    print("  - 分时电价时段名称")
    print("  - 所有电价单位标签")

if __name__ == '__main__':
    fix_generate_price_html()
