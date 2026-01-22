# 个性化设置使用指南

## 功能说明

个性化设置页面允许管理员自定义以下内容：

### 系统设置
1. **系统 Logo** - 导航栏和登录页的Logo
2. **登录页海报** - 登录页面的背景图片

### 能量流图标
3. **光伏图标** - 光伏能源图标
4. **储能柜图标** - 储能柜图标
5. **负载图标** - 负载图标
6. **柴发图标** - 柴油发电机图标
7. **市电图标** - 市电/电网图标

## 存储键名

自定义设置存储在 localStorage 中，使用以下键名：

| 键名 | 用途 | 默认图片路径 |
|------|------|-------------|
| `customPoster` | 登录页海报 | `摄图网_601826889_风力发电机和储能柜(非企业商用).jpg` |
| `customLogo` | 系统Logo | `logo.png` |
| `customSolarIcon` | 光伏图标 | `icon/光伏1.png` |
| `customStorageIcon` | 储能柜图标 | `储能柜.png` |
| `customLoadIcon` | 负载图标 | `icon/负载1.png` |
| `customGeneratorIcon` | 柴发图标 | `icon/发电机1.png` |
| `customGridIcon` | 市电图标 | `icon/电网1.png` |

## 如何在页面中应用自定义设置

### 1. 在登录页应用自定义海报和Logo

在 `login.html` 或类似登录页面中添加以下代码：

```javascript
// 在页面加载时应用自定义设置
document.addEventListener('DOMContentLoaded', function() {
    // 应用自定义登录页海报
    const customPoster = localStorage.getItem('customPoster');
    if (customPoster) {
        // 假设登录页有一个背景容器
        const bgElement = document.querySelector('.login-background');
        if (bgElement) {
            bgElement.style.backgroundImage = `url(${customPoster})`;
        }
    }

    // 应用自定义Logo
    const customLogo = localStorage.getItem('customLogo');
    if (customLogo) {
        const logoElement = document.querySelector('.logo img');
        if (logoElement) {
            logoElement.src = customLogo;
        }
    }
});
```

### 2. 在导航栏应用自定义Logo

在 `navbar.js` 中修改Logo部分：

```javascript
// 在创建导航栏时应用自定义Logo
function createTopNavbar() {
    const customLogo = localStorage.getItem('customLogo') || 'logo.png';

    return `
    <header class="header">
        <div class="header-left">
            <button class="menu-trigger" onclick="toggleSidebar()">
                <i class="fas fa-bars"></i>
            </button>
            <div class="logo">
                <img src="${customLogo}" alt="AlwaysControl Technology" />
            </div>
        </div>
        ...
    </header>
    `;
}
```

### 3. 在首页应用自定义能量流图标

在 `dashboard.html` 或能量流展示页面中：

```javascript
// 应用自定义能量流图标
function renderEnergyFlow() {
    // 获取所有自定义图标
    const icons = {
        solar: localStorage.getItem('customSolarIcon') || 'icon/光伏1.png',
        storage: localStorage.getItem('customStorageIcon') || '储能柜.png',
        load: localStorage.getItem('customLoadIcon') || 'icon/负载1.png',
        generator: localStorage.getItem('customGeneratorIcon') || 'icon/发电机1.png',
        grid: localStorage.getItem('customGridIcon') || 'icon/电网1.png'
    };

    // 在能量流图中使用自定义图标
    document.querySelector('.solar-icon').src = icons.solar;
    document.querySelector('.storage-icon').src = icons.storage;
    document.querySelector('.load-icon').src = icons.load;
    document.querySelector('.generator-icon').src = icons.generator;
    document.querySelector('.grid-icon').src = icons.grid;
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', renderEnergyFlow);
```

### 4. 创建通用图标加载函数

```javascript
// 通用能量流图标加载函数
function loadEnergyIcon(type, defaultPath) {
    const storageKeys = {
        solar: 'customSolarIcon',
        storage: 'customStorageIcon',
        load: 'customLoadIcon',
        generator: 'customGeneratorIcon',
        grid: 'customGridIcon'
    };

    const customIcon = localStorage.getItem(storageKeys[type]);
    return customIcon || defaultPath;
}

// 使用示例
const solarIcon = loadEnergyIcon('solar', 'icon/光伏1.png');
document.querySelector('.solar-icon').src = solarIcon;
```

## 数据格式

所有图片以 Base64 Data URL 格式存储，例如：
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
```

## 文件大小限制

- 最大文件大小：5MB
- 建议尺寸：
  - 登录页海报：1920x1080px
  - Logo：800x200px（PNG透明背景）
  - 能量流图标：512x512px

## 重置功能

点击编辑页面中的"恢复默认"按钮将删除自定义设置，恢复系统默认图片。

## 注意事项

1. 更改保存后需要刷新相关页面才能看到效果
2. 图片以Base64格式存储在浏览器本地，不会上传到服务器
3. 清除浏览器数据会丢失所有自定义设置
4. 建议定期备份自定义图片文件
5. 每种能量流图标都可以独立设置，互不影响

## 完整示例：能量流动画

```javascript
// 完整的能量流动态展示示例
document.addEventListener('DOMContentLoaded', function() {
    // 定义图标映射
    const iconMap = {
        solar: {
            key: 'customSolarIcon',
            default: 'icon/光伏1.png',
            selector: '.solar-icon'
        },
        storage: {
            key: 'customStorageIcon',
            default: '储能柜.png',
            selector: '.storage-icon'
        },
        load: {
            key: 'customLoadIcon',
            default: 'icon/负载1.png',
            selector: '.load-icon'
        },
        generator: {
            key: 'customGeneratorIcon',
            default: 'icon/发电机1.png',
            selector: '.generator-icon'
        },
        grid: {
            key: 'customGridIcon',
            default: 'icon/电网1.png',
            selector: '.grid-icon'
        }
    };

    // 应用所有图标
    Object.keys(iconMap).forEach(type => {
        const config = iconMap[type];
        const customIcon = localStorage.getItem(config.key);
        const icon = customIcon || config.default;

        const element = document.querySelector(config.selector);
        if (element) {
            element.src = icon;
        }
    });

    // 监听localStorage变化，实时更新
    window.addEventListener('storage', function(e) {
        if (e.key && e.key.startsWith('custom')) {
            location.reload(); // 简单刷新页面
        }
    });
});
```

## 默认图片路径参考

项目中已包含以下默认图片：

- **Logo**: `logo.png`
- **登录海报**: `摄图网_601826889_风力发电机和储能柜(非企业商用).jpg`
- **光伏**: `光伏.png` 或 `icon/光伏1.png`
- **储能柜**: `储能柜.png` 或 `储能柜.jpg`
- **负载**: `负载.png` 或 `icon/负载1.png`
- **柴发**: `icon/发电机1.png`
- **市电**: `电网.png` 或 `icon/电网1.png`

## 演示页面

访问 `personalization-demo.html` 可以实时查看所有自定义设置的效果。
