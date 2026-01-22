const fs = require('fs');

console.log('========================================');
console.log(' 添加北京地址的英文映射');
console.log('========================================\n');

const htmlPath = 'site1.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

// 添加北京地址的英文映射
const oldAddressMap = `const addressMap = {
                '上海市浦东新区张江高科技园区': 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai',
                '苏州市工业园区星湖街328号': '328 Xinghu Street, Suzhou Industrial Park, Suzhou',
                '深圳市福田区中心区福华三路': 'Fuhua 3rd Road, Central District, Futian District, Shenzhen',
                '广州市白云区钟落潭物流园': 'Zhongluotan Logistics Park, Baiyun District, Guangzhou',
                '杭州市滨江区网商路599号': '599 Wangshang Road, Binjiang District, Hangzhou',
                '南京市江宁区秣周东路9号': '9 Mozhou East Road, Jiangning District, Nanjing'
            };`;

const newAddressMap = `const addressMap = {
                '上海市浦东新区张江高科技园区': 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai',
                '苏州市工业园区星湖街328号': '328 Xinghu Street, Suzhou Industrial Park, Suzhou',
                '深圳市福田区中心区福华三路': 'Fuhua 3rd Road, Central District, Futian District, Shenzhen',
                '广州市白云区钟落潭物流园': 'Zhongluotan Logistics Park, Baiyun District, Guangzhou',
                '杭州市滨江区网商路599号': '599 Wangshang Road, Binjiang District, Hangzhou',
                '南京市江宁区秣周东路9号': '9 Mozhou East Road, Jiangning District, Nanjing',
                '北京市海淀区中关村软件园': 'Zhongguancun Software Park, Haidian District, Beijing'
            };`;

if (content.includes('北京市海淀区中关村软件园')) {
    if (content.includes("'北京市海淀区中关村软件园': 'Zhongguancun Software Park")) {
        console.log('✓ 北京地址英文映射已存在');
    } else {
        content = content.replace(oldAddressMap, newAddressMap);
        fs.writeFileSync(htmlPath, content, 'utf-8');
        console.log('✅ 已添加北京地址的英文映射');
        console.log('\n中文: 北京市海淀区中关村软件园');
        console.log('英文: Zhongguancun Software Park, Haidian District, Beijing');
    }
} else {
    console.log('⚠️  数据中没有北京地址');
}

console.log('\n========================================');
console.log(' 修复完成!');
console.log('========================================');
