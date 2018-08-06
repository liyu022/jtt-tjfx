<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card :style="'height:'+ height +'px;'">
        <el-collapse v-model="activeItem" accordion @change="changeItem">
          <el-collapse-item name="/jtll/provinceJtl">
            <template slot="title" >
              <span class="itemTitle">全省高速公路交通量分析</span>
            </template>
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="客车货车">
                <el-select v-model="params.carType" placeholder="请选择客车货车">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="客车" value="1"></el-option>
                  <el-option label="货车" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计模式">
                <el-select v-model="params.interval" placeholder="统计模式">
                  <el-option label="按年" value="y"></el-option>
                  <el-option label="按月" value="m"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计时间">
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.dateMonth">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="/jtll/cityJtl">
            <template slot="title" >
              <span class="itemTitle">各地市高速公路交通量统计</span>
            </template>
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="出口入口">
                <el-select v-model="params.direction" placeholder="请选择出口入口">
                  <el-option label="全部" value="a"></el-option>
                  <el-option label="出口" value="r"></el-option>
                  <el-option label="入口" value="c"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计模式">
                <el-select v-model="params.interval" placeholder="统计模式">
                  <el-option label="按年" value="y"></el-option>
                  <el-option label="按月" value="m"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计时间">
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.dateMonth">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="/jtll/dmJtl">
            <template slot="title" >
              <span class="itemTitle">高速路断面交通量统计</span>
            </template>
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="客车货车">
                <el-select v-model="params.carType" placeholder="请选择客车货车">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="客车" value="1"></el-option>
                  <el-option label="货车" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计模式">
                <el-select v-model="params.interval" placeholder="统计模式">
                  <el-option label="按年" value="y"></el-option>
                  <el-option label="按月" value="m"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计时间">
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.dateMonth">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="/jtll/pbJtl">
            <template slot="title" >
              <span class="itemTitle">省界高速公路交通量统计</span>
            </template>
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="客车货车">
                <el-select v-model="params.carType" placeholder="请选择客车货车">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="客车" value="1"></el-option>
                  <el-option label="货车" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出口入口">
                <el-select v-model="params.direction" placeholder="请选择出口入口">
                  <el-option label="全部" value="a"></el-option>
                  <el-option label="出口" value="r"></el-option>
                  <el-option label="入口" value="c"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计模式">
                <el-select v-model="params.interval" placeholder="统计模式">
                  <el-option label="按年" value="y"></el-option>
                  <el-option label="按月" value="m"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="统计时间">
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.dateYear">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.dateMonth">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card :style="'height:'+ height +'px;'" body-style="padding:0px">
        <router-view :params="params"></router-view>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Jtll",
  data () {
    return {
      activeItem: "/jtll/provinceJtl",
      height: 100,
      params: {
        carType: '0',
        interval: 'y',
        dateYear: '',
        dateMonth: '',
        direction: 'a'
      }
    }
  },
  computed: {
    provinceInterval: function(){
      return this.params.interval == 'y'? 'year':'month'
    }
  },
  created () {
    this.setSize()
    this.init()
    this.changeItem(this.activeItem)
  },
  mounted () {
    console.log("load jtll.....")
  },
  /*
  watch: {
    activeDate: function (nV, oV) {
      console.log("activeDate发生了变化：nV" + nV + ",oV" + oV)
    }
  },
  */
  methods: {
    init () {
      this.params.dateYear = new Date().getFullYear().toString()
      const month = new Date().getMonth() + 1
      this.params.dateMonth = new Date().getFullYear().toString() + (month < 10? '0' + month.toString():month.toString())
    },
    changeItem (item) {
      if (item != null) {
        this.toRouter(item)
      }
    },
    toRouter (path) {
      this.$router.push(path)
    },
    onSubmit() {
      console.log('submit!')
    },
    /**
     * 布局计算
     */
    setSize () {
      const clientHeight = document.documentElement.clientHeight
      this.height = clientHeight - 68
      console.log('this.height:' + this.height)
    }
  }
}
</script>
<style scoped>
  .itemTitle {
    padding-left: 10px;
    width: 100%;
    font-size: 16px;
    text-align: center;
  }
  .el-form {
    padding: 0 25px;
  }
</style>
