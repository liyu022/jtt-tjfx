<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card :style="'height:'+ height +'px;'">
        <el-collapse v-model="activeItem" accordion @change="changeItem">
          <el-collapse-item title="全省高速公路交通量分析" name="/jtll/provinceJtl">
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="车种">
                <el-select v-model="params.carType" placeholder="请选择车种">
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
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="各地市高速公路交通量统计" name="/jtll/cityJtl">
            <el-form :model="province" label-position="left" label-width="80px">
              <el-form-item label="出入口">
                <el-select v-model="params.direction" placeholder="请选择出入口">
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
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="高速路断面交通量统计" name="/jtll/dmJtl">
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="车种">
                <el-select v-model="params.carType" placeholder="请选择车种">
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
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="省界高速公路交通量统计" name="/jtll/pbJtl">
            <el-form :model="province" label-position="left" label-width="80px">
              <el-form-item label="车种">
                <el-select v-model="params.carType" placeholder="请选择车种">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="客车" value="1"></el-option>
                  <el-option label="货车" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出入口">
                <el-select v-model="params.direction" placeholder="请选择出入口">
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
                <el-date-picker v-if="provinceInterval == 'year'" type="year" value-format="yyyy" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
                <el-date-picker v-else type="month" value-format="yyyyMM" placeholder="统计时间" v-model="params.date">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card :style="'height:'+ height +'px;'">
        <router-view></router-view>
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
        date: '',
        direction: 'a'
      }
    }
  },
  computed: {
    provinceInterval: function(){
      return this.province.interval == 'y'? 'year':'month'
    }
  },
  created () {
    this.changeItem(this.activeItem)
    this.setSize()
  },
  mounted () {

  },
  methods: {
    changeItem (item) {
      console.log("当前打开的面板：" + item)
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
      console.log('this.mapHeight:' + clientHeight)
    }
  }
}
</script>

<style scoped>
 .box-card {
 }
</style>
