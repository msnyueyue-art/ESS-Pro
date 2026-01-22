# -*- coding: utf-8 -*-
"""
国际化修复脚本
自动为HTML文件添加data-translate属性并更新common.js中的翻译
"""

import re
import os

# alarm-management.html 的翻译映射
alarm_mgmt_translations = {
    # 页面标题
    '告警管理 - 储能柜管理系统': ('alarmMgmtPageTitle', 'Alarm Management - Energy Storage Management System'),

    # Tab标签
    '故障消息': ('alarmMgmtFaultTab', 'Fault Messages'),
    '告警消息': ('alarmMgmtWarningTab', 'Warning Messages'),
    '通知消息': ('alarmMgmtNoticeTab', 'Notification Messages'),

    # 筛选标签
    '站点': ('alarmMgmtFilterSite', 'Site'),
    '全部站点': ('alarmMgmtFilterAllSites', 'All Sites'),
    '设备': ('alarmMgmtFilterDevice', 'Device'),
    '请输入设备名称': ('alarmMgmtFilterDevicePlaceholder', 'Enter device name'),
    '故障源': ('alarmMgmtFilterSource', 'Fault Source'),
    '全部来源': ('alarmMgmtFilterAllSources', 'All Sources'),
    '储能柜': ('alarmMgmtSourceCabinet', 'Cabinet'),
    '网关': ('alarmMgmtSourceGateway', 'Gateway'),
    '状态': ('alarmMgmtFilterStatus', 'Status'),
    '全部状态': ('alarmMgmtFilterAllStatus', 'All Status'),
    '正常': ('alarmMgmtStatusNormal', 'Normal'),
    '故障': ('alarmMgmtStatusFault', 'Fault'),
    '告警': ('alarmMgmtStatusWarning', 'Warning'),
    '已读': ('alarmMgmtStatusRead', 'Read'),
    '未读': ('alarmMgmtStatusUnread', 'Unread'),
    '时间范围': ('alarmMgmtFilterTimeRange', 'Time Range'),
    '开始日期': ('alarmMgmtFilterStartDate', 'Start Date'),
    '结束日期': ('alarmMgmtFilterEndDate', 'End Date'),

    # 按钮
    '查询': ('alarmMgmtBtnQuery', 'Query'),
    '重置': ('alarmMgmtBtnReset', 'Reset'),
    '批量解决': ('alarmMgmtBtnBatchResolve', 'Batch Resolve'),
    '批量标记已读': ('alarmMgmtBtnBatchMarkRead', 'Batch Mark as Read'),
    '导出': ('alarmMgmtBtnExport', 'Export'),

    # 表格列头
    '消息类型': ('alarmMgmtColType', 'Message Type'),
    '消息描述': ('alarmMgmtColDesc', 'Message Description'),
    '操作': ('alarmMgmtColActions', 'Actions'),
    '消息时间': ('alarmMgmtColTime', 'Message Time'),

    # 分页
    '显示': ('alarmMgmtPaginationShowing', 'Showing'),
    '条，共': ('alarmMgmtPaginationOf', 'of'),
    '条': ('alarmMgmtPaginationTotal', 'total'),
    '第': ('alarmMgmtPaginationPage', 'Page'),
    '页': ('alarmMgmtPaginationPageSuffix', ''),

    # 模态框
    '告警详情': ('alarmMgmtModalDetailTitle', 'Alarm Details'),
    '告警ID：': ('alarmMgmtLabelAlarmId', 'Alarm ID:'),
    '告警时间：': ('alarmMgmtLabelAlarmTime', 'Alarm Time:'),
    '站点名称：': ('alarmMgmtLabelSiteName', 'Site Name:'),
    '设备名称：': ('alarmMgmtLabelDeviceName', 'Device Name:'),
    '告警类型：': ('alarmMgmtLabelAlarmType', 'Alarm Type:'),
    '告警级别：': ('alarmMgmtLabelAlarmLevel', 'Alarm Level:'),
    '当前状态：': ('alarmMgmtLabelCurrentStatus', 'Current Status:'),
    '告警描述：': ('alarmMgmtLabelAlarmDesc', 'Alarm Description:'),
    '当前值：': ('alarmMgmtLabelCurrentValue', 'Current Value:'),
    '阈值：': ('alarmMgmtLabelThreshold', 'Threshold:'),
    '处理记录': ('alarmMgmtHandleHistory', 'Handle History'),
    '关闭': ('alarmMgmtBtnClose', 'Close'),

    # 确认弹窗
    '确认删除': ('alarmMgmtConfirmDeleteTitle', 'Confirm Delete'),
    '您确定要删除告警': ('alarmMgmtConfirmDeleteText1', 'Are you sure you want to delete alarm'),
    '吗？此操作无法撤销。': ('alarmMgmtConfirmDeleteText2', '? This action cannot be undone.'),
    '取消': ('alarmMgmtBtnCancel', 'Cancel'),
    '删除': ('alarmMgmtBtnDelete', 'Delete'),

    # 故障修复确认
    '确认故障修复': ('alarmMgmtConfirmFixTitle', 'Confirm Fault Repair'),
    '请确认故障已经修复完成': ('alarmMgmtConfirmFixText', 'Please confirm the fault has been repaired'),
    '确认修复': ('alarmMgmtBtnConfirmFix', 'Confirm Repair'),

    # 告警关闭确认
    '确认关闭告警': ('alarmMgmtConfirmCloseTitle', 'Confirm Close Alarm'),
    '请确认告警情况已经处理完成': ('alarmMgmtConfirmCloseText', 'Please confirm the alarm has been handled'),
    '确认关闭': ('alarmMgmtBtnConfirmClose', 'Confirm Close'),

    # 告警级别
    '严重': ('alarmMgmtLevelCritical', 'Critical'),
    '重要': ('alarmMgmtLevelMajor', 'Major'),
    '一般': ('alarmMgmtLevelMinor', 'Minor'),

    # 状态标签
    '未解决': ('alarmMgmtStatusUnresolved', 'Unresolved'),
    '已解决': ('alarmMgmtStatusResolved', 'Resolved'),
}

# rule-engine.html 的翻译映射
rule_engine_translations = {
    # 页面标题
    '消息策略 - 储能柜管理系统': ('ruleEnginePageTitle', 'Message Strategy - Energy Storage Management System'),
    '消息策略': ('ruleEngineTitle', 'Message Strategy'),
    '管理消息规则和通知策略': ('ruleEngineSubtitle', 'Manage message rules and notification strategies'),

    # 按钮
    '新建规则': ('ruleEngineBtnNewRule', 'New Rule'),
    '批量启用': ('ruleEngineBtnBatchEnable', 'Batch Enable'),
    '批量禁用': ('ruleEngineBtnBatchDisable', 'Batch Disable'),

    # 表格列头
    '规则名称': ('ruleEngineColRuleName', 'Rule Name'),
    '规则描述': ('ruleEngineColDescription', 'Description'),
    '触发条件': ('ruleEngineColCondition', 'Trigger Condition'),
    '通知方式': ('ruleEngineColNotification', 'Notification Method'),
    '启用状态': ('ruleEngineColStatus', 'Status'),
    '最后修改': ('ruleEngineColLastModified', 'Last Modified'),

    # 状态
    '已启用': ('ruleEngineStatusEnabled', 'Enabled'),
    '已禁用': ('ruleEngineStatusDisabled', 'Disabled'),

    # 通知方式
    '邮件': ('ruleEngineNotifyEmail', 'Email'),
    '短信': ('ruleEngineNotifySMS', 'SMS'),
    '微信': ('ruleEngineNotifyWechat', 'WeChat'),
    '钉钉': ('ruleEngineNotifyDingTalk', 'DingTalk'),

    # 模态框
    '编辑规则': ('ruleEngineModalEditTitle', 'Edit Rule'),
    '规则基本信息': ('ruleEngineModalBasicInfo', 'Basic Information'),
    '触发条件设置': ('ruleEngineModalTriggerCondition', 'Trigger Condition'),
    '通知设置': ('ruleEngineModalNotificationSettings', 'Notification Settings'),
    '保存': ('ruleEngineBtnSave', 'Save'),
}

# power-report.html 的翻译映射
power_report_translations = {
    # 页面标题
    '电量报表 - 储能柜管理系统': ('powerReportPageTitle', 'Power Report - Energy Storage Management System'),
    '电量报表': ('powerReportTitle', 'Power Report'),
    '查看和导出电量数据': ('powerReportSubtitle', 'View and export power data'),

    # 筛选器
    '报表类型': ('powerReportFilterType', 'Report Type'),
    '日报': ('powerReportTypDaily', 'Daily'),
    '周报': ('powerReportTypeWeekly', 'Weekly'),
    '月报': ('powerReportTypeMonthly', 'Monthly'),
    '年报': ('powerReportTypeYearly', 'Yearly'),
    '自定义': ('powerReportTypeCustom', 'Custom'),
    '选择日期': ('powerReportSelectDate', 'Select Date'),
    '开始日期': ('powerReportStartDate', 'Start Date'),
    '结束日期': ('powerReportEndDate', 'End Date'),

    # 按钮
    '生成报表': ('powerReportBtnGenerate', 'Generate Report'),
    '导出Excel': ('powerReportBtnExportExcel', 'Export Excel'),
    '导出PDF': ('powerReportBtnExportPDF', 'Export PDF'),

    # 表格列头
    '时间': ('powerReportColTime', 'Time'),
    '站点名称': ('powerReportColSiteName', 'Site Name'),
    '充电量(kWh)': ('powerReportColChargeEnergy', 'Charge Energy (kWh)'),
    '放电量(kWh)': ('powerReportColDischargeEnergy', 'Discharge Energy (kWh)'),
    '净放电量(kWh)': ('powerReportColNetEnergy', 'Net Energy (kWh)'),
    '峰值功率(kW)': ('powerReportColPeakPower', 'Peak Power (kW)'),
    '平均效率(%)': ('powerReportColAvgEfficiency', 'Avg. Efficiency (%)'),

    # 统计卡片
    '总充电量': ('powerReportTotalCharge', 'Total Charge'),
    '总放电量': ('powerReportTotalDischarge', 'Total Discharge'),
    '净电量': ('powerReportNetEnergy', 'Net Energy'),
    '平均效率': ('powerReportAvgEfficiency', 'Average Efficiency'),

    # 图表标题
    '充放电趋势': ('powerReportChartTrend', 'Charge/Discharge Trend'),
    '站点对比': ('powerReportChartComparison', 'Site Comparison'),
    '效率分析': ('powerReportChartEfficiency', 'Efficiency Analysis'),
}

# electricity-price-new.html 的翻译映射
elec_price_translations = {
    # 页面标题
    '电价设置 - 储能柜管理系统': ('elecPricePageTitle', 'Electricity Price Settings - Energy Storage Management System'),
    '电价设置': ('elecPriceTitle', 'Electricity Price Settings'),
    '配置分时电价和峰谷电价': ('elecPriceSubtitle', 'Configure time-of-use and peak-valley pricing'),

    # Tab标签
    '分时电价': ('elecPriceTabTOU', 'Time-of-Use'),
    '季节电价': ('elecPriceTabSeasonal', 'Seasonal'),
    '阶梯电价': ('elecPriceTabTiered', 'Tiered'),

    # 电价类型
    '尖峰电价': ('elecPriceTypePeak', 'Peak'),
    '峰电价': ('elecPriceTypeHigh', 'High'),
    '平电价': ('elecPriceTypeNormal', 'Normal'),
    '谷电价': ('elecPriceTypeValley', 'Valley'),

    # 表单标签
    '电价名称': ('elecPriceFormName', 'Price Name'),
    '适用站点': ('elecPriceFormSite', 'Applicable Site'),
    '生效日期': ('elecPriceFormEffectiveDate', 'Effective Date'),
    '时段设置': ('elecPriceFormTimePeriod', 'Time Period Settings'),
    '开始时间': ('elecPriceFormStartTime', 'Start Time'),
    '结束时间': ('elecPriceFormEndTime', 'End Time'),
    '单价(元/kWh)': ('elecPriceFormUnitPrice', 'Unit Price (CNY/kWh)'),

    # 按钮
    '添加时段': ('elecPriceBtnAddPeriod', 'Add Period'),
    '保存配置': ('elecPriceBtnSaveConfig', 'Save Configuration'),
    '恢复默认': ('elecPriceBtnResetDefault', 'Reset to Default'),
    '导入模板': ('elecPriceBtnImportTemplate', 'Import Template'),

    # 提示信息
    '请选择站点': ('elecPricePlaceholderSite', 'Please select a site'),
    '请输入电价名称': ('elecPricePlaceholderName', 'Please enter price name'),
    '时段不能重叠': ('elecPriceValidationOverlap', 'Time periods cannot overlap'),
    '保存成功': ('elecPriceNotifSaveSuccess', 'Saved successfully'),
}

def add_translations_to_common_js(file_path, all_translations):
    """向common.js添加翻译"""
    print(f"正在更新 {file_path}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 找到中文翻译部分的结束位置
    # 我们需要在最后一个中文翻译项后面添加新的翻译

    # 构建要添加的中文翻译
    zh_additions = []
    en_additions = []

    for text, (key, en_text) in all_translations.items():
        # 检查key是否已存在
        if f"        {key}:" not in content:
            zh_additions.append(f"        {key}: '{text}',")
            en_additions.append(f"        {key}: '{en_text}',")

    if zh_additions:
        print(f"  发现 {len(zh_additions)} 个需要添加的翻译键")

        # 添加中文翻译
        zh_marker = "        menuElectricityPrice: '电价设置',"
        if zh_marker in content:
            zh_insert = "\n\n        // === 新增国际化翻译 ===\n" + "\n".join(zh_additions)
            content = content.replace(zh_marker, zh_marker + zh_insert)

        # 添加英文翻译
        en_marker = "        menuElectricityPrice: 'Electricity Price',"
        if en_marker in content:
            en_insert = "\n\n        // === New i18n Translations ===\n" + "\n".join(en_additions)
            content = content.replace(en_marker, en_marker + en_insert)

        # 保存文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"  ✓ 已添加翻译到 common.js")
    else:
        print("  ✓ 所有翻译键已存在")

# 主函数
def main():
    base_path = r"C:\Users\33765\Desktop\项目集\原型demo\销售工具\销售工具1230\储能柜-客户端-专业版"
    common_js_path = os.path.join(base_path, "common.js")

    # 合并所有翻译
    all_translations = {}
    all_translations.update(alarm_mgmt_translations)
    all_translations.update(rule_engine_translations)
    all_translations.update(power_report_translations)
    all_translations.update(elec_price_translations)

    # 更新common.js
    add_translations_to_common_js(common_js_path, all_translations)

    print("\n翻译键已添加完成!")
    print("\n接下来需要手动修改HTML文件:")
    print("1. alarm-management.html - 添加 data-translate 属性")
    print("2. rule-engine.html - 添加 data-translate 属性")
    print("3. power-report.html - 添加 data-translate 属性")
    print("4. electricity-price-new.html - 添加 data-translate 属性")

if __name__ == "__main__":
    main()
