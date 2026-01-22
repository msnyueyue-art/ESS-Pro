# 国际化HTML默认语言规则说明

## 重要发现 🔴

在修复EMS页面"更多数据开发中..."的翻译问题时,发现了一个关键的国际化规则:

**所有HTML文件的默认硬编码内容必须是英文!**

## 问题案例

### 错误示例 ❌
```html
<div data-i18n="moreDataDeveloping">
    更多数据开发中...  <!-- ❌ 默认是中文 -->
</div>
```

**结果:** 在英文环境下,这段文字仍然显示为中文,因为国际化系统不会翻译它。

### 正确示例 ✅
```html
<div data-i18n="moreDataDeveloping">
    More data in development...  <!-- ✅ 默认是英文 -->
</div>
```

**结果:**
- 英文环境: 显示 "More data in development..."
- 中文环境: 自动翻译为 "更多数据开发中..."

## 技术原理

### 页面初始化逻辑 (data.html:8295-8298)
```javascript
// HTML默认是英文,只有当前语言是中文时才需要翻译
if (currentLang === 'zh') {
    applyTouchscreenTranslations();
}
```

### 工作流程

```
┌─────────────────────────────────────────────────────────┐
│  页面加载 (HTML内容默认是英文)                           │
└─────────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │  检测当前语言设置              │
        │  getTouchscreenLang()         │
        └───────────────────────────────┘
                        ↓
        ┌──────────────┴──────────────┐
        │                              │
    lang = 'en'                   lang = 'zh'
        │                              │
        ↓                              ↓
    不做任何操作                   调用翻译函数
    (保持英文)                  applyTouchscreenTranslations()
        │                              │
        ↓                              ↓
    显示英文内容                   查找所有 [data-i18n] 元素
                                   替换为中文翻译
                                        │
                                        ↓
                                   显示中文内容
```

## 为什么这样设计?

### 优势:
1. **性能优化** - 英文环境下无需任何翻译处理,直接显示HTML
2. **兼容性好** - 即使JavaScript加载失败,页面仍能显示英文(国际通用语言)
3. **简化逻辑** - 只需处理中文翻译,不需要双向翻译

### 设计哲学:
```
英文 = 默认/回退语言
中文 = 翻译目标语言
```

## 规则总结

### ✅ 正确做法:
1. **HTML内容默认写英文**
2. **添加 `data-i18n` 属性**
3. **在国际化文件中提供中文翻译**

```html
<!-- HTML -->
<div data-i18n="welcomeMessage">Welcome to the system</div>

<!-- touchscreen-i18n.js -->
zh: {
    welcomeMessage: '欢迎使用本系统'
}
```

### ❌ 错误做法:
1. ❌ HTML内容写中文,期望在英文环境下自动翻译
2. ❌ 混合使用中英文内容
3. ❌ 只添加`data-i18n`但不修改HTML默认内容

## 检查清单

在添加新的国际化内容时,请确保:

- [ ] HTML默认内容是**英文**
- [ ] 添加了正确的 `data-i18n` 属性
- [ ] 在 `touchscreen-i18n.js` 中添加了对应的中文翻译
- [ ] 在 `touchscreen-i18n.js` 中添加了对应的英文键(值和HTML一致)
- [ ] 测试了中英文切换功能

## 相关文件

### 国际化系统核心文件:
- [touchscreen-i18n.js](touchscreen-i18n.js) - 翻译字典和核心函数
- [data.html](data.html) - 数据页面(第8287-8299行: 初始化逻辑)
- [common-header-scripts.js](common-header-scripts.js) - 通用头部脚本

### 核心函数:
```javascript
// touchscreen-i18n.js
getTouchscreenLang()           // 获取当前语言
setTouchscreenLang(lang)       // 设置语言
t(key)                         // 获取翻译文本
applyTouchscreenTranslations() // 应用翻译到页面
switchTouchscreenLanguage(lang)// 切换语言
```

## 修复已知问题

以下内容已确认HTML默认是英文:
- ✅ 数据页 - Overall设备
- ✅ 数据页 - EMS设备 - "More data in development..."
- ⚠️ 其他页面需要检查确认

## 注意事项

### 动态生成的内容
对于JavaScript动态生成的内容,有两种处理方式:

#### 方式1: 使用 translateLabel()
```javascript
// 在生成HTML时翻译
const html = `<div>${translateLabel('某个标签')}</div>`;
```

#### 方式2: 生成后添加data-i18n
```javascript
// 生成英文HTML
const html = `<div data-i18n="someKey">Some Label</div>`;
// 插入DOM后调用翻译
applyTouchscreenTranslations();
```

### 状态值和枚举
对于状态值(如"开"/"关"),使用i18n key而不是直接的中文:

```javascript
// ✅ 正确
const status = 'statusOn';  // i18n key
displayText = translateLabel(status);  // 'ON' or '开'

// ❌ 错误
const status = '开';  // 硬编码中文
```

## 总结

**核心原则:** HTML默认语言 = 英文

这不是一个Bug,而是一个**设计决策**,目的是优化性能和提高兼容性。所有开发者在添加新内容时都必须遵循这个规则。
