<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
         <el-col :span="6"><div class="title">{{title }}</div></el-col>
         <el-col :span="6">
           <el-menu default-active="/" router mode="horizontal">
             <el-menu-item index="/ydpm"><div class="menu">拥堵排名</div></el-menu-item>
             <el-menu-item index="/jtll"><div class="menu">交通量</div></el-menu-item>
             <el-menu-item index="3"><div class="menu">行业分析</div></el-menu-item>
           </el-menu>
         </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: '路网运行监测大数据分析'
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer, .el-menu{
    background-color: #3B7AB3;
    text-align: left;
    line-height: 60px;
  }

  .el-header .title {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: white;
    font-size: 27px;
  }
  .el-header .menu {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: white;
    font-size: 20px;
  }
  .el-main {
    background-color: #E9EEF3;
    padding: 0px;
  }
</style>
