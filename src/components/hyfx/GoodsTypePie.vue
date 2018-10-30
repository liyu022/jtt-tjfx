<template>
  <div id="chart" :style="'height:'+ height +'px;'">
  </div>
</template>

<script>
  // import logger from "../../services/logger"
export default {
  name: 'GoodsTypePie',
  data () {
    return {
      title: '治超货物类型占比统计',
      chart: null,
      height: 100
    }
  },
  props: {
    params: {
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
    this.log.logging('JTYJ-APP-GLYX-TJFX', '养护施工', '治超货物类型占比统计')
    this.createChart()
    this.loadData()
  },
  watch: {
    'params.fullHeight' (val) {
      this.setSize()
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
      debugger
      var that = this
      this.$http.getData(config.baseUrl + config.service.hyfx.lzzfStatics.goodsType.chartData, {
        date: this.date,
        interval: this.params.interval
      }, {}, function (data, msg) {
        console.log(data)
        if (data) {
          var option = {
            title: {
              text: '',
              subtext: '',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: data.legend
            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            series: [
              {
                name: '货物类型',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: data.barDate
              }
            ]
          }
          that.chart.setOption(option)
        }
      })
    },
    /**
     * 布局计算
     */
    setSize () {
      const clientHeight = this.params.fullHeight === 0 ? document.documentElement.clientHeight:this.params.fullHeight
      this.height = clientHeight - 50
      console.log('this.height:' + clientHeight)
    }
  }
}
</script>
<style scoped>

</style>
