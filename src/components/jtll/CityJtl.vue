<template>
  <hd-map :style="'height:'+ mapHeight +'px;width:100%;'" :chartLayer="chartLayer" :lineData="lineData"></hd-map>
</template>

<script>
  import HdMap from '../common/HdMap.vue'
export default {
  name: "",
  components: {
    HdMap
  },
  data () {
    return {
      title: "各地市高速公路交通量统计",
      mapHeight: 500,
      chartLayer: null,
      lineData: []
    }
  },
  props: {
    params: {
      carType: null,
      interval: null,
      dateYear: '',
      dateMonth: '',
      direction: null,
      fullHeight:0
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
    this.loadData()
  },
  watch: {
    'params.fullHeight' (val) {
      this.setSize()
    },
    params: {
      handler(nV, oV) {
        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    /**
     * 加载图表数据
     */
    loadData () {
      var that = this
      this.$http.getData(config.baseUrl + config.service.jtll.cityJtl.chartData, {
        date: this.date,
        direction: this.params.direction,
        interval: this.params.interval
      }, {}, function (data, msg) {
        const options = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: "left",
            show: true,
            data: [],
            selectedMode: 'multiple'
          },
          grid: [],
          xAxis : [],
          yAxis : [],
          series: []
        }
        if (data) {
          data.forEach(function (item, index) {
            item.type = 'bar'
            item.barWidth = '15'
            item.xAxisIndex = index
            item.yAxisIndex = index
            item.itemStyle = {
              normal: {
                label : {
                  show: true, position: 'insideTop'
                }
              }
            }
            options.legend.data.push(item.name)
            options.grid.push({
              show: true,
              containLabel: false,
              borderWidth: 0,
              borderColor: '#fff',
              width: 35,
              height: 100
            })
            options.xAxis.push({
              type : 'category',
              show: true,
              gridIndex: index,
              nameTextStyle: {
                color: '#3c3c3c'
              },
              axisLine: {
                show: false,
                onZero: false
              },
              axisLabel: {
                show: false,
                interval: 0,
                rotate: -45,
                textStyle: {
                  color: '#3c3c3c',
                  fontSize: 10
                }
              },
              axisTick: {
                show: false
              },
              data : ['出口交通量','入口交通量']
            })
            options.yAxis.push({
              type: 'value',
              show: true,
              min: 0.001,
              splitLine: {show: false},
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false,
                onZero: false
              },
              nameGap: '1',
              axisTick: {
                show: false
              },
              nameTextStyle: {
                color: '#3c3c3c',
                fontSize: 14
              },
              gridIndex: index
            })
            options.series.push(item)
          })
        }

        that.chartLayer = new ol3Echarts(options, {
          hideOnMoving: true,
          hideOnZooming: true
        })
      })
    },
    /**
     *  加载路线
     */
    loadLine (lxbm) {
      var that = this
      this.$http.getData(config.service.jtll.cityJtl.lineData, {lxdm: lxbm}, {distcode: '610000'}, function (data, msg) {
        debugger
        that.lineData = data
      })
    },
    /**
     * 布局计算
     */
    setSize () {
      // const clientHeight = document.documentElement.clientHeight
      const clientHeight = this.params.fullHeight
      this.mapHeight = clientHeight - 70
      // console.log('clientHeight-city:' + clientHeight)
    }
  }
}
</script>

<style scoped>

</style>
