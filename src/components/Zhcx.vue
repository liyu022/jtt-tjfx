<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="4">
      <el-card>
        <el-menu default-active="/zhcx/lawInfoQuery" router :style="'height:'+ menu_height +'px;border-width:0px;'"
          @select="handleSelect">
          <el-menu-item index="/zhcx/lawInfoQuery">
            <i class="el-icon-menu"></i>
            <span slot="title">路政执法信息查询</span>
          </el-menu-item>
          <el-menu-item index="/zhcx/punishInfoQuery">
            <i class="el-icon-setting"></i>
            <span slot="title">治超处罚信息查询</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </el-col>
    <el-col :span="20">
      <el-card :style="'height:'+ height +'px;'" body-style="padding:0px">
        <router-view :key="activeDate" :params="params"></router-view>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Zhcx',
  data () {
    return {
      activeDate: new Date().getTime(),
      activeItem: '/zhcx/lawInfoQuery',
      height: 100,
      menu_height: 100,
      params: {
        fullHeight: document.documentElement.clientHeight
      }
    }
  },
  props: {
    params_in: {
      fullHeight: 0
    }
  },
  computed: {
  },
  created () {
    this.setSize()
    this.$router.push(this.activeItem)
  },
  mounted () {
  },
  watch: {
    'params_in.fullHeight' (val) {
      this.setSize()
      this.params.fullHeight = val
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // <router-view>组件的:key属性，用来在组件复用时也能刷新组件
      this.activeDate = new Date().getTime()
    },
    /**
     * 布局计算
     */
    setSize () {
      // const clientHeight = document.documentElement.clientHeight
      const clientHeight = this.params_in.fullHeight
      this.height = clientHeight - 68
      this.menu_height = clientHeight - 108
      // console.log('clientHeight-jtll:' + clientHeight)
    }
  }
}
</script>
<style scoped>
</style>
