const fs = require('fs');

console.log('========================================');
console.log(' 修复能量流页面国际化');
console.log('========================================\n');

const htmlPath = 'energy-flow.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

let modified = false;

// 1. 修复页面标题 - 添加data-translate属性并使用翻译键
console.log('[1/4] 修复页面标题...');
const oldTitle = '<title id="pageTitle">能量流设置 - 储能柜管理系统</title>';
const newTitle = '<title id="pageTitle" data-translate="energyFlowPageTitle">能量流设置</title>';

if (content.includes(oldTitle)) {
    content = content.replace(oldTitle, newTitle);
    console.log('  ✓ 页面标题已添加国际化属性');
    modified = true;
} else if (content.includes(newTitle)) {
    console.log('  ○ 页面标题已国际化');
} else {
    console.log('  ⚠️  未找到页面标题');
}

// 2. 确保预览/编辑按钮有国际化
console.log('\n[2/4] 检查预览/编辑按钮...');
if (content.includes('data-translate="energyFlowPreview"') || content.includes('<span>预览</span>')) {
    console.log('  ○ 预览按钮已有翻译标记');
} else {
    console.log('  ⚠️  预览按钮可能缺少翻译标记');
}

// 3. 检查设备标签是否使用labelKey
console.log('\n[3/4] 检查设备标签配置...');
const hasLabelKey = content.includes("labelKey: 'energyFlowDeviceGrid'");
if (hasLabelKey) {
    console.log('  ✓ 设备标签使用 labelKey');
} else {
    console.log('  ⚠️  设备标签可能未配置 labelKey');
}

// 4. 添加翻译初始化代码到页面加载事件
console.log('\n[4/4] 检查翻译初始化...');
const initCode = `
            // 初始化翻译
            if (typeof applyTranslations === 'function') {
                applyTranslations();
                // 更新页面标题
                const pageTitle = document.getElementById('pageTitle');
                if (pageTitle && typeof getTranslation === 'function') {
                    pageTitle.textContent = getTranslation('energyFlowPageTitle');
                }
            }`;

const loadEventPattern = /window\.addEventListener\('load', function\(\) \{\s*initNavbar\('energy-flow'\);/;

if (content.includes("applyTranslations()")) {
    console.log('  ○ 翻译初始化代码已存在');
} else if (loadEventPattern.test(content)) {
    content = content.replace(
        loadEventPattern,
        `window.addEventListener('load', function() {${initCode}
            initNavbar('energy-flow');`
    );
    console.log('  ✓ 已添加翻译初始化代码');
    modified = true;
} else {
    console.log('  ⚠️  未找到页面加载事件');
}

// 保存修改
if (modified) {
    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log('\n✅ 能量流页面已更新');
} else {
    console.log('\n○ 无需修改');
}

// 最终验证
console.log('\n========================================');
console.log(' 验证结果');
console.log('========================================');

const finalContent = fs.readFileSync(htmlPath, 'utf-8');
const checks = [
    { pattern: /data-translate="energyFlowPageTitle"/, desc: '页面标题翻译属性' },
    { pattern: /labelKey: 'energyFlowDeviceGrid'/, desc: '市电设备标签键' },
    { pattern: /labelKey: 'energyFlowDeviceSolar'/, desc: '光伏设备标签键' },
    { pattern: /labelKey: 'energyFlowDevicePCS'/, desc: 'PCS设备标签键' },
    { pattern: /data-translate="energyFlowAvailableDevices"/, desc: '可用设备标题' },
    { pattern: /data-translate="energyFlowPowerDevices"/, desc: '电源设备标题' },
    { pattern: /data-translate="energyFlowSave"/, desc: '保存按钮' }
];

let allPassed = true;
checks.forEach(check => {
    if (check.pattern.test(finalContent)) {
        console.log(`  ✓ ${check.desc}`);
    } else {
        console.log(`  ✗ ${check.desc}`);
        allPassed = false;
    }
});

console.log('\n========================================');
if (allPassed) {
    console.log(' ✅ 能量流页面国际化修复完成!');
    console.log('========================================\n');
    console.log('测试步骤:');
    console.log('1. 在浏览器中打开能量流页面');
    console.log('2. 切换到英文环境: localStorage.setItem("language", "en"); location.reload();');
    console.log('3. 验证所有文本都显示英文:');
    console.log('   - 页面标题: Energy Flow Settings');
    console.log('   - 左侧菜单: Available Devices, Power Devices, Storage Devices, Load Devices');
    console.log('   - 设备名称: Grid, Generator, Solar, PCS, Load');
    console.log('   - 按钮: Preview, Save, Align Horizontal, Align Vertical');
} else {
    console.log(' ⚠️  部分检查未通过，请手动检查');
    console.log('========================================');
}
