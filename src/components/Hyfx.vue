<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card :style="'height:'+ height +'px;'">
        <el-collapse v-model="activeItem" accordion @change="changeItem">
          <el-collapse-item name="/hyfx/mainPeriod">
            <template slot="title" >
              <span class="itemTitle">养护施工时段统计</span>
            </template>
            <el-form :model="params" label-position="left" label-width="80px">
              <el-form-item label="统计时间">
                <el-date-picker type="year" value-format="yyyy" placeholder="统计时间" v-model="params.year">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="统计模式">
                <el-select v-model="params.closeable" placeholder="养护状态">
                  <el-option label="全部" value="-1"></el-option>
                  <el-option label="未关闭" value="0"></el-option>
                  <el-option label="已关闭" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="/hyfx/networkEffect">
            <template slot="title" >
              <span class="itemTitle">路网运行影响分析</span>
            </template>
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
  name: "Hyfx",
  data () {
    return {
      activeItem: "/hyfx/mainPeriod",
      height: 100,
      params: {
        year: 'y',
        closeable: '-1'
      }
    }
  },
  computed: {
  },
  created () {
    this.setSize()
    this.init()
    this.changeItem(this.activeItem)
  },
  mounted () {

  },
  methods: {
    init () {
      this.params.year = new Date().getFullYear().toString()
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
