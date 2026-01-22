#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复新建策略弹框中的国际化问题
"""

import re
import sys

def fix_rule_engine_i18n(file_path):
    """修复 rule-engine.html 中的国际化问题"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. 修复 JavaScript 中的硬编码 '新建策略'
    content = re.sub(
        r"modalTitle\.textContent = '新建策略';",
        "modalTitle.textContent = getTranslation('ruleNewRule');",
        content
    )

    # 2. 修复下拉选项 '参数恢复正常范围'
    content = re.sub(
        r'<option value="normal" selected>参数恢复正常范围</option>',
        '<option value="normal" selected data-translate="ruleResolutionNormalRange">参数恢复正常范围</option>',
        content
    )

    # 3. 修复消除延迟的 '分钟' 单位文本
    content = re.sub(
        r'<span style="font-size: 13px; color: var\(--text-secondary\);">分钟</span>',
        '<span style="font-size: 13px; color: var(--text-secondary);" data-translate="ruleMinutes">分钟</span>',
        content
    )

    # 4. 修复时间窗口下拉选项中的硬编码文本
    # 5分钟
    content = re.sub(
        r'<option value="5">5分钟</option>',
        '<option value="5" data-translate-template="ruleTimeWindowMinutes" data-value="5">5分钟</option>',
        content
    )
    # 10分钟
    content = re.sub(
        r'<option value="10" selected>10分钟</option>',
        '<option value="10" selected data-translate-template="ruleTimeWindowMinutes" data-value="10">10分钟</option>',
        content
    )
    # 30分钟
    content = re.sub(
        r'<option value="30">30分钟</option>',
        '<option value="30" data-translate-template="ruleTimeWindowMinutes" data-value="30">30分钟</option>',
        content
    )
    # 1小时
    content = re.sub(
        r'<option value="60">1小时</option>',
        '<option value="60" data-translate="ruleTimeWindow1Hour">1小时</option>',
        content
    )
    # 2小时
    content = re.sub(
        r'<option value="120">2小时</option>',
        '<option value="120" data-translate="ruleTimeWindow2Hours">2小时</option>',
        content
    )

    # 5. 修复降噪配置中的 "分钟内最多发送" 和 "次"
    # 这些文本在三个地方(故障、告警、通知)都有,需要统一处理
    content = re.sub(
        r'<span>分钟内最多发送</span>',
        '<span data-translate="ruleMinutesMaxSend">分钟内最多发送</span>',
        content
    )
    content = re.sub(
        r'<span>次</span>',
        '<span data-translate="ruleTimes">次</span>',
        content
    )

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 成功修复 {file_path}")
        return True
    else:
        print(f"ℹ️  {file_path} 无需修改")
        return False

if __name__ == '__main__':
    file_path = 'rule-engine.html'
    try:
        fix_rule_engine_i18n(file_path)
        print("\n✅ 所有修复完成!")
    except Exception as e:
        print(f"❌ 错误: {e}")
        sys.exit(1)
