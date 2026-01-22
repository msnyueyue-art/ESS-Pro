#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复i18n.js的localStorage同步问题
同时支持'language'和'app_language'两个存储key
"""

import re

def fix_storage_methods():
    """修改saveLanguageToStorage和loadLanguageFromStorage方法"""

    file_path = '../ueh/components/i18n.js'

    # 读取文件
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 定义新的saveLanguageToStorage方法
    new_save_method = '''    saveLanguageToStorage(language) {
        try {
            // 同时保存到两个key，兼容dashboard.html和其他页面
            localStorage.setItem(this.storageKey, language);
            localStorage.setItem('language', language);
        } catch (error) {
            console.warn('Failed to save language to localStorage:', error);
        }
    }'''

    # 定义新的loadLanguageFromStorage方法
    new_load_method = '''    loadLanguageFromStorage() {
        try {
            // 优先使用app_language，如果没有则尝试language
            let stored = localStorage.getItem(this.storageKey);
            if (!stored) {
                stored = localStorage.getItem('language');
                if (stored) {
                    // 同步到app_language
                    localStorage.setItem(this.storageKey, stored);
                }
            }
            return stored;
        } catch (error) {
            console.warn('Failed to load language from localStorage:', error);
            return null;
        }
    }'''

    # 替换saveLanguageToStorage方法
    save_pattern = r'    saveLanguageToStorage\(language\)\s*\{[^}]*\}'
    content = re.sub(save_pattern, new_save_method, content, flags=re.DOTALL)

    # 替换loadLanguageFromStorage方法
    load_pattern = r'    loadLanguageFromStorage\(\)\s*\{[^}]*\}'
    content = re.sub(load_pattern, new_load_method, content, flags=re.DOTALL)

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ 存储方法修复完成！")
    print("- saveLanguageToStorage: 同时保存到'app_language'和'language'")
    print("- loadLanguageFromStorage: 优先读取'app_language'，回退到'language'")

if __name__ == '__main__':
    fix_storage_methods()
