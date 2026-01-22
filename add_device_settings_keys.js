const fs = require('fs');

console.log('========================================');
console.log(' 添加设备设置面板翻译键');
console.log('========================================\n');

const commonPath = 'common.js';
let content = fs.readFileSync(commonPath, 'utf-8');

const newZhKeys = `
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
if (!content.includes('energyFlowDeviceName')) {
    // 在 energyFlowLoadFailed 后添加
    const zhInsertPoint = content.indexOf("energyFlowLoadFailed: '加载失败：{error}',");
    if (zhInsertPoint !== -1) {
        const zhBefore = content.substring(0, zhInsertPoint);
        const zhLine = "energyFlowLoadFailed: '加载失败：{error}',";
        const zhAfter = content.substring(zhInsertPoint + zhLine.length);
        content = zhBefore + zhLine + newZhKeys + zhAfter;
        console.log('✓ 已添加中文翻译键');
    } else {
        console.log('❌ 未找到中文插入点');
    }

    const enInsertPoint = content.indexOf("energyFlowLoadFailed: 'Load failed: {error}',");
    if (enInsertPoint !== -1) {
        const enBefore = content.substring(0, enInsertPoint);
        const enLine = "energyFlowLoadFailed: 'Load failed: {error}',";
        const enAfter = content.substring(enInsertPoint + enLine.length);
        content = enBefore + enLine + newEnKeys + enAfter;
        console.log('✓ 已添加英文翻译键');
    } else {
        console.log('❌ 未找到英文插入点');
    }

    fs.writeFileSync(commonPath, content, 'utf-8');
    console.log('\n✅ 已添加12个新翻译键到 common.js');

    // 验证
    console.log('\n验证翻译键:');
    const checks = [
        'energyFlowDeviceName',
        'energyFlowDisplayParams',
        'energyFlowParamPower',
        'energyFlowFlowIn',
        'energyFlowFlowOut'
    ];

    const newContent = fs.readFileSync(commonPath, 'utf-8');
    checks.forEach(key => {
        if (newContent.includes(key)) {
            console.log(`  ✓ ${key}`);
        } else {
            console.log(`  ✗ ${key} - 未找到`);
        }
    });
} else {
    console.log('⚠️  翻译键已存在，跳过添加');
}

console.log('\n========================================');
console.log(' 完成!');
console.log('========================================');
