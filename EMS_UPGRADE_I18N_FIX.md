# EMS升级页面国际化修复

## 问题描述

在EMS升级页面中，升级进度弹框显示的内容未正确国际化，在中文环境下仍然显示英文：

1. **升级中标签页**：显示 "otaUpgradingTab" 而不是 "升级中"
2. **状态文本**：显示 "otaStatusUpgrading" 而不是 "升级中"
3. **目标版本**：显示 "otaTargetVersion" 而不是 "目标版本"
4. **升级版本**：显示 "otaUpgradeVersion" 而不是 "升级版本"
5. **错误信息**：
   - `otaErrorFirmwareVerification` → "固件校验失败"
   - `otaErrorDeviceTimeout` → "设备响应超时"
   - `otaErrorDeviceTimeoutRetry` → "设备连接超时，请重试"
   - `otaErrorFirmwareSignature` → "固件签名验证失败"

## 修复方案

### 1. 在 common.js 中添加缺失的翻译键

#### 简体中文 (zh) - 第1559-1570行
```javascript
// OTA升级进度弹框翻译
otaUpgradingTab: '升级中',
otaStatusUpgrading: '升级中',
otaTargetVersion: '目标版本',
otaUpgradeVersion: '升级版本',
otaErrorFirmwareVerification: '固件校验失败',
otaErrorDeviceTimeout: '设备响应超时',
otaErrorDeviceTimeoutRetry: '设备连接超时，请重试',
otaErrorFirmwareSignature: '固件签名验证失败',
otaNoUpgradingDevices: '暂无升级中的设备',
otaUpgradeSuccessRestart: '升级成功，设备已重启',
otaUpgradeFailedNoResponse: '升级失败：设备无响应',
```

#### 英语 (en) - 第4932-4943行
```javascript
// OTA upgrade progress drawer translations
otaUpgradingTab: 'Upgrading',
otaStatusUpgrading: 'Upgrading',
otaTargetVersion: 'Target Version',
otaUpgradeVersion: 'Upgrade Version',
otaErrorFirmwareVerification: 'Firmware verification failed',
otaErrorDeviceTimeout: 'Device timeout',
otaErrorDeviceTimeoutRetry: 'Device connection timeout, please retry',
otaErrorFirmwareSignature: 'Firmware signature verification failed',
otaNoUpgradingDevices: 'No upgrading devices',
otaUpgradeSuccessRestart: 'Upgrade successful, device restarted',
otaUpgradeFailedNoResponse: 'Upgrade failed: No response from device',
```

## 修复效果

### 修复前
- 升级中标签页显示：`otaUpgradingTab (5)`
- 状态显示：`otaStatusUpgrading`
- 版本标签：`otaTargetVersion: v2.5.1`
- 错误信息：`otaErrorFirmwareVerification`

### 修复后
- 升级中标签页显示：`升级中 (5)` / `Upgrading (5)`
- 状态显示：`升级中` / `Upgrading`
- 版本标签：`目标版本: v2.5.1` / `Target Version: v2.5.1`
- 错误信息：`固件校验失败` / `Firmware verification failed`

## 相关文件

- [common.js](common.js:1559-1570) - 简体中文翻译
- [common.js](common.js:4932-4943) - 英语翻译
- [devices1.html](devices1.html:3984) - 使用翻译的页面

## 测试建议

1. 清除浏览器缓存（Ctrl+Shift+Delete）
2. 在中文环境下访问 EMS升级页面
3. 点击"EMS升级"按钮，查看升级进度弹框
4. 验证所有标签、状态和错误信息都显示为中文
5. 切换到英语环境，验证显示为英文

## 注意事项

⚠️ **清除缓存很重要**：由于 common.js 被浏览器缓存，修改后需要清除缓存才能看到效果。

建议在 common.js 文件名后添加版本参数，例如：
```html
<script src="common.js?v=20260110"></script>
```

## 原则应用

### KISS (简单至上)
- 直接在翻译对象中添加缺失的键值对
- 不需要修改页面逻辑，只添加翻译数据

### DRY (避免重复)
- 使用 `getTranslation()` 函数统一获取翻译
- 所有语言使用相同的键名，避免重复定义

### SOLID - 单一职责
- 翻译数据集中在 common.js 中管理
- 页面只负责调用翻译函数，不直接包含翻译文本

## 完成状态

✅ 已添加简体中文翻译键
✅ 已添加英语翻译键
✅ 所有必需的OTA进度弹框翻译键已补充
