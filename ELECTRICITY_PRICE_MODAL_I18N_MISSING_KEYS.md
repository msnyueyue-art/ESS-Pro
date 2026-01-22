# 电价自定义弹框缺失的国际化翻译键

## 问题描述

在修复弹框显示问题后，发现自定义创建弹框中仍有大量硬编码的中文文本未进行国际化处理。

## 需要添加到 common.js 的翻译键

请将以下翻译键添加到 `common.js` 的 `translations` 对象中：

```javascript
// 在 common.js 的 translations.zh 中添加：
elecPricePeriodInstruction: '选择时段类型，然后为该类型添加一个或多个时间段',
elecPriceBtnManagePeriodTypes: '管理时段类型',
elecPricePeriodTypesEmpty: '暂无可用的时段类型，请先在管理中添加',
elecPriceBtnAdd: '添加',

// 时段配置相关
elecPricePeriodTitle: '时段配置',
elecPricePeriodSubtitle: '配置各时段的时间范围',
elecPriceBtnAddPeriod: '添加时间段',
elecPricePeriodStartTime: '开始时间',
elecPricePeriodEndTime: '结束时间',
elecPeriodCoverageTitle: '24小时时段覆盖情况',
elecPeriodCoverageRemaining: '还有 {hours}h 未覆盖',
elecPeriodCoverageIssues: '{count} 处可调',

// 时段类型管理
elecPricePeriodTypeManagementTitle: '时段类型管理',
elecPricePeriodTypeName: '名称',
elecPricePeriodTypeColor: '颜色',
elecPricePeriodTypeOrder: '排序',
elecPricePeriodTypeAction: '操作',
elecPricePeriodTypePlaceholder: '请输入名称',
elecPriceBtnAddPeriodType: 'Add Period Type',
elecPriceBtnConfirm: 'Confirm',

// 阶梯配置
elecPriceTierConfig: '阶梯配置',
elecPriceTierTitle: '第{n}阶梯',
elecPriceTierUpperLimit: '上限值（度/月）',
elecPriceTierPlaceholder: '请输入上限值',
elecPriceTierRange: '{from}-{to}度/月',
elecPriceTierRangeAbove: '{from}度以上/月',
elecPriceTierConfigPreview: 'Tier Configuration Preview',
elecPriceTierFillAllLimits: '请先填写所有阶梯上限值',
elecPriceBtnAddTier: 'Add Tier',
elecPriceTierTotal: '共{count}个阶梯',
elecPriceTierModeFixed: 'Fixed',
elecPriceTierModeMonthly: 'Monthly',
elecPriceTierModeSeasonal: 'Seasonal',

// 季节配置
elecPriceSeasonConfig: '季节配置',
elecPriceSeasonName: '季节名称',
elecPriceSeasonMonths: '月份',
elecPriceSeasonDelete: '删除',
elecPriceBtnAddSeason: 'Add Season',
elecPriceMonth1: '1月',
elecPriceMonth2: '2月',
elecPriceMonth3: '3月',
elecPriceMonth4: '4月',
elecPriceMonth5: '5月',
elecPriceMonth6: '6月',
elecPriceMonth7: '7月',
elecPriceMonth8: '8月',
elecPriceMonth9: '9月',
elecPriceMonth10: '10月',
elecPriceMonth11: '11月',
elecPriceMonth12: '12月',
```

```javascript
// 在 translations.en 中添加：
elecPricePeriodInstruction: 'Select a period type, then add one or more time periods for that type',
elecPriceBtnManagePeriodTypes: 'Manage Period Types',
elecPricePeriodTypesEmpty: 'No available period types, please add in management first',
elecPriceBtnAdd: 'Add ',

// 时段配置相关
elecPricePeriodTitle: 'Period Configuration',
elecPricePeriodSubtitle: 'Configure time ranges for each period',
elecPriceBtnAddPeriod: 'Add Time Period',
elecPricePeriodStartTime: 'Start Time',
elecPricePeriodEndTime: 'End Time',
elecPeriodCoverageTitle: '24-Hour Period Coverage',
elecPeriodCoverageRemaining: '{hours}h uncovered',
elecPeriodCoverageIssues: '{count} issue(s)',

// 时段类型管理
elecPricePeriodTypeManagementTitle: 'Period Type Management',
elecPricePeriodTypeName: 'Name',
elecPricePeriodTypeColor: 'Color',
elecPricePeriodTypeOrder: 'Order',
elecPricePeriodTypeAction: 'Action',
elecPricePeriodTypePlaceholder: 'Enter name',
elecPriceBtnAddPeriodType: 'Add Period Type',
elecPriceBtnConfirm: 'Confirm',

// 阶梯配置
elecPriceTierConfig: 'Tier Configuration',
elecPriceTierTitle: 'Tier {n}',
elecPriceTierUpperLimit: 'Upper Limit (kWh/month)',
elecPriceTierPlaceholder: 'Enter upper limit',
elecPriceTierRange: '{from}-{to} kWh/month',
elecPriceTierRangeAbove: 'Above {from} kWh/month',
elecPriceTierConfigPreview: 'Tier Configuration Preview',
elecPriceTierFillAllLimits: 'Please fill in all tier limits first',
elecPriceBtnAddTier: 'Add Tier',
elecPriceTierTotal: '{count} tier(s) in total',
elecPriceTierModeFixed: 'Fixed',
elecPriceTierModeMonthly: 'Monthly',
elecPriceTierModeSeasonal: 'Seasonal',

// 季节配置
elecPriceSeasonConfig: 'Season Configuration',
elecPriceSeasonName: 'Season Name',
elecPriceSeasonMonths: 'Months',
elecPriceSeasonDelete: 'Delete',
elecPriceBtnAddSeason: 'Add Season',
elecPriceMonth1: 'Jan',
elecPriceMonth2: 'Feb',
elecPriceMonth3: 'Mar',
elecPriceMonth4: 'Apr',
elecPriceMonth5: 'May',
elecPriceMonth6: 'Jun',
elecPriceMonth7: 'Jul',
elecPriceMonth8: 'Aug',
elecPriceMonth9: 'Sep',
elecPriceMonth10: 'Oct',
elecPriceMonth11: 'Nov',
elecPriceMonth12: 'Dec',
```

## 已修复的代码位置

### 1. electricity-price-new.html:1338
- 修复了"选择时段类型，然后为该类型添加一个或多个时间段"
- 添加了 `data-translate="elecPricePeriodInstruction"`

### 2. electricity-price-new.html:1340
- 修复了"管理时段类型"按钮
- 添加了 `data-translate="elecPriceBtnManagePeriodTypes"`

### 3. electricity-price-new.html:4138-4154
- 修复了 `renderPeriodTypeButtons()` 函数中的硬编码文本
- 使用 `getTranslation('elecPricePeriodTypesEmpty')` 和 `getTranslation('elecPriceBtnAdd')`

### 4. electricity-price-new.html:3140
- 修复了 `selectPurpose()` 函数中的 `translatePage()` 调用
- 改为调用 `setLanguage(currentLang)`

## 下一步工作

由于弹框中还有大量其他硬编码文本需要修复（如图片中标注的所有红框部分），建议：

1. 先将上述翻译键添加到 common.js
2. 逐个修复弹框中的其他硬编码文本
3. 测试所有场景下的国际化效果

## 相关文件

- [electricity-price-new.html](electricity-price-new.html) - 主页面文件
- [common.js](common.js) - 翻译配置文件

## 注意事项

由于 `translatePage()` 函数不存在，所有动态生成内容的翻译都需要使用：

```javascript
if (typeof setLanguage === 'function' && typeof currentLang !== 'undefined') {
    setLanguage(currentLang);
}
```

或直接使用 `getTranslation(key)` 函数获取翻译文本。
