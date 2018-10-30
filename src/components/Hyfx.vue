<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card :style="'height:'+ height +'px;'">
        <el-collapse v-model="activeItem" accordion @change="changeItem">
          <el-collapse-item name="/hyfx/mainPeriod">
            <template slot="title" >
              <span class="itemTitle">养护施工时段统计</span>
            </template>
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="统计时间">
                <el-date-picker type="year" value-format="yyyy" placeholder="统计时间" v-model="params.year">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="统计模式">
                <el-select v-model="params.closeable" placeholder="养护状态">
                  <el-option label="全部" value="-1"></el-option>
                  <el-option label="未关闭" value="0"></el-option>
                  <el-option label="已关闭" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="/hyfx/networkEffect">
            <template slot="title" >
              <span class="itemTitle">路网运行影响分析</span>
            </template>
            <el-row :gutter="5">
              <el-col :span="12">
                <div class="yhsj-bg">&nbsp;</div>
                <div>
                  <div class="yh-content">{{minChart.yhTimes}}</div>
                  <div class="yh-title">养护事件（起）</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="yhlc-bg">&nbsp;</div>
                <div>
                  <div class="yh-content">{{minChart.yhMile}}</div>
                  <div class="yh-title">养护里程（公里）</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <div id="minChart">&nbsp;</div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <el-table ref="minTable" :data="minTable" size="small" :max-height="tableHeight"
                          highlight-current-row
                          @expand-change="minTabExpandChange"
                          @row-click="minTabRowClick"
                style="cursor:pointer;">
                  <el-table-column type="expand" width="20" style="padding: 3px">
                    <template slot-scope="props">
                      <!--
                      <ul>
                        <li v-for="item in props.row.data">
                          <el-tag>{{item.id}}</el-tag><el-tag>{{item.roadstart}}</el-tag><el-tag>{{item.roadend}}</el-tag>
                        </li>
                      </ul>
                      -->
                      <el-table
                        :data="props.row.data" size="mini" border="true" style="width: 100%;">
                        <el-table-column
                          prop="roadRangText"
                          label="桩号范围"
                          width="150">
                        </el-table-column>
                        <!--
                        <el-table-column
                          prop="blockMileage"
                          label="影响里程">
                        </el-table-column>
                        -->
                        <el-table-column
                          prop="directiontext"
                          label="方向">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column label="序号" prop="id" width="50" align="center"></el-table-column>
                  <el-table-column label="路线名称" prop="roadfullname"></el-table-column>
                  <el-table-column label="影响状态" prop="directiontext" align="center" width="70"></el-table-column>
                  <el-table-column label="桩号范围" prop="roadrang"></el-table-column>

                </el-table>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="/hyfx/caseTypeBar">
            <template slot="title" >
              <span class="itemTitle">路政执法统计</span>
            </template>
            <el-card :body-style="{padding: '0px'}">
              <div slot="header" class="clearfix">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <i class="el-icon-menu"></i>&nbsp;{{lzzfActionItem}}<i class="el-icon-d-caret el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="执法案件类型统计">执法案件类型统计</el-dropdown-item>
                    <el-dropdown-item command="涉案车辆归属地占比统计">涉案车辆归属地占比统计</el-dropdown-item>
                    <el-dropdown-item command="治超处罚案由统计">治超处罚案由统计</el-dropdown-item>
                    <el-dropdown-item command="治超货物类型占比统计">治超货物类型占比统计</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <el-form v-if="lzzfActionItem == '执法案件类型统计'" :model="params" label-position="left" label-width="70px">
                <el-form-item label="案件类型">
                  <el-select v-model="params.ajlx" placeholder="请选择案件类型">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="一般" value="1"></el-option>
                    <el-option label="简易" value="2"></el-option>
                    <el-option label="非现场处理" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统计模式">
                  <el-select v-model="params.interval" placeholder="统计模式">
                    <el-option label="按年" value="y"></el-option>
                    <el-option label="按月" value="m"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统计时间">
                  <el-date-picker v-if="lzzfInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                  </el-date-picker>
                  <el-date-picker v-else type="month" value-format="yyyy-MM" placeholder="统计时间" v-model="params.dateMonth">
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <el-form v-if="lzzfActionItem == '涉案车辆归属地占比统计' || lzzfActionItem == '治超货物类型占比统计'" :model="params" label-position="left" label-width="70px">
                <el-form-item label="统计模式">
                  <el-select v-model="params.interval" placeholder="统计模式">
                    <el-option label="按年" value="y"></el-option>
                    <el-option label="按月" value="m"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统计时间">
                  <el-date-picker v-if="lzzfInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                  </el-date-picker>
                  <el-date-picker v-else type="month" value-format="yyyy-MM" placeholder="统计时间" v-model="params.dateMonth">
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <el-form v-if="lzzfActionItem == '治超处罚案由统计'" :model="params" label-position="left" label-width="70px">
                <el-form-item label="案件类型">
                  <el-select v-model="params.anyou" placeholder="请选择案件类型">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="违法超限运输" value="1"></el-option>
                    <el-option label="扰乱超限监测秩序" value="2"></el-option>
                    <el-option label="非法使用通行证" value="3"></el-option>
                    <el-option label="逃避超限检测" value="4"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统计模式">
                  <el-select v-model="params.interval" placeholder="统计模式">
                    <el-option label="按年" value="y"></el-option>
                    <el-option label="按月" value="m"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="统计时间">
                  <el-date-picker v-if="lzzfInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                  </el-date-picker>
                  <el-date-picker v-else type="month" value-format="yyyy-MM" placeholder="统计时间" v-model="params.dateMonth">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card :style="'height:'+ height +'px;'" body-style="padding:0px">
        <router-view :params="params"></router-view>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  // import logger from "../../services/logger"
export default {
  name: 'Hyfx',
  data () {
    return {
      activeItem: '/hyfx/mainPeriod',
      lzzfActiveItem: '1',
      // 内容区高度
      height: 100,
      // 表格高度
      tableHeight: 700,
      params: {
        // 参数年
        year: 'y',
        // 是否关闭
        closeable: '-1',
        // 拥堵线数据
        lineData: [],
        // 拥堵点数据
        pointData: [],
        fullHeight: 0,
        ajlx: '0',
        anyou: '0',
        interval: 'y',
        dateYear: '',
        dateMonth: ''
      },
      minChart: {
        chatObj: null,
        // 养护起数
        yhTimes: 0,
        // 养护里程
        yhMile: 0
      },
      // 拥堵数据
      minTable: [],
      // 拥堵表当前行
      minCurrentRow: null,
      lzzfActionItem: '执法案件类型统计'
    }
  },
  props: {
    params_in: {
      fullHeight: 0
    }
  },
  computed: {
    // 拥堵线
    clusterLine: function () {
      let lineArr = []
      if (this.minTable) {
        this.minTable.forEach((item, index) => {
          if (item.geometry) {
            lineArr.push({
              geometry: item.geometry,
              geometryType: item.geometryType
            })
          }
        })
      }
      return lineArr
    },
    // 拥堵点
    clusterPoint: function () {
      let pointArr = []
      if (this.minTable) {
        this.minTable.forEach((item, index) => {
          if (item.data) {
            let cnt = item.data.length
            pointArr.push({
              id: item.id,
              geometry: item.data[parseInt(cnt / 2)]['centerPoint'],
              geometryType: 'Point'
            })
          }
        })
      }
      return pointArr
    },
    lzzfInterval: function () {
      return this.params.interval === 'y' ? 'year' : 'month'
    }
  },
  created () {
    this.setSize()
    this.init()
    this.changeItem(this.activeItem)
  },
  mounted () {
    this.log.logging('JTYJ-APP-GLYX-TJFX','行业分析','进入行业分析页面')
    this.createMinChart()
  },
  watch: {
    'params_in.fullHeight' (val) {
      this.setSize()
      this.params.fullHeight = val
    }
  },
  methods: {

    /**
     * 页面参数初始化
     */
    init () {
      this.params.year = new Date().getFullYear().toString()
      this.params.dateYear = new Date().getFullYear().toString()
      const month = new Date().getMonth() + 1
      this.params.dateMonth = new Date().getFullYear().toString() + (month < 10 ? '0' + month.toString() : month.toString())
    },

    /**
     * 创建图表
     */
    createMinChart () {
      this.minChart.chatObj = echarts.init(document.getElementById("minChart"))
    },

    /**
     * 切换菜单
     */
    changeItem (item) {
      if (item != null) {
        this.toRouter(item)
        if (item === '/hyfx/networkEffect'){
          this.loadMinChartData()
          this.loadMinTableData()
        }
      }
    },

    /**
     * 切换路由
     */
    toRouter (path) {
      this.$router.push(path)
    },
    /**
     * 加载图表数据
     */
    loadMinChartData () {
      var that = this
      this.$http.getData(config.service.hyfx.netWorkEffect.minChart, {}, {}, function (data, msg) {
        let yhArr = []
        let yhlcArr = []
        data.charts.forEach((val, index) => {
          yhArr.push(val.amount)
          yhlcArr.push(val.total)
        })
        var option = {
          color: ['#ff8a00', '#0492ea'],
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '3%',
            top: '16%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['高速', '国道', '省道', '县道', '乡道', '专道', '村道'],
              axisPointer: {
                type: 'shadow'
              },
              axisLine: {
                lineStyle: {
                  color: '#b7b4ac'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#646464',
                  fontSize: 13
                },
                interval: 0
              },
              axisTick: {
                inside: true,
                lineStyle: {
                  color: '#e7e7e7'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '(公里)',
              position: 'left',
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#646464',
                  fontSize: 13
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#b7b4ac'
                }
              },
              axisTick: {
                inside: true,
                lineStyle: {
                  color: '#e7e7e7'
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#e7e7e7']
                }
              }
            },
            {
              type: 'value',
              name: '(起)',
              position: 'right',
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: '#646464',
                  fontSize: 13
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#b7b4ac'
                }
              },
              axisTick: {
                inside: true,
                lineStyle: {
                  color: '#e7e7e7'
                }
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: ['#e7e7e7']
                }
              }
            }
          ],
          series: [
            {
              name: '公里',
              type: 'bar',
              data: yhlcArr,
              barWidth: 5,
              yAxisIndex: 0
            },
            {
              name: '起',
              type: 'bar',
              data: yhArr,
              barWidth: 5,
              yAxisIndex: 1
            }
          ]
        }
        that.minChart.chatObj.setOption(option)
        that.minChart.yhTimes = data.totalNum
        that.minChart.yhMile = data.totalMileage
      })
    },

    /**
     * 加载拥堵数据
     */
    loadMinTableData () {
      var that = this
      this.$http.getData(config.baseUrl + config.service.hyfx.netWorkEffect.minTable, {}, {}, function (data, msg) {
        that.minTable = data
        that.params.lineData = that.clusterLine
        that.params.pointType = 0   //拥堵点
        that.params.pointData = that.clusterPoint
      })
    },
    /**
     *  展开/收起行
     */
    minTabExpandChange (row, expandedRows) {
      if (expandedRows.length === 0) {
        // 收起时-展示拥堵点
        // 拥堵点
        this.params.pointType = 0
        this.params.pointData = this.clusterPoint
      } else {
        // 展开多条记录时，收回早先的记录，然后展示养护点
        if (expandedRows.length > 1) {
          this.$refs.minTable.toggleRowExpansion(expandedRows[0],false)
        }
        // 养护点
        this.params.pointType = 1
        this.params.pointData = row.data
      }
    },
    /**
     *  行选中处
     */
    minTabRowClick (row, event, column) {
      if (row === this.minCurrentRow) {
        this.minCurrentRow = null
        // 取消表格选中
        this.$refs.minTable.setCurrentRow(this.minCurrentRow = null)
        // 拥堵点
        this.params.pointType = 0
        this.params.pointData = this.clusterPoint
      } else {
        this.minCurrentRow = row
        // 养护点
        this.params.pointType = 1
        this.params.pointData = row.data
      }
    },
    handleCommand (command) {
      // debugger
      // this.$message('click on item ' + command)
      this.lzzfActionItem = command
      if (this.lzzfActionItem === '执法案件类型统计') {
        this.toRouter('/hyfx/caseTypeBar')
      } else if (this.lzzfActionItem === '涉案车辆归属地占比统计') {
        this.toRouter('/hyfx/carHomePie')
      } else if (this.lzzfActionItem === '治超处罚案由统计') {
        this.toRouter('/hyfx/caseReasonBar')
      } else if (this.lzzfActionItem === '治超货物类型占比统计') {
        this.toRouter('/hyfx/goodsTypePie')
      }
    },
    /**
     * 布局计算
     */
    setSize () {
      // const clientHeight = document.documentElement.clientHeight
      const clientHeight = this.params_in.fullHeight
      this.height = clientHeight - 68
      this.tableHeight = this.height - 500
      // console.log('clientHeight-jtll:' + clientHeight)
    }
  }
}
</script>
<style scoped>
  .itemTitle {
    padding-left: 10px;
    width: 100%;
    font-size: 16px;
    text-align: center;
  }
  .el-form {
    padding: 0 25px;
  }
  .bg-purple {
    background: #d3dce6;
    background: #ffffff url(../.././static/images/yhlc.png) no-repeat fixed top;
  }
  .yhlc-bg {
    width: 70px;
    height: 60px;
    background: #ffffff url(../.././static/images/yhlc.png) no-repeat top;
    color: #1c8de0;
    float: left;
  }
  .yhsj-bg {
    width: 70px;
    height: 60px;
    background: #ffffff url(../.././static/images/yhsj.png) no-repeat top ;
    color: #1c8de0;
    float: left;
  }
  .yh-content {
    font-family: ﻿MicrosoftYaHei;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 35px;
    letter-spacing: 0px;
    color: #333333;
  }
  .yh-title {
    font-family: ﻿MicrosoftYaHei;
    font-size: 10px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0;
    color: #333;
  }

  #minChart {
    margin-top: 15px;
    width: 350px;
    height: 200px;
  }

  .el-table {
    width: 100%;
    margin-top: 20px;
  }
  .el-table__body .el-table__expanded-cell {
    padding: 2px 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 15px;
  }
  .el-form {
    padding: 15px;
  }
</style>
