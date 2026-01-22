const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log(' 电价配置弹框模板内容国际化修复工具');
console.log('========================================\n');

// 步骤1: 修改 common.js
console.log('[1/2] 添加翻译键到 common.js...');
const commonPath = 'common.js';
let commonContent = fs.readFileSync(commonPath, 'utf-8');

if (!commonContent.includes('elecPriceUnitMonth')) {
    // 中文部分
    commonContent = commonContent.replace(
        "elecPriceTierRangeAbove: '{from}度以上/月',",
        "elecPriceTierRangeAbove: '{from}度以上/月',\n        elecPriceUnitMonth: '月',\n        elecPriceUnitDegree: '度',"
    );

    // 英文部分
    commonContent = commonContent.replace(
        "elecPriceTierRangeAbove: 'Above {from} kWh/month',",
        "elecPriceTierRangeAbove: 'Above {from} kWh/month',\n        elecPriceUnitMonth: 'Month',\n        elecPriceUnitDegree: 'kWh',"
    );

    fs.writeFileSync(commonPath, commonContent, 'utf-8');
    console.log('  ✓ 翻译键已添加');
} else {
    console.log('  ○ 翻译键已存在，跳过');
}

// 步骤2: 替换 generatePriceHTML 函数
console.log('\n[2/2] 替换 generatePriceHTML 函数...');
const htmlPath = 'electricity-price-new.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 读取修复后的函数
const fixedFunction = fs.readFileSync('generatePriceHTML_fixed.js', 'utf-8');

// 找到函数并替换
const regex = /(\s+\/\/ 生成价格配置HTML的辅助函数\r?\n\s+)(function generatePriceHTML\(template\) \{[\s\S]*?\n\s+\})\s+(?=\r?\n\s+function onConsumptionTemplateSelect)/;

if (regex.test(htmlContent)) {
    htmlContent = htmlContent.replace(regex, `$1${fixedFunction}\n\n        `);
    fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log('  ✓ generatePriceHTML 函数已更新');
} else {
    console.log('  ✗ 未能找到 generatePriceHTML 函数');
    process.exit(1);
}

// 验证
console.log('\n验证修复...');
const checks = [
    { pattern: /getTranslation\('elecPriceFixedPriceLabel'\)/, desc: '固定电价标签' },
    { pattern: /getTranslation\('elecPriceTierTitle'\)/, desc: '阶梯标题' },
    { pattern: /getTranslation\('elecPriceUnitMonth'\)/, desc: '月份单位' },
    { pattern: /getTranslation\('elecPriceUnitDegree'\)/, desc: '度数单位' },
    { pattern: /getTemplateI18nText\(p\.name\)/, desc: '时段名称翻译' },
    { pattern: /getTemplateI18nText\(season\.name\)/, desc: '季节名称翻译' }
];

let allPassed = true;
htmlContent = fs.readFileSync(htmlPath, 'utf-8');

checks.forEach(check => {
    if (check.pattern.test(htmlContent)) {
        console.log(`  ✓ ${check.desc}`);
    } else {
        console.log(`  ✗ ${check.desc} - 未找到`);
        allPassed = false;
    }
});

console.log('\n========================================');
if (allPassed) {
    console.log(' ✓ 修复成功完成！');
    console.log('========================================\n');
    console.log('修复内容:');
    console.log('  • 添加翻译键: elecPriceUnitMonth, elecPriceUnitDegree');
    console.log('  • 固定电价: 标题和单位国际化');
    console.log('  • 阶梯电价: 标题、范围和单位国际化');
    console.log('  • 月份标签: 完全国际化');
    console.log('  • 季节名称: 使用 getTemplateI18nText');
    console.log('  • 分时电价: 时段名称国际化');
    console.log('\n请在浏览器中切换到英文环境测试验证。');
} else {
    console.log(' ⚠ 修复部分完成，请检查错误');
    console.log('========================================');
    process.exit(1);
}
