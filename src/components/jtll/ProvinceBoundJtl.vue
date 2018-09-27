<template>
  <hd-map :style="'height:'+ mapHeight +'px;width:100%;'" :chartLayer="chartLayer"></hd-map>
</template>

<script>
import HdMap from '../common/HdMap.vue'
// import logger from "../../services/logger"
export default {
  name: '',
  components: {
    HdMap
  },
  data () {
    return {
      title: '高速公路断面交通量统计',
      mapHeight: 500,
      chartLayer: null
    }
  },
  props: {
    params: {
      carType: null,
      interval: null,
      dateYear: '',
      dateMonth: '',
      direction: null,
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
    this.log.logging('JTYJ-APP-GLYX-TJFX', '交通流量', '省界高速公路交通量统计查询')
    this.loadData()
  },
  watch: {
    'params.fullHeight' (val) {
      this.setSize()
    },
    params: {
      handler (nV, oV) {
        this.loadData()
      },
      deep: true
    }
  },
  methods: {
    loadData () {
      var that = this
      this.$http.getData(config.baseUrl + config.service.jtll.provinceBoundJtl.chartData, {
        date: this.date,
        direction: this.params.direction,
        interval: this.params.interval,
        carType: this.params.carType
      }, {}, function (data, msg) {
        // console.log(data)
        if (data) {
          var options = that.getOptFromData(data)
          that.chartLayer = new ol3Echarts(options)
        }
      })
    },

    getOptFromData (data) {
      this.coordMap = data.coordMap
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.data.fromName) {
              return params.data.fromName + ' > ' + params.data.toName + '(辆)' + ' <br/>交通量 : ' + (params.data.fromValue).toLocaleString()
            } else {
              return '从' + params.name + '<br/>驶入的交通量：' + params.value[2]
            }
          }
        },
        legend: {
          orient: 'vertical',
          top: 'middle',
          left: 'right',
          data: [],
          textStyle: {
            color: '#5fa0ff'
          },
          selectedMode: 'mutipla'
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: '#fff'
          },
          bottom: '10%'
        }
      }
      for (var name in this.coordMap) {
        options.legend.data.push(name)
      }
      options.series = this.getSeriesFromData(data)
      return options
    },
    getSeriesFromData (data) {
      var series = []
      var seriesData = []
      var color = ['#a6c84c', '#ffa022', '#46bee9', '#ff3399', '#D15FEE', '#826FC8', '#8E3CC8', '#C865A3', '#B5C8B3']
      for (var name in data) {
        if (name !== 'coordMap') {
          var temp = []
          temp.push(name)
          temp.push(data[name])
          seriesData.push(temp)
        }
      }
      seriesData.forEach((item, i) => {
        series.push(
          {
            name: item[0],
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.6,
              color: '#5d1789',
              symbolSize: 3.5,
              shadowBlur: 1
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
              }
            },
            data: this.convertData_sx(item[1])
          },
          {
            name: item[0],
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 15,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbolSize: 6
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 3,
                opacity: 0.3,
                curveness: 0.2
              }
            },
            data: this.convertData_sx(item[1])
          },
          {
            name: item[0],
            type: 'effectScatter',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: false,
                position: 'top',
                formatter: '{b}'
              }
            },
            symbolSize: function (val) {
              return 10
            },
            itemStyle: {
              normal: {
                color: color[i]
              }
            },
            data: item[1].map((dataItem) => {
              return {
                name: dataItem[1].name,
                value: this.coordMap[dataItem[1].name].concat([dataItem[1].value])
              }
            })
          })
      })

      return series
    },

    convertData_sx (data) {
      // debugger
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = this.coordMap[dataItem[0].name]
        var toCoord = this.coordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            fromValue: dataItem[1].value,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord]
          })
        }
      }
      return res
    },
    /**
     * 布局计算
     */
    setSize () {
      // const clientHeight = document.documentElement.clientHeight
      const clientHeight = this.params.fullHeight === 0 ? document.documentElement.clientHeight : this.params.fullHeight
      this.mapHeight = clientHeight - 70
      // console.log('this.mapHeight:' + this.mapHeight)
    }
  }
}
</script>
<style scoped>

</style>
