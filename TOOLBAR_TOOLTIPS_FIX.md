# 工具栏按钮Tooltip国际化修复报告

## 📋 问题描述

在英文环境下,能量流编辑页面的工具栏按钮tooltip(鼠标悬停提示)显示中文:

### 受影响的按钮

1. ❌ **预览/编辑按钮** - tooltip显示"切换编辑模式"、"切换到预览模式"、"返回编辑模式"
2. ❌ **保存按钮** - tooltip显示"保存配置"
3. ❌ **水平对齐按钮** - tooltip显示"水平对齐选中的设备"
4. ❌ **垂直对齐按钮** - tooltip显示"垂直对齐选中的设备"

### 相关提示消息

5. ❌ **水平对齐提示** - "已水平对齐 X 个设备"
6. ❌ **垂直对齐提示** - "已垂直对齐 X 个设备"

## 🔍 问题根因

### 原因1: 静态Tooltip硬编码
按钮的 `title` 属性直接写了中文字符串:

```html
<!-- ❌ 硬编码中文 -->
<button title="切换编辑模式">...</button>
<button title="保存配置">...</button>
<button title="水平对齐选中的设备">...</button>
```

### 原因2: 动态Tooltip硬编码
在切换编辑/预览模式时,JavaScript动态设置 `title` 属性为中文:

```javascript
// ❌ 硬编码中文
editModeBtn.title = '切换到预览模式';
editModeBtn.title = '返回编辑模式';
```

### 原因3: 提示消息硬编码
对齐操作的提示消息使用中文模板字符串:

```javascript
// ❌ 硬编码中文
showMiniToast(`✅ 已水平对齐 ${devices.length} 个设备`);
showMiniToast(`✅ 已垂直对齐 ${devices.length} 个设备`);
```

## ✅ 修复方案

### 第一步: 添加翻译键到 common.js

新增 **8个** tooltip相关翻译键:

**中文翻译键:**
```javascript
energyFlowSwitchEditModeTooltip: '切换编辑模式',
energyFlowSwitchToPreviewTooltip: '切换到预览模式',
energyFlowBackToEditTooltip: '返回编辑模式',
energyFlowSaveConfigTooltip: '保存配置',
energyFlowAlignHorizontalTooltip: '水平对齐选中的设备',
energyFlowAlignVerticalTooltip: '垂直对齐选中的设备',
energyFlowDevicesAlignedHorizontal: '已水平对齐 {count} 个设备',
energyFlowDevicesAlignedVertical: '已垂直对齐 {count} 个设备',
```

**英文翻译键:**
```javascript
energyFlowSwitchEditModeTooltip: 'Switch Edit Mode',
energyFlowSwitchToPreviewTooltip: 'Switch to Preview Mode',
energyFlowBackToEditTooltip: 'Back to Edit Mode',
energyFlowSaveConfigTooltip: 'Save Configuration',
energyFlowAlignHorizontalTooltip: 'Align selected devices horizontally',
energyFlowAlignVerticalTooltip: 'Align selected devices vertically',
energyFlowDevicesAlignedHorizontal: '{count} device(s) aligned horizontally',
energyFlowDevicesAlignedVertical: '{count} device(s) aligned vertically',
```

### 第二步: 修复静态Tooltip

使用 `data-translate-title` 属性替换硬编码的 `title`:

#### 1. 编辑/预览按钮 (第1053行)
```html
<!-- 修复前 ❌ -->
<button class="toolbar-btn primary" id="editModeBtn" onclick="toggleEditMode()"
        title="切换编辑模式">

<!-- 修复后 ✅ -->
<button class="toolbar-btn primary" id="editModeBtn" onclick="toggleEditMode()"
        data-translate-title="energyFlowSwitchEditModeTooltip">
```

#### 2. 保存按钮 (第1059行)
```html
<!-- 修复前 ❌ -->
<button class="toolbar-btn" id="saveBtn" onclick="saveFlowConfig()"
        title="保存配置" style="display: none;">

<!-- 修复后 ✅ -->
<button class="toolbar-btn" id="saveBtn" onclick="saveFlowConfig()"
        data-translate-title="energyFlowSaveConfigTooltip" style="display: none;">
```

#### 3. 水平对齐按钮 (第1066行)
```html
<!-- 修复前 ❌ -->
<button class="toolbar-btn" onclick="alignDevicesHorizontal()"
        title="水平对齐选中的设备">

<!-- 修复后 ✅ -->
<button class="toolbar-btn" onclick="alignDevicesHorizontal()"
        data-translate-title="energyFlowAlignHorizontalTooltip">
```

#### 4. 垂直对齐按钮 (第1070行)
```html
<!-- 修复前 ❌ -->
<button class="toolbar-btn" onclick="alignDevicesVertical()"
        title="垂直对齐选中的设备">

<!-- 修复后 ✅ -->
<button class="toolbar-btn" onclick="alignDevicesVertical()"
        data-translate-title="energyFlowAlignVerticalTooltip">
```

### 第三步: 修复动态Tooltip

使用翻译函数 `t()` 动态设置tooltip:

#### 1. 切换到预览模式 (第1660、1693行)
```javascript
// 修复前 ❌
editModeBtn.title = '切换到预览模式';

// 修复后 ✅
editModeBtn.title = t('energyFlowSwitchToPreviewTooltip');
```

#### 2. 返回编辑模式 (第1715行)
```javascript
// 修复前 ❌
editModeBtn.title = '返回编辑模式';

// 修复后 ✅
editModeBtn.title = t('energyFlowBackToEditTooltip');
```

### 第四步: 修复提示消息

使用翻译函数 `t()` 替换硬编码消息:

#### 1. 水平对齐提示 (第3400行)
```javascript
// 修复前 ❌
showMiniToast(`✅ 已水平对齐 ${devices.length} 个设备`);

// 修复后 ✅
showMiniToast('✅ ' + t('energyFlowDevicesAlignedHorizontal', {count: devices.length}));
```

#### 2. 垂直对齐提示 (第3431行)
```javascript
// 修复前 ❌
showMiniToast(`✅ 已垂直对齐 ${devices.length} 个设备`);

// 修复后 ✅
showMiniToast('✅ ' + t('energyFlowDevicesAlignedVertical', {count: devices.length}));
```

## 🚀 执行修复

### 自动修复脚本

```bash
node fix_toolbar_tooltips.js
```

### 输出结果

```
✅ 已添加8个新翻译键
✅ energy-flow.html 已更新

修复内容:
  ✓ 编辑/预览按钮tooltip (静态)
  ✓ 保存按钮tooltip
  ✓ 水平对齐按钮tooltip
  ✓ 垂直对齐按钮tooltip
  ✓ 动态tooltip (切换模式时)
  ✓ 对齐操作提示消息
```

## 🎯 修复效果

### 英文环境下

#### 1. 按钮Tooltip
| 按钮 | Tooltip |
|------|---------|
| 编辑/预览 (初始) | Switch Edit Mode |
| 预览 (编辑模式下) | Switch to Preview Mode |
| 编辑 (预览模式下) | Back to Edit Mode |
| 保存 | Save Configuration |
| 水平对齐 | Align selected devices horizontally |
| 垂直对齐 | Align selected devices vertically |
| 连线拉直 | Straighten selected connections |

#### 2. 操作提示消息
- 水平对齐: `✅ 2 device(s) aligned horizontally`
- 垂直对齐: `✅ 3 device(s) aligned vertically`

### 中文环境下

#### 1. 按钮Tooltip
| 按钮 | Tooltip |
|------|---------|
| 编辑/预览 (初始) | 切换编辑模式 |
| 预览 (编辑模式下) | 切换到预览模式 |
| 编辑 (预览模式下) | 返回编辑模式 |
| 保存 | 保存配置 |
| 水平对齐 | 水平对齐选中的设备 |
| 垂直对齐 | 垂直对齐选中的设备 |
| 连线拉直 | 将选中的连线拉直 |

#### 2. 操作提示消息
- 水平对齐: `✅ 已水平对齐 2 个设备`
- 垂直对齐: `✅ 已垂直对齐 3 个设备`

## 🧪 测试验证

### 测试步骤

1. **设置英文环境:**
   ```javascript
   localStorage.setItem('language', 'en');
   location.reload();
   ```

2. **打开能量流页面**

3. **测试工具栏按钮tooltip:**

   **编辑/预览按钮:**
   - [ ] 初始状态悬停 → "Switch Edit Mode"
   - [ ] 点击进入编辑模式,悬停 → "Switch to Preview Mode"
   - [ ] 点击进入预览模式,悬停 → "Back to Edit Mode"

   **其他按钮 (编辑模式下):**
   - [ ] 保存按钮悬停 → "Save Configuration"
   - [ ] 水平对齐按钮悬停 → "Align selected devices horizontally"
   - [ ] 垂直对齐按钮悬停 → "Align selected devices vertically"
   - [ ] 连线拉直按钮悬停 → "Straighten selected connections"

4. **测试对齐功能提示:**
   - [ ] 拖拽2个设备到画布
   - [ ] 选中设备,点击"Align Horizontal" → 提示 "2 device(s) aligned horizontally"
   - [ ] 选中设备,点击"Align Vertical" → 提示 "2 device(s) aligned vertically"

### 预期结果

✅ 所有tooltip在英文环境下显示英文
✅ 所有tooltip在中文环境下显示中文
✅ 动态切换模式时tooltip正确更新
✅ 操作提示消息根据语言环境显示

## 📁 修改文件清单

### 1. [common.js](common.js)
**修改内容:**
- 新增 8 个tooltip和提示消息翻译键
- 中文部分位置: 约第 3397 行后
- 英文部分位置: 约第 6737 行后

### 2. [energy-flow.html](energy-flow.html)
**修改内容:**
- 第1053行: 编辑/预览按钮tooltip
- 第1059行: 保存按钮tooltip
- 第1066行: 水平对齐按钮tooltip
- 第1070行: 垂直对齐按钮tooltip
- 第1660、1693行: 动态tooltip (切换到预览模式)
- 第1715行: 动态tooltip (返回编辑模式)
- 第3400行: 水平对齐提示消息
- 第3431行: 垂直对齐提示消息

### 3. 工具文件
- **[fix_toolbar_tooltips.js](fix_toolbar_tooltips.js)** - 自动修复脚本

## 📊 修复统计

### 代码修改量
- 新增翻译键: **8个**
- 修改静态tooltip: **4个按钮**
- 修改动态tooltip: **2处**
- 修改提示消息: **2处**

### 覆盖范围
- 工具栏按钮: **5个** (编辑/预览、保存、水平对齐、垂直对齐、连线拉直)
- 动态状态: **3种** (初始、编辑模式、预览模式)
- 操作提示: **2种** (水平对齐、垂直对齐)

## ⚠️ 注意事项

1. **缓存清理:** 修改后需清除浏览器缓存或硬刷新 (Ctrl+F5)

2. **Tooltip属性标准:**
   - ✅ 静态tooltip: 使用 `data-translate-title` 属性
   - ✅ 动态tooltip: 使用 `t()` 函数设置 `title` 属性
   - ❌ 不要直接硬编码 `title` 属性

3. **翻译函数:**
   - `data-translate-title` 由 `setLanguage()` 自动处理
   - 动态设置必须使用 `t()` 或 `getTranslation()` 函数

4. **参数替换:**
   - 使用 `{count}` 等占位符
   - 通过 `t(key, {count: value})` 传递参数

## 🔗 相关修复

本次修复是能量流页面国际化的补充修复,相关文档:

1. **[ENERGY_FLOW_COMPLETE_FIX_SUMMARY.md](ENERGY_FLOW_COMPLETE_FIX_SUMMARY.md)** - 主要修复
2. **[DEVICE_SETTINGS_I18N_FIX.md](DEVICE_SETTINGS_I18N_FIX.md)** - 设备设置面板
3. **[STRAIGHTEN_BUTTON_FIX.md](STRAIGHTEN_BUTTON_FIX.md)** - 连线拉直按钮
4. **[NAVBAR_TRANSLATION_FIX.md](NAVBAR_TRANSLATION_FIX.md)** - 导航栏翻译
5. **本文档** - 工具栏按钮tooltip修复

## ✅ 完成状态

- [x] 识别所有tooltip问题
- [x] 添加8个新翻译键
- [x] 修复静态tooltip (4个按钮)
- [x] 修复动态tooltip (2处)
- [x] 修复提示消息 (2处)
- [x] 创建自动修复脚本
- [x] 验证修复结果
- [x] 创建完整文档
- [ ] 浏览器测试验证 (待用户执行)

## 🎉 修复完成!

✅ **所有工具栏按钮tooltip已国际化**
✅ **动态tooltip正确更新**
✅ **操作提示消息已国际化**
✅ **中英文环境自动切换**
🎯 **现在可以在浏览器中测试验证了!**

---

**修复完成时间:** 2026-01-10
**修复人:** Claude AI Assistant
**修复方式:** 添加翻译键 + data-translate-title属性 + 动态翻译函数
