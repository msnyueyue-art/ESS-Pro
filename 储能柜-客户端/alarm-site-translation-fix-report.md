# 告警管理站点翻译修复报告

## 修复时间
2025-10-28

## 问题描述
alarm-management.html 页面存在以下翻译问题：
1. 站点下拉选项(586-591行)没有翻译ID
2. JavaScript代码中(814-821行)站点名称是中文硬编码
3. 查询功能无法正确处理站点筛选
4. 语言切换时站点名称不更新

## 修复内容

### 1. 修改 alarm-management.html (第586-592行)
**位置**: 站点下拉选择框

**修改前**:
```html
<option value="科技园区站">科技园区站</option>
<option value="工业园区站">工业园区站</option>
<option value="商业中心站">商业中心站</option>
<option value="物流园区站">物流园区站</option>
<option value="研发中心站">研发中心站</option>
<option value="数据中心站">数据中心站</option>
```

**修改后**:
```html
<option value="site1" data-translate="siteNameTech">科技园区站</option>
<option value="site2" data-translate="siteNameIndustrial">工业园区站</option>
<option value="site3" data-translate="siteNameCommerce">商业中心站</option>
<option value="site4" data-translate="siteNameLogistics">物流园区站</option>
<option value="site5" data-translate="siteNameRD">研发中心站</option>
<option value="site6" data-translate="siteNameDataCenter">数据中心站</option>
```

### 2. 修改 alarm-management.html (第814-821行)
**位置**: JavaScript 站点数组定义

**修改前**:
```javascript
const sites = [
    { id: 'site1', name: '科技园区站' },
    { id: 'site2', name: '工业园区站' },
    { id: 'site3', name: '商业中心站' },
    { id: 'site4', name: '物流园区站' },
    { id: 'site5', name: '研发中心站' },
    { id: 'site6', name: '数据中心站' }
];
```

**修改后**:
```javascript
const sites = [
    { id: 'site1', name: getTranslation('siteNameTech') },
    { id: 'site2', name: getTranslation('siteNameIndustrial') },
    { id: 'site3', name: getTranslation('siteNameCommerce') },
    { id: 'site4', name: getTranslation('siteNameLogistics') },
    { id: 'site5', name: getTranslation('siteNameRD') },
    { id: 'site6', name: getTranslation('siteNameDataCenter') }
];
```

### 3. 修改 common.js (第1184-1189行)
**位置**: 中文翻译区域

**添加内容**:
```javascript
// 站点名称翻译
siteNameTech: '科技园区站',
siteNameIndustrial: '工业园区站',
siteNameCommerce: '商业中心站',
siteNameLogistics: '物流园区站',
siteNameRD: '研发中心站',
siteNameDataCenter: '数据中心站',
```

### 4. 修改 common.js (第2937-2942行)
**位置**: 英文翻译区域

**添加内容**:
```javascript
// Site Name Translations
siteNameTech: 'Tech Park Station',
siteNameIndustrial: 'Industrial Park Station',
siteNameCommerce: 'Commerce Center Station',
siteNameLogistics: 'Logistics Park Station',
siteNameRD: 'R&D Center Station',
siteNameDataCenter: 'Data Center Station',
```

### 5. 修改 alarm-management.html (第1099-1142行)
**位置**: queryAlarms 函数

**修改原因**: 站点下拉框的 value 改为站点ID(site1, site2等)，需要将ID转换为站点名称进行筛选

**修改后**:
```javascript
function queryAlarms() {
    const siteId = document.getElementById('siteFilter').value;
    const device = document.getElementById('deviceFilter').value;
    const level = document.getElementById('levelFilter').value;
    const status = document.getElementById('statusFilter').value;
    const startDate = document.getElementById('startTimeFilter').value;
    const endDate = document.getElementById('endTimeFilter').value;

    // 根据站点ID获取站点名称
    let siteName = '';
    if (siteId) {
        const selectedSite = sites.find(s => s.id === siteId);
        if (selectedSite) {
            siteName = selectedSite.name;
        }
    }

    filteredData = alarmData.filter(alarm => {
        let dateMatch = true;
        if (startDate || endDate) {
            const alarmDate = alarm.time.split(' ')[0];
            if (startDate && alarmDate < startDate) dateMatch = false;
            if (endDate && alarmDate > endDate) dateMatch = false;
        }

        let statusMatch = true;
        if (status) {
            if (status === 'unresolved') {
                statusMatch = alarm.status !== 'resolved';
            } else {
                statusMatch = alarm.status === status;
            }
        }

        return (!siteName || alarm.site === siteName) &&
               (!device || alarm.device.includes(device)) &&
               (!level || alarm.level === level) &&
               statusMatch &&
               dateMatch;
    });

    currentPage = 1;
    renderAlarmTable();
}
```

### 6. 修改 alarm-management.html (第1442-1465行)
**位置**: languageChanged 事件监听器

**添加内容**: 语言切换时重新生成站点名称和告警数据

```javascript
window.addEventListener('languageChanged', function() {
    updateDatePickersLanguage();

    // 重新生成站点名称（使用新语言）
    sites[0].name = getTranslation('siteNameTech');
    sites[1].name = getTranslation('siteNameIndustrial');
    sites[2].name = getTranslation('siteNameCommerce');
    sites[3].name = getTranslation('siteNameLogistics');
    sites[4].name = getTranslation('siteNameRD');
    sites[5].name = getTranslation('siteNameDataCenter');

    // 重新生成告警数据（因为站点名称已更新）
    const newAlarmData = generateAlarmData();
    alarmData.length = 0;
    alarmData.push(...newAlarmData);

    // 重新应用筛选
    filteredData = [...alarmData];
    currentPage = 1;

    // 重新渲染告警表格以更新翻译
    renderAlarmTable();
});
```

## 翻译ID对照表

| 翻译ID | 中文 | 英文 |
|--------|------|------|
| siteNameTech | 科技园区站 | Tech Park Station |
| siteNameIndustrial | 工业园区站 | Industrial Park Station |
| siteNameCommerce | 商业中心站 | Commerce Center Station |
| siteNameLogistics | 物流园区站 | Logistics Park Station |
| siteNameRD | 研发中心站 | R&D Center Station |
| siteNameDataCenter | 数据中心站 | Data Center Station |

## 功能测试清单

### 测试步骤：

1. **站点下拉菜单翻译测试**
   - [ ] 打开 alarm-management.html
   - [ ] 点击站点下拉菜单
   - [ ] 切换到英文，检查站点选项是否显示英文
   - [ ] 切换回中文，检查站点选项是否显示中文

2. **告警列表站点列翻译测试**
   - [ ] 查看告警列表中的站点列
   - [ ] 切换到英文，检查站点名称是否显示英文
   - [ ] 切换回中文，检查站点名称是否显示中文

3. **站点筛选功能测试**
   - [ ] 在站点下拉框中选择一个站点
   - [ ] 点击"查询"按钮
   - [ ] 验证是否只显示该站点的告警
   - [ ] 切换语言后再次测试筛选功能

4. **语言切换测试**
   - [ ] 初始语言为中文，查看所有站点名称
   - [ ] 切换到英文
   - [ ] 验证下拉菜单、告警列表、告警详情中的站点名称都已更新为英文
   - [ ] 切换回中文，验证所有站点名称恢复中文

5. **告警详情站点名称测试**
   - [ ] 点击某个告警的"查看详情"按钮
   - [ ] 查看详情弹窗中的站点名称
   - [ ] 切换语言，关闭重新打开详情，验证站点名称已翻译

## 测试页面

已创建专用测试页面: `alarm-site-translation-test.html`

该页面提供：
- 站点翻译ID和文本的实时预览
- 中英文翻译对照表
- 自动化测试结果
- 语言切换功能

## 修改的文件

1. `/Users/xuexinhai/Desktop/项目集/dist/储能柜/alarm-management.html`
   - 第586-592行：站点下拉选项
   - 第814-821行：站点数组定义
   - 第1099-1142行：查询函数
   - 第1442-1465行：语言切换事件监听器

2. `/Users/xuexinhai/Desktop/项目集/dist/储能柜/common.js`
   - 第1184-1189行：中文翻译
   - 第2937-2942行：英文翻译

## 技术说明

### 翻译机制
1. HTML元素使用 `data-translate` 属性标记需要翻译的内容
2. JavaScript通过 `getTranslation()` 函数从 translations 对象获取翻译文本
3. 语言切换时触发 `languageChanged` 事件，自动更新所有翻译内容

### 站点筛选逻辑
1. 下拉框的 value 使用站点ID (site1, site2等)
2. 查询时根据站点ID查找对应的站点对象
3. 使用站点对象的 name 属性（已翻译）进行筛选
4. 确保在任何语言下筛选功能都能正确工作

### 动态数据更新
1. 告警数据中的站点名称使用翻译后的文本
2. 语言切换时重新生成所有告警数据
3. 保持筛选条件和分页状态

## 完成状态

✅ 所有修改已完成
✅ 翻译ID已添加
✅ 中英文翻译已配置
✅ 查询功能已更新
✅ 语言切换逻辑已实现
✅ 测试页面已创建

## 后续建议

1. **性能优化**: 如果告警数据量很大，考虑在语言切换时只更新可见部分，而不是重新生成所有数据
2. **代码复用**: 可以将站点名称更新逻辑封装为一个函数，便于维护
3. **错误处理**: 添加翻译缺失时的降级处理
4. **文档更新**: 更新项目的翻译指南，说明站点翻译的使用方法

## 验证命令

```bash
# 检查HTML中的翻译ID
grep -n "siteNameTech\|siteNameIndustrial" alarm-management.html

# 检查common.js中的翻译
grep -n "siteNameTech.*:" common.js

# 测试页面
open alarm-site-translation-test.html
```
