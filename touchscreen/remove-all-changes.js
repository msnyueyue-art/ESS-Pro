/**
 * 移除所有内联CSS修改,恢复原始状态
 */

const fs = require('fs');
const path = require('path');

const pages = [
    'home.html',
    'data.html',
    'control.html',
    'history.html',
    'logs.html',
    'settings.html'
];

let successCount = 0;

pages.forEach(page => {
    const filePath = path.join(__dirname, page);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除内联CSS
        content = content.replace(
            /<style id="critical-transition-css">[\s\S]*?<\/style>\s*/g,
            ''
        );
        
        // 移除page-transition.css链接(如果在head前面)
        const lines = content.split('\n');
        const cleanedLines = [];
        let skipNext = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 跳过critical-transition-css相关的link
            if (line.includes('page-transition.css') && i < 10) {
                continue;
            }
            
            cleanedLines.push(line);
        }
        
        content = cleanedLines.join('\n');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${page} 已清理`);
        successCount++;
        
    } catch (error) {
        console.error(`❌ ${page} 失败:`, error.message);
    }
});

console.log(`\n完成: ${successCount}个页面已恢复原始状态`);
console.log('\n✅ 所有修改已移除,页面恢复原样!');
