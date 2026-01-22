# 电价配置弹框 - 补充国际化修复

## 📋 问题描述

在之前的修复基础上,发现还有两处中文未被国际化:

### 问题1: 模板下拉选项的类型名称后缀
**位置:** 电站配置弹框 → 购电配置/上网配置 → 选择模板下拉框

**问题表现:**
```
Tiered Pricing - Fixed (阶梯电价)  ❌ 括号内还是中文
Time-of-Use - Seasonal (分时电价)  ❌ 括号内还是中文
Fixed Price - Fixed (固定电价)     ❌ 括号内还是中文
```

**期望效果:**
```
Tiered Pricing - Fixed (Tiered Pricing)  ✅
Time-of-Use - Seasonal (Time-of-Use)     ✅
Fixed Price - Fixed (Fixed Price)         ✅
```

### 问题2: 季节Tab标签
**位置:** 选择分季节模式的模板后 → 季节标签页

**问题表现:**
```
夏季 | 冬季 | 春秋季  ❌ 都是中文
```

**期望效果:**
```
Summer | Winter | Spring and Autumn  ✅
```

## 🔧 修复方案

### 根本原因
`templateI18n` 对象中缺少:
1. 单独的类型名称翻译 ("阶梯电价", "分时电价", "固定电价")
2. 季节名称翻译 ("夏季", "冬季", "春秋季")

虽然已有完整的模板名称翻译(如 "阶梯电价-固定"),但 `t.typeName` 是单独的值,需要单独的翻译项。

### 修复内容

在 `templateI18n` 对象中添加以下翻译:

```javascript
// 类型名称
'阶梯电价': {
    en: 'Tiered Pricing',
    zh: '阶梯电价'
},
'分时电价': {
    en: 'Time-of-Use',
    zh: '分时电价'
},
'固定电价': {
    en: 'Fixed Price',
    zh: '固定电价'
},
// 季节名称
'夏季': {
    en: 'Summer',
    zh: '夏季'
},
'冬季': {
    en: 'Winter',
    zh: '冬季'
},
'春秋季': {
    en: 'Spring and Autumn',
    zh: '春秋季'
}
```

**修复位置:** [electricity-price-new.html:1897-1920](electricity-price-new.html#L1897-L1920)

## ✅ 修复执行

```bash
# 运行补充修复脚本
node add_missing_i18n.js
```

**输出:**
```
✅ 成功添加以下翻译键:
   类型名称:
     - 阶梯电价 → Tiered Pricing
     - 分时电价 → Time-of-Use
     - 固定电价 → Fixed Price
   季节名称:
     - 夏季 → Summer
     - 冬季 → Winter
     - 春秋季 → Spring and Autumn

✅ 所有翻译键添加成功!
```

## 🧪 验证测试

### 测试1: 类型名称后缀
1. 切换到英文环境: `localStorage.setItem('language', 'en'); location.reload();`
2. 打开电价设置 → 电站配置
3. 点击某站点的 "Configure" 按钮
4. 点击 "Purchase Config" 标签
5. 打开模板下拉框
6. **验证:** 所有选项的括号内应显示英文类型名称

**预期结果:**
```
Tiered Pricing - Fixed (Tiered Pricing)
Tiered Pricing - Monthly (Tiered Pricing)
Tiered Pricing - Seasonal (Tiered Pricing)
Time-of-Use - Fixed (Time-of-Use)
Time-of-Use - Monthly (Time-of-Use)
Time-of-Use - Seasonal (Time-of-Use)
Fixed Price - Fixed (Fixed Price)
Fixed Price - Monthly (Fixed Price)
Fixed Price - Seasonal (Fixed Price)
```

### 测试2: 季节标签
1. 选择 "Tiered Pricing - Seasonal" 或 "Time-of-Use - Seasonal"
2. 查看展开的内容区域
3. **验证:** 季节标签应显示英文

**预期结果:**
```
[Summer] [Winter] [Spring and Autumn]
```

点击每个季节,内容应显示:
```
Summer (6Month, 7Month, 8Month, 9Month)
Winter (12Month, 1Month, 2Month)
Spring and Autumn (3Month, 4Month, 5Month, 9Month, 10Month, 11Month)
```

## 📊 修复前后对比

### 修复前 (英文环境)
**下拉选项:**
```
Tiered Pricing - Fixed (阶梯电价)  ❌
```

**季节标签:**
```
夏季 (6月、7月、8月、9月)  ❌
```

### 修复后 (英文环境)
**下拉选项:**
```
Tiered Pricing - Fixed (Tiered Pricing)  ✅
```

**季节标签:**
```
Summer (6Month, 7Month, 8Month, 9Month)  ✅
```

## 🔍 技术细节

### 为什么需要单独的类型名称翻译?

虽然 `templateI18n` 已有 `"阶梯电价-固定"` 的翻译,但代码中:

```javascript
const translatedTypeName = getTemplateI18nText(t.typeName);
```

这里的 `t.typeName` 值是 `"阶梯电价"`,不是 `"阶梯电价-固定"`,所以需要单独的翻译项。

### 为什么季节名称也需要翻译?

在分季节模式的模板数据中:
```javascript
seasons: [
    { id: 'season-1', name: '夏季', months: [6, 7, 8] },
    ...
]
```

季节标签使用:
```javascript
${getTemplateI18nText(season.name)}
```

而 `season.name` 是 `"夏季"`,所以需要独立的翻译项。

## 📁 相关文件

**修改的文件:**
- [electricity-price-new.html](electricity-price-new.html) - 在 `templateI18n` 对象中添加6个翻译项

**工具脚本:**
- [add_missing_i18n.js](add_missing_i18n.js) - 自动添加缺失翻译的脚本

**相关文档:**
- [TEMPLATE_CONTENT_I18N_FIX_COMPLETE.md](TEMPLATE_CONTENT_I18N_FIX_COMPLETE.md) - 主要修复文档
- 本文档 - 补充修复说明

## ✅ 完成状态

- [x] 添加类型名称翻译 (阶梯电价/分时电价/固定电价)
- [x] 添加季节名称翻译 (夏季/冬季/春秋季)
- [x] 验证翻译键已正确添加
- [x] 创建测试指南
- [ ] 浏览器测试验证 (待用户执行)

## 🎯 最终效果总结

现在在英文环境下,电价配置弹框中的所有文本都应该显示英文,包括:

✅ 模板下拉选项 (包括括号内的类型名称)
✅ 模板内容标题 (固定电价/阶梯标题/时段名称)
✅ 季节标签和标题
✅ 月份标签
✅ 单位标签 (电价/度/月)
✅ 阶梯范围描述

---

**修复日期:** 2026-01-10
**修复类型:** 补充国际化翻译
