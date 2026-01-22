# Rule Engine 页面国际化修复计划

## 问题概述

rule-engine.html 页面在英语环境下仍有大量中文显示,需要系统性修复。

## 需要修复的区域

### 1. 顶部统计卡片 (约1307-1359行)

**当前状态:** 硬编码中文
**需要修复:**
- "故障消息策略" → ruleFaultStrategy
- "告警消息策略" → ruleWarningStrategy
- "普通消息策略" / "通知消息策略" → ruleNoticeStrategy
- "条" → ruleCount
- "启用 X 个通知渠道" → ruleChannelsEnabled

### 2. 筛选下拉框 (约1374-1383行)

**当前状态:** 硬编码中文选项
**需要修复:**
- "全部通知类型" → ruleAllNotificationTypes
- "故障" → ruleFault
- "告警" → ruleWarning
- "通知" → ruleNotice
- "全部状态" → ruleAllStatus
- "已启用" → ruleStatusActive
- "已禁用" → ruleStatusInactive

### 3. 新建策略弹窗

#### 3.1 弹窗标题和基本字段
- "新建策略" → ruleNewRule
- "Strategy Type" → ruleTypeLabel
- "故障" / "告警" / "通知" → (已有翻译键)
- "需要立即修复" / "需要重点关注" / "知道消息" → 需要添加
- "Strategy Name" → ruleNameLabel
- "请输入人类策略名称" → ruleNamePlaceholder
- "Rule Description" → ruleDescriptionLabel

#### 3.2 触发条件部分
- "Trigger Condition" → ruleTriggerCondition
- "温度" / "时间" / "功率" / "负载" / "消防" 等 → 需要添加
- "选择条件" → ruleSelectCondition
- "阈值" → ruleThreshold
- "持续时间(分钟)" → ruleDurationMinutes

#### 3.3 通知方式部分
- "Notification Method" → ruleNotificationMethod
- "站内信" / "邮件" / "短信" → 需要添加

#### 3.4 消息配置部分
- "Message Configuration" → ruleAlarmConfig
- "Message Deduplication" → ruleDeduplication
- "(Avoid duplicate notifications)" → ruleDeduplicationHint
- "Auto Resolution" → ruleAutoResolution
- "(Automatically clear message when parameters return to normal)" → ruleAutoResolutionHint
- "Resolution Condition" → ruleResolutionCondition
- "参数恢复到正常范围内时自动消除消息" → ruleResolutionConditionHint
- "消除延迟(防抖)" → ruleResolutionDelay
- "参数持续正常后等待指定时间再消除，避免频繁变化" → ruleResolutionDelayHint

### 4. 选择规则模板弹窗

- "Select Rule Template" → ruleSelectTemplate
- "选择一个系统模板作为起点" → ruleSelectTemplateHint
- "逆变器" / "电池" / "电表" / "温度" / "消防" 等 → 需要添加分类翻译
- 各个模板的名称和描述 → 需要逐一添加

### 5. 表格和按钮

- "查询" → ruleQuery / btnQuery
- "重置" → ruleReset / btnReset
- "New Strategy" → ruleNewRule (已存在)
- 表格列标题 → ruleColName, ruleColCondition 等 (已存在)

## 需要添加的翻译键

### common.js 中文部分 (约2330-2361行之后添加)

```javascript
// 统计卡片
ruleFaultStrategy: '故障消息策略',
ruleWarningStrategy: '告警消息策略',
ruleNoticeStrategy: '普通消息策略',
ruleCount: '条',
ruleChannelsEnabled: '启用 {count} 个通知渠道',

// 筛选选项
ruleAllNotificationTypes: '全部通知类型',
ruleFault: '故障',
ruleWarning: '告警',
ruleNotice: '通知',
ruleAllStatus: '全部状态',
ruleStatusActive: '已启用',
ruleStatusInactive: '已禁用',

// 策略类型描述
ruleFaultDesc: '需要立即修复',
ruleWarningDesc: '需要重点关注',
ruleNoticeDesc: '知道消息',

// 输入框占位符
ruleNamePlaceholder: '请输入人类策略名称',
ruleDescPlaceholder: '规则描述',

// 触发条件选项
ruleConditionInverter: '逆变器',
ruleConditionBattery: '电池',
ruleConditionMeter: '电表',
ruleConditionTemp: '温度',
ruleConditionFirefighting: '消防',
ruleSelectCondition: '选择条件',
ruleThreshold: '阈值',
ruleDurationMinutes: '持续时间(分钟)',

// 通知方式
ruleNotifyInternal: '站内信',
ruleNotifyEmail: '邮件',
ruleNotifySMS: '短信',

// 模板选择
ruleSelectTemplateHint: '选择一个系统模板作为起点',
ruleTemplateInverter: '逆变器过载告警',
// ... 更多模板

// 按钮
ruleQuery: '查询',
ruleSave: '保存',
ruleCancel: '取消',
```

### common.js 英文部分 (约5387-5420行之后添加)

```javascript
// Statistics Cards
ruleFaultStrategy: 'Fault Message Strategy',
ruleWarningStrategy: 'Warning Message Strategy',
ruleNoticeStrategy: 'Notice Message Strategy',
ruleCount: ' items',
ruleChannelsEnabled: '{count} notification channels enabled',

// Filter Options
ruleAllNotificationTypes: 'All Notification Types',
ruleFault: 'Fault',
ruleWarning: 'Warning',
ruleNotice: 'Notice',
ruleAllStatus: 'All Status',
ruleStatusActive: 'Enabled',
ruleStatusInactive: 'Disabled',

// Strategy Type Descriptions
ruleFaultDesc: 'Requires immediate fix',
ruleWarningDesc: 'Requires attention',
ruleNoticeDesc: 'Informational',

// Input Placeholders
ruleNamePlaceholder: 'Enter strategy name',
ruleDescPlaceholder: 'Rule Description',

// Trigger Condition Options
ruleConditionInverter: 'Inverter',
ruleConditionBattery: 'Battery',
ruleConditionMeter: 'Meter',
ruleConditionTemp: 'Temperature',
ruleConditionFirefighting: 'Fire Protection',
ruleSelectCondition: 'Select Condition',
ruleThreshold: 'Threshold',
ruleDurationMinutes: 'Duration (minutes)',

// Notification Methods
ruleNotifyInternal: 'Internal',
ruleNotifyEmail: 'Email',
ruleNotifySMS: 'SMS',

// Template Selection
ruleSelectTemplateHint: 'Select a system template as starting point',
ruleTemplateInverter: 'Inverter Overload Alert',
// ... more templates

// Buttons
ruleQuery: 'Query',
ruleSave: 'Save',
ruleCancel: 'Cancel',
```

## 实施步骤

1. ✅ **第一步:** 在 common.js 中添加所有缺失的翻译键
2. ⏳ **第二步:** 修改 rule-engine.html 中的硬编码文本,添加 data-translate 属性
3. ⏳ **第三步:** 测试验证所有翻译是否正确显示

## 预估工作量

- common.js 翻译键添加: ~50-100个键
- rule-engine.html 修改点: ~100-150处
- 建议使用半自动化脚本辅助完成

## 注意事项

1. 确保所有翻译键命名一致 (使用 `rule` 前缀)
2. 动态生成的文本使用 `getTranslation()` 函数
3. 静态HTML使用 `data-translate` 属性
4. 占位符使用 `data-translate-placeholder` 属性
5. 下拉框选项需要特殊处理 (option标签的data-translate)
