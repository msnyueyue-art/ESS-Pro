# 🏷️ 版本徽章使用指南

## ✨ 功能说明

在顶部导航栏的 logo 旁边添加了一个**版本徽章**，用于区分专业版和基础版。

---

## 📍 徽章位置

```
┌─────────────────────────────────────────┐
│ ☰  [Logo] [专业版]    🌐 🔔 👤       │  ← 顶部导航栏
└─────────────────────────────────────────┘
         ↑
      版本徽章
```

---

## 🎨 当前设计

**专业版徽章：**
- 背景：金色渐变 `#fbbf24 → #f59e0b`
- 文字：深棕色 `#78350f`
- 样式：圆角 4px，大写字母
- 阴影：金色光晕

---

## 🔧 切换版本显示

### 方法 1：修改文字内容

编辑 `navbar.js` 第 27 行：

```javascript
// 专业版
">专业版</span>

// 改为基础版
">基础版</span>
```

### 方法 2：修改样式（推荐）

**专业版 - 金色渐变：**
```javascript
data-version="pro"
background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
color: #78350f;
">专业版</span>
```

**基础版 - 蓝色渐变：**
```javascript
data-version="basic"
background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
color: #eff6ff;
">基础版</span>
```

**基础版 - 灰色简洁：**
```javascript
data-version="basic"
background: #6b7280;
color: #ffffff;
">基础版</span>
```

---

## 💡 预设配色方案

### 方案 A：金色专业版 + 蓝色基础版

**专业版（当前）：**
```css
background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
color: #78350f;
box-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
```

**基础版（建议）：**
```css
background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
color: #eff6ff;
box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
```

### 方案 B：黑色专业版 + 灰色基础版

**专业版：**
```css
background: #000000;
color: #ffffff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
```

**基础版：**
```css
background: #9ca3af;
color: #ffffff;
box-shadow: 0 2px 4px rgba(156, 163, 175, 0.3);
```

### 方案 C：紫色专业版 + 绿色基础版

**专业版：**
```css
background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
color: #f5f3ff;
box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
```

**基础版：**
```css
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
color: #ecfdf5;
box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
```

---

## 📝 完整代码示例

### 专业版（金色）

```html
<span class="version-badge" data-version="pro" style="
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    margin-left: 12px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: #78350f;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
">专业版</span>
```

### 基础版（蓝色）

```html
<span class="version-badge" data-version="basic" style="
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    margin-left: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #eff6ff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
">基础版</span>
```

### 基础版（灰色简洁）

```html
<span class="version-badge" data-version="basic" style="
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    margin-left: 12px;
    background: #6b7280;
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(107, 114, 128, 0.3);
">基础版</span>
```

---

## 🎯 动态切换版本（JavaScript）

如果需要根据用户账户动态显示版本，可以添加以下代码：

```javascript
// 在 navbar.js 的 initNavbar() 函数中添加

function setVersionBadge(version) {
    const badge = document.querySelector('.version-badge');
    if (!badge) return;

    if (version === 'pro') {
        badge.textContent = '专业版';
        badge.setAttribute('data-version', 'pro');
        badge.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
        badge.style.color = '#78350f';
        badge.style.boxShadow = '0 2px 4px rgba(251, 191, 36, 0.3)';
    } else if (version === 'basic') {
        badge.textContent = '基础版';
        badge.setAttribute('data-version', 'basic');
        badge.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
        badge.style.color = '#eff6ff';
        badge.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
    }
}

// 使用示例
// 从 localStorage 或 API 获取用户版本
const userVersion = localStorage.getItem('userVersion') || 'basic';
setVersionBadge(userVersion);
```

---

## 🔒 隐藏版本徽章

如果不想显示版本徽章，可以：

### 方法 1：CSS 隐藏

在 `navbar.js` 的徽章样式中添加：
```css
display: none;
```

### 方法 2：删除代码

删除 `navbar.js` 第 14-27 行的版本徽章代码。

---

## 📱 响应式设计

徽章已针对不同屏幕尺寸优化：

- **桌面端**：正常显示
- **平板**：正常显示
- **移动端**：正常显示（如需隐藏可添加媒体查询）

**移动端隐藏示例：**
```css
@media (max-width: 768px) {
    .version-badge {
        display: none !important;
    }
}
```

---

## 🎨 设计规范

### 尺寸规范
```
padding: 3px 8px;          /* 内边距 */
font-size: 11px;           /* 字体大小 */
border-radius: 4px;        /* 圆角 */
margin-left: 12px;         /* 与 logo 间距 */
```

### 文字规范
```
font-weight: 700;          /* 加粗 */
letter-spacing: 0.5px;     /* 字母间距 */
text-transform: uppercase; /* 大写 */
```

### 阴影规范
```
box-shadow: 0 2px 4px rgba(颜色, 0.3);
```

---

## ✅ 验证清单

修改后请检查：
- [ ] 徽章显示在 logo 右侧
- [ ] 文字清晰可读
- [ ] 颜色对比度足够
- [ ] 阴影效果正常
- [ ] 移动端显示正常
- [ ] 所有页面显示一致

---

## 🎉 完成！

版本徽章已成功添加到导航栏！

**当前状态：** ✅ 金色"专业版"徽章

**如需切换到基础版：**
1. 编辑 `navbar.js` 第 14-27 行
2. 使用上面提供的"基础版"代码替换
3. 刷新页面查看效果

---

**文档版本：** 1.0.0
**创建日期：** 2025年
**文件位置：** `navbar.js` (第 14-27 行)
