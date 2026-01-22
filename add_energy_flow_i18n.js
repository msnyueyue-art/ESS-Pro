const fs = require('fs');

console.log('========================================');
console.log(' 添加能量流页面国际化翻译键');
console.log('========================================\n');

const commonPath = 'common.js';
let content = fs.readFileSync(commonPath, 'utf-8');

// 定义要添加的翻译键
const zhTranslations = `
        // 能量流页面
        energyFlowPageTitle: '能量流设置',
        energyFlowAvailableDevices: '可用设备',
        energyFlowPowerDevices: '电源设备',
        energyFlowStorageDevices: '储能设备',
        energyFlowLoadDevices: '负载设备',
        energyFlowDeviceGrid: '市电',
        energyFlowDeviceGenerator: '柴发',
        energyFlowDeviceSolar: '光伏',
        energyFlowDevicePCS: '储能柜',
        energyFlowDeviceLoad: '负载',
        energyFlowPreview: '预览',
        energyFlowEdit: '编辑',
        energyFlowSave: '保存',
        energyFlowAlignHorizontal: '水平对齐',
        energyFlowAlignVertical: '垂直对齐',
        energyFlowAutoAlign: '连线已建立',
        energyFlowSwitchToPreview: '切换到预览模式',
        energyFlowSwitchToEdit: '切换到编辑模式',
        energyFlowSaveConfig: '保存配置',
        energyFlowConfigSaved: '配置已保存',
        energyFlowDeviceSettings: '设备设置',
        energyFlowShowLabel: '显示标签',
        energyFlowShowPower: '显示功率',
        energyFlowShowStatus: '显示状态',
        energyFlowConfirm: '确认',
        energyFlowCancel: '取消',`;

const enTranslations = `
        // Energy Flow Page
        energyFlowPageTitle: 'Energy Flow Settings',
        energyFlowAvailableDevices: 'Available Devices',
        energyFlowPowerDevices: 'Power Devices',
        energyFlowStorageDevices: 'Storage Devices',
        energyFlowLoadDevices: 'Load Devices',
        energyFlowDeviceGrid: 'Grid',
        energyFlowDeviceGenerator: 'Generator',
        energyFlowDeviceSolar: 'Solar',
        energyFlowDevicePCS: 'PCS',
        energyFlowDeviceLoad: 'Load',
        energyFlowPreview: 'Preview',
        energyFlowEdit: 'Edit',
        energyFlowSave: 'Save',
        energyFlowAlignHorizontal: 'Align Horizontal',
        energyFlowAlignVertical: 'Align Vertical',
        energyFlowAutoAlign: 'Connection Established',
        energyFlowSwitchToPreview: 'Switch to Preview Mode',
        energyFlowSwitchToEdit: 'Switch to Edit Mode',
        energyFlowSaveConfig: 'Save Configuration',
        energyFlowConfigSaved: 'Configuration Saved',
        energyFlowDeviceSettings: 'Device Settings',
        energyFlowShowLabel: 'Show Label',
        energyFlowShowPower: 'Show Power',
        energyFlowShowStatus: 'Show Status',
        energyFlowConfirm: 'Confirm',
        energyFlowCancel: 'Cancel',`;

// 检查是否已存在
if (content.includes('energyFlowPageTitle')) {
    console.log('⚠️  能量流翻译键已存在，跳过添加');
} else {
    // 找到中文部分的插入位置 (在最后一个elecPrice之后)
    const zhInsertPoint = content.lastIndexOf("elecPriceDescFixedSeasonal: '按季节不同的固定电价'");
    if (zhInsertPoint === -1) {
        console.log('❌ 未找到中文翻译插入点');
        process.exit(1);
    }

    // 在该行后添加新翻译
    const zhBeforeLine = content.substring(0, zhInsertPoint);
    const zhLine = content.substring(zhInsertPoint).split('\n')[0];
    const zhAfter = content.substring(zhInsertPoint + zhLine.length);

    content = zhBeforeLine + zhLine + ',' + zhTranslations + zhAfter;

    // 找到英文部分的插入位置
    const enInsertPoint = content.lastIndexOf("elecPriceDescFixedSeasonal: 'Different fixed price by season'");
    if (enInsertPoint === -1) {
        console.log('❌ 未找到英文翻译插入点');
        process.exit(1);
    }

    const enBeforeLine = content.substring(0, enInsertPoint);
    const enLine = content.substring(enInsertPoint).split('\n')[0];
    const enAfter = content.substring(enInsertPoint + enLine.length);

    content = enBeforeLine + enLine + ',' + enTranslations + enAfter;

    // 保存文件
    fs.writeFileSync(commonPath, content, 'utf-8');
    console.log('✅ 成功添加能量流翻译键到 common.js\n');

    // 验证
    console.log('验证翻译键...');
    const checks = [
        'energyFlowPageTitle',
        'energyFlowAvailableDevices',
        'energyFlowDeviceGrid',
        'energyFlowDeviceSolar',
        'energyFlowDevicePCS',
        'energyFlowSave'
    ];

    const newContent = fs.readFileSync(commonPath, 'utf-8');
    let allPassed = true;
    checks.forEach(key => {
        if (newContent.includes(key)) {
            console.log(`  ✓ ${key}`);
        } else {
            console.log(`  ✗ ${key} - 未找到`);
            allPassed = false;
        }
    });

    if (allPassed) {
        console.log('\n✅ 所有翻译键添加成功!');
        console.log('\n已添加的翻译键:');
        console.log('  - 页面标题: energyFlowPageTitle');
        console.log('  - 设备类别: energyFlowPowerDevices, energyFlowStorageDevices, energyFlowLoadDevices');
        console.log('  - 设备名称: energyFlowDeviceGrid, energyFlowDeviceGenerator, energyFlowDeviceSolar, energyFlowDevicePCS, energyFlowDeviceLoad');
        console.log('  - 操作按钮: energyFlowPreview, energyFlowEdit, energyFlowSave, energyFlowAlignHorizontal, energyFlowAlignVertical');
        console.log('  - 其他文本: 共25个翻译键');
    } else {
        console.log('\n⚠️  部分翻译键未能添加，请检查');
    }
}

console.log('\n========================================');
console.log(' 翻译键添加完成');
console.log('========================================');
