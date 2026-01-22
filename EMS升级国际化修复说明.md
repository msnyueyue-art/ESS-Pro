# EMS升级国际化修复说明

## 📋 问题

EMS升级进度弹框中显示英文键名而非翻译文本，例如：
- `otaUpgradingTab` 而不是 "升级中"
- `otaTargetVersion` 而不是 "目标版本"
- `otaErrorFirmwareVerification` 而不是 "固件校验失败"

## ✅ 已修复

已在 [common.js](common.js) 中添加缺失的11个翻译键：

### 中文翻译（第1559-1570行）
```javascript
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

### 英文翻译（第4932-4943行）
```javascript
otaUpgradingTab: 'Upgrading',
otaStatusUpgrading: 'Upgrading',
otaTargetVersion: 'Target Version',
// ... (其他英文翻译)
```

## 🧪 测试方法

### 方法1：清除缓存测试
1. 按 `Ctrl + Shift + Delete` 打开清除缓存对话框
2. 选择"缓存的图片和文件"
3. 点击"清除数据"
4. 刷新页面（F5）
5. 访问 EMS升级页面，查看升级进度弹框

### 方法2：控制台验证
1. 打开开发者工具（F12）
2. 在 Console 中运行验证脚本：
```javascript
// 复制 verify_ems_i18n.js 中的代码粘贴到控制台
```
3. 查看验证结果

## 🎯 预期效果

### 修复前 ❌
```
[升级中标签] otaUpgradingTab (5)
[状态] otaStatusUpgrading
[版本] otaTargetVersion: v2.5.1
```

### 修复后 ✅
```
[升级中标签] 升级中 (5)
[状态] 升级中
[版本] 目标版本: v2.5.1
```

## ⚠️ 重要提示

**必须清除浏览器缓存**才能看到修复效果！

如果清除缓存后仍有问题，可以：
1. 硬刷新页面：`Ctrl + F5`
2. 检查 Network 标签中 common.js 是否从缓存加载
3. 使用无痕模式测试

## 📁 修改的文件

- ✏️ [common.js](common.js) - 添加了翻译键
- 📄 [EMS_UPGRADE_I18N_FIX.md](EMS_UPGRADE_I18N_FIX.md) - 详细修复文档
- 🧪 [verify_ems_i18n.js](verify_ems_i18n.js) - 验证脚本
