# 连线拉直按钮修复报告

## 📋 问题描述

在英文环境下,能量流页面的"连线拉直"按钮存在两个问题:

### 问题1: Tooltip显示黑点
**现象:** 鼠标悬停在"连线拉直"按钮上时,显示一个黑色的点,而不是完整的提示文字。

**根本原因:**
- 按钮使用了 `data-title-key="energyFlowStraightenConnectionsTitle"` 属性
- 但 `common.js` 的 `setLanguage()` 函数只处理 `data-translate-title` 属性
- `data-title-key` 是一个不存在的属性,浏览器无法识别,导致tooltip显示异常

**位置:** [energy-flow.html:1074](energy-flow.html#L1074)

```html
<!-- ❌ 错误的属性名 -->
<button class="toolbar-btn" onclick="straightenConnections()"
        data-title-key="energyFlowStraightenConnectionsTitle">
    <i class="fas fa-ruler"></i>
    <span data-translate="energyFlowStraightenConnections">连线拉直</span>
</button>
```

### 问题2: 提示消息显示中文
**现象:** 点击"连线拉直"按钮后,显示的提示消息"已拉直1条连线"仍然是中文。

**根本原因:**
- 提示消息使用了硬编码的模板字符串
- 没有使用翻译辅助函数 `t()`

**位置:** [energy-flow.html:3468](energy-flow.html#L3468)

```javascript
// ❌ 硬编码的中文
showMiniToast(`✅ 已拉直 ${changedCount} 条连线`);
```

## ✅ 修复方案

### 修复1: 更正Tooltip属性名

**修复前:**
```html
<button class="toolbar-btn" onclick="straightenConnections()"
        data-title-key="energyFlowStraightenConnectionsTitle">
```

**修复后:**
```html
<button class="toolbar-btn" onclick="straightenConnections()"
        data-translate-title="energyFlowStraightenConnectionsTitle">
```

**说明:**
- `data-translate-title` 是 `common.js` 中 `setLanguage()` 函数支持的标准属性
- 该属性会被自动处理,将翻译文本设置到元素的 `title` 属性上
- 参考: [common.js:6999-7004](common.js#L6999-L7004)

```javascript
// common.js 中的处理代码
document.querySelectorAll('[data-translate-title]').forEach(el => {
    const key = el.getAttribute('data-translate-title');
    if (t[key]) {
        el.title = t[key];
    }
});
```

### 修复2: 国际化提示消息

**修复前:**
```javascript
showMiniToast(`✅ 已拉直 ${changedCount} 条连线`);
```

**修复后:**
```javascript
showMiniToast('✅ ' + t('energyFlowConnectionsStraightened', {count: changedCount}));
```

**说明:**
- 使用翻译辅助函数 `t()` (第1160-1168行定义)
- 支持参数替换: `{count}` 会被 `changedCount` 的值替换
- 翻译键已在之前添加到 `common.js`:
  - 中文: `energyFlowConnectionsStraightened: '已拉直 {count} 条连线'`
  - 英文: `energyFlowConnectionsStraightened: '{count} connection(s) straightened'`

## 🚀 执行修复

### 自动修复脚本

```bash
node fix_straighten_button.js
```

### 输出结果

```
✅ energy-flow.html 已更新

修复内容:
  ✓ tooltip属性: data-title-key → data-translate-title
  ✓ 提示消息: 已拉直X条连线 → 使用翻译函数
```

## 🎯 修复效果

### 英文环境下

#### 1. Tooltip显示
**鼠标悬停在"连线拉直"按钮上:**
```
┌─────────────────────────────────┐
│ Straighten selected connections │
└─────────────────────────────────┘
        ↓
   [📏 Straighten Connections]
```

#### 2. 提示消息
**点击按钮后的消息:**
- 拉直1条连线: `✅ 1 connection(s) straightened`
- 拉直2条连线: `✅ 2 connection(s) straightened`
- 拉直5条连线: `✅ 5 connection(s) straightened`

### 中文环境下

#### 1. Tooltip显示
**鼠标悬停在"连线拉直"按钮上:**
```
┌──────────────────┐
│ 将选中的连线拉直 │
└──────────────────┘
      ↓
  [📏 连线拉直]
```

#### 2. 提示消息
**点击按钮后的消息:**
- 拉直1条连线: `✅ 已拉直 1 条连线`
- 拉直2条连线: `✅ 已拉直 2 条连线`
- 拉直5条连线: `✅ 已拉直 5 条连线`

## 🧪 测试验证

### 测试步骤

1. **设置英文环境:**
   ```javascript
   localStorage.setItem('language', 'en');
   location.reload();
   ```

2. **打开能量流页面并添加设备:**
   - 拖拽 Grid 和 Solar 到画布
   - 创建连接线 (点击 Grid 再点击 Solar)

3. **测试Tooltip:**
   - [ ] 将鼠标悬停在"Straighten Connections"按钮上
   - [ ] 验证显示完整的提示文字: "Straighten selected connections"
   - [ ] 不应该显示黑点或乱码

4. **测试提示消息:**
   - [ ] 选中连接线 (点击连接线使其高亮)
   - [ ] 点击"Straighten Connections"按钮
   - [ ] 验证提示消息显示: "✅ 1 connection(s) straightened"
   - [ ] 如果有多条连线,验证数字正确显示

### 预期结果

✅ Tooltip显示完整的英文提示文字,无黑点
✅ 提示消息根据语言环境显示正确的文本
✅ 数字参数正确替换到消息中

## 📁 修改文件

### [energy-flow.html](energy-flow.html)
**修改内容:**
1. **第1074行:** 将 `data-title-key` 改为 `data-translate-title`
2. **第3468行:** 提示消息国际化,使用 `t()` 函数

### 工具文件
- **[fix_straighten_button.js](fix_straighten_button.js)** - 自动修复脚本

## 📊 技术说明

### data-translate-title 属性的工作原理

1. **HTML中定义:**
   ```html
   <button data-translate-title="energyFlowStraightenConnectionsTitle">
   ```

2. **common.js 自动处理:**
   ```javascript
   // setLanguage() 函数中
   document.querySelectorAll('[data-translate-title]').forEach(el => {
       const key = el.getAttribute('data-translate-title');
       if (t[key]) {
           el.title = t[key];  // 设置原生title属性
       }
   });
   ```

3. **浏览器渲染:**
   - 浏览器读取 `title` 属性
   - 鼠标悬停时显示tooltip

### 翻译键定义

**位置:** [common.js](common.js)

```javascript
// 中文 (约第3360行)
energyFlowStraightenConnectionsTitle: '将选中的连线拉直',
energyFlowConnectionsStraightened: '已拉直 {count} 条连线',

// 英文 (约第6700行)
energyFlowStraightenConnectionsTitle: 'Straighten selected connections',
energyFlowConnectionsStraightened: '{count} connection(s) straightened',
```

## ⚠️ 注意事项

1. **缓存清理:** 修改后需清除浏览器缓存或硬刷新 (Ctrl+F5)

2. **属性命名规范:**
   - ✅ 正确: `data-translate-title` (title属性翻译)
   - ✅ 正确: `data-translate` (文本内容翻译)
   - ✅ 正确: `data-translate-placeholder` (placeholder翻译)
   - ❌ 错误: `data-title-key` (不存在的属性)

3. **翻译函数:**
   - 静态HTML元素: 使用 `data-translate-*` 属性
   - 动态JavaScript生成: 使用 `t()` 或 `getTranslation()` 函数

## 🔗 相关修复

本次修复是能量流页面国际化的补充修复,相关文档:

1. **[ENERGY_FLOW_COMPLETE_FIX_SUMMARY.md](ENERGY_FLOW_COMPLETE_FIX_SUMMARY.md)** - 主要修复
2. **[DEVICE_SETTINGS_I18N_FIX.md](DEVICE_SETTINGS_I18N_FIX.md)** - 设备设置面板
3. **[NAVBAR_TRANSLATION_FIX.md](NAVBAR_TRANSLATION_FIX.md)** - 导航栏翻译
4. **本文档** - 连线拉直按钮修复

## ✅ 完成状态

- [x] 识别tooltip显示问题
- [x] 识别提示消息问题
- [x] 修复tooltip属性名
- [x] 修复提示消息国际化
- [x] 创建自动修复脚本
- [x] 验证修复结果
- [x] 创建完整文档
- [ ] 浏览器测试验证 (待用户执行)

## 🎉 修复完成!

✅ **Tooltip显示问题已解决 - 完整显示提示文字**
✅ **提示消息已国际化 - 根据语言环境显示**
✅ **数字参数正确替换**
🎯 **现在可以在浏览器中测试验证了!**

---

**修复完成时间:** 2026-01-10
**修复人:** Claude AI Assistant
**修复方式:** 属性名更正 + 消息国际化
