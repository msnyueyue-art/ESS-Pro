# 电价设置预设模板国际化修复

## 修复时间
2025-01-10

## 修复概述

为"选择预设模板"弹窗中的5个预设电价模板添加了完整的英文翻译支持，包括模板名称、描述和标签。

## 修复内容

### 1. 扩展模板翻译映射表 ✅

**位置:** [electricity-price-new.html:1820-1864](electricity-price-new.html#L1820-L1864)

**新增5个预设模板的翻译:**

```javascript
// 预设模板
'江苏峰谷平尖电价': {
    en: 'Jiangsu Peak-Valley-Flat-Sharp Pricing',
    zh: '江苏峰谷平尖电价'
},
'适用于江苏地区工商业用电，包含尖峰平谷四个时段': {
    en: 'For commercial and industrial use in Jiangsu, includes four periods: sharp peak, peak, flat, and valley',
    zh: '适用于江苏地区工商业用电，包含尖峰平谷四个时段'
},
'广东分时电价': {
    en: 'Guangdong Time-of-Use Pricing',
    zh: '广东分时电价'
},
'适用于广东地区商业用电，分峰谷两个时段': {
    en: 'For commercial use in Guangdong, divided into peak and valley periods',
    zh: '适用于广东地区商业用电，分峰谷两个时段'
},
'浙江峰谷电价': {
    en: 'Zhejiang Peak-Valley Pricing',
    zh: '浙江峰谷电价'
},
'适用于浙江地区工商业用电': {
    en: 'For commercial and industrial use in Zhejiang',
    zh: '适用于浙江地区工商业用电'
},
'北京峰谷电价': {
    en: 'Beijing Peak-Valley Pricing',
    zh: '北京峰谷电价'
},
'适用于北京地区工商业用电': {
    en: 'For commercial and industrial use in Beijing',
    zh: '适用于北京地区工商业用电'
},
'固定电价模版': {
    en: 'Fixed Price Template',
    zh: '固定电价模版'
},
'适用于居民用电或不分时段的场景': {
    en: 'For residential use or scenarios without time periods',
    zh: '适用于居民用电或不分时段的场景'
},
'无时段划分': {
    en: 'No time periods',
    zh: '无时段划分'
}
```

### 2. 修改预设模板渲染函数 ✅

**位置:** [electricity-price-new.html:2724-2754](electricity-price-new.html#L2724-L2754)

**修改前:**
```javascript
function renderPresetTemplates() {
    const container = document.getElementById('presetTemplatesContainer');

    container.innerHTML = presetTemplates.map(preset => {
        const periodTags = preset.periods.length > 0
            ? `<div class="preset-periods">...</div>`
            : '<div class="preset-periods"><span class="badge badge-gray preset-period-tag">无时段划分</span></div>';

        return `
            <div class="preset-template-card">
                <div class="preset-header">
                    <div class="preset-name">${preset.name}</div>
                    <span class="badge badge-primary">${getTypeNameTranslation(preset.type)}</span>
                </div>
                <div class="preset-desc">${preset.description}</div>
                ${periodTags}
            </div>
        `;
    }).join('');
}
```

**修改后:**
```javascript
function renderPresetTemplates() {
    const container = document.getElementById('presetTemplatesContainer');

    container.innerHTML = presetTemplates.map(preset => {
        const periodTags = preset.periods.length > 0
            ? `<div class="preset-periods">...</div>`
            : `<div class="preset-periods"><span class="badge badge-gray preset-period-tag">${getTemplateI18nText('无时段划分')}</span></div>`;

        const translatedName = getTemplateI18nText(preset.name);
        const translatedDesc = getTemplateI18nText(preset.description);

        return `
            <div class="preset-template-card">
                <div class="preset-header">
                    <div class="preset-name">${translatedName}</div>
                    <span class="badge badge-primary">${getTypeNameTranslation(preset.type)}</span>
                </div>
                <div class="preset-desc">${translatedDesc}</div>
                ${periodTags}
            </div>
        `;
    }).join('');
}
```

## 翻译对照表

### 预设模板名称

| 中文 | English |
|------|---------|
| 江苏峰谷平尖电价 | Jiangsu Peak-Valley-Flat-Sharp Pricing |
| 广东分时电价 | Guangdong Time-of-Use Pricing |
| 浙江峰谷电价 | Zhejiang Peak-Valley Pricing |
| 北京峰谷电价 | Beijing Peak-Valley Pricing |
| 固定电价模版 | Fixed Price Template |

### 预设模板描述

| 中文 | English |
|------|---------|
| 适用于江苏地区工商业用电，包含尖峰平谷四个时段 | For commercial and industrial use in Jiangsu, includes four periods: sharp peak, peak, flat, and valley |
| 适用于广东地区商业用电，分峰谷两个时段 | For commercial use in Guangdong, divided into peak and valley periods |
| 适用于浙江地区工商业用电 | For commercial and industrial use in Zhejiang |
| 适用于北京地区工商业用电 | For commercial and industrial use in Beijing |
| 适用于居民用电或不分时段的场景 | For residential use or scenarios without time periods |

### 其他标签

| 中文 | English |
|------|---------|
| 无时段划分 | No time periods |

## 修改统计

### electricity-price-new.html
- 扩展翻译映射: 新增11条翻译（5个模板名称 + 5个描述 + 1个标签）
- 修改预设模板渲染函数: 1处

## 完整的国际化效果

### 中文环境下的预设模板弹窗

```
选择预设模板（购电）
Select a preset price template as starting point

┌─────────────────────────────────────┐
│ 江苏峰谷平尖电价    [Peak-Valley-Flat-Sharp] │
│ 适用于江苏地区工商业用电，包含尖峰平谷四个时段 │
│ [尖峰] [峰时段] [平时段] [谷时段]         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 广东分时电价        [Time-of-Use]     │
│ 适用于广东地区商业用电，分峰谷两个时段     │
│ [高峰] [低谷]                         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 固定电价模版        [Fixed Price]     │
│ 适用于居民用电或不分时段的场景           │
│ [无时段划分]                          │
└─────────────────────────────────────┘
```

### 英文环境下的预设模板弹窗

```
选择预设模板（购电）
Select a preset price template as starting point

┌──────────────────────────────────────────────┐
│ Jiangsu Peak-Valley-Flat-Sharp Pricing       │
│               [Peak-Valley-Flat-Sharp]       │
│ For commercial and industrial use in         │
│ Jiangsu, includes four periods: sharp        │
│ peak, peak, flat, and valley                 │
│ [尖峰] [峰时段] [平时段] [谷时段]             │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Guangdong Time-of-Use Pricing                │
│               [Time-of-Use]                  │
│ For commercial use in Guangdong, divided     │
│ into peak and valley periods                 │
│ [高峰] [低谷]                                 │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Fixed Price Template    [Fixed Price]        │
│ For residential use or scenarios without     │
│ time periods                                 │
│ [No time periods]                            │
└──────────────────────────────────────────────┘
```

## 测试建议

### 1. 中文环境测试
- ✅ 点击"新建规则" → "从模板创建"
- ✅ 查看预设模板弹窗
- ✅ 检查5个模板名称显示中文
- ✅ 检查描述文本显示中文
- ✅ 检查"无时段划分"标签显示中文

### 2. 英文环境测试
切换到英文后：
- ✅ 点击"New Rule" → "Create from Template"
- ✅ 查看预设模板弹窗
- ✅ 检查5个模板名称显示英文
  - Jiangsu Peak-Valley-Flat-Sharp Pricing
  - Guangdong Time-of-Use Pricing
  - Zhejiang Peak-Valley Pricing
  - Beijing Peak-Valley Pricing
  - Fixed Price Template
- ✅ 检查描述文本显示英文
- ✅ 检查"No time periods"标签显示英文

### 3. 动态切换测试
- ✅ 在中文环境下打开预设模板弹窗
- ✅ 切换到英文，关闭弹窗后重新打开
- ✅ 验证所有文本更新为英文
- ✅ 再切换回中文，验证恢复正常

### 4. 功能测试
确保翻译不影响功能：
- ✅ 选择预设模板
- ✅ 使用模板创建新规则
- ✅ 验证创建的规则数据正确

## 注意事项

### 时段标签保持原样

预设模板中的时段标签（如"尖峰"、"高峰"、"低谷"等）**保持中文显示**，因为：
1. 这些是具体的配置数据，不是界面文本
2. 在实际应用中，这些标签会被用户自定义
3. 保持数据的原始性和一致性

如果将来需要翻译时段标签，可以在 `templateI18n` 中添加对应的翻译。

## 浏览器缓存清除

修改完成后，请使用以下方式清除浏览器缓存：

**Windows/Linux:**
- `Ctrl + F5` 或 `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

## 完成状态

✅ **全部完成** - 预设模板弹窗已完全支持国际化

所有预设模板的名称和描述都已完整翻译，包括：
- ✅ 5个预设模板名称
- ✅ 5个预设模板描述
- ✅ "无时段划分"标签

## 总体国际化进度

电价设置页面现已完整支持国际化，包括：
- ✅ 页面标题和标签
- ✅ 表格表头
- ✅ 操作按钮（View, Edit, Delete）
- ✅ 电价类型标签（Tiered Pricing, Time-of-Use, Fixed Price）
- ✅ 模板数据（名称和描述）
- ✅ 预设模板（名称和描述）
- ✅ 站点数量单位（sites）
- ✅ 所有弹窗和表单元素
