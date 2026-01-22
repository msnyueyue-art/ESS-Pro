const fs = require('fs');

console.log('========================================');
console.log(' 修复设备设置面板国际化');
console.log('========================================\n');

// ========================================
// 第一步: 添加翻译键到 common.js
// ========================================
console.log('[1/2] 添加设备设置面板翻译键...');

const commonPath = 'common.js';
let commonContent = fs.readFileSync(commonPath, 'utf-8');

const newZhKeys = `
        energyFlowDeviceSettings: '设置',
        energyFlowDeviceName: '设备名称',
        energyFlowDisplayParams: '显示参数（可多选）',
        energyFlowParamPower: '功率 (P)',
        energyFlowParamVoltage: '电压 (U)',
        energyFlowParamCurrent: '电流 (I)',
        energyFlowParamSOC: 'SOC (%)',
        energyFlowFlowDirection: '流向',
        energyFlowFlowIn: '流入',
        energyFlowFlowOut: '流出',
        energyFlowDirectionPositive: '正数',
        energyFlowDirectionNegative: '负数',
        energyFlowFlowExample: '示例：选择"功率 + 正数"表示功率为正时流入/流出',`;

const newEnKeys = `
        energyFlowDeviceSettings: 'Settings',
        energyFlowDeviceName: 'Device Name',
        energyFlowDisplayParams: 'Display Parameters (Multi-select)',
        energyFlowParamPower: 'Power (P)',
        energyFlowParamVoltage: 'Voltage (U)',
        energyFlowParamCurrent: 'Current (I)',
        energyFlowParamSOC: 'SOC (%)',
        energyFlowFlowDirection: 'Flow Direction',
        energyFlowFlowIn: 'Flow In',
        energyFlowFlowOut: 'Flow Out',
        energyFlowDirectionPositive: 'Positive',
        energyFlowDirectionNegative: 'Negative',
        energyFlowFlowExample: 'Example: Select "Power + Positive" means flow in/out when power is positive',`;

// 检查是否已存在
if (!commonContent.includes('energyFlowDeviceSettings')) {
    // 在 energyFlowLoadFailed 后添加
    const zhInsertPoint = commonContent.indexOf("energyFlowLoadFailed: '加载失败：{error}',");
    if (zhInsertPoint !== -1) {
        const zhBefore = commonContent.substring(0, zhInsertPoint);
        const zhLine = "energyFlowLoadFailed: '加载失败：{error}',";
        const zhAfter = commonContent.substring(zhInsertPoint + zhLine.length);
        commonContent = zhBefore + zhLine + newZhKeys + zhAfter;
    }

    const enInsertPoint = commonContent.indexOf("energyFlowLoadFailed: 'Load failed: {error}',");
    if (enInsertPoint !== -1) {
        const enBefore = commonContent.substring(0, enInsertPoint);
        const enLine = "energyFlowLoadFailed: 'Load failed: {error}',";
        const enAfter = commonContent.substring(enInsertPoint + enLine.length);
        commonContent = enBefore + enLine + newEnKeys + enAfter;
    }

    fs.writeFileSync(commonPath, commonContent, 'utf-8');
    console.log('  ✓ 已添加13个新翻译键');
} else {
    console.log('  ○ 翻译键已存在');
}

// ========================================
// 第二步: 修复 energy-flow.html 中的设备设置面板
// ========================================
console.log('\n[2/2] 修复设备设置面板内容...');

const htmlPath = 'energy-flow.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
let modified = false;

// 2.1 修复设备设置面板标题
const oldTitle = `titleEl.textContent = \`\${device.label} - 设置\`;`;
const newTitle = `titleEl.textContent = \`\${device.label} - \${t('energyFlowDeviceSettings')}\`;`;

if (htmlContent.includes(oldTitle)) {
    htmlContent = htmlContent.replace(oldTitle, newTitle);
    console.log('  ✓ 面板标题已国际化');
    modified = true;
}

// 2.2 修复"设备名称"标签
const oldDeviceName = `<label class="settings-item-label">设备名称</label>`;
const newDeviceName = `<label class="settings-item-label">\${t('energyFlowDeviceName')}</label>`;

if (htmlContent.includes(oldDeviceName)) {
    htmlContent = htmlContent.replace(oldDeviceName, newDeviceName);
    console.log('  ✓ 设备名称标签已国际化');
    modified = true;
}

// 2.3 修复"显示参数"标签
const oldDisplayParams = `<label class="settings-item-label">显示参数（可多选）</label>`;
const newDisplayParams = `<label class="settings-item-label">\${t('energyFlowDisplayParams')}</label>`;

if (htmlContent.includes(oldDisplayParams)) {
    htmlContent = htmlContent.replace(oldDisplayParams, newDisplayParams);
    console.log('  ✓ 显示参数标签已国际化');
    modified = true;
}

// 2.4 修复复选框标签 (功率、电压、电流、SOC)
const paramReplacements = [
    { old: `<span style="font-size: 13px; color: var(--text-primary);">功率 (P)</span>`,
      new: `<span style="font-size: 13px; color: var(--text-primary);">\${t('energyFlowParamPower')}</span>` },
    { old: `<span style="font-size: 13px; color: var(--text-primary);">电压 (U)</span>`,
      new: `<span style="font-size: 13px; color: var(--text-primary);">\${t('energyFlowParamVoltage')}</span>` },
    { old: `<span style="font-size: 13px; color: var(--text-primary);">电流 (I)</span>`,
      new: `<span style="font-size: 13px; color: var(--text-primary);">\${t('energyFlowParamCurrent')}</span>` },
    { old: `<span style="font-size: 13px; color: var(--text-primary);">SOC (%)</span>`,
      new: `<span style="font-size: 13px; color: var(--text-primary);">\${t('energyFlowParamSOC')}</span>` }
];

paramReplacements.forEach(({ old, new: newText }) => {
    if (htmlContent.includes(old)) {
        htmlContent = htmlContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
        modified = true;
    }
});
console.log('  ✓ 参数复选框标签已国际化');

// 2.5 修复"流向"标签
const oldFlowDirection = `<label class="settings-item-label">流向</label>`;
const newFlowDirection = `<label class="settings-item-label">\${t('energyFlowFlowDirection')}</label>`;

if (htmlContent.includes(oldFlowDirection)) {
    htmlContent = htmlContent.replace(oldFlowDirection, newFlowDirection);
    console.log('  ✓ 流向标签已国际化');
    modified = true;
}

// 2.6 修复"流入"和"流出"标签
const oldFlowIn = `流入\n                            </label>`;
const newFlowIn = `\${t('energyFlowFlowIn')}\n                            </label>`;

if (htmlContent.includes(oldFlowIn)) {
    htmlContent = htmlContent.replace(oldFlowIn, newFlowIn);
    console.log('  ✓ 流入标签已国际化');
    modified = true;
}

const oldFlowOut = `流出\n                            </label>`;
const newFlowOut = `\${t('energyFlowFlowOut')}\n                            </label>`;

if (htmlContent.includes(oldFlowOut)) {
    htmlContent = htmlContent.replace(oldFlowOut, newFlowOut);
    console.log('  ✓ 流出标签已国际化');
    modified = true;
}

// 2.7 修复下拉选项 (功率、电压、电流、SOC)
const optionReplacements = [
    { old: `<option value="power" \${device.flowControl.inAttribute === 'power' ? 'selected' : ''}>功率 (P)</option>`,
      new: `<option value="power" \${device.flowControl.inAttribute === 'power' ? 'selected' : ''}>\${t('energyFlowParamPower')}</option>` },
    { old: `<option value="voltage" \${device.flowControl.inAttribute === 'voltage' ? 'selected' : ''}>电压 (U)</option>`,
      new: `<option value="voltage" \${device.flowControl.inAttribute === 'voltage' ? 'selected' : ''}>\${t('energyFlowParamVoltage')}</option>` },
    { old: `<option value="current" \${device.flowControl.inAttribute === 'current' ? 'selected' : ''}>电流 (I)</option>`,
      new: `<option value="current" \${device.flowControl.inAttribute === 'current' ? 'selected' : ''}>\${t('energyFlowParamCurrent')}</option>` }
];

optionReplacements.forEach(({ old, new: newText }) => {
    if (htmlContent.includes(old)) {
        htmlContent = htmlContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
        modified = true;
    }
});

// 流出选项
const outOptionReplacements = [
    { old: `<option value="power" \${device.flowControl.outAttribute === 'power' ? 'selected' : ''}>功率 (P)</option>`,
      new: `<option value="power" \${device.flowControl.outAttribute === 'power' ? 'selected' : ''}>\${t('energyFlowParamPower')}</option>` },
    { old: `<option value="voltage" \${device.flowControl.outAttribute === 'voltage' ? 'selected' : ''}>电压 (U)</option>`,
      new: `<option value="voltage" \${device.flowControl.outAttribute === 'voltage' ? 'selected' : ''}>\${t('energyFlowParamVoltage')}</option>` },
    { old: `<option value="current" \${device.flowControl.outAttribute === 'current' ? 'selected' : ''}>电流 (I)</option>`,
      new: `<option value="current" \${device.flowControl.outAttribute === 'current' ? 'selected' : ''}>\${t('energyFlowParamCurrent')}</option>` }
];

outOptionReplacements.forEach(({ old, new: newText }) => {
    if (htmlContent.includes(old)) {
        htmlContent = htmlContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
        modified = true;
    }
});

console.log('  ✓ 下拉选项已国际化');

// 2.8 修复"正数"和"负数"选项
const directionReplacements = [
    { old: `<option value="positive" \${device.flowControl.inDirection === 'positive' ? 'selected' : ''}>正数</option>`,
      new: `<option value="positive" \${device.flowControl.inDirection === 'positive' ? 'selected' : ''}>\${t('energyFlowDirectionPositive')}</option>` },
    { old: `<option value="negative" \${device.flowControl.inDirection === 'negative' ? 'selected' : ''}>负数</option>`,
      new: `<option value="negative" \${device.flowControl.inDirection === 'negative' ? 'selected' : ''}>\${t('energyFlowDirectionNegative')}</option>` },
    { old: `<option value="positive" \${device.flowControl.outDirection === 'positive' ? 'selected' : ''}>正数</option>`,
      new: `<option value="positive" \${device.flowControl.outDirection === 'positive' ? 'selected' : ''}>\${t('energyFlowDirectionPositive')}</option>` },
    { old: `<option value="negative" \${device.flowControl.outDirection === 'negative' ? 'selected' : ''}>负数</option>`,
      new: `<option value="negative" \${device.flowControl.outDirection === 'negative' ? 'selected' : ''}>\${t('energyFlowDirectionNegative')}</option>` }
];

directionReplacements.forEach(({ old, new: newText }) => {
    if (htmlContent.includes(old)) {
        htmlContent = htmlContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
        modified = true;
    }
});

console.log('  ✓ 方向选项已国际化');

// 2.9 修复示例文本
const oldExample = `示例：选择"功率 + 正数"表示功率为正时流入/流出`;
const newExample = `\${t('energyFlowFlowExample')}`;

if (htmlContent.includes(oldExample)) {
    htmlContent = htmlContent.replace(oldExample, newExample);
    console.log('  ✓ 示例文本已国际化');
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
console.log('\n新增翻译键: 13个');
console.log('修复内容:');
console.log('  ✓ 设备设置面板标题');
console.log('  ✓ 设备名称标签');
console.log('  ✓ 显示参数标签和复选框');
console.log('  ✓ 流向标签和选项');
console.log('  ✓ 下拉选项(功率/电压/电流/SOC)');
console.log('  ✓ 方向选项(正数/负数)');
console.log('  ✓ 示例文本');
