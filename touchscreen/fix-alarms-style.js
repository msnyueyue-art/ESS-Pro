const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'alarms.html');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 修复body背景色
    content = content.replace(
        /body\s*\{[\s\S]*?background:\s*#f0f2f5;/g,
        (match) => match.replace('#f0f2f5', '#0a0e1a')
    );
    
    // 确保body有深色文字颜色
    content = content.replace(
        /(body\s*\{[^}]*overflow:\s*hidden;)/,
        '$1\n            color: #fff;'
    );
    
    // 修复内容区域背景
    content = content.replace(
        /\.content\s*\{[\s\S]*?background:\s*#f0f2f5;/g,
        (match) => match.replace('#f0f2f5', '#0a0e1a')
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ alarms.html 风格修复成功!');
    console.log('修改内容:');
    console.log('1. body背景: #f0f2f5 → #0a0e1a');
    console.log('2. 添加文字颜色: color: #fff');
    console.log('3. 内容区域背景统一为深色');
    
} catch (error) {
    console.error('❌ 修复失败:', error.message);
}
