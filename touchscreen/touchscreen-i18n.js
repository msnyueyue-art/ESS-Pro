/**
 * 触摸屏系统国际化翻译文件
 * 统一管理所有页面的中英文翻译
 */

const touchscreenTranslations = {
    zh: {
        // ========== 通用 ==========
        systemTitle: '储能柜管理系统',
        systemName: '储能柜管理系统',
        confirmBtn: '确认',
        cancelBtn: '取消',
        closeBtn: '关闭',
        saveBtn: '保存',
        deleteBtn: '删除',
        editBtn: '编辑',
        addBtn: '添加',
        searchBtn: '搜索',
        resetBtn: '重置',
        submitBtn: '提交',
        backBtn: '返回',
        nextBtn: '下一步',
        prevBtn: '上一步',
        loading: '',
        noData: '暂无数据',
        error: '错误',
        success: '成功',
        warning: '警告',
        info: '提示',

        // ========== 导航菜单 ==========
        navHome: '首页',
        navData: '数据',
        navHistory: '历史',
        navControl: '控制',
        navAlarm: '告警',
        navLog: '日志',
        navSettings: '设置',

        // ========== 登录页 ==========
        loginTitle: '储能柜管理系统',
        loginSubtitle: '请登录您的账户',
        username: '用户名',
        password: '密码',
        login: '登录',
        logout: '退出登录',
        usernamePlaceholder: '请输入用户名',
        passwordPlaceholder: '请输入密码',
        rememberMe: '记住我',
        forgotPassword: '忘记密码？',

        // ========== 退出登录 ==========
        logoutTitle: '确认退出',
        logoutMessage: '您确定要退出登录吗？',
        logoutCancel: '取消',
        logoutConfirm: '确认退出',

        // ========== 首页 ==========
        homeTitle: '系统概览',
        realTimeData: '实时数据',
        energyFlow: '能量流向',
        systemStatus: '系统状态',
        todayStats: '今日统计',
        homeRunningDays: '运行天数',
        homeSystemPower: '系统功率',
        homeTodayCharge: '今日充电',
        homeTodayDischarge: '今日放电',
        homeTotalCharge: '累计充电',
        homeTotalDischarge: '累计放电',

        // 实时数据卡片
        totalPower: '总功率',
        totalEnergy: '总电量',
        gridPower: '电网功率',
        pvPower: '光伏功率',
        batteryPower: '电池功率',
        loadPower: '负载功率',
        soc: 'SOC',
        voltage: '电压',
        current: '电流',
        temperature: '温度',
        meter: '电表',
        fire_protection: '消防',

        // 状态
        statusOnline: '在线',
        statusOffline: '离线',
        statusCharging: '充电中',
        statusDischarging: '放电中',
        statusStandby: '待机',
        statusFault: '故障',
        statusNormal: '正常',
        statusError: '异常',

        // 单位
        unitKW: 'kW',
        unitKWh: 'kWh',
        unitV: 'V',
        unitA: 'A',
        unitC: '℃',
        unitPercent: '%',
        unitDay: '天',
        unitTimes: '次',

        // ========== 数据页 ==========
        dataTitle: '数据监控',
        realtimeData: '实时数据',
        historicalData: '历史数据',
        dataChart: '数据图表',
        dataTable: '数据表格',
        dataExport: '数据导出',
        otaUpgrade: 'OTA升级',
        otaTitle: 'OTA 固件升级',
        currentVersion: '当前版本：',
        latestVersion: '最新版本：',
        upgradeProgress: '升级进度',
        preparingUpgrade: '准备升级...',
        downloadingFirmware: '下载固件...',
        verifyingFirmware: '校验固件...',
        installingUpdate: '安装更新...',
        restartingDevice: '重启设备...',
        upgradeComplete: '升级完成！',
        upgradeSuccessMessage: '固件升级成功！系统将在3秒后重启...',
        startUpgrade: '开始升级',
        cancel: '取消',
        timeRange: '时间范围',
        selectTimeRange: '选择时间范围',
        today: '今日',
        yesterday: '昨日',
        lastWeek: '近一周',
        lastMonth: '近一月',
        custom: '自定义',
        startTime: '开始时间',
        endTime: '结束时间',
        day: '日',
        month: '月',
        year: '年',
        total: '合计',

        // 字段设置对话框
        dataDisplaySettings: '数据显示设置',

        // 数据项
        powerData: '功率数据',
        energyData: '电量数据',
        voltageData: '电压数据',
        currentData: '电流数据',
        temperatureData: '温度数据',
        socData: 'SOC数据',

        // 数据页面章节标题
        strategyParams: '策略调度参数',
        coreParams: '核心运行参数',
        operationStats: '运行统计',
        otherParams: '其他参数',

        // 运行统计字段
        todayCharge: '今日充电量',
        todayDischarge: '今日放电量',
        totalCharge: '累计充电量',
        totalDischarge: '累计放电量',
        cycleCount: '循环次数',
        lifespanStatus: '寿命正常',

        // 图表标签
        powerLabel: '功率',
        energyLabel: '电量',
        revenueLabel: '收益',
        maxPowerLabel: '最大功率',

        // EMS状态文本
        signalGood: '信号良好',
        simInserted: '已插入',
        statusOn: '开',
        statusOff: '关',
        moreDataDeveloping: '更多数据开发中...',

        // 时间单位
        days: '天',
        hours: '小时',
        minutes: '分',

        // PCS相关
        pcsGridSideParams: 'PCS电网侧参数',
        pcsGridVoltage: 'PCS电网侧电压',
        pcsGridCurrent: 'PCS电网侧电流',
        pcsGridPower: 'PCS电网侧功率',
        pcsTemperature: 'PCS温度',
        pcsPowerConversionHistory: 'PCS功率转换历史',
        voltageCurrentTrend: '电压电流趋势',
        conversionEfficiencyAnalysis: '转换效率分析',
        acPowerOutput: 'AC功率输出',
        dcPowerInput: 'DC功率输入',
        conversionEfficiency: '转换效率',
        'DC电压': 'DC电压',
        'DC电流': 'DC电流',
        '电压': '电压',
        '电流': '电流',
        '效率': '效率',
        '温度': '温度',
        'A相': 'A相',
        'B相': 'B相',
        'C相': 'C相',
        '日': '日',
        '月': '月',
        '年': '年',
        '合计': '合计',

        // BMS相关
        '核心指标': '核心指标',
        '电池总电压': '电池总电压',
        '电池总电流': '电池总电流',
        '电池功率': '电池功率',
        '循环次数': '循环次数',
        '运行统计': '运行统计',
        '日充电量': '日充电量',
        '日放电量': '日放电量',
        '累计充电量': '累计充电量',
        '累计放电量': '累计放电量',
        'Pack电池簇信息': 'Pack电池簇信息',
        '电池性能趋势': '电池性能趋势',
        '循环寿命统计': '循环寿命统计',
        '容量衰减分析': '容量衰减分析',
        '电池电压历史': '电池电压历史',
        '电池SOC趋势': '电池SOC趋势',
        '温度分布分析': '温度分布分析',
        '最高温度': '最高温度',
        '平均温度': '平均温度',
        '最低温度': '最低温度',
        'SOC趋势': 'SOC趋势',
        '电压稳定': '电压稳定',
        '电流稳定': '电流稳定',
        '功率稳定': '功率稳定',
        '正常': '正常',
        '最高电压': '最高电压',
        '平均电压': '平均电压',
        '最低电压': '最低电压',

        // ========== 历史页 ==========
        historyTitle: '历史记录',
        historyData: '历史数据',
        powerTrendAnalysis: '功率趋势分析',
        revenueAnalysis: '收益分析',
        selectDate: '选择日期',
        historyAlarm: '历史告警',
        historyOperation: '操作记录',
        historyExport: '导出历史',
        filterByDate: '按日期筛选',
        filterByType: '按类型筛选',
        allTypes: '全部类型',

        // ========== 控制页 ==========
        controlTitle: '设备控制',
        manualControl: '手动控制',
        autoControl: '自动控制',
        controlMode: '控制模式',
        operationMode: '运行模式',
        chargeMode: '充电模式',
        dischargeMode: '放电模式',
        standbyMode: '待机模式',
        startCharge: '开始充电',
        startDischarge: '开始放电',
        stopOperation: '停止运行',
        setPower: '设置功率',
        setTarget: '设置目标',
        powerLimit: '功率限制',
        energyTarget: '电量目标',
        controlConfirm: '确认执行此操作？',
        controlSuccess: '控制指令已发送',
        controlFailed: '控制指令发送失败',

                deviceControl: '设备控制',
        edit: '编辑',
        save: '保存',
        cancel: '取消',
        operationModeControl: '运行模式控制',
        operationMode: '运行模式',
        autoMode: '自动模式',
        manualMode: '手动模式',
        charging: '充电',
        discharging: '放电',
        autoControlDesc: '系统根据下方时间轴自动控制充放电',
        peakValleyPeriod: '峰谷电价时段',
        peakPeriod: '峰值时段',
        valleyPeriod: '谷值时段',
        normalPeriod: '平价时段',
        batteryParameterSettings: '电池参数设置',
        chargeStopSOC: '充电停止SOC',
        chargePower: '充电功率',
        dischargeStopSOC: '放电停止SOC',
        dischargePower: '放电功率',
        balanceControl: '均衡控制',
        activeBalance: '主动均衡',
        passiveBalance: '被动均衡',
        fanControl: '风扇控制',
        auto: '自动',
        on: '开启',
        off: '关闭',
        temperatureProtection: '温度保护',
        fireControl: '消防控制',
        fireExtinguisherStart: '灭火启动',
        autoStart: '自动启动',
        manualStart: '手动启动',
        disabled: '禁用',
        extinguisherType: '灭火剂类型',
        perfluorohexanone: '全氟己酮',
        heptafluoropropane: '七氟丙烷',
        ig541MixedGas: 'IG541混合气体',
        carbonDioxide: '二氧化碳',
        audioVisualAlarm: '声光报警',
        enabled: '启用',
        testMode: '测试模式',
        ventilationControl: '通风控制',
        autoControl: '自动控制',
        forceOn: '强制开启',
        forceOff: '强制关闭',
        emergencyPowerOff: '紧急断电',
        manual: '手动',

        // 控制模式
        modeManual: '手动模式',
        modeAuto: '自动模式',
        modeSchedule: '定时模式',
        modePeak: '削峰填谷',
        modeEconomy: '经济模式',

        // ========== 告警页 ==========
        alarmTitle: '告警信息',
        currentAlarm: '当前告警',
        alarmHistory: '告警历史',
        alarmLevel: '告警级别',
        alarmType: '告警类型',
        alarmTime: '告警时间',
        alarmSource: '告警源',
        alarmMessage: '告警信息',
        alarmStatus: '告警状态',
        alarmHandle: '处理告警',
        alarmConfirm: '确认告警',
        alarmIgnore: '忽略告警',
        alarmResolved: '已解决',
        alarmPending: '待处理',

        // 告警级别
        levelCritical: '严重',
        levelMajor: '重要',
        levelMinor: '次要',
        levelWarning: '警告',
        levelInfo: '信息',

        // 告警类型
        alarmTypeOverVoltage: '过压',
        alarmTypeUnderVoltage: '欠压',
        alarmTypeOverCurrent: '过流',
        alarmTypeOverTemp: '过温',
        alarmTypeCommunication: '通信故障',
        alarmTypeBattery: '电池故障',
        alarmTypeSystem: '系统故障',

        // ========== 日志页 ==========
        logTitle: '系统日志',
        operationLog: '操作日志',
        systemLog: '系统日志',
        alarmLog: '告警日志',
        alarmList: '告警列表',
        alarmDescription: '告警描述',
        batchResolve: '批量解决',
        detail: '详情',
        resolve: '解决',
        level: '级别',
        actions: '操作',
        alarmDetail: '告警详情',
        operationConfirm: '操作确认',
        confirmExecute: '您确定要执行此操作吗？',
        resolved: '已解决',
        currentValue: '当前值',
        threshold: '阈值',
        resolveTime: '解决时间',
        batchResolveConfirm: '您确定要解决选中的 {count} 个告警吗？此操作不可撤销。',
        resolveAlarmConfirm: '您确定要解决告警"{type}"吗？此操作不可撤销。',
        eventLog: '事件日志',
        logTime: '时间',
        logType: '类型',
        logUser: '用户',
        logOperation: '操作',
        logResult: '结果',
        logDetail: '详情',
        logExport: '导出日志',
        logClear: '清空日志',

        // 日志类型
        logTypeLogin: '登录',
        logTypeLogout: '退出',
        logTypeControl: '控制',
        logTypeSetting: '设置',
        logTypeAlarm: '告警',
        logTypeSystem: '系统',

        // 日志页面专用
        loginLog: '登录日志',
        operationLogTab: '操作日志',
        username: '用户名',
        operation: '操作',
        ipAddress: 'IP地址',
        result: '结果',
        time: '时间',
        action: '操作',
        detailBtn: '详情',

        // 日志详情弹框
        logDetailTitle: '日志详情',
        timeLabel: '时间:',
        userLabel: '用户:',
        operationLabel: '操作:',
        detailDescription: '详细描述:',
        ipLabel: 'IP地址:',
        resultLabel: '执行结果:',
        logLevelLabel: '日志级别:',
        sessionIdLabel: '会话标识:',
        durationLabel: '登录耗时:',
        operationTypeLabel: '操作分类:',
        targetDeviceLabel: '目标设备:',
        browserLabel: '浏览器:',

        // 日志结果状态
        successResult: '成功',
        failResult: '失败',

        // 日志级别
        infoLevel: '信息',
        successLevel: '成功',
        warningLevel: '警告',
        errorLevel: '错误',


        // ========== 设置页 ==========
        settingsTitle: '系统设置',
        settingsMenuTitle: '设置菜单',
        accountSettings: '账号设置',
        securitySettings: '安全设置',
        systemConfig: '系统配置',
        electricityPrice: '电价设置',

        // 账号设置
        accountInfo: '账户信息',
        systemLoginAccount: '系统登录账号',
        changePassword: '修改密码',
        currentPassword: '当前密码',
        newPassword: '新密码',
        confirmPassword: '确认密码',
        currentPasswordPlaceholder: '请输入当前密码',
        newPasswordPlaceholder: '请输入新密码',
        confirmPasswordPlaceholder: '请确认新密码',

        // 安全设置
        loginSecurity: '登录安全',
        autoLock: '自动锁定',
        autoLockDesc: '系统无操作自动锁定',
        lockTimeout: '锁定时间',
        lockTimeoutDesc: '无操作多长时间后自动锁定',

        // 系统配置
        systemSettings: '系统设置',
        dataRefreshInterval: '数据刷新间隔',
        dataRefreshIntervalDesc: '实时数据刷新频率',
        notificationSettings: '通知设置',
        alarmNotification: '告警通知',
        alarmNotificationDesc: '接收设备告警通知',
        soundAlert: '声音提醒',
        
        // 时间单位
        oneSecond: '1秒',
        threeSeconds: '3秒',
        fiveSeconds: '5秒',
        tenSeconds: '10秒',
        fiveMinutes: '5分钟',
        tenMinutes: '10分钟',
        fifteenMinutes: '15分钟',
        thirtyMinutes: '30分钟',
        oneHour: '1小时',
        never: '永不',
        soundAlertDesc: '播放提示音',

        // 电价设置
        currentPricePlan: '当前电价方案',
        noPricePlan: '未设置电价方案',
        peakTime: '峰时',
        normalTime: '平时',
        valleyTime: '谷时',
        quickConfig: '快速配置',
        applyTemplate: '套用模板',
        customConfig: '自定义配置',
        timeSlotConfig: '时段配置',
        timeSlot24h: '24小时时段划分',
        timeSlotHint: '点击时段切换类型,拖动边界调整时间',
        currentPeriodConfig: '当前时段配置',
        addPeriod: '添加时段',
        resetToDefault: '恢复默认',
        savePlan: '保存方案',
        selectPriceTemplate: '选择电价模板',
        defaultPeakValley: '默认峰谷电价',
        priceUnit: '元/kWh',
        jiangsuIndustrial: '江苏省工业峰谷电价',
        shanghaiCommercial: '上海市工商业电价',
        zhejiangIndustrial: '浙江省工业峰谷电价',
        guangdongIndustrial: '广东省工业峰谷电价',
        priceRangeError: '电价必须在0-10元/kWh之间',

        basicSettings: '基本设置',
        networkSettings: '网络设置',
        alarmSettings: '告警设置',
        displaySettings: '显示设置',
        timeSettings: '时间设置',

        // 基本设置
        deviceName: '设备名称',
        deviceLocation: '设备位置',
        deviceCapacity: '设备容量',
        installedDate: '安装日期',

        // 系统配置
        language: '语言',
        theme: '主题',
        timezone: '时区',
        dateFormat: '日期格式',
        timeFormat: '时间格式',

        // 网络设置
        ipAddress: 'IP地址',
        subnetMask: '子网掩码',
        gateway: '网关',
        dnsServer: 'DNS服务器',

        // 告警设置
        enableAlarm: '启用告警',
        alarmSound: '告警声音',
        alarmEmail: '告警邮件',
        alarmThreshold: '告警阈值',

        // 显示设置
        brightness: '亮度',
        screenTimeout: '屏幕超时',
        showAnimation: '显示动画',
        autoRefresh: '自动刷新',
        refreshInterval: '刷新间隔',

        // ========== 其他 ==========
        selectAll: '全选',
        deselectAll: '取消全选',
        delete: '删除',
        deleteSelected: '删除选中',
        deleteConfirm: '确认删除？',
        operationSuccess: '操作成功',
        operationFailed: '操作失败',
        enteredEditMode: '已进入编辑模式',
        savingSettings: '正在保存设置...',
        saveSuccess: '保存成功',
        settingsSaveSuccess: '设置保存成功',
        saveFailed: '保存失败',
        templateAppliedSuccess: '模板应用成功',
        addPeriodInDevelopment: '添加时段功能开发中...',

        // ========== 日历相关 ==========
        calendarMonthJan: '一月',
        calendarMonthFeb: '二月',
        calendarMonthMar: '三月',
        calendarMonthApr: '四月',
        calendarMonthMay: '五月',
        calendarMonthJun: '六月',
        calendarMonthJul: '七月',
        calendarMonthAug: '八月',
        calendarMonthSep: '九月',
        calendarMonthOct: '十月',
        calendarMonthNov: '十一月',
        calendarMonthDec: '十二月',
        calendarWeekdaySun: '日',
        calendarWeekdayMon: '一',
        calendarWeekdayTue: '二',
        calendarWeekdayWed: '三',
        calendarWeekdayThu: '四',
        calendarWeekdayFri: '五',
        calendarWeekdaySat: '六',
        calendarToday: '今天',
        calendarCancel: '取消',

        networkError: '网络错误',
        serverError: '服务器错误',
        permissionDenied: '权限不足',
        invalidInput: '输入无效',
        requiredField: '必填项',
        // ========== 设备名称 ==========
        deviceEMS: 'EMS',
        devicePCS: 'PCS',
        deviceBMS: 'BMS',

        // ========== 分页相关 ==========
        showing: '第',
        to: '-',
        of: '条，共',
        records: '条记录',
        previousPage: '上一页',
        nextPage: '下一页',
        page: '第',
        pages: '页，共',
        totalPages: '页',

        // ========== 告警状态 ==========
        unresolved: '未解决',
        levelGeneral: '一般',
        levelSerious: '严重',
        levelImportant: '重要',

        // ========== 告警操作消息 ==========
        batchResolveTitle: '批量解决告警',
        resolveAlarmTitle: '解决告警',
        resolveAlarmMessage: '您确定要解决告警"{type}"吗？此操作不可撤销。',
        cannotUndo: '此操作不可撤销',
        resolveSuccess: '告警已解决',
        batchResolveSuccess: '成功解决 {count} 个告警',
        resolveAlarmButton: '解决告警',
        unresolvedStatus: '未解决',
        resolveTimeLabel: '消警时间',
        deviceMeter: '电表',
        deviceTemp: '温度',
        deviceFire: '消防',
        deviceOverall: '整机',

        // ========== 设备状态 ==========
        deviceStatusNormal: '正常',
        deviceStatusError: '异常',
        deviceStatusOffline: '离线',
        deviceStatusWarning: '告警',
    },

    en: {
        // ========== Common ==========
        systemName: 'Energy Storage System',
        systemTitle: 'Energy Storage System',
        confirmBtn: 'Confirm',
        cancelBtn: 'Cancel',
        closeBtn: 'Close',
        saveBtn: 'Save',
        deleteBtn: 'Delete',
        editBtn: 'Edit',
        addBtn: 'Add',
        searchBtn: 'Search',
        resetBtn: 'Reset',
        submitBtn: 'Submit',
        backBtn: 'Back',
        nextBtn: 'Next',
        prevBtn: 'Previous',
        loading: '',
        noData: 'No Data',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',

        // ========== Navigation ==========
        navHome: 'Home',
        navData: 'Data',
        navHistory: 'History',
        navControl: 'Control',
        navAlarm: 'Alarm',
        navLog: 'Log',
        navSettings: 'Settings',

        // ========== Login ==========
        loginTitle: 'Energy Storage Cabinet System',
        loginSubtitle: 'Please login to your account',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        logout: 'Logout',
        usernamePlaceholder: 'Enter your username',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',

        // ========== Logout ==========
        logoutTitle: 'Confirm Logout',
        logoutMessage: 'Are you sure you want to logout?',
        logoutCancel: 'Cancel',
        logoutConfirm: 'Confirm Logout',

        // ========== Home ==========
        homeTitle: 'System Overview',
        realTimeData: 'Real-time Data',
        energyFlow: 'Energy Flow',
        systemStatus: 'System Status',
        todayStats: 'Today Statistics',
        homeRunningDays: 'Running Days',
        homeSystemPower: 'System Power',
        homeTodayCharge: 'Today Charge',
        homeTodayDischarge: 'Today Discharge',
        homeTotalCharge: 'Total Charge',
        homeTotalDischarge: 'Total Discharge',

        // Real-time data cards
        totalPower: 'Total Power',
        totalEnergy: 'Total Energy',
        gridPower: 'Grid Power',
        pvPower: 'PV Power',
        batteryPower: 'Battery Power',
        loadPower: 'Load Power',
        soc: 'SOC',
        voltage: 'Voltage',
        current: 'Current',
        temperature: 'Temperature',
        meter: 'Meter',
        fire_protection: 'Fire Protection',

        // Status
        statusOnline: 'Online',
        statusOffline: 'Offline',
        statusCharging: 'Charging',
        statusDischarging: 'Discharging',
        statusStandby: 'Standby',
        statusFault: 'Fault',
        statusNormal: 'Normal',
        statusError: 'Error',

        // Units
        unitKW: 'kW',
        unitKWh: 'kWh',
        unitV: 'V',
        unitA: 'A',
        unitC: '℃',
        unitPercent: '%',
        unitDay: 'Day',
        unitTimes: 'Times',

        // ========== Data ==========
        dataTitle: 'Data Monitoring',
        realtimeData: 'Real-time Data',
        historicalData: 'Historical Data',
        dataChart: 'Data Chart',
        dataTable: 'Data Table',
        dataExport: 'Export Data',
        otaUpgrade: 'OTA Upgrade',
        otaTitle: 'OTA Firmware Upgrade',
        currentVersion: 'Current Version:',
        latestVersion: 'Latest Version:',
        upgradeProgress: 'Upgrade Progress',
        preparingUpgrade: 'Preparing to upgrade...',
        downloadingFirmware: 'Downloading firmware...',
        verifyingFirmware: 'Verifying firmware...',
        installingUpdate: 'Installing update...',
        restartingDevice: 'Restarting device...',
        upgradeComplete: 'Upgrade complete!',
        upgradeSuccessMessage: 'Firmware upgrade successful! System will restart in 3 seconds...',
        startUpgrade: 'Start Upgrade',
        cancel: 'Cancel',
        timeRange: 'Time Range',
        selectTimeRange: 'Select Time Range',
        today: 'Today',
        yesterday: 'Yesterday',
        lastWeek: 'Last Week',
        lastMonth: 'Last Month',
        custom: 'Custom',
        startTime: 'Start Time',
        endTime: 'End Time',
        day: 'Day',
        month: 'Month',
        year: 'Year',
        total: 'Total',

        // Field Settings Dialog
        dataDisplaySettings: 'Field Settings',

        // Data items
        powerData: 'Power Data',
        energyData: 'Energy Data',
        voltageData: 'Voltage Data',
        currentData: 'Current Data',
        temperatureData: 'Temperature Data',
        socData: 'SOC Data',

        // Data page section titles
        strategyParams: 'Strategy Parameters',
        coreParams: 'Core Operation Parameters',
        operationStats: 'Operation Statistics',
        otherParams: 'Other Parameters',

        // Operation statistics fields
        todayCharge: "Today's Charge",
        todayDischarge: "Today's Discharge",
        totalCharge: 'Total Charge',
        totalDischarge: 'Total Discharge',
        cycleCount: 'Cycle Count',
        lifespanStatus: 'Lifespan Normal',

        // Chart labels
        powerLabel: 'Power',
        energyLabel: 'Energy',
        revenueLabel: 'Revenue',
        maxPowerLabel: 'Max Power',

        // EMS status text
        signalGood: 'Good Signal',
        simInserted: 'Inserted',
        statusOn: 'ON',
        statusOff: 'OFF',
        moreDataDeveloping: 'More data in development...',

        // Time units
        days: 'Days',
        hours: 'Hours',
        minutes: 'Min',

        // PCS related
        pcsGridSideParams: 'PCS Grid Side Parameters',
        pcsGridVoltage: 'PCS Grid Voltage',
        pcsGridCurrent: 'PCS Grid Current',
        pcsGridPower: 'PCS Grid Power',
        pcsTemperature: 'PCS Temperature',
        pcsPowerConversionHistory: 'PCS Power Conversion History',
        voltageCurrentTrend: 'Voltage & Current Trend',
        conversionEfficiencyAnalysis: 'Conversion Efficiency Analysis',
        acPowerOutput: 'AC Power Output',
        dcPowerInput: 'DC Power Input',
        conversionEfficiency: 'Conversion Efficiency',
        'DC电压': 'DC Voltage',
        'DC电流': 'DC Current',
        '电压': 'Voltage',
        '电流': 'Current',
        '效率': 'Efficiency',
        '温度': 'Temperature',
        'A相': 'Phase A',
        'B相': 'Phase B',
        'C相': 'Phase C',
        '日': 'Day',
        '月': 'Month',
        '年': 'Year',
        '合计': 'Total',

        // BMS related
        '核心指标': 'Core Indicators',
        '电池总电压': 'Total Battery Voltage',
        '电池总电流': 'Total Battery Current',
        '电池功率': 'Battery Power',
        '循环次数': 'Cycle Count',
        '运行统计': 'Operation Statistics',
        '日充电量': 'Daily Charge',
        '日放电量': 'Daily Discharge',
        '累计充电量': 'Total Charge',
        '累计放电量': 'Total Discharge',
        'Pack电池簇信息': 'Pack Battery Cluster Info',
        '电池性能趋势': 'Battery Performance Trend',
        '循环寿命统计': 'Cycle Lifespan Statistics',
        '容量衰减分析': 'Capacity Degradation Analysis',
        '电池电压历史': 'Battery Voltage History',
        '电池SOC趋势': 'Battery SOC Trend',
        '温度分布分析': 'Temperature Distribution Analysis',
        '最高温度': 'Max Temperature',
        '平均温度': 'Avg Temperature',
        '最低温度': 'Min Temperature',
        'SOC趋势': 'SOC Trend',
        '电压稳定': 'Voltage Stable',
        '电流稳定': 'Current Stable',
        '功率稳定': 'Power Stable',
        '正常': 'Normal',
        '最高电压': 'Max Voltage',
        '平均电压': 'Avg Voltage',
        '最低电压': 'Min Voltage',
        '图表': 'Charts',

        // ========== History ==========
        historyTitle: 'History',
        historyData: 'Historical Data',
        powerTrendAnalysis: 'Power Trend Analysis',
        revenueAnalysis: 'Revenue Analysis',
        selectDate: 'Select Date',
        historyAlarm: 'Alarm History',
        historyOperation: 'Operation History',
        historyExport: 'Export History',
        filterByDate: 'Filter by Date',
        filterByType: 'Filter by Type',
        allTypes: 'All Types',

        // ========== Control ==========
        controlTitle: 'Device Control',
        deviceControl: 'Device Control',
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
        operationModeControl: 'Operation Mode Control',
        operationMode: 'Operation Mode',
        autoMode: 'Auto Mode',
        manualMode: 'Manual Mode',
        charging: 'Charging',
        discharging: 'Discharging',
        autoControlDesc: 'System automatically controls charging/discharging based on the timeline below',
        peakValleyPeriod: 'Peak-Valley Electricity Price Period',
        peakPeriod: 'Peak Period',
        valleyPeriod: 'Valley Period',
        normalPeriod: 'Normal Period',
        batteryParameterSettings: 'Battery Parameter Settings',
        chargeStopSOC: 'Charge Stop SOC',
        chargePower: 'Charge Power',
        dischargeStopSOC: 'Discharge Stop SOC',
        dischargePower: 'Discharge Power',
        balanceControl: 'Balance Control',
        activeBalance: 'Active Balance',
        passiveBalance: 'Passive Balance',
        fanControl: 'Fan Control',
        auto: 'Auto',
        on: 'On',
        off: 'Off',
        temperatureProtection: 'Temperature Protection',
        fireControl: 'Fire Control',
        fireExtinguisherStart: 'Fire Extinguisher Start',
        autoStart: 'Auto Start',
        manualStart: 'Manual Start',
        disabled: 'Disabled',
        extinguisherType: 'Extinguisher Type',
        perfluorohexanone: 'Perfluorohexanone',
        heptafluoropropane: 'Heptafluoropropane',
        ig541MixedGas: 'IG541 Mixed Gas',
        carbonDioxide: 'Carbon Dioxide',
        audioVisualAlarm: 'Audio-Visual Alarm',
        enabled: 'Enabled',
        testMode: 'Test Mode',
        ventilationControl: 'Ventilation Control',
        autoControl: 'Auto Control',
        forceOn: 'Force On',
        forceOff: 'Force Off',
        emergencyPowerOff: 'Emergency Power Off',
        manual: 'Manual',
        manualControl: 'Manual Control',
        autoControl: 'Auto Control',
        controlMode: 'Control Mode',
        operationMode: 'Operation Mode',
        chargeMode: 'Charge Mode',
        dischargeMode: 'Discharge Mode',
        standbyMode: 'Standby Mode',
        startCharge: 'Start Charge',
        startDischarge: 'Start Discharge',
        stopOperation: 'Stop Operation',
        setPower: 'Set Power',
        setTarget: 'Set Target',
        powerLimit: 'Power Limit',
        energyTarget: 'Energy Target',
        controlConfirm: 'Confirm this operation?',
        controlSuccess: 'Control command sent',
        controlFailed: 'Control command failed',

        // Control modes
        modeManual: 'Manual Mode',
        modeAuto: 'Auto Mode',
        modeSchedule: 'Schedule Mode',
        modePeak: 'Peak Shaving',
        modeEconomy: 'Economy Mode',

        // ========== Alarm ==========
        alarmTitle: 'Alarm Information',
        currentAlarm: 'Current Alarms',
        alarmHistory: 'Alarm History',
        alarmLevel: 'Alarm Level',
        alarmType: 'Alarm Type',
        alarmTime: 'Alarm Time',
        alarmSource: 'Alarm Source',
        alarmMessage: 'Alarm Message',
        alarmStatus: 'Alarm Status',
        alarmHandle: 'Handle Alarm',
        alarmConfirm: 'Confirm Alarm',
        alarmIgnore: 'Ignore Alarm',
        alarmResolved: 'Resolved',
        alarmPending: 'Pending',

        // Alarm levels
        levelCritical: 'Critical',
        levelMajor: 'Major',
        levelMinor: 'Minor',
        levelWarning: 'Warning',
        levelInfo: 'Info',

        // Alarm types
        alarmTypeOverVoltage: 'Over Voltage',
        alarmTypeUnderVoltage: 'Under Voltage',
        alarmTypeOverCurrent: 'Over Current',
        alarmTypeOverTemp: 'Over Temperature',
        alarmTypeCommunication: 'Communication Fault',
        alarmTypeBattery: 'Battery Fault',
        alarmTypeSystem: 'System Fault',

        // ========== Log ==========
        logTitle: 'System Log',
        operationLog: 'Operation Log',
        systemLog: 'System Log',
        alarmLog: 'Alarm Log',
        alarmList: 'Alarm List',
        alarmDescription: 'Alarm Description',
        batchResolve: 'Batch Resolve',
        detail: 'Detail',
        resolve: 'Resolve',
        level: 'Level',
        actions: 'Actions',
        alarmDetail: 'Alarm Detail',
        operationConfirm: 'Operation Confirm',
        confirmExecute: 'Are you sure to execute this operation?',
        resolved: 'Resolved',
        currentValue: 'Current Value',
        threshold: 'Threshold',
        resolveTime: 'Resolve Time',
        batchResolveConfirm: 'Are you sure to resolve {count} selected alarm(s)? This action cannot be undone.',
        resolveAlarmConfirm: 'Are you sure to resolve alarm "{type}"? This action cannot be undone.',
        eventLog: 'Event Log',
        logTime: 'Time',
        logType: 'Type',
        logUser: 'User',
        logOperation: 'Operation',
        logResult: 'Result',
        logDetail: 'Detail',
        logExport: 'Export Log',
        logClear: 'Clear Log',

        // Log types
        logTypeLogin: 'Login',
        logTypeLogout: 'Logout',
        logTypeControl: 'Control',
        logTypeSetting: 'Setting',
        logTypeAlarm: 'Alarm',
        logTypeSystem: 'System',

        // Log page specific
        loginLog: 'Login Log',
        operationLogTab: 'Operation Log',
        username: 'Username',
        operation: 'Operation',
        ipAddress: 'IP Address',
        result: 'Result',
        time: 'Time',
        action: 'Action',
        detailBtn: 'Detail',

        // Log detail modal
        logDetailTitle: 'Log Detail',
        timeLabel: 'Time:',
        userLabel: 'User:',
        operationLabel: 'Operation:',
        detailDescription: 'Detailed Description:',
        ipLabel: 'IP Address:',
        resultLabel: 'Execution Result:',
        logLevelLabel: 'Log Level:',
        sessionIdLabel: 'Session ID:',
        durationLabel: 'Login Duration:',
        operationTypeLabel: 'Operation Type:',
        targetDeviceLabel: 'Target Device:',
        browserLabel: 'Browser:',

        // Log result status
        successResult: 'Success',
        failResult: 'Failed',

        // Log levels
        infoLevel: 'Info',
        successLevel: 'Success',
        warningLevel: 'Warning',
        errorLevel: 'Error',


        // ========== Settings ==========
        settingsTitle: 'System Settings',
        settingsMenuTitle: 'Settings Menu',
        accountSettings: 'Account Settings',
        securitySettings: 'Security Settings',
        systemConfig: 'System Configuration',
        electricityPrice: 'Electricity Price',

        // Account settings
        accountInfo: 'Account Information',
        systemLoginAccount: 'System login account',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        currentPasswordPlaceholder: 'Enter current password',
        newPasswordPlaceholder: 'Enter new password',
        confirmPasswordPlaceholder: 'Confirm new password',

        // Security settings
        loginSecurity: 'Login Security',
        autoLock: 'Auto Lock',
        
        // Time units
        oneSecond: '1 Second',
        threeSeconds: '3 Seconds',
        fiveSeconds: '5 Seconds',
        tenSeconds: '10 Seconds',
        fiveMinutes: '5 Minutes',
        tenMinutes: '10 Minutes',
        fifteenMinutes: '15 Minutes',
        thirtyMinutes: '30 Minutes',
        oneHour: '1 Hour',
        never: 'Never',
        autoLockDesc: 'Auto lock system when idle',
        lockTimeout: 'Lock Timeout',
        lockTimeoutDesc: 'Auto lock after idle time',

        // System configuration
        systemSettings: 'System Settings',
        dataRefreshInterval: 'Data Refresh Interval',
        dataRefreshIntervalDesc: 'Real-time data refresh frequency',
        notificationSettings: 'Notification Settings',
        alarmNotification: 'Alarm Notification',
        alarmNotificationDesc: 'Receive device alarm notifications',
        soundAlert: 'Sound Alert',
        soundAlertDesc: 'Play notification sound',

        // Electricity price settings
        currentPricePlan: 'Current Price Plan',
        noPricePlan: 'No price plan set',
        peakTime: 'Peak',
        normalTime: 'Normal',
        valleyTime: 'Valley',
        quickConfig: 'Quick Configuration',
        applyTemplate: 'Apply Template',
        customConfig: 'Custom Configuration',
        timeSlotConfig: 'Time Slot Configuration',
        timeSlot24h: '24-Hour Time Slots',
        timeSlotHint: 'Click to switch type, drag boundary to adjust time',
        currentPeriodConfig: 'Current Period Configuration',
        addPeriod: 'Add Period',
        resetToDefault: 'Reset to Default',
        savePlan: 'Save Plan',
        selectPriceTemplate: 'Select Price Template',
        defaultPeakValley: 'Default Peak-Valley Pricing',
        priceUnit: '/kWh',
        jiangsuIndustrial: 'Jiangsu Industrial Peak-Valley Pricing',
        shanghaiCommercial: 'Shanghai Commercial Pricing',
        zhejiangIndustrial: 'Zhejiang Industrial Peak-Valley Pricing',
        guangdongIndustrial: 'Guangdong Industrial Peak-Valley Pricing',
        priceRangeError: 'Price must be between 0-10/kWh',

        basicSettings: 'Basic Settings',
        networkSettings: 'Network Settings',
        alarmSettings: 'Alarm Settings',
        displaySettings: 'Display Settings',
        timeSettings: 'Time Settings',

        // Basic settings
        deviceName: 'Device Name',
        deviceLocation: 'Device Location',
        deviceCapacity: 'Device Capacity',
        installedDate: 'Installed Date',

        // System configuration
        language: 'Language',
        theme: 'Theme',
        timezone: 'Timezone',
        dateFormat: 'Date Format',
        timeFormat: 'Time Format',

        // Network settings
        ipAddress: 'IP Address',
        subnetMask: 'Subnet Mask',
        gateway: 'Gateway',
        dnsServer: 'DNS Server',

        // Alarm settings
        enableAlarm: 'Enable Alarm',
        alarmSound: 'Alarm Sound',
        alarmEmail: 'Alarm Email',
        alarmThreshold: 'Alarm Threshold',

        // Display settings
        brightness: 'Brightness',
        screenTimeout: 'Screen Timeout',
        showAnimation: 'Show Animation',
        autoRefresh: 'Auto Refresh',
        refreshInterval: 'Refresh Interval',

        // ========== Others ==========
        selectAll: 'Select All',
        deselectAll: 'Deselect All',
        delete: 'Delete',
        deleteSelected: 'Delete Selected',
        deleteConfirm: 'Confirm delete?',
        operationSuccess: 'Operation successful',
        operationFailed: 'Operation failed',
        enteredEditMode: 'Entered edit mode',
        savingSettings: 'Saving settings...',
        saveSuccess: 'Save successful',
        settingsSaveSuccess: 'Settings saved successfully',
        saveFailed: 'Save failed',
        templateAppliedSuccess: 'Template applied successfully',
        addPeriodInDevelopment: 'Add period feature is under development...',

        // ========== Calendar ==========
        calendarMonthJan: 'January',
        calendarMonthFeb: 'February',
        calendarMonthMar: 'March',
        calendarMonthApr: 'April',
        calendarMonthMay: 'May',
        calendarMonthJun: 'June',
        calendarMonthJul: 'July',
        calendarMonthAug: 'August',
        calendarMonthSep: 'September',
        calendarMonthOct: 'October',
        calendarMonthNov: 'November',
        calendarMonthDec: 'December',
        calendarWeekdaySun: 'Sun',
        calendarWeekdayMon: 'Mon',
        calendarWeekdayTue: 'Tue',
        calendarWeekdayWed: 'Wed',
        calendarWeekdayThu: 'Thu',
        calendarWeekdayFri: 'Fri',
        calendarWeekdaySat: 'Sat',
        calendarToday: 'Today',
        calendarCancel: 'Cancel',

        networkError: 'Network error',
        serverError: 'Server error',
        permissionDenied: 'Permission denied',
        invalidInput: 'Invalid input',
        requiredField: 'Required field',
        // ========== Device Names ==========
        deviceEMS: 'EMS',
        devicePCS: 'PCS',
        deviceBMS: 'BMS',

        // ========== Pagination ==========
        showing: 'Showing',
        to: '-',
        of: 'of',
        records: 'records',
        previousPage: 'Previous',
        nextPage: 'Next',
        page: 'Page',
        pages: 'of',
        totalPages: 'pages',

        // ========== Alarm Status ==========
        unresolved: 'Unresolved',
        levelGeneral: 'General',
        levelSerious: 'Critical',
        levelImportant: 'Major',

        // ========== Alarm Action Messages ==========
        batchResolveTitle: 'Batch Resolve Alarms',
        resolveAlarmTitle: 'Resolve Alarm',
        resolveAlarmMessage: 'Are you sure to resolve alarm "{type}"? This action cannot be undone.',
        cannotUndo: 'This action cannot be undone',
        resolveSuccess: 'Alarm resolved',
        batchResolveSuccess: 'Successfully resolved {count} alarm(s)',
        resolveAlarmButton: 'Resolve Alarm',
        unresolvedStatus: 'Unresolved',
        resolveTimeLabel: 'Resolve Time',
        deviceMeter: 'Meter',
        deviceTemp: 'Temp',
        deviceFire: 'Fire Protection',
        deviceOverall: 'Overall',

        // ========== Device Status ==========
        deviceStatusNormal: 'Normal',
        deviceStatusError: 'Error',
        deviceStatusOffline: 'Offline',
        deviceStatusWarning: 'Warning',
    }
};

// 获取当前语言
function getTouchscreenLang() {
    const result = localStorage.getItem('touchscreen_language') || 'en';
    console.log("[DEBUG getTouchscreenLang] localStorage:", localStorage.getItem('touchscreen_language'), "→ returning:", result);
    return result;
}

// 设置语言
function setTouchscreenLang(lang) {
    localStorage.setItem('touchscreen_language', lang);
}

// 获取翻译文本
function t(key) {
    const lang = getTouchscreenLang();
    return touchscreenTranslations[lang][key] || key;
}

// 应用翻译到页面
function applyTouchscreenTranslations() {
    const lang = getTouchscreenLang();

    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        const translation = touchscreenTranslations[lang][key];
        if (translation) {
            elem.textContent = translation;
        }
    });

    // 更新所有带有 data-i18n-placeholder 属性的输入框
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
        const key = elem.getAttribute('data-i18n-placeholder');
        const translation = touchscreenTranslations[lang][key];
        if (translation) {
            elem.placeholder = translation;
        }
    });

    // 更新所有带有 data-i18n-title 属性的元素
    document.querySelectorAll('[data-i18n-title]').forEach(elem => {
        const key = elem.getAttribute('data-i18n-title');
        const translation = touchscreenTranslations[lang][key];
        if (translation) {
            elem.title = translation;
        }
    });

    // 更新页面标题
    const titleKey = document.body.getAttribute('data-page-title');
    if (titleKey) {
        document.title = touchscreenTranslations[lang][titleKey] || document.title;
    }

    // 更新HTML lang属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// 切换语言
function switchTouchscreenLanguage(lang) {
    setTouchscreenLang(lang);
    applyTouchscreenTranslations();

    // 更新语言切换器的激活状态
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // 触发自定义事件，通知其他组件语言已切换
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getTouchscreenLang();

    // HTML默认是英文，只有当前语言是中文时才需要翻译
    // 英文环境下不需要翻译，避免闪动
    if (currentLang === 'zh') {
        // 需要切换到中文
        applyTouchscreenTranslations();
    }
    // 如果是英文，HTML已经是英文，无需操作

    // 初始化语言切换器状态
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
});
