#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
最终修复i18n.js的翻译位置
"""

file_path = '../ueh/components/i18n.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 修复方案：
# 1. 把 "                }\n            }," 改成 "                },\n            },"
# 2. 确保accountSettings在zh对象内

# 找到错误的位置并修复
content = content.replace(
    '                }\n            },\n\n                // 账号设置页面翻译\n                accountSettings: {',
    '                },\n\n                // 账号设置页面翻译\n                accountSettings: {'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("修复完成！")
