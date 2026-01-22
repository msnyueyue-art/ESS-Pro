/**
 * 综合国际化验证脚本
 * 验证消息统计和EMS升级页面的翻译是否正确加载
 * 在浏览器控制台中运行此脚本
 */

console.log('=== 国际化翻译综合验证 ===\n');

// 获取当前语言
const currentLang = localStorage.getItem('language') || 'zh';
console.log(`当前语言: ${currentLang === 'zh' ? '简体中文' : '英语'}\n`);

// 定义需要验证的翻译键分组
const translationGroups = {
    '消息统计页面': [
        'alarmStatsTypeDistribution',
        'alarmStatsType',
        'alarmStatsDevice'
    ],
    'EMS升级页面': [
        'devicesStatusUpdatable',
        'devicesStatusLatest'
    ],
    'EMS升级进度弹框': [
        'otaUpgradingTab',
        'otaStatusUpgrading',
        'otaTargetVersion',
        'otaUpgradeVersion',
        'otaErrorFirmwareVerification',
        'otaErrorDeviceTimeout'
    ]
};

// 统计结果
let totalKeys = 0;
let successCount = 0;
let failCount = 0;
const missingKeys = [];

// 验证每个分组
Object.entries(translationGroups).forEach(([groupName, keys]) => {
    console.log(`\n【${groupName}】`);
    console.log('─'.repeat(50));

    keys.forEach(key => {
        totalKeys++;
        const translation = getTranslation(key);

        if (translation === key) {
            console.log(`❌ ${key}: 缺失翻译`);
            failCount++;
            missingKeys.push({ group: groupName, key });
        } else {
            console.log(`✅ ${key}: "${translation}"`);
            successCount++;
        }
    });
});

// 输出总结
console.log('\n' + '='.repeat(50));
console.log('验证总结');
console.log('='.repeat(50));
console.log(`总键数: ${totalKeys}`);
console.log(`✅ 成功: ${successCount} (${(successCount/totalKeys*100).toFixed(1)}%)`);
console.log(`❌ 缺失: ${failCount} (${(failCount/totalKeys*100).toFixed(1)}%)`);

if (failCount === 0) {
    console.log('\n🎉 恭喜！所有翻译键都已正确配置！');
} else {
    console.log('\n⚠️ 发现缺失的翻译键：');
    missingKeys.forEach(({ group, key }) => {
        console.log(`   - ${group}: ${key}`);
    });
    console.log('\n提示：');
    console.log('1. 检查 common.js 文件是否包含上述键');
    console.log('2. 清除浏览器缓存（Ctrl+Shift+Delete）');
    console.log('3. 硬刷新页面（Ctrl+F5）');
}

// 额外检查：验证翻译对象结构
console.log('\n' + '='.repeat(50));
console.log('翻译对象结构检查');
console.log('='.repeat(50));

if (typeof translations === 'undefined') {
    console.log('❌ translations 对象未定义');
} else {
    const langs = Object.keys(translations);
    console.log(`✅ 可用语言: ${langs.join(', ')}`);

    langs.forEach(lang => {
        const keyCount = Object.keys(translations[lang] || {}).length;
        console.log(`   ${lang}: ${keyCount} 个翻译键`);
    });
}

// 检查getTranslation函数
if (typeof getTranslation === 'undefined') {
    console.log('❌ getTranslation 函数未定义');
} else {
    console.log('✅ getTranslation 函数已定义');
}

console.log('\n验证完成！');
