#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复翻译配置位置
艹，这个SB翻译被加到错误位置了！
"""

def main():
    file_path = '../ueh/components/i18n.js'

    print("老王我开始读取文件...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 找到accountSettings的中文配置（错误位置）
    zh_wrong_start = content.find('            },\n\n                // 账号设置页面翻译\n                accountSettings: {')
    if zh_wrong_start == -1:
        print("艹！找不到错误位置的accountSettings配置！")
        return

    # 找到accountSettings配置的结束位置（找到下一个顶层对象开始的地方）
    # 寻找 "en: {" 来确定结束位置
    zh_search_start = zh_wrong_start + 100
    en_start = content.find('\n            en: {', zh_search_start)

    if en_start == -1:
        print("艹！找不到en对象！")
        return

    # 提取accountSettings配置（包含前导空格）
    zh_account_settings = content[zh_wrong_start:en_start]

    # 找到"            },"这一行之前的内容（应该是taskDetail结束的地方）
    # 我们需要在taskDetail的 } 之后，zh的 }, 之前插入

    # 找到第一个 "            }," (这应该是zh对象关闭)
    correct_position = content.find('            },\n\n                // 账号设置页面翻译')
    if correct_position == -1:
        print("找不到插入位置标记")
        return

    # 删除错误位置的accountSettings
    content_without_wrong = content[:zh_wrong_start] + content[en_start:]

    # 找到taskDetail结束的位置（在删除错误配置后的内容中）
    # 寻找 "                }\n            }," 模式
    target = '                }\n            },'
    insert_pos = content_without_wrong.find(target)

    if insert_pos == -1:
        print("艹！找不到正确的插入位置！")
        # 尝试另一个模式
        target = '                    }\n                }\n            },'
        insert_pos = content_without_wrong.find(target)
        if insert_pos == -1:
            print("还是找不到！")
            return

    # 插入位置应该在 }\n            }, 之前
    # 找到最后一个taskDetail的结束符
    lines = content_without_wrong[:insert_pos + 200].split('\n')

    # 直接在文件中搜索"                }\n            },"并在第一个}后插入
    insert_pos = content_without_wrong.find('                }\n            },')
    if insert_pos == -1:
        print("找不到taskDetail结束标记")
        return

    # 在第一个}之后插入（即在"                }"这行之后）
    insert_pos = insert_pos + len('                }')

    # 准备要插入的内容（需要调整缩进和格式）
    # accountSettings应该和taskDetail在同一级别
    insert_content = ',\n\n                // 账号设置页面翻译\n                accountSettings: {'
    insert_content += zh_account_settings[zh_account_settings.find('pageTitle'):]

    # 简化方案：直接找到button: { export: "导出" } }这个模式
    # 然后在后面加上accountSettings

    # 重新读取
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 找到包含 'export: "导出"' 的行
    export_line_idx = None
    for i, line in enumerate(lines):
        if 'export: "导出"' in line:
            export_line_idx = i
            break

    if export_line_idx is None:
        print("找不到export: 导出这行")
        return

    print(f"找到export行在: {export_line_idx + 1}")

    # 检查后续几行的结构
    print("当前结构:")
    for i in range(export_line_idx, min(export_line_idx + 10, len(lines))):
        print(f"{i+1}: {lines[i].rstrip()}")

    # 找到 }   之后是  }  然后是 },
    # 我们要在第二个 } 之后插入

    # 寻找模式：
    # 1923:                         export: "导出"
    # 1924:                     }
    # 1925:                 }
    # 1926:             },
    # 我们要在1925行之后插入

    target_line = None
    for i in range(export_line_idx + 1, min(export_line_idx + 5, len(lines))):
        if lines[i].strip() == '}' and i < len(lines) - 1:
            # 检查下一行是否是 },
            if lines[i+1].strip() == '},':
                target_line = i
                break

    if target_line is None:
        print("找不到目标插入行")
        return

    print(f"目标插入行: {target_line + 1}")

    # 读取错误位置的accountSettings完整内容
    zh_account_start = None
    zh_account_end = None
    for i, line in enumerate(lines):
        if '// 账号设置页面翻译' in line and 'accountSettings: {' in lines[i+1]:
            zh_account_start = i
        if zh_account_start is not None and 'en: {' in line:
            zh_account_end = i
            break

    if zh_account_start is None or zh_account_end is None:
        print(f"找不到accountSettings范围: start={zh_account_start}, end={zh_account_end}")
        return

    print(f"accountSettings在错误位置: {zh_account_start + 1} 到 {zh_account_end + 1}")

    # 提取accountSettings内容
    account_settings_lines = lines[zh_account_start:zh_account_end]

    # 删除这些行
    del lines[zh_account_start:zh_account_end]

    # 调整target_line索引（因为删除了行）
    if target_line > zh_account_start:
        target_line -= (zh_account_end - zh_account_start)

    print(f"调整后目标行: {target_line + 1}")

    # 插入到正确位置
    for line in reversed(account_settings_lines):
        lines.insert(target_line + 1, line)

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print("乖乖！翻译位置修复完成！")

if __name__ == '__main__':
    main()
