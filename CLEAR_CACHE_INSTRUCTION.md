# 清除浏览器缓存说明

## 问题原因

修改已经成功保存到文件,但是浏览器使用了缓存的旧版本,所以看不到更新。

## 解决方法

### 方法1: 强制刷新 (推荐)

在浏览器中按以下快捷键:

**Windows/Linux:**
- `Ctrl + F5` 或
- `Ctrl + Shift + R`

**Mac:**
- `Cmd + Shift + R`

### 方法2: 清除缓存后刷新

1. 在浏览器中按 `F12` 打开开发者工具
2. **右键点击**浏览器的刷新按钮
3. 选择 **"清空缓存并硬性重新加载"** (Chrome)
   或 **"清除缓存并刷新"** (Edge/Firefox)

### 方法3: 完全清除浏览器缓存

**Chrome/Edge:**
1. 按 `Ctrl + Shift + Delete`
2. 选择时间范围: "全部时间"
3. 勾选 "缓存的图片和文件"
4. 点击 "清除数据"

**Firefox:**
1. 按 `Ctrl + Shift + Delete`
2. 选择时间范围: "全部"
3. 勾选 "缓存"
4. 点击 "立即清除"

### 方法4: 无痕模式测试

打开一个新的无痕/隐私窗口:
- Chrome/Edge: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

然后重新打开页面 URL

## 验证修复

清除缓存后,在**英文环境**下应该看到:

**状态下拉选项:**
- ✅ "启用" → "Active"
- ✅ "禁用" → "Inactive"

**其他界面元素已确认正确翻译:**
- ✅ Edit Role
- ✅ Role Name
- ✅ Role Description
- ✅ Permission Settings
- ✅ Cancel / Save

## 已确认的修改

### roles.html 第666-667行
```html
<!-- 修改前 -->
<option value="active" id="rolesStatusActive">启用</option>
<option value="inactive" id="rolesStatusInactive">禁用</option>

<!-- 修改后 ✅ -->
<option value="active" id="rolesStatusActive" data-translate="rolesStatusActive">启用</option>
<option value="inactive" id="rolesStatusInactive" data-translate="rolesStatusInactive">禁用</option>
```

### common.js 翻译配置
```javascript
// 中文 (第2028-2029行) ✅
rolesStatusActive: '启用',
rolesStatusInactive: '禁用',

// 英文 (第5234-5235行) ✅
rolesStatusActive: 'Active',
rolesStatusInactive: 'Inactive',
```

## 注意事项

**用户输入的数据不会翻译:**
- ❌ 角色名称: "运维人员"
- ❌ 角色描述: "负责日常操作和监控"

这些是用户创建的业务数据,应该保持原样,不进行自动翻译。

## 如果仍然不显示

1. 检查浏览器控制台是否有JavaScript错误
2. 确认语言切换功能是否正常工作
3. 检查 `getTranslation()` 函数是否被正确调用
4. 尝试重新启动浏览器

## 文件版本确认

最后修改时间: 2025-01-10
修改内容: 为状态下拉选项添加 data-translate 属性
