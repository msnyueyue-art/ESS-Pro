/**
 * 回滚错误修复并应用正确方案
 */

const fs = require('fs');
const path = require('path');

// 正确的关键CSS - 只控制html和body,不影响其他元素
const correctCriticalCSS = `
    <style id="critical-transition-css">
        /* 防止白屏 - 只控制html和body背景 */
        html {
            background-color: #0a0e1a !important;
        }
        
        body {
            background-color: #0a0e1a !important;
        }
        
        /* 使用visibility控制显示 */
        body:not(.page-ready) {
            visibility: hidden !important;
        }
        
        body.page-ready {
            visibility: visible !important;
        }
        
        /* 页面切换动画 */
        body.page-transitioning {
            animation: criticalFadeOut 0.35s ease-out forwards !important;
        }
        
        @keyframes criticalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>`;

const pages = [
    'home.html',
    'data.html',
    'control.html',
    'history.html',
    'alarms.html',
    'logs.html',
    'settings.html'
];

let successCount = 0;

pages.forEach(page => {
    const filePath = path.join(__dirname, page);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除错误的关键CSS
        content = content.replace(
            /<style id="critical-transition-css">[\s\S]*?<\/style>\s*/g,
            ''
        );
        
        // 在 <head> 标签后插入正确的CSS
        content = content.replace(
            /(<head[^>]*>)/i,
            `$1${correctCriticalCSS}`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${page} 回滚并修复成功`);
        successCount++;
        
    } catch (error) {
        console.error(`❌ ${page} 失败:`, error.message);
    }
});

console.log(`\n完成: ${successCount}个页面已修复`);
console.log('\n✅ 现在请刷新页面测试!');
