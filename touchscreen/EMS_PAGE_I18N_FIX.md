# EMS页面国际化修复说明

## 修复日期
2026-01-12

## 问题描述
在英文环境下,EMS页面仍然显示中文内容,具体包括:
1. **实时数据中的状态文本** - "信号良好"、"已插入"、"开"、"关"
2. **系统运行时间显示** - "15天 8小时 32分"格式的时间文本
3. **历史数据提示** - "更多数据开发中..."硬编码中文

## 修复内容

### 1. 国际化文件更新 ([touchscreen-i18n.js](touchscreen-i18n.js))

#### 新增翻译键:
```javascript
// 中文
signalGood: '信号良好',
simInserted: '已插入',
statusOn: '开',
statusOff: '关',
moreDataDeveloping: '更多数据开发中...',
days: '天',
hours: '小时',
minutes: '分',

// 英文
signalGood: 'Good Signal',
simInserted: 'Inserted',
statusOn: 'ON',
statusOff: 'OFF',
moreDataDeveloping: 'More data in development...',
days: 'Days',
hours: 'Hours',
minutes: 'Min',
```

### 2. EMS状态文本修复 ([data.html](data.html))

#### 模拟数据更新 (第4495-4500行)
```javascript
// 修复前
simStatus: '已插入',
networkStatus: '开',
wifiConnection: '关',

// 修复后
simStatus: 'simInserted',      // 使用i18n key
networkStatus: 'statusOn',      // 使用i18n key
wifiConnection: 'statusOff',    // 使用i18n key
```

#### 状态映射更新 (第4644-4648行)
```javascript
// 修复前
signalStrength: '信号良好',
wifiSignal: '信号良好',

// 修复后
signalStrength: 'signalGood',  // 使用i18n key
wifiSignal: 'signalGood',      // 使用i18n key
```

#### labelTranslations扩展 (第4207-4211行)
```javascript
// EMS状态值翻译
'signalGood': 'Good Signal',
'simInserted': 'Inserted',
'statusOn': 'ON',
'statusOff': 'OFF'
```

### 3. 运行时间格式化 ([data.html](data.html))

#### 数据结构化 (第4503行)
```javascript
// 修复前
runTime: '15天 8小时 32分',  // 硬编码中文

// 修复后
runTime: { days: 15, hours: 8, minutes: 32 },  // 结构化数据
```

#### 新增格式化函数 (第4225-4237行)
```javascript
function formatTimeDisplay(timeObj) {
    if (typeof timeObj !== 'object' || !timeObj.days) {
        return timeObj;
    }

    const lang = getTouchscreenLang();
    if (lang === 'zh') {
        return `${timeObj.days}天 ${timeObj.hours}小时 ${timeObj.minutes}分`;
    } else {
        return `${timeObj.days}${t('days')} ${timeObj.hours}${t('hours')} ${timeObj.minutes}${t('minutes')}`;
    }
}
```

#### getFieldValue更新 (第4623-4628行)
```javascript
const value = valueMap[field] || '0';

// 特殊处理runTime字段
if (field === 'runTime' && typeof value === 'object' && value.days) {
    return formatTimeDisplay(value);
}

return value;
```

### 4. 历史数据提示修复 ([data.html](data.html))

**问题位置:** 第1739-1741行

**根本原因:** HTML默认内容是中文,但页面国际化逻辑假设HTML默认是英文,只在中文环境下才翻译。

```html
<!-- 修复前 -->
<div style="...">
    更多数据开发中...
</div>

<!-- 修复后 -->
<div style="..." data-i18n="moreDataDeveloping">
    More data in development...
</div>
```

**关键修改:**
1. 添加`data-i18n="moreDataDeveloping"`属性
2. **将HTML默认内容从中文改为英文** - 这是关键!

**国际化逻辑:**
```javascript
// 页面初始化时的逻辑 (data.html:8295-8298)
if (currentLang === 'zh') {
    applyTouchscreenTranslations();  // 只在中文时翻译
}
```

因为页面假设HTML默认是英文,所以所有硬编码的HTML内容都必须是英文,然后在中文环境下通过`data-i18n`属性翻译为中文。

## 测试验证

### 测试步骤:
1. 切换到英文环境
2. 导航到"Data"页面 → "EMS"设备
3. 检查以下内容:

#### 实时数据标签页:
- ✅ "4G网络状态" - SIM Status: "Inserted"
- ✅ "4G网络状态" - Network Interface: "ON"
- ✅ "WiFi状态" - Network Interface: "OFF"
- ✅ "4G网络状态" - Signal Strength状态: "Good Signal"
- ✅ "WiFi状态" - Signal Strength状态: "Good Signal"
- ✅ "系统信息" - System Uptime: "15Days 8Hours 32Min"

#### 历史数据标签页:
- ✅ 中央提示文本: "More data in development..."

### 预期结果:
所有硬编码的中文文本都应该正确显示为英文。

## 技术要点

### SOLID原则应用:

1. **单一职责原则 (SRP)**
   - `formatTimeDisplay()`: 专门负责时间格式化
   - `translateLabel()`: 负责标签和状态翻译
   - 各函数职责单一明确

2. **开闭原则 (OCP)**
   - 时间格式化逻辑可扩展
   - 翻译字典可扩展,无需修改核心逻辑

3. **依赖倒置原则 (DIP)**
   - 使用i18n key而非硬编码值
   - 依赖翻译接口而非具体实现

### DRY原则应用:
- 统一的时间格式化函数
- 复用translateLabel进行状态翻译
- 避免重复的格式化逻辑

### KISS原则应用:
- 简单的对象结构存储时间数据
- 清晰的条件判断处理特殊字段
- 最小化复杂度

## 数据流程

### 状态文本流程:
```
模拟数据(i18n key) → getFieldValue() → createDataCard() → translateLabel() → 显示英文
   'statusOn'                                                    'ON'
```

### 时间显示流程:
```
结构化数据 → getFieldValue() → formatTimeDisplay() → 显示翻译后的时间
{days:15...}      检测对象类型      根据语言格式化    '15Days 8Hours 32Min'
```

### HTML元素流程:
```
HTML元素(data-i18n) → DOMContentLoaded → applyTouchscreenTranslations() → 翻译文本
'moreDataDeveloping'                           替换textContent              'More data...'
```

## 影响范围

### 修改文件:
1. `touchscreen/touchscreen-i18n.js` - 新增翻译键
2. `touchscreen/data.html` - 核心修复

### 影响功能:
- ✅ 数据页 - EMS设备 - 实时数据状态
- ✅ 数据页 - EMS设备 - 系统运行时间
- ✅ 数据页 - EMS设备 - 历史数据提示

### 无影响区域:
- 其他页面(Home、History、Control等)
- 其他设备(Overall、PCS、BMS等)

## 注意事项

1. **数据结构变更**: runTime从字符串改为对象,需要兼容处理
2. **状态值映射**: 使用i18n key作为状态值,通过translateLabel翻译
3. **时间格式**: 不同语言的时间格式可能需要调整(如"Days"/"Day")
4. **缓存清理**: 测试时建议清除浏览器缓存

## 扩展性建议

1. **更多时间格式**: 支持不同的时间显示格式(如紧凑格式"15d 8h 32m")
2. **动态状态**: 支持更多动态状态的国际化
3. **统一处理**: 将所有状态值统一使用i18n key模式
4. **类型验证**: 添加类型检查确保数据格式正确

## 相关文档
- [数据页面国际化修复说明](DATA_PAGE_I18N_FIX.md)
- [触摸屏国际化实施说明](触摸屏国际化实施说明.md)
- [国际化修复总结](../国际化修复总结.md)
