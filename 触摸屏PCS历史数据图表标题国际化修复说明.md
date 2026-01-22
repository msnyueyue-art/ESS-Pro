# 触摸屏PCS历史数据图表标题国际化修复说明

## 修复日期
2026-01-15

## 问题描述
在触摸屏系统的英文环境下，数据页 → PCS → 历史数据标签页中，三个图表标题仍然显示为中文：
1. "PCS功率转换历史"
2. "电压电流趋势"
3. "转换效率分析"

这些标题已经添加了 `data-i18n` 属性，但HTML中的默认文本使用了中文，导致英文环境下未正确显示英文标题。

## 根本原因
在 [touchscreen/data.html](touchscreen/data.html) 文件中，这三个标题的默认文本设置为中文：
- 第2899行：`<span data-i18n="pcsPowerConversionHistory">PCS功率转换历史</span>`
- 第2922行：`<span data-i18n="voltageCurrentTrend">电压电流趋势</span>`
- 第2945行：`<span data-i18n="conversionEfficiencyAnalysis">转换效率分析</span>`

按照项目国际化规范，HTML默认应该使用英文文本，然后通过国际化系统在中文环境下转换为中文。

## 修复方案

### 修改文件
- **文件**: [touchscreen/data.html](touchscreen/data.html:2899)

### 修复内容
将三个图表标题的默认文本从中文改为英文：

1. **PCS功率转换历史** → **PCS Power Conversion History**
   ```html
   <!-- 修复前 -->
   <span data-i18n="pcsPowerConversionHistory">PCS功率转换历史</span>

   <!-- 修复后 -->
   <span data-i18n="pcsPowerConversionHistory">PCS Power Conversion History</span>
   ```

2. **电压电流趋势** → **Voltage & Current Trend**
   ```html
   <!-- 修复前 -->
   <span data-i18n="voltageCurrentTrend">电压电流趋势</span>

   <!-- 修复后 -->
   <span data-i18n="voltageCurrentTrend">Voltage & Current Trend</span>
   ```

3. **转换效率分析** → **Conversion Efficiency Analysis**
   ```html
   <!-- 修复前 -->
   <span data-i18n="conversionEfficiencyAnalysis">转换效率分析</span>

   <!-- 修复后 -->
   <span data-i18n="conversionEfficiencyAnalysis">Conversion Efficiency Analysis</span>
   ```

## 验证国际化配置
在 [touchscreen/touchscreen-i18n.js](touchscreen/touchscreen-i18n.js) 中，这三个翻译键已正确配置：

```javascript
// 中文翻译
zh: {
    pcsPowerConversionHistory: 'PCS功率转换历史',  // 第189行
    voltageCurrentTrend: '电压电流趋势',           // 第190行
    conversionEfficiencyAnalysis: '转换效率分析'   // 第191行
}

// 英文翻译
en: {
    pcsPowerConversionHistory: 'PCS Power Conversion History',  // 第802行
    voltageCurrentTrend: 'Voltage & Current Trend',             // 第803行
    conversionEfficiencyAnalysis: 'Conversion Efficiency Analysis' // 第804行
}
```

## 测试验证

### 英文环境测试
1. 设置语言为英文
2. 导航至：数据页 → PCS → 历史数据标签页
3. 验证三个图表标题显示为：
   - ✅ PCS Power Conversion History
   - ✅ Voltage & Current Trend
   - ✅ Conversion Efficiency Analysis

### 中文环境测试
1. 切换语言为中文
2. 导航至：数据页 → PCS → 历史数据标签页
3. 验证三个图表标题显示为：
   - ✅ PCS功率转换历史
   - ✅ 电压电流趋势
   - ✅ 转换效率分析

## 技术说明

### 国际化工作原理
1. **HTML默认文本**：设置为英文（项目标准）
2. **data-i18n属性**：指定翻译键
3. **语言切换时**：
   - 英文环境：保持HTML默认英文文本（无需翻译）
   - 中文环境：通过 `applyTouchscreenTranslations()` 函数查找翻译键并替换为中文

### 相关代码
```javascript
// touchscreen-i18n.js 中的翻译应用函数
function applyTouchscreenTranslations() {
    const lang = getTouchscreenLang();

    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        const translation = touchscreenTranslations[lang][key];
        if (translation) {
            elem.textContent = translation;
        }
    });
}
```

## 影响范围
- **影响页面**：触摸屏数据页面 PCS 历史数据标签页
- **影响组件**：3个图表容器的标题
- **用户影响**：英文用户现在可以看到正确的英文标题
- **向后兼容**：✅ 完全兼容，中文环境下仍然正常显示中文

## 注意事项
1. ✅ 未引入新的依赖或代码
2. ✅ 未修改国际化翻译配置
3. ✅ 遵循项目国际化规范（HTML默认英文）
4. ✅ 保持语言切换功能正常工作
5. ✅ 不影响其他页面和组件

## 修复命令
```bash
# 在 touchscreen 目录下执行
sed -i '2899s/PCS功率转换历史/PCS Power Conversion History/' data.html
sed -i '2922s/电压电流趋势/Voltage \& Current Trend/' data.html
sed -i '2945s/转换效率分析/Conversion Efficiency Analysis/' data.html
```

## 总结
本次修复解决了触摸屏系统 PCS 历史数据页面三个图表标题在英文环境下显示中文的问题。通过将HTML默认文本从中文改为英文，确保了国际化系统的正确工作，同时保持了中英文环境下的显示正确性。修复方法简单直接，符合项目现有的国际化架构规范。
