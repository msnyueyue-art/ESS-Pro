// 测试翻译获取
const fs = require('fs');

// 读取i18n.js文件
const i18nContent = fs.readFileSync('../ueh/components/i18n.js', 'utf-8');

// 模拟浏览器环境
global.window = {};
global.document = {
    documentElement: {},
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    readyState: 'complete'
};
global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
};
global.sessionStorage = {
    getItem: () => null,
    setItem: () => {}
};

// 执行i18n.js
eval(i18nContent);

// 测试
const i18n = new window.I18n({ defaultLanguage: 'zh' });

console.log('\n=== 测试翻译获取 ===\n');
console.log('当前语言:', i18n.currentLanguage);
console.log('\n中文翻译测试:');
console.log('accountSettings.pageTitle:', i18n.getText('accountSettings.pageTitle'));
console.log('accountSettings.tabs.basicInfo:', i18n.getText('accountSettings.tabs.basicInfo'));
console.log('accountSettings.basicInfo.nickname:', i18n.getText('accountSettings.basicInfo.nickname'));

i18n.currentLanguage = 'en';
console.log('\n英文翻译测试:');
console.log('当前语言:', i18n.currentLanguage);
console.log('accountSettings.pageTitle:', i18n.getText('accountSettings.pageTitle'));
console.log('accountSettings.tabs.basicInfo:', i18n.getText('accountSettings.tabs.basicInfo'));

// 检查translations结构
console.log('\n=== 检查translations结构 ===');
console.log('zh对象中有accountSettings?', 'accountSettings' in i18n.translations.zh);
console.log('en对象中有accountSettings?', 'accountSettings' in i18n.translations.en);

if (i18n.translations.zh.accountSettings) {
    console.log('\nzh.accountSettings的keys:', Object.keys(i18n.translations.zh.accountSettings));
}
