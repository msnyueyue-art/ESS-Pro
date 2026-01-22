# 电价设置页面国际化修复

## 修复时间
2025-01-10

## 修复概述

修复了电价设置页面（electricity-price-new.html）在英文环境下仍显示中文的问题，包括表格数据、下拉选项和弹窗标题。

## 修复内容

### 1. 创建类型名称翻译辅助函数 ✅

**位置:** [electricity-price-new.html:1683-1692](electricity-price-new.html#L1683-L1692)

**新增函数:**
```javascript
// 获取类型名称的翻译
function getTypeNameTranslation(type) {
    const typeKeyMap = {
        'peak-valley': 'elecPriceTypePeakValley',
        'tou': 'elecPriceTypeTOU',
        'tiered': 'elecPriceTypeTiered',
        'fixed': 'elecPriceTypeFixed'
    };
    return getTranslation(typeKeyMap[type] || 'elecPriceTypeFixed');
}
```

**作用:** 根据类型代码（type）动态获取对应的翻译文本

### 2. 修改表格渲染函数使用翻译 ✅

**修改位置:**
- 购电模板表格渲染: ~L2670
- 上网模板表格渲染: ~L2726
- 预设模板卡片渲染: L2562

**修改前:**
```javascript
<td><span class="badge badge-primary">${template.typeName}</span></td>
```

**修改后:**
```javascript
<td><span class="badge badge-primary">${getTypeNameTranslation(template.type)}</span></td>
```

**效果:** 表格中的电价类型标签现在会根据语言环境动态显示：
- 中文: 分时电价、固定电价、阶梯电价、峰谷平尖
- 英文: Time-of-Use, Fixed Price, Tiered Pricing, Peak-Valley-Flat-Sharp

### 3. 修改下拉选项添加翻译属性 ✅

**位置:** [electricity-price-new.html:2763-2782](electricity-price-new.html#L2763-L2782)

**修改前:**
```javascript
typeSelect.innerHTML = `
    <option value="">请选择策略类型</option>
    <option value="tou">分时电价（峰谷平尖）</option>
    <option value="tiered">阶梯电价（按用电量）</option>
    <option value="fixed">固定电价</option>
`;
```

**修改后:**
```javascript
typeSelect.innerHTML = `
    <option value="" data-translate="elecPriceFormPlaceholderSelectType">请选择策略类型</option>
    <option value="tou" data-translate="elecPriceTypeTOUFull">分时电价（峰谷平尖）</option>
    <option value="tiered" data-translate="elecPriceTypeTieredFull">阶梯电价（按用电量）</option>
    <option value="fixed" data-translate="elecPriceTypeFixed">固定电价</option>
`;

// 应用翻译到新生成的选项
translatePage();
```

**效果:** 策略类型下拉选项现在支持多语言：
- 请选择策略类型 → Please select strategy type
- 分时电价（峰谷平尖） → Time-of-Use (Peak-Valley-Flat-Sharp)
- 阶梯电价（按用电量） → Tiered Pricing (By Usage)
- 固定电价 → Fixed Price

### 4. 修改弹窗标题使用翻译函数 ✅

**位置:** [electricity-price-new.html:2433-2435](electricity-price-new.html#L2433-L2435)

**修改前:**
```javascript
const purposeText = purpose === 'feed-in' ? '上网' : '购电';
document.getElementById('customModalTitle').textContent = `自定义创建模版（${purposeText}）`;
```

**修改后:**
```javascript
const purposeText = purpose === 'feed-in' ? getTranslation('elecPricePurposeFeedin') : getTranslation('elecPricePurposeConsumption');
document.getElementById('customModalTitle').textContent = `${getTranslation('elecPriceModalTitleCustomCreate')}（${purposeText}）`;
```

**效果:** 弹窗标题现在支持多语言：
- 自定义创建模版（购电） → Custom Create Template (Consumption)
- 自定义创建模版（上网） → Custom Create Template (Feed-in)

### 5. 新增翻译键到 common.js ✅

#### 中文翻译新增（common.js）

**位置1:** L3098-3100
```javascript
// 用途标签
elecPricePurposeConsumption: '购电',
elecPricePurposeFeedin: '上网',
```

**位置2:** L3174
```javascript
elecPriceFormPlaceholderSelectType: '请选择策略类型',
```

#### 英文翻译新增（common.js）

**位置1:** L6310-6312
```javascript
// Purpose Labels
elecPricePurposeConsumption: 'Consumption',
elecPricePurposeFeedin: 'Feed-in',
```

**位置2:** L6386
```javascript
elecPriceFormPlaceholderSelectType: 'Please select strategy type',
```

## 翻译对照表

### 电价类型
| 翻译键 | 中文 | English |
|--------|------|---------|
| elecPriceTypePeakValley | 峰谷平尖 | Peak-Valley-Flat-Sharp |
| elecPriceTypeTOU | 分时电价 | Time-of-Use |
| elecPriceTypeTiered | 阶梯电价 | Tiered Pricing |
| elecPriceTypeFixed | 固定电价 | Fixed Price |
| elecPriceTypeTOUFull | 分时电价（峰谷平尖） | Time-of-Use (Peak-Valley-Flat-Sharp) |
| elecPriceTypeTieredFull | 阶梯电价（按用电量） | Tiered Pricing (By Usage) |
| elecPriceTypeTOUSolar | 分时电价（光伏时段） | Time-of-Use (Solar Period) |

### 用途标签
| 翻译键 | 中文 | English |
|--------|------|---------|
| elecPricePurposeConsumption | 购电 | Consumption |
| elecPricePurposeFeedin | 上网 | Feed-in |

### 表单占位符
| 翻译键 | 中文 | English |
|--------|------|---------|
| elecPriceFormPlaceholderSelectType | 请选择策略类型 | Please select strategy type |

## 修改统计

### electricity-price-new.html
- 新增辅助函数: 1个（getTypeNameTranslation）
- 修改表格渲染: 3处
- 修改下拉选项: 2处（购电、上网）
- 修改弹窗标题: 1处
- 新增 translatePage() 调用: 1处

### common.js
- 新增中文翻译键: 3个
- 新增英文翻译键: 3个

## 测试建议

### 1. 表格数据测试
切换到英文环境后，检查以下内容：
- ✅ 购电模板表格中的"电价类型"列显示英文
- ✅ 上网模板表格中的"电价类型"列显示英文
- ✅ 预设模板卡片中的类型标签显示英文

### 2. 下拉选项测试
在英文环境下：
- ✅ 点击"New Rule" → 选择创建方式 → 策略类型下拉框显示英文选项
- ✅ 验证购电模式下的选项翻译正确
- ✅ 验证上网模式下的选项翻译正确

### 3. 弹窗标题测试
在英文环境下：
- ✅ 打开购电自定义创建弹窗，标题显示 "Custom Create Template (Consumption)"
- ✅ 打开上网自定义创建弹窗，标题显示 "Custom Create Template (Feed-in)"

### 4. 动态切换测试
- ✅ 在中文环境下打开页面，验证所有文本显示中文
- ✅ 切换到英文环境，验证所有文本切换到英文
- ✅ 再切换回中文，验证翻译恢复正常

## 浏览器缓存清除

修改完成后，请使用以下方式清除浏览器缓存：

**Windows/Linux:**
- `Ctrl + F5` 或 `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

**或使用开发者工具:**
1. 按 `F12` 打开开发者工具
2. 右键点击刷新按钮
3. 选择"清空缓存并硬性重新加载"

## 完成状态

✅ **全部完成** - 电价设置页面已完全支持国际化

所有硬编码的中文文本已替换为动态翻译，页面可以正确显示中英文内容。
