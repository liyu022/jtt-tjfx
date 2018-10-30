<template>
  <div id="chart" :style="'height:'+ height +'px;'">
  </div>
</template>

<script>
export default {
  name: 'CaseTypeBar',
  data () {
    return {
      title: '执法案件类型统计',
      chart: null,
      height: 100
    }
  },
  props: {
    params: {
      ajlx: null,
      interval: null,
      dateYear: '',
      dateMonth: '',
      fullHeight: 0
    }
  },
  computed: {
    date: function () {
      return this.params.interval === 'y' ? this.params.dateYear : this.params.dateMonth
    }
  },
  created () {
    this.setSize()
  },
  mounted () {
    this.log.logging('JTYJ-APP-GLYX-TJFX', '行业分析', '执法案件类型统计')
    this.createChart()
    this.loadData()
  },
  watch: {
    'params.fullHeight' (val) {
      this.setSize()
    },
    'params.ajlx' (val) {
      this.loadData()
    },
    'params.dateYear' (val) {
      this.loadData()
    },
    'params.dateMonth' (val) {
      this.loadData()
    }
  },
  methods: {
    createChart () {
      this.chart = echarts.init(document.getElementById("chart"))
    },
    loadData () {
      var that = this
      this.$http.getData(config.baseUrl + config.service.hyfx.lzzfStatics.caseType.chartData, {
        date: this.date,
        ajlx: this.params.ajlx,
        interval: this.params.interval
      }, {}, function (data, msg) {
        console.log(data)
        // // 万辆单位处理
        // let fxcclajtj = []
        // let ybajtj = []
        // let jyajtj = []
        // let date = []
        // if (data !== null) {
        //   data.fxcclajtj.forEach(function (item, index) {
        //     fxcclajtj.push((item / 10000).toFixed(2))
        //   })
        //   data.ybajtj.forEach(function (item, index) {
        //     ybajtj.push((item / 10000).toFixed(2))
        //   })
        //   data.jyajtj.forEach(function (item, index) {
        //     jyajtj.push((item / 10000).toFixed(2))
        //   })
        //   date = data.date
        // }
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          legend: {
            data: ['非现场处理案件', '一般案件', '简易案件', '环比']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true},
              saveAsImage: {
                show: true,
                excludeComponents: ['toolbox'],
                pixelRatio: 2
              }
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          // x轴显示
          xAxis: {
            data: data.date,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (value) {
                return value + (that.params.interval === 'y' ? '月' : '日')
              }
            }
          },
          // y轴显示
          yAxis: [
            {
              type: 'value',
              name: '执法案件数',
              splitLine: {
                show: false
              },
              axisLabel: {
                formatter: '{value} 起'
              }
            },
            {
              type: 'value',
              splitLine: {
                show: false
              },
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: [
            {
              name: '非现场处理案件',
              type: 'bar',
              stack: '业务',
              data: data.fxcclajtj
            },
            {
              name: '一般案件',
              type: 'bar',
              stack: '业务',
              data: data.ybajtj
            },
            {
              name: '简易案件',
              type: 'bar',
              stack: '业务',
              data: data.jyajtj
            },
            {
              name: '环比',
              type: 'line',
              yAxisIndex: 1,
              data: data.ringrate
            }
          ]
        }
        that.chart.setOption(option)
      })
    },
    /**
     * 布局计算
     */
    setSize () {
      const clientHeight = this.params.fullHeight === 0? document.documentElement.clientHeight:this.params.fullHeight
      this.height = clientHeight - 108
      console.log('this.height:' + clientHeight)
    }
  }
}
</script>
<style scoped>

</style>
