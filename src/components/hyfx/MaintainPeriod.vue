<template>
  <div id="chart" :style="'height:'+ height +'px;'">
  </div>
</template>

<script>
  export default {
    name: "",
    data () {
      return {
        title: "养护施工时段统计",
        chart: null,
        height: 100
      }
    },
    props: {
      params: {
        year: '',
        closeable: '-1'
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
          console.log("params-"+ nV)
          console.log("params-"+ this.params)
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
        // debugger
        var that = this
        this.$http.getData(config.baseUrl + config.service.hyfx.maintainPeriod.chartData, {
          year: this.params.year,
          closeable: this.params.closeable
        }, {}, function (data, msg) {
          console.log(data)
          var option = {
            tooltip : {
              trigger: 'axis'
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType: {show: false, type: ['line', 'bar']},
                restore : {show: false},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            legend: {
              data:['养护里程','养护起数']
            },
            xAxis : [
              {
                type : 'category',
                data : data.date
              }
            ],
            yAxis : [
              {
                type : 'value',
                name : '里程',
                axisLabel : {
                  formatter: '{value} 公里'
                }
              },
              {
                type : 'value',
                name : '起数',
                axisLabel : {
                  formatter: '{value} 起'
                }
              }
            ],
            series : [
              {
                name:'养护里程',
                type:'bar',
                data:data.miles
              },
              {
                name: '养护起数',
                type:'line',
                yAxisIndex: 1,
                data: data.times
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
        const clientHeight = document.documentElement.clientHeight
        this.height = clientHeight - 108
        console.log('this.height:' + clientHeight)
      }
    }
  }
</script>
<style scoped>

</style>
