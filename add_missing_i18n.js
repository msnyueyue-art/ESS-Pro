const fs = require('fs');

console.log('添加缺失的翻译键到 templateI18n 对象...\n');

const htmlPath = 'electricity-price-new.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

// 查找要替换的位置 - '低谷' 后面
const oldText = `            '低谷': {
                en: 'Valley',
                zh: '低谷'
            }
        };`;

const newText = `            '低谷': {
                en: 'Valley',
                zh: '低谷'
            },
            // 类型名称
            '阶梯电价': {
                en: 'Tiered Pricing',
                zh: '阶梯电价'
            },
            '分时电价': {
                en: 'Time-of-Use',
                zh: '分时电价'
            },
            '固定电价': {
                en: 'Fixed Price',
                zh: '固定电价'
            },
            // 季节名称
            '夏季': {
                en: 'Summer',
                zh: '夏季'
            },
            '冬季': {
                en: 'Winter',
                zh: '冬季'
            },
            '春秋季': {
                en: 'Spring and Autumn',
                zh: '春秋季'
            }
        };`;

if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    fs.writeFileSync(htmlPath, content, 'utf-8');
    console.log('✅ 成功添加以下翻译键:');
    console.log('   类型名称:');
    console.log('     - 阶梯电价 → Tiered Pricing');
    console.log('     - 分时电价 → Time-of-Use');
    console.log('     - 固定电价 → Fixed Price');
    console.log('   季节名称:');
    console.log('     - 夏季 → Summer');
    console.log('     - 冬季 → Winter');
    console.log('     - 春秋季 → Spring and Autumn');
    console.log('\n验证...');

    // 验证
    const checks = [
        { pattern: /'阶梯电价':\s*\{/, desc: '阶梯电价' },
        { pattern: /'分时电价':\s*\{/, desc: '分时电价' },
        { pattern: /'固定电价':\s*\{/, desc: '固定电价' },
        { pattern: /'夏季':\s*\{/, desc: '夏季' },
        { pattern: /'冬季':\s*\{/, desc: '冬季' },
        { pattern: /'春秋季':\s*\{/, desc: '春秋季' }
    ];

    const newContent = fs.readFileSync(htmlPath, 'utf-8');
    let allPassed = true;
    checks.forEach(check => {
        if (check.pattern.test(newContent)) {
            console.log(`  ✓ ${check.desc}`);
        } else {
            console.log(`  ✗ ${check.desc} - 未找到`);
            allPassed = false;
        }
    });

    if (allPassed) {
        console.log('\n✅ 所有翻译键添加成功!');
        console.log('\n现在可以测试了:');
        console.log('1. 在浏览器中切换到英文环境');
        console.log('2. 打开电价设置页面');
        console.log('3. 查看模板下拉选项和季节标签是否显示英文');
    } else {
        console.log('\n⚠️  部分翻译键未能添加，请检查');
    }
} else {
    console.log('❌ 未找到要替换的文本位置');
    console.log('请检查文件内容是否已被修改');
}
