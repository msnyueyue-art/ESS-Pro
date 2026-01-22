const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('开始添加字段标签翻译功能...\n');

// 查找插入位置 - 在 createDataCard 函数之前添加翻译函数
const insertPosition = content.indexOf('function createDataCard(field, config) {');

if (insertPosition === -1) {
    console.error('❌ 未找到 createDataCard 函数');
    process.exit(1);
}

// 添加翻译函数
const translationFunction = `
        // 翻译字段标签
        function translateLabel(label) {
            const lang = getTouchscreenLang();
            if (lang === 'zh') return label;

            const labelTranslations = {
                // 运行统计
                '今日充电量': "Today's Charge",
                '今日放电量': "Today's Discharge",
                '累计充电量': 'Total Charge',
                '累计放电量': 'Total Discharge',
                '循环次数': 'Cycle Count',
                '寿命正常': 'Lifespan Normal',
                '循环寿命统计': 'Cycle Lifespan Statistics',

                // 策略调度参数
                '当前策略': 'Current Strategy',
                '调度指令': 'Dispatch Command',
                '目标SOC': 'Target SOC',
                '最大功率': 'Max Power',

                // 核心运行参数
                '温度': 'Temperature',
                '充放电功率': 'Charge/Discharge Power',
                '电池电流': 'Battery Current',
                '电池电压': 'Battery Voltage',

                // 其他常见标签
                '使用率': 'Usage',
                '占用率': 'Occupancy',
                '空间使用率': 'Disk Usage',
                '当前温度': 'Current Temp',
                '信号强度': 'Signal Strength',
                'SIM卡状态': 'SIM Status',
                '网络接口': 'Network Interface',
                '状态': 'Status',
                '电流': 'Current',
                '电压': 'Voltage',
                '功率': 'Power',
                '能量': 'Energy',
                '单体电压': 'Cell Voltage',
                '温度探测器': 'Temp Detector',
                '烟雾探测器': 'Smoke Detector',
                '火警状态': 'Fire Alarm Status',
                '灭火状态': 'Extinguisher Status',
                '紧急停机': 'Emergency Stop',
                '疏散警报': 'Evacuation Alarm'
            };

            return labelTranslations[label] || label;
        }

        `;

content = content.slice(0, insertPosition) + translationFunction + content.slice(insertPosition);

console.log('✅ 已添加 translateLabel 函数');

// 现在替换 createDataCard 函数中所有的 config.label 为 translateLabel(config.label)
content = content.replace(/\$\{config\.label\}/g, '${translateLabel(config.label)}');
console.log('✅ 已更新 createDataCard 函数中的标签翻译');

// 同样更新 section 标题的翻译
content = content.replace(/\$\{section\}/g, '${translateLabel(section)}');
console.log('✅ 已更新章节标题的翻译');

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n✅ 字段标签翻译功能添加完成!');
console.log('📝 已修改文件: touchscreen/data.html');
