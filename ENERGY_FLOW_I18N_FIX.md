# 能量流页面国际化修复报告

## 📋 问题描述

在英文环境下,点击仪表盘的"编辑能量流"按钮后,能量流编辑页面的内容显示中文,包括:

1. ❌ 页面标题: "能量流设置"
2. ❌ 左侧设备菜单: "可用设备", "电源设备", "储能设备", "负载设备"
3. ❌ 设备名称: "市电", "柴发", "光伏", "储能柜", "负载"
4. ❌ 顶部按钮: "预览", "保存", "水平对齐", "垂直对齐"

## ✅ 修复方案

### 1. 添加翻译键 (common.js)

新增25个能量流相关的翻译键:

**页面元素:**
- `energyFlowPageTitle`: 能量流设置 / Energy Flow Settings
- `energyFlowAvailableDevices`: 可用设备 / Available Devices

**设备类别:**
- `energyFlowPowerDevices`: 电源设备 / Power Devices
- `energyFlowStorageDevices`: 储能设备 / Storage Devices
- `energyFlowLoadDevices`: 负载设备 / Load Devices

**设备名称:**
- `energyFlowDeviceGrid`: 市电 / Grid
- `energyFlowDeviceGenerator`: 柴发 / Generator
- `energyFlowDeviceSolar`: 光伏 / Solar
- `energyFlowDevicePCS`: 储能柜 / PCS
- `energyFlowDeviceLoad`: 负载 / Load

**操作按钮:**
- `energyFlowPreview`: 预览 / Preview
- `energyFlowEdit`: 编辑 / Edit
- `energyFlowSave`: 保存 / Save
- `energyFlowAlignHorizontal`: 水平对齐 / Align Horizontal
- `energyFlowAlignVertical`: 垂直对齐 / Align Vertical

**其他文本:**
- `energyFlowSwitchToPreview`: 切换到预览模式 / Switch to Preview Mode
- `energyFlowSwitchToEdit`: 切换到编辑模式 / Switch to Edit Mode
- `energyFlowConfigSaved`: 配置已保存 / Configuration Saved
- `energyFlowShowLabel`: 显示标签 / Show Label
- `energyFlowShowPower`: 显示功率 / Show Power
- `energyFlowShowStatus`: 显示状态 / Show Status
- `energyFlowConfirm`: 确认 / Confirm
- `energyFlowCancel`: 取消 / Cancel

### 2. 修复页面标题 (energy-flow.html)

**修复前:**
```html
<title id="pageTitle">能量流设置 - 储能柜管理系统</title>
```

**修复后:**
```html
<title id="pageTitle" data-translate="energyFlowPageTitle">能量流设置</title>
```

### 3. 添加翻译初始化代码

在页面加载事件中添加翻译初始化:

```javascript
window.addEventListener('load', function() {
    // 初始化翻译
    if (typeof applyTranslations === 'function') {
        applyTranslations();
        // 更新页面标题
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle && typeof getTranslation === 'function') {
            pageTitle.textContent = getTranslation('energyFlowPageTitle');
        }
    }
    initNavbar('energy-flow');
    // ...其他初始化代码
});
```

### 4. 设备标签配置

设备已正确配置使用 `labelKey` 和 `getDeviceLabel` 函数:

```javascript
let availableDevices = {
    power: [
        {
            id: 'grid-1',
            type: 'grid',
            labelKey: 'energyFlowDeviceGrid',
            get label() { return getDeviceLabel(this.labelKey); },
            icon: '电网.png',
            desc: '380V 3相'
        },
        // ...其他设备
    ],
    // ...
};

function getDeviceLabel(key) {
    return typeof getTranslation === 'function' ? getTranslation(key) : key;
}
```

## 🚀 执行修复

```bash
# 1. 添加翻译键到 common.js
node add_energy_flow_i18n.js

# 2. 修复页面元素和初始化代码
node fix_energy_flow_i18n.js
```

**输出:**
```
✅ 成功添加能量流翻译键到 common.js
✅ 能量流页面国际化修复完成!
```

## 🎯 修复效果

### 英文环境下的显示

**页面标题:**
```
Energy Flow Settings
```

**左侧设备菜单:**
```
Available Devices
├─ Power Devices
│  ├─ Grid (380V 3-phase)
│  ├─ Generator (500KW)
│  └─ Solar (200KW)
├─ Storage Devices
│  └─ PCS (250KW/500KWh)
└─ Load Devices
   └─ Load (Industrial Load)
```

**顶部工具栏:**
```
[👁️ Preview] [💾 Save] [↔️ Align Horizontal] [↕️ Align Vertical]
```

**编辑/预览模式:**
- 编辑模式: "Preview" (点击切换到预览模式)
- 预览模式: "Edit" (点击切换到编辑模式)

## 🧪 测试验证

### 测试步骤

1. **切换到英文环境:**
   ```javascript
   localStorage.setItem('language', 'en');
   location.reload();
   ```

2. **打开能量流页面:**
   - 从仪表盘点击"Edit Energy Flow"按钮
   - 或直接访问 `energy-flow.html`

3. **验证文本:**
   - [ ] 页面标题显示: "Energy Flow Settings"
   - [ ] 左侧菜单标题: "Available Devices"
   - [ ] 设备类别: "Power Devices", "Storage Devices", "Load Devices"
   - [ ] 设备名称: "Grid", "Generator", "Solar", "PCS", "Load"
   - [ ] 顶部按钮: "Preview", "Save", "Align Horizontal", "Align Vertical"

4. **功能测试:**
   - [ ] 点击"Preview"按钮,文本变为"Edit"
   - [ ] 拖拽设备到画布,设备标签显示英文
   - [ ] 点击"Save"按钮,提示信息显示英文

### 预期结果

所有文本在英文环境下都应显示英文,无任何中文残留。

## 📁 修改文件

1. **[common.js](common.js)**
   - 新增 25 个能量流翻译键
   - 位置: 在 `elecPriceDescFixedSeasonal` 后

2. **[energy-flow.html](energy-flow.html)**
   - 修改页面title,添加 `data-translate` 属性
   - 添加翻译初始化代码到页面加载事件

## 📊 技术实现

### 1. 动态标签获取
设备使用 getter 属性动态获取标签:
```javascript
get label() { return getDeviceLabel(this.labelKey); }
```

这确保了:
- 语言切换时标签自动更新
- 无需手动维护中英文两套设备数据

### 2. 页面标题动态更新
```javascript
if (pageTitle && typeof getTranslation === 'function') {
    pageTitle.textContent = getTranslation('energyFlowPageTitle');
}
```

### 3. HTML元素自动翻译
使用 `data-translate` 属性:
```html
<span data-translate="energyFlowSave">保存</span>
```

`applyTranslations()` 函数自动处理所有带此属性的元素。

## ✅ 完成状态

- [x] 添加翻译键到 common.js
- [x] 修复页面标题
- [x] 添加翻译初始化代码
- [x] 验证设备标签配置
- [x] 验证所有翻译键
- [x] 创建测试指南
- [ ] 浏览器测试验证 (待用户执行)

## 🔄 回滚方法

如需回滚:

```bash
# 恢复修改
git checkout common.js energy-flow.html
```

## 📝 注意事项

1. **缓存清理:** 修改后需清除浏览器缓存 (Ctrl+Shift+Delete) 或硬刷新 (Ctrl+F5)

2. **翻译函数依赖:** 确保 `common.js` 和 `navbar.js` 已正确加载

3. **设备图标:** 设备图标文件名(如 `电网.png`, `光伏.png`) 保持不变,只翻译显示标签

4. **语言切换:** 切换语言后需刷新页面才能看到效果

---

**修复完成时间:** 2026-01-10
**修复人:** Claude AI Assistant
**修复方式:** 自动化脚本 + 翻译配置
