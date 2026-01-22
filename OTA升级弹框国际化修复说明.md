# OTA升级弹框国际化修复说明

## 问题描述
在数据页面 (touchscreen/data.html) 的 OTA 固件升级弹框中,升级进度条下方显示的状态文本(如"下载固件...")和成功提示消息是硬编码的中文,在英文环境下没有切换为英文。

## 问题位置
- 文件: `touchscreen/data.html`
- 行号: 7615-7622 (状态文本数组)
- 行号: 7638 (成功提示消息)

**问题代码:**
```javascript
const statusTexts = [
    '准备升级...',
    '下载固件...',
    '校验固件...',
    '安装更新...',
    '重启设备...',
    '升级完成！'
];

// ...
alert('固件升级成功！系统将在3秒后重启...');
```

## 修复方案

### 1. 添加国际化翻译键

在 `touchscreen/touchscreen-i18n.js` 中添加升级状态的翻译配置:

**中文翻译 (第117-123行):**
```javascript
preparingUpgrade: '准备升级...',
downloadingFirmware: '下载固件...',
verifyingFirmware: '校验固件...',
installingUpdate: '安装更新...',
restartingDevice: '重启设备...',
upgradeComplete: '升级完成！',
upgradeSuccessMessage: '固件升级成功！系统将在3秒后重启...',
```

**英文翻译 (第701-707行):**
```javascript
preparingUpgrade: 'Preparing to upgrade...',
downloadingFirmware: 'Downloading firmware...',
verifyingFirmware: 'Verifying firmware...',
installingUpdate: 'Installing update...',
restartingDevice: 'Restarting device...',
upgradeComplete: 'Upgrade complete!',
upgradeSuccessMessage: 'Firmware upgrade successful! System will restart in 3 seconds...',
```

### 2. 修改状态文本数组

**修改前:**
```javascript
const statusTexts = [
    '准备升级...',
    '下载固件...',
    '校验固件...',
    '安装更新...',
    '重启设备...',
    '升级完成！'
];
```

**修改后:**
```javascript
const statusTexts = [
    t('preparingUpgrade'),
    t('downloadingFirmware'),
    t('verifyingFirmware'),
    t('installingUpdate'),
    t('restartingDevice'),
    t('upgradeComplete')
];
```

> **注意:** 使用 `t()` 函数而不是 `getTranslation()`,因为 touchscreen 页面使用的是 `touchscreen-i18n.js` 中定义的 `t()` 函数。

### 3. 修改成功提示消息

**修改前:**
```javascript
alert('固件升级成功！系统将在3秒后重启...');
```

**修改后:**
```javascript
alert(t('upgradeSuccessMessage'));
```

## 升级状态说明

升级过程包含6个状态,按顺序显示:

1. **准备升级** (Preparing to upgrade) - 进度 0-16%
2. **下载固件** (Downloading firmware) - 进度 17-33%
3. **校验固件** (Verifying firmware) - 进度 34-50%
4. **安装更新** (Installing update) - 进度 51-67%
5. **重启设备** (Restarting device) - 进度 68-83%
6. **升级完成** (Upgrade complete) - 进度 84-100%

## 修复效果
- ✅ 中文环境: 显示"下载固件..."等中文状态
- ✅ 英文环境: 显示"Downloading firmware..."等英文状态
- ✅ 成功提示消息也会根据语言自动切换
- ✅ 语言切换时,如果重新触发升级,会使用新语言显示状态

## 测试方法
1. 打开触摸屏数据页面: `touchscreen/data.html`
2. 点击页面中的 OTA 升级按钮打开升级弹框
3. 点击"开始升级"按钮
4. 观察进度条下方的状态文本是否正确显示:
   - 中文: "准备升级..." → "下载固件..." → "校验固件..." → ...
   - English: "Preparing to upgrade..." → "Downloading firmware..." → "Verifying firmware..." → ...
5. 等待升级完成,观察弹出的提示消息:
   - 中文: "固件升级成功！系统将在3秒后重启..."
   - English: "Firmware upgrade successful! System will restart in 3 seconds..."

## 相关文件
- `touchscreen/data.html` - 数据页面(包含 OTA 升级弹框)
- `touchscreen/touchscreen-i18n.js` - 触摸屏国际化翻译配置文件

## 技术实现
使用 `t()` 函数(定义在 `touchscreen-i18n.js` 中)动态获取当前语言的翻译文本,确保升级状态和提示消息能够根据用户选择的语言实时切换。

`t()` 函数的工作原理:
```javascript
function t(key) {
    const lang = getTouchscreenLang();
    return touchscreenTranslations[lang][key] || key;
}
```

## 问题排查
如果升级进度条不动,可能的原因:
1. ❌ 使用了错误的翻译函数名(如 `getTranslation()` 而不是 `t()`)
2. ✅ 确保使用 `t()` 函数访问翻译
3. ✅ 确保 `touchscreen-i18n.js` 已正确加载
4. ✅ 检查浏览器控制台是否有 JavaScript 错误

## 修复日期
2026-01-14

## 重要更新
- **2026-01-14 修复:** 将 `getTranslation()` 更正为 `t()`,修复进度条不动的问题
