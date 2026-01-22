# 电价设置 - 站点名称和模板选项国际化修复

## 修复日期
2026-01-10

## 📋 问题描述

用户反馈在英文环境下,以下内容仍显示中文:

1. **电站配置列表** - 站点名称列显示中文(科技园区站、工业园区站等)
2. **配置电站弹框标题** - 显示中文站点名称
3. **购电模板下拉选项** - 显示中文模板名称(阶梯电价-固定、分时电价-固定等)
4. **上网模板下拉选项** - 显示中文模板名称(阶梯上网-固定、分时上网-固定等)

## ✅ 修复内容

### 1. 为站点数据添加英文名称 ✅

**修复位置:** [electricity-price-new.html:2527-2561](electricity-price-new.html#L2527-L2561)

**修复前:**
```javascript
let sites = [
    { id: 'site1', name: '科技园区站', location: '江苏南京', capacity: '2.5MWh', deviceCount: 8 },
    { id: 'site2', name: '工业园区站', location: '广东深圳', capacity: '3.75MWh', deviceCount: 12 },
    { id: 'site3', name: '商业中心站', location: '浙江杭州', capacity: '3.1MWh', deviceCount: 10 },
    { id: 'site4', name: '物流园区站', location: '上海浦东', capacity: '4.7MWh', deviceCount: 15 }
];
```

**修复后:**
```javascript
let sites = [
    {
        id: 'site1',
        name: '科技园区站',
        nameEn: 'Technology Park Station',
        location: '江苏南京',
        capacity: '2.5MWh',
        deviceCount: 8
    },
    {
        id: 'site2',
        name: '工业园区站',
        nameEn: 'Industrial Park Station',
        location: '广东深圳',
        capacity: '3.75MWh',
        deviceCount: 12
    },
    {
        id: 'site3',
        name: '商业中心站',
        nameEn: 'Business Center Station',
        location: '浙江杭州',
        capacity: '3.1MWh',
        deviceCount: 10
    },
    {
        id: 'site4',
        name: '物流园区站',
        nameEn: 'Logistics Park Station',
        location: '上海浦东',
        capacity: '4.7MWh',
        deviceCount: 15
    }
];
```

### 2. 修复电站列表表格中的站点名称显示 ✅

**修复位置:** [electricity-price-new.html:5894-5905](electricity-price-new.html#L5894-L5905)

**修复方法:**
在 `renderSites()` 函数中添加逻辑,根据当前语言显示对应的站点名称。

**关键代码:**
```javascript
const tableRows = sites.map(site => {
    // ... 其他代码 ...

    // 获取站点名称(根据当前语言)
    const siteName = (typeof currentLang !== 'undefined' && currentLang === 'en' && site.nameEn)
        ? site.nameEn
        : site.name;

    return `
        <tr>
            <td>
                <div style="display: flex; align-items: center;">
                    <i class="fas fa-building" style="color: #3b82f6; margin-right: 8px;"></i>
                    ${siteName}
                </div>
            </td>
            // ... 其他列 ...
        </tr>
    `;
});
```

### 3. 修复配置弹框标题中的站点名称 ✅

**修复位置:** [electricity-price-new.html:5993-5997](electricity-price-new.html#L5993-L5997)

**修复方法:**
在 `configureSite()` 函数中添加逻辑,根据当前语言显示对应的站点名称。

**修复前:**
```javascript
const siteConfigTitleText = typeof getTranslation === 'function' ?
    getTranslation('elecPriceModalTitleSiteConfig') : '配置电站电价';
document.getElementById('siteConfigTitle').textContent = `${siteConfigTitleText} - ${site.name}`;
```

**修复后:**
```javascript
const siteConfigTitleText = typeof getTranslation === 'function' ?
    getTranslation('elecPriceModalTitleSiteConfig') : '配置电站电价';
// 获取站点名称(根据当前语言)
const siteName = (typeof currentLang !== 'undefined' && currentLang === 'en' && site.nameEn)
    ? site.nameEn
    : site.name;
document.getElementById('siteConfigTitle').textContent = `${siteConfigTitleText} - ${siteName}`;
```

### 4. 修复购电模板下拉选项 ✅

**修复位置:** [electricity-price-new.html:5999-6005](electricity-price-new.html#L5999-L6005)

**修复方法:**
使用已有的 `getTemplateI18nText()` 函数翻译模板名称和类型名称。

**修复前:**
```javascript
consumptionSelect.innerHTML = `<option value="">${consumptionPlaceholder}</option>` +
    templates.filter(t => t.purpose === 'consumption')
        .map(t => `<option value="${t.id}">${t.name} (${t.typeName})</option>`).join('');
```

**修复后:**
```javascript
consumptionSelect.innerHTML = `<option value="">${consumptionPlaceholder}</option>` +
    templates.filter(t => t.purpose === 'consumption')
        .map(t => {
            const translatedName = getTemplateI18nText(t.name);
            const translatedTypeName = getTemplateI18nText(t.typeName);
            return `<option value="${t.id}">${translatedName} (${translatedTypeName})</option>`;
        }).join('');
```

### 5. 修复上网模板下拉选项 ✅

**修复位置:** [electricity-price-new.html:6011-6017](electricity-price-new.html#L6011-L6017)

**修复方法:**
与购电模板相同,使用 `getTemplateI18nText()` 函数翻译。

**修复前:**
```javascript
feedinSelect.innerHTML = `<option value="">${feedinPlaceholder}</option>` +
    templates.filter(t => t.purpose === 'feed-in')
        .map(t => `<option value="${t.id}">${t.name} (${t.typeName})</option>`).join('');
```

**修复后:**
```javascript
feedinSelect.innerHTML = `<option value="">${feedinPlaceholder}</option>` +
    templates.filter(t => t.purpose === 'feed-in')
        .map(t => {
            const translatedName = getTemplateI18nText(t.name);
            const translatedTypeName = getTemplateI18nText(t.typeName);
            return `<option value="${t.id}">${translatedName} (${translatedTypeName})</option>`;
        }).join('');
```

## 📊 修复统计

| 修复项 | 位置 | 状态 |
|--------|------|------|
| 站点数据结构 | 添加 `nameEn` 字段 | ✅ |
| 电站列表站点名称 | `renderSites()` | ✅ |
| 弹框标题站点名称 | `configureSite()` | ✅ |
| 购电模板下拉选项 | `configureSite()` | ✅ |
| 上网模板下拉选项 | `configureSite()` | ✅ |
| **总计** | **5个修复点** | **100%** |

## 🔧 技术要点

### 1. 站点名称翻译逻辑

使用条件判断,在英文环境下显示英文名称:

```javascript
const siteName = (typeof currentLang !== 'undefined' && currentLang === 'en' && site.nameEn)
    ? site.nameEn
    : site.name;
```

**逻辑说明:**
- 检查 `currentLang` 是否定义
- 检查当前语言是否为英文
- 检查站点是否有英文名称
- 满足所有条件则使用 `nameEn`,否则使用 `name`

### 2. 模板名称翻译

利用已有的 `getTemplateI18nText()` 函数和 `templateI18n` 映射对象:

```javascript
function getTemplateI18nText(text) {
    if (!text) return text;

    // 如果没有翻译映射或当前语言是中文,返回原文
    if (!templateI18n[text] || !currentLang || currentLang === 'zh') {
        return text;
    }

    // 返回对应语言的翻译,如果没有则返回原文
    return templateI18n[text][currentLang] || text;
}
```

**`templateI18n` 映射示例:**
```javascript
const templateI18n = {
    '阶梯电价-固定': {
        en: 'Tiered Pricing - Fixed',
        zh: '阶梯电价-固定'
    },
    '分时电价-固定': {
        en: 'Time-of-Use - Fixed',
        zh: '分时电价-固定'
    },
    // ... 更多映射
};
```

## 📝 站点名称翻译对照表

| 中文名称 | 英文名称 |
|---------|---------|
| 科技园区站 | Technology Park Station |
| 工业园区站 | Industrial Park Station |
| 商业中心站 | Business Center Station |
| 物流园区站 | Logistics Park Station |

## 🎯 测试验证

### 中文环境测试
- ✅ 电站列表显示中文站点名称
- ✅ 配置弹框标题显示中文站点名称
- ✅ 购电模板下拉显示中文
- ✅ 上网模板下拉显示中文

### 英文环境测试
- ✅ 电站列表显示英文站点名称
- ✅ 配置弹框标题显示英文站点名称
- ✅ 购电模板下拉显示英文(如 "Tiered Pricing - Fixed")
- ✅ 上网模板下拉显示英文(如 "Time-of-Use Feed-in - Fixed")

## 🔍 相关文档

- [ELECTRICITY_PRICE_SITE_CONFIG_I18N_FIX.md](ELECTRICITY_PRICE_SITE_CONFIG_I18N_FIX.md) - 电站配置表格国际化修复
- [ELECTRICITY_PRICE_I18N_SUPPLEMENT.md](ELECTRICITY_PRICE_I18N_SUPPLEMENT.md) - 弹框和确认对话框国际化修复
- [ELECTRICITY_PRICE_I18N_COMPLETE.md](ELECTRICITY_PRICE_I18N_COMPLETE.md) - 完整的国际化修复报告

## ✅ 总结

此次修复解决了用户反馈的最后两个国际化问题:

1. **站点名称** - 通过为每个站点添加 `nameEn` 字段,并在渲染时根据语言选择显示
2. **模板名称** - 利用已有的 `templateI18n` 映射和 `getTemplateI18nText()` 函数

现在电价设置页面的国际化工作**真正彻底完成**！

### 完成度对比

| 区域 | 之前状态 | 现在状态 |
|------|---------|---------|
| 电站列表站点名称 | ❌ 中文 | ✅ 支持中英文 |
| 弹框标题站点名称 | ❌ 中文 | ✅ 支持中英文 |
| 购电模板选项 | ❌ 中文 | ✅ 支持中英文 |
| 上网模板选项 | ❌ 中文 | ✅ 支持中英文 |

---

**最后更新:** 2026-01-10
**修复文件:** electricity-price-new.html
**完成度:** 100% 🎉
