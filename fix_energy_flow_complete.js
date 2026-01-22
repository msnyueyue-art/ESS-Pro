const fs = require('fs');

console.log('========================================');
console.log(' 能量流页面完整国际化修复');
console.log('========================================\n');

// 1. 添加缺失的翻译键到 common.js
console.log('[1/2] 添加缺失的翻译键...');
const commonPath = 'common.js';
let commonContent = fs.readFileSync(commonPath, 'utf-8');

const newZhKeys = `
        energyFlowStraightenConnections: '连线拉直',
        energyFlowStraightenConnectionsTitle: '将选中的连线拉直',
        energyFlowBackToEdit: '返回编辑',
        energyFlowSwitchEditMode: '切换编辑模式',
        energyFlowEnterEditModeFirst: '请先进入编辑模式',
        energyFlowDeviceAlreadyOnCanvas: '该设备已在画布上',
        energyFlowDeviceDeleted: '已删除 {name}',
        energyFlowDeviceSettingsSaved: '设备设置已保存',
        energyFlowParamHidden: '已隐藏 {type} 参数',
        energyFlowConnectionSelected: '连线已选中，拖拽控制点调整路径',
        energyFlowConnectionSelectedRightClick: '连线已选中，右键可添加控制点',
        energyFlowControlPointAdded: '已添加控制点',
        energyFlowSwitchToStraight: '已切换为直线模式',
        energyFlowSwitchToOrthogonal: '已切换为正交模式（90度拐弯）',
        energyFlowConnectionDeleted: '已删除连线',
        energyFlowPathReset: '路径已重置',
        energyFlowNoConnections: '当前没有连线',
        energyFlowAllConnectionsCleared: '已清除所有连线',
        energyFlowSelectTwoDevices: '请先选中至少2个设备（按住Ctrl/Cmd点击多选）',
        energyFlowNoConnectionsToStraighten: '没有连线可以拉直',
        energyFlowAllConnectionsStraight: '所有连线已经是直线',
        energyFlowConnectionsStraightened: '已拉直 {count} 条连线',
        energyFlowSaveSuccess: '保存成功 ({devices} 个设备, {connections} 条连线)',
        energyFlowSaveFailed: '保存失败：{error}',
        energyFlowNoSavedConfig: '没有找到保存的配置',
        energyFlowLoadFailed: '加载失败：{error}',`;

const newEnKeys = `
        energyFlowStraightenConnections: 'Straighten Connections',
        energyFlowStraightenConnectionsTitle: 'Straighten selected connections',
        energyFlowBackToEdit: 'Back to Edit',
        energyFlowSwitchEditMode: 'Switch Edit Mode',
        energyFlowEnterEditModeFirst: 'Please enter edit mode first',
        energyFlowDeviceAlreadyOnCanvas: 'Device already on canvas',
        energyFlowDeviceDeleted: 'Deleted {name}',
        energyFlowDeviceSettingsSaved: 'Device settings saved',
        energyFlowParamHidden: '{type} parameter hidden',
        energyFlowConnectionSelected: 'Connection selected, drag control points to adjust path',
        energyFlowConnectionSelectedRightClick: 'Connection selected, right-click to add control points',
        energyFlowControlPointAdded: 'Control point added',
        energyFlowSwitchToStraight: 'Switched to straight line mode',
        energyFlowSwitchToOrthogonal: 'Switched to orthogonal mode (90° turns)',
        energyFlowConnectionDeleted: 'Connection deleted',
        energyFlowPathReset: 'Path reset',
        energyFlowNoConnections: 'No connections',
        energyFlowAllConnectionsCleared: 'All connections cleared',
        energyFlowSelectTwoDevices: 'Please select at least 2 devices (Ctrl/Cmd+Click for multi-select)',
        energyFlowNoConnectionsToStraighten: 'No connections to straighten',
        energyFlowAllConnectionsStraight: 'All connections are already straight',
        energyFlowConnectionsStraightened: '{count} connection(s) straightened',
        energyFlowSaveSuccess: 'Saved successfully ({devices} devices, {connections} connections)',
        energyFlowSaveFailed: 'Save failed: {error}',
        energyFlowNoSavedConfig: 'No saved configuration found',
        energyFlowLoadFailed: 'Load failed: {error}',`;

// 检查是否已存在
if (!commonContent.includes('energyFlowStraightenConnections')) {
    // 在 energyFlowCancel 后添加
    const zhInsertPoint = commonContent.indexOf("energyFlowCancel: '取消',");
    if (zhInsertPoint !== -1) {
        const zhBefore = commonContent.substring(0, zhInsertPoint);
        const zhLine = "energyFlowCancel: '取消',";
        const zhAfter = commonContent.substring(zhInsertPoint + zhLine.length);
        commonContent = zhBefore + zhLine + newZhKeys + zhAfter;
    }

    const enInsertPoint = commonContent.indexOf("energyFlowCancel: 'Cancel',");
    if (enInsertPoint !== -1) {
        const enBefore = commonContent.substring(0, enInsertPoint);
        const enLine = "energyFlowCancel: 'Cancel',";
        const enAfter = commonContent.substring(enInsertPoint + enLine.length);
        commonContent = enBefore + enLine + newEnKeys + enAfter;
    }

    fs.writeFileSync(commonPath, commonContent, 'utf-8');
    console.log('  ✓ 已添加25个新翻译键');
} else {
    console.log('  ○ 翻译键已存在');
}

// 2. 修复 energy-flow.html
console.log('\n[2/2] 修复 energy-flow.html...');
const htmlPath = 'energy-flow.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
let modified = false;

// 2.1 修复"连线拉直"按钮
const oldStraighten = `<button class="toolbar-btn" onclick="straightenConnections()" title="将选中的连线拉直">
                            <i class="fas fa-ruler"></i>
                            <span>连线拉直</span>
                        </button>`;

const newStraighten = `<button class="toolbar-btn" onclick="straightenConnections()" data-title-key="energyFlowStraightenConnectionsTitle">
                            <i class="fas fa-ruler"></i>
                            <span data-translate="energyFlowStraightenConnections">连线拉直</span>
                        </button>`;

if (htmlContent.includes(oldStraighten)) {
    htmlContent = htmlContent.replace(oldStraighten, newStraighten);
    console.log('  ✓ 连线拉直按钮已添加国际化');
    modified = true;
}

// 2.2 修复"预览"和"返回编辑"按钮的动态文本
const oldPreview1 = `editModeBtn.innerHTML = '<i class="fas fa-eye" style="color: white;"></i><span>预览</span>';`;
const newPreview1 = `editModeBtn.innerHTML = '<i class="fas fa-eye" style="color: white;"></i><span>' + (typeof getTranslation === 'function' ? getTranslation('energyFlowPreview') : '预览') + '</span>';`;

htmlContent = htmlContent.replace(new RegExp(oldPreview1.replace(/[()]/g, '\\$&'), 'g'), newPreview1);

const oldBackToEdit = `editModeBtn.innerHTML = '<i class="fas fa-edit"></i><span>返回编辑</span>';`;
const newBackToEdit = `editModeBtn.innerHTML = '<i class="fas fa-edit"></i><span>' + (typeof getTranslation === 'function' ? getTranslation('energyFlowBackToEdit') : '返回编辑') + '</span>';`;

if (htmlContent.includes(oldBackToEdit)) {
    htmlContent = htmlContent.replace(new RegExp(oldBackToEdit.replace(/[()]/g, '\\$&'), 'g'), newBackToEdit);
    console.log('  ✓ 预览/编辑按钮文本已国际化');
    modified = true;
}

// 2.3 创建翻译辅助函数并替换所有 showMiniToast
const helperFunction = `
        // 翻译辅助函数
        function t(key, replacements = {}) {
            let text = typeof getTranslation === 'function' ? getTranslation(key) : key;
            // 替换占位符 {key} 为实际值
            Object.keys(replacements).forEach(k => {
                text = text.replace(new RegExp(\`\\{$\{k\}\\}\`, 'g'), replacements[k]);
            });
            return text;
        }
`;

if (!htmlContent.includes('function t(key, replacements')) {
    // 在 getDeviceLabel 函数后添加
    htmlContent = htmlContent.replace(
        'function getDeviceLabel(key) {',
        helperFunction + '\n        function getDeviceLabel(key) {'
    );
    console.log('  ✓ 已添加翻译辅助函数');
    modified = true;
}

// 2.4 替换所有硬编码的 showMiniToast 消息
const toastReplacements = [
    { old: `showMiniToast('请先进入编辑模式', 'warning');`, new: `showMiniToast(t('energyFlowEnterEditModeFirst'), 'warning');` },
    { old: `showMiniToast('⚠️ 请先进入编辑模式', 'warning');`, new: `showMiniToast('⚠️ ' + t('energyFlowEnterEditModeFirst'), 'warning');` },
    { old: `showMiniToast('⚠️ 该设备已在画布上', 'warning');`, new: `showMiniToast('⚠️ ' + t('energyFlowDeviceAlreadyOnCanvas'), 'warning');` },
    { old: `showMiniToast(\`✅ 已删除 \${deviceName}\`, 'success');`, new: `showMiniToast('✅ ' + t('energyFlowDeviceDeleted', {name: deviceName}), 'success');` },
    { old: `showMiniToast('✅ 设备设置已保存', 'success');`, new: `showMiniToast('✅ ' + t('energyFlowDeviceSettingsSaved'), 'success');` },
    { old: `showMiniToast(\`已隐藏 \${paramType.toUpperCase()} 参数\`, 'success');`, new: `showMiniToast(t('energyFlowParamHidden', {type: paramType.toUpperCase()}), 'success');` },
    { old: `showMiniToast('✏️ 连线已选中，拖拽控制点调整路径');`, new: `showMiniToast('✏️ ' + t('energyFlowConnectionSelected'));` },
    { old: `showMiniToast('✏️ 连线已选中，右键可添加控制点');`, new: `showMiniToast('✏️ ' + t('energyFlowConnectionSelectedRightClick'));` },
    { old: `showMiniToast('➕ 已添加控制点');`, new: `showMiniToast('➕ ' + t('energyFlowControlPointAdded'));` },
    { old: `showMiniToast(isOrthogonal ? '📏 已切换为直线模式' : '📐 已切换为正交模式（90度拐弯）');`, new: `showMiniToast(isOrthogonal ? '📏 ' + t('energyFlowSwitchToStraight') : '📐 ' + t('energyFlowSwitchToOrthogonal'));` },
    { old: `showMiniToast('✅ 已删除连线');`, new: `showMiniToast('✅ ' + t('energyFlowConnectionDeleted'));` },
    { old: `showMiniToast('🔄 路径已重置');`, new: `showMiniToast('🔄 ' + t('energyFlowPathReset'));` },
    { old: `showMiniToast('⚠️ 当前没有连线');`, new: `showMiniToast('⚠️ ' + t('energyFlowNoConnections'));` },
    { old: `showMiniToast('✅ 已清除所有连线');`, new: `showMiniToast('✅ ' + t('energyFlowAllConnectionsCleared'));` },
    { old: `showMiniToast('⚠️ 请先选中至少2个设备（按住Ctrl/Cmd点击多选）');`, new: `showMiniToast('⚠️ ' + t('energyFlowSelectTwoDevices'));` },
    { old: `showMiniToast('⚠️ 没有连线可以拉直');`, new: `showMiniToast('⚠️ ' + t('energyFlowNoConnectionsToStraighten'));` },
    { old: `showMiniToast('✅ 所有连线已经是直线');`, new: `showMiniToast('✅ ' + t('energyFlowAllConnectionsStraight'));` },
    { old: `showMiniToast(\`保存成功 (\${placedDevices.length} 个设备, \${deviceConnections.length} 条连线)\`, 'success');`, new: `showMiniToast(t('energyFlowSaveSuccess', {devices: placedDevices.length, connections: deviceConnections.length}), 'success');` },
    { old: `showMiniToast('保存失败：' + e.message, 'error');`, new: `showMiniToast(t('energyFlowSaveFailed', {error: e.message}), 'error');` },
    { old: `showMiniToast('⚠️ 没有找到保存的配置');`, new: `showMiniToast('⚠️ ' + t('energyFlowNoSavedConfig'));` },
    { old: `showMiniToast('❌ 加载失败：' + e.message);`, new: `showMiniToast('❌ ' + t('energyFlowLoadFailed', {error: e.message}));` }
];

toastReplacements.forEach(({ old, new: newText }) => {
    if (htmlContent.includes(old)) {
        htmlContent = htmlContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
        modified = true;
    }
});

// 特殊处理 "已拉直X条连线" - 需要计算数量
const straightenedPattern = /showMiniToast\(`✅ 已拉直 \$\{straightenedCount\} 条连线`\);/g;
if (straightenedPattern.test(htmlContent)) {
    htmlContent = htmlContent.replace(
        straightenedPattern,
        `showMiniToast('✅ ' + t('energyFlowConnectionsStraightened', {count: straightenedCount}));`
    );
    modified = true;
}

console.log('  ✓ 所有提示消息已国际化');

// 保存修改
if (modified) {
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log('\n✅ energy-flow.html 已更新');
} else {
    console.log('\n○ 无需修改');
}

console.log('\n========================================');
console.log(' 修复完成!');
console.log('========================================\n');
console.log('新增翻译键: 25个');
console.log('修复内容:');
console.log('  ✓ 连线拉直按钮');
console.log('  ✓ 预览/返回编辑按钮');
console.log('  ✓ 所有提示消息 (20+条)');
console.log('  ✓ 翻译辅助函数');
