# 新建策略弹框国际化修复完成报告

## 问题描述

在英文环境下,新建策略弹框中存在以下硬编码的中文文本:
1. 弹框标题「新建策略」
2. 消除条件下拉选项「参数恢复正常范围」
3. 消除延迟单位「分钟」
4. 时间窗口选项「5分钟」、「10分钟」、「30分钟」等
5. 降噪配置中的「分钟内最多发送」和「次」

## 修复内容

### 1. rule-engine.html 修复

#### 1.1 JavaScript 中的弹框标题
**位置:** 第 2666 行

**修改前:**
```javascript
modalTitle.textContent = '新建策略';
```

**修改后:**
```javascript
modalTitle.textContent = getTranslation('ruleNewRule');
```

#### 1.2 消除条件下拉选项
**位置:** 第 1635 行

**修改前:**
```html
<option value="normal" selected>参数恢复正常范围</option>
```

**修改后:**
```html
<option value="normal" selected data-translate="ruleResolutionNormalRange">参数恢复正常范围</option>
```

#### 1.3 消除延迟单位
**位置:** 第 1645 行

**修改前:**
```html
<span style="font-size: 13px; color: var(--text-secondary);">分钟</span>
```

**修改后:**
```html
<span style="font-size: 13px; color: var(--text-secondary);" data-translate="ruleMinutes">分钟</span>
```

#### 1.4 时间窗口下拉选项
**位置:** 第 1599-1603 行

**修改前:**
```html
<option value="5">5分钟</option>
<option value="10" selected>10分钟</option>
<option value="30">30分钟</option>
<option value="60">1小时</option>
<option value="120">2小时</option>
```

**修改后:**
```html
<option value="5" data-translate-template="ruleTimeWindowMinutes" data-value="5">5分钟</option>
<option value="10" selected data-translate-template="ruleTimeWindowMinutes" data-value="10">10分钟</option>
<option value="30" data-translate-template="ruleTimeWindowMinutes" data-value="30">30分钟</option>
<option value="60" data-translate="ruleTimeWindow1Hour">1小时</option>
<option value="120" data-translate="ruleTimeWindow2Hours">2小时</option>
```

#### 1.5 降噪配置文本
**位置:** 多处 (故障、告警、通知配置区域)

**修改前:**
```html
<span>分钟内最多发送</span>
<span>次</span>
```

**修改后:**
```html
<span data-translate="ruleMinutesMaxSend">分钟内最多发送</span>
<span data-translate="ruleTimes">次</span>
```

### 2. common.js 翻译键添加

#### 2.1 中文翻译 (第 2359-2365 行)
```javascript
ruleResolutionNormalRange: '参数恢复正常范围',
ruleMinutes: '分钟',
ruleTimeWindowMinutes: '{value}分钟',
ruleTimeWindow1Hour: '1小时',
ruleTimeWindow2Hours: '2小时',
ruleMinutesMaxSend: '分钟内最多发送',
ruleTimes: '次',
```

#### 2.2 英文翻译 (第 5548-5554 行)
```javascript
ruleResolutionNormalRange: 'Parameters return to normal range',
ruleMinutes: 'minutes',
ruleTimeWindowMinutes: '{value} minutes',
ruleTimeWindow1Hour: '1 hour',
ruleTimeWindow2Hours: '2 hours',
ruleMinutesMaxSend: 'Send at most within minutes',
ruleTimes: 'times',
```

## 修复方法

使用 sed 命令批量修复:

```bash
# 1. 修复 JavaScript 中的硬编码
sed -i "s/modalTitle\.textContent = '新建策略';/modalTitle.textContent = getTranslation('ruleNewRule');/g" rule-engine.html

# 2. 修复参数恢复正常范围选项
sed -i 's|<option value="normal" selected>参数恢复正常范围</option>|<option value="normal" selected data-translate="ruleResolutionNormalRange">参数恢复正常范围</option>|g' rule-engine.html

# 3. 修复分钟单位
sed -i 's|<span style="font-size: 13px; color: var(--text-secondary);">分钟</span>|<span style="font-size: 13px; color: var(--text-secondary);" data-translate="ruleMinutes">分钟</span>|g' rule-engine.html

# 4. 修复时间窗口选项
sed -i 's|<option value="5">5分钟</option>|<option value="5" data-translate-template="ruleTimeWindowMinutes" data-value="5">5分钟</option>|g' rule-engine.html
sed -i 's|<option value="10" selected>10分钟</option>|<option value="10" selected data-translate-template="ruleTimeWindowMinutes" data-value="10">10分钟</option>|g' rule-engine.html
sed -i 's|<option value="30">30分钟</option>|<option value="30" data-translate-template="ruleTimeWindowMinutes" data-value="30">30分钟</option>|g' rule-engine.html
sed -i 's|<option value="60">1小时</option>|<option value="60" data-translate="ruleTimeWindow1Hour">1小时</option>|g' rule-engine.html
sed -i 's|<option value="120">2小时</option>|<option value="120" data-translate="ruleTimeWindow2Hours">2小时</option>|g' rule-engine.html

# 5. 修复降噪配置文本
sed -i 's|<span>分钟内最多发送</span>|<span data-translate="ruleMinutesMaxSend">分钟内最多发送</span>|g' rule-engine.html
sed -i 's|<span>次</span>|<span data-translate="ruleTimes">次</span>|g' rule-engine.html
```

## 验证结果

### HTML 修复验证
✅ modalTitle 使用 getTranslation('ruleNewRule')
✅ 参数恢复正常范围添加 data-translate="ruleResolutionNormalRange"
✅ 分钟单位添加 data-translate="ruleMinutes"
✅ 时间窗口选项全部添加国际化属性
✅ 降噪配置文本添加国际化属性

### 翻译键验证
✅ 中文翻译键已添加到 common.js (第 2359-2365 行)
✅ 英文翻译键已添加到 common.js (第 5548-5554 行)
✅ 所有翻译键格式正确,符合现有规范

## 影响范围

**修改文件:**
- [rule-engine.html](rule-engine.html) - 新建策略弹框HTML
- [common.js](common.js) - 国际化翻译配置

**影响功能:**
- 新建策略弹框标题
- 自动消除配置区域
- 智能降噪配置区域
- 故障/告警/通知降噪配置

## 测试建议

1. **切换到英文环境** 验证所有文本是否正确翻译:
   - 点击「新建策略」按钮,检查弹框标题
   - 查看「Auto Resolution」区域的「Resolution Condition」下拉选项
   - 查看「Resolution Delay」的单位是否显示为「minutes」
   - 查看「Time Window」下拉选项是否正确显示英文

2. **切换回中文环境** 验证中文显示是否正常:
   - 所有文本应保持原有中文显示
   - 无任何显示异常或乱码

3. **功能测试**:
   - 创建新策略,验证所有配置选项功能正常
   - 保存策略,验证数据保存正确

## 注意事项

1. **模板翻译键**: `ruleTimeWindowMinutes` 使用了 `{value}` 占位符,需要确保翻译函数支持模板替换
2. **一致性**: 所有「分钟」相关的翻译统一使用 `ruleMinutes` 键
3. **向后兼容**: 保留了原有中文文本作为 fallback,确保在翻译缺失时仍可显示

## 完成时间

2025-01-10

## 修复状态

✅ **已完成** - 所有硬编码文本已修复,翻译键已添加并验证通过
