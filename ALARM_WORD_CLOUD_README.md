# 告警类型词云可视化组件 - 使用说明

## 📋 概述

这是一个专业的告警类型词云可视化组件，设计用于能源储能系统的告警分析页面。组件采用现代化的Material Design 3设计风格，支持深色/浅色主题，并提供区域筛选功能。

## ✨ 功能特性

### 1. 动态词云展示
- **字体大小动态计算**：根据告警数量自动计算字体大小（12px-36px）
- **智能颜色映射**：
  - 🔴 严重 (critical): `#ef4444`
  - 🟠 重要 (major): `#f59e0b`
  - 🔵 一般 (minor/info): `#3b82f6`
- **平滑动画效果**：
  - 标签淡入动画（stagger延迟）
  - 悬停放大效果（scale 1.1）
  - 点击高亮状态
- **TOP 20展示**：自动筛选出告警数量最多的20种类型

### 2. 区域筛选功能
- **位置**：词云容器右上角
- **功能**：
  - 从告警数据中动态提取区域列表
  - 支持"全部区域"和各储能站筛选
  - 切换区域时词云平滑过渡
- **自动识别**：从设备名称中提取区域（如"北京-#3号储能柜" → "北京储能站"）

### 3. 交互功能
- **悬停提示**：
  - 显示告警类型名称
  - 显示告警数量
  - 显示占比百分比
  - 显示告警等级
- **点击选中**：
  - 高亮选中的告警类型
  - 在控制台输出筛选结果（可扩展为详情面板）
  - 再次点击取消选中

### 4. 统计信息
- **图例显示**：严重、重要、一般三个等级的数量
- **总计显示**：当前筛选条件下的告警总数

## 🎨 设计规范

### 颜色系统（深色主题）
```css
背景色: #0f172a (slate-900)
标签背景: rgba(255,255,255,0.03)
标签悬停: rgba(255,255,255,0.08)
边框高亮: currentColor
```

### 排版系统
```css
标题: 16px / font-weight: 600
词云标签: 12-36px / font-weight: 500
提示文本: 12px / font-weight: 400
统计信息: 13px / font-weight: 600
```

### 间距系统
```css
容器内边距: 32px
标签间距: 12px × 16px
标签内边距: 8px 16px
组件间距: 16px
```

### 动画系统
```css
过渡时长: 0.2s
缓动函数: cubic-bezier(0.4, 0, 0.2, 1)
淡入动画: fadeInTag 0.3s ease-out
悬停缩放: scale(1.1)
```

## 🔧 技术实现

### HTML 结构
```html
<div class="hotspot-tab-panel" id="typePanel">
    <!-- 头部：标题 + 区域筛选器 -->
    <div class="alarm-type-header">...</div>

    <!-- 词云容器 -->
    <div class="alarm-word-cloud" id="alarmWordCloud">...</div>

    <!-- 底部：统计信息 + 图例 -->
    <div class="alarm-type-footer">...</div>
</div>
```

### 核心函数

#### 1. `initRegionFilter()`
初始化区域筛选器，从 `allAlarms` 数组中提取唯一区域并填充下拉菜单。

**调用时机**：页面加载后（DOMContentLoaded）

```javascript
setTimeout(() => {
    initRegionFilter();
}, 50);
```

#### 2. `drawAlarmWordCloud(region = '')`
绘制告警词云的主函数。

**参数**：
- `region` (string): 筛选的区域名称，空字符串表示全部区域

**调用示例**：
```javascript
// 显示全部区域的告警
drawAlarmWordCloud();

// 显示北京储能站的告警
drawAlarmWordCloud('北京储能站');
```

**功能流程**：
1. 根据区域筛选告警数据
2. 统计每种告警类型的数量
3. 排序并取TOP 20
4. 计算字体大小（对数缩放）
5. 确定告警等级（优先级：critical > major > minor）
6. 渲染词云标签
7. 添加悬停提示和点击事件
8. 更新统计信息

#### 3. `handleTagClick(type, tagElement)`
处理词云标签的点击事件。

**参数**：
- `type` (string): 告警类型名称
- `tagElement` (HTMLElement): 被点击的标签元素

**功能**：
- 切换标签的选中状态
- 筛选该类型的告警数据
- 输出到控制台（可扩展为显示详情面板）

#### 4. `extractRegions()`
从 `allAlarms` 数组中提取所有唯一的区域名称。

**返回值**：`Array<string>` - 排序后的区域名称数组

**示例**：
```javascript
const regions = extractRegions();
// ['北京储能站', '上海储能站', '深圳储能站']
```

#### 5. `extractRegionFromDevice(deviceName)`
从设备名称中提取区域信息。

**参数**：
- `deviceName` (string): 设备名称（如 "北京-#3号储能柜"）

**返回值**：`string` - 区域名称（如 "北京储能站"）

**逻辑**：
- 使用正则提取设备名称前缀（`^([^-#]+)`）
- 如果不包含"储能站"，自动添加后缀

#### 6. `calculateFontSize(count, maxCount, minCount)`
计算词云标签的字体大小。

**参数**：
- `count` (number): 当前告警类型的数量
- `maxCount` (number): 最大告警类型数量
- `minCount` (number): 最小告警类型数量

**返回值**：`number` - 字体大小（12-36px）

**算法**：对数缩放
```javascript
const ratio = Math.log(count - minCount + 1) / Math.log(maxCount - minCount + 1);
return minSize + (maxSize - minSize) * ratio;
```

#### 7. `getDominantLevel(alarms)`
获取某告警类型的主要等级（按优先级）。

**参数**：
- `alarms` (Array): 该类型的所有告警对象

**返回值**：`string` - 'critical' | 'major' | 'minor' | 'info'

**逻辑**：优先级排序 → critical > major > minor > info

#### 8. `updateTypeStats(sortedTypes, totalCount)`
更新底部的统计信息（图例和总计）。

**参数**：
- `sortedTypes` (Array): 排序后的告警类型数组
- `totalCount` (number): 告警总数

**更新内容**：
- `#criticalCount`: 严重等级的类型数量
- `#majorCount`: 重要等级的类型数量
- `#minorCount`: 一般等级的类型数量
- `#totalAlarmCount`: 告警总数

## 📊 数据结构

### allAlarms 数组格式
```javascript
allAlarms = [
    {
        type: "电池过温",         // 告警类型
        level: "critical",       // 告警等级: critical/major/minor/info
        device: "北京-#3号储能柜",  // 设备名（含区域信息）
        time: "2025-01-08 14:23", // 告警时间
        // ... 其他字段
    },
    // ...
]
```

### typeStats 数据结构
```javascript
typeStats = {
    "电池过温": {
        count: 45,              // 该类型的告警数量
        alarms: [...]           // 该类型的所有告警对象
    },
    // ...
}
```

## 🚀 使用方法

### 1. 页面加载时自动初始化
组件会在 `DOMContentLoaded` 事件中自动初始化：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // ... 其他初始化代码

    // 初始化区域筛选器
    setTimeout(() => {
        initRegionFilter();
    }, 50);

    // ... 绘制图表
    setTimeout(() => {
        drawAlarmTypeChart(); // 会调用 drawAlarmWordCloud()
    }, 100);
});
```

### 2. 手动刷新词云
```javascript
// 刷新全部区域的词云
drawAlarmWordCloud();

// 刷新特定区域的词云
drawAlarmWordCloud('北京储能站');
```

### 3. 主题切换自动适配
主题切换时会自动重绘词云：

```javascript
const observer = new MutationObserver((mutations) => {
    if (mutation.attributeName === 'data-theme') {
        drawAlarmTypeChart(); // 自动调用词云重绘
    }
});
```

### 4. 扩展点击事件
在 `handleTagClick` 函数中添加自定义逻辑：

```javascript
function handleTagClick(type, tagElement) {
    // ... 现有代码

    // ✅ 扩展：显示告警详情面板
    showAlarmDetailsPanel(filteredAlarms);

    // ✅ 扩展：跳转到详情页
    window.location.href = `/alarm-details.html?type=${encodeURIComponent(type)}`;

    // ✅ 扩展：打开模态框
    openAlarmModal(type, filteredAlarms);
}
```

## 🎯 响应式设计

### 大屏（> 1200px）
- 词云字体：12-36px
- 容器内边距：32px
- 每行显示：5-6个标签

### 中屏（768-1200px）
- 词云字体：10-32px
- 容器内边距：24px
- 每行显示：4-5个标签

### 小屏（< 768px）
- 词云字体：8-28px
- 容器内边距：20px
- 每行显示：3-4个标签
- 区域筛选器：100%宽度
- 头部布局：垂直排列

## 🐛 常见问题

### Q1: 词云没有显示？
**检查清单**：
1. 确认 `allAlarms` 数组有数据
2. 检查控制台是否有JavaScript错误
3. 确认 `#alarmWordCloud` 元素存在
4. 检查CSS是否正确加载

### Q2: 区域筛选器没有选项？
**原因**：`allAlarms` 中的设备名格式不符合规则

**解决方案**：
- 确保设备名格式为 `区域-#N号储能柜`（如 "北京-#3号储能柜"）
- 或修改 `extractRegionFromDevice` 函数的正则表达式

### Q3: 词云颜色不正确？
**检查清单**：
1. 确认告警数据包含 `level` 字段
2. 检查 `level` 值是否为 'critical'/'major'/'minor'/'info'
3. 检查CSS的 `[data-level]` 选择器是否生效

### Q4: 悬停提示框被遮挡？
**解决方案**：
- 增加 `.tag-tooltip` 的 `z-index` 值
- 检查父容器是否设置了 `overflow: hidden`

## 🔄 性能优化

### 1. 字体大小计算
使用对数缩放而非线性缩放，使字体差异更平滑：
```javascript
const ratio = Math.log(count - minCount + 1) / Math.log(maxCount - minCount + 1);
```

### 2. CSS动画性能
使用 `will-change: transform` 提示浏览器优化：
```css
.word-cloud-tag {
    will-change: transform;
}
```

### 3. 事件委托
使用事件委托减少事件监听器数量（可选优化）：
```javascript
container.addEventListener('click', (e) => {
    const tag = e.target.closest('.word-cloud-tag');
    if (tag) {
        const type = tag.getAttribute('data-type');
        handleTagClick(type, tag);
    }
});
```

### 4. 防抖/节流
区域筛选器的change事件可添加防抖：
```javascript
let debounceTimer;
filterSelect.addEventListener('change', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        drawAlarmWordCloud(e.target.value);
    }, 150);
});
```

## 📝 待扩展功能

### 1. 详情面板集成
点击词云标签后显示该类型的告警详情：
```javascript
function showAlarmDetailsPanel(alarms) {
    // 实现详情面板逻辑
}
```

### 2. 时间范围筛选
在区域筛选器旁添加时间范围选择器：
```html
<select id="timeRangeFilter">
    <option value="24h">近24小时</option>
    <option value="7d">近7天</option>
    <option value="30d">近30天</option>
</select>
```

### 3. 导出功能
导出词云数据为CSV/Excel：
```javascript
function exportWordCloudData() {
    // 实现导出逻辑
}
```

### 4. 词云布局算法
使用更高级的词云布局算法（如D3-cloud）实现真正的随机布局：
```javascript
// 需要引入 d3-cloud 库
const layout = d3.layout.cloud()...
```

## 📚 参考资料

- [Material Design 3 颜色系统](https://m3.material.io/styles/color/overview)
- [Tailwind CSS 调色板](https://tailwindcss.com/docs/customizing-colors)
- [CSS Cubic-bezier 曲线生成器](https://cubic-bezier.com/)
- [对数缩放算法](https://en.wikipedia.org/wiki/Logarithmic_scale)

## 📞 联系方式

如有问题或建议，请联系开发团队。

---

**版本**: v1.0.0
**最后更新**: 2025-01-08
**作者**: Claude Code UI/UX Designer
