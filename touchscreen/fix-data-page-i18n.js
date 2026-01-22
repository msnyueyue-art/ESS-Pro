const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('开始修复数据页面国际化...\n');

// 1. 修复所有设备的"实时数据"按钮
content = content.replace(
    /onclick="switchSubTab\('(\w+)', 'realtime'\)">实时数据</g,
    `onclick="switchSubTab('$1', 'realtime')" data-i18n="realtimeData">Real-time Data<`
);
console.log('✅ 已修复所有"实时数据"按钮');

// 2. 修复所有设备的"历史数据"按钮
content = content.replace(
    /onclick="switchSubTab\('(\w+)', 'history'\)">历史数据</g,
    `onclick="switchSubTab('$1', 'history')" data-i18n="historicalData">Historical Data<`
);
console.log('✅ 已修复所有"历史数据"按钮');

// 3. 修复所有"自定义"按钮
content = content.replace(
    /<span>自定义<\/span>/g,
    `<span data-i18n="custom">Custom</span>`
);
console.log('✅ 已修复所有"自定义"按钮');

// 4. 修复字段设置对话框中的按钮
content = content.replace(
    /id="realtime-type-btn" onclick="switchSettingsType\('realtime'\)">实时数据</g,
    `id="realtime-type-btn" onclick="switchSettingsType('realtime')" data-i18n="realtimeData">Real-time Data<`
);
content = content.replace(
    /id="history-type-btn" onclick="switchSettingsType\('history'\)">历史数据</g,
    `id="history-type-btn" onclick="switchSettingsType('history')" data-i18n="historicalData">Historical Data<`
);
console.log('✅ 已修复字段设置对话框按钮');

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n✅ 数据页面国际化修复完成!');
console.log('📝 已修改文件: touchscreen/data.html');
