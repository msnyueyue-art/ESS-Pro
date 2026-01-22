# 🚀 设备升级按钮功能说明

## 📋 功能概述

在储能柜详情页的设置按钮旁边添加了一个"升级"按钮。点击后会弹出专业的升级提示弹窗，告知用户需要联系技术支持人员进行设备升级。

---

## ✨ 功能特点

### 1. 视觉设计

- **升级按钮**
  - 橙色渐变背景（#f59e0b → #d97706）
  - 向上箭头图标
  - 悬停时有上浮动画效果
  - 阴影效果增强点击反馈

### 2. 弹窗内容

**顶部区域：**
- 橙色渐变背景
- 大型向上箭头图标
- "设备升级"标题

**主要内容：**
- 工具图标
- 提示文字："设备升级需要专业人员操作"
- 详细说明

**联系方式：**
- 📞 技术支持热线：400-XXX-XXXX
- ✉️ 技术支持邮箱：support@example.com
- 🕐 服务时间：周一至周五 9:00-18:00

**温馨提示：**
- 黄色提示框
- 说明升级时间和注意事项

**操作按钮：**
- "关闭" - 灰色按钮，关闭弹窗
- "联系客服" - 橙色按钮，触发客服联系

---

## 📍 按钮位置

升级按钮位于以下位置：

```
核心运行参数
[升级] [设置]
```

- 在每个组件的"核心运行参数"标题右侧
- 紧邻"设置"按钮左边
- 两个按钮之间有 8px 间距

---

## 🎨 代码实现

### CSS 样式（已添加）

```css
.upgrade-btn {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    font-size: 13px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
}

.upgrade-btn:hover {
    background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
}
```

### HTML 结构（已添加）

**按钮位置（line 686-695）：**
```html
<div style="display: flex; gap: 8px;">
    <button class="upgrade-btn" onclick="openUpgradeModal()">
        <i class="fas fa-arrow-up"></i>
        <span>升级</span>
    </button>
    <button class="settings-btn" onclick="openFieldSettings()">
        <i class="fas fa-cog"></i>
        <span>设置</span>
    </button>
</div>
```

**升级模态框（line 1133-1197）：**
- 完整的弹窗HTML结构
- 包含所有样式和内容
- z-index: 2001（高于字段设置模态框）

### JavaScript 函数（已添加）

**line 6223-6229 - 打开升级模态框：**
```javascript
function openUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}
```

**line 6231-6237 - 关闭升级模态框：**
```javascript
function closeUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
```

**line 6239-6252 - 联系客服：**
```javascript
function contactSupport() {
    // 示例：显示提示
    alert('正在为您转接客服...\n\n您也可以直接拨打客服热线：400-XXX-XXXX');

    // 可选实现：
    // - 打开在线客服页面
    // - 拨打电话（移动端）
    // - 发送邮件
}
```

---

## 🔧 自定义配置

### 修改联系方式

编辑 `cabinet-detail.html` 第 1157-1169 行：

```html
<!-- 联系方式 -->
<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <i class="fas fa-phone-alt" style="color: #f59e0b; font-size: 16px;"></i>
        <span style="font-size: 14px; color: var(--text-primary);">技术支持热线：400-XXX-XXXX</span>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <i class="fas fa-envelope" style="color: #f59e0b; font-size: 16px;"></i>
        <span style="font-size: 14px; color: var(--text-primary);">技术支持邮箱：support@example.com</span>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
        <i class="fas fa-clock" style="color: #f59e0b; font-size: 16px;"></i>
        <span style="font-size: 14px; color: var(--text-primary);">服务时间：周一至周五 9:00-18:00</span>
    </div>
</div>
```

### 实现实际的客服联系功能

#### 方式 1：打开在线客服页面

```javascript
function contactSupport() {
    window.open('https://your-support-url.com', '_blank');
}
```

#### 方式 2：拨打电话（移动端）

```javascript
function contactSupport() {
    window.location.href = 'tel:400-XXX-XXXX';
}
```

#### 方式 3：发送邮件

```javascript
function contactSupport() {
    window.location.href = 'mailto:support@example.com?subject=设备升级咨询';
}
```

#### 方式 4：打开微信客服

```javascript
function contactSupport() {
    // 跳转到企业微信客服或其他客服系统
    window.open('weixin://dl/chat?your-wechat-service-url', '_blank');
}
```

---

## 🎯 使用场景

### 场景 1：用户想升级设备

1. 用户打开储能柜详情页
2. 看到"升级"按钮
3. 点击按钮
4. 查看升级说明和联系方式
5. 点击"联系客服"或直接拨打电话

### 场景 2：系统提示需要升级

可以在代码中添加自动弹出逻辑：

```javascript
// 在页面加载时检查是否需要升级
window.addEventListener('DOMContentLoaded', function() {
    // 检查设备版本
    const needsUpgrade = checkDeviceVersion(); // 自定义函数

    if (needsUpgrade) {
        // 自动打开升级提示
        setTimeout(() => {
            openUpgradeModal();
        }, 2000); // 延迟2秒后显示
    }
});
```

---

## 📱 响应式设计

弹窗已经适配移动端：

- **桌面端**：最大宽度 500px，居中显示
- **移动端**：宽度 90%，自适应屏幕
- **平板端**：自动调整大小

---

## ⚠️ 注意事项

### 1. 联系方式需要更新

请将示例中的联系方式替换为实际的：
- ✅ 技术支持热线
- ✅ 技术支持邮箱
- ✅ 服务时间

### 2. 客服功能需要实现

`contactSupport()` 函数目前只是示例，需要根据实际情况实现：
- 在线客服系统集成
- 电话拨打功能
- 邮件发送功能
- 其他客服渠道

### 3. 升级流程

如果需要实现实际的升级流程，可以考虑：
- 添加升级版本检查
- 实现升级申请表单
- 集成工单系统
- 添加升级进度跟踪

---

## 🔄 后续扩展

### 功能扩展建议

1. **升级版本信息**
   - 显示当前版本
   - 显示最新版本
   - 显示更新内容

2. **升级申请表单**
   - 用户信息
   - 设备信息
   - 期望升级时间
   - 特殊需求说明

3. **升级进度查询**
   - 申请状态
   - 预约时间
   - 升级进度
   - 完成通知

4. **在线预约**
   - 日历选择
   - 时间段选择
   - 自动确认

---

## 📊 测试清单

- [ ] 升级按钮正常显示
- [ ] 升级按钮位置正确（设置按钮左边）
- [ ] 点击升级按钮，弹窗正常打开
- [ ] 弹窗内容完整显示
- [ ] 联系方式信息正确
- [ ] 点击"关闭"按钮，弹窗正常关闭
- [ ] 点击"联系客服"按钮，功能正常
- [ ] 点击弹窗外部区域，弹窗不关闭（需要点击关闭按钮）
- [ ] 移动端显示正常
- [ ] 平板端显示正常
- [ ] 桌面端显示正常

---

## 🎨 视觉效果

### 升级按钮效果

- **默认状态**：橙色渐变，轻微阴影
- **悬停状态**：颜色加深，向上浮动2px，阴影增强
- **点击状态**：打开升级弹窗

### 弹窗效果

- **背景遮罩**：半透明黑色（rgba(0, 0, 0, 0.5)）
- **弹窗阴影**：深色大阴影（0 20px 60px）
- **顶部背景**：橙色渐变
- **图标大小**：64px 圆形背景 + 32px 图标
- **按钮效果**：渐变背景，阴影

---

## 📝 版本信息

- **功能版本**：1.0.0
- **添加日期**：2025年
- **文件位置**：`cabinet-detail.html`
- **修改行数**：
  - CSS：216-240 行
  - HTML：686-695 行（按钮）
  - HTML：1133-1197 行（弹窗）
  - JavaScript：6223-6252 行（函数）

---

**功能状态：** ✅ 已完成并可用
