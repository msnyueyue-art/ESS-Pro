# PCS页面国际化修复说明

## 问题描述

在触摸屏数据页面 (touchscreen/data.html) 的**PCS → 实时数据、历史数据**标签页中,多处文本在中文环境下仍显示英文。

### 问题详情

#### 实时数据标签页
1. **分组标题**: `pcsGridSideParams`, `pcsTemperature`
2. **字段标签**: `pcsGridVoltage`, `pcsGridCurrent`, `pcsGridPower`, `pcsTemperature`

#### 历史数据标签页
1. **图表标题**:
   - `PCS Power Conversion History` → 应显示 "PCS功率转换历史"
   - `Voltage & Current Trend` → 应显示 "电压电流趋势"
   - `Conversion Efficiency Analysis` → 应显示 "转换效率分析"

2. **图例标签**:
   - `acPowerOutput` → 应显示 "AC功率输出"
   - `dcPowerInput` → 应显示 "DC功率输入"
   - `conversionEfficiency` → 应显示 "转换效率"

3. **下拉菜单**: `Day`, `Month`, `Year`, `Total` → 应显示 "日"、"月"、"年"、"合计"

#### 数据显示设置弹框
1. **分组名**: `PCSGRIDSIDEPARAMS`, `PCSTEMPERATURE`, `图表`
2. **字段名**: 多个英文代码值字段名

## 问题位置

**文件**: `touchscreen/data.html`

### 问题代码位置

**1. PCS配置 (第1988-2002行)**
```javascript
pcs: {
    realtime: {
        'pcsGridSideParams': {
            gridVoltage: { label: 'pcsGridVoltage', ... },  // ❌ 英文代码值
            gridCurrent: { label: 'pcsGridCurrent', ... },  // ❌ 英文代码值
            gridPower: { label: 'pcsGridPower', ... }       // ❌ 英文代码值
        },
        'pcsTemperature': {
            transformerTemp: { label: 'pcsTemperature', ... }  // ❌ 英文代码值
        }
    },
    history: {
        '图表': {
            powerConversion: { label: 'pcsPowerConversionHistory', ... },  // ❌ 英文代码值
            voltageCurrent: { label: 'voltageCurrentTrend', ... },         // ❌ 英文代码值
            efficiency: { label: 'conversionEfficiencyAnalysis', ... }     // ❌ 英文代码值
        }
    }
}
```

**2. 图表标题HTML (第2899, 2922, 2945行)**
```html
<span data-i18n="pcsPowerConversionHistory">PCS Power Conversion History</span>  <!-- ❌ 英文默认文本 -->
<span data-i18n="voltageCurrentTrend">Voltage & Current Trend</span>  <!-- ❌ 英文默认文本 -->
<span data-i18n="conversionEfficiencyAnalysis">Conversion Efficiency Analysis</span>  <!-- ❌ 英文默认文本 -->
```

**3. 下拉菜单选项 (第2949-2952行)**
```html
<option value="day" selected data-i18n="日">Day</option>  <!-- ❌ 英文默认文本,错误的i18n键 -->
<option value="month" data-i18n="月">Month</option>
<option value="year" data-i18n="年">Year</option>
<option value="total" data-i18n="合计">Total</option>
```

**4. translateLabel()函数 (第4101-4132行)**
- 对英文代码值字段没有翻译支持
- 中文环境下直接返回原值,导致显示英文代码

## 修复方案

### 修改1: 扩展translateLabel()函数的代码值字段支持

**位置**: `touchscreen/data.html` 第4117-4129行

添加PCS相关字段到代码值字段列表,让这些字段通过`touchscreen-i18n.js`的`t()`函数翻译:

```javascript
// PCS等组件的英文代码值字段,需要通过touchscreen-i18n.js翻译
// 这些字段在配置中使用英文代码值作为label
const codeValueFields = [
    'pcsGridSideParams', 'pcsGridVoltage', 'pcsGridCurrent', 'pcsGridPower',
    'pcsTemperature', 'pcsPowerConversionHistory', 'voltageCurrentTrend',
    'conversionEfficiencyAnalysis', 'conversionEfficiency', 'acPowerOutput',
    'dcPowerInput'
];

// 如果是代码值字段,使用touchscreen-i18n.js的翻译
if (codeValueFields.includes(label) && typeof t === 'function') {
    return t(label);
}
```

### 修改2: 修复图表标题的HTML默认文本

**位置**: `touchscreen/data.html` 第2899, 2922, 2945行

将英文默认文本改为中文,保留`data-i18n`属性用于英文翻译:

```html
<!-- 修改前 -->
<span data-i18n="pcsPowerConversionHistory">PCS Power Conversion History</span>
<span data-i18n="voltageCurrentTrend">Voltage & Current Trend</span>
<span data-i18n="conversionEfficiencyAnalysis">Conversion Efficiency Analysis</span>

<!-- 修改后 -->
<span data-i18n="pcsPowerConversionHistory">PCS功率转换历史</span>
<span data-i18n="voltageCurrentTrend">电压电流趋势</span>
<span data-i18n="conversionEfficiencyAnalysis">转换效率分析</span>
```

### 修改3: 修复下拉菜单选项

**位置**: `touchscreen/data.html` 第2949-2952行

将英文默认文本改为中文,修正`data-i18n`属性值:

```html
<!-- 修改前 -->
<option value="day" selected data-i18n="日">Day</option>
<option value="month" data-i18n="月">Month</option>
<option value="year" data-i18n="年">Year</option>
<option value="total" data-i18n="合计">Total</option>

<!-- 修改后 -->
<option value="day" selected data-i18n="day">日</option>
<option value="month" data-i18n="month">月</option>
<option value="year" data-i18n="year">年</option>
<option value="total" data-i18n="total">合计</option>
```

### 修改4: 添加图例标签翻译

**位置**: `touchscreen/data.html` 第4395-4396行

在`labelTranslations`对象中添加图例标签的英文翻译:

```javascript
'conversionEfficiency': 'Conversion Efficiency',
'acPowerOutput': 'AC Power Output',      // ✅ 新增
'dcPowerInput': 'DC Power Input',        // ✅ 新增
'能量': 'Energy',
```

## 技术说明

### 翻译配置

所有翻译已在 `touchscreen/touchscreen-i18n.js` 中定义:

**中文翻译 (第184-194行):**
```javascript
pcsGridSideParams: 'PCS电网侧参数',
pcsGridVoltage: 'PCS电网侧电压',
pcsGridCurrent: 'PCS电网侧电流',
pcsGridPower: 'PCS电网侧功率',
pcsTemperature: 'PCS温度',
pcsPowerConversionHistory: 'PCS功率转换历史',
voltageCurrentTrend: '电压电流趋势',
conversionEfficiencyAnalysis: '转换效率分析',
acPowerOutput: 'AC功率输出',
dcPowerInput: 'DC功率输入',
conversionEfficiency: '转换效率',
```

**英文翻译 (第797-807行):**
```javascript
pcsGridSideParams: 'PCS Grid Side Parameters',
pcsGridVoltage: 'PCS Grid Voltage',
pcsGridCurrent: 'PCS Grid Current',
pcsGridPower: 'PCS Grid Power',
pcsTemperature: 'PCS Temperature',
pcsPowerConversionHistory: 'PCS Power Conversion History',
voltageCurrentTrend: 'Voltage & Current Trend',
conversionEfficiencyAnalysis: 'Conversion Efficiency Analysis',
acPowerOutput: 'AC Power Output',
dcPowerInput: 'DC Power Input',
conversionEfficiency: 'Conversion Efficiency',
```

### 工作流程

**实时数据字段标签翻译:**
1. 配置中使用英文代码值作为label (如 'pcsGridVoltage')
2. 渲染时调用 `translateLabel('pcsGridVoltage')`
3. 函数检查`codeValueFields`数组,发现是代码值字段
4. 调用`t('pcsGridVoltage')`获取翻译
5. 中文环境返回 "PCS电网侧电压",英文环境返回 "PCS Grid Voltage"

**历史数据图表标题翻译:**
1. HTML默认显示中文 (如 "PCS功率转换历史")
2. `applyTouchscreenTranslations()`函数检测到`data-i18n`属性
3. 英文环境下替换为英文翻译

**图例标签翻译:**
1. 图表初始化时使用 `translateLabel('acPowerOutput')`
2. 中文环境通过`t()`函数返回 "AC功率输出"
3. 英文环境返回 "AC Power Output"

## 修复效果

### 中文环境

**实时数据:**
- 分组: "PCS电网侧参数"、"PCS温度"
- 字段: "PCS电网侧电压"、"PCS电网侧电流"、"PCS电网侧功率"、"PCS温度"

**历史数据:**
- 图表标题: "PCS功率转换历史"、"电压电流趋势"、"转换效率分析"
- 图例: "AC功率输出"、"DC功率输入"、"转换效率"
- 下拉菜单: "日"、"月"、"年"、"合计"

### 英文环境

**Real-time Data:**
- Groups: "PCS Grid Side Parameters", "PCS Temperature"
- Fields: "PCS Grid Voltage", "PCS Grid Current", "PCS Grid Power", "PCS Temperature"

**Historical Data:**
- Chart Titles: "PCS Power Conversion History", "Voltage & Current Trend", "Conversion Efficiency Analysis"
- Legends: "AC Power Output", "DC Power Input", "Conversion Efficiency"
- Dropdown: "Day", "Month", "Year", "Total"

### 语言切换

- ✅ 所有文本随语言切换正确更新
- ✅ 实时数据字段标签正确翻译
- ✅ 历史数据图表标题正确翻译
- ✅ 图例标签正确翻译
- ✅ 下拉菜单选项正确翻译
- ✅ 不影响数据显示和图表功能

## 测试方法

### 中文环境测试

1. **打开触摸屏系统**
   - 访问: `touchscreen/touchscreen-display.html`
   - 确保当前语言为中文

2. **测试实时数据**
   - 点击左侧 "PCS"
   - 验证分组标题: "PCS电网侧参数"、"PCS温度"
   - 验证字段标签: "PCS电网侧电压"、"PCS电网侧电流"、"PCS电网侧功率"、"PCS温度"

3. **测试历史数据**
   - 点击顶部 "历史数据" 标签
   - 验证三个图表标题:
     - "PCS功率转换历史"
     - "电压电流趋势"
     - "转换效率分析"
   - 验证图例标签:
     - PCS功率转换历史: "AC功率输出"、"DC功率输出"
     - 电压电流趋势: "DC电压"、"DC电流"
     - 转换效率分析: "转换效率"
   - 验证下拉菜单: "日"、"月"、"年"、"合计"

4. **测试数据显示设置**
   - 点击右上角 "自定义" 按钮
   - 验证分组名称和字段名称都显示中文

### 英文环境测试

1. **切换到英文**
   - 点击右上角语言切换按钮
   - 等待页面刷新

2. **测试Real-time Data**
   - Navigate to PCS
   - Verify group titles and field labels in English

3. **测试Historical Data**
   - Verify chart titles and legends in English
   - Verify dropdown shows "Day", "Month", "Year", "Total"

### 语言切换测试

1. **来回切换语言**
   - 在PCS页面停留
   - 多次切换中英文
   - 验证所有文本正确更新

2. **数据刷新测试**
   - 等待数据自动刷新
   - 验证刷新后文本保持正确语言

## 相关文件

- `touchscreen/data.html` - 数据页面主文件
- `touchscreen/touchscreen-i18n.js` - 触摸屏国际化配置文件
- `touchscreen/touchscreen-display.html` - 触摸屏显示入口页面

## 注意事项

1. ✅ **已验证兼容性**: 修改不影响其他组件和页面
2. ✅ **统一翻译机制**: 使用`touchscreen-i18n.js`的翻译系统
3. ✅ **代码值字段**: PCS字段使用英文代码值,通过`t()`函数翻译
4. ✅ **HTML默认文本**: 图表标题HTML默认为中文
5. ✅ **下拉菜单**: 使用正确的`data-i18n`属性值(小写的day/month/year/total)
6. ✅ **图例翻译**: 所有图例标签通过`translateLabel()`函数翻译
7. ⚠️ **扩展性**: 后续添加新的代码值字段需要加入`codeValueFields`数组

## 设计模式

本次修复采用了 **桥接模式**:
- 将`translateLabel()`函数与`touchscreen-i18n.js`的`t()`函数桥接
- 代码值字段通过`t()`函数获取翻译
- 普通标签仍使用`labelTranslations`对象

优点:
1. **统一翻译源**: 所有PCS翻译集中在`touchscreen-i18n.js`中
2. **避免重复**: 不需要在两个地方维护相同的翻译
3. **易于维护**: 新增字段只需在`touchscreen-i18n.js`中添加翻译
4. **灵活扩展**: 其他组件也可以采用相同模式

## 相关修复

本次修复是触摸屏系统国际化修复系列的一部分,相关修复包括:
- 触摸屏历史数据日历国际化修复
- 整机收益分析时间类型下拉菜单国际化修复
- EMS状态值国际化修复
- **PCS页面国际化修复** (本文档)

## 修复日期

2026-01-15

## 修复人员

Claude AI Assistant
