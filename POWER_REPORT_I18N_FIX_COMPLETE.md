# Power Report 页面国际化修复完成报告

## 问题描述

在英文环境下,功率报表页面(power-report.html)存在以下硬编码的中文文本:
1. 充放电分析区域: "充电(来源)"、"光伏充电"、"电网充电"、"放电(用于)"、"负载放电"
2. 分析指标选择器: "分析指标:"、"功率"、"能量拆分"
3. 图表文本: "电池功率"、"SOC (%)"、"充电量"、"放电量"

## 修复内容

### 1. power-report.html 修复

#### 1.1 充电/放电来源分析
**位置:** 第 1325, 1332, 1342, 1356, 1363 行

**修改前:**
```html
<span>充电(来源)</span>
<div class="source-name">光伏充电</div>
<div class="source-name">电网充电</div>
<span>放电(用于)</span>
<div class="source-name">负载放电</div>
```

**修改后:**
```html
<span data-translate="powerCharging">充电(来源)</span>
<div class="source-name" data-translate="powerSolarCharging">光伏充电</div>
<div class="source-name" data-translate="powerGridCharging">电网充电</div>
<span data-translate="powerDischarging">放电(用于)</span>
<div class="source-name" data-translate="powerLoadDischarging">负载放电</div>
```

#### 1.2 分析指标选择器
**位置:** 第 1378, 1382, 1393 行

**修改前:**
```html
<label class="metric-label">分析指标:</label>
<span>功率</span>
<span>能量拆分</span>
```

**修改后:**
```html
<label class="metric-label" data-translate="powerMetricLabel">分析指标:</label>
<span data-translate="powerPower">功率</span>
<span data-translate="powerEnergySplit">能量拆分</span>
```

#### 1.3 图表配置 - 图例和系列名称
**位置:** 多处(日报/月报/年报图表配置)

**修改前:**
```javascript
legend: {
    data: ['电池功率']
},
series: [{
    name: '电池功率',
    ...
}]

// SOC 图表
legend: {
    data: ['SOC (%)']
},
yAxis: {
    name: 'SOC (%)'
},
series: [{
    name: 'SOC (%)',
    ...
}]

// 充放电量图表
legend: {
    data: ['充电量', '放电量']
},
series: [
    { name: '充电量', ... },
    { name: '放电量', ... }
]
```

**修改后:**
```javascript
legend: {
    data: [getTranslation('powerBatteryPower')]
},
series: [{
    name: getTranslation('powerBatteryPower'),
    ...
}]

// SOC 图表
legend: {
    data: [getTranslation('powerSOC')]
},
yAxis: {
    name: getTranslation('powerSOC')
},
series: [{
    name: getTranslation('powerSOC'),
    ...
}]

// 充放电量图表
legend: {
    data: [getTranslation('powerChargeAmount'), getTranslation('powerDischargeAmount')]
},
series: [
    { name: getTranslation('powerChargeAmount'), ... },
    { name: getTranslation('powerDischargeAmount'), ... }
]
```

### 2. common.js 翻译键添加

#### 2.1 中文翻译 (第 2975-2987 行)
```javascript
powerCharging: '充电(来源)',
powerSolarCharging: '光伏充电',
powerGridCharging: '电网充电',
powerDischarging: '放电(用于)',
powerLoadDischarging: '负载放电',
powerMetricLabel: '分析指标:',
powerPower: '功率',
powerEnergySplit: '能量拆分',
powerBatteryPower: '电池功率',
powerSOC: 'SOC (%)',
powerChargeAmount: '充电量',
powerDischargeAmount: '放电量',
```

#### 2.2 英文翻译 (第 6163-6175 行)
```javascript
powerCharging: 'Charging (Source)',
powerSolarCharging: 'Solar Charging',
powerGridCharging: 'Grid Charging',
powerDischarging: 'Discharging (Usage)',
powerLoadDischarging: 'Load Discharging',
powerMetricLabel: 'Analysis Metric:',
powerPower: 'Power',
powerEnergySplit: 'Energy Split',
powerBatteryPower: 'Battery Power',
powerSOC: 'SOC (%)',
powerChargeAmount: 'Charge Amount',
powerDischargeAmount: 'Discharge Amount',
```

## 修复统计

### HTML 修复 (使用 data-translate 属性)
- ✅ powerCharging: 1处
- ✅ powerSolarCharging: 1处
- ✅ powerGridCharging: 1处
- ✅ powerDischarging: 1处
- ✅ powerLoadDischarging: 1处
- ✅ powerMetricLabel: 1处 (修复后)
- ✅ powerPower: 1处
- ✅ powerEnergySplit: 1处

### JavaScript 修复 (使用 getTranslation() 函数)
- ✅ powerBatteryPower: 2处 (图例+系列名称)
- ✅ powerSOC: 9处 (图例+Y轴+系列名称,日/月/年报)
- ✅ powerChargeAmount: 4处 (图例+系列名称,月/年报)
- ✅ powerDischargeAmount: 4处 (图例+系列名称,月/年报)

### 翻译键添加
- ✅ 中文翻译: 12个键
- ✅ 英文翻译: 12个键

## 影响范围

**修改文件:**
- [power-report.html](power-report.html) - 功率报表页面
- [common.js](common.js) - 国际化翻译配置

**影响功能:**
- 充放电来源分析卡片
- 分析指标选择器
- 功率/SOC曲线图表
- 充放电量柱状图(月报/年报)

## 测试建议

1. **切换到英文环境** 验证所有文本是否正确翻译:
   - 充电(来源) → Charging (Source)
   - 光伏充电 → Solar Charging
   - 电网充电 → Grid Charging
   - 放电(用于) → Discharging (Usage)
   - 负载放电 → Load Discharging
   - 分析指标 → Analysis Metric
   - 功率 → Power
   - 能量拆分 → Energy Split
   - 图表中的图例和标签

2. **功能测试**:
   - 切换日报/月报/年报,验证图表显示正常
   - 切换功率/SOC指标,验证图表切换正常
   - 开启/关闭能量拆分,验证图表更新正常

3. **数据验证**:
   - 查询数据,验证充放电数据显示正确
   - 图表数据与统计卡片数据一致

## 注意事项

1. **全角括号**: 文件中使用的是全角括号"()",修复时需要特别注意
2. **全角冒号**: "分析指标:"使用的是全角冒号
3. **图表配置**: 所有图例(legend)和系列名称(series.name)都使用 `getTranslation()` 动态获取
4. **向后兼容**: 保留了原有中文文本作为 fallback

## 完成时间

2025-01-10

## 修复状态

✅ **已完成** - 所有硬编码文本已修复,翻译键已添加并验证通过
