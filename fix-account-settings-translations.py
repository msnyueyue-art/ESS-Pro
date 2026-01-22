#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复账号设置页面的翻译ID
艹，老王我写个脚本把这些SB翻译ID全改了！
"""

# 翻译ID映射表：旧ID -> 新ID
ID_MAPPING = {
    # 页面标题
    'accountSettingsTitle': 'accountSettings.pageTitle',
    'accountSettingsSubtitle': 'accountSettings.pageSubtitle',

    # 左侧标签
    'tabBasicInfo': 'accountSettings.tabs.basicInfo',
    'tabAccountSettings': 'accountSettings.tabs.accountSettings',
    'tabChangePassword': 'accountSettings.tabs.changePassword',

    # 基本信息
    'cardBasicInfoTitle': 'accountSettings.basicInfo.cardTitle',
    'labelAvatar': 'accountSettings.basicInfo.avatar',
    'btnChangeAvatar': 'accountSettings.basicInfo.changeAvatar',
    'btnRemoveAvatar': 'accountSettings.basicInfo.removeAvatar',
    'hintAvatarFormat': 'accountSettings.basicInfo.avatarHint',
    'labelNickname': 'accountSettings.basicInfo.nickname',
    'placeholderNickname': 'accountSettings.basicInfo.nicknamePlaceholder',
    'btnSaveNickname': 'accountSettings.basicInfo.save',

    # 消息提示
    'msgSaveSuccess': 'accountSettings.messages.saveSuccess',
    'msgSaveFailed': 'accountSettings.messages.saveFailed',
}

def main():
    """主函数"""
    file_path = 'account-settings.html'

    print("老王我开始读取account-settings.html...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"文件大小: {len(content)} 字节")

    # 先将data-translate改为data-i18n
    content = content.replace('data-translate="', 'data-i18n="')
    content = content.replace('data-translate-placeholder="', 'data-i18n-placeholder="')

    # 然后替换所有翻译ID
    for old_id, new_id in ID_MAPPING.items():
        # 处理普通的data-i18n属性
        content = content.replace(f'data-i18n="{old_id}"', f'data-i18n="{new_id}"')
        # 处理placeholder的data-i18n-placeholder属性
        content = content.replace(f'data-i18n-placeholder="{old_id}"', f'data-i18n-placeholder="{new_id}"')
        if old_id in content:
            print(f"替换: {old_id} -> {new_id}")

    # 写回文件
    print("老王我开始写回文件...")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("乖乖！翻译ID修复完成！")

    # 现在添加其他缺失的翻译ID
    print("\n老王我现在添加其他缺失的翻译ID...")

    # 读取修改后的文件
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 需要添加data-i18n的文本列表 (行号, 搜索文本, 翻译ID)
    additions = [
        # 邮箱绑定部分
        (725, '<h2 class="settings-title">邮箱绑定</h2>', '<h2 class="settings-title" data-i18n="accountSettings.emailBinding.cardTitle">邮箱绑定</h2>'),
        (731, '<div class="info-label">当前邮箱</div>', '<div class="info-label" data-i18n="accountSettings.emailBinding.currentEmail">当前邮箱</div>'),
        (734, '修改邮箱', '<span data-i18n="accountSettings.emailBinding.changeEmail">修改邮箱</span>'),
        (746, '<label>验证码</label>', '<label data-i18n="accountSettings.emailBinding.verificationCode">验证码</label>'),
        (748, 'placeholder="请输入验证码"', 'placeholder="请输入验证码" data-i18n-placeholder="accountSettings.emailBinding.verificationCodePlaceholder"'),
        (750, '发送验证码', '<span data-i18n="accountSettings.emailBinding.sendCode">发送验证码</span>'),
        (772, '<label>新邮箱地址</label>', '<label data-i18n="accountSettings.emailBinding.newEmail">新邮箱地址</label>'),
        (773, 'placeholder="请输入新邮箱地址"', 'placeholder="请输入新邮箱地址" data-i18n-placeholder="accountSettings.emailBinding.newEmailPlaceholder"'),
        (776, '<label>新邮箱验证码</label>', '<label data-i18n="accountSettings.emailBinding.newEmailCode">新邮箱验证码</label>'),
        (779, '获取验证码', '<span data-i18n="accountSettings.emailBinding.getCode">获取验证码</span>'),
        (786, '确认修改', '<span data-i18n="accountSettings.emailBinding.confirmChange">确认修改</span>'),
        (789, '取消', '<span data-i18n="accountSettings.emailBinding.cancel">取消</span>'),
        (761, '确定', '<span data-i18n="accountSettings.emailBinding.confirm">确定</span>'),
        (762, '取消', '<span data-i18n="accountSettings.emailBinding.cancel">取消</span>'),

        # 密码设置部分
        (806, '<h2 class="settings-title">密码设置</h2>', '<h2 class="settings-title" data-i18n="accountSettings.passwordSettings.cardTitle">密码设置</h2>'),
        (811, '<label class="form-label">修改方式</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.changeMethod">修改方式</label>'),
        (815, '<span class="radio-label">使用原密码验证</span>', '<span class="radio-label" data-i18n="accountSettings.passwordSettings.usePassword">使用原密码验证</span>'),
        (818, '<span class="radio-label">使用邮箱验证</span>', '<span class="radio-label" data-i18n="accountSettings.passwordSettings.useEmail">使用邮箱验证</span>'),
        (828, '<label class="form-label">原密码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.currentPassword">原密码</label>'),
        (829, 'placeholder="请输入原密码"', 'placeholder="请输入原密码" data-i18n-placeholder="accountSettings.passwordSettings.currentPasswordPlaceholder"'),
        (836, '<label class="form-label">邮箱验证</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.emailVerification">邮箱验证</label>'),
        (839, '获取验证码', '<span data-i18n="accountSettings.passwordSettings.getVerificationCode">获取验证码</span>'),
        (845, '<label class="form-label">验证码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.verificationCode">验证码</label>'),
        (846, 'placeholder="请输入验证码"', 'placeholder="请输入验证码" data-i18n-placeholder="accountSettings.passwordSettings.verificationCodePlaceholder"'),
        (852, '<label class="form-label">新密码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.newPassword">新密码</label>'),
        (854, 'placeholder="请输入新密码"', 'placeholder="请输入新密码" data-i18n-placeholder="accountSettings.passwordSettings.newPasswordPlaceholder"'),
        (858, '<label class="form-label">确认密码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.confirmPassword">确认密码</label>'),
        (859, 'placeholder="请再次输入新密码"', 'placeholder="请再次输入新密码" data-i18n-placeholder="accountSettings.passwordSettings.confirmPasswordPlaceholder"'),
        (863, '重置', '<span data-i18n="accountSettings.passwordSettings.reset">重置</span>'),
        (866, '修改密码', '<span data-i18n="accountSettings.passwordSettings.changePassword">修改密码</span>'),
    ]

    # 由于直接修改特定行太复杂，我们改用全文替换的方式
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 邮箱绑定部分的替换
    replacements = [
        ('<h2 class="settings-title">邮箱绑定</h2>', '<h2 class="settings-title" data-i18n="accountSettings.emailBinding.cardTitle">邮箱绑定</h2>'),
        ('<div class="info-label">当前邮箱</div>', '<div class="info-label" data-i18n="accountSettings.emailBinding.currentEmail">当前邮箱</div>'),
        ('修改邮箱\n                                    </button>', '<span data-i18n="accountSettings.emailBinding.changeEmail">修改邮箱</span>\n                                    </button>'),
        ('<label>验证码</label>', '<label data-i18n="accountSettings.emailBinding.verificationCode">验证码</label>'),
        ('id="currentEmailCode" placeholder="请输入验证码"', 'id="currentEmailCode" placeholder="请输入验证码" data-i18n-placeholder="accountSettings.emailBinding.verificationCodePlaceholder"'),
        ('id="sendCodeBtn">\n                                                    发送验证码', 'id="sendCodeBtn">\n                                                    <span data-i18n="accountSettings.emailBinding.sendCode">发送验证码</span>'),
        ('<label>新邮箱地址</label>', '<label data-i18n="accountSettings.emailBinding.newEmail">新邮箱地址</label>'),
        ('id="newEmail" placeholder="请输入新邮箱地址"', 'id="newEmail" placeholder="请输入新邮箱地址" data-i18n-placeholder="accountSettings.emailBinding.newEmailPlaceholder"'),
        ('<label>新邮箱验证码</label>', '<label data-i18n="accountSettings.emailBinding.newEmailCode">新邮箱验证码</label>'),
        ('id="newEmailCode" placeholder="请输入验证码"', 'id="newEmailCode" placeholder="请输入验证码" data-i18n-placeholder="accountSettings.emailBinding.verificationCodePlaceholder"'),
        ('id="newEmailCodeBtn" disabled>\n                                                    获取验证码', 'id="newEmailCodeBtn" disabled>\n                                                    <span data-i18n="accountSettings.emailBinding.getCode">获取验证码</span>'),
        ('style="width: 100px; height: 40px;">\n                                                确认修改\n                                            </button>\n                                            <button type="button" class="btn btn-secondary" onclick="hideEmailChange()" style="width: 100px; height: 40px;">\n                                                取消',
         'style="width: 100px; height: 40px;">\n                                                <span data-i18n="accountSettings.emailBinding.confirmChange">确认修改</span>\n                                            </button>\n                                            <button type="button" class="btn btn-secondary" onclick="hideEmailChange()" style="width: 100px; height: 40px;">\n                                                <span data-i18n="accountSettings.emailBinding.cancel">取消</span>'),
        ('style="width: 90px; height: 40px;">\n                                                确定\n                                            </button>\n                                            <button type="button" class="btn btn-secondary" onclick="hideEmailChange()" style="width: 90px; height: 40px;">\n                                                取消',
         'style="width: 90px; height: 40px;">\n                                                <span data-i18n="accountSettings.emailBinding.confirm">确定</span>\n                                            </button>\n                                            <button type="button" class="btn btn-secondary" onclick="hideEmailChange()" style="width: 90px; height: 40px;">\n                                                <span data-i18n="accountSettings.emailBinding.cancel">取消</span>'),

        # 密码设置部分
        ('<h2 class="settings-title">密码设置</h2>', '<h2 class="settings-title" data-i18n="accountSettings.passwordSettings.cardTitle">密码设置</h2>'),
        ('<label class="form-label">修改方式</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.changeMethod">修改方式</label>'),
        ('<span class="radio-label">使用原密码验证</span>', '<span class="radio-label" data-i18n="accountSettings.passwordSettings.usePassword">使用原密码验证</span>'),
        ('<span class="radio-label">使用邮箱验证</span>', '<span class="radio-label" data-i18n="accountSettings.passwordSettings.useEmail">使用邮箱验证</span>'),
        ('<label class="form-label">原密码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.currentPassword">原密码</label>'),
        ('id="currentPassword" placeholder="请输入原密码"', 'id="currentPassword" placeholder="请输入原密码" data-i18n-placeholder="accountSettings.passwordSettings.currentPasswordPlaceholder"'),
        ('<label class="form-label">邮箱验证</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.emailVerification">邮箱验证</label>'),
        ('onclick="sendPasswordResetCode()">\n                                            获取验证码', 'onclick="sendPasswordResetCode()">\n                                            <span data-i18n="accountSettings.passwordSettings.getVerificationCode">获取验证码</span>'),
        ('<label class="form-label">验证码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.verificationCode">验证码</label>'),
        ('id="resetCode" placeholder="请输入验证码"', 'id="resetCode" placeholder="请输入验证码" data-i18n-placeholder="accountSettings.passwordSettings.verificationCodePlaceholder"'),
        ('<label class="form-label">新密码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.newPassword">新密码</label>'),
        ('id="newPassword" placeholder="请输入新密码"', 'id="newPassword" placeholder="请输入新密码" data-i18n-placeholder="accountSettings.passwordSettings.newPasswordPlaceholder"'),
        ('<label class="form-label">确认密码</label>', '<label class="form-label" data-i18n="accountSettings.passwordSettings.confirmPassword">确认密码</label>'),
        ('id="confirmPassword" placeholder="请再次输入新密码"', 'id="confirmPassword" placeholder="请再次输入新密码" data-i18n-placeholder="accountSettings.passwordSettings.confirmPasswordPlaceholder"'),
        ('onclick="resetPasswordForm()" style="width: 90px; height: 40px;">\n                                    重置', 'onclick="resetPasswordForm()" style="width: 90px; height: 40px;">\n                                    <span data-i18n="accountSettings.passwordSettings.reset">重置</span>'),
        ('type="submit" class="btn btn-primary" style="width: 110px; height: 40px;">\n                                    修改密码', 'type="submit" class="btn btn-primary" style="width: 110px; height: 40px;">\n                                    <span data-i18n="accountSettings.passwordSettings.changePassword">修改密码</span>'),
    ]

    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            print(f"✓ 替换成功: {old[:50]}...")
        else:
            print(f"✗ 未找到: {old[:50]}...")

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("\n乖乖！所有翻译ID添加完成！")

if __name__ == '__main__':
    main()
