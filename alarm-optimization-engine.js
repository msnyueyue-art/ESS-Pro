/**
 * 告警优化引擎
 * 通过分析历史告警数据，生成优化建议
 */

class AlarmOptimizationEngine {
  constructor() {
    // 基准阈值配置
    this.benchmarks = {
      responseTime: {
        critical: 5,    // 5分钟
        major: 15,      // 15分钟
        minor: 30       // 30分钟
      },
      completionTime: {
        critical: 60,   // 1小时
        major: 240,     // 4小时
        minor: 1440     // 24小时
      },
      completionRate: {
        critical: 0.95, // 95%
        major: 0.90,    // 90%
        minor: 0.85     // 85%
      }
    };

    // 问题严重度阈值
    this.severityThresholds = {
      high: 0.7,
      medium: 0.5,
      low: 0.3
    };
  }

  /**
   * 主入口：生成优化建议
   * @param {Object} alarmData - 告警历史数据
   * @returns {Array} 优化建议列表
   */
  generateRecommendations(alarmData) {
    const recommendations = [];

    // 1. 分析响应时间问题
    const responseAnalysis = this.analyzeResponseTime(alarmData);
    if (responseAnalysis.severity > this.severityThresholds.high) {
      recommendations.push(this.createResponseRecommendation(responseAnalysis));
    }

    // 2. 分析完成时间问题
    const completionAnalysis = this.analyzeCompletionTime(alarmData);
    if (completionAnalysis.severity > this.severityThresholds.high) {
      recommendations.push(this.createCompletionRecommendation(completionAnalysis));
    }

    // 3. 分析完成率问题
    const rateAnalysis = this.analyzeCompletionRate(alarmData);
    if (rateAnalysis.severity > this.severityThresholds.medium) {
      recommendations.push(this.createRateRecommendation(rateAnalysis));
    }

    // 4. 分析时段分布问题
    const timeDistributionAnalysis = this.analyzeTimeDistribution(alarmData);
    if (timeDistributionAnalysis.severity > this.severityThresholds.medium) {
      recommendations.push(this.createTimeDistributionRecommendation(timeDistributionAnalysis));
    }

    // 排序并返回前3个最重要的建议
    return this.prioritizeRecommendations(recommendations).slice(0, 3);
  }

  /**
   * 分析响应时间
   * @param {Object} data - 告警数据
   * @returns {Object} 分析结果
   */
  analyzeResponseTime(data) {
    const analysis = {
      critical: { avg: 0, count: 0, exceeded: 0, severity: 0 },
      major: { avg: 0, count: 0, exceeded: 0, severity: 0 },
      minor: { avg: 0, count: 0, exceeded: 0, severity: 0 }
    };

    // 按级别分组计算平均响应时间
    Object.keys(data).forEach(alarmId => {
      const alarm = data[alarmId];
      const responseTime = this.calculateResponseTime(alarm);
      const level = alarm.level;

      if (analysis[level]) {
        analysis[level].count++;
        analysis[level].avg += responseTime;
      }
    });

    // 计算平均值和超标程度
    let maxSeverity = 0;
    let mostSevereLevel = null;

    Object.keys(analysis).forEach(level => {
      if (analysis[level].count > 0) {
        analysis[level].avg = analysis[level].avg / analysis[level].count;
        const benchmark = this.benchmarks.responseTime[level];
        analysis[level].exceeded = analysis[level].avg / benchmark;
        analysis[level].severity = Math.min((analysis[level].exceeded - 1), 1);

        if (analysis[level].severity > maxSeverity) {
          maxSeverity = analysis[level].severity;
          mostSevereLevel = level;
        }
      }
    });

    return {
      level: mostSevereLevel,
      severity: maxSeverity,
      details: analysis[mostSevereLevel],
      allLevels: analysis
    };
  }

  /**
   * 分析完成时间
   * @param {Object} data - 告警数据
   * @returns {Object} 分析结果
   */
  analyzeCompletionTime(data) {
    const analysis = {
      critical: { avg: 0, count: 0, exceeded: 0, severity: 0 },
      major: { avg: 0, count: 0, exceeded: 0, severity: 0 },
      minor: { avg: 0, count: 0, exceeded: 0, severity: 0 }
    };

    Object.keys(data).forEach(alarmId => {
      const alarm = data[alarmId];
      if (alarm.completeTime) {
        const completionTime = this.calculateCompletionTime(alarm);
        const level = alarm.level;

        if (analysis[level]) {
          analysis[level].count++;
          analysis[level].avg += completionTime;
        }
      }
    });

    let maxSeverity = 0;
    let mostSevereLevel = null;

    Object.keys(analysis).forEach(level => {
      if (analysis[level].count > 0) {
        analysis[level].avg = analysis[level].avg / analysis[level].count;
        const benchmark = this.benchmarks.completionTime[level];
        analysis[level].exceeded = analysis[level].avg / benchmark;
        analysis[level].severity = Math.min((analysis[level].exceeded - 1), 1);

        if (analysis[level].severity > maxSeverity) {
          maxSeverity = analysis[level].severity;
          mostSevereLevel = level;
        }
      }
    });

    return {
      level: mostSevereLevel,
      severity: maxSeverity,
      details: analysis[mostSevereLevel],
      allLevels: analysis
    };
  }

  /**
   * 分析完成率
   * @param {Object} data - 告警数据
   * @returns {Object} 分析结果
   */
  analyzeCompletionRate(data) {
    const stats = {
      critical: { total: 0, completed: 0, rate: 0, severity: 0 },
      major: { total: 0, completed: 0, rate: 0, severity: 0 },
      minor: { total: 0, completed: 0, rate: 0, severity: 0 }
    };

    Object.keys(data).forEach(alarmId => {
      const alarm = data[alarmId];
      const level = alarm.level;

      if (stats[level]) {
        stats[level].total++;
        if (alarm.completeTime) {
          stats[level].completed++;
        }
      }
    });

    let maxSeverity = 0;
    let mostSevereLevel = null;

    Object.keys(stats).forEach(level => {
      if (stats[level].total > 0) {
        stats[level].rate = stats[level].completed / stats[level].total;
        const benchmark = this.benchmarks.completionRate[level];
        stats[level].severity = Math.max(0, (benchmark - stats[level].rate) / benchmark);

        if (stats[level].severity > maxSeverity) {
          maxSeverity = stats[level].severity;
          mostSevereLevel = level;
        }
      }
    });

    return {
      level: mostSevereLevel,
      severity: maxSeverity,
      details: stats[mostSevereLevel],
      allLevels: stats
    };
  }

  /**
   * 分析时段分布
   * @param {Object} data - 告警数据
   * @returns {Object} 分析结果
   */
  analyzeTimeDistribution(data) {
    const distribution = {
      workHours: { count: 0, avgResponse: 0 },    // 工作时间 9-18
      afterHours: { count: 0, avgResponse: 0 },   // 下班时间 18-23
      nightHours: { count: 0, avgResponse: 0 }    // 夜间 23-9
    };

    Object.keys(data).forEach(alarmId => {
      const alarm = data[alarmId];
      const hour = new Date(alarm.alarmTime).getHours();
      const responseTime = this.calculateResponseTime(alarm);

      let period;
      if (hour >= 9 && hour < 18) {
        period = 'workHours';
      } else if (hour >= 18 && hour < 23) {
        period = 'afterHours';
      } else {
        period = 'nightHours';
      }

      distribution[period].count++;
      distribution[period].avgResponse += responseTime;
    });

    // 计算平均响应时间
    Object.keys(distribution).forEach(period => {
      if (distribution[period].count > 0) {
        distribution[period].avgResponse =
          distribution[period].avgResponse / distribution[period].count;
      }
    });

    // 计算严重度（夜间响应时间与工作时间的比率）
    const ratio = distribution.nightHours.avgResponse / distribution.workHours.avgResponse;
    const severity = ratio > 3 ? 0.8 : ratio > 2 ? 0.6 : ratio > 1.5 ? 0.4 : 0;

    return {
      severity,
      distribution,
      ratio
    };
  }

  /**
   * 创建响应时间优化建议
   */
  createResponseRecommendation(analysis) {
    const level = analysis.level;
    const details = analysis.details;
    const levelName = this.getLevelName(level);

    const recommendation = {
      priority: 'high',
      type: '增加触达方式',
      title: `${levelName}级别告警响应过慢`,
      description: `过去7天${levelName}告警平均响应时间${details.avg.toFixed(1)}分钟，超过标准${details.exceeded.toFixed(1)}倍`,
      evidence: {
        avgResponseTime: `${details.avg.toFixed(1)}分钟`,
        benchmark: `${this.benchmarks.responseTime[level]}分钟`,
        affectedAlarms: details.count,
        improvement: `响应时间可减少${((details.exceeded - 1) * 100).toFixed(0)}%`
      },
      actions: [],
      score: analysis.severity
    };

    // 根据严重度生成具体建议
    if (details.exceeded > 2) {
      recommendation.actions = [
        '添加电话告警通知（最快触达）',
        '增加值班人员到5人',
        '配置多渠道并行通知',
        '设置告警升级机制（10分钟无响应自动升级）'
      ];
    } else if (details.exceeded > 1.5) {
      recommendation.actions = [
        '添加短信或企业微信通知',
        '增加值班人员到3人',
        '优化通知顺序（重要人员优先）'
      ];
    } else {
      recommendation.actions = [
        '优化现有通知渠道配置',
        '调整通知频率',
        '增加备用联系人'
      ];
    }

    return recommendation;
  }

  /**
   * 创建完成时间优化建议
   */
  createCompletionRecommendation(analysis) {
    const level = analysis.level;
    const details = analysis.details;
    const levelName = this.getLevelName(level);

    const recommendation = {
      priority: 'high',
      type: '升级告警',
      title: `${levelName}级别告警处理过慢`,
      description: `平均完成时间${(details.avg / 60).toFixed(1)}小时，超过标准${details.exceeded.toFixed(1)}倍`,
      evidence: {
        avgCompletionTime: `${(details.avg / 60).toFixed(1)}小时`,
        benchmark: `${(this.benchmarks.completionTime[level] / 60).toFixed(1)}小时`,
        affectedAlarms: details.count,
        improvement: `完成时间可减少${((details.exceeded - 1) * 100).toFixed(0)}%`
      },
      actions: [],
      score: analysis.severity
    };

    // 生成具体建议
    if (level === 'major' && details.exceeded > 1.5) {
      recommendation.actions = [
        '将频繁超时的Major告警升级为Critical',
        '缩短自动升级时间到30分钟',
        '增加处理进度提醒（每小时提醒一次）',
        '配置告警处理SLA监控'
      ];
    } else if (level === 'critical') {
      recommendation.actions = [
        'Critical告警30分钟未完成自动呼叫主管',
        '启用Critical告警的战争室机制',
        '配置多团队协同处理流程',
        '建立告警处理检查点机制'
      ];
    } else {
      recommendation.actions = [
        '优化告警处理流程',
        '增加自动化处理脚本',
        '提供更详细的处理指南'
      ];
    }

    return recommendation;
  }

  /**
   * 创建完成率优化建议
   */
  createRateRecommendation(analysis) {
    const level = analysis.level;
    const details = analysis.details;
    const levelName = this.getLevelName(level);

    return {
      priority: 'medium',
      type: '调整升级策略',
      title: `${levelName}级别告警完成率偏低`,
      description: `仅${(details.rate * 100).toFixed(0)}%的${levelName}告警被及时完成`,
      evidence: {
        completionRate: `${(details.rate * 100).toFixed(0)}%`,
        benchmark: `${(this.benchmarks.completionRate[level] * 100).toFixed(0)}%`,
        uncompletedAlarms: details.total - details.completed,
        improvement: `完成率可提升${((this.benchmarks.completionRate[level] - details.rate) * 100).toFixed(0)}%`
      },
      actions: [
        '调整告警升级时间阈值',
        '增加告警处理超时提醒',
        '定期回顾未完成告警',
        '优化告警分配机制'
      ],
      score: analysis.severity
    };
  }

  /**
   * 创建时段分布优化建议
   */
  createTimeDistributionRecommendation(analysis) {
    return {
      priority: 'medium',
      type: '优化值班安排',
      title: '夜间告警响应效率低',
      description: `夜间告警响应时间是工作时间的${analysis.ratio.toFixed(1)}倍`,
      evidence: {
        nightResponse: `${analysis.distribution.nightHours.avgResponse.toFixed(1)}分钟`,
        dayResponse: `${analysis.distribution.workHours.avgResponse.toFixed(1)}分钟`,
        nightAlarms: analysis.distribution.nightHours.count,
        improvement: '夜间响应时间可减少50%'
      },
      actions: [
        '增加夜间值班人员',
        '配置夜间告警的电话通知',
        '建立夜间告警处理激励机制',
        '优化夜间告警的自动处理'
      ],
      score: analysis.severity
    };
  }

  /**
   * 优先级排序
   */
  prioritizeRecommendations(recommendations) {
    return recommendations.sort((a, b) => {
      // 首先按优先级排序
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];

      if (priorityDiff !== 0) return priorityDiff;

      // 相同优先级按严重度分数排序
      return b.score - a.score;
    });
  }

  /**
   * 工具方法
   */
  calculateResponseTime(alarm) {
    // 计算从告警发生到首次响应的时间（分钟）
    if (!alarm.firstResponseTime) {
      // 如果没有响应时间，使用当前时间
      return (Date.now() - new Date(alarm.alarmTime).getTime()) / (1000 * 60);
    }
    return (new Date(alarm.firstResponseTime) - new Date(alarm.alarmTime)) / (1000 * 60);
  }

  calculateCompletionTime(alarm) {
    // 计算从告警发生到完成的时间（分钟）
    if (!alarm.completeTime) return null;
    return (new Date(alarm.completeTime) - new Date(alarm.alarmTime)) / (1000 * 60);
  }

  getLevelName(level) {
    const names = {
      critical: '严重',
      major: '重要',
      minor: '一般'
    };
    return names[level] || level;
  }

  /**
   * 获取当前配置的通知渠道
   */
  getCurrentChannels() {
    // 这里应该从实际配置中读取
    return ['email', 'wechat'];
  }

  /**
   * 计算健康度评分
   */
  calculateHealthScore(alarmData) {
    const responseAnalysis = this.analyzeResponseTime(alarmData);
    const completionAnalysis = this.analyzeCompletionTime(alarmData);
    const rateAnalysis = this.analyzeCompletionRate(alarmData);

    // 响应速度得分
    const responseScore = Math.max(0, 100 * (1 - responseAnalysis.severity));

    // 完成率得分
    const completionScore = Math.max(0, 100 * (1 - completionAnalysis.severity));

    // 覆盖范围得分（基于完成率）
    const coverageScore = Math.max(0, 100 * (1 - rateAnalysis.severity));

    // 升级效率得分（这里简化处理）
    const escalationScore = 80; // 默认值

    // 综合得分
    const overall = Math.round(
      responseScore * 0.3 +
      completionScore * 0.3 +
      coverageScore * 0.2 +
      escalationScore * 0.2
    );

    return {
      overall,
      dimensions: {
        responseSpeed: Math.round(responseScore),
        completionRate: Math.round(completionScore),
        coverageScope: Math.round(coverageScore),
        escalationEfficiency: escalationScore
      },
      status: this.getHealthStatus(overall)
    };
  }

  getHealthStatus(score) {
    if (score >= 90) return '优秀';
    if (score >= 75) return '良好';
    if (score >= 60) return '需要优化';
    return '急需改进';
  }
}

// 导出模块
export default AlarmOptimizationEngine;

// 使用示例
export function analyzeAlarmData(historicalData) {
  const engine = new AlarmOptimizationEngine();

  // 生成优化建议
  const recommendations = engine.generateRecommendations(historicalData);

  // 计算健康度评分
  const healthScore = engine.calculateHealthScore(historicalData);

  return {
    recommendations,
    healthScore
  };
}