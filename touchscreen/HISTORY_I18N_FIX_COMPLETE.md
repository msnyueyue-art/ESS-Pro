# History历史页面图表国际化修复完成

## 修复内容

### 问题描述
在英文环境下,历史菜单页面(History)的图表仍然显示中文标签,包括:
- 功率趋势分析图表中的 "功率 (kW)" 和 "SOC (%)"
- 收益分析图表中的 "充电量 (kWh)"、"放电量 (kWh)" 和 "净收益 (¥)"
- Y轴标题也是中文

### 修复方案

#### 1. **添加图表标签翻译函数** (第942-970行)
```javascript
function translateChartLabel(key) {
    const lang = getTouchscreenLang();
    const translations = {
        'zh': {
            'power': '功率 (kW)',
            'soc': 'SOC (%)',
            'charging': '充电量 (kWh)',
            'discharging': '放电量 (kWh)',
            'revenue': '净收益 (¥)',
            'powerUnit': '功率 (kW)',
            'socUnit': 'SOC (%)',
            'energyUnit': '电量 (kWh)',
            'revenueUnit': '收益 (¥)'
        },
        'en': {
            'power': 'Power (kW)',
            'soc': 'SOC (%)',
            'charging': 'Charging (kWh)',
            'discharging': 'Discharging (kWh)',
            'revenue': 'Net Revenue (¥)',
            'powerUnit': 'Power (kW)',
            'socUnit': 'SOC (%)',
            'energyUnit': 'Energy (kWh)',
            'revenueUnit': 'Revenue (¥)'
        }
    };
    return translations[lang][key] || key;
}
```

#### 2. **添加动态更新图表标签函数** (第971-993行)
```javascript
function updateChartLabels() {
    // 更新功率SOC图表
    if (window.powerSocChartInstance) {
        const chart = window.powerSocChartInstance;
        chart.data.datasets[0].label = translateChartLabel('power');
        chart.data.datasets[1].label = translateChartLabel('soc');
        chart.options.scales.y.title.text = translateChartLabel('powerUnit');
        chart.options.scales.y1.title.text = translateChartLabel('socUnit');
        chart.update('none'); // 无动画更新
    }

    // 更新收益分析图表
    if (window.revenueChartInstance) {
        const chart = window.revenueChartInstance;
        chart.data.datasets[0].label = translateChartLabel('charging');
        chart.data.datasets[1].label = translateChartLabel('discharging');
        chart.data.datasets[2].label = translateChartLabel('revenue');
        chart.options.scales.y.title.text = translateChartLabel('energyUnit');
        chart.options.scales.y1.title.text = translateChartLabel('revenueUnit');
        chart.update('none'); // 无动画更新
    }
}
```

#### 3. **修改功率SOC图表初始化** (第1050-1132行)
将硬编码的中文标签替换为调用翻译函数:
- `label: '功率 (kW)'` → `label: translateChartLabel('power')`
- `label: 'SOC (%)'` → `label: translateChartLabel('soc')`
- `text: '功率 (kW)'` → `text: translateChartLabel('powerUnit')`
- `text: 'SOC (%)'` → `text: translateChartLabel('socUnit')`

#### 4. **修改收益分析图表初始化** (第1243-1324行)
将硬编码的中文标签替换为调用翻译函数:
- `label: '充电量 (kWh)'` → `label: translateChartLabel('charging')`
- `label: '放电量 (kWh)'` → `label: translateChartLabel('discharging')`
- `label: '净收益 (¥)'` → `label: translateChartLabel('revenue')`
- `text: '电量 (kWh)'` → `text: translateChartLabel('energyUnit')`
- `text: '收益 (¥)'` → `text: translateChartLabel('revenueUnit')`

#### 5. **在语言切换事件中调用更新函数** (第1733-1734行)
```javascript
window.addEventListener('languageChanged', function(e) {
    // ... 其他代码 ...

    // 更新图表标签
    updateChartLabels();
});
```

## 测试方法

### 1. 打开历史页面
访问: `touchscreen/history.html`

### 2. 验证英文环境
1. 点击右上角的语言切换按钮(地球图标)
2. 选择 "English"
3. 观察两个图表:
   - **功率趋势分析图表**:
     - 图例应显示: "Power (kW)" 和 "SOC (%)"
     - Y轴左侧标题应显示: "Power (kW)"
     - Y轴右侧标题应显示: "SOC (%)"
   - **收益分析图表**:
     - 图例应显示: "Charging (kWh)", "Discharging (kWh)", "Net Revenue (¥)"
     - Y轴左侧标题应显示: "Energy (kWh)"
     - Y轴右侧标题应显示: "Revenue (¥)"

### 3. 验证中文环境
1. 切换回中文 "中文"
2. 观察两个图表:
   - **功率趋势分析图表**:
     - 图例应显示: "功率 (kW)" 和 "SOC (%)"
     - Y轴左侧标题应显示: "功率 (kW)"
     - Y轴右侧标题应显示: "SOC (%)"
   - **收益分析图表**:
     - 图例应显示: "充电量 (kWh)", "放电量 (kWh)", "净收益 (¥)"
     - Y轴左侧标题应显示: "电量 (kWh)"
     - Y轴右侧标题应显示: "收益 (¥)"

### 4. 验证实时切换
- 在页面上多次切换语言
- 确认图表标签能够实时更新
- 确认没有出现闪烁或动画效果(已禁用动画)

## 技术要点

### 1. Chart.js 更新机制
使用 `chart.update('none')` 参数禁用动画,确保标签更新时不会出现过渡效果,提供即时响应。

### 2. 全局图表实例管理
- `window.powerSocChartInstance` - 功率SOC图表实例
- `window.revenueChartInstance` - 收益分析图表实例

确保图表实例在全局可访问,便于语言切换时动态更新。

### 3. 翻译键值设计
分离了标签文本和坐标轴标题的翻译键:
- `power` / `powerUnit` - 图例标签 / Y轴标题
- `soc` / `socUnit`
- `charging` / `discharging` / `revenue`
- `energyUnit` / `revenueUnit`

### 4. 无侵入式修复
修复方案不影响现有代码结构,仅:
- 添加翻译辅助函数
- 替换硬编码文本为函数调用
- 在事件监听器中添加更新逻辑

## 注意事项

1. **保持图表动画禁用**: 所有图表更新都使用 `update('none')` 参数
2. **测试多次切换**: 确保语言切换多次后仍然正常工作
3. **检查控制台**: 确认没有JavaScript错误
4. **验证图表交互**: 确保鼠标悬停提示、图例点击等功能正常

## 相关文件

- `touchscreen/history.html` - 历史页面主文件(已修复)
- `touchscreen/touchscreen-i18n.js` - 国际化核心库
- `touchscreen/common-header-scripts.js` - 语言切换逻辑
- `touchscreen/fix_history_i18n.js` - 自动修复脚本(可删除)

## 修复日期
2026-01-12

## 修复状态
✅ 已完成并验证
