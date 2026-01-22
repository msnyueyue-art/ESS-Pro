# Rule Engine 表格示例数据国际化修复报告

## 修复问题

用户反馈在英语环境下,rule-engine.html 页面的表格中仍然显示中文内容,具体包括:
- 策略名称列:显示"电池过温告警"、"电池SOC低告警"等中文
- 触发条件列:显示"温度 > 55°C 持续5分钟"等中文

## 修复内容

### 1. ✅ 在 common.js 中添加翻译键

#### 中文翻译 (约2378-2390行)
```javascript
// 示例策略名称
ruleBatteryHighTemp: '电池过温告警',
ruleBatteryLowSOC: '电池SOC低告警',
ruleInverterOverload: '逆变器过载告警',
ruleEnergyAbnormal: '能源异常告警',
ruleNightCharging: '夜间充电监控',

// 示例触发条件
conditionTempOver55: '温度 > 55°C 持续5分钟',
conditionSOCBelow20: 'SOC < 20% 持续3分钟',
conditionPowerOver110: '功率 > 110% 持续2分钟',
conditionFluctuation30: '波动 > 30% 持续10分钟',
conditionNightCharge: '时段 22:00-06:00 充电异常',
```

#### 英文翻译 (约5465-5477行)
```javascript
// Example Strategy Names
ruleBatteryHighTemp: 'Battery High Temperature Alert',
ruleBatteryLowSOC: 'Battery Low SOC Alert',
ruleInverterOverload: 'Inverter Overload Alert',
ruleEnergyAbnormal: 'Energy Abnormal Alert',
ruleNightCharging: 'Night Charging Monitor',

// Example Trigger Conditions
conditionTempOver55: 'Temperature > 55°C for 5 minutes',
conditionSOCBelow20: 'SOC < 20% for 3 minutes',
conditionPowerOver110: 'Power > 110% for 2 minutes',
conditionFluctuation30: 'Fluctuation > 30% for 10 minutes',
conditionNightCharge: 'Period 22:00-06:00 charging abnormal',
```

### 2. ✅ 修改 rule-engine.html 中的 allRules 数组 (2192-2255行)

**修改前:**
```javascript
let allRules = [
    {
        id: 'rule-001',
        name: '电池高温告警',
        condition: '温度 > 55°C 持续5分钟',
        // ...
    },
    // ...
];
```

**修改后:**
```javascript
let allRules = [
    {
        id: 'rule-001',
        name: getTranslation('ruleBatteryHighTemp'),
        condition: getTranslation('conditionTempOver55'),
        // ...
    },
    {
        id: 'rule-002',
        name: getTranslation('ruleBatteryLowSOC'),
        condition: getTranslation('conditionSOCBelow20'),
        // ...
    },
    {
        id: 'rule-003',
        name: getTranslation('ruleInverterOverload'),
        condition: getTranslation('conditionPowerOver110'),
        // ...
    },
    {
        id: 'rule-004',
        name: getTranslation('ruleEnergyAbnormal'),
        condition: getTranslation('conditionFluctuation30'),
        // ...
    },
    {
        id: 'rule-101',
        name: getTranslation('ruleNightCharging'),
        condition: getTranslation('conditionNightCharge'),
        // ...
    }
];
```

## 修复效果对比

### 修复前 (英语环境)
| 策略名称 | 触发条件 |
|---------|---------|
| 电池高温告警 | 温度 > 55°C 持续5分钟 |
| 电池SOC低告警 | SOC < 20% 持续3分钟 |
| 逆变器过载告警 | 功率 > 110% 持续2分钟 |
| 能源异常告警 | 波动 > 30% 持续10分钟 |
| 夜间充电监控 | 时段 22:00-06:00 充电异常 |

### 修复后 (英语环境)
| 策略名称 | 触发条件 |
|---------|---------|
| Battery High Temperature Alert | Temperature > 55°C for 5 minutes |
| Battery Low SOC Alert | SOC < 20% for 3 minutes |
| Inverter Overload Alert | Power > 110% for 2 minutes |
| Energy Abnormal Alert | Fluctuation > 30% for 10 minutes |
| Night Charging Monitor | Period 22:00-06:00 charging abnormal |

## 修改统计

### common.js
- **新增翻译键:** 10个 (策略名称5个 + 触发条件5个)
- **中文位置:** 约2378-2390行
- **英文位置:** 约5465-5477行

### rule-engine.html
- **修改位置:** 2192-2255行 (allRules 数组定义)
- **修改数量:** 5个策略对象,每个对象修改2个字段(name 和 condition)
- **总计:** 10处修改

## 测试验证步骤

1. 打开 [rule-engine.html](file:///C:/Users/33765/Desktop/项目集/原型demo/销售工具/销售工具1230/储能柜-客户端-专业版/rule-engine.html)
2. 切换语言到 **English**
3. 验证表格内容:

### ✅ 策略名称列
- [x] "Battery High Temperature Alert" (原"电池高温告警")
- [x] "Battery Low SOC Alert" (原"电池SOC低告警")
- [x] "Inverter Overload Alert" (原"逆变器过载告警")
- [x] "Energy Abnormal Alert" (原"能源异常告警")
- [x] "Night Charging Monitor" (原"夜间充电监控")

### ✅ 触发条件列
- [x] "Temperature > 55°C for 5 minutes" (原"温度 > 55°C 持续5分钟")
- [x] "SOC < 20% for 3 minutes" (原"SOC < 20% 持续3分钟")
- [x] "Power > 110% for 2 minutes" (原"功率 > 110% 持续2分钟")
- [x] "Fluctuation > 30% for 10 minutes" (原"波动 > 30% 持续10分钟")
- [x] "Period 22:00-06:00 charging abnormal" (原"时段 22:00-06:00 充电异常")

## 相关文件

1. **[common.js](common.js)** - 新增20个翻译键(中英文各10个)
2. **[rule-engine.html](rule-engine.html)** - 修改示例数据数组定义
3. **[RULE_ENGINE_I18N_FIX_COMPLETE.md](RULE_ENGINE_I18N_FIX_COMPLETE.md)** - 之前红框区域的修复报告

## 技术说明

- **动态数据初始化:** 在定义 `allRules` 数组时直接调用 `getTranslation()` 函数
- **实时语言切换:** 当用户切换语言时,需要重新初始化数据并刷新表格
- **完全兼容:** 与系统现有国际化架构完全兼容

## 修复原则

本次修复遵循以下原则:
- ✅ 仅修改用户明确标注的表格示例数据
- ✅ 复用现有翻译基础设施
- ✅ 最小化代码改动
- ✅ 保持代码清晰易维护

## 注意事项

1. **刷新页面生效:** 由于 `allRules` 数组是在页面加载时初始化的,切换语言后需要刷新页面才能看到效果
2. **未修复部分:** description 字段(策略描述)和 notifications 字段(通知方式)仍为中文,如需国际化可后续处理
3. **设备数据:** availableDevices 数组中的设备名称、站点名称等也是中文,如需国际化需要另外处理

所有修改均已完成,请刷新页面并切换到英语环境测试!
