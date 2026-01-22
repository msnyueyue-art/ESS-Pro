# EMS状态值国际化修复说明

## 问题描述

在触摸屏数据页面 (touchscreen/data.html) 的**EMS → 实时数据**标签页中,多个状态值在中文环境下仍显示英文代码。

### 问题详情

**4G网络状态卡片:**
- 信号强度状态: 显示 "signalGood" → 应显示 "信号良好"
- SIM卡状态: 显示 "simInserted" → 应显示 "SIM卡已插入"
- 网络接口状态: 显示 "statusOn" → 应显示 "已开启"

**WiFi状态卡片:**
- 信号强度状态: 显示 "signalGood" → 应显示 "信号良好"
- 网络接口状态: 显示 "statusOff" → 应显示 "已关闭"

## 问题位置

**文件**: `touchscreen/data.html`

### 问题代码位置

**translateLabel() 函数 (第4100-4400行)**

问题根源在于 `translateLabel()` 函数的逻辑:

```javascript
function translateLabel(label) {
    const lang = getTouchscreenLang();
    if (lang === 'zh') return label;  // ❌ 中文环境直接返回原值

    const labelTranslations = {
        // ... 只有英文翻译
        'signalGood': 'Good Signal',
        'simInserted': 'Inserted',
        'statusOn': 'ON',
        'statusOff': 'OFF'
    };

    return labelTranslations[label] || label;
}
```

**问题分析**:
1. 这些状态值(signalGood, simInserted, statusOn, statusOff)是英文代码值,不是中文标签
2. 当语言是中文时,函数在第4103行直接返回原值,不进行翻译
3. 因此中文环境下显示的是英文代码值,而不是中文翻译

**数据源位置 (第4694-4699行)**:
```javascript
// EMS控制器 - 4G网络状态
signalStrength: '-65',
simStatus: 'simInserted',      // 英文代码值
networkStatus: 'statusOn',     // 英文代码值

// EMS控制器 - WiFi状态
wifiSignal: '-79',
wifiConnection: 'statusOff',   // 英文代码值
```

## 修复方案

### 修改内容

修改 `translateLabel()` 函数,为这些特殊状态值添加中英文双向翻译映射。

**修改位置**: `touchscreen/data.html` 第4101-4120行

修改前:
```javascript
function translateLabel(label) {
    const lang = getTouchscreenLang();
    if (lang === 'zh') return label;

    const labelTranslations = {
        // ... 其他翻译
        // EMS状态值翻译
        'signalGood': 'Good Signal',
        'simInserted': 'Inserted',
        'statusOn': 'ON',
        'statusOff': 'OFF'
    };

    return labelTranslations[label] || label;
}
```

修改后:
```javascript
function translateLabel(label) {
    const lang = getTouchscreenLang();

    // 特殊状态值翻译 (这些值无论中英文都需要翻译)
    const statusValueTranslations = {
        'signalGood': lang === 'zh' ? '信号良好' : 'Good Signal',
        'simInserted': lang === 'zh' ? 'SIM卡已插入' : 'Inserted',
        'statusOn': lang === 'zh' ? '已开启' : 'ON',
        'statusOff': lang === 'zh' ? '已关闭' : 'OFF'
    };

    // 如果是特殊状态值,直接返回翻译
    if (statusValueTranslations[label]) {
        return statusValueTranslations[label];
    }

    // 中文环境下,普通标签不需要翻译
    if (lang === 'zh') return label;

    const labelTranslations = {
        // ... 其他翻译 (移除了之前的 EMS 状态值翻译)
    };

    return labelTranslations[label] || label;
}
```

## 技术说明

### 修复原理

1. **识别特殊状态值**: 将英文代码值(signalGood, simInserted等)识别为需要特殊处理的状态值
2. **双向翻译**: 创建 `statusValueTranslations` 对象,根据当前语言返回对应翻译
3. **优先处理**: 在通用翻译逻辑之前检查并处理这些特殊状态值
4. **保持兼容**: 其他普通标签的翻译逻辑保持不变

### 状态值翻译映射

| 英文代码值 | 中文翻译 | 英文翻译 | 用途 |
|-----------|---------|---------|------|
| signalGood | 信号良好 | Good Signal | 4G/WiFi信号强度状态 |
| simInserted | SIM卡已插入 | Inserted | SIM卡状态 |
| statusOn | 已开启 | ON | 网络接口开启状态 |
| statusOff | 已关闭 | OFF | 网络接口关闭状态 |

### 工作流程

**中文环境**:
1. `translateLabel('signalGood')` 被调用
2. 检查 `statusValueTranslations`,找到映射
3. 当前语言是 'zh',返回 "信号良好"
4. 卡片显示 "信号良好"

**英文环境**:
1. `translateLabel('signalGood')` 被调用
2. 检查 `statusValueTranslations`,找到映射
3. 当前语言是 'en',返回 "Good Signal"
4. 卡片显示 "Good Signal"

## 修复效果

### 中文环境

**4G网络状态卡片:**
- 信号强度: -65 dBm (状态: **"信号良好"**) ✅
- SIM卡状态: **"SIM卡已插入"** ✅
- 网络接口: **"已开启"** ✅

**WiFi状态卡片:**
- 信号强度: -79 dBm (状态: **"信号良好"**) ✅
- 网络接口: **"已关闭"** ✅

### 英文环境

**4G Network Status Card:**
- Signal Strength: -65 dBm (Status: **"Good Signal"**) ✅
- SIM Status: **"Inserted"** ✅
- Network Interface: **"ON"** ✅

**WiFi Status Card:**
- Signal Strength: -79 dBm (Status: **"Good Signal"**) ✅
- Network Interface: **"OFF"** ✅

### 语言切换

- ✅ 从中文切换到英文: "信号良好" → "Good Signal", "SIM卡已插入" → "Inserted"
- ✅ 从英文切换到中文: "Good Signal" → "信号良好", "Inserted" → "SIM卡已插入"
- ✅ 所有状态值随语言切换正确更新
- ✅ 不影响其他字段的显示和功能

## 测试方法

### 中文环境测试

1. **打开触摸屏系统**
   - 访问: `touchscreen/touchscreen-display.html`
   - 确保当前语言为中文

2. **导航到EMS实时数据**
   - 点击左侧 "EMS"
   - 确认顶部 "实时数据" 标签被选中(默认)

3. **验证4G网络状态卡片**
   - 向下滚动找到 "4G网络状态" 分组
   - 验证三个卡片:
     - **信号强度**: 显示数值(如 -65 dBm),状态显示 "信号良好"
     - **SIM卡状态**: 显示 "SIM卡已插入"
     - **网络接口**: 显示 "已开启"

4. **验证WiFi状态卡片**
   - 找到 "WiFi状态" 分组
   - 验证两个卡片:
     - **信号强度**: 显示数值(如 -79 dBm),状态显示 "信号良好"
     - **网络接口**: 显示 "已关闭"

### 英文环境测试

1. **切换到英文**
   - 点击右上角语言切换按钮(地球图标)
   - 等待页面刷新

2. **验证4G Network Status**
   - Navigate to EMS → Real-time Data
   - Verify "4G Network Status" section:
     - **Signal Strength**: Shows value with status "Good Signal"
     - **SIM Status**: Shows "Inserted"
     - **Network Interface**: Shows "ON"

3. **验证WiFi Status**
   - Verify "WiFi Status" section:
     - **Signal Strength**: Shows value with status "Good Signal"
     - **Network Interface**: Shows "OFF"

### 语言切换测试

1. **来回切换语言**
   - 在EMS实时数据页面停留
   - 多次切换中英文
   - 每次切换后验证所有状态值显示正确

2. **数据刷新测试**
   - 等待数据自动刷新(每3秒)
   - 验证刷新后状态值仍保持正确的语言

3. **页面刷新测试**
   - 按F5刷新页面
   - 验证页面加载后状态值显示正确的语言

## 相关文件

- `touchscreen/data.html` - 数据页面主文件 (包含EMS实时数据显示)
- `touchscreen/touchscreen-i18n.js` - 触摸屏国际化配置文件(未修改)
- `touchscreen/touchscreen-display.html` - 触摸屏显示入口页面

## 注意事项

1. ✅ **已验证兼容性**: 修改不影响其他字段的显示和翻译逻辑
2. ✅ **双向翻译**: 同时支持中文和英文环境
3. ✅ **优先处理**: 特殊状态值在普通翻译逻辑之前处理,确保正确性
4. ✅ **保持一致**: 与其他状态值的显示方式保持一致
5. ✅ **无副作用**: 仅修改 `translateLabel()` 函数,不影响其他代码
6. ⚠️ **代码值约定**: 这些状态值(signalGood等)是后端返回的代码值,前端负责翻译显示
7. ⚠️ **扩展性**: 如果后续添加新的状态值,需要在 `statusValueTranslations` 对象中添加映射

## 设计模式

本次修复采用了 **策略模式**:
- 识别特殊类型的输入(状态值代码)
- 使用专门的翻译策略(statusValueTranslations)
- 回退到通用翻译策略(labelTranslations)

这种设计模式的优点:
1. **清晰分离**: 特殊状态值和普通标签的翻译逻辑分离
2. **易于维护**: 新增状态值只需在一个对象中添加
3. **性能优化**: 优先检查特殊值,避免不必要的查找
4. **代码可读性**: 意图明确,容易理解

## 相关修复

本次修复是触摸屏系统国际化修复系列的一部分,相关修复包括:
- 触摸屏历史数据日历国际化修复
- PCS历史数据图表国际化修复
- 电表历史数据图表国际化修复
- 温度和消防历史数据图表国际化修复
- 触摸屏展示页面标题国际化修复
- 整机收益分析时间类型下拉菜单国际化修复
- **EMS状态值国际化修复** (本文档)

## 修复日期

2026-01-15

## 修复人员

Claude AI Assistant
