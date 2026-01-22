#!/bin/bash
# 修复 power-report.html 的国际化问题

FILE="power-report.html"

echo "开始修复 power-report.html 的国际化问题..."

# 1. 修复充电部分
sed -i 's|<span>充电(来源)</span>|<span data-translate="powerCharging">充电(来源)</span>|g' "$FILE"
sed -i 's|<div class="source-name">光伏充电</div>|<div class="source-name" data-translate="powerSolarCharging">光伏充电</div>|g' "$FILE"
sed -i 's|<div class="source-name">电网充电</div>|<div class="source-name" data-translate="powerGridCharging">电网充电</div>|g' "$FILE"

# 2. 修复放电部分
sed -i 's|<span>放电(用于)</span>|<span data-translate="powerDischarging">放电(用于)</span>|g' "$FILE"
sed -i 's|<div class="source-name">负载放电</div>|<div class="source-name" data-translate="powerLoadDischarging">负载放电</div>|g' "$FILE"

# 3. 修复分析指标选择
sed -i 's|<label class="metric-label">分析指标:|<label class="metric-label" data-translate="powerMetricLabel">分析指标:|g' "$FILE"
sed -i 's|<span>功率</span>|<span data-translate="powerPower">功率</span>|g' "$FILE"
sed -i 's|<span>能量拆分</span>|<span data-translate="powerEnergySplit">能量拆分</span>|g' "$FILE"

# 4. 修复图表中的硬编码文本 - 电池功率
sed -i "s|data: \['电池功率'\]|data: [getTranslation('powerBatteryPower')]|g" "$FILE"
sed -i "s|name: '电池功率'|name: getTranslation('powerBatteryPower')|g" "$FILE"

# 5. 修复 SOC 相关文本
sed -i "s|data: \['SOC (%)'\]|data: [getTranslation('powerSOC')]|g" "$FILE"
sed -i "s|name: 'SOC (%)'|name: getTranslation('powerSOC')|g" "$FILE"

echo "✅ power-report.html 修复完成!"
