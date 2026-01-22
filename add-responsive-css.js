/**
 * 自动添加响应式CSS到所有HTML页面
 * 在Node.js环境下运行: node add-responsive-css.js
 */

const fs = require('fs');
const path = require('path');

// 要添加的CSS链接
const cssLink = '<link rel="stylesheet" href="responsive-1024.css">';

// 需要处理的HTML文件列表
const htmlFiles = [
    'dashboard.html',
    'site1.html',
    'devices.html',
    'devices1.html',
    'alarm-management.html',
    'alarm-statistics.html',
    'alarm-notifications.html',
    'power-report.html',
    'electricity-price-new.html',
    'rule-engine.html',
    'data-analysis.html',
    'account-settings.html',
    'personalization.html',
    'roles.html',
    'cabinet-detail.html',
    'energy-flow.html'
];

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);

    try {
        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  跳过: ${filename} (文件不存在)`);
            skipCount++;
            return;
        }

        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf-8');

        // 检查是否已经包含responsive-1024.css
        if (content.includes('responsive-1024.css')) {
            console.log(`⏭️  跳过: ${filename} (已包含响应式CSS)`);
            skipCount++;
            return;
        }

        // 在</head>之前插入CSS链接
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${cssLink}\n</head>`);

            // 写回文件
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✅ 成功: ${filename}`);
            successCount++;
        } else {
            console.log(`❌ 失败: ${filename} (未找到</head>标签)`);
            errorCount++;
        }

    } catch (error) {
        console.log(`❌ 错误: ${filename} - ${error.message}`);
        errorCount++;
    }
});

// 输出统计
console.log('\n' + '='.repeat(50));
console.log('处理完成！');
console.log('='.repeat(50));
console.log(`✅ 成功: ${successCount} 个文件`);
console.log(`⏭️  跳过: ${skipCount} 个文件`);
console.log(`❌ 失败: ${errorCount} 个文件`);
console.log(`📝 总计: ${htmlFiles.length} 个文件`);
console.log('='.repeat(50));
