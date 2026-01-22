# BMS数据页面国际化修复说明

## 修复概述

修复了BMS数据页面在英文环境下仍显示中文的问题,包括:
1. 实时数据页面的section标题
2. 字段设置对话框中的category和field标题

## 修复内容

### 1. 翻译表补充 (touchscreen-i18n.js)

在英文翻译表中添加了缺失的"图表"翻译:
```javascript
'图表': 'Charts',
```

### 2. 字段设置对话框翻译修复 (data.html)

修改了 `generateFieldSettingsContent` 函数,确保category和field标签都使用翻译函数:

**修改位置:** data.html 第2338行和第2351行

**修改前:**
```javascript
html += `<div class="field-category-title">${category}</div>`;
// ...
${fieldConfig.label}
```

**修改后:**
```javascript
html += `<div class="field-category-title">${translateLabel(category)}</div>`;
// ...
${translateLabel(fieldConfig.label)}
```

## 已有正确实现

以下部分已经正确使用了翻译函数,无需修改:

1. **实时数据section标题** (data.html 第2685行):
   ```javascript
   let headerContent = `<h3 class="section-title" style="margin: 0;">${translateLabel(section)}</h3>`;
   ```

2. **数据卡片标题** (createDataCard函数):
   已使用 `translateLabel(config.label)` 进行翻译

## 测试路径

请按照以下路径进行测试:

### 路径1: BMS实时数据
1. 打开触摸屏系统
2. 点击"数据" → "BMS"
3. 切换到实时数据标签
4. 点击语言切换按钮,切换到英文
5. **验证点:**
   - "核心指标" 应显示为 "Core Indicators"
   - "电池总电压" 应显示为 "Total Battery Voltage"
   - "电池总电流" 应显示为 "Total Battery Current"
   - "电池功率" 应显示为 "Battery Power"
   - "电流稳定" 应显示为 "Current Stable"
   - "功率稳定" 应显示为 "Power Stable"
   - "运行统计" 应显示为 "Operation Statistics"
   - "Pack电池簇信息" 应显示为 "Pack Battery Cluster Info"

### 路径2: 字段设置对话框 - 实时数据
1. 在BMS页面,点击右上角的"Custom"按钮
2. 在弹出的对话框中,点击"Real-time Data"标签
3. **验证点:**
   - "核心指标" 应显示为 "Core Indicators"
   - "电池总电压" 应显示为 "Total Battery Voltage"
   - "电池总电流" 应显示为 "Total Battery Current"
   - "电池功率" 应显示为 "Battery Power"
   - "运行统计" 应显示为 "Operation Statistics"
   - "日充电量" 应显示为 "Daily Charge"
   - "日放电量" 应显示为 "Daily Discharge"
   - "累计充电量" 应显示为 "Total Charge"
   - "累计放电量" 应显示为 "Total Discharge"
   - "Pack电池簇信息" 应显示为 "Pack Battery Cluster Info"

### 路径3: 字段设置对话框 - 历史数据
1. 在BMS页面,点击右上角的"Custom"按钮
2. 在弹出的对话框中,点击"Historical Data"标签
3. **验证点:**
   - "图表" 应显示为 "Charts"
   - "电池性能趋势" 应显示为 "Battery Performance Trend"
   - "循环寿命统计" 应显示为 "Cycle Lifespan Statistics"
   - "容量衰减分析" 应显示为 "Capacity Degradation Analysis"
   - "电池电压历史" 应显示为 "Battery Voltage History"
   - "电池SOC趋势" 应显示为 "Battery SOC Trend"
   - "温度分布分析" 应显示为 "Temperature Distribution Analysis"

### 路径4: 中英文切换
1. 在英文环境下,验证上述所有文本均为英文
2. 点击语言切换按钮,切换回中文
3. **验证点:**
   - 所有上述文本应正确切换回中文
   - 不应出现任何英文残留

## 技术说明

### translateLabel函数

系统使用 `translateLabel` 函数进行文本翻译,该函数定义在 data.html 中:

```javascript
function translateLabel(text) {
    const lang = getTouchscreenLang();
    return touchscreenTranslations[lang][text] || text;
}
```

该函数会:
1. 获取当前语言设置
2. 在翻译表中查找对应翻译
3. 如果找不到翻译,返回原文本

### 翻译覆盖范围

本次修复确保了以下BMS相关文本的完整翻译:

**Section标题:**
- 核心指标 / Core Indicators
- 运行统计 / Operation Statistics
- Pack电池簇信息 / Pack Battery Cluster Info
- 图表 / Charts

**字段名称:**
- 电池总电压 / Total Battery Voltage
- 电池总电流 / Total Battery Current
- 电池功率 / Battery Power
- 电流稳定 / Current Stable
- 功率稳定 / Power Stable
- 日充电量 / Daily Charge
- 日放电量 / Daily Discharge
- 累计充电量 / Total Charge
- 累计放电量 / Total Discharge

**历史数据图表:**
- 电池性能趋势 / Battery Performance Trend
- 循环寿命统计 / Cycle Lifespan Statistics
- 容量衰减分析 / Capacity Degradation Analysis
- 电池电压历史 / Battery Voltage History
- 电池SOC趋势 / Battery SOC Trend
- 温度分布分析 / Temperature Distribution Analysis

## 修复文件清单

1. **touchscreen/touchscreen-i18n.js** - 添加"图表"翻译
2. **touchscreen/data.html** - 修复字段设置对话框的翻译

## 注意事项

1. **浏览器缓存:** 测试前请清除浏览器缓存或使用强制刷新(Ctrl+F5)
2. **语言切换:** 语言设置保存在localStorage中,刷新页面后会保持
3. **翻译一致性:** 所有翻译均与现有系统保持一致
4. **无副作用:** 本次修复仅涉及文本显示,不影响任何功能逻辑

## 预期效果

修复后,BMS数据页面应该:
- ✅ 在英文环境下完全显示英文
- ✅ 在中文环境下完全显示中文
- ✅ 语言切换平滑无残留
- ✅ 字段设置对话框完全国际化
- ✅ 不影响其他页面和功能

## 问题排查

如果发现仍有中文显示,请检查:

1. **翻译表检查:** 确认 touchscreen-i18n.js 中包含该文本的翻译
2. **函数调用:** 确认相关代码使用了 `translateLabel()` 函数
3. **缓存清理:** 清除浏览器缓存后重试
4. **控制台日志:** 检查浏览器控制台是否有错误信息
