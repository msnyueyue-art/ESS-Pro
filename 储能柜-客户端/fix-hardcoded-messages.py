#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复硬编码的消息文本
艹，这些SB消息都是硬编码的中文！
"""

# 消息文本映射：硬编码文本 -> 翻译key
MESSAGE_MAPPING = {
    '文件大小不能超过2MB': 'accountSettings.basicInfo.avatarSizeError',
    '验证码已发送到您的邮箱': 'accountSettings.messages.codeSent',
    '请先输入新邮箱地址': 'accountSettings.emailBinding.enterNewEmail',
    '验证码已发送到新邮箱': 'accountSettings.messages.codeSent',
    '昵称不能为空': 'accountSettings.messages.nicknameEmpty',
    '昵称已保存': 'accountSettings.messages.nicknameSaved',
    '请输入验证码': 'accountSettings.passwordSettings.enterVerificationCode',
    '验证成功，请输入新邮箱': 'accountSettings.emailBinding.verifySuccess',
    '请填写所有必填项': 'accountSettings.emailBinding.fillAllFields',
    '邮箱修改成功！': 'accountSettings.emailBinding.emailChangeSuccess',
    '请输入原密码': 'accountSettings.passwordSettings.enterCurrentPassword',
    '请输入新密码': 'accountSettings.passwordSettings.enterNewPassword',
    '请确认新密码': 'accountSettings.passwordSettings.confirmNewPassword',
    '两次输入的密码不一致': 'accountSettings.passwordSettings.passwordMismatch',
    '密码长度不能少于8位': 'accountSettings.passwordSettings.passwordTooShort',
    '密码修改成功！': 'accountSettings.passwordSettings.passwordChangeSuccess',
}

def main():
    file_path = 'account-settings.html'

    print("老王我开始读取文件...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 替换所有硬编码消息
    for chinese_text, i18n_key in MESSAGE_MAPPING.items():
        # showSuccess('中文') -> showSuccess(window.i18n.getText('key'))
        old_pattern = f"showSuccess('{chinese_text}')"
        new_pattern = f"showSuccess(window.i18n.getText('{i18n_key}'))"
        if old_pattern in content:
            content = content.replace(old_pattern, new_pattern)
            print(f"✓ 替换 showSuccess: {chinese_text}")

        # showError('中文') -> showError(window.i18n.getText('key'))
        old_pattern = f"showError('{chinese_text}')"
        new_pattern = f"showError(window.i18n.getText('{i18n_key}'))"
        if old_pattern in content:
            content = content.replace(old_pattern, new_pattern)
            print(f"✓ 替换 showError: {chinese_text}")

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("\n乖乖！所有硬编码消息已修复！")

if __name__ == '__main__':
    main()
