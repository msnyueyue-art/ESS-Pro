// 页面切换过渡效果 - 彻底消除白屏的优化版

// 创建加载遮罩层
function createLoadingOverlay() {
    if (document.getElementById('pageLoadingOverlay')) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'pageLoadingOverlay';
    overlay.className = 'page-loading-overlay';
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div class="page-loading-spinner"></div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// 平滑页面切换 - 最快速度,最短白屏
function smoothPageTransition(url) {
    // 创建遮罩层
    createLoadingOverlay();

    const overlay = document.getElementById('pageLoadingOverlay');

    // 立即显示深色遮罩,覆盖白屏
    overlay.classList.add('active');

    // 同时触发淡出
    document.body.classList.add('page-transitioning');

    // 极短延迟后立即跳转 (150ms = 最短可感知时间)
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}

// 重写switchPage函数
window.smoothSwitchPage = function(page) {
    // 更新活动菜单项
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 找到被点击的菜单项并激活
    const clickedItem = event.target.closest('.nav-item');
    if (clickedItem) {
        clickedItem.classList.add('active');
    }

    // 页面映射
    const pageMap = {
        'home': 'home.html',
        'data': 'data.html',
        'history': 'history.html',
        'control': 'control.html',
        'alarm': 'alarm.html',
        'log': 'logs.html',
        'settings': 'settings.html'
    };

    // 如果已经在目标页面，不跳转
    const currentPage = window.location.pathname.split('/').pop();
    const targetPage = pageMap[page];

    if (currentPage === targetPage) {
        return false;
    }

    // 使用平滑过渡跳转
    if (targetPage) {
        smoothPageTransition(targetPage);
    }

    return false;
};

// 页面加载完成后的优化处理
document.addEventListener('DOMContentLoaded', function() {
    // 移除过渡类,准备下次过渡
    document.body.classList.remove('page-transitioning');
    
    // 标记页面就绪,显示内容
    document.body.classList.add('page-ready');

    // 创建遮罩层(预先创建,避免首次点击延迟)
    createLoadingOverlay();
    
    // 移除加载遮罩的active状态(如果有)
    setTimeout(() => {
        const overlay = document.getElementById('pageLoadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }, 100);
});

// 预加载关键页面资源(可选优化)
function preloadPages() {
    const pages = ['home.html', 'data.html', 'history.html', 'control.html', 'alarms.html', 'logs.html', 'settings.html'];

    pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// 延迟预加载,避免影响当前页面加载
setTimeout(preloadPages, 2000);

// 覆盖原生switchPage函数,使所有页面都使用平滑过渡
window.addEventListener('load', function() {
    const originalSwitchPage = window.switchPage;

    window.switchPage = function(page) {
        // 优先使用平滑切换
        if (typeof smoothSwitchPage === 'function') {
            return smoothSwitchPage(page);
        }
        // 后备方案:使用原始函数
        if (originalSwitchPage) {
            return originalSwitchPage(page);
        }
    };
});

// 防止浏览器前进/后退时出现白屏
window.addEventListener('pageshow', function(event) {
    // 如果是从缓存恢复的页面
    if (event.persisted) {
        document.body.classList.remove('page-transitioning');
        document.body.classList.add('page-ready');
        const overlay = document.getElementById('pageLoadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
});
