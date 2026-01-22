# PCS页面国际化修复说明

## 修复日期
2026-01-12

## 问题描述
在英文环境下，PCS页面仍然显示中文内容，具体包括：

### 实时数据：
- **分类标题**："PCS电网侧参数"、"PCS温度"
- **字段标签**："PCS电网侧电压"、"PCS电网侧电流"、"PCS电网侧功率"、"PCS温度"

### 历史数据：
- **图表标题**："PCS功率转换历史"、"电压电流趋势"、"转换效率分析"
- **图表图例**："AC功率输出"、"DC功率输入"、"DC电压"、"DC电流"、"转换效率"
- **坐标轴标签**："功率 (kW)"、"电压 (V)"、"电流 (A)"、"效率 (%)"

## 修复内容

### 1. 国际化文件更新 ([touchscreen-i18n.js](touchscreen-i18n.js))

#### 新增翻译键（中文部分，第170-186行）：
```javascript
// PCS相关
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
'DC电压': 'DC电压',
'DC电流': 'DC电流',
'电压': '电压',
'电流': '电流',
'效率': '效率',
```

#### 新增翻译键（英文部分，第516-532行）：
```javascript
// PCS related
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
'DC电压': 'DC Voltage',
'DC电流': 'DC Current',
'电压': 'Voltage',
'电流': 'Current',
'效率': 'Efficiency',
```

### 2. 实时数据配置修复 ([data.html](data.html))

**问题位置：** 第1973-1992行

```javascript
// 修复前
pcs: {
    realtime: {
        'PCS电网侧参数': {
            gridVoltage: { label: 'PCS电网侧电压', ... },
            gridCurrent: { label: 'PCS电网侧电流', ... },
            gridPower: { label: 'PCS电网侧功率', ... }
        },
        'PCS温度': {
            transformerTemp: { label: 'PCS温度', ... }
        }
    },
    history: {
        '图表': {
            powerConversion: { label: '功率转换历史', ... },
            voltageCurrent: { label: '电压电流趋势', ... },
            efficiency: { label: '转换效率分析', ... }
        }
    }
}

// 修复后
pcs: {
    realtime: {
        'pcsGridSideParams': {
            gridVoltage: { label: 'pcsGridVoltage', ... },
            gridCurrent: { label: 'pcsGridCurrent', ... },
            gridPower: { label: 'pcsGridPower', ... }
        },
        'pcsTemperature': {
            transformerTemp: { label: 'pcsTemperature', ... }
        }
    },
    history: {
        '图表': {
            powerConversion: { label: 'pcsPowerConversionHistory', ... },
            voltageCurrent: { label: 'voltageCurrentTrend', ... },
            efficiency: { label: 'conversionEfficiencyAnalysis', ... }
        }
    }
}
```

**关键变更：**
- 将中文分类标题改为i18n key（如 `'PCS电网侧参数'` → `'pcsGridSideParams'`）
- 将中文字段标签改为i18n key（如 `'PCS电网侧电压'` → `'pcsGridVoltage'`）

### 3. 历史数据HTML生成修复 ([data.html](data.html))

#### 图表标题修复

**PCS功率转换历史（第2880-2887行）：**
```html
<!-- 修复前 -->
<span style="...">PCS功率转换历史</span>

<!-- 修复后 -->
<span data-i18n="pcsPowerConversionHistory">PCS Power Conversion History</span>
```

**电压电流趋势（第2903-2910行）：**
```html
<!-- 修复前 -->
<span style="...">电压电流趋势</span>

<!-- 修复后 -->
<span data-i18n="voltageCurrentTrend">Voltage & Current Trend</span>
```

**转换效率分析（第2926-2933行）：**
```html
<!-- 修复前 -->
<span style="...">转换效率分析</span>

<!-- 修复后 -->
<span data-i18n="conversionEfficiencyAnalysis">Conversion Efficiency Analysis</span>
```

**关键原则：** 遵循HTML默认语言规则，所有HTML默认内容必须是英文，通过`data-i18n`属性实现中文翻译。

### 4. 图表初始化修复 ([data.html](data.html))

#### PCS功率转换历史图表（第6096-6124行）：
```javascript
// 修复前
datasets: [{
    label: 'AC功率输出',
    ...
}, {
    label: 'DC功率输入',
    ...
}]
options: getChartOptions('功率 (kW)')

// 修复后
datasets: [{
    label: translateLabel('acPowerOutput'),
    ...
}, {
    label: translateLabel('dcPowerInput'),
    ...
}]
options: getChartOptions(`${translateLabel('功率')} (kW)`)
```

#### 电压电流趋势图表（第6126-6206行）：
```javascript
// 修复前
datasets: [{
    label: 'DC电压',
    yAxisID: 'y'
}, {
    label: 'DC电流',
    yAxisID: 'y1'
}]
scales: {
    y: { title: { text: '电压 (V)' } },
    y1: { title: { text: '电流 (A)' } }
}

// 修复后
datasets: [{
    label: translateLabel('DC电压'),
    yAxisID: 'y'
}, {
    label: translateLabel('DC电流'),
    yAxisID: 'y1'
}]
scales: {
    y: { title: { text: `${translateLabel('电压')} (V)` } },
    y1: { title: { text: `${translateLabel('电流')} (A)` } }
}
```

#### 转换效率分析图表（第5958-5973行）：
```javascript
// 修复前
datasets: [{
    label: '转换效率',
    ...
}]
options: getChartOptions('效率 (%)', 85, 100)

// 修复后
datasets: [{
    label: translateLabel('conversionEfficiency'),
    ...
}]
options: getChartOptions(`${translateLabel('效率')} (%)`, 85, 100)
```

## 测试验证

### 测试步骤：
1. 切换到英文环境（点击语言切换按钮）
2. 导航到"Data"页面 → "PCS"设备
3. 检查以下内容：

#### 实时数据标签页：
- ✅ 分类标题："PCS Grid Side Parameters"、"PCS Temperature"
- ✅ 字段标签："PCS Grid Voltage"、"PCS Grid Current"、"PCS Grid Power"、"PCS Temperature"

#### 历史数据标签页：
- ✅ 图表标题1："PCS Power Conversion History"
- ✅ 图表标题2："Voltage & Current Trend"
- ✅ 图表标题3："Conversion Efficiency Analysis"
- ✅ 图表图例："AC Power Output"、"DC Power Input"、"DC Voltage"、"DC Current"、"Conversion Efficiency"
- ✅ 坐标轴标签："Power (kW)"、"Voltage (V)"、"Current (A)"、"Efficiency (%)"

### 预期结果：
所有原本硬编码的中文文本都应该正确显示为英文。

## 技术要点

### SOLID原则应用：

1. **单一职责原则 (SRP)**
   - 配置负责定义字段结构（使用i18n key）
   - `translateLabel()` 负责翻译
   - 各函数职责单一明确

2. **开闭原则 (OCP)**
   - 翻译字典可扩展，无需修改核心逻辑
   - 新增翻译项只需添加键值对

3. **依赖倒置原则 (DIP)**
   - 配置依赖i18n key而非硬编码文本
   - 图表初始化依赖翻译接口而非具体实现

### DRY原则应用：
- 统一使用`translateLabel()`处理所有翻译
- 避免重复的翻译逻辑
- 集中管理翻译字典

### KISS原则应用：
- 简单直接的i18n key命名（如`pcsGridVoltage`）
- 清晰的配置结构
- 最小化复杂度

### HTML默认语言规则：
遵循系统设计原则：
- **所有HTML内容默认为英文**
- **只在中文环境下才翻译**
- 通过`data-i18n`属性关联翻译键

参考：[国际化HTML默认语言规则说明](I18N_HTML_DEFAULT_LANGUAGE_RULE.md)

## 数据流程

### 实时数据标题和字段流程：
```
配置(i18n key) → renderComponentData() → createDataCard() → translateLabel() → 显示翻译文本
'pcsGridSideParams'                                              'PCS Grid Side Parameters'
```

### 历史数据标题流程：
```
HTML元素(data-i18n) → DOMContentLoaded → applyTouchscreenTranslations() → 翻译文本
'pcsPowerConversionHistory'                                                  'PCS Power...'
```

### 图表标签流程：
```
图表初始化 → translateLabel() → Chart.js渲染 → 显示翻译文本
'acPowerOutput'                              'AC Power Output'
```

## 影响范围

### 修改文件：
1. `touchscreen/touchscreen-i18n.js` - 新增16个翻译键
2. `touchscreen/data.html` - 核心修复（配置、HTML生成、图表初始化）

### 影响功能：
- ✅ 数据页 - PCS设备 - 实时数据分类和字段标签
- ✅ 数据页 - PCS设备 - 历史数据图表标题
- ✅ 数据页 - PCS设备 - 图表图例和坐标轴标签

### 无影响区域：
- 其他页面（Home、History、Control等）
- 其他设备（Overall、EMS、BMS、Meter等）

## 注意事项

1. **缓存清理**：测试时建议清除浏览器缓存或硬刷新（Ctrl+Shift+R）
2. **语言切换**：确保localStorage中的`touchscreen_language`值正确
3. **图表重新初始化**：语言切换时图表会完整重新初始化以应用翻译
4. **一致性**：所有新增的配置都必须使用i18n key而非硬编码文本

## 扩展性建议

1. **统一i18n key命名**：建议为所有设备建立统一的命名规范
2. **自动化测试**：编写单元测试验证翻译覆盖率
3. **配置验证**：添加启动时检查，确保所有i18n key都有对应翻译
4. **文档完善**：为每个设备创建类似的国际化修复文档

## 相关文档
- [国际化HTML默认语言规则说明](I18N_HTML_DEFAULT_LANGUAGE_RULE.md)
- [数据页面国际化修复说明](DATA_PAGE_I18N_FIX.md)
- [EMS页面国际化修复说明](EMS_PAGE_I18N_FIX.md)
- [触摸屏国际化实施说明](触摸屏国际化实施说明.md)
- [国际化修复总结](../国际化修复总结.md)
