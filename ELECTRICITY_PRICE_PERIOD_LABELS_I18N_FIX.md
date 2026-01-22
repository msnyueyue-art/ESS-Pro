# 电价设置预设模板时段标签国际化修复

## 修复时间
2025-01-10

## 修复概述

为预设电价模板卡片中的时段标签添加了完整的英文翻译支持,确保在英文环境下时段标签可以正确显示英文。

## 修复内容

### 1. 扩展模板翻译映射表 ✅

**位置:** [electricity-price-new.html:1865-1898](electricity-price-new.html#L1865-L1898)

**新增时段标签翻译:**
```javascript
// 时段标签
'尖峰': {
    en: 'Sharp Peak',
    zh: '尖峰'
},
'尖时段': {
    en: 'Sharp Peak Period',
    zh: '尖时段'
},
'峰时段': {
    en: 'Peak Period',
    zh: '峰时段'
},
'高峰': {
    en: 'Peak',
    zh: '高峰'
},
'平时段': {
    en: 'Flat Period',
    zh: '平时段'
},
'平段': {
    en: 'Flat',
    zh: '平段'
},
'谷时段': {
    en: 'Valley Period',
    zh: '谷时段'
},
'低谷': {
    en: 'Valley',
    zh: '低谷'
}
```

### 2. 修改时段标签渲染逻辑 ✅

**位置:** [electricity-price-new.html:2774](electricity-price-new.html#L2774)

**修改前:**
```javascript
return `<span class="badge ${badgeClass} preset-period-tag">${p.name}</span>`;
```

**修改后:**
```javascript
return `<span class="badge ${badgeClass} preset-period-tag">${getTemplateI18nText(p.name)}</span>`;
```

**效果:** 时段标签现在会根据语言环境动态显示翻译文本

## 翻译对照表

### 时段标签翻译

| 中文 | English |
|------|---------|
| 尖峰 | Sharp Peak |
| 尖时段 | Sharp Peak Period |
| 峰时段 | Peak Period |
| 高峰 | Peak |
| 平时段 | Flat Period |
| 平段 | Flat |
| 谷时段 | Valley Period |
| 低谷 | Valley |

## 修改统计

### electricity-price-new.html
- 新增时段标签翻译: 8个
- 修改时段标签渲染: 1处

### 无需修改 common.js
- 这些翻译存储在页面内部的 `templateI18n` 对象中

## 完整的国际化效果

现在在英文环境下,预设模板卡片将完整显示为:

**中文预设模板示例:**
```
┌──────────────────────────────────────┐
│ 江苏峰谷平尖电价          分时电价   │
│ 适用于江苏地区工商业用电，包含尖峰平谷四个时段 │
│ [尖时段] [峰时段] [平时段] [谷时段]  │
└──────────────────────────────────────┘
```

**英文预设模板示例:**
```
┌──────────────────────────────────────┐
│ Jiangsu Peak-Valley-Flat-Sharp...  Time-of-Use │
│ For commercial and industrial use in Jiangsu, includes... │
│ [Sharp Peak Period] [Peak Period] [Flat Period] [Valley Period] │
└──────────────────────────────────────┘
```

## 使用的时段标签

在预设模板数据中,使用了以下8种时段标签:

### 1. 江苏峰谷平尖电价
- 尖时段 (Sharp Peak Period)
- 峰时段 (Peak Period)
- 平时段 (Flat Period)
- 谷时段 (Valley Period)

### 2. 广东分时电价
- 高峰 (Peak)
- 低谷 (Valley)

### 3. 浙江峰谷电价
- 尖时段 (Sharp Peak Period)
- 峰时段 (Peak Period)
- 平时段 (Flat Period)
- 谷时段 (Valley Period)

### 4. 北京峰谷电价
- 峰时段 (Peak Period)
- 平时段 (Flat Period)
- 谷时段 (Valley Period)

### 5. 其他模板数据
- 尖峰 (Sharp Peak) - 用于内部数据
- 高峰 (Peak) - 用于内部数据
- 平段 (Flat) - 用于内部数据
- 低谷 (Valley) - 用于内部数据

## 测试建议

### 1. 中文环境测试
- ✅ 打开电价设置页面
- ✅ 点击"新建规则" → "从模板创建"
- ✅ 检查预设模板卡片中的时段标签显示中文（如"尖时段"、"峰时段"等）
- ✅ 检查所有预设模板的标签正确显示

### 2. 英文环境测试
切换到英文后：
- ✅ 打开"New Rule" → "Create from Template"
- ✅ 检查预设模板卡片中的时段标签显示英文（如"Sharp Peak Period"、"Peak Period"等）
- ✅ 验证所有8种时段标签都有正确的英文翻译
- ✅ 检查"无时段划分"显示为"No time periods"

### 3. 各预设模板测试
在英文环境下验证每个预设模板:

#### 江苏峰谷平尖电价
- ✅ 标题: "Jiangsu Peak-Valley-Flat-Sharp Pricing"
- ✅ 描述: "For commercial and industrial use in Jiangsu, includes..."
- ✅ 标签: Sharp Peak Period, Peak Period, Flat Period, Valley Period

#### 广东分时电价
- ✅ 标题: "Guangdong Time-of-Use Pricing"
- ✅ 描述: "For commercial use in Guangdong, divided into..."
- ✅ 标签: Peak, Valley

#### 浙江峰谷电价
- ✅ 标题: "Zhejiang Peak-Valley Pricing"
- ✅ 描述: "For commercial and industrial use in Zhejiang"
- ✅ 标签: Sharp Peak Period, Peak Period, Flat Period, Valley Period

#### 北京峰谷电价
- ✅ 标题: "Beijing Peak-Valley Pricing"
- ✅ 描述: "For commercial and industrial use in Beijing"
- ✅ 标签: Peak Period, Flat Period, Valley Period

#### 固定电价模版
- ✅ 标题: "Fixed Price Template"
- ✅ 描述: "For residential use or scenarios without time periods"
- ✅ 标签: No time periods

### 4. 动态切换测试
- ✅ 在中文环境下打开预设模板弹窗
- ✅ 切换到英文，验证所有时段标签更新为英文
- ✅ 再切换回中文，验证恢复正常

### 5. 功能测试
确保翻译不影响功能:
- ✅ 选择预设模板，卡片高亮正常
- ✅ 点击"应用"按钮，模板应用正常
- ✅ 应用后的模板数据保存正确

## 浏览器缓存清除

修改完成后,请使用以下方式清除浏览器缓存:

**Windows/Linux:**
- `Ctrl + F5` 或 `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

## 完成状态

✅ **全部完成** - 电价设置预设模板页面已完全支持国际化

现在所有内容都已完整翻译,包括:
- ✅ 模板标题（Modal title: "选择预设模版(购电)" → "Select Preset Template (Consumption)"）
- ✅ 模板名称（如"江苏峰谷平尖电价" → "Jiangsu Peak-Valley-Flat-Sharp Pricing"）
- ✅ 模板描述
- ✅ 电价类型标签
- ✅ **时段标签（如"尖时段" → "Sharp Peak Period"）** ← 本次修复重点
- ✅ 操作按钮

## 技术说明

### 为什么使用 getTemplateI18nText() 而不是 getTranslation()?

1. **数据与界面分离**: 时段标签是模板数据的一部分,不是固定的界面文本
2. **统一管理**: 所有模板相关的翻译集中在 `templateI18n` 对象中
3. **便于维护**: 数据翻译与数据定义在同一文件中,方便查找和修改
4. **避免污染**: 不增加 common.js 的体积,保持全局翻译对象的纯粹性

### 扩展性

如果将来需要添加更多时段标签翻译:
1. 在 `templateI18n` 对象中添加新的键值对
2. 格式保持一致: `'中文': { en: 'English', zh: '中文' }`
3. `getTemplateI18nText()` 函数会自动处理新增的翻译

## 总结

此次修复完成了电价设置页面国际化的**最后一块拼图**,现在整个页面的所有文本内容都支持中英文切换,包括:

- 页面标题和导航
- 表格表头和数据
- 操作按钮
- 电价类型标签
- 模板名称和描述
- **时段标签** ← 本次修复
- 弹窗标题
- 表单占位符
- 单位文本

用户可以在中英文环境下无缝使用所有功能,获得完整的国际化体验。
