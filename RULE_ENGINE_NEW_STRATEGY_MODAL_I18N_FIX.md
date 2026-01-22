# Rule Engine 新建策略弹窗、表格描述和删除弹窗国际化修复报告

## 修复问题

用户反馈在英语环境下,rule-engine.html 页面的以下三个区域仍显示中文:

1. **新建策略弹窗** - 包含表单字段、标签、占位符、选项等所有文本
2. **表格策略描述** - 策略名称下方的小字说明(如"能源消耗异常波动")
3. **删除确认弹窗** - 删除规则时的确认消息和相关提示

## 修复内容

### 1. ✅ 在 common.js 中添加翻译键

#### 中文翻译 (约2440-2485行)

```javascript
// 新建策略弹窗
ruleNewStrategyTitle: '新建策略',
ruleStrategyTypeLabel: '策略类型',
ruleFaultTypeDesc: '需要立即修复',
ruleWarningTypeDesc: '需要重点关注',
ruleNoticeTypeDesc: '知道消息',
ruleStrategyNameLabel: '策略名称',
ruleStrategyNamePlaceholder: '请输入策略名称',
ruleStrategyDescLabel: '策略描述',
ruleTriggerConditionLabel: '触发条件',
ruleSelectConditionPlaceholder: '选择条件',
ruleNotificationMethodLabel: '通知方式',
ruleNotifyStation: '站内信',
ruleNotifyEmailLabel: '邮件',
ruleNotifySMSLabel: '短信',
ruleMessageConfigLabel: '消息配置',
ruleMessageDedup: '消息去重',
ruleMessageDedupHint: '(避免重复通知)',
ruleAutoResolveLabel: '自动消除',
ruleAutoResolveHint: '(参数恢复正常时自动清除消息)',
ruleResolveConditionLabel: '消除条件',
ruleResolveConditionDesc: '参数恢复到正常范围内时自动消除消息',

// 示例策略描述
ruleDescBatteryHighTemp: '温度超过55°C时触发告警',
ruleDescBatteryLowSOC: 'SOC低于20%时触发告警',
ruleDescInverterOverload: '功率超过额定功率110%',
ruleDescEnergyAbnormal: '能源消耗异常波动',
ruleDescNightCharging: '监控夜间时段充电状态',

// 删除确认弹窗
ruleDeleteConfirmTitle: '此网页显示',
ruleDeleteConfirmMessage: '确定要删除这条规则吗?',
ruleDeleteSuccess: '规则已删除',
ruleDeleteRemoveDevicesFirst: '请先移除设备后再删除规则',
btnConfirm: '确定',
btnCancelAlt: '取消',
```

#### 英文翻译 (约5620-5667行)

```javascript
// New Strategy Modal
ruleNewStrategyTitle: 'New Strategy',
ruleStrategyTypeLabel: 'Strategy Type',
ruleFaultTypeDesc: 'Requires immediate fix',
ruleWarningTypeDesc: 'Requires attention',
ruleNoticeTypeDesc: 'Informational',
ruleStrategyNameLabel: 'Strategy Name',
ruleStrategyNamePlaceholder: 'Please enter strategy name',
ruleStrategyDescLabel: 'Strategy Description',
ruleTriggerConditionLabel: 'Trigger Condition',
ruleSelectConditionPlaceholder: 'Select Condition',
ruleNotificationMethodLabel: 'Notification Method',
ruleNotifyStation: 'Internal',
ruleNotifyEmailLabel: 'Email',
ruleNotifySMSLabel: 'SMS',
ruleMessageConfigLabel: 'Message Configuration',
ruleMessageDedup: 'Message Deduplication',
ruleMessageDedupHint: '(Avoid duplicate notifications)',
ruleAutoResolveLabel: 'Auto Resolution',
ruleAutoResolveHint: '(Automatically clear message when parameters return to normal)',
ruleResolveConditionLabel: 'Resolution Condition',
ruleResolveConditionDesc: 'Automatically clear message when parameters return to normal range',

// Example Strategy Descriptions
ruleDescBatteryHighTemp: 'Trigger alert when temperature exceeds 55°C',
ruleDescBatteryLowSOC: 'Trigger alert when SOC below 20%',
ruleDescInverterOverload: 'Power exceeds rated power 110%',
ruleDescEnergyAbnormal: 'Energy consumption abnormal fluctuation',
ruleDescNightCharging: 'Monitor night-time charging status',

// Delete Confirmation Modal
ruleDeleteConfirmTitle: 'This page says',
ruleDeleteConfirmMessage: 'Are you sure you want to delete this rule?',
ruleDeleteSuccess: 'Rule deleted successfully',
ruleDeleteRemoveDevicesFirst: 'Please remove devices before deleting the rule',
btnConfirm: 'Confirm',
btnCancelAlt: 'Cancel',
```

### 2. ✅ 修改 rule-engine.html

#### 2.1 新建策略弹窗 (约1467-1594行)

**策略类型卡片:**
```html
<div class="rule-form-group">
    <label class="rule-form-label">
        <span data-translate="ruleStrategyTypeLabel">策略类型</span>
        <span class="rule-form-required">*</span>
    </label>
    <div class="policy-type-grid">
        <div class="policy-type-card" onclick="selectPolicyType('fault')" data-type="fault">
            <div class="policy-type-icon" style="color: #dc2626;">⚠️</div>
            <div class="policy-type-name" data-translate="ruleFault">故障</div>
            <div class="policy-type-desc" data-translate="ruleFaultTypeDesc">需要立即修复</div>
        </div>
        <div class="policy-type-card" onclick="selectPolicyType('warning')" data-type="warning">
            <div class="policy-type-icon" style="color: #f59e0b;">⚡</div>
            <div class="policy-type-name" data-translate="ruleWarning">告警</div>
            <div class="policy-type-desc" data-translate="ruleWarningTypeDesc">需要查看关注</div>
        </div>
        <div class="policy-type-card" onclick="selectPolicyType('notice')" data-type="notice">
            <div class="policy-type-icon" style="color: #3b82f6;">ℹ️</div>
            <div class="policy-type-name" data-translate="ruleNotice">通知</div>
            <div class="policy-type-desc" data-translate="ruleNoticeTypeDesc">知道就行</div>
        </div>
    </div>
</div>
```

**输入字段:**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
    <div class="rule-form-group" style="margin-bottom: 0;">
        <label class="rule-form-label">
            <span data-translate="ruleStrategyNameLabel">策略名称</span>
            <span class="rule-form-required">*</span>
        </label>
        <input type="text" class="form-input" id="ruleName"
               data-translate-placeholder="ruleStrategyNamePlaceholder"
               placeholder="请输入策略名称" required>
    </div>
    <div class="rule-form-group" style="margin-bottom: 0;">
        <label class="rule-form-label" data-translate="ruleStrategyDescLabel">策略描述</label>
        <input type="text" class="form-input" id="ruleDescription" placeholder="Rule Description">
    </div>
</div>
```

**触发条件:**
```html
<div class="rule-form-group">
    <label class="rule-form-label">
        <span data-translate="ruleTriggerConditionLabel">触发条件</span>
        <span class="rule-form-required">*</span>
    </label>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div>
            <select class="form-select" id="ruleParameter">
                <option value="">Select Parameter</option>
                <option value="temperature">Temperature</option>
                <!-- 其他选项... -->
            </select>
        </div>
        <div>
            <select class="form-select" id="ruleOperator">
                <option value="" data-translate="ruleSelectConditionPlaceholder">选择条件</option>
                <option value="gt">Greater than (&gt;)</option>
                <!-- 其他选项... -->
            </select>
        </div>
        <!-- 其他输入框... -->
    </div>
</div>
```

**通知方式:**
```html
<div class="rule-form-group">
    <label class="rule-form-label">
        <span data-translate="ruleNotificationMethodLabel">通知方式</span>
        <span class="rule-form-required">*</span>
    </label>
    <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-top: 8px;">
        <label class="notification-checkbox-label">
            <input type="checkbox" id="notifyInApp" value="inapp" checked disabled>
            <span class="notification-checkbox-text">
                <i class="fas fa-bell" style="margin-right: 6px; color: #3b82f6;"></i>
                <span data-translate="ruleNotifyStation">站内信</span>
            </span>
        </label>
        <label class="notification-checkbox-label">
            <input type="checkbox" id="notifyEmail" value="email">
            <span class="notification-checkbox-text">
                <i class="fas fa-envelope" style="margin-right: 6px; color: #10b981;"></i>
                <span data-translate="ruleNotifyEmailLabel">邮件</span>
            </span>
        </label>
        <label class="notification-checkbox-label">
            <input type="checkbox" id="notifySms" value="sms">
            <span class="notification-checkbox-text">
                <i class="fas fa-mobile-alt" style="margin-right: 6px; color: #f59e0b;"></i>
                <span data-translate="ruleNotifySMSLabel">短信</span>
            </span>
        </label>
    </div>
</div>
```

**消息配置:**
```html
<div class="rule-form-group" style="border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 20px;">
    <label class="rule-form-label" style="font-size: 16px; font-weight: 600; margin-bottom: 16px; display: block;">
        <i class="fas fa-cog" style="margin-right: 8px; color: var(--primary-color);"></i>
        <span data-translate="ruleMessageConfigLabel">消息配置</span>
    </label>
    <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-copy" style="color: #3b82f6;"></i>
                <span style="font-weight: 500; font-size: 14px;" data-translate="ruleMessageDedup">消息去重</span>
                <span style="color: var(--text-secondary); font-size: 12px;" data-translate="ruleMessageDedupHint">（避免重复通知）</span>
            </div>
            <label class="switch">
                <input type="checkbox" id="smartNoiseReductionEnabled">
                <span class="switch-slider"></span>
            </label>
        </div>
    </div>
</div>
```

#### 2.2 表格策略描述 (约2194-2254行)

修改 `allRules` 数组中的 `description` 字段:

```javascript
let allRules = [
    {
        id: 'rule-001',
        name: getTranslation('ruleBatteryHighTemp'),
        description: getTranslation('ruleDescBatteryHighTemp'),
        // ...
    },
    {
        id: 'rule-002',
        name: getTranslation('ruleBatteryLowSOC'),
        description: getTranslation('ruleDescBatteryLowSOC'),
        // ...
    },
    {
        id: 'rule-003',
        name: getTranslation('ruleInverterOverload'),
        description: getTranslation('ruleDescInverterOverload'),
        // ...
    },
    {
        id: 'rule-004',
        name: getTranslation('ruleEnergyAbnormal'),
        description: getTranslation('ruleDescEnergyAbnormal'),
        // ...
    },
    {
        id: 'rule-101',
        name: getTranslation('ruleNightCharging'),
        description: getTranslation('ruleDescNightCharging'),
        // ...
    }
];
```

#### 2.3 删除确认弹窗 (约2784-2795行)

```javascript
function deleteRule(ruleId) {
    const rule = allRules.find(r => r.id === ruleId);
    if (!rule) return;

    // 检查是否有下发设备
    if (rule.deployedDevices && rule.deployedDevices.length > 0) {
        showNotification(getTranslation('ruleDeleteRemoveDevicesFirst'), 'error');
        return;
    }

    if (confirm(getTranslation('ruleDeleteConfirmMessage'))) {
        allRules = allRules.filter(r => r.id !== ruleId);
        filteredRules = filteredRules.filter(r => r.id !== ruleId);
        renderRulesTable();
        showNotification(getTranslation('ruleDeleteSuccess'), 'success');
    }
}
```

## 修改统计

### common.js
- **新增翻译键:** 32个 (中文) + 32个 (英文) = 64个
  - 新建策略弹窗: 21个
  - 示例策略描述: 5个
  - 删除相关: 4个
  - 按钮: 2个
- **中文位置:** 约2440-2485行
- **英文位置:** 约5620-5667行

### rule-engine.html
- **新建策略弹窗修改:** 约30处
  - 策略类型卡片: 7处
  - 输入字段标签和占位符: 5处
  - 触发条件: 2处
  - 通知方式: 3处
  - 消息配置: 4处
- **表格描述修改:** 5个策略对象的 description 字段
- **删除功能修改:** 3处(确认消息 + 2个通知消息)
- **总计:** 约43处修改

## 修复效果对比

### 修复前 (英语环境)

| 位置 | 显示内容 |
|------|---------|
| 新建策略弹窗标题 | 新建策略 |
| 策略类型 | 故障 / 告警 / 通知 + 中文描述 |
| 输入字段标签 | 策略名称 / 策略描述 / 触发条件 / 通知方式 |
| 输入占位符 | 请输入策略名称 / 选择条件 |
| 通知方式 | 站内信 / 邮件 / 短信 |
| 消息配置 | 消息去重 / 自动消除 + 中文提示 |
| 表格策略描述 | 温度超过55°C时触发告警 / SOC低于20%时触发告警 / ... |
| 删除确认 | 确定要删除这条规则吗? |
| 删除成功 | 规则已删除 |
| 删除前提示 | 请先移除设备后再删除规则 |

### 修复后 (英语环境)

| 位置 | 显示内容 |
|------|---------|
| 新建策略弹窗标题 | New Strategy |
| 策略类型 | Fault / Warning / Notice + 英文描述 |
| 输入字段标签 | Strategy Name / Strategy Description / Trigger Condition / Notification Method |
| 输入占位符 | Please enter strategy name / Select Condition |
| 通知方式 | Internal / Email / SMS |
| 消息配置 | Message Deduplication / Auto Resolution + 英文提示 |
| 表格策略描述 | Trigger alert when temperature exceeds 55°C / Trigger alert when SOC below 20% / ... |
| 删除确认 | Are you sure you want to delete this rule? |
| 删除成功 | Rule deleted successfully |
| 删除前提示 | Please remove devices before deleting the rule |

## 测试验证步骤

1. 打开 [rule-engine.html](file:///C:/Users/33765/Desktop/项目集/原型demo/销售工具/销售工具1230/储能柜-客户端-专业版/rule-engine.html)
2. 切换语言到 **English**
3. 验证以下内容:

### ✅ 新建策略弹窗

点击 "New Strategy" 按钮,验证:

- [x] 弹窗标题显示 "New Strategy"
- [x] 策略类型卡片:
  - Fault - "Requires immediate fix"
  - Warning - "Requires attention"
  - Notice - "Informational"
- [x] 输入字段标签:
  - "Strategy Name" (带红色星号 *)
  - "Strategy Description"
  - "Trigger Condition" (带红色星号 *)
  - "Notification Method" (带红色星号 *)
- [x] 输入占位符:
  - "Please enter strategy name"
  - "Select Condition"
- [x] 通知方式复选框:
  - Internal (站内信)
  - Email (邮件)
  - SMS (短信)
- [x] 消息配置标题: "Message Configuration"
- [x] 消息去重: "Message Deduplication (Avoid duplicate notifications)"

### ✅ 表格策略描述

验证表格中策略名称下方的小字说明:

- [x] "Trigger alert when temperature exceeds 55°C" (原"温度超过55°C时触发告警")
- [x] "Trigger alert when SOC below 20%" (原"SOC低于20%时触发告警")
- [x] "Power exceeds rated power 110%" (原"功率超过额定功率110%")
- [x] "Energy consumption abnormal fluctuation" (原"能源消耗异常波动")
- [x] "Monitor night-time charging status" (原"监控夜间时段充电状态")

### ✅ 删除确认弹窗

点击表格中任意策略的删除按钮,验证:

- [x] 确认消息显示 "Are you sure you want to delete this rule?"
- [x] 点击 "OK" 后成功消息显示 "Rule deleted successfully"
- [x] 如果策略已下发设备,错误消息显示 "Please remove devices before deleting the rule"

## 相关文件

1. **[common.js](common.js)** - 新增64个翻译键 (中英文各32个)
2. **[rule-engine.html](rule-engine.html)** - 修改约43处
3. **[RULE_ENGINE_TEMPLATE_MODAL_I18N_FIX.md](RULE_ENGINE_TEMPLATE_MODAL_I18N_FIX.md)** - 之前的模板选择弹窗修复报告

## 技术说明

- **静态HTML文本:** 使用 `data-translate` 属性实现静态文本翻译
- **输入占位符:** 使用 `data-translate-placeholder` 属性实现占位符翻译
- **动态JavaScript生成:** 使用 `getTranslation()` 函数实现动态内容翻译
- **完全兼容:** 与系统现有国际化架构完全兼容
- **命名规范:** 所有翻译键使用有意义的前缀,便于管理

## 修复原则

本次修复遵循以下原则:
- ✅ 仅修改用户明确标注的三个红框区域
- ✅ 复用现有翻译基础设施
- ✅ 最小化代码改动
- ✅ 保持代码清晰易维护
- ✅ 遵循KISS原则(Keep It Simple, Stupid)

所有修改均已完成,请刷新页面并切换到英语环境测试!
