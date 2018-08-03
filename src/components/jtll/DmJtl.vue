<template>
<div id="chart" :style="'height:'+ height +'px;'">
</div>
</template>

<script>
export default {
  name: "Dmjtl",
  data () {
    return {
      title: "高速公路断面交通量统计",
      chart: null,
      height: 100,
    }
  },
  props: {
    params: {
      carType: null,
      interval: null,
      dateYear: '',
      dateMonth: '',
      direction: null
    }
  },
  computed: {
    date: function () {
      return this.params.interval === 'y'? this.params.dateYear:this.params.dateMonth
    }
  },
  created () {
    this.setSize()
  },
  mounted () {
    this.createChart()
    this.loadData()
  },
  watch: {
    params: {
      handler(nV, oV) {
        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    createChart () {
      this.chart = echarts.init(document.getElementById("chart"))
    },
    loadData () {
      var that = this
      console.log("date-"+ this.date)
      this.$http.getData('http://10.228.2.135:8813/trffic-flow/statTrafficSection', {
        date: this.date,
        carType: this.params.carType,
        interval: this.params.interval
      }, {}, function (data, msg) {
        debugger
        that.chart.setOption({
          title: {
            text: "高速公路断面交通量统计",
              textStyle: {
              color: "#436EEE",
                fontSize: 17
            }
          },
          tooltip: {
            trigger: "axis",
              axisPointer: {
              type: 'line'
            }
          },
          legend: {
            data: ["客车", "货车"]
          },
          grid: {
            left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
          },
          //x轴显示
          xAxis: {
            data: data.name,
            splitLine: {
              show: false
            }
          },
          //y轴显示
          yAxis: [
            {
              type: 'value',
              name: '车辆',
              splitLine: {
                show: false
              },
              axisLabel: {
                formatter: '{value}辆'
              }
            }
          ],
            series: [
            {
              name: "客车",
              type: "bar",
              stack: "业务",
              data: data.kcjtl
            },
            {
              name: "货车",
              type: "bar",
              stack: "业务",
              data: data.hcjtl,
            }
          ]
        })
      })
    },
    /**
     * 布局计算
     */
    setSize () {
      const clientHeight = document.documentElement.clientHeight
      this.height = clientHeight - 108
      console.log('this.height:' + clientHeight)
    }
  }
}
</script>

<style scoped>

</style>
