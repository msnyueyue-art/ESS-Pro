// Cabinet Detail 完整翻译键清单
// 老王整理的cabinet-detail.html所有需要翻译的文本

const cabinetTranslationsZH = {
    // 已完成 - 顶部导航和告警
    cabinetBackBtn: '返回',
    cabinetCurrentAlarm: '当前告警',

    // 已完成 - 组件Tab标签
    cabinetTabOverall: '整机',
    cabinetTabEMS: 'EMS',
    cabinetTabPCS: '逆变器',
    cabinetTabBMS: 'BMS',
    cabinetTabMeter: '电表',
    cabinetTabThermal: '温度',
    cabinetTabFire: '消防',

    // 已完成 - 数据Tab标签
    cabinetDataTabRealtime: '实时数据',
    cabinetDataTabHistory: '历史数据',
    cabinetDataTabControl: '控制',

    // 已完成 - 组件标记
    cabinetMarkerEMS: 'EMS',
    cabinetMarkerPCS: '逆变器',
    cabinetMarkerBMS: 'BMS',
    cabinetMarkerMeter: '电表',
    cabinetMarkerThermal: '温度',
    cabinetMarkerFire: '消防',

    // 已完成 - 状态文本
    cabinetStatusOnline: '在线',
    cabinetStatusOffline: '离线',
    cabinetStatusFault: '异常',
    cabinetStatusCharging: '充电中',
    cabinetStatusDischarging: '放电中',
    cabinetStatusStandby: '待机',

    // 新增 - 实时数据面板标题
    cabinetCoreParamsTitle: '核心运行参数',
    cabinetRunStatsTitle: '运行统计',
    cabinetBtnSettings: '设置',

    // 新增 - 核心参数标签
    cabinetLabelSOC: 'SOC',
    cabinetLabelSOH: 'SOH',
    cabinetLabelTemp: '温度',
    cabinetLabelPower: '充放电功率',
    cabinetLabelBattVoltage: '电池电压',
    cabinetLabelBattCurrent: '电池电流',

    // 新增 - 核心参数状态
    cabinetStatusBatteryGood: '电量充足',
    cabinetStatusHealthGood: '健康状态良好',
    cabinetStatusTempNormal: '温度正常',
    cabinetStatusVoltageStable: '电压稳定',
    cabinetStatusCurrentNormal: '电流正常',

    // 新增 - 运行统计标签
    cabinetLabelTodayCharge: '今日充电量',
    cabinetLabelTodayDischarge: '今日放电量',
    cabinetLabelChargeCost: '充电成本',
    cabinetLabelDischargeRevenue: '放电收益',

    // 新增 - 策略调度参数
    cabinetStrategyParamsTitle: '策略调度参数',
    cabinetCurrentStrategy: '当前策略',
    cabinetStrategyPeakValley: '峰谷套利',
    cabinetStrategyAutoRunning: '自动执行中',
    cabinetScheduleCmd: '调度指令',
    cabinetCmdCharge: '充电',
    cabinetCmdDischarge: '放电',
    cabinetTargetPower: '目标功率',
    cabinetTargetSOC: '目标SOC',
    cabinetMaxPower: '最大功率',

    // 新增 - 控制面板
    cabinetControlRequirements: '控制要求',
    cabinetControlModeAuto: '自动模式',
    cabinetControlModeManual: '手动模式',
    cabinetAutoControlDesc: '系统根据下方时间轴自动控制充放电',
    cabinetBatteryParamsSettings: '电池参数设置',
    cabinetBalanceControl: '均衡控制',
    cabinetFanControl: '风扇控制',
    cabinetFireControl: '消防控制',
    cabinetVentControl: '通风控制',
    cabinetAutoControl: '自动控制',

    // 新增 - 按钮文本
    cabinetBtnSave: '保存',
    cabinetBtnCancel: '取消',
    cabinetBtnConfirm: '确认',
    cabinetBtnReset: '重置',
    cabinetBtnApply: '应用',
    cabinetBtnEdit: '编辑',

    // 新增 - 字段设置模态框
    cabinetFieldSettingsTitle: '字段显示设置',
    cabinetFieldSettingsSave: '保存设置',
    cabinetFieldSettingsReset: '重置为默认',
    cabinetFieldSettingsClose: '关闭',

    // 新增 - 通用文本
    cabinetUnitKW: 'kW',
    cabinetUnitKWh: 'kWh',
    cabinetUnitPercent: '%',
    cabinetUnitCelsius: '°C',
    cabinetUnitVolt: 'V',
    cabinetUnitAmpere: 'A',
};

const cabinetTranslationsEN = {
    // 已完成 - 顶部导航和告警
    cabinetBackBtn: 'Back',
    cabinetCurrentAlarm: 'Current Alarms',

    // 已完成 - 组件Tab标签
    cabinetTabOverall: 'Overall',
    cabinetTabEMS: 'EMS',
    cabinetTabPCS: 'Inverter',
    cabinetTabBMS: 'BMS',
    cabinetTabMeter: 'Meter',
    cabinetTabThermal: 'Thermal',
    cabinetTabFire: 'Fire',

    // 已完成 - 数据Tab标签
    cabinetDataTabRealtime: 'Realtime Data',
    cabinetDataTabHistory: 'History Data',
    cabinetDataTabControl: 'Control',

    // 已完成 - 组件标记
    cabinetMarkerEMS: 'EMS',
    cabinetMarkerPCS: 'Inverter',
    cabinetMarkerBMS: 'BMS',
    cabinetMarkerMeter: 'Meter',
    cabinetMarkerThermal: 'Thermal',
    cabinetMarkerFire: 'Fire',

    // 已完成 - 状态文本
    cabinetStatusOnline: 'Online',
    cabinetStatusOffline: 'Offline',
    cabinetStatusFault: 'Fault',
    cabinetStatusCharging: 'Charging',
    cabinetStatusDischarging: 'Discharging',
    cabinetStatusStandby: 'Standby',

    // 新增 - 实时数据面板标题
    cabinetCoreParamsTitle: 'Core Parameters',
    cabinetRunStatsTitle: 'Operation Statistics',
    cabinetBtnSettings: 'Settings',

    // 新增 - 核心参数标签
    cabinetLabelSOC: 'SOC',
    cabinetLabelSOH: 'SOH',
    cabinetLabelTemp: 'Temperature',
    cabinetLabelPower: 'Charge/Discharge Power',
    cabinetLabelBattVoltage: 'Battery Voltage',
    cabinetLabelBattCurrent: 'Battery Current',

    // 新增 - 核心参数状态
    cabinetStatusBatteryGood: 'Battery Sufficient',
    cabinetStatusHealthGood: 'Health Good',
    cabinetStatusTempNormal: 'Temperature Normal',
    cabinetStatusVoltageStable: 'Voltage Stable',
    cabinetStatusCurrentNormal: 'Current Normal',

    // 新增 - 运行统计标签
    cabinetLabelTodayCharge: 'Today Charge',
    cabinetLabelTodayDischarge: 'Today Discharge',
    cabinetLabelChargeCost: 'Charge Cost',
    cabinetLabelDischargeRevenue: 'Discharge Revenue',

    // 新增 - 策略调度参数
    cabinetStrategyParamsTitle: 'Strategy Parameters',
    cabinetCurrentStrategy: 'Current Strategy',
    cabinetStrategyPeakValley: 'Peak-Valley Arbitrage',
    cabinetStrategyAutoRunning: 'Auto Running',
    cabinetScheduleCmd: 'Schedule Command',
    cabinetCmdCharge: 'Charge',
    cabinetCmdDischarge: 'Discharge',
    cabinetTargetPower: 'Target Power',
    cabinetTargetSOC: 'Target SOC',
    cabinetMaxPower: 'Max Power',

    // 新增 - 控制面板
    cabinetControlRequirements: 'Control Requirements',
    cabinetControlModeAuto: 'Auto Mode',
    cabinetControlModeManual: 'Manual Mode',
    cabinetAutoControlDesc: 'System automatically controls charge/discharge based on timeline below',
    cabinetBatteryParamsSettings: 'Battery Parameter Settings',
    cabinetBalanceControl: 'Balance Control',
    cabinetFanControl: 'Fan Control',
    cabinetFireControl: 'Fire Control',
    cabinetVentControl: 'Ventilation Control',
    cabinetAutoControl: 'Auto Control',

    // 新增 - 按钮文本
    cabinetBtnSave: 'Save',
    cabinetBtnCancel: 'Cancel',
    cabinetBtnConfirm: 'Confirm',
    cabinetBtnReset: 'Reset',
    cabinetBtnApply: 'Apply',
    cabinetBtnEdit: 'Edit',

    // 新增 - 字段设置模态框
    cabinetFieldSettingsTitle: 'Field Display Settings',
    cabinetFieldSettingsSave: 'Save Settings',
    cabinetFieldSettingsReset: 'Reset to Default',
    cabinetFieldSettingsClose: 'Close',

    // 新增 - 通用文本
    cabinetUnitKW: 'kW',
    cabinetUnitKWh: 'kWh',
    cabinetUnitPercent: '%',
    cabinetUnitCelsius: '°C',
    cabinetUnitVolt: 'V',
    cabinetUnitAmpere: 'A',
};

// 老王整理的总计：
// 已添加翻译键：24个
// 新增翻译键：60个
// 总计：84个翻译键
