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
            <el-collapse v-model="lzzfActiveItem" accordion>
              <el-collapse-item title="执法案件类型统计" name="/hyfx/caseTypeBar">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="涉案车辆归属地占比统计" name="/hyfx/carHomePie">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="治超处罚案由统计" name="/hyfx/caseReasonBar">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="治超货物类型占比统计" name="/hyfx/goodsTypePie">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
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
  name: "Hyfx",
  data () {
    return {
      activeItem: "/hyfx/mainPeriod",
      lzzfActiveItem: '1',
      height: 100,               //内容区高度
      tableHeight: 700,         //表格高度
      params: {
        year: 'y',               //参数年
        closeable: '-1',        //是否关闭
        lineData:[],             //拥堵线数据
        pointData: [],            //拥堵点数据
        fullHeight:0
      },
      minChart: {
        chatObj: null,
        yhTimes: 0,                //养护起数
        yhMile: 0                  //养护里程
      },
      minTable: [],                //拥堵数据
      minCurrentRow: null         //拥堵表当前行
    }
  },
  props: {
    params_in: {
      fullHeight:0
    }
  },
  computed: {
    //拥堵线
    clusterLine: function(){
      let lineArr = []
      if(this.minTable) {
        this.minTable.forEach((item, index) => {
          if(item.geometry){
            lineArr.push({
              geometry: item.geometry,
              geometryType:item.geometryType
            })
          }
        });
      }
      return lineArr
    },
    //拥堵点
    clusterPoint: function(){
      let pointArr = []
      if(this.minTable) {
        this.minTable.forEach((item, index) => {
          if(item.data){
            let cnt = item.data.length;
            pointArr.push({
              id: item.id,
              geometry:item.data[parseInt(cnt/2)]['centerPoint'],
              geometryType: 'Point'
            })
          }
        });
      }
      return pointArr
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
      debugger
      if (item != null) {
        this.toRouter(item)
        if(item === '/hyfx/networkEffect'){
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
    minTabExpandChange (row, expandedRows){
      if(expandedRows.length == 0){
        //收起时-展示拥堵点
        this.params.pointType = 0   //拥堵点
        this.params.pointData = this.clusterPoint
      }else {
        //展开多条记录时，收回早先的记录，然后展示养护点
        if(expandedRows.length > 1){
          this.$refs.minTable.toggleRowExpansion(expandedRows[0],false)
        }
        this.params.pointType = 1    //养护点
        this.params.pointData = row.data
      }
    },
    /**
     *  行选中处
     */
    minTabRowClick (row, event, column) {
      if(row == this.minCurrentRow) {
        this.minCurrentRow = null
        this.$refs.minTable.setCurrentRow(this.minCurrentRow = null)  //取消表格选中
        this.params.pointType = 0   //拥堵点
        this.params.pointData = this.clusterPoint
      }else {
        this.minCurrentRow = row
        this.params.pointType = 1     //养护点
        this.params.pointData = row.data
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
</style>
