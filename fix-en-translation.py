#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复英文翻译位置
"""

file_path = '../ueh/components/i18n.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 修复英文部分
content = content.replace(
    '                }\n            },\n\n                // Account Settings page translations\n                accountSettings: {',
    '                },\n\n                // Account Settings page translations\n                accountSettings: {'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("英文翻译修复完成！")
