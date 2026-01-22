const fs = require('fs');

console.log('========================================');
console.log(' 修复连线拉直按钮和提示');
console.log('========================================\n');

const htmlPath = 'energy-flow.html';
let content = fs.readFileSync(htmlPath, 'utf-8');
let modified = false;

// 1. 修复tooltip属性名
console.log('[1/2] 修复tooltip属性...');
const oldTooltip = `data-title-key="energyFlowStraightenConnectionsTitle"`;
const newTooltip = `data-translate-title="energyFlowStraightenConnectionsTitle"`;

if (content.includes(oldTooltip)) {
    content = content.replace(oldTooltip, newTooltip);
    console.log('  ✓ 已将 data-title-key 修改为 data-translate-title');
    modified = true;
} else if (content.includes(newTooltip)) {
    console.log('  ○ tooltip属性已正确');
} else {
    console.log('  ⚠️  未找到tooltip属性');
}

// 2. 修复"已拉直X条连线"提示消息
console.log('\n[2/2] 修复提示消息...');
const oldToast = `showMiniToast(\`✅ 已拉直 \${changedCount} 条连线\`);`;
const newToast = `showMiniToast('✅ ' + t('energyFlowConnectionsStraightened', {count: changedCount}));`;

if (content.includes(oldToast)) {
    content = content.replace(oldToast, newToast);
    console.log('  ✓ 提示消息已国际化');
    modified = true;
} else if (content.includes(newToast)) {
    console.log('  ○ 提示消息已国际化');
} else {
    console.log('  ⚠️  未找到提示消息');
}

// 保存修改
if (modified) {
    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log('\n✅ energy-flow.html 已更新');
} else {
    console.log('\n○ 无需修改');
}

console.log('\n========================================');
console.log(' 修复完成!');
console.log('========================================');
console.log('\n修复内容:');
console.log('  ✓ tooltip属性: data-title-key → data-translate-title');
console.log('  ✓ 提示消息: 已拉直X条连线 → 使用翻译函数');
console.log('\n现在:');
console.log('  - 鼠标悬停在"连线拉直"按钮上会显示完整的tooltip');
console.log('  - 点击按钮后的提示消息会根据语言环境显示');
