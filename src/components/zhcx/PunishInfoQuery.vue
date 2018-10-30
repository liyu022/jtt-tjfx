<template>
  <div>
    <div class="query-wrap">
      <el-form :inline="true" :model="parames" size="small">
        <el-row>
          <el-col :span="4.5">
            <el-form-item label="车牌号码">
              <el-input v-model="parames.chepaihao" placeholder="车牌号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="运输证号">
              <el-input v-model="parames.daoluyunzh" placeholder="道路运输证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="决定书号">
              <el-input v-model="parames.chufashuhao" placeholder="处罚决定书编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="案由">
              <el-select v-model="parames.anyou" placeholder="案由">
                <el-option
                  v-for="item in anyouOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="4.5">
            <el-form-item label="货物名称">
              <el-input v-model="parames.huowumingc" placeholder="货物名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="处罚日期">
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
          <el-col :span="4" style="text-align: left;">
            <el-button icon="el-icon-search" size="small"  @click="getList">检索</el-button>
            <el-button icon="el-icon-printer" size="small"  @click="clearParames">清除</el-button>
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
              label="序号">
            </el-table-column>
            <el-table-column
              prop="CHEPAIHAO"
              label="车牌号码" width="150">
            </el-table-column>
            <el-table-column
              prop="DAOLUYUNZH"
              label="道路运输证号" width="250">
            </el-table-column>
            <el-table-column
              prop="ZHIFAYIJU"
              label="执法依据" width="300">
            </el-table-column>
            <el-table-column
              prop="ANYOU"
              label="案由" width="150">
            </el-table-column>
            <el-table-column
              prop="CHENGYUNRENADDRESS"
              label="承运人地址"
              width="350">
            </el-table-column>
            <el-table-column
              prop="CHENGYUNREN"
              label="承运人名称" width="300">
            </el-table-column>
            <el-table-column
              prop="SHIFOUFEIFAGAIZHANG"
              label="是否非法改装">
            </el-table-column>
            <el-table-column
              prop="GAIZHUANGSHUOM"
              label="非法改装说明">
            </el-table-column>
            <el-table-column
              prop="SHIFOUBIAOZHUNCHE"
              label="是否非标准车辆">
            </el-table-column>
            <el-table-column
              prop="JIASHIZHENG"
              label="驾驶证号">
            </el-table-column>
            <el-table-column
              prop="CONGYEZIGEZHENG"
              label="从业人员资格证号"  width="200">
            </el-table-column>
            <el-table-column
              prop="FARENDAIBIAO"
              label="法人代表" width="250">
            </el-table-column>
            <el-table-column
              prop="FARENIDCARD"
              label="法人身份证号">
            </el-table-column>
            <el-table-column
              prop="SIJIXINGM"
              label="司机姓名">
            </el-table-column>
            <el-table-column
              prop="SIJIDIANHUA"
              label="司机电话"  width="150">
            </el-table-column>
            <el-table-column
              prop="HUOZHUXINGM"
              label="货主姓名"  width="300">
            </el-table-column>
            <el-table-column
              prop="HUOZHUFAREN"
              label="货主法人" width="250">
            </el-table-column>
            <el-table-column
              prop="HUOWUDAIMA"
              label="货物代码">
            </el-table-column>
            <el-table-column
              prop="HUOWUMINGC"
              label="货物名称">
            </el-table-column>
            <el-table-column
              prop="ZHUANGHUODIZHI"
              label="装货地址">
            </el-table-column>
            <el-table-column
              prop="CHUFADI"
              label="出发地">
            </el-table-column>
            <el-table-column
              prop="MUDIDI"
              label="目的地">
            </el-table-column>
            <el-table-column
              prop="SHIFOUXIANHUOPIN"
              label="是否鲜活农产品">
            </el-table-column>
            <el-table-column
              prop="JIANCEDANHAO"
              label="检测单号">
            </el-table-column>
            <el-table-column
              prop="CHUFADANHAO"
              label="处罚单号">
            </el-table-column>
            <el-table-column
              prop="CHUFASHUHAO"
              label="处罚书号" width="280">
            </el-table-column>
            <el-table-column
              prop="CHUFARIQI"
              label="处罚日期"  width="180">
            </el-table-column>
            <el-table-column
              prop="CHUFAJINE"
              label="罚款金额">
            </el-table-column>
            <el-table-column
              prop="PEICHANGJINE"
              label="赔偿金额">
            </el-table-column>
            <el-table-column
              prop="ZHIFAREN"
              label="执法人">
            </el-table-column>
            <el-table-column
              prop="ZFRZJH"
              label="执法人证件号码"  width="200">
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
      anyouOpts: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '违法超限运输'
      }, {
        value: '2',
        label: '扰乱超限监测秩序'
      }, {
        value: '3',
        label: '非法使用通行证'
      }, {
        value: '4',
        label: '逃避超限检测'
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
        chepaihao: '',
        daoluyunzh: '',
        anyou: '',
        huowumingc: '',
        chufashuhao: '',
        begintime: '',
        endtime: '',
        pageNum: 1,
        pageSize: 10
      },
      loading: false,
      tableDataTotal: 1000,
      tableData: [
        {
          'MUDIDI': ' ',
          'CONGYEZIGEZHENG': '/',
          'CHENGYUNRENADDRESS': '/',
          'HUOWUDAIMA': null,
          'CHUFARIQI': '2017-10-04 16:46:17',
          'PEICHANGJINE': null,
          'JIASHIZHENG': null,
          'HUOWUMINGC': '砂石',
          'ZHIFAYIJU': '《中华人民共和国行政处罚法》第二十三条',
          'ANYOU': '违法超限运输',
          'FEIBIAOZHUNCHESHUOM': null,
          'SHIFOUXIANHUOPIN': '否',
          'ZHIFAREN': '黄小怀',
          'SIJIXINGM': '挖能无',
          'DAOLUYUNZH': '/',
          'CHUFAJINE': '5000',
          'CHENGYUNREN': '挖能无',
          'CHUFASHUHAO': '（宝鸡局大湾铺站）简罚（2017)1号',
          'ZFRZJH': '61022075 ',
          'SHIFOUFEIFAGAIZHANG': '否',
          'SIJIDIANHUA': '/',
          'FARENIDCARD': null,
          'FARENDAIBIAO': '/',
          'ROW_ID': 1,
          'SHIFOUBIAOZHUNCHE': '否',
          'CHUFADANHAO': '1',
          'ZHUANGHUODIZHI': ' ',
          'GAIZHUANGSHUOM': null,
          'HUOZHUFAREN': '/',
          'CHEPAIHAO': '黄陕C12345',
          'JIANCEDANHAO': '1',
          'HUOZHUXINGM': '挖能无',
          'CHUFADI': ' '
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
      this.$http.getData(config.baseUrl + config.service.zhcx.punishInfoQuery.listData, this.parames, {}, function (data, total) {
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
      this.parames.chepaihao = ''
      this.parames.daoluyunzh = ''
      this.parames.chufashuhao = ''
      this.parames.anyou = ''
      this.parames.huowumingc = ''
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
      this.tableHeight = clientHeight - 200
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
