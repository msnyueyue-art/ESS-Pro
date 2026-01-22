#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复saveLanguageToStorage方法的重复catch块
"""

def fix_duplicate_catch():
    """删除重复的catch块"""

    file_path = '../ueh/components/i18n.js'

    # 读取文件
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 找到并修复重复的catch块
    fixed_lines = []
    skip_next = 0

    for i, line in enumerate(lines):
        if skip_next > 0:
            skip_next -= 1
            continue

        # 检查是否是重复的catch块开始
        if '    } catch (error) {' in line and i + 2 < len(lines):
            # 检查后面是否还有另一个catch块
            if '    } catch (error) {' in lines[i + 3] if i + 3 < len(lines) else False:
                # 跳过第一个catch块（包括它的内容和结束括号）
                skip_next = 3  # 跳过: catch行 + warn行 + }行
                continue

        fixed_lines.append(line)

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(fixed_lines)

    print("✅ 重复catch块已删除！")

if __name__ == '__main__':
    fix_duplicate_catch()
