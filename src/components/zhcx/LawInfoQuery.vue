<template>
  <div>
    <div class="query-wrap">
      <el-form :inline="true" :model="parames" size="small">
      <el-row>
        <el-col :span="5">
          <el-form-item label="案件编号">
            <el-input v-model="parames.ajbh" placeholder="案件编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="案件名称">
            <el-input v-model="parames.ajmc" placeholder="案件名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="案件类型">
            <el-select v-model="parames.ajlx" placeholder="案件类型">
              <el-option
                v-for="item in ajlxOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="涉案车牌">
            <el-input v-model="parames.ajclzcph" placeholder="涉案车牌"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="5">
          <el-form-item label="执法机构">
            <el-input v-model="parames.zfjgmc" placeholder="执法机构名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="处理日期">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="时间开始"
              end-placeholder="时间结束"
              :picker-options="pickerOptions"
              :default-time="['00:00:00']">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="text-align:left;">
          <el-button icon="el-icon-search" size="small" @click="getList" style="margin-left: 68px;">检索</el-button>
          <el-button icon="el-icon-close" size="small" @click="clearParames">清除</el-button>
        </el-col>
      </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
          <hr>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            border
            stripe
            v-loading="loading"
            :data="tableData"
            :max-height="tableHeight">
            <el-table-column
              prop="ROW_ID"
              fixed
              label="序号" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJBH"
              label="案件编号" width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJMC"
              label="案件名称"  width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="CLJD"
              label="案件处理进度"  width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJCLR"
              label="案件处理人" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="WFNR"
              label="违法内容"
              width="1200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="WFSJ"
              label="违法时间" width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJCLDD"
              label="案件处理地点"  width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJLX"
              label="案件类型" width="100" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJCLZCPH"
              label="案件处理中车牌号" width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJCLRQ"
              label="案件处理日期" width="200" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="AJCLYY"
              label="案件处理原因" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="ZFRSZDW"
              label="执法人员所在单位" width="150" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="ZFJGMC"
              label="执法机构名称"  width="150" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="ZXQK"
              label="执行情况" width="100" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="ZFRXM"
              label="执法人姓名" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="ZFRZJH"
              label="执法人证件号" width="150" header-align="center" align="center">
            </el-table-column>
            <el-table-column
              prop="ZFRXM1"
              label="受理人" header-align="center" align="center">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-pagination  layout="total, prev, pager, next" :total="tableDataTotal"
                          :current-page="parames.pageNum" :page-sizes="[10, 50, 100, 200]" @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LawInfoQuery',
  data () {
    return {
      title: '路政执法信息查询',
      tableHeight: 700,
      dateRange: [],
      ajlxOpts: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '一般'
      }, {
        value: '2',
        label: '简易'
      }, {
        value: '3',
        label: '非现场处理'
      }],
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
      parames: {
        ajbh: '',
        ajmc: '',
        ajlx: '0',
        ajclzcph: '',
        zfjgmc: '',
        begintime: '',
        endtime: '',
        pageNum: 1,
        pageSize: 20
      },
      loading: false,
      tableDataTotal: 1000,
      tableData: [
        {
          'AJMC': '王平安损坏路产',
          'ZFRXM1': '郝志龙',
          'WFDD': '清渭线K201+261M下行',
          'ZFRZJH': ' 6126101192',
          'AJLX': '3',
          'AJCLRQ': '2016-12-30 09:20:19',
          'WFSJ': 1483057819000,
          'ZFRSZDW': '黄龙公路管理段',
          'ZFJGMC': '延安公路管理局',
          'ZFRXM': '郝志龙',
          'AJCLDD': '清渭线K201+261M下行',
          'ROW_ID': 1,
          'AJBH': '黄龙公路管理段20171',
          'ZXQK': '罚款2460元',
          'AJCLZCPH': '陕JWL895',
          'AJCLR': '郝志龙',
          'WFNR': '2016年12月30日当事人王平安驾驶陕JWL895车辆行驶在清渭线K201+261M处时由于驾驶不当造成水泥混凝土路面厚18cm 10*120元/平方米;里程碑国标 12*100元/块;土路肩 6*10元/延米',
          'CLJD': '清渭线K201+261M下行'
        }
      ]
    }
  },
  props: {
    params: {
      fullHeight: 0
    }
  },
  computed: {},
  watch: {
    field: function (preVal, newVal) {
      console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
    },
    'params.fullHeight' (val) {
      this.setSize()
    },
    dateRange (nValue, oValue) {
      if (this.dateRange.length === 2) {
        let sdate = this.dateRange[0]
        let edate = this.dateRange[1]
        this.parames.begintime = sdate.format('yyyy-MM-dd hh:mm:ss')
        this.parames.endtime = edate.format('yyyy-MM-dd hh:mm:ss')
      } else {
        this.parames.begintime = ''
        this.parames.endtime = ''
      }
    }
  },
  created () {
    console.log('component created')
    this.setSize()
  },
  mounted () {
    console.log('component mounted')
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      var that = this
      this.$http.getData(config.baseUrl + config.service.zhcx.lawInfoQuery.listData, this.parames, {}, function (data, total) {
        if (data !== null) {
          that.tableData = data
          that.tableDataTotal = total
        } else {
          that.tableData = []
          that.tableDataTotal = 0
        }
        that.loading = false
      })
    },
    clearParames () {
      console.log('导出数据1')
      this.parames.ajbh = ''
      this.parames.ajmc = ''
      this.parames.ajlx = '0'
      this.parames.ajclzcph = ''
      this.parames.zfjgmc = ''
      this.dateRange = []
    },
    handleSizeChange (val) {
      console.log('每页: ' + val + '条')
      this.parames.pageSize = val
    },
    handleCurrentChange (val) {
      console.log('当前页: ' + val + '页 ')
      this.parames.pageNum = val
      this.getList()
    },
    /**
     * 布局计算
     */
    setSize () {
      const clientHeight = this.params.fullHeight === 0 ? document.documentElement.clientHeight : this.params.fullHeight
      this.tableHeight = clientHeight - 220
      console.log('this.tableHeight:' + clientHeight)
    }
  },
  destroyed: function () {
  },
  components: {}
}
</script>

<style scoped>
  .query-wrap {
    padding: 5px;
  }
  hr {
    border:none;border-top:1px dashed #7c8196;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-row {
    /*border: 1px solid red;*/
  }
  .el-col {
    /*border: 1px solid green;*/
  }
</style>
