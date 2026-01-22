# BMS页面国际化修复说明

## 修复日期
2026-01-12

## 问题概述

用户报告BMS页面在英文环境下仍显示大量中文内容，包括：

### 实时数据部分：
- ❌ 分类标题："核心指标"、"运行统计"、"Pack电池簇信息"
- ❌ 字段标签："电池总电压"、"电池总电流"、"电池功率"、"循环次数"
- ❌ 字段标签："日充电量"、"日放电量"、"累计充电量"、"累计放电量"
- ❌ Pack卡片字段："电压"、"电流"、"温度"、"正常"状态

### 历史数据部分：
- ❌ 图表标题："电池SOC趋势"、"电池性能趋势"、"电池电压历史"、"温度分布分析"等
- ❌ 图例标签："SOC趋势"、"最高温度"、"平均温度"、"最低温度"
- ❌ Y轴标签："电压 (V)"、"温度 (℃)"
- ❌ X轴时间："0时"、"1时"...

### 字段设置面板：
- ❌ 所有分类和字段名称

## 修复内容

### 1. 国际化文件更新 ([touchscreen-i18n.js](touchscreen-i18n.js))

#### 新增翻译键（中文部分，第195-220行）：
```javascript
// BMS相关
'核心指标': '核心指标',
'电池总电压': '电池总电压',
'电池总电流': '电池总电流',
'电池功率': '电池功率',
'循环次数': '循环次数',
'运行统计': '运行统计',
'日充电量': '日充电量',
'日放电量': '日放电量',
'累计充电量': '累计充电量',
'累计放电量': '累计放电量',
'Pack电池簇信息': 'Pack电池簇信息',
'电池性能趋势': '电池性能趋势',
'循环寿命统计': '循环寿命统计',
'容量衰减分析': '容量衰减分析',
'电池电压历史': '电池电压历史',
'电池SOC趋势': '电池SOC趋势',
'温度分布分析': '温度分布分析',
'最高温度': '最高温度',
'平均温度': '平均温度',
'最低温度': '最低温度',
'SOC趋势': 'SOC趋势',
'电压稳定': '电压稳定',
'电流稳定': '电流稳定',
'功率稳定': '功率稳定',
'正常': '正常',
'温度': '温度',
```

#### 新增翻译键（英文部分，第574-600行）：
```javascript
// BMS related
'核心指标': 'Core Indicators',
'电池总电压': 'Total Battery Voltage',
'电池总电流': 'Total Battery Current',
'电池功率': 'Battery Power',
'循环次数': 'Cycle Count',
'运行统计': 'Operation Statistics',
'日充电量': 'Daily Charge',
'日放电量': 'Daily Discharge',
'累计充电量': 'Total Charge',
'累计放电量': 'Total Discharge',
'Pack电池簇信息': 'Pack Battery Cluster Info',
'电池性能趋势': 'Battery Performance Trend',
'循环寿命统计': 'Cycle Lifespan Statistics',
'容量衰减分析': 'Capacity Degradation Analysis',
'电池电压历史': 'Battery Voltage History',
'电池SOC趋势': 'Battery SOC Trend',
'温度分布分析': 'Temperature Distribution Analysis',
'最高温度': 'Max Temperature',
'平均温度': 'Avg Temperature',
'最低温度': 'Min Temperature',
'SOC趋势': 'SOC Trend',
'电压稳定': 'Voltage Stable',
'电流稳定': 'Current Stable',
'功率稳定': 'Power Stable',
'正常': 'Normal',
'温度': 'Temperature',
```

### 2. Pack卡片字段修复 ([data.html](data.html))

**问题位置：** 第3585-3612行

**Pack卡片渲染代码：**

```javascript
// 修复前
packCard.innerHTML = `
    <div class="pack-header">
        <div class="pack-title">Pack${pack.id}</div>
        <div class="pack-status">正常</div>
    </div>
    <div class="pack-grid">
        <div class="pack-item">
            <div class="pack-label">电压</div>
            <div class="pack-value">${pack.voltage}V</div>
        </div>
        <div class="pack-item">
            <div class="pack-label">电流</div>
            <div class="pack-value">${pack.current}A</div>
        </div>
        <div class="pack-item">
            <div class="pack-label">温度</div>
            <div class="pack-value">${pack.temp}°C</div>
        </div>
    </div>
`;

// 修复后
packCard.innerHTML = `
    <div class="pack-header">
        <div class="pack-title">Pack${pack.id}</div>
        <div class="pack-status">${translateLabel('正常')}</div>
    </div>
    <div class="pack-grid">
        <div class="pack-item">
            <div class="pack-label">${translateLabel('电压')}</div>
            <div class="pack-value">${pack.voltage}V</div>
        </div>
        <div class="pack-item">
            <div class="pack-label">${translateLabel('电流')}</div>
            <div class="pack-value">${pack.current}A</div>
        </div>
        <div class="pack-item">
            <div class="pack-label">${translateLabel('温度')}</div>
            <div class="pack-value">${pack.temp}°C</div>
        </div>
    </div>
`;
```

**关键修改：**
- 使用`translateLabel()`函数动态翻译Pack卡片中的字段标签
- 包括："正常"、"电压"、"电流"、"温度"

### 3. 配置文件说明

BMS配置位于 [data.html:2022-2057](data.html#L2022-L2057)

```javascript
bms: {
    realtime: {
        '核心指标': {
            totalVoltage: { label: '电池总电压', unit: 'V', default: true },
            totalCurrent: { label: '电池总电流', unit: 'A', default: true },
            batteryPower: { label: '电池功率', unit: 'kW', default: true },
            // ...
        },
        '运行统计': {
            dailyCharge: { label: '日充电量', unit: 'kWh', default: true },
            // ...
        },
        'Pack电池簇信息': {
            pack1: { label: 'Pack1', unit: '', default: true },
            // ...
        }
    },
    history: {
        '图表': {
            performance: { label: '电池性能趋势', default: true },
            socBalance: { label: '电池SOC趋势', default: true },
            // ...
        }
    }
}
```

**注意：** 这些配置中的中文分类标题和字段标签会被`translateLabel()`函数自动处理，无需修改配置结构。

## 待修复内容

### 历史数据图表（需要额外工作）

BMS历史数据图表初始化函数需要修复（预计位置：`initBMSHistoryCharts()`）：

1. **图表标题**：
   - "电池SOC趋势" → `${translateLabel('电池SOC趋势')}`
   - "电池性能趋势" → `${translateLabel('电池性能趋势')}`
   - "电池电压历史" → `${translateLabel('电池电压历史')}`
   - "温度分布分析" → `${translateLabel('温度分布分析')}`

2. **图例标签**：
   - "SOC趋势" → `translateLabel('SOC趋势')`
   - "最高温度" → `translateLabel('最高温度')`
   - "平均温度" → `translateLabel('平均温度')`
   - "最低温度" → `translateLabel('最低温度')`

3. **坐标轴标签**：
   - "电压 (V)" → `${translateLabel('电压')} (V)`
   - "温度 (℃)" → `${translateLabel('温度')} (℃)`

4. **X轴时间标签**：
   - "0时"、"1时"... → "0:00"、"1:00"... 或 `${i}:00`

### HTML元素修复（需要额外工作）

如果有静态HTML生成的图表标题，需要添加`data-i18n`属性并修改默认内容为英文，遵循HTML默认语言规则。

## 测试验证

### 测试步骤：
1. **清除浏览器缓存**或硬刷新（Ctrl+Shift+R）
2. 切换到**英文环境**
3. 导航到"Data"页面 → "BMS"设备
4. 检查以下内容：

#### 实时数据标签页：
- ✅ Pack卡片字段：
  - 状态："Normal"（英文）/ "正常"（中文）
  - 字段："Voltage"、"Current"、"Temperature"（英文）
  - 字段："电压"、"电流"、"温度"（中文）

#### 字段设置面板：
- ⏳ 分类标题：
  - "Core Indicators"（英文）/ "核心指标"（中文）
  - "Operation Statistics"（英文）/ "运行统计"（中文）
  - "Pack Battery Cluster Info"（英文）/ "Pack电池簇信息"（中文）

- ⏳ 字段标签：
  - "Total Battery Voltage"（英文）/ "电池总电压"（中文）
  - "Daily Charge"（英文）/ "日充电量"（中文）

#### 历史数据标签页：
- ⏳ 图表标题：待修复
- ⏳ 图例标签：待修复
- ⏳ 坐标轴标签：待修复
- ⏳ X轴时间：待修复

**图例说明：**
- ✅ 已完成并测试
- ⏳ 翻译已添加，功能待实现
- ❌ 未开始

## 技术要点

### 翻译处理方式

#### 配置中的中文文本
配置文件中的中文分类标题（如"核心指标"）和字段标签（如"电池总电压"）会被系统自动通过`translateLabel()`处理，因为：

1. **设置面板渲染**（第2565行）：
```javascript
sectionTitle.textContent = translateLabel(category);
```

2. **字段标签渲染**（第2575行）：
```javascript
label.textContent = translateLabel(categoryFields[field].label);
```

3. **卡片标题渲染**（第4241行）：
```javascript
${translateLabel(config.label)}
```

#### 动态生成的HTML
Pack卡片等动态生成的HTML需要在模板字符串中使用`translateLabel()`：
```javascript
<div class="pack-label">${translateLabel('电压')}</div>
```

### SOLID原则应用

1. **单一职责原则 (SRP)**
   - `translateLabel()`: 专门负责翻译
   - Pack卡片生成函数：专门负责Pack卡片渲染
   - 职责分离清晰

2. **开闭原则 (OCP)**
   - 新增翻译项无需修改核心逻辑
   - 扩展性强

3. **依赖倒置原则 (DIP)**
   - 渲染逻辑依赖翻译接口
   - 不依赖具体的中文或英文实现

### DRY原则应用
- 统一使用`translateLabel()`处理所有翻译
- 避免重复的翻译逻辑
- 集中管理翻译字典

### KISS原则应用
- 简单直接的实现
- 清晰的代码结构
- 最小化复杂度

## 影响范围

### 已修改文件：
1. `touchscreen/touchscreen-i18n.js` - 新增26个BMS相关翻译键
2. `touchscreen/data.html` - Pack卡片字段修复

### 影响功能：
- ✅ 数据页 - BMS设备 - Pack卡片字段标签
- ⏳ 数据页 - BMS设备 - 实时数据分类和字段（翻译已添加）
- ⏳ 数据页 - BMS设备 - 历史数据图表（翻译已添加，图表代码待修复）
- ⏳ 数据页 - BMS设备 - 字段设置面板（翻译已添加，应自动生效）

### 无影响区域：
- 其他页面（Home、History、Control等）
- 其他设备（Overall、EMS、PCS、Meter等）

## 注意事项

1. **缓存清理**：测试时必须清除浏览器缓存
2. **完整测试**：需要测试中英文切换功能
3. **图表初始化**：历史数据图表需要额外的代码修复
4. **一致性检查**：确保所有BMS相关文本都使用正确的翻译键

## 后续工作建议

### 优先级1（高）- 历史数据图表修复
需要修改BMS历史数据图表初始化函数，使用`translateLabel()`翻译：
- 图表标题
- 图例标签
- 坐标轴标签
- X轴时间格式

### 优先级2（中）- X轴时间统一
建议统一所有图表的X轴时间格式为"0:00"、"1:00"格式（英文环境通用），而不是"0时"、"1时"。

### 优先级3（低）- 自动化测试
编写E2E测试验证：
- 语言切换功能
- 翻译覆盖率
- Pack卡片渲染

## 相关文档
- [PCS页面国际化修复说明](PCS_PAGE_I18N_FIX.md)
- [PCS页面国际化补充修复说明](PCS_PAGE_I18N_SUPPLEMENT.md)
- [数据页面国际化修复说明](DATA_PAGE_I18N_FIX.md)
- [EMS页面国际化修复说明](EMS_PAGE_I18N_FIX.md)
- [国际化HTML默认语言规则说明](I18N_HTML_DEFAULT_LANGUAGE_RULE.md)
- [触摸屏国际化实施说明](触摸屏国际化实施说明.md)
- [国际化修复总结](../国际化修复总结.md)
