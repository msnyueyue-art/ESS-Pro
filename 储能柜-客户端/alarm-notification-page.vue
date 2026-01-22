<template>
  <div class="alarm-optimization-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1>告警通知优化中心</h1>
      <div class="header-info">
        <span class="data-range">基于最近7天数据分析</span>
        <span class="update-time">更新时间：{{ lastUpdateTime }}</span>
        <el-button size="small" @click="refreshData">
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </div>
    </div>

    <!-- 1. 优化建议区（最重要，置顶） -->
    <div class="recommendations-section">
      <div class="section-title">
        <h2>优化建议</h2>
        <span class="subtitle">基于数据分析的改进建议</span>
      </div>

      <div class="recommendation-cards">
        <div
          v-for="(rec, index) in topRecommendations"
          :key="index"
          :class="['recommendation-card', `priority-${rec.priority}`]"
        >
          <div class="card-header">
            <span class="priority-badge">
              {{ rec.priority === 'high' ? '🔴 优先' : '🟡 建议' }} #{{ index + 1 }}
            </span>
            <span class="recommendation-type">{{ rec.type }}</span>
          </div>

          <div class="card-content">
            <h3>{{ rec.title }}</h3>
            <p class="description">{{ rec.description }}</p>

            <!-- 数据支撑 -->
            <div class="evidence-section">
              <h4>📊 数据支撑：</h4>
              <div class="evidence-items">
                <div class="evidence-item">
                  <span class="label">平均响应时间：</span>
                  <span class="value">{{ rec.evidence.avgResponseTime }}</span>
                  <span class="benchmark">（标准：{{ rec.evidence.benchmark }}）</span>
                </div>
                <div class="evidence-item">
                  <span class="label">影响告警数：</span>
                  <span class="value">{{ rec.evidence.affectedAlarms }}个</span>
                </div>
                <div class="evidence-item">
                  <span class="label">预期改善：</span>
                  <span class="value improvement">{{ rec.evidence.improvement }}</span>
                </div>
              </div>
            </div>

            <!-- 建议操作 -->
            <div class="action-section">
              <h4>✅ 建议操作：</h4>
              <ol class="action-list">
                <li v-for="(action, idx) in rec.actions" :key="idx">
                  {{ action }}
                </li>
              </ol>
            </div>
          </div>

          <div class="card-footer">
            <el-button type="primary" @click="executeRecommendation(rec)">
              立即配置
            </el-button>
            <el-button @click="viewDetails(rec)">查看详情</el-button>
            <el-button text @click="dismissRecommendation(rec)">忽略建议</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 健康度评分区 -->
    <div class="health-score-section">
      <div class="section-title">
        <h2>系统健康度</h2>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="overall-score">
            <div class="score-circle">
              <el-progress
                type="circle"
                :percentage="healthScore.overall"
                :color="getScoreColor(healthScore.overall)"
                :width="150"
              >
                <div class="score-content">
                  <span class="score-value">{{ healthScore.overall }}</span>
                  <span class="score-label">综合评分</span>
                </div>
              </el-progress>
            </div>
            <div class="score-trend">
              <span :class="['trend', healthScore.trend > 0 ? 'up' : 'down']">
                {{ healthScore.trend > 0 ? '↑' : '↓' }} {{ Math.abs(healthScore.trend) }}%
              </span>
              <span class="trend-label">较上周</span>
            </div>
            <div class="score-status">{{ healthScore.status }}</div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="dimension-scores">
            <div id="health-radar-chart" style="height: 300px;"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 3. 数据分析区 -->
    <div class="data-analysis-section">
      <div class="section-title">
        <h2>详细数据分析</h2>
      </div>

      <el-row :gutter="20">
        <!-- 响应时间分析 -->
        <el-col :span="8">
          <div class="analysis-card">
            <h3>响应时间分析</h3>
            <div class="metric-bars">
              <div
                v-for="level in ['critical', 'major', 'minor']"
                :key="level"
                class="metric-bar"
              >
                <div class="bar-label">
                  <span class="level-name">{{ getLevelName(level) }}</span>
                  <span class="time-value">{{ responseTimeData[level] }}分钟</span>
                  <span :class="['status-icon', getTimeStatus(level, responseTimeData[level])]">
                    {{ getTimeStatus(level, responseTimeData[level]) === 'warning' ? '⚠️' : '✓' }}
                  </span>
                </div>
                <div class="bar-container">
                  <div
                    class="bar-fill"
                    :style="{
                      width: getBarWidth(responseTimeData[level], 60) + '%',
                      backgroundColor: getBarColor(level, responseTimeData[level])
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="problem-summary">
              <h4>问题识别：</h4>
              <ul>
                <li v-for="problem in responseProblems" :key="problem">
                  {{ problem }}
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <!-- 完成时间分析 -->
        <el-col :span="8">
          <div class="analysis-card">
            <h3>完成时间分析</h3>
            <div class="metric-bars">
              <div
                v-for="level in ['critical', 'major', 'minor']"
                :key="level"
                class="metric-bar"
              >
                <div class="bar-label">
                  <span class="level-name">{{ getLevelName(level) }}</span>
                  <span class="time-value">{{ completionTimeData[level] }}小时</span>
                  <span :class="['status-icon', getCompletionStatus(level, completionTimeData[level])]">
                    {{ getCompletionStatus(level, completionTimeData[level]) === 'warning' ? '⚠️' : '✓' }}
                  </span>
                </div>
                <div class="bar-container">
                  <div
                    class="bar-fill"
                    :style="{
                      width: getBarWidth(completionTimeData[level], 24) + '%',
                      backgroundColor: getBarColor(level, completionTimeData[level])
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="problem-summary">
              <h4>问题识别：</h4>
              <ul>
                <li v-for="problem in completionProblems" :key="problem">
                  {{ problem }}
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <!-- 完成率趋势 -->
        <el-col :span="8">
          <div class="analysis-card">
            <h3>7日完成率趋势</h3>
            <div id="completion-trend-chart" style="height: 200px;"></div>
            <div class="trend-summary">
              <div class="summary-item">
                <span class="label">平均完成率：</span>
                <span class="value">{{ avgCompletionRate }}%</span>
                <span class="target">（目标：90%）</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 4. 详细数据表格 -->
    <div class="detail-table-section">
      <div class="section-title">
        <h2>告警处理明细</h2>
        <el-button size="small" @click="exportData">导出数据</el-button>
      </div>

      <el-table
        :data="alarmDetailData"
        style="width: 100%"
        max-height="400"
      >
        <el-table-column prop="level" label="级别" width="100">
          <template #default="scope">
            <el-tag :type="getLevelTagType(scope.row.level)">
              {{ getLevelName(scope.row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="count" label="告警数" width="100" />
        <el-table-column prop="avgResponseTime" label="平均响应时间" width="140">
          <template #default="scope">
            {{ scope.row.avgResponseTime }}分钟
          </template>
        </el-table-column>
        <el-table-column prop="avgCompletionTime" label="平均完成时间" width="140">
          <template #default="scope">
            {{ scope.row.avgCompletionTime }}小时
          </template>
        </el-table-column>
        <el-table-column prop="completionRate" label="完成率" width="120">
          <template #default="scope">
            <el-progress
              :percentage="scope.row.completionRate"
              :color="getProgressColor(scope.row.completionRate)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="recommendation" label="优化建议" min-width="200">
          <template #default="scope">
            {{ scope.row.recommendation }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'AlarmOptimizationPage',

  data() {
    return {
      lastUpdateTime: new Date().toLocaleString(),

      // 优化建议数据
      topRecommendations: [
        {
          priority: 'high',
          type: '增加触达方式',
          title: 'Critical级别告警响应过慢',
          description: '过去7天有68%的Critical告警响应时间超过5分钟',
          evidence: {
            avgResponseTime: '12分钟',
            benchmark: '5分钟',
            affectedAlarms: 34,
            improvement: '响应时间可减少60%'
          },
          actions: [
            '添加电话通知渠道（当前仅邮件）',
            '增加值班人员到3-5人',
            '配置多渠道并行通知'
          ]
        },
        {
          priority: 'high',
          type: '升级告警',
          title: 'Major告警完成率过低',
          description: '仅60%的Major告警在规定时间内完成',
          evidence: {
            avgResponseTime: '5小时',
            benchmark: '2小时',
            affectedAlarms: 56,
            improvement: '完成率可提升30%'
          },
          actions: [
            '将超时频繁的Major告警升级为Critical',
            '缩短自动升级时间到30分钟',
            '增加告警处理提醒机制'
          ]
        }
      ],

      // 健康度评分
      healthScore: {
        overall: 72,
        dimensions: {
          responseSpeed: 65,
          completionRate: 78,
          coverageScope: 70,
          escalationEfficiency: 80
        },
        trend: 5,
        status: '需要优化'
      },

      // 响应时间数据
      responseTimeData: {
        critical: 12,
        major: 25,
        minor: 45
      },

      // 完成时间数据
      completionTimeData: {
        critical: 2.5,
        major: 5,
        minor: 12
      },

      // 问题识别
      responseProblems: [
        'Critical响应慢140%',
        '夜间响应时间是白天的3倍'
      ],

      completionProblems: [
        '30%的Critical超过3小时',
        'Major级别完成率仅60%'
      ],

      // 完成率
      avgCompletionRate: 72,

      // 详细数据
      alarmDetailData: []
    };
  },

  mounted() {
    this.initCharts();
    this.loadDetailData();
  },

  methods: {
    // 初始化图表
    initCharts() {
      this.initRadarChart();
      this.initTrendChart();
    },

    // 初始化雷达图
    initRadarChart() {
      const chart = echarts.init(document.getElementById('health-radar-chart'));
      const option = {
        radar: {
          indicator: [
            { name: '响应速度', max: 100 },
            { name: '完成率', max: 100 },
            { name: '覆盖范围', max: 100 },
            { name: '升级效率', max: 100 }
          ]
        },
        series: [{
          type: 'radar',
          data: [{
            value: [65, 78, 70, 80],
            name: '当前状态'
          }]
        }]
      };
      chart.setOption(option);
    },

    // 初始化趋势图
    initTrendChart() {
      const chart = echarts.init(document.getElementById('completion-trend-chart'));
      const option = {
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'line',
          data: [65, 70, 68, 75, 72, 78, 72],
          markLine: {
            data: [{
              yAxis: 90,
              label: {
                formatter: '目标: 90%'
              }
            }]
          }
        }]
      };
      chart.setOption(option);
    },

    // 加载详细数据
    loadDetailData() {
      // 模拟数据加载
      this.alarmDetailData = [
        {
          level: 'critical',
          type: '服务器宕机',
          count: 12,
          avgResponseTime: 15,
          avgCompletionTime: 3,
          completionRate: 75,
          recommendation: '增加电话通知'
        },
        // 更多数据...
      ];
    },

    // 执行建议
    executeRecommendation(rec) {
      this.$router.push({
        path: '/alarm/config',
        query: { recommendation: rec.type }
      });
    },

    // 查看详情
    viewDetails(rec) {
      // 显示详情弹窗
    },

    // 忽略建议
    dismissRecommendation(rec) {
      this.$confirm('确定忽略此建议吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 记录忽略的建议
      });
    },

    // 刷新数据
    refreshData() {
      this.lastUpdateTime = new Date().toLocaleString();
      // 重新加载数据
    },

    // 导出数据
    exportData() {
      // 导出CSV
    },

    // 工具函数
    getLevelName(level) {
      const names = {
        critical: '严重',
        major: '重要',
        minor: '一般'
      };
      return names[level] || level;
    },

    getLevelTagType(level) {
      const types = {
        critical: 'danger',
        major: 'warning',
        minor: 'info'
      };
      return types[level] || 'info';
    },

    getScoreColor(score) {
      if (score >= 80) return '#67c23a';
      if (score >= 60) return '#e6a23c';
      return '#f56c6c';
    },

    getTimeStatus(level, time) {
      const benchmarks = {
        critical: 5,
        major: 15,
        minor: 30
      };
      return time > benchmarks[level] * 1.5 ? 'warning' : 'success';
    },

    getCompletionStatus(level, time) {
      const benchmarks = {
        critical: 1,
        major: 4,
        minor: 24
      };
      return time > benchmarks[level] * 1.5 ? 'warning' : 'success';
    },

    getBarWidth(value, max) {
      return Math.min((value / max) * 100, 100);
    },

    getBarColor(level, value) {
      if (this.getTimeStatus(level, value) === 'warning') {
        return '#f56c6c';
      }
      return '#67c23a';
    },

    getProgressColor(percentage) {
      if (percentage >= 90) return '#67c23a';
      if (percentage >= 70) return '#e6a23c';
      return '#f56c6c';
    }
  }
};
</script>

<style lang="scss" scoped>
.alarm-optimization-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;

  .page-header {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin: 0;
      font-size: 24px;
      color: #303133;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 20px;

      .data-range {
        color: #606266;
        font-size: 14px;
      }

      .update-time {
        color: #909399;
        font-size: 14px;
      }
    }
  }

  // 优化建议区样式
  .recommendations-section {
    margin-bottom: 20px;

    .section-title {
      margin-bottom: 16px;

      h2 {
        font-size: 20px;
        color: #303133;
        margin: 0 0 4px 0;
      }

      .subtitle {
        color: #909399;
        font-size: 14px;
      }
    }

    .recommendation-cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;

      .recommendation-card {
        flex: 1;
        min-width: 400px;
        background: white;
        border-radius: 8px;
        padding: 20px;
        border: 2px solid transparent;
        transition: all 0.3s;

        &.priority-high {
          border-color: #f56c6c;
        }

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;

          .priority-badge {
            font-size: 14px;
            font-weight: 600;
          }

          .recommendation-type {
            background: #ecf5ff;
            color: #409eff;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 14px;
          }
        }

        .card-content {
          h3 {
            font-size: 18px;
            color: #303133;
            margin: 0 0 8px 0;
          }

          .description {
            color: #606266;
            margin-bottom: 16px;
          }

          .evidence-section {
            background: #f5f7fa;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 16px;

            h4 {
              margin: 0 0 8px 0;
              font-size: 14px;
              color: #303133;
            }

            .evidence-items {
              .evidence-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;

                .label {
                  color: #606266;
                  font-size: 14px;
                }

                .value {
                  font-weight: 600;
                  color: #303133;
                }

                .benchmark {
                  color: #909399;
                  font-size: 12px;
                }

                .improvement {
                  color: #67c23a;
                }
              }
            }
          }

          .action-section {
            h4 {
              margin: 0 0 8px 0;
              font-size: 14px;
              color: #303133;
            }

            .action-list {
              margin: 0;
              padding-left: 20px;

              li {
                color: #606266;
                margin-bottom: 4px;
                font-size: 14px;
              }
            }
          }
        }

        .card-footer {
          margin-top: 16px;
          display: flex;
          gap: 12px;
        }
      }
    }
  }

  // 健康度评分区样式
  .health-score-section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;

    .overall-score {
      display: flex;
      flex-direction: column;
      align-items: center;

      .score-circle {
        margin-bottom: 16px;

        .score-content {
          display: flex;
          flex-direction: column;
          align-items: center;

          .score-value {
            font-size: 32px;
            font-weight: bold;
            color: #303133;
          }

          .score-label {
            font-size: 14px;
            color: #909399;
          }
        }
      }

      .score-trend {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;

        .trend {
          font-size: 16px;
          font-weight: 600;

          &.up {
            color: #67c23a;
          }

          &.down {
            color: #f56c6c;
          }
        }

        .trend-label {
          color: #909399;
          font-size: 14px;
        }
      }

      .score-status {
        font-size: 16px;
        color: #e6a23c;
        font-weight: 500;
      }
    }
  }

  // 数据分析区样式
  .data-analysis-section {
    margin-bottom: 20px;

    .analysis-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      height: 100%;

      h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        color: #303133;
      }

      .metric-bars {
        margin-bottom: 16px;

        .metric-bar {
          margin-bottom: 12px;

          .bar-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;

            .level-name {
              font-size: 14px;
              color: #606266;
            }

            .time-value {
              font-weight: 600;
              color: #303133;
            }

            .status-icon {
              font-size: 16px;

              &.warning {
                color: #e6a23c;
              }

              &.success {
                color: #67c23a;
              }
            }
          }

          .bar-container {
            height: 8px;
            background: #f0f2f5;
            border-radius: 4px;
            overflow: hidden;

            .bar-fill {
              height: 100%;
              transition: width 0.3s;
            }
          }
        }
      }

      .problem-summary {
        border-top: 1px solid #e4e7ed;
        padding-top: 12px;

        h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #303133;
        }

        ul {
          margin: 0;
          padding-left: 20px;

          li {
            color: #e6a23c;
            font-size: 14px;
            margin-bottom: 4px;
          }
        }
      }

      .trend-summary {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #e4e7ed;

        .summary-item {
          display: flex;
          align-items: center;
          gap: 8px;

          .label {
            color: #606266;
            font-size: 14px;
          }

          .value {
            font-weight: 600;
            color: #303133;
            font-size: 16px;
          }

          .target {
            color: #909399;
            font-size: 12px;
          }
        }
      }
    }
  }

  // 详细数据表格区样式
  .detail-table-section {
    background: white;
    border-radius: 8px;
    padding: 20px;

    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h2 {
        font-size: 18px;
        color: #303133;
        margin: 0;
      }
    }
  }
}
</style>