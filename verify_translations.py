#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""验证alarm-management.html中使用的所有翻译键是否在common.js中定义"""

import re
import sys

def extract_translation_keys_from_html(html_file):
    """从HTML文件中提取所有使用的翻译键"""
    keys = set()

    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 查找 getTranslation('key') 调用
    pattern1 = r"getTranslation\(['\"]([^'\"]+)['\"]\)"
    keys.update(re.findall(pattern1, content))

    # 查找 data-translate="key" 属性
    pattern2 = r'data-translate=["\']([^"\']+)["\']'
    keys.update(re.findall(pattern2, content))

    # 查找 data-translate-placeholder="key" 属性
    pattern3 = r'data-translate-placeholder=["\']([^"\']+)["\']'
    keys.update(re.findall(pattern3, content))

    return keys

def extract_translation_keys_from_common(common_file):
    """从common.js中提取所有定义的翻译键"""
    zh_keys = set()
    en_keys = set()

    with open(common_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 查找中文翻译对象
    zh_match = re.search(r'const\s+translations\s*=\s*\{(.*?)\};', content, re.DOTALL)
    if zh_match:
        zh_content = zh_match.group(1)
        # 提取所有键
        pattern = r"['\"]?([a-zA-Z0-9_]+)['\"]?\s*:"
        zh_keys = set(re.findall(pattern, zh_content))

    # 查找英文翻译对象
    en_match = re.search(r'const\s+translationsEN\s*=\s*\{(.*?)\};', content, re.DOTALL)
    if en_match:
        en_content = en_match.group(1)
        pattern = r"['\"]?([a-zA-Z0-9_]+)['\"]?\s*:"
        en_keys = set(re.findall(pattern, en_content))

    return zh_keys, en_keys

def main():
    html_file = r'c:\Users\33765\Desktop\项目集\原型demo\销售工具\销售工具1230\储能柜-客户端-专业版\alarm-management.html'
    common_file = r'c:\Users\33765\Desktop\项目集\原型demo\销售工具\销售工具1230\储能柜-客户端-专业版\common.js'

    print("正在提取翻译键...")
    html_keys = extract_translation_keys_from_html(html_file)
    zh_keys, en_keys = extract_translation_keys_from_common(common_file)

    print(f"\nalarm-management.html中使用的翻译键数量: {len(html_keys)}")
    print(f"common.js中文翻译键数量: {len(zh_keys)}")
    print(f"common.js英文翻译键数量: {len(en_keys)}")

    # 检查HTML中使用但common.js中缺失的键
    missing_in_zh = html_keys - zh_keys
    missing_in_en = html_keys - en_keys

    if missing_in_zh:
        print("\n⚠️ 在中文翻译中缺失的键:")
        for key in sorted(missing_in_zh):
            print(f"  - {key}")
    else:
        print("\n✅ 所有使用的翻译键都在中文翻译中定义")

    if missing_in_en:
        print("\n⚠️ 在英文翻译中缺失的键:")
        for key in sorted(missing_in_en):
            print(f"  - {key}")
    else:
        print("\n✅ 所有使用的翻译键都在英文翻译中定义")

    # 检查中英文翻译键是否一致
    only_in_zh = zh_keys - en_keys
    only_in_en = en_keys - zh_keys

    if only_in_zh:
        print("\n⚠️ 只在中文翻译中存在的键:")
        for key in sorted(only_in_zh)[:10]:  # 只显示前10个
            print(f"  - {key}")
        if len(only_in_zh) > 10:
            print(f"  ... 还有 {len(only_in_zh) - 10} 个")

    if only_in_en:
        print("\n⚠️ 只在英文翻译中存在的键:")
        for key in sorted(only_in_en)[:10]:
            print(f"  - {key}")
        if len(only_in_en) > 10:
            print(f"  ... 还有 {len(only_in_en) - 10} 个")

    if not missing_in_zh and not missing_in_en:
        print("\n🎉 翻译键验证通过!")
        return 0
    else:
        print("\n❌ 发现缺失的翻译键")
        return 1

if __name__ == '__main__':
    sys.exit(main())
