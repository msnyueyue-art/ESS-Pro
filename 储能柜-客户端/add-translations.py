#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
账号设置翻译添加脚本
艹，老王我写个Python脚本来搞定这个SB翻译问题！
"""

# 中文翻译配置
zh_translation = ''',

                // 账号设置页面翻译
                accountSettings: {
                    pageTitle: "账号设置",
                    pageSubtitle: "管理您的个人信息和账号安全",
                    tabs: {
                        basicInfo: "基础信息",
                        accountSettings: "账号设置",
                        changePassword: "修改密码"
                    },
                    basicInfo: {
                        cardTitle: "基本信息",
                        avatar: "头像",
                        changeAvatar: "更换头像",
                        removeAvatar: "移除",
                        avatarHint: "支持 JPG、PNG 格式，大小不超过 2MB",
                        nickname: "昵称",
                        nicknamePlaceholder: "请输入昵称",
                        save: "保存",
                        avatarSizeError: "文件大小不能超过2MB"
                    },
                    emailBinding: {
                        cardTitle: "邮箱绑定",
                        currentEmail: "当前邮箱",
                        changeEmail: "修改邮箱",
                        verificationCode: "验证码",
                        verificationCodePlaceholder: "请输入验证码",
                        sendCode: "发送验证码",
                        codeHintPrefix: "点击发送验证码到",
                        codeSentPrefix: "验证码已发送至",
                        newEmail: "新邮箱地址",
                        newEmailPlaceholder: "请输入新邮箱地址",
                        newEmailCode: "新邮箱验证码",
                        getCode: "获取验证码",
                        confirmChange: "确认修改",
                        cancel: "取消",
                        confirm: "确定",
                        retryAfter: "秒后重试",
                        verifySuccess: "验证成功，请输入新邮箱",
                        emailChangeSuccess: "邮箱修改成功！",
                        fillAllFields: "请填写所有必填项",
                        enterNewEmail: "请先输入新邮箱地址"
                    },
                    passwordSettings: {
                        cardTitle: "密码设置",
                        changeMethod: "修改方式",
                        usePassword: "使用原密码验证",
                        useEmail: "使用邮箱验证",
                        currentPassword: "原密码",
                        currentPasswordPlaceholder: "请输入原密码",
                        emailVerification: "邮箱验证",
                        getVerificationCode: "获取验证码",
                        verificationCode: "验证码",
                        verificationCodePlaceholder: "请输入验证码",
                        newPassword: "新密码",
                        newPasswordPlaceholder: "请输入新密码",
                        confirmPassword: "确认密码",
                        confirmPasswordPlaceholder: "请再次输入新密码",
                        reset: "重置",
                        changePassword: "修改密码",
                        enterCurrentPassword: "请输入原密码",
                        enterVerificationCode: "请输入验证码",
                        enterNewPassword: "请输入新密码",
                        confirmNewPassword: "请确认新密码",
                        passwordMismatch: "两次输入的密码不一致",
                        passwordTooShort: "密码长度不能少于8位",
                        passwordChangeSuccess: "密码修改成功！"
                    },
                    messages: {
                        saveSuccess: "保存成功！",
                        saveFailed: "保存失败，请稍后重试",
                        nicknameSaved: "昵称已保存",
                        nicknameEmpty: "昵称不能为空",
                        codeSent: "验证码已发送到您的邮箱"
                    }
                }'''

# 英文翻译配置
en_translation = ''',

                // Account Settings page translations
                accountSettings: {
                    pageTitle: "Account Settings",
                    pageSubtitle: "Manage your personal information and account security",
                    tabs: {
                        basicInfo: "Basic Info",
                        accountSettings: "Account Settings",
                        changePassword: "Change Password"
                    },
                    basicInfo: {
                        cardTitle: "Basic Information",
                        avatar: "Avatar",
                        changeAvatar: "Change Avatar",
                        removeAvatar: "Remove",
                        avatarHint: "Supports JPG, PNG formats, max size 2MB",
                        nickname: "Nickname",
                        nicknamePlaceholder: "Enter nickname",
                        save: "Save",
                        avatarSizeError: "File size cannot exceed 2MB"
                    },
                    emailBinding: {
                        cardTitle: "Email Binding",
                        currentEmail: "Current Email",
                        changeEmail: "Change Email",
                        verificationCode: "Verification Code",
                        verificationCodePlaceholder: "Enter verification code",
                        sendCode: "Send Code",
                        codeHintPrefix: "Click to send verification code to",
                        codeSentPrefix: "Verification code sent to",
                        newEmail: "New Email Address",
                        newEmailPlaceholder: "Enter new email address",
                        newEmailCode: "New Email Verification Code",
                        getCode: "Get Code",
                        confirmChange: "Confirm Change",
                        cancel: "Cancel",
                        confirm: "Confirm",
                        retryAfter: "s retry",
                        verifySuccess: "Verification successful, please enter new email",
                        emailChangeSuccess: "Email changed successfully!",
                        fillAllFields: "Please fill in all required fields",
                        enterNewEmail: "Please enter new email address first"
                    },
                    passwordSettings: {
                        cardTitle: "Password Settings",
                        changeMethod: "Change Method",
                        usePassword: "Use Current Password",
                        useEmail: "Use Email Verification",
                        currentPassword: "Current Password",
                        currentPasswordPlaceholder: "Enter current password",
                        emailVerification: "Email Verification",
                        getVerificationCode: "Get Verification Code",
                        verificationCode: "Verification Code",
                        verificationCodePlaceholder: "Enter verification code",
                        newPassword: "New Password",
                        newPasswordPlaceholder: "Enter new password",
                        confirmPassword: "Confirm Password",
                        confirmPasswordPlaceholder: "Re-enter new password",
                        reset: "Reset",
                        changePassword: "Change Password",
                        enterCurrentPassword: "Please enter current password",
                        enterVerificationCode: "Please enter verification code",
                        enterNewPassword: "Please enter new password",
                        confirmNewPassword: "Please confirm new password",
                        passwordMismatch: "Passwords do not match",
                        passwordTooShort: "Password must be at least 8 characters",
                        passwordChangeSuccess: "Password changed successfully!"
                    },
                    messages: {
                        saveSuccess: "Saved successfully!",
                        saveFailed: "Save failed, please try again later",
                        nicknameSaved: "Nickname saved",
                        nicknameEmpty: "Nickname cannot be empty",
                        codeSent: "Verification code sent to your email"
                    }
                }'''

def main():
    """主函数：读取i18n.js文件，添加翻译，写回文件"""
    file_path = '../ueh/components/i18n.js'

    print("老王我开始读取i18n.js文件...")
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    print(f"总共 {len(lines)} 行，开始插入翻译...")

    # 找到中文翻译结束位置（第1925行，索引1924）
    # 在 }  之后的行插入
    zh_insert_line = None
    for i in range(1920, 1930):
        if i < len(lines) and lines[i].strip() == '}' and i+1 < len(lines) and lines[i+1].strip() == '},':
            zh_insert_line = i + 1  # 在 }, 这行
            break

    if zh_insert_line is None:
        print("艹！找不到中文翻译的插入位置！")
        return

    print(f"找到中文翻译插入位置: 第 {zh_insert_line + 1} 行")

    # 插入中文翻译
    lines[zh_insert_line] = lines[zh_insert_line].rstrip('\n') + zh_translation + '\n'

    # 找到英文翻译结束位置
    en_insert_line = None
    for i in range(3820, 3835):
        if i < len(lines) and lines[i].strip() == '}' and i+1 < len(lines) and lines[i+1].strip() == '},':
            en_insert_line = i + 1
            break

    if en_insert_line is None:
        print("艹！找不到英文翻译的插入位置！")
        return

    print(f"找到英文翻译插入位置: 第 {en_insert_line + 1} 行")

    # 插入英文翻译
    lines[en_insert_line] = lines[en_insert_line].rstrip('\n') + en_translation + '\n'

    # 写回文件
    print("老王我开始写回文件...")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("乖乖！翻译添加完成！")

if __name__ == '__main__':
    main()
