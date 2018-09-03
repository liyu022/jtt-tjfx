<template>
  <div id="chart" :style="'height:'+ height +'px;'">
  </div>
</template>

<script>
  // import logger from "../../services/logger"
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
        closeable: '-1',
        fullHeight:0
      }
    },
    created () {
      this.setSize()
    },
    mounted () {
      this.log.logging('JTYJ-APP-GLYX-TJFX','养护施工','养护施工时段统计查询')
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
      },
      'params.fullHeight' (val) {
        this.setSize()
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
          if(data){
            var option = {
              tooltip : {
                trigger: 'axis'
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: false},
                  dataView : {show: true, readOnly: false},
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
          }
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
