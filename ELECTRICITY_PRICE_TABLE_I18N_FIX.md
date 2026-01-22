# 电价设置表格国际化修复

## 修复时间
2025-01-10

## 修复概述

修复了电价设置页面表格中的硬编码中文文本，包括操作按钮（查看、编辑、删除）和站点数量显示。

## 修复内容

### 1. 修复操作按钮文本 ✅

**位置:** electricity-price-new.html 表格渲染函数

**修改内容:**
- 查看按钮
- 编辑按钮
- 删除按钮

**修改前:**
```javascript
<button class="btn btn-text" onclick="viewTemplate(${template.id})">
    <i class="fas fa-eye"></i> 查看
</button>
<button class="btn btn-text" onclick="editTemplate(${template.id})">
    <i class="fas fa-edit"></i> 编辑
</button>
<button class="btn btn-text btn-danger" onclick="deleteTemplate(${template.id})">
    <i class="fas fa-trash"></i> 删除
</button>
```

**修改后:**
```javascript
<button class="btn btn-text" onclick="viewTemplate(${template.id})">
    <i class="fas fa-eye"></i> ${getTranslation ? getTranslation('elecPriceBtnView') : '查看'}
</button>
<button class="btn btn-text" onclick="editTemplate(${template.id})">
    <i class="fas fa-edit"></i> ${getTranslation ? getTranslation('elecPriceBtnEdit') : '编辑'}
</button>
<button class="btn btn-text btn-danger" onclick="deleteTemplate(${template.id})">
    <i class="fas fa-trash"></i> ${getTranslation ? getTranslation('elecPriceBtnDelete') : '删除'}
</button>
```

### 2. 修复站点数量显示 ✅

**位置:** electricity-price-new.html 表格渲染函数

**修改前:**
```javascript
<td>${appliedSites.length}个站点</td>
```

**修改后:**
```javascript
<td>${appliedSites.length} ${getTranslation ? getTranslation('elecPriceSiteUnit') : '个站点'}</td>
```

**效果:**
- 中文: "0个站点"、"1个站点"、"2个站点"
- 英文: "0 sites"、"1 sites"、"2 sites"

### 3. 新增翻译键到 common.js ✅

#### 中文翻译新增

**位置:** common.js L3075、L3211

```javascript
// 按钮
elecPriceBtnView: '查看',
elecPriceBtnEdit: '编辑',
elecPriceBtnDelete: '删除',

// 单位
elecPriceSiteUnit: '个站点',
```

#### 英文翻译新增

**位置:** common.js L6291、L6427

```javascript
// Buttons
elecPriceBtnView: 'View',
elecPriceBtnEdit: 'Edit',
elecPriceBtnDelete: 'Delete',

// Units
elecPriceSiteUnit: 'sites',
```

### 4. 保留的表格类型名称翻译 ✅

之前已修复的类型名称翻译功能保持有效：

```javascript
<td><span class="badge badge-primary">${getTypeNameTranslation(template.type)}</span></td>
```

**效果:**
- 中文: 分时电价、固定电价、阶梯电价、峰谷平尖
- 英文: Time-of-Use, Fixed Price, Tiered Pricing, Peak-Valley-Flat-Sharp

## 翻译对照表

### 操作按钮
| 翻译键 | 中文 | English |
|--------|------|---------|
| elecPriceBtnView | 查看 | View |
| elecPriceBtnEdit | 编辑 | Edit |
| elecPriceBtnDelete | 删除 | Delete |

### 单位文本
| 翻译键 | 中文 | English |
|--------|------|---------|
| elecPriceSiteUnit | 个站点 | sites |

## 修改统计

### electricity-price-new.html
- 修改表格操作按钮: 6处（购电表格3个按钮 + 上网表格3个按钮）
- 修改站点数量显示: 2处（购电表格 + 上网表格）

### common.js
- 新增中文翻译键: 2个
- 新增英文翻译键: 2个

## 安全性处理

所有使用 `getTranslation()` 的地方都添加了安全检查：

```javascript
${getTranslation ? getTranslation('key') : '默认中文'}
```

这确保了即使 `getTranslation` 函数未加载，页面也能正常显示中文默认值，不会导致JavaScript错误。

## 测试建议

### 1. 中文环境测试
- ✅ 打开电价设置页面
- ✅ 检查表格中的按钮显示"查看"、"编辑"、"删除"
- ✅ 检查站点数量显示为"0个站点"格式
- ✅ 检查类型标签显示中文

### 2. 英文环境测试
切换到英文后：
- ✅ 检查表格中的按钮显示"View"、"Edit"、"Delete"
- ✅ 检查站点数量显示为"0 sites"格式
- ✅ 检查类型标签显示英文（Time-of-Use, Fixed Price等）

### 3. 动态切换测试
- ✅ 在中文环境下查看表格
- ✅ 切换到英文，验证所有文本更新
- ✅ 再切换回中文，验证恢复正常

### 4. 功能测试
- ✅ 点击"查看/View"按钮，确认功能正常
- ✅ 点击"编辑/Edit"按钮，确认功能正常
- ✅ 点击"删除/Delete"按钮，确认功能正常

## 浏览器缓存清除

修改完成后，请使用以下方式清除浏览器缓存：

**Windows/Linux:**
- `Ctrl + F5` 或 `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

## 完成状态

✅ **全部完成** - 电价设置表格已完全支持国际化

所有表格中的硬编码文本已替换为动态翻译，包括：
- ✅ 操作按钮文本
- ✅ 站点数量单位
- ✅ 电价类型标签

## 注意事项

### 不翻译的内容

以下内容保持原样，不进行翻译：
- ❌ 模板名称（如"阶梯电价-固定"）- 这是用户创建的数据
- ❌ 描述文本（如"全年使用同一套峰谷标准"）- 这是用户创建的数据
- ❌ 创建时间（如"2024-01-10 08:45"）- 时间格式

这些是示例数据或用户输入的内容，应该保持原样显示。只有界面固定的文本（按钮、标签、单位等）才需要翻译。
