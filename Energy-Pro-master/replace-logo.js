const fs = require('fs');
const path = require('path');

const base = path.dirname(__filename);
const skipDirs = new Set(['__MACOSX', '.playwright-mcp', '.git', 'node_modules']);
const exts = new Set(['.html', '.js']);
const replaced = [];

function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
    catch (e) { return; }
    for (const entry of entries) {
        if (entry.isDirectory()) {
            if (!skipDirs.has(entry.name)) walk(path.join(dir, entry.name));
        } else if (exts.has(path.extname(entry.name))) {
            const fpath = path.join(dir, entry.name);
            try {
                const content = fs.readFileSync(fpath, 'utf8');
                if (content.includes('logo.png')) {
                    fs.writeFileSync(fpath, content.replaceAll('logo.png', 'logo.png'), 'utf8');
                    replaced.push(path.relative(base, fpath));
                }
            } catch (e) {
                console.error('Error:', fpath, e.message);
            }
        }
    }
}

// Skip this script itself
walk(base);
const selfIdx = replaced.indexOf('replace-logo.js');
if (selfIdx !== -1) replaced.splice(selfIdx, 1);

console.log(`完成！共更新 ${replaced.length} 个文件`);
replaced.forEach(p => console.log(' ', p));
