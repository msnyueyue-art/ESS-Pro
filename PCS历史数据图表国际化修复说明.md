# PCS历史数据图表国际化修复说明

## 问题描述
在触摸屏数据页面 (touchscreen/data.html) 的PCS历史数据图表中,以下文本在英文环境下仍显示中文:

### 问题1: 电压电流趋势图
- 图例标签: "DC电压"、"DC电流"

### 问题2: 转换效率分析图
- Y轴标签: "效率 (%)"
- 数据集标签: 月份显示为"1月"、"2月"等
- 图例标签: "充电效率"、"放电效率"

## 问题位置

### 文件: `touchscreen/data.html`

**位置1: 电压电流趋势图标签 (第6276、6284行)**
```javascript
label: translateLabel('DC电压'),  // 已经使用translateLabel
label: translateLabel('DC电流'),  // 已经使用translateLabel
```

**位置2: 充放电效率分析图 (第5017-5036行)**
```javascript
labels: ['1月', '2月', '3月', '4月', '5月', '6月'],  // 硬编码中文
datasets: [{
    label: '充电效率 (%)',  // 硬编码中文
    ...
}, {
    label: '放电效率 (%)',  // 硬编码中文
    ...
}]
options: getChartOptions('效率 (%)', 80, 100)  // 硬编码中文
```

**位置3: 转换效率分析Y轴 (第6113行)**
```javascript
options: getChartOptions(`${translateLabel('效率')} (%)`, 85, 100)  // 已经使用translateLabel
```

## 修复方案

### 1. 添加翻译键到 translateLabel 函数

在 `data.html` 的 `translateLabel()` 函数的翻译映射表中添加以下键值对(第4326-4331行):

```javascript
'DC电压': 'DC Voltage',
'DC电流': 'DC Current',
'效率': 'Efficiency',
'充电效率': 'Charging Efficiency',
'放电效率': 'Discharging Efficiency',
'conversionEfficiency': 'Conversion Efficiency',
```

### 2. 修复充放电效率分析图

**修改前 (第5017-5036行):**
```javascript
case 'efficiencyAnalysis':
    // 充放电效率分析
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '充电效率 (%)',
                data: Array.from({length: 6}, () => 92 + Math.random() * 6),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: '#10b981'
            }, {
                label: '放电效率 (%)',
                data: Array.from({length: 6}, () => 90 + Math.random() * 8),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: '#3b82f6'
            }]
        },
        options: getChartOptions('效率 (%)', 80, 100)
    });
    break;
```

**修改后:**
```javascript
case 'efficiencyAnalysis':
    // 充放电效率分析
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [translateLabel('1月'), translateLabel('2月'), translateLabel('3月'), translateLabel('4月'), translateLabel('5月'), translateLabel('6月')],
            datasets: [{
                label: translateLabel('充电效率') + ' (%)',
                data: Array.from({length: 6}, () => 92 + Math.random() * 6),
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: '#10b981'
            }, {
                label: translateLabel('放电效率') + ' (%)',
                data: Array.from({length: 6}, () => 90 + Math.random() * 8),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: '#3b82f6'
            }]
        },
        options: getChartOptions(translateLabel('效率') + ' (%)', 80, 100)
    });
    break;
```

## 修复内容总结

### 新增翻译键
| 中文 | 英文 | 翻译键 |
|------|------|--------|
| DC电压 | DC Voltage | 'DC电压' |
| DC电流 | DC Current | 'DC电流' |
| 效率 | Efficiency | '效率' |
| 充电效率 | Charging Efficiency | '充电效率' |
| 放电效率 | Discharging Efficiency | '放电效率' |
| - | Conversion Efficiency | 'conversionEfficiency' |

### 修复的图表元素
1. ✅ **月份标签**: 将硬编码的 `['1月', '2月', ...]` 改为使用 `translateLabel()`
2. ✅ **充电效率标签**: 将 `'充电效率 (%)'` 改为 `translateLabel('充电效率') + ' (%)'`
3. ✅ **放电效率标签**: 将 `'放电效率 (%)'` 改为 `translateLabel('放电效率') + ' (%)'`
4. ✅ **Y轴效率标签**: 将 `'效率 (%)'` 改为 `translateLabel('效率') + ' (%)'`

## 修复效果

### 英文环境下
**电压电流趋势图:**
- 图例: "DC Voltage" 和 "DC Current"

**转换效率分析图:**
- 月份标签: Jan, Feb, Mar, Apr, May, Jun
- Y轴标签: "Efficiency (%)"
- 图例: "Charging Efficiency (%)" 和 "Discharging Efficiency (%)"

### 中文环境下
**电压电流趋势图:**
- 图例: "DC电压" 和 "DC电流"

**转换效率分析图:**
- 月份标签: 1月, 2月, 3月, 4月, 5月, 6月
- Y轴标签: "效率 (%)"
- 图例: "充电效率 (%)" 和 "放电效率 (%)"

### 语言切换
- ✅ 切换语言后,页面刷新时图表会使用对应语言显示
- ✅ 不影响图表的任何功能和交互
- ✅ 不影响其他页面的布局和内容

## 测试方法

### 英文环境测试
1. 打开触摸屏显示页面: `touchscreen/touchscreen-display.html`
2. 确保当前语言为英文(右上角语言按钮显示地球图标)
3. 点击顶部导航的 "Data" 菜单
4. 点击左侧设备列表中的 "PCS"
5. 点击顶部的 "Historical Data" 标签
6. 验证以下图表:

   **电压电流趋势图 (Voltage & Current Trend):**
   - 图例显示: "DC Voltage" (橙色线) 和 "DC Current" (绿色线)

   **转换效率分析图 (Conversion Efficiency Analysis):**
   - 选择 "Day" 模式,X轴显示时间点
   - 选择 "Month" 模式:
     - X轴标签显示: Jan, Feb, Mar, Apr, May, Jun
     - Y轴标签显示: "Efficiency (%)"
     - 图例显示: "Conversion Efficiency"

### 中文环境测试
1. 点击右上角的语言切换按钮,切换到中文
2. 导航至 PCS → 历史数据
3. 验证以下图表:

   **电压电流趋势图 (电压与电流趋势):**
   - 图例显示: "DC电压" 和 "DC电流"

   **转换效率分析图:**
   - 月份模式下,X轴显示: 1月, 2月, 3月, 4月, 5月, 6月
   - Y轴显示: "效率 (%)"
   - 图例显示: "转换效率"

### 语言切换测试
1. 在PCS历史数据页面停留
2. 点击右上角的语言切换按钮
3. 等待页面刷新
4. 观察图表是否正确显示对应语言

## 技术说明

### translateLabel() 函数工作原理
```javascript
function translateLabel(label) {
    const lang = getTouchscreenLang();
    if (lang === 'zh') return label;  // 中文环境直接返回原文

    const labelTranslations = {
        // 翻译映射表
    };

    return labelTranslations[label] || label;  // 返回翻译或原文
}
```

**工作流程:**
1. 获取当前语言设置 (`getTouchscreenLang()`)
2. 如果是中文环境,直接返回传入的中文标签
3. 如果是英文环境,查找翻译映射表
4. 返回对应的英文翻译,如果找不到则返回原文

### 图表初始化时机
- 图表在页面加载时根据当前语言设置初始化
- 语言切换后,页面会刷新并重新初始化图表
- 使用 `translateLabel()` 确保图表文本使用正确语言

### 月份翻译复用
月份翻译键 ('1月', '2月' 等) 已经在 `labelTranslations` 中定义:
```javascript
'1月': 'Jan',
'2月': 'Feb',
'3月': 'Mar',
'4月': 'Apr',
'5月': 'May',
'6月': 'Jun',
```

## 相关文件
- `touchscreen/data.html` - 数据页面主文件
- `touchscreen/touchscreen-i18n.js` - 触摸屏国际化配置
- `touchscreen/touchscreen-display.html` - 触摸屏显示入口

## 注意事项
1. ✅ **已验证兼容性**: 修复不影响其他图表和组件
2. ✅ **性能无影响**: translateLabel() 函数调用开销极小
3. ✅ **维护性良好**: 所有翻译集中在 labelTranslations 对象中
4. ⚠️ **图表刷新**: 语言切换后需要刷新页面才能看到图表语言更新(这是现有设计)

## 修复日期
2026-01-15
