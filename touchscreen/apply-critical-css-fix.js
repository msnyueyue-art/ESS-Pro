/**
 * 批量修复触摸屏页面 - 添加关键内联CSS防止白屏
 * 运行方式: node apply-critical-css-fix.js
 */

const fs = require('fs');
const path = require('path');

// 关键CSS - 内联到head中,确保第一时间生效
const criticalCSS = `
    <style id="critical-transition-css">
        /* 关键过渡CSS - 防止白屏 (最高优先级) */
        html {
            background-color: #0a0e1a !important;
        }
        body {
            background-color: #0a0e1a !important;
            visibility: hidden; /* 默认隐藏,等待JS标记就绪 */
        }
        body.page-ready {
            visibility: visible !important;
        }
        body.page-transitioning {
            animation: criticalFadeOut 0.35s ease-out forwards;
        }
        @keyframes criticalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
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
        
        // 检查是否已经添加过
        if (content.includes('critical-transition-css')) {
            console.log(`⚠️  ${page} 已包含关键CSS,跳过`);
            return;
        }
        
        // 在 <head> 标签后立即插入关键CSS
        content = content.replace(
            /(<head[^>]*>)/i,
            `$1${criticalCSS}`
        );
        
        // 将 page-transition.css 移到 head 前面(如果还在底部)
        const transitionCSSLink = '<link rel="stylesheet" href="page-transition.css">';
        if (content.includes(transitionCSSLink)) {
            // 移除原位置
            content = content.replace(
                /<link rel="stylesheet" href="page-transition\.css">\s*/g,
                ''
            );
            // 在关键CSS后添加
            content = content.replace(
                '</style>',
                `</style>\n    ${transitionCSSLink}`
            );
        }
        
        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${page} 修复成功`);
        successCount++;
        
    } catch (error) {
        console.error(`❌ ${page} 修复失败:`, error.message);
        errorCount++;
    }
});

console.log('\n' + '='.repeat(50));
console.log(`修复完成: 成功 ${successCount} 个, 失败 ${errorCount} 个`);
console.log('='.repeat(50));

if (successCount > 0) {
    console.log('\n✅ 现在请刷新页面测试,白屏问题应该已解决!');
    console.log('\n测试步骤:');
    console.log('1. 强制刷新页面 (Ctrl + F5)');
    console.log('2. 点击任意导航菜单');
    console.log('3. 观察是否还有白屏');
}
