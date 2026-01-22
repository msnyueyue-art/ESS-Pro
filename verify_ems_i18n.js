/**
 * EMS升级国际化验证脚本
 * 在浏览器控制台中运行此脚本来验证翻译是否正确加载
 */

console.log('=== EMS升级国际化验证 ===\n');

// 需要验证的翻译键
const requiredKeys = [
    'otaUpgradingTab',
    'otaStatusUpgrading',
    'otaTargetVersion',
    'otaUpgradeVersion',
    'otaErrorFirmwareVerification',
    'otaErrorDeviceTimeout',
    'otaErrorDeviceTimeoutRetry',
    'otaErrorFirmwareSignature',
    'otaNoUpgradingDevices',
    'otaUpgradeSuccessRestart',
    'otaUpgradeFailedNoResponse'
];

// 检查当前语言
const currentLang = localStorage.getItem('language') || 'zh';
console.log(`当前语言: ${currentLang === 'zh' ? '简体中文' : '英语'}\n`);

// 验证翻译
let missingCount = 0;
let successCount = 0;

console.log('翻译验证结果：\n');
requiredKeys.forEach(key => {
    const translation = getTranslation(key);

    // 如果翻译结果就是键本身，说明翻译缺失
    if (translation === key) {
        console.log(`❌ ${key}: 缺失翻译`);
        missingCount++;
    } else {
        console.log(`✅ ${key}: "${translation}"`);
        successCount++;
    }
});

console.log(`\n总计: ${requiredKeys.length} 个键`);
console.log(`✅ 成功: ${successCount}`);
console.log(`❌ 缺失: ${missingCount}`);

if (missingCount === 0) {
    console.log('\n🎉 所有翻译键都已正确配置！');
} else {
    console.log('\n⚠️ 发现缺失的翻译，请检查 common.js 文件');
    console.log('提示：如果刚修改了文件，请清除缓存后重新加载页面');
}

// 额外检查：验证翻译对象是否存在
if (typeof translations === 'undefined') {
    console.log('\n❌ 错误：translations 对象未定义');
} else {
    console.log(`\n📚 翻译对象信息：`);
    console.log(`   - 可用语言: ${Object.keys(translations).join(', ')}`);
    console.log(`   - 当前语言键总数: ${Object.keys(translations[currentLang] || {}).length}`);
}
