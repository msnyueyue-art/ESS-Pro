# PCS页面国际化补充修复说明

## 修复日期
2026-01-12（第二次修复）

## 问题描述

在第一次修复后，用户报告以下内容仍然显示中文：

### 实时数据：
- ❌ **三相标签**："A相"、"B相"、"C相"

### 历史数据：
- ❌ **图表图例**："DC电压"、"DC电流"（电压电流趋势图）
- ❌ **Y轴标签**："效率 (%)"（转换效率分析图）
- ❌ **时间选择器**："日"、"月"、"年"、"合计"（转换效率分析图）

## 修复内容

### 1. 国际化文件更新 ([touchscreen-i18n.js](touchscreen-i18n.js))

#### 新增翻译键（中文部分，第187-193行）：
```javascript
'A相': 'A相',
'B相': 'B相',
'C相': 'C相',
'日': '日',
'月': '月',
'年': '年',
'合计': '合计',
```

#### 新增翻译键（英文部分，第540-546行）：
```javascript
'A相': 'Phase A',
'B相': 'Phase B',
'C相': 'Phase C',
'日': 'Day',
'月': 'Month',
'年': 'Year',
'合计': 'Total',
```

### 2. 三相数据卡片修复 ([data.html](data.html))

**问题位置：** 第4025-4079行

**createThreePhaseCard函数** - 三相数据显示：

```javascript
// 修复前
<span class="phase-label">A相</span>
<span class="phase-label">B相</span>
<span class="phase-label">C相</span>

// 修复后
<span class="phase-label">${translateLabel('A相')}</span>
<span class="phase-label">${translateLabel('B相')}</span>
<span class="phase-label">${translateLabel('C相')}</span>
```

**关键变更：**
- 使用模板字符串和`translateLabel()`函数动态翻译相位标签
- 保持中英文切换时标签正确显示

### 3. 时间选择器修复 ([data.html](data.html))

**问题位置：** 第2936-2941行

**转换效率分析下拉框：**

```html
<!-- 修复前 -->
<select id="pcsEfficiencyTimePicker">
    <option value="day" selected>日</option>
    <option value="month">月</option>
    <option value="year">年</option>
    <option value="total">合计</option>
</select>

<!-- 修复后 -->
<select id="pcsEfficiencyTimePicker">
    <option value="day" selected data-i18n="日">Day</option>
    <option value="month" data-i18n="月">Month</option>
    <option value="year" data-i18n="年">Year</option>
    <option value="total" data-i18n="合计">Total</option>
</select>
```

**关键修改：**
1. 添加`data-i18n`属性关联翻译键
2. **将HTML默认内容从中文改为英文**（遵循HTML默认语言规则）
3. 通过国际化系统在中文环境下自动翻译

## 重要说明

### HTML默认语言规则
所有静态HTML内容必须默认为**英文**，这是系统设计原则：

```javascript
// 页面初始化逻辑
if (currentLang === 'zh') {
    applyTouchscreenTranslations();  // 只在中文时翻译
}
```

**原理：**
- 英文 = 默认/回退语言（无需翻译）
- 中文 = 翻译目标语言（需要翻译）

参考：[国际化HTML默认语言规则说明](I18N_HTML_DEFAULT_LANGUAGE_RULE.md)

### 动态内容翻译方法

#### 方法1：模板字符串中使用translateLabel()
适用于动态生成的HTML内容：
```javascript
const html = `<span>${translateLabel('A相')}</span>`;
```

#### 方法2：静态HTML使用data-i18n属性
适用于页面加载时已存在的HTML元素：
```html
<option data-i18n="日">Day</option>
```

## 测试验证

### 测试步骤：
1. **清除浏览器缓存**或硬刷新（Ctrl+Shift+R）
2. 切换到**英文环境**（点击语言切换按钮）
3. 导航到"Data"页面 → "PCS"设备
4. 检查以下内容：

#### 实时数据标签页：
- ✅ 三相标签：
  - "Phase A" / "Phase B" / "Phase C"（英文）
  - "A相" / "B相" / "C相"（中文）

#### 历史数据标签页：

**电压电流趋势图：**
- ✅ 图表标题："Voltage & Current Trend"（英文）/ "电压电流趋势"（中文）
- ✅ 图例标签：
  - "DC Voltage"（英文）/ "DC电压"（中文）
  - "DC Current"（英文）/ "DC电流"（中文）
- ✅ Y轴标签：
  - "Voltage (V)"（英文）/ "电压 (V)"（中文）
  - "Current (A)"（英文）/ "电流 (A)"（中文）

**转换效率分析图：**
- ✅ 图表标题："Conversion Efficiency Analysis"（英文）/ "转换效率分析"（中文）
- ✅ 图例标签："Conversion Efficiency"（英文）/ "转换效率"（中文）
- ✅ Y轴标签："Efficiency (%)"（英文）/ "效率 (%)"（中文）
- ✅ 时间选择器：
  - "Day" / "Month" / "Year" / "Total"（英文）
  - "日" / "月" / "年" / "合计"（中文）

### 预期结果：
- **英文环境**：所有文本显示为英文
- **中文环境**：所有文本显示为中文
- **语言切换**：实时更新，无需刷新页面

## 技术要点

### SOLID原则应用：

1. **单一职责原则 (SRP)**
   - `translateLabel()`: 专门负责翻译
   - `createThreePhaseCard()`: 专门负责三相数据卡片生成
   - 职责清晰，易于维护

2. **开闭原则 (OCP)**
   - 新增翻译项无需修改核心逻辑
   - 扩展性强

3. **依赖倒置原则 (DIP)**
   - 依赖翻译接口而非硬编码值
   - 统一的翻译机制

### DRY原则应用：
- 统一使用`translateLabel()`和`data-i18n`机制
- 避免重复的翻译逻辑
- 集中管理翻译字典

### KISS原则应用：
- 简单清晰的实现
- 两种翻译方式分工明确：
  - 动态内容 → `translateLabel()`
  - 静态内容 → `data-i18n`属性

## 数据流程

### 三相标签翻译流程：
```
配置 → createThreePhaseCard() → 模板字符串中调用translateLabel() → 显示翻译文本
'A相'                                                                'Phase A' / 'A相'
```

### 时间选择器翻译流程：
```
HTML元素(data-i18n) → DOMContentLoaded → applyTouchscreenTranslations() → 翻译文本
'日'                                                                      'Day' / '日'
```

### 图表标签翻译流程（已在第一次修复中完成）：
```
图表初始化 → translateLabel() → Chart.js渲染 → 显示翻译文本
'DC电压'                                        'DC Voltage' / 'DC电压'
```

## 影响范围

### 修改文件：
1. `touchscreen/touchscreen-i18n.js` - 新增7个翻译键
2. `touchscreen/data.html` - 三相标签和时间选择器修复

### 影响功能：
- ✅ 数据页 - PCS设备 - 实时数据三相标签
- ✅ 数据页 - PCS设备 - 历史数据时间选择器
- ✅ 所有使用三相数据卡片的设备（Overall、Meter等）

### 无影响区域：
- 其他页面（Home、History、Control等）
- 其他设备的其他功能

## 注意事项

1. **缓存清理**：测试时必须清除浏览器缓存或硬刷新
2. **语言切换**：确保localStorage中的`touchscreen_language`值正确
3. **一致性**：所有相同的文本使用相同的i18n key
4. **兼容性**：确保中英文切换时功能正常

## 已知问题

### Meter（电表）系统的图表标签
在代码中发现Meter系统的"电压质量监测"图表仍有"A相电压"、"B相电压"、"C相电压"等硬编码中文标签（第6284、6291、6298行）。

**建议修复：**
如果用户也使用Meter页面，建议使用相同的方法修复：
```javascript
label: translateLabel('A相电压'),  // 或添加专门的翻译键
```

## 扩展性建议

1. **统一相位标签**：为所有三相数据建立统一的翻译键
2. **时间选择器组件化**：将时间选择器封装为可复用组件
3. **自动化测试**：编写E2E测试验证国际化功能
4. **翻译覆盖率检查**：定期检查是否有遗漏的中文文本

## 相关文档
- [PCS页面国际化修复说明（第一次）](PCS_PAGE_I18N_FIX.md)
- [国际化HTML默认语言规则说明](I18N_HTML_DEFAULT_LANGUAGE_RULE.md)
- [数据页面国际化修复说明](DATA_PAGE_I18N_FIX.md)
- [EMS页面国际化修复说明](EMS_PAGE_I18N_FIX.md)
- [触摸屏国际化实施说明](触摸屏国际化实施说明.md)
- [国际化修复总结](../国际化修复总结.md)
