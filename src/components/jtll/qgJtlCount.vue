<template>
  <div id='chart' :style="'height:'+ height +'px;width:98%;'">
  </div>
</template>
<script>
  // import logger from '../../services/logger'
  import axios from 'axios'
  export default {
    name: '',
    data () {
      return {
        title: '全省高速公路交通量分析',
        chart: null,
        height: 100,
        maxValue: 0,
        charMapData: []
      }
    },
    props: {
      params: {
        carType: null,
        interval: null,
        dateYear: '',
        dateMonth: '',
        direction: null,
        fullHeight: 0,
        endTime: '',
        beginTime: ''
      }
    },
    computed: {
      /*  date: function () {
        return this.params.interval === 'y' ? this.params.dateYear : this.params.dateMonth
      }*/
    },
    created () {
      this.setSize()
    },
    mounted () {
      this.log.logging('JTYJ-APP-GLYX-TJFX', '交通流量', '全省高速公路交通量统计查询')
      this.initChar()
    },
    watch: {
     'params.fullHeight' (val) {
        this.setSize()
      },
      'params.dateYear' (val) {
        this.loadData()
      },
      'params.beginTime' (val) {
         if ((this.params.endTime !== null && this.params.endTime !== '') && (val !== null && val !== '')) {
           this.loadData()
         } else {
           return false
         }
      },
      'params.endTime' (val) {
        if ((this.params.beginTime !== null && this.params.beginTime !== '') && (val !== null && val !== '')) {
          this.loadData()
        } else {
          return false
        }
      }
    },
    methods: {
      initChar () {
        this.chart = echarts.init(document.getElementById('chart'))
        axios.get('/static/data/map/china.json', {}).then(res => {
          echarts.registerMap('chinaa', res.data)
          this.loadData()
        })
      },
      loadData () {
        axios.get("http://10.228.2.135:8804/lwgl-statanalysis/carCount/getWscltjAll", {
          params: {
            startDate: this.params.beginTime,
            endDate: this.params.endTime
          }}).then(res =>{
          this.charMapData=[]
          this.maxValue = 0
          if(res.data.data === null){
            this.$message({
              type: 'success',
              message: '查询无数据!'
            });
            return false
          }
          res.data.data.forEach((val, index) => {
            let map = {}
            map['name'] = val.name
            map['value'] = val.coun
            if (this.maxValue < val.coun) {
              this.maxValue = val.coun
            }
            this.charMapData.push(map)
          })
          this.chart.clear();
          if(this.maxValue > 0){
            this.intiChartMap()
          }
        })
      },
      intiChartMap () {
        let option = {
          title : {
            text: '陕西车辆外省分布图',
            subtext: '数据来自-陕西省交通运行检测中心',
            padding: [50, 500]
          },
          tooltip : {
            trigger: 'item'
          },
          toolbox: {
            show : true,
            orient: 'vertical',
            itemSize: 20,
            itemGap: 20,
            right: '20',
            top: 'center',
            color : ['#1e90ff','#22bb22','#4b0082'],
            feature : {
              dataView : {
                show : true,
                title : '数据视图',
                readOnly: true,
                lang : ['陕西省外省车辆分布图', '关闭', '刷新'],
                optionToContent: function(opt) {
                  let axisData = opt.series[1].data;
                  let table = '<table style="width:80%;text-align:center;0px;margin-left:20px;"><tbody><tr style="padding:0px;margin:0px;border-bottom:2px solid gray;">'
                          + '<td style="padding:10px 0px;margin:0px;border-bottom:1px solid gray;border-top:1px solid gray;font-weight: bold;">序号</td>'
                          + '<td style="padding:10px 0px;margin:0px;border-bottom:1px solid gray;border-top:1px solid gray;font-weight: bold;">分布区域</td>'
                          + '<td style="padding:10px 0px;margin:0px;border-bottom:1px solid gray;border-top:1px solid gray;font-weight: bold;">外省数量(辆)</td>'
                          + '</tr>';
                  for (let i = 0, l = axisData.length; i < l; i++) {
                    table += '<tr>'
                            + '<td style="padding:10px 0px;margin:0px;border-bottom:1px solid gray;">' + (i+1)+'</td>'
                            + '<td style="padding:10px 0px;margin:0px;border-bottom:1px solid gray;">' + axisData[i].name + '</td>'
                            + '<td style="padding:10px 0px;margin:0px;border-bottom:1px solid gray;">' + axisData[i].value + '</td>'
                            + '</tr>';
                  }
                  table += '</tbody></table>';
                  return table;
                }
              },
              restore : {show : true,iconStyle: {borderColor: '#59dd27'}},
              saveAsImage : {
                show : true,
                type : 'jpeg',
                iconStyle: {borderColor: '#2f2add'},
                lang : ['点击本地保存']
              }
            }
          },
          visualMap: {
            min: 0,
            max: this.maxValue,
            left: 'left',
            top: 'bottom',
            text: ['High','Low'],
            seriesIndex: [1],
            inRange: {
              color: ['#ffe4cb', '#dd2129']
            },
            calculable : true
          },
          geo: {
            map: 'chinaa',
            top: 100,
            aspectScale: 0.9,
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#070204'
                }
              }
            }
          },
          series : [
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: 'chinaa',
              itemStyle: {
                normal: {
                  color: '#F06C00'
                }
              }
            },
            {
              name: '陕西车辆外省分布图',
              type: 'map',
              geoIndex: 0,
              selectedMode : 'single',
              roam: true,
              scaleLimit: {
                max:2,
                min:1
              },
              itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
              },
              data: this.charMapData
            }
          ]
        };
        this.chart.clear();
        this.chart.setOption(option,true);
      },
      /**
       * 布局计算
       */
      setSize () {
        const clientHeight = this.params.fullHeight === 0 ? document.documentElement.clientHeight : this.params.fullHeight
        this.height = clientHeight - 100
        console.log('this.height:' + clientHeight)
      }
    }
  }
</script>

<style scoped>

</style>
