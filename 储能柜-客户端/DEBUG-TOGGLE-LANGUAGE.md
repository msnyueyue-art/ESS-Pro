# 调试toggleLanguage问题指南

## 🔍 诊断步骤

老王我在dashboard.html的toggleLanguage函数里加了详细的调试日志！

### 步骤1：打开dashboard.html

1. 用浏览器打开 `dashboard.html`
2. 按 `F12` 打开开发者工具
3. 切换到 `Console`（控制台）标签页

---

### 步骤2：检查初始状态

在控制台输入以下命令，逐个检查：

```javascript
// 检查1：toggleLanguage是否是全局函数
typeof toggleLanguage
// 期望输出: "function" ✅
// 如果输出: "undefined" ❌ 说明函数没有定义或不在全局作用域

// 检查2：window.i18n是否存在
typeof window.i18n
// 期望输出: "object" ✅
// 如果输出: "undefined" ❌ 说明i18n.js没有加载

// 检查3：当前语言
window.i18n && window.i18n.currentLanguage
// 期望输出: "zh" 或 "en" ✅
// 如果输出: undefined ❌ 说明i18n没有初始化

// 检查4：setLanguage方法存在
typeof (window.i18n && window.i18n.setLanguage)
// 期望输出: "function" ✅
```

---

### 步骤3：点击语言切换按钮

点击顶部栏的**地球图标**（语言切换按钮）

**查看控制台输出，应该看到：**

```
=== toggleLanguage被调用 ===
window.i18n存在? true
当前语言: zh
将切换到: en
setLanguage called: en        (来自i18n.js)
Language changed from zh to en (来自i18n.js)
切换完成，当前语言: en
```

---

### 步骤4：根据控制台输出诊断

#### 情况A：没有任何输出

**问题**：toggleLanguage函数根本没被调用

**可能原因**：
1. navbar.js没有正确加载
2. 语言切换按钮的HTML没有生成
3. 点击事件被其他元素拦截

**解决方案**：
```javascript
// 在控制台手动调用
toggleLanguage()

// 如果手动调用有输出，说明按钮的onclick有问题
// 检查按钮是否存在：
document.querySelector('.lang-icon')

// 检查按钮的onclick属性：
document.querySelector('.lang-icon').getAttribute('onclick')
```

---

#### 情况B：输出"❌ window.i18n不存在！"

**问题**：i18n.js没有正确加载

**可能原因**：
1. i18n.js路径错误
2. i18n.js加载失败（网络问题）
3. i18n.js有语法错误，导致初始化失败

**解决方案**：
```javascript
// 检查网络标签页（Network tab）
// 看i18n.js是否加载成功（状态码应该是200）

// 检查i18n.js是否有报错
// 看控制台是否有红色错误信息

// 手动检查文件路径
// dashboard.html的script src="../ueh/components/i18n.js"
// 是否正确
```

---

#### 情况C：有输出，但页面没有翻译

**问题**：语言切换了，但排行榜没有更新

**可能原因**：
1. updateRankingData没有被调用
2. getStationName没有接收到正确的语言参数
3. window.setLanguage监听器没有设置

**解决方案**：
```javascript
// 检查是否设置了window.setLanguage监听器
typeof window.setLanguage
// 应该输出: "function"

// 手动调用updateRankingData
updateRankingData('today', 'charge')
// 看排行榜是否更新
```

---

#### 情况D：报错"currentLanguage is undefined"

**问题**：i18n对象存在，但没有初始化完成

**可能原因**：
1. i18n.js的初始化代码有问题
2. localStorage中没有语言设置

**解决方案**：
```javascript
// 手动设置语言
localStorage.setItem('app_language', 'zh')
localStorage.setItem('language', 'zh')

// 刷新页面
location.reload()
```

---

## 🚀 快速修复方案

如果上面的诊断太复杂，试试这个快速修复：

### 方案1：清除localStorage并刷新

```javascript
localStorage.clear()
location.reload()
```

### 方案2：手动设置语言

```javascript
if (window.i18n) {
    window.i18n.setLanguage('zh')
} else {
    console.error('i18n不存在')
}
```

### 方案3：检查test-toggle-language.html

打开我创建的测试页面：`test-toggle-language.html`

这个页面会自动运行所有诊断，告诉你具体哪里有问题。

---

## 📊 常见问题和解决方案

| 问题现象 | 可能原因 | 解决方案 |
|---------|---------|---------|
| 点击按钮无反应 | toggleLanguage未定义 | 检查函数是否在全局作用域 |
| 控制台报错"toggleLanguage is not defined" | 函数在局部作用域 | 把函数移到`<script>`顶层 |
| 控制台报错"i18n is undefined" | i18n.js未加载 | 检查script src路径 |
| 语言切换但排行榜不变 | updateRankingData未调用 | 检查window.setLanguage监听器 |
| 翻译成英文后无法切换回中文 | currentLanguage状态错误 | 刷新页面或清除localStorage |

---

## 📝 报告问题时请提供

如果还是不行，请告诉老王：

1. **控制台的完整输出**（特别是红色的错误信息）
2. **步骤2的4个检查结果**（typeof toggleLanguage等）
3. **步骤3点击按钮后的控制台输出**
4. **具体现象**：
   - 点击按钮完全无反应？
   - 有反应但排行榜不变？
   - 报错了？报什么错？

老王我会根据这些信息精确定位问题！
