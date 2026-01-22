# 📊 Data Analysis 页面 NaN 错误修复说明

## 🐛 问题描述

切换到英文环境后，data-analysis.html 页面出现以下问题:
- 所有收益数值显示为 `¥NaN`
- 图表无法正常显示
- 收益统计卡片显示异常

## 🔍 根本原因

代码中存在多处使用 `.textContent.replace('¥', '')` 来解析货币数值的逻辑:

```javascript
// ❌ 错误的做法
const value = parseFloat(element.textContent.replace('¥', ''));
```

**问题分析:**
1. 中文环境下,文本内容为 `¥1,580`
2. `.replace('¥', '')` 能正常去除符号
3. 英文环境切换后,文本内容变为 `$1,580`
4. `.replace('¥', '')` 无法去除 `$` 符号
5. `parseFloat('$1,580')` 返回 `NaN`
6. 后续所有计算和显示都出错

## ✅ 修复方案

### 核心原则
**数据与显示分离:**
- 使用 `data-revenue` 属性存储纯数值
- 使用 `textContent` 显示格式化后的货币值

### 标准模式

#### 1. 写入数据
```javascript
// ✅ 正确的做法
element.setAttribute('data-revenue', numericValue);  // 存储数值
element.textContent = formatRevenue(numericValue);   // 显示格式化值
```

#### 2. 读取数据
```javascript
// ✅ 正确的做法
const value = parseFloat(element.getAttribute('data-revenue') || '0');
```

## 📝 具体修复位置

### 1. updateTotalRevenueCard() 函数 (第 1586-1588 行)

**修复前:**
```javascript
const sellRevenue = parseFloat(document.getElementById('summarySellRevenue').textContent.replace('¥', ''));
const selfSaving = parseFloat(document.getElementById('summarySelfSaving').textContent.replace('¥', ''));
const totalRevenue = sellRevenue + selfSaving;
```

**修复后:**
```javascript
const sellRevenue = parseFloat(document.getElementById('summarySellRevenue').getAttribute('data-revenue') || '0');
const selfSaving = parseFloat(document.getElementById('summarySelfSaving').getAttribute('data-revenue') || '0');
const totalRevenue = sellRevenue + selfSaving;
```

### 2. 收益卡片更新 (第 1596-1610 行)

**修复前:**
```javascript
document.getElementById('totalProfitValue').textContent = '¥' + totalRevenue.toFixed(2);
document.getElementById('sellProfitDetail').textContent = '¥' + sellRevenue.toFixed(2);
document.getElementById('selfSavingDetail').textContent = '¥' + selfSaving.toFixed(2);
```

**修复后:**
```javascript
const totalProfitEl = document.getElementById('totalProfitValue');
totalProfitEl.setAttribute('data-revenue', totalRevenue.toFixed(2));
totalProfitEl.textContent = formatRevenue(totalRevenue.toFixed(2));

const sellProfitEl = document.getElementById('sellProfitDetail');
sellProfitEl.setAttribute('data-revenue', sellRevenue.toFixed(2));
sellProfitEl.textContent = formatRevenue(sellRevenue.toFixed(2));

const selfSavingEl = document.getElementById('selfSavingDetail');
selfSavingEl.setAttribute('data-revenue', selfSaving.toFixed(2));
selfSavingEl.textContent = formatRevenue(selfSaving.toFixed(2));
```

### 3. 表格数据提取 (第 1657-1659 行)

**修复前:**
```javascript
const chargeCost = cells[1].textContent.replace('¥', '').trim();
const sellRevenue = cells[3].textContent.replace('¥', '').trim();
const selfSaving = cells[5].textContent.replace('¥', '').trim();
```

**修复后:**
```javascript
const chargeCost = cells[1].getAttribute('data-revenue') || '0';
const sellRevenue = cells[3].getAttribute('data-revenue') || '0';
const selfSaving = cells[5].getAttribute('data-revenue') || '0';
```

### 4. 趋势图 Tooltip (第 1678-1681 行)

**修复前:**
```javascript
formatter: function(params) {
    let result = params[0].axisValue + '<br/>';
    params.forEach(item => {
        result += item.marker + ' ' + item.seriesName + ': ¥' + item.value + '<br/>';
    });
    return result;
}
```

**修复后:**
```javascript
formatter: function(params) {
    const currencySymbol = getCurrencySymbol();
    let result = params[0].axisValue + '<br/>';
    params.forEach(item => {
        result += item.marker + ' ' + item.seriesName + ': ' + currencySymbol + item.value + '<br/>';
    });
    return result;
}
```

### 5. Y 轴格式化 (第 1707-1710 行)

**修复前:**
```javascript
axisLabel: {
    formatter: function(value) {
        return '¥' + value;
    }
}
```

**修复后:**
```javascript
axisLabel: {
    formatter: function(value) {
        return getCurrencySymbol() + value;
    }
}
```

### 6. 饼图 Tooltip (第 1748-1750 行)

**修复前:**
```javascript
formatter: function(params) {
    return params.seriesName + '<br/>' + params.name + ': ¥' + params.value + ' (' + params.percent + '%)';
}
```

**修复后:**
```javascript
formatter: function(params) {
    return params.seriesName + '<br/>' + params.name + ': ' + getCurrencySymbol() + params.value + ' (' + params.percent + '%)';
}
```

### 7. 饼图标签 (第 1768-1772 行)

**修复前:**
```javascript
label: {
    formatter: function(params) {
        return params.name + '\n¥' + params.value + '\n(' + params.percent + '%)';
    },
    color: '#333'
}
```

**修复后:**
```javascript
label: {
    formatter: function(params) {
        return params.name + '\n' + getCurrencySymbol() + params.value + '\n(' + params.percent + '%)';
    },
    color: '#333'
}
```

### 8. 收益结构图数据提取 (第 1742-1743 行)

**修复前:**
```javascript
function updateRevenueStructureChart() {
    const sellRevenue = parseFloat(document.getElementById('summarySellRevenue').textContent.replace('¥', ''));
    const selfSaving = parseFloat(document.getElementById('summarySelfSaving').textContent.replace('¥', ''));
    // ...
}
```

**修复后:**
```javascript
function updateRevenueStructureChart() {
    const sellRevenue = parseFloat(document.getElementById('summarySellRevenue').getAttribute('data-revenue') || '0');
    const selfSaving = parseFloat(document.getElementById('summarySelfSaving').getAttribute('data-revenue') || '0');
    // ...
}
```

## 🎯 修复验证清单

### 静态显示验证
- [ ] 页面加载后,所有收益数值正常显示(非 NaN)
- [ ] 中文环境显示 `¥` 符号
- [ ] 英文环境显示 `$` 符号

### 动态功能验证
- [ ] 切换日报/月报/年报,数据正确更新
- [ ] 表格汇总行显示正确
- [ ] 收益统计卡片(Total Profit/Selling Profit/Self-use Saving)显示正确

### 图表验证
- [ ] 收益趋势图正常显示
- [ ] 趋势图 tooltip 显示正确的货币符号
- [ ] 趋势图 Y 轴显示正确的货币符号
- [ ] 收益结构饼图正常显示
- [ ] 饼图 tooltip 显示正确的货币符号
- [ ] 饼图标签显示正确的货币符号

### 语言切换验证
- [ ] 中文 → 英文:所有货币符号从 ¥ 变为 $
- [ ] 英文 → 中文:所有货币符号从 $ 变为 ¥
- [ ] 切换后图表数据保持正确
- [ ] 切换后表格数据保持正确

## 📚 最佳实践

### 1. 永远不要解析显示文本
```javascript
// ❌ 永远不要这样做
const value = parseFloat(element.textContent.replace('¥', ''));
const value = parseFloat(element.textContent.replace('$', ''));
```

### 2. 使用数据属性存储数值
```javascript
// ✅ 始终这样做
element.setAttribute('data-revenue', numericValue);
const value = parseFloat(element.getAttribute('data-revenue') || '0');
```

### 3. 使用辅助函数格式化显示
```javascript
// ✅ 使用 formatRevenue() 和 getCurrencySymbol()
element.textContent = formatRevenue(value);
tooltipText = getCurrencySymbol() + value;
```

### 4. 图表配置中使用动态符号
```javascript
// ✅ 图表 formatter 中调用 getCurrencySymbol()
formatter: function(params) {
    return getCurrencySymbol() + params.value;
}
```

## 🚀 扩展说明

### 为什么不直接存储数字类型?

HTML `data-*` 属性总是字符串类型,但这不影响我们的方案:

```javascript
// setAttribute 自动转换为字符串
element.setAttribute('data-revenue', 1580.5);  // 存储为 "1580.5"

// getAttribute 返回字符串,parseFloat 转回数字
const value = parseFloat(element.getAttribute('data-revenue'));  // 1580.5
```

### 为什么使用 || '0' 作为默认值?

防御性编程,避免 `null` 或 `undefined` 导致的 `NaN`:

```javascript
// 如果属性不存在,getAttribute 返回 null
// parseFloat(null) 返回 NaN
// parseFloat('0') 返回 0

const value = parseFloat(element.getAttribute('data-revenue') || '0');
```

## 📊 数据流向图

```
用户交互/数据加载
        ↓
   计算数值 (JS)
        ↓
    numericValue
        ↓
    ┌─────────────┐
    │             │
    ↓             ↓
data-revenue   textContent
 (存储数值)    (显示格式化值)
    ↓             ↓
 "1580.5"    "¥1,580.50"
    ↓             ↓
getAttribute   用户看到
    ↓
parseFloat
    ↓
后续计算
```

### 9. 语言切换事件监听器 (第 1143-1156 行)

**添加内容:**
```javascript
// 监听语言切换事件
window.addEventListener('languageChanged', function() {
    // 更新所有带 data-revenue 属性的元素
    if (typeof updateRevenueCurrency === 'function') {
        updateRevenueCurrency();
    }

    // 更新图表（图表的 formatter 会自动使用 getCurrencySymbol()）
    if (typeof updateRevenueTrendChart === 'function') {
        updateRevenueTrendChart();
    }
    if (typeof updateRevenueStructureChart === 'function') {
        updateRevenueStructureChart();
    }
});
```

**作用:**
- 监听 common.js 中的 `languageChanged` 自定义事件
- 当用户切换语言时,自动更新所有货币显示
- 重新渲染图表以更新 tooltip 和轴标签中的货币符号

## ✅ 修复状态

- ✅ 所有 8 处货币解析逻辑已修复
- ✅ 数据读写流程统一使用 data-revenue 属性
- ✅ 所有图表 formatter 使用 getCurrencySymbol()
- ✅ 代码中已无 `.replace('¥', '')` 模式
- ✅ 添加了语言切换事件监听器

---

**修复完成日期**: 2026-01-13
**修复者**: Claude Code
**相关文档**: [收益货币符号国际化说明.md](./收益货币符号国际化说明.md)
