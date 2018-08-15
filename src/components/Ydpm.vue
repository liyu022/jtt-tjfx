<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>数据刷新时间：{{updateTime}}</span>
          <el-button icon="el-icon-refresh" size="small" style="float: right;" @click="reload"></el-button>
        </div>
        <el-table :data="ydListData" :max-height="tableHeight" highlight-current-row @current-change="listRowClick" style="width: 100%">
          <el-table-column  type="index" :index="genIndex" label="排名" align="center">
            <template slot-scope="scope">
              <el-button v-if="(scope.$index +1) < 10" type="danger" circle size="mini">&nbsp;{{(scope.$index +1)}}</el-button>
              <el-button v-else-if="(scope.$index +1) < 10" type="danger" circle size="mini">&nbsp;{{(scope.$index +1)}}</el-button>
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
      title: '拥堵排名',
      tableHeight: 100,
      mapHeight: 500,
      updateTime: new Date().toLocaleString(),
      ydListData: [],
      chartLayer: null,
      lineLayer: null
    }
  },
  props: {
    params: {
      fullHeight:0
    }
  },
  created () {
    this.setSize()
  },
  mounted () {
    this.loadListData()
    this.reload()
  },
  watch: {
    params: {
      handler(nV, oV) {
        this.setSize()
      },
      deep: true
    }
  },
  methods: {
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
      const lxbm = (currentRow && currentRow.lxbm)?currentRow.lxbm:''
      this.loadLine(currentRow.lxbm)
    },
    /**
     * 重新刷新数据
     */
    reload () {
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
          visualMap: {
            min: 0,
            max: 1,
            splitNumber: 5,
            inRange: {
              color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
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
     * 布局计算
     */
    setSize () {
      //const clientHeight = document.documentElement.clientHeight
      const clientHeight = this.params.fullHeight
      this.tableHeight = clientHeight - 166
      this.mapHeight = clientHeight - 66
      console.log('this.mapHeight:' + this.mapHeight)
    }
  }
}
</script>

<style scope>
</style>
