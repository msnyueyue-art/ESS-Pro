/**
 * 终极白屏修复 - 强化内联CSS优先级
 * 运行方式: node fix-white-screen-ultimate.js
 */

const fs = require('fs');
const path = require('path');

// 超级强化的关键CSS - 使用最高优先级
const ultimateCriticalCSS = `
    <style id="critical-transition-css">
        /* 终极白屏修复 - 最高优先级 */
        html, html * {
            background-color: #0a0e1a !important;
        }
        
        body {
            background-color: #0a0e1a !important;
            opacity: 0 !important; /* 使用opacity代替visibility,更可靠 */
            transition: opacity 0.3s ease !important;
        }
        
        body.page-ready {
            opacity: 1 !important;
        }
        
        body.page-transitioning {
            animation: criticalFadeOut 0.35s ease-out forwards !important;
        }
        
        @keyframes criticalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        /* 强制所有元素在页面未就绪时不显示 */
        body:not(.page-ready) > * {
            visibility: hidden !important;
        }
        
        body.page-ready > * {
            visibility: visible !important;
        }
    </style>`;

// 需要修复的页面列表
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
let errorCount = 0;

pages.forEach(page => {
    const filePath = path.join(__dirname, page);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除旧的关键CSS
        content = content.replace(
            /<style id="critical-transition-css">[\s\S]*?<\/style>\s*/g,
            ''
        );
        
        // 在 <head> 标签后立即插入新的强化CSS
        content = content.replace(
            /(<head[^>]*>)/i,
            `$1${ultimateCriticalCSS}`
        );
        
        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${page} 终极修复成功`);
        successCount++;
        
    } catch (error) {
        console.error(`❌ ${page} 修复失败:`, error.message);
        errorCount++;
    }
});

console.log('\n' + '='.repeat(50));
console.log(`终极修复完成: 成功 ${successCount} 个, 失败 ${errorCount} 个`);
console.log('='.repeat(50));

if (successCount > 0) {
    console.log('\n✅ 使用的技术:');
    console.log('1. opacity替代visibility - 更可靠的控制');
    console.log('2. body初始opacity:0 - 默认完全隐藏');
    console.log('3. 子元素visibility控制 - 双重保险');
    console.log('4. !important强制优先级 - 不被覆盖');
    console.log('\n现在请刷新页面测试!');
}
