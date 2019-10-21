<template>
  <div class="export">
    <el-row>
      <el-col :span="4" style="line-height: 300px;text-align: center;">
        模块名称
      </el-col>
      <el-col :span="20">
        <el-checkbox-group v-model="checklist">
          <tr>
            <td><el-checkbox label="lk">路况数据</el-checkbox></td>
            <td><el-checkbox label="qx">气象数据</el-checkbox></td>
            <td><el-checkbox label="jdsj">交调数据</el-checkbox></td>
            <td><el-checkbox label="yjsjsj">应急事件数据</el-checkbox></td>
            <td><el-checkbox label="wscl">外省车辆统计</el-checkbox></td>
          </tr>
          <tr>
            <td><el-checkbox label="yhsjsj">养护事件数据</el-checkbox></td>
            <td><el-checkbox label="wxpcsj">危险品车数据</el-checkbox></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </el-checkbox-group>
      </el-col>
      </tr>
    </el-row>
    <el-row>
      <el-col :span="19" style="line-height: 80px;text-align: center;height:80px !important;">
        <span class="demonstration">起始时间：</span>
        <el-date-picker
                v-model="begintime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择起始时间">
        </el-date-picker>
        <span class="demonstration">终止时间：</span>
        <el-date-picker
                v-model="endtime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择终止时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5" style="line-height: 80px;text-align: center;height:80px !important;">
        <el-button type="primary" plain @click="exportExecle">导出数据</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ExportData',
  data () {
    return {
      title: '路政执法信息查询',
      checklist: [],
      begintime: '',
      endtime: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    exportExecle () {
      window.location.href="http://10.228.2.135:8804/lwgl-statanalysis/report/excelReport?type="+ this.checklist + "&begintime=" + this.begintime + "&endtime=" + this.endtime
    }
  },
  components: {}
}
</script>

<style lang="scss">
  .export{
    .el-row {
      margin-bottom: 20px;
      font-size: 20px;
      .el-col {
        border-radius: 4px;
        border: 1px solid #e6e3db;
        height: 400px;
        .el-checkbox-group>tr {
          height: 35px;
          width: 100%;
          td {
            padding: 15px;
            width: 220px;
            border: 1px solid #e6e3db;
            .el-checkbox{
              font-size: 20px;
            }
          }
        };
      }
    };
    .el-checkbox__label {
      display: inline-block;
      padding-left: 10px;
      line-height: 19px;
      font-size: 17px !important;
    }
    .el-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 16px !important;
      height: 16px !important;
      background-color: #FFF;
      z-index: 1;
      -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
      transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    }
  }
</style>
