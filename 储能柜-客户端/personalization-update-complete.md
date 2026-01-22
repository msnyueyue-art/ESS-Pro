# 个性化设置功能更新完成

## 📋 本次更新内容

### 主要改进：能量流图标独立设置

之前版本：只有一个通用的"能量流图标"设置
更新后：支持 5 种独立的能量流图标设置

## ✅ 更新的文件

### 1. personalization.html（主设置页面）
**重要更新：**
- 新增 Tab 导航，分为"系统设置"和"能量流图标"两个标签页
- "系统设置"标签包含：Logo 和登录页海报
- "能量流图标"标签包含 5 种独立图标：
  - ☀️ 光伏（Solar）
  - 🔋 储能柜（Storage）
  - 🏢 负载（Load）
  - ⚙️ 柴发（Generator）
  - ⚡ 市电（Grid）

**JavaScript 更新：**
- 更新 `loadCurrentImages()` 函数支持 5 种图标
- 更新 `displayDefaultImage()` 函数的图标映射：
  ```javascript
  const defaultImages = {
      poster: '摄图网_601826889_风力发电机和储能柜(非企业商用).jpg',
      logo: 'logo.png',
      solar: 'icon/光伏1.png',
      storage: '储能柜.png',
      load: 'icon/负载1.png',
      generator: 'icon/发电机1.png',
      grid: 'icon/电网1.png'
  };
  ```
- 更新所有相关函数的 `previewMap` 和 `storageKeys` 映射

**localStorage 键名：**
- `customSolarIcon` - 光伏图标
- `customStorageIcon` - 储能柜图标
- `customLoadIcon` - 负载图标
- `customGeneratorIcon` - 柴发图标
- `customGridIcon` - 市电图标

### 2. personalization-demo.html（演示页面）
**HTML 结构更新：**
- 重新设计能量流图标展示区域
- 使用响应式网格布局展示 5 种图标
- 每种图标都有独立的状态指示器

**JavaScript 更新：**
- 为每种图标添加独立的加载和显示逻辑
- 实时监听 localStorage 变化
- 状态指示显示"使用默认"或"使用自定义"

### 3. personalization-usage.md（使用指南）
**完整重写，包含：**
- 新的存储键名表格
- 5 种能量流图标的集成示例
- 通用图标加载函数
- 完整的能量流动态展示示例
- 默认图片路径参考

## 🎨 新功能特性

### 1. Tab 导航
```
系统设置 | 能量流图标
```
- 清晰的功能分类
- 更好的用户体验

### 2. 独立图标管理
每种能量流图标都可以：
- ✅ 独立上传自定义图片
- ✅ 独立预览效果
- ✅ 独立恢复默认
- ✅ 悬停查看大图
- ✅ 点击全屏预览

### 3. 默认图片自动加载
系统自动加载项目中的默认图片：
- 光伏：`icon/光伏1.png`
- 储能柜：`储能柜.png`
- 负载：`icon/负载1.png`
- 柴发：`icon/发电机1.png`
- 市电：`icon/电网1.png`

## 📊 数据存储结构

### localStorage 键值对
```javascript
{
  // 系统设置
  "customPoster": "data:image/jpeg;base64,...",
  "customLogo": "data:image/png;base64,...",

  // 能量流图标
  "customSolarIcon": "data:image/png;base64,...",
  "customStorageIcon": "data:image/png;base64,...",
  "customLoadIcon": "data:image/png;base64,...",
  "customGeneratorIcon": "data:image/png;base64,...",
  "customGridIcon": "data:image/png;base64,..."
}
```

## 💻 集成代码示例

### 方式 1：单独获取每个图标
```javascript
const solarIcon = localStorage.getItem('customSolarIcon') || 'icon/光伏1.png';
const storageIcon = localStorage.getItem('customStorageIcon') || '储能柜.png';
const loadIcon = localStorage.getItem('customLoadIcon') || 'icon/负载1.png';
const generatorIcon = localStorage.getItem('customGeneratorIcon') || 'icon/发电机1.png';
const gridIcon = localStorage.getItem('customGridIcon') || 'icon/电网1.png';
```

### 方式 2：使用通用函数
```javascript
function loadEnergyIcon(type, defaultPath) {
    const storageKeys = {
        solar: 'customSolarIcon',
        storage: 'customStorageIcon',
        load: 'customLoadIcon',
        generator: 'customGeneratorIcon',
        grid: 'customGridIcon'
    };
    return localStorage.getItem(storageKeys[type]) || defaultPath;
}

// 使用
const solarIcon = loadEnergyIcon('solar', 'icon/光伏1.png');
```

### 方式 3：批量加载
```javascript
const iconMap = {
    solar: { key: 'customSolarIcon', default: 'icon/光伏1.png' },
    storage: { key: 'customStorageIcon', default: '储能柜.png' },
    load: { key: 'customLoadIcon', default: 'icon/负载1.png' },
    generator: { key: 'customGeneratorIcon', default: 'icon/发电机1.png' },
    grid: { key: 'customGridIcon', default: 'icon/电网1.png' }
};

Object.keys(iconMap).forEach(type => {
    const config = iconMap[type];
    const icon = localStorage.getItem(config.key) || config.default;
    document.querySelector(`.${type}-icon`).src = icon;
});
```

## 🚀 使用流程

### 管理员设置流程：
1. 登录系统
2. 进入"系统管理" → "个性化设置"
3. 选择标签页：
   - "系统设置"：设置 Logo 和登录海报
   - "能量流图标"：设置 5 种能量图标
4. 点击"编辑"按钮
5. 在右侧抽屉中：
   - 查看当前图片
   - 点击"替换"上传新图片
   - 点击"恢复默认"清除自定义（无确认弹窗）
6. 点击"保存"应用更改
7. 刷新相关页面查看效果

### 开发者集成流程：
1. 参考 `personalization-usage.md` 中的代码示例
2. 在需要显示能量流图标的页面加载对应图标
3. 监听 localStorage 变化实现实时更新（可选）

## 🎯 界面特点

### 表格视图
- 清晰的名称、预览、操作三列结构
- 小尺寸缩略图预览（40×40px）
- 悬停显示放大预览（400×400px）
- 点击查看全屏大图

### 右侧编辑抽屉
- 流畅的滑入动画
- 大图预览区域（200px 高度）
- 蓝色"替换"按钮（主操作）
- 灰色"恢复默认"按钮（次要操作）
- 统一的 36px 按钮高度

### 交互细节
- 图片悬停提示："点击查看大图"
- 状态徽章显示使用状态
- Toast 提示操作结果
- ESC 键快速关闭弹窗

## 📝 技术实现要点

### 1. Tab 切换
```javascript
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
}
```

### 2. 图片加载容错
```javascript
const img = new Image();
img.onload = function() {
    // 加载成功，显示图片
    container.innerHTML = `<img src="${defaultImg}" ...>`;
};
img.onerror = function() {
    // 加载失败，显示占位符
    container.innerHTML = getPlaceholder(type);
};
img.src = defaultImg;
```

### 3. 悬停预览
```css
.preview-hover-zoom {
    position: fixed;
    opacity: 0;
    pointer-events: none;
}

.preview-thumbnail:hover .preview-hover-zoom {
    opacity: 1;
}
```

## 📄 文件清单

| 文件名 | 状态 | 说明 |
|--------|------|------|
| `personalization.html` | ✅ 已更新 | 主设置页面，支持 5 种独立图标 |
| `personalization-demo.html` | ✅ 已更新 | 演示页面，展示所有图标效果 |
| `personalization-usage.md` | ✅ 已更新 | 使用指南，包含完整代码示例 |
| `personalization-update-complete.md` | ✅ 新建 | 本更新说明文档 |
| `navbar.js` | ✅ 无需修改 | 已包含个性化设置菜单项 |
| `common.js` | ✅ 无需修改 | 已包含多语言翻译 |

## 🔄 迁移说明

### 从旧版本迁移：
如果之前使用了单一的 `customEnergyIcon`，建议：

```javascript
// 迁移脚本（可选）
const oldIcon = localStorage.getItem('customEnergyIcon');
if (oldIcon && !localStorage.getItem('customStorageIcon')) {
    // 将旧图标设置为储能柜图标
    localStorage.setItem('customStorageIcon', oldIcon);
    localStorage.removeItem('customEnergyIcon');
}
```

## ⚠️ 注意事项

1. **文件路径**：确保项目根目录下存在以下文件：
   - `logo.png`
   - `摄图网_601826889_风力发电机和储能柜(非企业商用).jpg`
   - `储能柜.png`
   - `icon/光伏1.png`
   - `icon/负载1.png`
   - `icon/发电机1.png`
   - `icon/电网1.png`

2. **浏览器兼容性**：支持现代浏览器（Chrome、Firefox、Safari、Edge）

3. **存储大小**：localStorage 有 5-10MB 限制，建议：
   - 压缩图片到合理大小
   - 使用 WebP 格式（如果浏览器支持）
   - 定期清理未使用的自定义图片

4. **性能优化**：
   - Base64 编码会增加约 33% 的数据大小
   - 首次加载可能较慢，建议添加加载动画
   - 考虑使用图片 CDN 存储默认图片

## 🎉 更新完成

所有功能已完整实现并测试通过。您现在可以：
- ✅ 访问 `personalization.html` 进行个性化设置
- ✅ 访问 `personalization-demo.html` 查看实时效果
- ✅ 参考 `personalization-usage.md` 集成到其他页面

---

**更新日期：** 2025年
**版本：** 2.0.0
**状态：** ✅ 完成
