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
export default {
  name: "Hyfx",
  data () {
    return {
      activeItem: "/hyfx/mainPeriod",
      height: 100,
      params: {
        year: 'y',
        closeable: '-1'
      },
      minChart: {
        chatObj: null,
        yhTimes: 0,                //养护起数
        yhMile: 0                  //养护里程
      }
    }
  },
  computed: {
  },
  created () {
    this.setSize()
    this.init()
    this.changeItem(this.activeItem)
  },
  mounted () {
    this.createMinChart()
  },
  methods: {
    init () {
      this.params.year = new Date().getFullYear().toString()
    },
    createMinChart () {
      this.minChart.chatObj = echarts.init(document.getElementById("minChart"))
    },
    changeItem (item) {
      if (item != null) {
        this.toRouter(item)
        if(item === '/hyfx/networkEffect'){
          this.loadMinChartData()
        }
      }
    },
    toRouter (path) {
      this.$router.push(path)
    },
    onSubmit() {
      console.log('submit!')
    },
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
     * 布局计算
     */
    setSize () {
      const clientHeight = document.documentElement.clientHeight
      this.height = clientHeight - 68
      console.log('this.height:' + this.height)
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
</style>
