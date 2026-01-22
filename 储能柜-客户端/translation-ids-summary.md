# HTML页面翻译ID添加总结

已为四个HTML页面添加翻译ID,支持中英文切换功能。

## 1. menus.html (菜单管理页面)

### 页面元素ID:
- `menusPageTitle` - 页面标题"菜单管理"
- `menusAddBtn` - "新增菜单"按钮
- `menusExportBtn` - "导出"按钮

### 模态框ID:
- `menusModalTitleAdd` - 新增菜单模态框标题
- `menusModalTitleEdit` - 编辑菜单模态框标题(通过JS动态设置)
- `menusLabelName` - "菜单名称"标签
- `menusLabelIcon` - "菜单图标"标签
- `menusLabelPath` - "菜单路径"标签
- `menusLabelParent` - "父级菜单"标签
- `menusLabelStatus` - "状态"标签

### Placeholder属性:
- `data-translate-placeholder="menusPlaceholderName"` - 菜单名称输入框
- `data-translate-placeholder="menusPlaceholderIcon"` - 菜单图标输入框
- `data-translate-placeholder="menusPlaceholderPath"` - 菜单路径输入框

### 选项ID:
- `menusOptionNoParent` - "无(作为一级菜单)"选项
- `menusStatusActive` - "启用"状态选项
- `menusStatusDisabled` - "禁用"状态选项

### 按钮ID:
- `menusBtnCancel` - "取消"按钮
- `menusBtnSave` - "保存"按钮
- `menusDeleteTitle` - 删除确认标题
- `menusDeleteConfirm1` - "确定要删除菜单"
- `menusDeleteConfirm2` - "吗?"
- `menusDeleteWarning` - 删除警告信息
- `menusBtnCancelDelete` - "取消"(删除弹窗)
- `menusBtnConfirmDelete` - "确定删除"按钮
- `menusPathNone` - "无路径"(在JS中动态生成)

---

## 2. roles.html (角色管理页面)

### 页面元素ID:
- `rolesPageTitle` - 页面标题"角色管理"
- `rolesBtnSearch` - "查询"按钮
- `rolesBtnReset` - "重置"按钮
- `rolesBtnAdd` - "新增角色"按钮
- `rolesBtnExport` - "导出"按钮

### Placeholder属性:
- `data-translate-placeholder="rolesSearchPlaceholder"` - 搜索框

### 表格标题ID:
- `rolesTableHeaderName` - "角色名称"
- `rolesTableHeaderDesc` - "角色描述"
- `rolesTableHeaderUserCount` - "用户数量"
- `rolesTableHeaderStatus` - "状态"
- `rolesTableHeaderCreateTime` - "创建时间"
- `rolesTableHeaderActions` - "操作"

### 模态框ID:
- `rolesModalTitleAdd` - 新增角色模态框标题
- `rolesModalTitleEdit` - 编辑角色模态框标题(通过JS动态设置)
- `rolesLabelName` - "角色名称"标签
- `rolesLabelDesc` - "角色描述"标签
- `rolesLabelPermissions` - "权限设置"标签
- `rolesLabelStatus` - "状态"标签

### 状态ID:
- `rolesStatusActive` - "启用"状态
- `rolesStatusInactive` - "禁用"状态

### 按钮ID:
- `rolesBtnCancel` - "取消"按钮
- `rolesBtnSave` - "保存"按钮
- `rolesDeleteTitle` - 删除确认标题
- `rolesDeleteConfirm` - 删除确认信息
- `rolesDeleteWarning` - 删除警告信息
- `rolesBtnConfirmDelete` - "确定删除"按钮

### 分页ID(在JS中使用):
- `rolesPaginationPrev` - "上一页"
- `rolesPaginationNext` - "下一页"

---

## 3. personnel.html (人员管理页面)

### 页面元素ID:
- `personnelPageTitle` - 页面标题"人员管理"
- `personnelBtnSearch` - "查询"按钮
- `personnelBtnReset` - "重置"按钮
- `personnelBtnAdd` - "新增人员"按钮
- `personnelBtnExport` - "导出"按钮

### Placeholder属性:
- `data-translate-placeholder="personnelSearchPlaceholder"` - 搜索框
- `data-translate-placeholder="personnelPlaceholderEmail"` - 邮箱输入框

### 筛选选项ID:
- `personnelFilterAllRoles` - "全部角色"选项

### 表格标题ID:
- `personnelTableHeaderNickname` - "昵称"
- `personnelTableHeaderAccount` - "账号"
- `personnelTableHeaderRole` - "角色"
- `personnelTableHeaderSites` - "权限站点"
- `personnelTableHeaderStatus` - "状态"
- `personnelTableHeaderCreateTime` - "创建时间"
- `personnelTableHeaderActions` - "操作"

### 模态框ID:
- `personnelModalTitleAdd` - 新增人员模态框标题
- `personnelModalTitleEdit` - 编辑人员模态框标题(通过JS动态设置)
- `personnelLabelNickname` - "昵称"标签
- `personnelLabelAccount` - "账号"标签
- `personnelLabelRole` - "角色"标签
- `personnelLabelDevicePermission` - "设备权限"标签
- `personnelLabelStatus` - "状态"标签

### 状态ID:
- `personnelStatusActive` - "启用"状态
- `personnelStatusInactive` - "禁用"状态

### 按钮ID:
- `personnelBtnCancel` - "取消"按钮
- `personnelBtnSave` - "保存"按钮
- `personnelDeleteTitle` - 删除确认标题
- `personnelDeleteConfirm` - 删除确认信息
- `personnelDeleteWarning` - 删除警告信息
- `personnelBtnConfirmDelete` - "确定删除"按钮

### 分页ID(在JS中使用):
- `personnelPaginationPrev` - "上一页"
- `personnelPaginationNext` - "下一页"

---

## 4. logs.html (日志管理页面)

### Tab标签ID:
- `logsTabOperation` - "操作日志"tab
- `logsTabLogin` - "登录日志"tab

### 操作日志搜索区域ID:
- `logsLabelKeyword` - "关键词"标签
- `logsLabelOperationType` - "操作类型"标签
- `logsLabelDateRange` - "日期范围"标签
- `logsBtnSearch` - "查询"按钮
- `logsBtnReset` - "重置"按钮
- `logsBtnExport` - "导出"按钮

### Placeholder属性:
- `data-translate-placeholder="logsPlaceholderKeyword"` - 关键词搜索框
- `data-translate-placeholder="logsPlaceholderUsername"` - 用户名搜索框

### 操作类型选项ID:
- `logsOperationTypeAll` - "全部"
- `logsOperationTypeCreate` - "新增"
- `logsOperationTypeUpdate` - "更新"
- `logsOperationTypeDelete` - "删除"
- `logsOperationTypeQuery` - "查询"

### 操作日志表头ID:
- `logsOperationTableHeaderModule` - "操作模块"
- `logsOperationTableHeaderType` - "操作类型"
- `logsOperationTableHeaderContent` - "操作内容"
- `logsOperationTableHeaderStatus` - "状态"
- `logsOperationTableHeaderUser` - "操作用户"
- `logsOperationTableHeaderIP` - "操作IP"
- `logsOperationTableHeaderTime` - "操作时间"

### 登录日志搜索区域ID:
- `logsLabelUsername` - "用户名"标签
- `logsLabelLoginStatus` - "登录状态"标签

### 登录状态选项ID:
- `logsLoginStatusSuccess` - "成功"
- `logsLoginStatusFailed` - "失败"

### 登录日志表头ID:
- `logsLoginTableHeaderUsername` - "用户名"
- `logsLoginTableHeaderMethod` - "登录方式"
- `logsLoginTableHeaderBrowser` - "浏览器"
- `logsLoginTableHeaderOS` - "操作系统"
- `logsLoginTableHeaderStatus` - "状态"
- `logsLoginTableHeaderIP` - "IP地址"
- `logsLoginTableHeaderTime` - "登录时间"

### 状态文本ID(在JS中使用):
- `logsStatusSuccess` - "成功"状态
- `logsStatusWarning` - "警告"状态
- `logsStatusError` - "失败"状态

### 分页ID(在JS中使用):
- `logsPaginationPrev` - "上一页"
- `logsPaginationNext` - "下一页"

---

## 重要说明

### 1. Placeholder属性使用
对于input元素的placeholder,使用`data-translate-placeholder`属性而不是id,例如:
```html
<input type="text" data-translate-placeholder="menusPlaceholderName" placeholder="请输入菜单名称">
```

### 2. 动态内容处理
某些在JavaScript中动态生成的内容(如状态标签、分页按钮等),需要在JS的渲染函数中使用翻译函数处理,而不是直接添加id。

### 3. 模态框标题动态切换
对于新增/编辑共用的模态框,标题ID需要在JavaScript中根据操作类型动态设置:
- 新增时使用: `xxxModalTitleAdd`
- 编辑时使用: `xxxModalTitleEdit`

### 4. 下一步工作
这些ID需要与common.js中的翻译配置对应,确保:
1. common.js中定义了所有这些key的中英文翻译
2. 页面加载时调用翻译函数
3. 语言切换时能正确更新所有文本
