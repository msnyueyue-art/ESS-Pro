# Cabinet Detail 翻译完成指南

## 📋 当前状态

### ✅ 已完成
1. ✅ navbar和sidebar统一（使用navbar.js）
2. ✅ common.js中所有84个翻译键已添加（中文+英文）
3. ✅ 部分HTML元素已添加翻译ID（见下方"已完成列表"）

### ⚠️ 待完成
需要在`cabinet-detail.html`中为以下中文文本添加`id`属性，使其能够被`common.js`的`setLanguage()`函数自动翻译。

---

## 📝 需要添加ID的HTML元素清单

### 1. 实时数据面板 - 核心运行参数（约line 655-698）

**标题：**
```html
<!-- 原代码 -->
<h4 style="font-size: 14px; color: var(--text-secondary); margin: 0;">核心运行参数</h4>

<!-- 修改为 -->
<h4 id="cabinetCoreParamsTitle" style="font-size: 14px; color: var(--text-secondary); margin: 0;">核心运行参数</h4>
```

**设置按钮：**
```html
<!-- 原代码 -->
<span>设置</span>

<!-- 修改为 -->
<span id="cabinetBtnSettings">设置</span>
```

**参数标签：**
```html
<!-- SOC标签 -->
<div class="metric-label">SOC</div>
改为：
<div class="metric-label" id="cabinetLabelSOC">SOC</div>

<!-- SOH标签 -->
<div class="metric-label">SOH</div>
改为：
<div class="metric-label" id="cabinetLabelSOH">SOH</div>

<!-- 温度标签 -->
<div class="metric-label">温度</div>
改为：
<div class="metric-label" id="cabinetLabelTemp">温度</div>

<!-- 充放电功率标签 -->
<div class="metric-label">充放电功率</div>
改为：
<div class="metric-label" id="cabinetLabelPower">充放电功率</div>
```

**状态文本：**
```html
<!-- 电量充足 -->
<div class="metric-status good" id="socStatus">电量充足</div>
改为：
<div class="metric-status good" id="socStatus" data-translate="cabinetStatusBatteryGood">电量充足</div>

<!-- 健康状态良好 -->
<div class="metric-status good" id="sohStatus">健康状态良好</div>
改为：
<div class="metric-status good" id="sohStatus" data-translate="cabinetStatusHealthGood">健康状态良好</div>

<!-- 温度正常 -->
<div class="metric-status good" id="tempStatus">温度正常</div>
改为：
<div class="metric-status good" id="tempStatus" data-translate="cabinetStatusTempNormal">温度正常</div>

<!-- 充电中 -->
<div class="metric-status" id="powerStatus">充电中</div>
改为：
<div class="metric-status" id="powerStatus" data-translate="cabinetStatusCharging">充电中</div>
```

### 2. 实时数据面板 - 运行统计（约line 701-734）

**标题：**
```html
<h4 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">运行统计</h4>
改为：
<h4 id="cabinetRunStatsTitle" style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">运行统计</h4>
```

**统计标签：**
```html
<div class="metric-label">今日充电量</div>
改为：
<div class="metric-label" id="cabinetLabelTodayCharge">今日充电量</div>

<div class="metric-label">今日放电量</div>
改为：
<div class="metric-label" id="cabinetLabelTodayDischarge">今日放电量</div>

<div class="metric-label">充电成本</div>
改为：
<div class="metric-label" id="cabinetLabelChargeCost">充电成本</div>

<div class="metric-label">放电收益</div>
改为：
<div class="metric-label" id="cabinetLabelDischargeRevenue">放电收益</div>
```

### 3. 控制面板 - 策略调度参数（搜索"策略调度参数"）

```html
<h3>策略调度参数</h3>
改为：
<h3 id="cabinetStrategyParamsTitle">策略调度参数</h3>

<!-- 当前策略 -->
当前策略 → <span id="cabinetCurrentStrategy">当前策略</span>

<!-- 峰谷套利 -->
峰谷套利 → <span id="cabinetStrategyPeakValley">峰谷套利</span>

<!-- 自动执行中 -->
自动执行中 → <span id="cabinetStrategyAutoRunning">自动执行中</span>

<!-- 调度指令 -->
调度指令 → <span id="cabinetScheduleCmd">调度指令</span>

<!-- 充电 -->
充电 → <span id="cabinetCmdCharge">充电</span>

<!-- 目标功率 -->
目标功率 → <span id="cabinetTargetPower">目标功率</span>

<!-- 目标SOC -->
目标SOC → <span id="cabinetTargetSOC">目标SOC</span>

<!-- 最大功率 -->
最大功率 → <span id="cabinetMaxPower">最大功率</span>
```

### 4. 控制面板 - 控制要求和模式选择（搜索"控制要求"）

```html
<!-- 控制要求 -->
控制要求 → <span id="cabinetControlRequirements">控制要求</span>

<!-- 自动模式 -->
自动模式 → <span id="cabinetControlModeAuto">自动模式</span>

<!-- 手动模式 -->
手动模式 → <span id="cabinetControlModeManual">手动模式</span>

<!-- 系统根据下方时间轴自动控制充放电 -->
系统根据下方时间轴自动控制充放电 → <span id="cabinetAutoControlDesc">系统根据下方时间轴自动控制充放电</span>
```

### 5. 控制面板 - 电池参数设置（搜索"电池参数设置"）

```html
<!-- 电池参数设置 -->
电池参数设置 → <span id="cabinetBatteryParamsSettings">电池参数设置</span>

<!-- 均衡控制 -->
均衡控制 → <span id="cabinetBalanceControl">均衡控制</span>

<!-- 风扇控制 -->
风扇控制 → <span id="cabinetFanControl">风扇控制</span>
```

### 6. 控制面板 - 消防控制（搜索"消防控制"）

```html
<!-- 消防控制 -->
消防控制 → <span id="cabinetFireControl">消防控制</span>

<!-- 通风控制 -->
通风控制 → <span id="cabinetVentControl">通风控制</span>

<!-- 自动控制（下拉选项） -->
自动控制 → <option id="cabinetAutoControl">自动控制</option>
```

### 7. 按钮文本（搜索所有按钮）

所有页面中的按钮文本需要添加ID：

```html
<!-- 保存 -->
保存 → <span id="cabinetBtnSave">保存</span>

<!-- 取消 -->
取消 → <span id="cabinetBtnCancel">取消</span>

<!-- 确认 -->
确认 → <span id="cabinetBtnConfirm">确认</span>

<!-- 重置 -->
重置 → <span id="cabinetBtnReset">重置</span>

<!-- 应用 -->
应用 → <span id="cabinetBtnApply">应用</span>

<!-- 编辑 -->
编辑 → <span id="cabinetBtnEdit">编辑</span>
```

### 8. 字段设置模态框（搜索"字段显示设置"或"modalTitle"）

```html
<!-- 字段显示设置 -->
<h3 id="modalTitle">字段显示设置</h3>
改为：
<h3 id="cabinetFieldSettingsTitle">字段显示设置</h3>

<!-- 保存设置 -->
保存设置 → <span id="cabinetFieldSettingsSave">保存设置</span>

<!-- 重置为默认 -->
重置为默认 → <span id="cabinetFieldSettingsReset">重置为默认</span>

<!-- 关闭 -->
关闭 → <span id="cabinetFieldSettingsClose">关闭</span>
```

---

## 🔧 快速操作方法

### 方法1：使用文本编辑器批量替换

在cabinet-detail.html中：

1. 打开"查找替换"功能
2. 逐个替换上述列表中的文本节点

### 方法2：使用sed命令批量替换（Mac/Linux）

```bash
cd /Users/xuexinhai/Desktop/项目集/dist/储能柜

# 核心运行参数标题
sed -i '' 's/<h4 style="font-size: 14px; color: var(--text-secondary); margin: 0;">核心运行参数<\/h4>/<h4 id="cabinetCoreParamsTitle" style="font-size: 14px; color: var(--text-secondary); margin: 0;">核心运行参数<\/h4>/g' cabinet-detail.html

# 运行统计标题
sed -i '' 's/<h4 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">运行统计<\/h4>/<h4 id="cabinetRunStatsTitle" style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">运行统计<\/h4>/g' cabinet-detail.html

# SOC标签
sed -i '' 's/<div class="metric-label">SOC<\/div>/<div class="metric-label" id="cabinetLabelSOC">SOC<\/div>/g' cabinet-detail.html

# SOH标签
sed -i '' 's/<div class="metric-label">SOH<\/div>/<div class="metric-label" id="cabinetLabelSOH">SOH<\/div>/g' cabinet-detail.html

# 温度标签
sed -i '' 's/<div class="metric-label">温度<\/div>/<div class="metric-label" id="cabinetLabelTemp">温度<\/div>/g' cabinet-detail.html

# 充放电功率标签
sed -i '' 's/<div class="metric-label">充放电功率<\/div>/<div class="metric-label" id="cabinetLabelPower">充放电功率<\/div>/g' cabinet-detail.html

# 今日充电量
sed -i '' 's/<div class="metric-label">今日充电量<\/div>/<div class="metric-label" id="cabinetLabelTodayCharge">今日充电量<\/div>/g' cabinet-detail.html

# 今日放电量
sed -i '' 's/<div class="metric-label">今日放电量<\/div>/<div class="metric-label" id="cabinetLabelTodayDischarge">今日放电量<\/div>/g' cabinet-detail.html

# 充电成本
sed -i '' 's/<div class="metric-label">充电成本<\/div>/<div class="metric-label" id="cabinetLabelChargeCost">充电成本<\/div>/g' cabinet-detail.html

# 放电收益
sed -i '' 's/<div class="metric-label">放电收益<\/div>/<div class="metric-label" id="cabinetLabelDischargeRevenue">放电收益<\/div>/g' cabinet-detail.html

# ... 继续添加其他替换命令
```

---

## ✅ 已完成的HTML翻译ID列表

以下元素已经添加了翻译ID，**无需再次修改**：

1. ✅ `cabinetBackBtn` - 返回按钮
2. ✅ `cabinetCurrentAlarm` - 当前告警标题
3. ✅ `cabinetTabOverall` - 整机Tab
4. ✅ `cabinetTabEMS` - EMS Tab
5. ✅ `cabinetTabPCS` - 逆变器Tab
6. ✅ `cabinetTabBMS` - BMS Tab
7. ✅ `cabinetTabMeter` - 电表Tab
8. ✅ `cabinetTabThermal` - 温度Tab
9. ✅ `cabinetTabFire` - 消防Tab
10. ✅ `cabinetDataTabRealtime` - 实时数据Tab
11. ✅ `cabinetDataTabHistory` - 历史数据Tab
12. ✅ `cabinetDataTabControl` - 控制Tab
13. ✅ `cabinetMarkerEMS` - EMS组件标记
14. ✅ `cabinetMarkerPCS` - 逆变器组件标记
15. ✅ `cabinetMarkerBMS` - BMS组件标记
16. ✅ `cabinetMarkerMeter` - 电表组件标记
17. ✅ `cabinetMarkerThermal` - 温度组件标记
18. ✅ `cabinetMarkerFire` - 消防组件标记
19. ✅ 组件标记的状态文本（在线/离线/异常）- 使用data-translate属性

---

## 🧪 测试方法

完成所有ID添加后：

1. 打开浏览器访问 cabinet-detail.html
2. 点击顶部导航栏的语言切换按钮（地球图标）
3. 检查所有文本是否正确切换为英文
4. 再次切换回中文，确认翻译正常

---

## 💡 注意事项

1. **动态生成的内容**：某些文本可能是通过JavaScript动态生成的，这些需要在JavaScript代码中使用翻译键更新，而不是直接添加HTML id
2. **data-translate属性**：对于某些动态更新的元素（如状态文本），使用`data-translate="translationKey"`属性，common.js的setLanguage()函数会自动处理
3. **单位文本**：kW、kWh、%、°C等单位也有翻译键，但通常保持原样即可

---

老王提醒：完成这些ID添加后，cabinet-detail.html将实现100%完整的中英文翻译！加油！💪
