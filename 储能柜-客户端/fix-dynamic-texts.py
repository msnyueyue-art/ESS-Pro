#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复动态文本翻译
艹，还有一堆SB动态文本没有翻译！
"""

def main():
    file_path = 'account-settings.html'

    print("老王我开始修复动态文本...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 修复 "点击发送验证码到 admin@example.com"
    content = content.replace(
        "document.getElementById('codeHint').textContent = '点击发送验证码到 admin@example.com';",
        "document.getElementById('codeHint').textContent = window.i18n.getText('accountSettings.emailBinding.codeHintPrefix') + ' admin@example.com';"
    )

    # HTML中的初始文本也要改
    content = content.replace(
        '                                            点击发送验证码到 admin@example.com',
        "                                            <span id='codeHintText'></span>"
    )

    # 2. 修复 "验证码已发送至 admin@example.com"
    content = content.replace(
        "document.getElementById('codeHint').textContent = '验证码已发送至 admin@example.com';",
        "document.getElementById('codeHint').textContent = window.i18n.getText('accountSettings.emailBinding.codeSentPrefix') + ' admin@example.com';"
    )

    # 3. 修复 "秒后重试"
    replacements = [
        ('`${countdown}秒后重试`', "`${countdown}` + window.i18n.getText('accountSettings.emailBinding.retryAfter')"),
        ("`${countdown}秒后重试`", "`${countdown}` + window.i18n.getText('accountSettings.emailBinding.retryAfter')"),
    ]

    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            print(f"✓ 替换: {old}")

    # 4. 修复按钮文本 "获取验证码" 和 "发送验证码"
    # 这些需要根据上下文判断
    content = content.replace(
        "btn.textContent = '获取验证码';",
        "btn.textContent = window.i18n.getText('accountSettings.emailBinding.getCode');"
    )

    content = content.replace(
        "document.getElementById('sendCodeBtn').textContent = '发送验证码';",
        "document.getElementById('sendCodeBtn').textContent = window.i18n.getText('accountSettings.emailBinding.sendCode');"
    )

    # 5. 在DOMContentLoaded中添加初始化提示文本的代码
    # 找到 // 初始化 部分
    init_code = """        // 初始化
        document.addEventListener('DOMContentLoaded', function() {"""

    new_init_code = """        // 初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化提示文本
            const codeHintText = document.getElementById('codeHintText');
            if (codeHintText) {
                codeHintText.textContent = window.i18n.getText('accountSettings.emailBinding.codeHintPrefix') + ' admin@example.com';
            }
            """

    content = content.replace(init_code, new_init_code)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("\n乖乖！动态文本翻译修复完成！")

if __name__ == '__main__':
    main()
