# 电价配置弹框模板内容国际化修复方案

## 问题描述

在英文环境下,电价设置页面的"电站配置"标签中,点击"Configure"按钮打开配置弹框后:

1. **购电配置/上网配置** 标签下的**模板下拉选项**还显示中文
   - 例如: "阶梯电价-固定 (阶梯电价)"

2. **选择模板后显示的配置内容**还是中文
   - 固定电价: "固定电价", "电价 (元/kWh)"
   - 阶梯电价: "第X阶梯", "度", "度以上/月", "电价 (元/kWh)"
   - 分时电价: 时段名称 (如"尖峰", "高峰"), "电价 (元/kWh)"
   - 月份标签: "一月", "二月"等

## 根本原因

### 1. 模板下拉选项 (已修复✓)
- 第6003-6021行的代码已经使用`getTemplateI18nText(t.name)`和`getTemplateI18nText(t.typeName)`进行翻译
- `templateI18n`对象(第1705-1897行)已经定义了所有模板名称的翻译映射
- **此部分无需修复**

### 2. 模板内容 (需修复✗)
`generatePriceHTML`函数(第6052-6264行)生成的HTML内容包含大量硬编码中文:

#### 2.1 固定电价 (第6054-6065行)
```javascript
<div>固定电价</div>
<label>电价 (元/kWh)</label>
```

需要改为:
```javascript
<div>${typeof getTranslation === 'function' ? getTranslation('elecPriceFixedPriceLabel') : '固定电价'}</div>
<label>${typeof getTranslation === 'function' ? getTranslation('cabinetChartAxisElectricityPrice') : '电价 (元/kWh)'}</label>
```

#### 2.2 阶梯电价 - 固定模式 (第6070-6080行)
```javascript
第${index + 1}阶梯 (${tier.end !== null ? `${tier.start}-${tier.end}度` : `${tier.start}度以上`})
<label>电价 (元/kWh)</label>
```

需要改为:
```javascript
${typeof getTranslation === 'function' ? getTranslation('elecPriceTierTitle').replace('{n}', index + 1) : `第${index + 1}阶梯`} (${tier.end !== null ? `${tier.start}-${tier.end}${typeof getTranslation === 'function' ? getTranslation('elecPriceUnitDegree') || '度' : '度'}` : (typeof getTranslation === 'function' ? getTranslation('elecPriceTierRangeAbove').replace('{from}', tier.start) : `${tier.start}度以上/月`)})
<label>${typeof getTranslation === 'function' ? getTranslation('cabinetChartAxisElectricityPrice') : '电价 (元/kWh)'}</label>
```

#### 2.3 阶梯电价 - 分季节模式 (第6084-6109行)
```javascript
${season.name} (${season.months.map(m => m + '月').join('、')})
第${index + 1}阶梯 (...)
<label>电价 (元/kWh)</label>
```

需要改为:
```javascript
${getTemplateI18nText(season.name)} (${season.months.map(m => m + (typeof getTranslation === 'function' ? getTranslation('elecPriceUnitMonth') || '月' : '月')).join('、')})
// 阶梯标题同2.2
<label>同上</label>
```

#### 2.4 阶梯电价 - 逐月模式 (第6119-6163行)
```javascript
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
```

需要改为:
```javascript
const months = typeof getTranslation === 'function' ? [
    getTranslation('elecPriceMonthJan'), getTranslation('elecPriceMonthFeb'), getTranslation('elecPriceMonthMar'),
    getTranslation('elecPriceMonthApr'), getTranslation('elecPriceMonthMay'), getTranslation('elecPriceMonthJun'),
    getTranslation('elecPriceMonthJul'), getTranslation('elecPriceMonthAug'), getTranslation('elecPriceMonthSep'),
    getTranslation('elecPriceMonthOct'), getTranslation('elecPriceMonthNov'), getTranslation('elecPriceMonthDec')
] : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
```

#### 2.5 分时电价 (第6164-6261行)
```javascript
${p.name} (${p.start} - ${p.end})
<label>电价 (元/kWh)</label>
```

需要改为:
```javascript
${getTemplateI18nText(p.name)} (${p.start} - ${p.end})
<label>同上</label>
```

## 所需翻译键

### 已存在的翻译键
- `elecPriceFixedPriceLabel`: 固定电价
- `cabinetChartAxisElectricityPrice`: 电价 (元/kWh)
- `elecPriceTierTitle`: 第{n}阶梯
- `elecPriceTierRangeAbove`: {from}度以上/月
- `elecPriceMonthJan ~ elecPriceMonthDec`: 一月~十二月

### 需要添加的翻译键
- `elecPriceUnitMonth`: 月 / Month
- `elecPriceUnitDegree`: 度 / kWh

## 修复步骤

1. ✅ 在common.js中添加缺失的翻译键
2. ✅ 修复generatePriceHTML函数中的所有硬编码中文文本
3. ✅ 测试验证英文环境下的显示效果

## 修复文件

- `common.js`: 第3262行后添加翻译键
- `electricity-price-new.html`: 第6052-6264行的generatePriceHTML函数
