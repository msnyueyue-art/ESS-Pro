#!/bin/bash
# 快速添加响应式CSS

pages="alarm-statistics.html site1.html power-report.html electricity-price-new.html rule-engine.html alarm-management.html"

for page in $pages; do
    if [ -f "$page" ]; then
        if grep -q "responsive-1024.css" "$page"; then
            echo "跳过 $page (已包含)"
        else
            # 在styles.css后面添加responsive-1024.css
            sed -i 's|</head>|    <link rel="stylesheet" href="responsive-1024.css">\n</head>|' "$page"
            echo "✅ 添加: $page"
        fi
    else
        echo "❌ 文件不存在: $page"
    fi
done

echo "完成！"
