# 告警处理历史国际化修复

## 问题描述
在英语环境下,告警管理页面的详情弹窗中的"处理记录"仍显示中文内容,包括:
- "系统" / "管理员" (操作者)
- "生成" / "故障修复" / "关闭告警" / "标记已读" (操作类型)
- "系统自动生成故障/告警/通知" / "故障修复完成" / "关闭告警完成" / "标记已读完成" (描述)

## 修复方案

### 1. 添加翻译键 (common.js)

#### 中文翻译 (约1600行)
```javascript
// 处理历史记录相关
handleHistorySystem: '系统',
handleHistoryAdmin: '管理员',
handleHistoryActionGenerate: '生成',
handleHistoryActionFixFault: '故障修复',
handleHistoryActionCloseAlarm: '关闭告警',
handleHistoryActionMarkRead: '标记已读',
handleHistorySystemAutoFault: '系统自动生成故障',
handleHistorySystemAutoWarning: '系统自动生成告警',
handleHistorySystemAutoNotice: '系统自动生成通知',
handleHistoryFaultFixed: '故障修复完成',
handleHistoryAlarmClosed: '关闭告警完成',
handleHistoryMarkedRead: '标记已读完成',
```

#### 英文翻译 (约4658行)
```javascript
// Handle History Related
handleHistorySystem: 'System',
handleHistoryAdmin: 'Administrator',
handleHistoryActionGenerate: 'Generate',
handleHistoryActionFixFault: 'Fix Fault',
handleHistoryActionCloseAlarm: 'Close Alarm',
handleHistoryActionMarkRead: 'Mark as Read',
handleHistorySystemAutoFault: 'System auto-generated fault',
handleHistorySystemAutoWarning: 'System auto-generated warning',
handleHistorySystemAutoNotice: 'System auto-generated notice',
handleHistoryFaultFixed: 'Fault fixed successfully',
handleHistoryAlarmClosed: 'Alarm closed successfully',
handleHistoryMarkedRead: 'Marked as read successfully',
```

### 2. 修改动态生成代码 (alarm-management.html)

修改了以下5处动态生成处理历史记录的位置:

#### 位置1: 初始化告警数据 (约1274-1303行)
```javascript
// 创建处理记录
const handleHistory = [{
    time: formatDateTime(date),
    action: translate('handleHistoryActionGenerate'),
    operator: translate('handleHistorySystem'),
    description: alarmType.level === 'fault' ? translate('handleHistorySystemAutoFault') :
                alarmType.level === 'warning' ? translate('handleHistorySystemAutoWarning') :
                translate('handleHistorySystemAutoNotice')
}];

// 如果状态是已解决,添加处理记录
if (status === 'resolved') {
    const resolveDate = new Date(date.getTime() + Math.floor(Math.random() * 3 * 60 * 60 * 1000));
    let actionText = '';
    let descriptionText = '';
    if (alarmType.level === 'fault') {
        actionText = translate('handleHistoryActionFixFault');
        descriptionText = translate('handleHistoryFaultFixed');
    } else if (alarmType.level === 'warning') {
        actionText = translate('handleHistoryActionCloseAlarm');
        descriptionText = translate('handleHistoryAlarmClosed');
    } else {
        actionText = translate('handleHistoryActionMarkRead');
        descriptionText = translate('handleHistoryMarkedRead');
    }
    handleHistory.push({
        time: formatDateTime(resolveDate),
        action: actionText,
        operator: translate('handleHistoryAdmin'),
        description: descriptionText
    });
}
```

#### 位置2: 处理告警消息详情页的"解决告警"按钮 (约1846-1867行)
```javascript
if (alarmLevel === 'warning') {
    // 告警消息: 直接关闭
    const alarm = alarmData.find(a => a.id === alarmId);
    if (alarm) {
        alarm.status = 'resolved';

        // 添加处理记录
        if (!alarm.handleHistory) {
            alarm.handleHistory = [{
                time: alarm.time,
                action: translate('handleHistoryActionGenerate'),
                operator: translate('handleHistorySystem'),
                description: translate('handleHistorySystemAutoWarning')
            }];
        }
        alarm.handleHistory.push({
            time: formatDateTime(new Date()),
            action: translate('handleHistoryActionCloseAlarm'),
            operator: translate('handleHistoryAdmin'),
            description: translate('handleHistoryAlarmClosed')
        });
    }
}
```

#### 位置3: 批量处理告警消息 (约1981-2002行)
```javascript
if (messageLevel === 'warning') {
    // 告警类型 - 直接关闭,不显示弹窗
    const alarm = alarmData.find(a => a.id === messageId);
    if (alarm) {
        alarm.status = 'resolved';

        // 添加处理记录
        if (!alarm.handleHistory) {
            alarm.handleHistory = [{
                time: alarm.time,
                action: translate('handleHistoryActionGenerate'),
                operator: translate('handleHistorySystem'),
                description: translate('handleHistorySystemAutoWarning')
            }];
        }
        alarm.handleHistory.push({
            time: formatDateTime(new Date()),
            action: translate('handleHistoryActionCloseAlarm'),
            operator: translate('handleHistoryAdmin'),
            description: translate('handleHistoryAlarmClosed')
        });
    }
}
```

#### 位置4: 确认故障修复 (约2018-2038行)
```javascript
function confirmFaultFix() {
    if (currentHandleMessageId) {
        const alarm = alarmData.find(a => a.id === currentHandleMessageId);
        if (alarm) {
            alarm.status = 'resolved';

            // 添加处理记录
            if (!alarm.handleHistory) {
                alarm.handleHistory = [{
                    time: alarm.time,
                    action: translate('handleHistoryActionGenerate'),
                    operator: translate('handleHistorySystem'),
                    description: translate('handleHistorySystemAutoFault')
                }];
            }
            alarm.handleHistory.push({
                time: formatDateTime(new Date()),
                action: translate('handleHistoryActionFixFault'),
                operator: translate('handleHistoryAdmin'),
                description: translate('handleHistoryFaultFixed')
            });
        }
    }
}
```

#### 位置5: 标记通知为已读 (约2068-2087行)
```javascript
function markAsRead(messageId) {
    const alarm = alarmData.find(a => a.id === messageId);
    if (alarm) {
        alarm.status = 'resolved';

        // 添加处理记录
        if (!alarm.handleHistory) {
            alarm.handleHistory = [{
                time: alarm.time,
                action: translate('handleHistoryActionGenerate'),
                operator: translate('handleHistorySystem'),
                description: translate('handleHistorySystemAutoNotice')
            }];
        }
        alarm.handleHistory.push({
            time: formatDateTime(new Date()),
            action: translate('handleHistoryActionMarkRead'),
            operator: translate('handleHistoryAdmin'),
            description: translate('handleHistoryMarkedRead')
        });
    }
}
```

## 测试步骤

1. 打开 [alarm-management.html](alarm-management.html) 文件
2. 在页面右上角切换语言到 English
3. 点击任意告警消息的"眼睛"图标查看详情
4. 查看"Handle History"部分,验证以下内容已正确翻译:
   - 操作者: System / Administrator
   - 操作: Generate / Fix Fault / Close Alarm / Mark as Read
   - 描述: System auto-generated fault/warning/notice / Fault fixed successfully / Alarm closed successfully / Marked as read successfully

## 修改文件清单

- [common.js](common.js)
  - 添加了12个新的翻译键(中英文各12个)

- [alarm-management.html](alarm-management.html)
  - 修改了5处动态生成处理历史记录的代码
  - 所有硬编码的中文字符串已替换为 translate() 函数调用

## 技术说明

- 使用了现有的 `translate()` 函数确保与系统一致性
- 修改后的代码会根据当前语言自动显示对应翻译
- 保持了原有的业务逻辑不变,仅替换了文本生成方式
