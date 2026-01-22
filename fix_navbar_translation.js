const fs = require('fs');

console.log('========================================');
console.log(' 修复导航栏翻译调用');
console.log('========================================\n');

const navbarPath = 'navbar.js';
let content = fs.readFileSync(navbarPath, 'utf-8');

// 替换错误的 translatePage() 调用为正确的 setLanguage(currentLang)
const oldCode = `    // 翻译导航栏中的所有文本
    if (typeof translatePage === 'function') {
        translatePage();
    }
}`;

const newCode = `    // 翻译导航栏中的所有文本
    // 确保在导航栏HTML插入后应用翻译
    if (typeof setLanguage === 'function' && typeof currentLang !== 'undefined') {
        // 使用setTimeout确保DOM已完全更新
        setTimeout(() => {
            setLanguage(currentLang);
        }, 0);
    }
}`;

if (content.includes('if (typeof translatePage === \'function\')')) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(navbarPath, content, 'utf-8');
    console.log('✅ navbar.js 已更新');
    console.log('   - 修复了翻译函数调用');
    console.log('   - 现在会正确调用 setLanguage(currentLang)');
} else {
    console.log('⚠️  未找到需要修复的代码，可能已经修复过了');
}

console.log('\n========================================');
console.log(' 修复完成!');
console.log('========================================');
console.log('\n现在导航栏会在初始化后自动应用翻译');
console.log('左侧菜单和【专业版】标签将保持正确的语言显示');
