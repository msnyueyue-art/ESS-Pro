# 数据页面国际化修复说明

## 修复日期
2026-01-12

## 问题描述
在英文环境下,数据页面仍然显示中文内容,具体包括:
1. **调度指令中的"最大功率:"** - 硬编码中文文本
2. **循环次数的单位"次"** - 未翻译的中文单位
3. **历史数据图表的坐标轴标识** - "功率"、"电量"、"收益"等未翻译

## 修复内容

### 1. 国际化文件更新 ([touchscreen-i18n.js](touchscreen-i18n.js))

#### 新增翻译键:
```javascript
// 中文
unitTimes: '次',
powerLabel: '功率',
energyLabel: '电量',
revenueLabel: '收益',
maxPowerLabel: '最大功率',

// 英文
unitTimes: 'Times',
powerLabel: 'Power',
energyLabel: 'Energy',
revenueLabel: 'Revenue',
maxPowerLabel: 'Max Power',
```

### 2. 调度指令修复 ([data.html](data.html))

**问题位置:** 第1897行
```javascript
// 修复前
dispatch: {
    label: '调度指令',
    value: '充电',
    subValue: '最大功率:300kW'  // 硬编码中文
}

// 修复后
dispatch: {
    label: '调度指令',
    value: '充电',
    subValueLabel: '最大功率',  // 可翻译的标签
    subValueData: '300',         // 数据
    subValueUnit: 'kW'           // 单位
}
```

**渲染逻辑更新:** 第4226-4238行
```javascript
if (field === 'dispatch' && config.subValueLabel) {
    const subValueText = `${translateLabel(config.subValueLabel)}: ${config.subValueData}${config.subValueUnit}`;
    card.innerHTML = `
        ...
        <div style="font-size: 16px; color: ${statusColor}; margin-top: 4px;">${subValueText}</div>
    `;
}
```

### 3. 单位翻译功能 ([data.html](data.html))

**新增 `translateUnit()` 函数:** 第4209-4221行
```javascript
function translateUnit(unit) {
    const lang = getTouchscreenLang();
    if (lang === 'zh') return unit;

    const unitTranslations = {
        '次': 'Times',
        '天': 'Day',
        '个': 'pcs'
    };

    return unitTranslations[unit] || unit;
}
```

**应用位置:**
- 第4241行: 预定义值的单位显示
- 第4297行: 普通字段的单位显示
- 第4039、4059、4078行: 三相数据的单位显示

### 4. 图表坐标轴翻译 ([data.html](data.html))

#### 功率与SOC综合分析图表 (第5576行)
```javascript
// 修复前
text: '功率 (kW)',

// 修复后
text: `${translateLabel('功率')} (kW)`,
```

#### 收益分析图表 (第5731、5740行)
```javascript
// 修复前
y: { title: { text: '电量 (kWh)' } }
y1: { title: { text: '收益 (¥)' } }

// 修复后
y: { title: { text: `${translateLabel('电量')} (kWh)` } }
y1: { title: { text: `${translateLabel('收益')} (¥)` } }
```

#### 新增标签翻译 (第4197-4198行)
```javascript
'电量': 'Energy',
'收益': 'Revenue',
```

## 测试验证

### 测试步骤:
1. 切换到英文环境 (点击语言切换按钮)
2. 导航到"Data"页面
3. 查看"Overall"设备
4. 检查以下内容:

#### 实时数据标签页:
- ✅ 调度指令显示: "Charging" + "Max Power: 300kW"
- ✅ 循环次数单位: "Times"

#### 历史数据标签页:
- ✅ "功率与SOC综合分析"图表Y轴标签: "Power (kW)"
- ✅ "收益分析"图表Y轴标签: "Energy (kWh)"
- ✅ "收益分析"图表Y1轴标签: "Revenue (¥)"

### 预期结果:
所有原本硬编码的中文文本都应该正确显示为英文。

## 技术要点

### SOLID原则应用:

1. **单一职责原则 (SRP)**
   - `translateLabel()`: 专门负责标签翻译
   - `translateUnit()`: 专门负责单位翻译
   - 各司其职,职责清晰

2. **开闭原则 (OCP)**
   - 翻译字典可扩展,无需修改核心逻辑
   - 新增翻译项只需添加键值对

3. **依赖倒置原则 (DIP)**
   - 渲染逻辑依赖翻译接口而非具体实现
   - 统一通过`translateLabel()`和`translateUnit()`访问翻译

### DRY原则应用:
- 避免重复的翻译逻辑
- 统一的翻译函数供所有组件使用
- 集中管理翻译字典

### KISS原则应用:
- 简单直接的翻译函数实现
- 清晰的配置结构分离(label、data、unit)
- 最小化复杂度

## 影响范围

### 修改文件:
1. `touchscreen/touchscreen-i18n.js` - 新增翻译键
2. `touchscreen/data.html` - 核心修复

### 影响功能:
- ✅ 数据页 - 整机设备 - 实时数据
- ✅ 数据页 - 整机设备 - 历史数据图表
- ✅ 所有使用单位"次"的字段
- ✅ 所有图表坐标轴标签

### 无影响区域:
- 其他页面(Home、History、Control等)
- 其他设备(EMS、PCS、BMS等) - 继承相同的单位翻译逻辑

## 注意事项

1. **缓存清理**: 测试时建议清除浏览器缓存或硬刷新(Ctrl+Shift+R)
2. **语言切换**: 确保localStorage中的`touchscreen_language`值正确
3. **图表渲染**: 图表需要完整重新初始化才能应用翻译
4. **一致性**: 所有新增的数据字段都应使用相同的翻译机制

## 后续建议

1. **扩展单位翻译**: 将更多常用单位加入`translateUnit()`字典
2. **图表标签统一**: 对所有图表的标签统一使用`translateLabel()`
3. **配置验证**: 添加配置验证,确保所有label都有对应翻译
4. **自动化测试**: 编写单元测试验证翻译覆盖率

## 相关文档
- [触摸屏国际化实施说明](触摸屏国际化实施说明.md)
- [国际化修复总结](../国际化修复总结.md)
