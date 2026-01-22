# 电价设置自定义创建弹窗国际化修复

## 修复时间
2025-01-10

## 修复概述

修复了自定义创建电价模板弹窗中的硬编码中文文本,包括弹窗标题和策略类型下拉选项。

## 修复内容

### 1. 修复弹窗标题翻译 ✅

**位置:** [electricity-price-new.html:2652-2660](electricity-price-new.html#L2652-L2660)

**问题:** 弹窗标题"自定义创建模版（购电）"在英文环境下仍显示中文

**修改前:**
```javascript
function openCustomTemplateModal(purpose) {
    closeCreateModeModal();

    // 根据模版用途设置动态标题
    const purposeText = purpose === 'feed-in' ? '上网' : '购电';
    document.getElementById('customModalTitle').textContent = `自定义创建模版（${purposeText}）`;
```

**修改后:**
```javascript
function openCustomTemplateModal(purpose) {
    closeCreateModeModal();

    // 根据模版用途设置动态标题
    const purposeText = purpose === 'feed-in' ?
        (getTranslation ? getTranslation('elecPricePurposeFeedin') : '上网') :
        (getTranslation ? getTranslation('elecPricePurposeConsumption') : '购电');
    const titleText = getTranslation ? getTranslation('elecPriceModalTitleCustomCreate') : '自定义创建模版';
    document.getElementById('customModalTitle').textContent = `${titleText}（${purposeText}）`;
```

**效果:**
- 中文: "自定义创建模版（购电）" / "自定义创建模版（上网）"
- 英文: "Custom Create Template (Consumption)" / "Custom Create Template (Feed-in)"

### 2. 修复策略类型下拉选项翻译 ✅

**位置:** [electricity-price-new.html:2996-3014](electricity-price-new.html#L2996-L3014)

**问题:** 策略类型下拉框的选项在英文环境下仍显示中文

#### 购电模式选项

**修改前:**
```javascript
if (purpose === 'consumption') {
    typeSelect.innerHTML = `
        <option value="">请选择策略类型</option>
        <option value="tou">分时电价（峰谷平尖）</option>
        <option value="tiered">阶梯电价（按用电量）</option>
        <option value="fixed">固定电价</option>
    `;
}
```

**修改后:**
```javascript
if (purpose === 'consumption') {
    typeSelect.innerHTML = `
        <option value="" data-translate="elecPriceFormPlaceholderSelectType">请选择策略类型</option>
        <option value="tou" data-translate="elecPriceTypeTOUFull">分时电价（峰谷平尖）</option>
        <option value="tiered" data-translate="elecPriceTypeTieredFull">阶梯电价（按用电量）</option>
        <option value="fixed" data-translate="elecPriceTypeFixed">固定电价</option>
    `;
}

// 应用翻译到新生成的选项
translatePage();
```

#### 上网模式选项

**修改前:**
```javascript
else if (purpose === 'feed-in') {
    typeSelect.innerHTML = `
        <option value="">请选择策略类型</option>
        <option value="fixed">固定电价</option>
        <option value="tou">分时电价（光伏时段）</option>
    `;
}
```

**修改后:**
```javascript
else if (purpose === 'feed-in') {
    typeSelect.innerHTML = `
        <option value="" data-translate="elecPriceFormPlaceholderSelectType">请选择策略类型</option>
        <option value="fixed" data-translate="elecPriceTypeFixed">固定电价</option>
        <option value="tou" data-translate="elecPriceTypeTOUSolar">分时电价（光伏时段）</option>
    `;
}

// 应用翻译到新生成的选项
translatePage();
```

**效果:**

购电模式:
- 中文: 请选择策略类型 → 分时电价（峰谷平尖）、阶梯电价（按用电量）、固定电价
- 英文: Please select strategy type → Time-of-Use (Peak-Valley-Flat-Sharp), Tiered Pricing (By Usage), Fixed Price

上网模式:
- 中文: 请选择策略类型 → 固定电价、分时电价（光伏时段）
- 英文: Please select strategy type → Fixed Price, Time-of-Use (Solar Period)

## 使用的翻译键

### 已存在的翻译键（common.js）

| 翻译键 | 中文 | English |
|--------|------|---------|
| elecPriceModalTitleCustomCreate | 自定义创建模版 | Custom Create Template |
| elecPricePurposeConsumption | 购电 | Consumption |
| elecPricePurposeFeedin | 上网 | Feed-in |
| elecPriceFormPlaceholderSelectType | 请选择策略类型 | Please select strategy type |
| elecPriceTypeTOUFull | 分时电价（峰谷平尖） | Time-of-Use (Peak-Valley-Flat-Sharp) |
| elecPriceTypeTieredFull | 阶梯电价（按用电量） | Tiered Pricing (By Usage) |
| elecPriceTypeFixed | 固定电价 | Fixed Price |
| elecPriceTypeTOUSolar | 分时电价（光伏时段） | Time-of-Use (Solar Period) |

## 修改统计

### electricity-price-new.html
- 修改函数: 2处
  - `openCustomTemplateModal()`: 弹窗标题翻译
  - `selectPurpose()`: 下拉选项翻译
- 新增 `translatePage()` 调用: 1处

### common.js
- 无需修改（翻译键已存在）

## 关键技术点

### 1. 动态标题组合

使用翻译函数动态组合标题:
```javascript
const purposeText = purpose === 'feed-in' ?
    (getTranslation ? getTranslation('elecPricePurposeFeedin') : '上网') :
    (getTranslation ? getTranslation('elecPricePurposeConsumption') : '购电');
const titleText = getTranslation ? getTranslation('elecPriceModalTitleCustomCreate') : '自定义创建模版';
document.getElementById('customModalTitle').textContent = `${titleText}（${purposeText}）`;
```

### 2. 动态生成的选项翻译

对于动态生成的 HTML 元素,需要:
1. 添加 `data-translate` 属性
2. 调用 `translatePage()` 应用翻译

```javascript
typeSelect.innerHTML = `
    <option value="" data-translate="elecPriceFormPlaceholderSelectType">请选择策略类型</option>
    <option value="tou" data-translate="elecPriceTypeTOUFull">分时电价（峰谷平尖）</option>
`;

// 应用翻译
translatePage();
```

### 3. 安全性保障

所有翻译调用都包含安全检查:
```javascript
getTranslation ? getTranslation('key') : '默认中文'
```

## 测试建议

### 1. 中文环境测试

打开自定义创建弹窗（购电）:
- ✅ 标题显示: "自定义创建模版（购电）"
- ✅ 策略类型选项:
  - 请选择策略类型
  - 分时电价（峰谷平尖）
  - 阶梯电价（按用电量）
  - 固定电价

打开自定义创建弹窗（上网）:
- ✅ 标题显示: "自定义创建模版（上网）"
- ✅ 策略类型选项:
  - 请选择策略类型
  - 固定电价
  - 分时电价（光伏时段）

### 2. 英文环境测试

打开自定义创建弹窗（购电）:
- ✅ 标题显示: "Custom Create Template (Consumption)"
- ✅ 策略类型选项:
  - Please select strategy type
  - Time-of-Use (Peak-Valley-Flat-Sharp)
  - Tiered Pricing (By Usage)
  - Fixed Price

打开自定义创建弹窗（上网）:
- ✅ 标题显示: "Custom Create Template (Feed-in)"
- ✅ 策略类型选项:
  - Please select strategy type
  - Fixed Price
  - Time-of-Use (Solar Period)

### 3. 动态切换测试

- ✅ 在中文环境下打开弹窗
- ✅ 切换到英文,验证标题和选项更新
- ✅ 再切换回中文,验证恢复正常

### 4. 功能测试

- ✅ 选择不同的策略类型,确认功能正常
- ✅ 填写表单,保存模板,确认数据正确
- ✅ 在购电和上网模式间切换,确认选项正确

## 浏览器缓存清除

修改完成后,请使用以下方式清除浏览器缓存:

**Windows/Linux:**
- `Ctrl + F5` 或 `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

## 完成状态

✅ **全部完成** - 自定义创建弹窗已完全支持国际化

现在所有内容都已完整翻译,包括:
- ✅ 弹窗标题（购电/上网）
- ✅ 策略类型下拉选项（购电模式3个选项）
- ✅ 策略类型下拉选项（上网模式2个选项）
- ✅ 占位符文本

## 相关修复

此次修复是电价设置页面国际化的补充,配合之前的修复:

1. [ELECTRICITY_PRICE_I18N_FIX.md](ELECTRICITY_PRICE_I18N_FIX.md) - 电价类型和预设模板弹窗标题
2. [ELECTRICITY_PRICE_TABLE_I18N_FIX.md](ELECTRICITY_PRICE_TABLE_I18N_FIX.md) - 表格按钮和单位
3. [ELECTRICITY_PRICE_TEMPLATE_DATA_I18N_FIX.md](ELECTRICITY_PRICE_TEMPLATE_DATA_I18N_FIX.md) - 模板数据
4. [ELECTRICITY_PRICE_PERIOD_LABELS_I18N_FIX.md](ELECTRICITY_PRICE_PERIOD_LABELS_I18N_FIX.md) - 时段标签
5. **ELECTRICITY_PRICE_CUSTOM_MODAL_I18N_FIX.md** ← 本次修复

共同实现了电价设置页面的**完整国际化支持**。

## 注意事项

### translatePage() 函数的作用

`translatePage()` 是全局翻译函数,用于:
- 查找页面中所有带 `data-translate` 属性的元素
- 根据当前语言(`currentLang`)应用对应的翻译
- 支持动态生成的元素

**使用场景:**
- 页面初始化时调用一次
- 语言切换时调用一次
- **动态生成带翻译属性的 HTML 后调用** ← 本次修复的关键

### 为什么需要调用 translatePage()?

因为下拉选项是通过 JavaScript 动态生成的:
```javascript
typeSelect.innerHTML = `<option data-translate="key">中文</option>`;
```

生成后的元素需要手动调用 `translatePage()` 才能应用翻译。

如果不调用,即使有 `data-translate` 属性,也不会自动翻译。
