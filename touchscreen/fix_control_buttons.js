// 补充修复 control.html 中按钮内的中文文本
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'control.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// 修复手动模式按钮
html = html.replace(
    /<i class="fas fa-battery-three-quarters"[^>]*><\/i>充电/g,
    '<i class="fas fa-battery-three-quarters" style="margin-right: 10px; font-size: 20px;"></i><span data-i18n="charging">Charging</span>'
);

html = html.replace(
    /<i class="fas fa-bolt"[^>]*><\/i>放电/g,
    '<i class="fas fa-bolt" style="margin-right: 10px; font-size: 20px;"></i><span data-i18n="discharging">Discharging</span>'
);

// 修复按钮内的"开启"和"关闭"文本(需要更精确的匹配以避免误替换)
// 注意: 这些按钮已经在之前的脚本中添加了data-i18n,但可能包含在span内部
// 需要确保按钮文本被span包裹

// 修复选择按钮内部的文本 - 为每个按钮添加 data-i18n-btn 属性用于后续JavaScript处理
const buttonReplacements = [
    // 风扇控制按钮
    { pattern: /(id="fanControl"[\s\S]{0,100}?<button[^>]*>)<span data-i18n="auto">Auto<\/span>/g,
      replacement: '$1<span data-i18n="auto">Auto</span>' },
    { pattern: /(id="fanControl"[\s\S]{0,200}?<button[^>]*>)<span data-i18n="on">On<\/span>/g,
      replacement: '$1<span data-i18n="on">On</span>' },
    { pattern: /(id="fanControl"[\s\S]{0,300}?<button[^>]*>)<span data-i18n="off">Off<\/span>/g,
      replacement: '$1<span data-i18n="off">Off</span>' },

    // 温度保护按钮
    { pattern: /(id="tempProtection"[\s\S]{0,100}?<button[^>]*>)<span data-i18n="on">On<\/span>/g,
      replacement: '$1<span data-i18n="on">On</span>' },
    { pattern: /(id="tempProtection"[\s\S]{0,200}?<button[^>]*>)<span data-i18n="off">Off<\/span>/g,
      replacement: '$1<span data-i18n="off">Off</span>' },
];

// 检查按钮文本是否已经被span包裹,如果没有则添加
const unwrappedButtons = [
    // 均衡控制
    { regex: /(id="balanceControl"[\s\S]{0,100}?class="select-btn[^>]*>)主动均衡(<\/button>)/g,
      replacement: '$1<span data-i18n="activeBalance">Active Balance</span>$2' },
    { regex: /(id="balanceControl"[\s\S]{0,200}?class="select-btn[^>]*>)被动均衡(<\/button>)/g,
      replacement: '$1<span data-i18n="passiveBalance">Passive Balance</span>$2' },

    // 风扇控制 - 如果还有未包裹的
    { regex: /(id="fanControl"[\s\S]{0,100}?class="select-btn[^>]*>)自动(<\/button>)/g,
      replacement: '$1<span data-i18n="auto">Auto</span>$2' },
    { regex: /(id="fanControl"[\s\S]{0,200}?class="select-btn[^>]*>)开启(<\/button>)/g,
      replacement: '$1<span data-i18n="on">On</span>$2' },
    { regex: /(id="fanControl"[\s\S]{0,300}?class="select-btn[^>]*>)关闭(<\/button>)/g,
      replacement: '$1<span data-i18n="off">Off</span>$2' },

    // 温度保护
    { regex: /(id="tempProtection"[\s\S]{0,100}?class="select-btn[^>]*>)开启(<\/button>)/g,
      replacement: '$1<span data-i18n="on">On</span>$2' },
    { regex: /(id="tempProtection"[\s\S]{0,200}?class="select-btn[^>]*>)关闭(<\/button>)/g,
      replacement: '$1<span data-i18n="off">Off</span>$2' },

    // 消防控制 - 灭火启动
    { regex: /(id="fireExtinguisherMode"[\s\S]{0,100}?class="select-btn[^>]*>)自动启动(<\/button>)/g,
      replacement: '$1<span data-i18n="autoStart">Auto Start</span>$2' },
    { regex: /(id="fireExtinguisherMode"[\s\S]{0,200}?class="select-btn[^>]*>)手动启动(<\/button>)/g,
      replacement: '$1<span data-i18n="manualStart">Manual Start</span>$2' },
    { regex: /(id="fireExtinguisherMode"[\s\S]{0,300}?class="select-btn[^>]*>)禁用(<\/button>)/g,
      replacement: '$1<span data-i18n="disabled">Disabled</span>$2' },

    // 灭火剂类型
    { regex: /(id="extinguisherType"[\s\S]{0,100}?class="select-btn[^>]*>)全氟己酮(<\/button>)/g,
      replacement: '$1<span data-i18n="perfluorohexanone">Perfluorohexanone</span>$2' },
    { regex: /(id="extinguisherType"[\s\S]{0,200}?class="select-btn[^>]*>)七氟丙烷(<\/button>)/g,
      replacement: '$1<span data-i18n="heptafluoropropane">Heptafluoropropane</span>$2' },
    { regex: /(id="extinguisherType"[\s\S]{0,300}?class="select-btn[^>]*>)IG541混合气体(<\/button>)/g,
      replacement: '$1<span data-i18n="ig541MixedGas">IG541 Mixed Gas</span>$2' },
    { regex: /(id="extinguisherType"[\s\S]{0,400}?class="select-btn[^>]*>)二氧化碳(<\/button>)/g,
      replacement: '$1<span data-i18n="carbonDioxide">Carbon Dioxide</span>$2' },

    // 声光报警
    { regex: /(id="alarmSystem"[\s\S]{0,100}?class="select-btn[^>]*>)启用(<\/button>)/g,
      replacement: '$1<span data-i18n="enabled">Enabled</span>$2' },
    { regex: /(id="alarmSystem"[\s\S]{0,200}?class="select-btn[^>]*>)禁用(<\/button>)/g,
      replacement: '$1<span data-i18n="disabled">Disabled</span>$2' },
    { regex: /(id="alarmSystem"[\s\S]{0,300}?class="select-btn[^>]*>)测试模式(<\/button>)/g,
      replacement: '$1<span data-i18n="testMode">Test Mode</span>$2' },

    // 通风控制
    { regex: /(id="ventilationControl"[\s\S]{0,100}?class="select-btn[^>]*>)自动控制(<\/button>)/g,
      replacement: '$1<span data-i18n="autoControl">Auto Control</span>$2' },
    { regex: /(id="ventilationControl"[\s\S]{0,200}?class="select-btn[^>]*>)强制开启(<\/button>)/g,
      replacement: '$1<span data-i18n="forceOn">Force On</span>$2' },
    { regex: /(id="ventilationControl"[\s\S]{0,300}?class="select-btn[^>]*>)强制关闭(<\/button>)/g,
      replacement: '$1<span data-i18n="forceOff">Force Off</span>$2' },

    // 紧急断电
    { regex: /(id="emergencyPowerOff"[\s\S]{0,100}?class="select-btn[^>]*>)自动(<\/button>)/g,
      replacement: '$1<span data-i18n="auto">Auto</span>$2' },
    { regex: /(id="emergencyPowerOff"[\s\S]{0,200}?class="select-btn[^>]*>)手动(<\/button>)/g,
      replacement: '$1<span data-i18n="manual">Manual</span>$2' },
    { regex: /(id="emergencyPowerOff"[\s\S]{0,300}?class="select-btn[^>]*>)禁用(<\/button>)/g,
      replacement: '$1<span data-i18n="disabled">Disabled</span>$2' },
];

// 应用所有替换
unwrappedButtons.forEach(({ regex, replacement }) => {
    if (html.match(regex)) {
        html = html.replace(regex, replacement);
        console.log(`✓ 已处理: ${regex.source.substring(0, 50)}...`);
    }
});

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('✅ control.html 按钮文本国际化补充完成!');
console.log(`📝 共处理 ${unwrappedButtons.length} 个按钮替换规则`);
