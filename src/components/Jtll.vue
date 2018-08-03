<template>
  <el-row style="height: 100%;padding: 3px;">
    <el-col :span="5">
      <el-card class="box-card">
        <el-collapse v-model="activeItem" accordion @change="changeItem">
          <el-collapse-item title="全省高速公路交通量分析" name="/jtll/provinceJtl">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="各地市高速公路交通量统计" name="/jtll/cityJtl">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="高速路断面交通量统计" name="/jtll/dmJtl">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="省界高速公路交通量统计" name="/jtll/pbJtl">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
    <el-col :span="19">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Jtll",
  data () {
    return {
      activeItem: "/jtll/provinceJtl"
    }
  },
  created () {
    this.changeItem(this.activeItem)
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
    }
  }
}
</script>

<style scoped>

</style>
