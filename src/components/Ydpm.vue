<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card class="box-card">
        <el-collapse v-model="activeItem" accordion @change="changeItem">
          <el-collapse-item name="current">
            <template slot="title" >
              <span class="itemTitle">实时路况拥堵排名</span>
            </template>
            <span class="cur_title">数据刷新时间：{{updateTime}}</span>
            <el-button icon="el-icon-refresh" size="small" style="float: right;" @click="reload"></el-button>
            <el-table :data="ydListData" :max-height="tableHeight" highlight-current-row @current-change="listRowClick" style="width: 100%; cursor:pointer;">
              <el-table-column  type="index" :index="genIndex" label="排名" align="center">
                <template slot-scope="scope">
                  <el-button v-if="(scope.$index + 1) < 10" type="danger" circle size="mini">&nbsp;{{(scope.$index +1)}}</el-button>
                  <el-button v-else-if="(scope.$index + 1) == 10" type="danger" circle size="mini">{{(scope.$index +1)}}</el-button>
                  <el-button v-else type="success" circle size="mini">{{(scope.$index +1)}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="lxmc" label="路线名称" align="center">
              </el-table-column>
              <el-table-column prop="lc" label="路程里程" align="center">
              </el-table-column>
              <el-table-column prop="len" label="拥堵里程" align="center">
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="history">
            <template slot="title" >
              <span class="itemTitle">历史路况趋势分析</span>
            </template>
            <el-row>
              <el-col :span="24">
                <el-date-picker
                  v-model="his.dateRange"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="his.pickerOptions">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" style="padding-top: 5px;">
              <el-col :span="22">
                <el-slider v-model="his.timeIndex" :format-tooltip="formatSliderTooltip" :max="max" @change="playSliderTo"></el-slider>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" :gutter="20">
              <el-col :span="6"><el-button icon="el-icon-caret-right" size="small" round :disabled="his.isPlay" @click="play()">播放</el-button></el-col>
              <el-col :span="6"><el-button icon="el-icon-sort" size="small" round :disabled="!his.isPlay" @click="pause()">暂停</el-button></el-col>
              <el-col :span="6"><el-button icon="el-icon-d-arrow-right" size="small" round :disabled="!his.isPlay" @click="fast">快X{{ step}}</el-button></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table :data="ydListData" :max-height="tableHeightHis" :cell-style="hisTabStyle" highlight-current-row style="width: 100%; cursor:pointer;">
                  <el-table-column  type="index" :index="genIndex" label="排名" align="center">
                    <template slot-scope="scope">
                      <el-button v-if="(scope.$index + 1) < 10" type="danger" circle size="mini">&nbsp;{{(scope.$index +1)}}</el-button>
                      <el-button v-else-if="(scope.$index + 1) == 10" type="danger" circle size="mini">{{(scope.$index +1)}}</el-button>
                      <el-button v-else type="success" circle size="mini">{{(scope.$index +1)}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="LXMC" label="路线名称" align="center">
                  </el-table-column>
                  <el-table-column prop="CNT" label="累计次数" align="center">
                  </el-table-column>
                  <el-table-column prop="LEN" label="累计里程" align="center">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
    <el-col :span="19">
      <hd-map :style="'height:'+ mapHeight +'px;width:100%;'" :chartLayer="chartLayer" :lineLayer="lineLayer"></hd-map>
    </el-col>
  </el-row>
</template>

<script>

import HdMap from './common/HdMap.vue'

export default {
  name: 'Ydpm',
  components: {
    HdMap
  },
  data () {
    return {
      timer: null,
      timeOut: 1000 * 60 * 5,
      // timeOut: 1000 * 2,
      title: '拥堵排名',
      tableHeight: 100,
      tableHeightHis: 100,
      mapHeight: 500,
      updateTime: new Date().toLocaleString(),
      ydListData: [],
      chartLayer: null,
      lineLayer: null,
      activeItem: 'current',
      his: {
        dateRange: [],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '五一长假',
            onClick (picker) {
              const start = new Date()
              start.setMonth(4, 1)
              start.setHours(0, 0, 0, 1)
              const end = new Date()
              end.setMonth(4, 3)
              end.setHours(0, 0, 0, 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '十一长假',
            onClick (picker) {
              const start = new Date()
              start.setMonth(9, 1)
              start.setHours(0, 0, 0, 1)
              const end = new Date()
              end.setMonth(9, 7)
              end.setHours(0, 0, 0, 1)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        timeRange: [],
        timeIndex: 0,
        isPlay: false,
        timeOut: 1000 * 1,
        speed: 0
      }
    }
  },
  computed: {
    startDate: function () {
      let date = this.his.dateRange[0]
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    endDate: function () {
      let date = this.his.dateRange[1]
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    step: function () {
      return Math.pow(2, this.his.speed)
    },
    max: function () {
      return this.his.timeRange.length
    }
  },
  props: {
    params_in: {
      fullHeight: 0
    }
  },
  created () {
    this.setSize()
  },
  mounted () {
    this.getUserId()
    this.log.logging('JTYJ-APP-GLYX-TJFX', '拥堵排名', '进入拥堵排名页面')
    this.changeItem(this.activeItem)
  },
  destroyed: function () {
    clearInterval(this.timer)
  },
  watch: {
    'params_in.fullHeight' (val) {
      this.setSize()
    },
    'his.dateRange' (nValue, oValue) {
      this.reload_his()
    },
    'his.timeIndex' (nValue, oValue) {
      if (this.his.timeIndex >= this.his.timeRange.length) {
        this.finish()
      }
    }
  },
  methods: {
    changeItem (item) {
      // console.log('changeItem:' + item)
      if (item === 'current') {
        this.chartLayer = null
        this.lineLayer = null
        this.ydListData = null
        clearInterval(this.timer)
        this.reload()
        this.setTimer()
      } else if (item === 'history') {
        // 历史路况趋势分析 - 日期控件初始化
        if (this.his.dateRange.length === 0) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          this.his.dateRange = [start, end]
        }
        this.chartLayer = null
        this.lineLayer = null
        this.ydListData = null
        clearInterval(this.timer)
        this.reload_his()
      }
    },
    getUserId () {
      // const userId = window.location.search.split('=')[1]
      sessionStorage.setItem('userId', window.location.search.split('=')[1])
    },
    setTimer: function () {
      let that = this
      this.timer = setInterval(() => {
        that.reload()
      }, this.timeOut)
    },
    /**
     * 自动生成拥堵列表行号
     * @param index
     * @returns {*}
     */
    genIndex (index) {
      return index
    },
    /**
     * 点击拥堵列表
     * @param currentRow
     * @param oldRow
     */
    listRowClick (currentRow, oldRow) {
      // debugger
      // const lxbm = (currentRow && currentRow.lxbm)?currentRow.lxbm:''
      this.loadLine(currentRow.lxbm)
    },
    /**
     * 重新刷新数据
     */
    reload () {
      // console.log('reload...........')
      this.updateTime = new Date().toLocaleString()
      this.lineData = null
      this.loadListData()
      this.loadHeatData()
    },
    /**
     * 加载拥堵列表
     */
    loadListData () {
      var that = this
      this.$http.getData(config.baseUrl + config.service.ydpm.ydList, {}, {}, function (data, msg) {
        that.ydListData = data
      })
    },
    /**
     * 加载热力数据
     */
    loadHeatData () {
      var that = this
      this.$http.getData(config.baseUrl + config.service.ydpm.ydHeatData, {}, {}, function (data, msg) {
        const option = {
          title: {
            text: '',
            subtext: '',
            sublink: '',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          backgroundColor: 'transparent',
          legend: {
            show: false
          },
          visualMap: {
            min: 0,
            max: 1,
            splitNumber: 5,
            inRange: {
              // color: ['#f00', '#0f0', '#00f'].reverse()
              color: ['#f00', '#eac736', '#50a3ba'].reverse()
            },
            textStyle: {
              color: '#5fa0ff'
            }
          },
          series: [{
            name: 'AQI',
            type: 'heatmap',
            coordinateSystem: 'openlayers',
            data: data
          }]
        }
        that.chartLayer = new ol3Echarts(option, {
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
      this.$http.getData(config.service.ydpm.lineData, {lxdm: lxbm}, {distcode: '610000'}, function (data, msg) {
        that.lineLayer = {
          data: data,
          parames: {
            layerName: 'ydLine',
            zoomToExtent: true,
            selectable: true,
            style: {
              stroke: {
                strokeColor: '#1115ff',
                strokeWidth: 3
              }
            },
            selectStyle: {
              stroke: {
                strokeColor: '#D81E06',
                strokeWidth: 3
              }
            }
          }
        }
      })
    },
    /**
     * 重新刷新数据
     */
    reload_his () {
      // console.log('reload_his...........')
      this.lineData = null
      this.chartLayer = null
      this.loadListData_his()
    },
    /**
     * 加载拥堵列表
     */
    loadListData_his () {
      this.his.timeRange = []
      this.ydListData = []
      this.finish()
      var that = this
      this.$http.getData(config.baseUrl + config.service.ydpm.ydHisList, {
        startDate: this.startDate,
        endDate: this.endDate
      }, {}, function (data, msg) {
        if (data) {
          that.ydListData = data.ydData
          that.his.timeRange = data.timeData
        }
      })
    },
    /**
     * 开始播放
     */
    play () {
      this.his.isPlay = true
      let that = this
      if (this.his.timeRange.length > 0) {
        this.timer = setInterval(() => {
          var sjsj = that.his.timeRange[that.his.timeIndex]['SJSJ']
          that.loadHeatData_his(sjsj)
          that.his.timeIndex = that.his.timeIndex + this.step
        }, this.his.timeOut)
      } else {
        this.$message('无可播放数据!')
      }
    },
    /**
     * 暂停
     */
    pause () {
      this.his.isPlay = false
      clearInterval(this.timer)
    },
    /**
     * 快进
     */
    fast () {
      if (this.his.speed < 3) {
        this.his.speed = this.his.speed + 1
      } else {
        this.his.speed = 0
      }
      this.pause()
      this.play()
    },
    /**
     * 播放完成
     */
    finish () {
      clearInterval(this.timer)
      this.his.isPlay = false
      this.his.timeIndex = 0
      this.his.speed = 0
    },
    /**
     * 加载热力数据
     */
    loadHeatData_his (sjsj) {
      console.log('loadHeatData_his-' + sjsj)
      var that = this
      this.$http.getData(config.baseUrl + config.service.ydpm.ydHisHeatData, {
        sjsj: sjsj
      }, {}, function (data, msg) {
        const option = {
          title: {
            text: '',
            subtext: '',
            sublink: '',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          backgroundColor: 'transparent',
          legend: {
            show: false
          },
          visualMap: {
            min: 0,
            max: 1,
            splitNumber: 5,
            inRange: {
              // color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
              color: ['#f00', '#eac736', '#50a3ba'].reverse()
            },
            textStyle: {
              color: '#5fa0ff'
            }
          },
          series: [{
            name: 'AQI',
            type: 'heatmap',
            coordinateSystem: 'openlayers',
            data: data
          }]
        }
        that.chartLayer = new ol3Echarts(option, {
          hideOnMoving: true,
          hideOnZooming: true
        })
      })
    },
    /**
     * 样式函数
     */
    hisTabStyle ({row, column, rowIndex, columnIndex}) {
      // console.log('hisTabStyle:' + rowIndex + ',' + columnIndex)
      if (rowIndex < 10 && columnIndex === 3) {
        // 设置 - 排名前10位的‘累计里程’样式
        return 'color:#F56C6C'
      }
    },
    formatSliderTooltip (val) {
      // console.log('formatSliderTooltip--:' + val)
      return this.his.timeRange[val] ? new Date(this.his.timeRange[val]['SJSJ']).format('yyyy-MM-dd hh:mm:ss') : ''
    },
    playSliderTo (val) {
      // console.log('playTo--:' + val)
      this.his.timeIndex = val
    },
    /**
     * 布局计算
     */
    setSize () {
      // const clientHeight = document.documentElement.clientHeight
      const clientHeight = this.params_in.fullHeight
      this.tableHeight = clientHeight - 265
      this.tableHeightHis = clientHeight - 326
      this.mapHeight = clientHeight - 66
      // console.log('clientHeight-ydpm:' + clientHeight)
    }
  }
}
</script>

<style scope>
  .itemTitle {
    padding-left: 10px;
    width: 100%;
    font-size: 16px;
    text-align: center;
  }
  .cur_title {
    color:#7a7a7a;
    padding-left: 9px;
  }
  .play {
    width: 30px;
    height: 30px;
    background:url('/static/images/player/play.png');
    background-size:100%;
    cursor: pointer;
  }
  .pause {
    width: 30px;
    height: 30px;
    background:url('/static/images/player/pause.png');
    background-size:100%;
    cursor: pointer;
  }
  .fast {
    width: 30px;
    height: 30px;
    background:url('/static/images/player/fast.png');
    background-size:100%;
    cursor: pointer;
  }
</style>
