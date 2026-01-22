// 生成价格配置HTML的辅助函数 - 国际化修复版
function generatePriceHTML(template) {
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
    } else if (template.type === 'tiered') {
        // 阶梯电价
        const priceUnit = typeof getTranslation === 'function' ? getTranslation('cabinetChartAxisElectricityPrice') : '电价 (元/kWh)';

        if (template.tiers.mode === 'fixed') {
            // 固定模式：一套阶梯
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
        } else if (template.tiers.mode === 'seasonal') {
            // 分季节模式：每个季节有自己的阶梯 - Tab导航
            const containerId = `seasonal-container-${Date.now()}`;
            const tabsHtml = template.tiers.seasons.map((season, idx) => `
                <button class="config-tab ${idx === 0 ? 'active' : ''}" data-tab="season-${season.id}" onclick="switchPriceTab('${containerId}', 'season-${season.id}')">
                    ${getTemplateI18nText(season.name)}
                </button>
            `).join('');

            const contentsHtml = template.tiers.seasons.map((season, idx) => {
                const seasonName = getTemplateI18nText(season.name);
                const monthUnit = typeof getTranslation === 'function' ? getTranslation('elecPriceUnitMonth') || '月' : '月';
                const monthsText = season.months.map(m => m + monthUnit).join('、');

                return `
                <div id="season-${season.id}" class="config-tab-content ${idx === 0 ? 'active' : ''}">
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 2px solid #3b82f6;">
                        <h5 style="font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0;">
                            ${seasonName} (${monthsText})
                        </h5>
                        ${season.tiers.map((tier, index) => {
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
                                    <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-mode="seasonal" data-season="${season.id}" data-tier="${index}" required>
                                </div>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>
            `;
            }).join('');

            return `
                <div id="${containerId}">
                    <div class="config-tabs" style="margin-bottom: 16px;">
                        ${tabsHtml}
                    </div>
                    ${contentsHtml}
                </div>
            `;
        } else if (template.tiers.mode === 'monthly') {
            // 逐月模式：每个月有自己的阶梯 - Tab导航
            const months = typeof getTranslation === 'function' ? [
                getTranslation('elecPriceMonthJan'), getTranslation('elecPriceMonthFeb'), getTranslation('elecPriceMonthMar'),
                getTranslation('elecPriceMonthApr'), getTranslation('elecPriceMonthMay'), getTranslation('elecPriceMonthJun'),
                getTranslation('elecPriceMonthJul'), getTranslation('elecPriceMonthAug'), getTranslation('elecPriceMonthSep'),
                getTranslation('elecPriceMonthOct'), getTranslation('elecPriceMonthNov'), getTranslation('elecPriceMonthDec')
            ] : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            const containerId = `monthly-container-${Date.now()}`;

            const tabsHtml = months.map((monthName, idx) => `
                <button class="config-tab ${idx === 0 ? 'active' : ''}" data-tab="month-${idx + 1}" onclick="switchPriceTab('${containerId}', 'month-${idx + 1}')">
                    ${monthName}
                </button>
            `).join('');

            const contentsHtml = months.map((monthName, monthIndex) => {
                const month = monthIndex + 1;
                const monthTiers = template.tiers.data[month] || [];
                return `
                    <div id="month-${month}" class="config-tab-content ${monthIndex === 0 ? 'active' : ''}">
                        <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 2px solid #f59e0b;">
                            <h5 style="font-size: 14px; font-weight: 600; color: #92400e; margin: 0 0 12px 0;">
                                ${monthName}
                            </h5>
                            ${monthTiers.map((tier, index) => {
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
                                        <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-mode="monthly" data-month="${month}" data-tier="${index}" required>
                                    </div>
                                </div>
                            `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div id="${containerId}">
                    <div class="config-tabs" style="margin-bottom: 16px;">
                        ${tabsHtml}
                    </div>
                    ${contentsHtml}
                </div>
            `;
        }
    } else {
        // 分时电价
        const priceUnit = typeof getTranslation === 'function' ? getTranslation('cabinetChartAxisElectricityPrice') : '电价 (元/kWh)';

        if (template.periods.mode === 'fixed') {
            // 固定模式：一套时段
            return template.periods.data.map(p => `
                <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                    <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">
                        ${getTemplateI18nText(p.name)} (${p.start} - ${p.end})
                    </div>
                    <div>
                        <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${priceUnit}</label>
                        <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-mode="fixed" data-period="${p.type}" required>
                    </div>
                </div>
            `).join('');
        } else if (template.periods.mode === 'seasonal') {
            // 分季节模式：每个季节有自己的时段 - Tab导航
            const containerId = `seasonal-tou-container-${Date.now()}`;
            const tabsHtml = template.periods.seasons.map((season, idx) => `
                <button class="config-tab ${idx === 0 ? 'active' : ''}" data-tab="tou-season-${season.id}" onclick="switchPriceTab('${containerId}', 'tou-season-${season.id}')">
                    ${getTemplateI18nText(season.name)}
                </button>
            `).join('');

            const contentsHtml = template.periods.seasons.map((season, idx) => {
                const seasonName = getTemplateI18nText(season.name);
                const monthUnit = typeof getTranslation === 'function' ? getTranslation('elecPriceUnitMonth') || '月' : '月';
                const monthsText = season.months.map(m => m + monthUnit).join('、');

                return `
                <div id="tou-season-${season.id}" class="config-tab-content ${idx === 0 ? 'active' : ''}">
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 2px solid #3b82f6;">
                        <h5 style="font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0;">
                            ${seasonName} (${monthsText})
                        </h5>
                        ${season.periods.map(p => `
                            <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                                <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">
                                    ${getTemplateI18nText(p.name)} (${p.start} - ${p.end})
                                </div>
                                <div>
                                    <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${priceUnit}</label>
                                    <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-mode="seasonal" data-season="${season.id}" data-period="${p.type}" required>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            }).join('');

            return `
                <div id="${containerId}">
                    <div class="config-tabs" style="margin-bottom: 16px;">
                        ${tabsHtml}
                    </div>
                    ${contentsHtml}
                </div>
            `;
        } else if (template.periods.mode === 'monthly') {
            // 逐月模式：每个月有自己的时段 - Tab导航
            const months = typeof getTranslation === 'function' ? [
                getTranslation('elecPriceMonthJan'), getTranslation('elecPriceMonthFeb'), getTranslation('elecPriceMonthMar'),
                getTranslation('elecPriceMonthApr'), getTranslation('elecPriceMonthMay'), getTranslation('elecPriceMonthJun'),
                getTranslation('elecPriceMonthJul'), getTranslation('elecPriceMonthAug'), getTranslation('elecPriceMonthSep'),
                getTranslation('elecPriceMonthOct'), getTranslation('elecPriceMonthNov'), getTranslation('elecPriceMonthDec')
            ] : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            const containerId = `monthly-tou-container-${Date.now()}`;

            const tabsHtml = months.map((monthName, idx) => `
                <button class="config-tab ${idx === 0 ? 'active' : ''}" data-tab="tou-month-${idx + 1}" onclick="switchPriceTab('${containerId}', 'tou-month-${idx + 1}')">
                    ${monthName}
                </button>
            `).join('');

            const contentsHtml = months.map((monthName, monthIndex) => {
                const month = monthIndex + 1;
                const monthPeriods = template.periods.data[month] || [];
                return `
                    <div id="tou-month-${month}" class="config-tab-content ${monthIndex === 0 ? 'active' : ''}">
                        <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 2px solid #f59e0b;">
                            <h5 style="font-size: 14px; font-weight: 600; color: #92400e; margin: 0 0 12px 0;">
                                ${monthName}
                            </h5>
                            ${monthPeriods.map(p => `
                                <div class="price-item" style="background: white; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
                                    <div style="font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px;">
                                        ${getTemplateI18nText(p.name)} (${p.start} - ${p.end})
                                    </div>
                                    <div>
                                        <label style="font-size: 12px; color: #6b7280; display: block; margin-bottom: 4px;">${priceUnit}</label>
                                        <input type="number" class="form-input price-input" step="0.01" min="0" placeholder="0.00" data-mode="monthly" data-month="${month}" data-period="${p.type}" required>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div id="${containerId}">
                    <div class="config-tabs" style="margin-bottom: 16px;">
                        ${tabsHtml}
                    </div>
                    ${contentsHtml}
                </div>
            `;
        }
    }
    return '';
}
