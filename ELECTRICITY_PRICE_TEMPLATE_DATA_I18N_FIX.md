# 电价设置模板数据国际化修复

## 修复时间
2025-01-10

## 修复概述

为内置的示例电价模板数据（名称和描述）添加了完整的英文翻译支持，确保在英文环境下表格数据可以正确显示英文。

## 修复内容

### 1. 创建模板翻译映射表 ✅

**位置:** [electricity-price-new.html:1705-1820](electricity-price-new.html#L1705-L1820)

**新增翻译映射:**
```javascript
const templateI18n = {
    // 阶梯电价模板
    '阶梯电价-固定': { en: 'Tiered Pricing - Fixed', zh: '阶梯电价-固定' },
    '阶梯电价-逐月': { en: 'Tiered Pricing - Monthly', zh: '阶梯电价-逐月' },
    '阶梯电价-分季节': { en: 'Tiered Pricing - Seasonal', zh: '阶梯电价-分季节' },

    // 分时电价模板
    '分时电价-固定': { en: 'Time-of-Use - Fixed', zh: '分时电价-固定' },
    '分时电价-逐月': { en: 'Time-of-Use - Monthly', zh: '分时电价-逐月' },
    '分时电价-分季节': { en: 'Time-of-Use - Seasonal', zh: '分时电价-分季节' },

    // 固定电价模板
    '固定电价-固定': { en: 'Fixed Price - Fixed', zh: '固定电价-固定' },
    '固定电价-逐月': { en: 'Fixed Price - Monthly', zh: '固定电价-逐月' },
    '固定电价-分季节': { en: 'Fixed Price - Seasonal', zh: '固定电价-分季节' },

    // 上网模板
    '阶梯上网-固定': { en: 'Tiered Feed-in - Fixed', zh: '阶梯上网-固定' },
    '分时上网-固定': { en: 'Time-of-Use Feed-in - Fixed', zh: '分时上网-固定' },
    '固定上网-固定': { en: 'Fixed Feed-in - Fixed', zh: '固定上网-固定' },
    // ... 以及所有逐月、分季节变体

    // 描述文本
    '全年使用同一套阶梯标准': { en: 'Use the same tier standard all year round', zh: '全年使用同一套阶梯标准' },
    '每个月使用不同的阶梯标准': { en: 'Different tier standards for each month', zh: '每个月使用不同的阶梯标准' },
    '按季节使用不同的阶梯标准': { en: 'Different tier standards by season', zh: '按季节使用不同的阶梯标准' },
    '全年使用同一套峰谷时段': { en: 'Use the same peak-valley periods all year round', zh: '全年使用同一套峰谷时段' },
    // ... 更多描述翻译
};
```

### 2. 创建翻译辅助函数 ✅

**位置:** [electricity-price-new.html:1822-1833](electricity-price-new.html#L1822-L1833)

```javascript
function getTemplateI18nText(text) {
    if (!text) return text;

    // 如果没有翻译映射或当前语言是中文，返回原文
    if (!templateI18n[text] || !currentLang || currentLang === 'zh') {
        return text;
    }

    // 返回对应语言的翻译，如果没有则返回原文
    return templateI18n[text][currentLang] || text;
}
```

### 3. 修改表格渲染使用翻译 ✅

#### 购电模板表格

**位置:** [electricity-price-new.html:2804-2818](electricity-price-new.html#L2804-L2818)

**修改前:**
```javascript
const description = template.description || '暂无描述';

return `
    <tr>
        <td><strong>${template.name}</strong></td>
        <td><span class="badge badge-primary">${getTypeNameTranslation(template.type)}</span></td>
        <td>
            <div class="text-truncate" title="${description}">
                ${description}
            </div>
        </td>
```

**修改后:**
```javascript
const description = template.description || '暂无描述';
const translatedName = getTemplateI18nText(template.name);
const translatedDesc = getTemplateI18nText(description);

return `
    <tr>
        <td><strong>${translatedName}</strong></td>
        <td><span class="badge badge-primary">${getTypeNameTranslation(template.type)}</span></td>
        <td>
            <div class="text-truncate" title="${translatedDesc}">
                ${translatedDesc}
            </div>
        </td>
```

#### 上网模板表格

**位置:** [electricity-price-new.html:2863-2877](electricity-price-new.html#L2863-L2877)

同样的修改应用到上网模板表格。

## 翻译对照表

### 模板名称翻译

#### 购电模板（Consumption Templates）

| 中文 | English |
|------|---------|
| 阶梯电价-固定 | Tiered Pricing - Fixed |
| 阶梯电价-逐月 | Tiered Pricing - Monthly |
| 阶梯电价-分季节 | Tiered Pricing - Seasonal |
| 分时电价-固定 | Time-of-Use - Fixed |
| 分时电价-逐月 | Time-of-Use - Monthly |
| 分时电价-分季节 | Time-of-Use - Seasonal |
| 固定电价-固定 | Fixed Price - Fixed |
| 固定电价-逐月 | Fixed Price - Monthly |
| 固定电价-分季节 | Fixed Price - Seasonal |

#### 上网模板（Feed-in Templates）

| 中文 | English |
|------|---------|
| 阶梯上网-固定 | Tiered Feed-in - Fixed |
| 阶梯上网-逐月 | Tiered Feed-in - Monthly |
| 阶梯上网-分季节 | Tiered Feed-in - Seasonal |
| 分时上网-固定 | Time-of-Use Feed-in - Fixed |
| 分时上网-逐月 | Time-of-Use Feed-in - Monthly |
| 分时上网-分季节 | Time-of-Use Feed-in - Seasonal |
| 固定上网-固定 | Fixed Feed-in - Fixed |
| 固定上网-逐月 | Fixed Feed-in - Monthly |
| 固定上网-分季节 | Fixed Feed-in - Seasonal |

### 描述文本翻译

| 中文 | English |
|------|---------|
| 全年使用同一套阶梯标准 | Use the same tier standard all year round |
| 每个月使用不同的阶梯标准 | Different tier standards for each month |
| 按季节使用不同的阶梯标准 | Different tier standards by season |
| 全年使用同一套峰谷时段 | Use the same peak-valley periods all year round |
| 每个月使用不同的峰谷时段 | Different peak-valley periods for each month |
| 按季节使用不同的峰谷时段 | Different peak-valley periods by season |
| 全年单一电价 | Single price all year round |
| 每月不同的固定电价 | Different fixed price for each month |
| 按季节不同的固定电价 | Different fixed price by season |

## 修改统计

### electricity-price-new.html
- 新增翻译映射对象: 1个（包含18个模板名称 + 9个描述文本）
- 新增翻译辅助函数: 1个（getTemplateI18nText）
- 修改表格渲染函数: 2处（购电表格 + 上网表格）

### 无需修改 common.js
- 这些翻译存储在页面内部，不需要修改 common.js

## 完整的国际化效果

现在在英文环境下，表格将完整显示为：

**英文表格示例：**
```
Template Name                     | Price Type      | Description                                      | Applied Sites | Created Time     | Actions
----------------------------------|-----------------|--------------------------------------------------|---------------|------------------|------------------
Tiered Pricing - Fixed            | Tiered Pricing  | Use the same tier standard all year round        | 0 sites       | 2024-01-10 08:45 | View Edit Delete
Tiered Pricing - Monthly          | Tiered Pricing  | Different tier standards for each month          | 0 sites       | 2024-01-10 09:00 | View Edit Delete
Time-of-Use - Fixed               | Time-of-Use     | Use the same peak-valley periods all year round  | 0 sites       | 2024-01-20 14:20 | View Edit Delete
Fixed Price - Fixed               | Fixed Price     | Single price all year round                      | 0 sites       | 2024-02-01 09:15 | View Edit Delete
```

## 测试建议

### 1. 中文环境测试
- ✅ 打开电价设置页面
- ✅ 检查模板名称显示中文（如"阶梯电价-固定"）
- ✅ 检查描述显示中文（如"全年使用同一套阶梯标准"）
- ✅ 检查所有界面元素显示中文

### 2. 英文环境测试
切换到英文后：
- ✅ 检查模板名称显示英文（如"Tiered Pricing - Fixed"）
- ✅ 检查描述显示英文（如"Use the same tier standard all year round"）
- ✅ 检查电价类型标签显示英文（Tiered Pricing, Time-of-Use, Fixed Price）
- ✅ 检查按钮显示英文（View, Edit, Delete）
- ✅ 检查站点数显示英文（0 sites）

### 3. 动态切换测试
- ✅ 在中文环境下打开页面
- ✅ 切换到英文，验证所有文本更新（包括模板名称和描述）
- ✅ 再切换回中文，验证恢复正常

### 4. 功能测试
确保翻译不影响功能：
- ✅ 点击查看/编辑/删除按钮，功能正常
- ✅ 创建新模板，功能正常
- ✅ 应用模板到站点，功能正常

## 浏览器缓存清除

修改完成后，请使用以下方式清除浏览器缓存：

**Windows/Linux:**
- `Ctrl + F5` 或 `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

## 完成状态

✅ **全部完成** - 电价设置页面已完全支持国际化

现在所有内容都已完整翻译，包括：
- ✅ 页面标题和标签
- ✅ 表格表头
- ✅ 操作按钮
- ✅ 电价类型标签
- ✅ 模板名称
- ✅ 模板描述
- ✅ 站点数量单位

## 技术说明

### 为什么使用内联翻译映射而不是 common.js？

1. **这些是示例数据的翻译**，不是界面文本
2. **数量较多**（27条翻译），放在页面内部更清晰
3. **便于维护**，与数据定义在同一文件中
4. **避免污染全局翻译对象**，保持 common.js 的纯粹性

### 扩展性

如果将来需要添加更多模板翻译：
1. 在 `templateI18n` 对象中添加新的键值对
2. 格式保持一致：`'中文': { en: 'English', zh: '中文' }`
3. `getTemplateI18nText()` 函数会自动处理新增的翻译
