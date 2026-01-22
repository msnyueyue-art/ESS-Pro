const fs = require('fs');

console.log('========================================');
console.log(' 修复工具栏按钮Tooltip国际化');
console.log('========================================\n');

// ========================================
// 第一步: 添加翻译键到 common.js
// ========================================
console.log('[1/2] 添加工具栏按钮翻译键...');

const commonPath = 'common.js';
let commonContent = fs.readFileSync(commonPath, 'utf-8');

const newZhKeys = `
        energyFlowSwitchEditModeTooltip: '切换编辑模式',
        energyFlowSwitchToPreviewTooltip: '切换到预览模式',
        energyFlowBackToEditTooltip: '返回编辑模式',
        energyFlowSaveConfigTooltip: '保存配置',
        energyFlowAlignHorizontalTooltip: '水平对齐选中的设备',
        energyFlowAlignVerticalTooltip: '垂直对齐选中的设备',
        energyFlowDevicesAlignedHorizontal: '已水平对齐 {count} 个设备',
        energyFlowDevicesAlignedVertical: '已垂直对齐 {count} 个设备',`;

const newEnKeys = `
        energyFlowSwitchEditModeTooltip: 'Switch Edit Mode',
        energyFlowSwitchToPreviewTooltip: 'Switch to Preview Mode',
        energyFlowBackToEditTooltip: 'Back to Edit Mode',
        energyFlowSaveConfigTooltip: 'Save Configuration',
        energyFlowAlignHorizontalTooltip: 'Align selected devices horizontally',
        energyFlowAlignVerticalTooltip: 'Align selected devices vertically',
        energyFlowDevicesAlignedHorizontal: '{count} device(s) aligned horizontally',
        energyFlowDevicesAlignedVertical: '{count} device(s) aligned vertically',`;

// 检查是否已存在
if (!commonContent.includes('energyFlowSwitchEditModeTooltip')) {
    // 在 energyFlowFlowExample 后添加
    const zhInsertPoint = commonContent.indexOf("energyFlowFlowExample: '示例：选择\"功率 + 正数\"表示功率为正时流入/流出',");
    if (zhInsertPoint !== -1) {
        const zhBefore = commonContent.substring(0, zhInsertPoint);
        const zhLine = "energyFlowFlowExample: '示例：选择\"功率 + 正数\"表示功率为正时流入/流出',";
        const zhAfter = commonContent.substring(zhInsertPoint + zhLine.length);
        commonContent = zhBefore + zhLine + newZhKeys + zhAfter;
    }

    const enInsertPoint = commonContent.indexOf("energyFlowFlowExample: 'Example: Select \"Power + Positive\" means flow in/out when power is positive',");
    if (enInsertPoint !== -1) {
        const enBefore = commonContent.substring(0, enInsertPoint);
        const enLine = "energyFlowFlowExample: 'Example: Select \"Power + Positive\" means flow in/out when power is positive',";
        const enAfter = commonContent.substring(enInsertPoint + enLine.length);
        commonContent = enBefore + enLine + newEnKeys + enAfter;
    }

    fs.writeFileSync(commonPath, commonContent, 'utf-8');
    console.log('  ✓ 已添加8个新翻译键');
} else {
    console.log('  ○ 翻译键已存在');
}

// ========================================
// 第二步: 修复 energy-flow.html
// ========================================
console.log('\n[2/2] 修复按钮tooltip和提示消息...');

const htmlPath = 'energy-flow.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
let modified = false;

// 2.1 修复编辑/预览按钮的静态tooltip
const oldEditTitle = `<button class="toolbar-btn primary" id="editModeBtn" onclick="toggleEditMode()" title="切换编辑模式">`;
const newEditTitle = `<button class="toolbar-btn primary" id="editModeBtn" onclick="toggleEditMode()" data-translate-title="energyFlowSwitchEditModeTooltip">`;

if (htmlContent.includes(oldEditTitle)) {
    htmlContent = htmlContent.replace(oldEditTitle, newEditTitle);
    console.log('  ✓ 编辑/预览按钮tooltip已国际化');
    modified = true;
}

// 2.2 修复保存按钮的tooltip
const oldSaveTitle = `<button class="toolbar-btn" id="saveBtn" onclick="saveFlowConfig()" title="保存配置" style="display: none;">`;
const newSaveTitle = `<button class="toolbar-btn" id="saveBtn" onclick="saveFlowConfig()" data-translate-title="energyFlowSaveConfigTooltip" style="display: none;">`;

if (htmlContent.includes(oldSaveTitle)) {
    htmlContent = htmlContent.replace(oldSaveTitle, newSaveTitle);
    console.log('  ✓ 保存按钮tooltip已国际化');
    modified = true;
}

// 2.3 修复水平对齐按钮的tooltip
const oldAlignH = `<button class="toolbar-btn" onclick="alignDevicesHorizontal()" title="水平对齐选中的设备">`;
const newAlignH = `<button class="toolbar-btn" onclick="alignDevicesHorizontal()" data-translate-title="energyFlowAlignHorizontalTooltip">`;

if (htmlContent.includes(oldAlignH)) {
    htmlContent = htmlContent.replace(oldAlignH, newAlignH);
    console.log('  ✓ 水平对齐按钮tooltip已国际化');
    modified = true;
}

// 2.4 修复垂直对齐按钮的tooltip
const oldAlignV = `<button class="toolbar-btn" onclick="alignDevicesVertical()" title="垂直对齐选中的设备">`;
const newAlignV = `<button class="toolbar-btn" onclick="alignDevicesVertical()" data-translate-title="energyFlowAlignVerticalTooltip">`;

if (htmlContent.includes(oldAlignV)) {
    htmlContent = htmlContent.replace(oldAlignV, newAlignV);
    console.log('  ✓ 垂直对齐按钮tooltip已国际化');
    modified = true;
}

// 2.5 修复动态设置的tooltip (切换到预览模式)
const oldPreviewTooltip1 = `editModeBtn.title = '切换到预览模式';`;
const newPreviewTooltip1 = `editModeBtn.title = t('energyFlowSwitchToPreviewTooltip');`;

htmlContent = htmlContent.replace(new RegExp(oldPreviewTooltip1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPreviewTooltip1);
console.log('  ✓ 动态tooltip(切换到预览模式)已国际化');
modified = true;

// 2.6 修复动态设置的tooltip (返回编辑模式)
const oldEditTooltip = `editModeBtn.title = '返回编辑模式';`;
const newEditTooltip = `editModeBtn.title = t('energyFlowBackToEditTooltip');`;

htmlContent = htmlContent.replace(new RegExp(oldEditTooltip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newEditTooltip);
console.log('  ✓ 动态tooltip(返回编辑模式)已国际化');
modified = true;

// 2.7 修复水平对齐提示消息
const oldAlignHMsg = `showMiniToast(\`✅ 已水平对齐 \${devices.length} 个设备\`);`;
const newAlignHMsg = `showMiniToast('✅ ' + t('energyFlowDevicesAlignedHorizontal', {count: devices.length}));`;

if (htmlContent.includes(oldAlignHMsg)) {
    htmlContent = htmlContent.replace(oldAlignHMsg, newAlignHMsg);
    console.log('  ✓ 水平对齐提示消息已国际化');
    modified = true;
}

// 2.8 修复垂直对齐提示消息
const oldAlignVMsg = `showMiniToast(\`✅ 已垂直对齐 \${devices.length} 个设备\`);`;
const newAlignVMsg = `showMiniToast('✅ ' + t('energyFlowDevicesAlignedVertical', {count: devices.length}));`;

if (htmlContent.includes(oldAlignVMsg)) {
    htmlContent = htmlContent.replace(oldAlignVMsg, newAlignVMsg);
    console.log('  ✓ 垂直对齐提示消息已国际化');
    modified = true;
}

// 保存修改
if (modified) {
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log('\n✅ energy-flow.html 已更新');
} else {
    console.log('\n○ 无需修改');
}

console.log('\n========================================');
console.log(' 修复完成!');
console.log('========================================');
console.log('\n新增翻译键: 8个');
console.log('修复内容:');
console.log('  ✓ 编辑/预览按钮tooltip (静态)');
console.log('  ✓ 保存按钮tooltip');
console.log('  ✓ 水平对齐按钮tooltip');
console.log('  ✓ 垂直对齐按钮tooltip');
console.log('  ✓ 动态tooltip (切换模式时)');
console.log('  ✓ 对齐操作提示消息');
