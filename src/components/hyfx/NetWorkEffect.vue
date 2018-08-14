<template>
  <hd-map :style="'height:'+ mapHeight +'px;width:100%;'" :chartLayer="chartLayer" :lineData="params.lineData" :pointData="params.pointData"></hd-map>
</template>

<script>
  import HdMap from '../common/HdMap.vue'
  export default {
    name: "",
    components: {
      HdMap
    },
    data () {
      return {
        title: "路网运行影响分析",
        mapHeight: 500,
        chartLayer: null
      }
    },
    props: {
      params: {
        year: '',
        closeable: '-1',
        lineData: null,
        pointData: null
      }

    },
    created () {
      this.setSize()
    },
    methods: {
      /**
       * 布局计算
       */
      setSize () {
        const clientHeight = document.documentElement.clientHeight
        this.tableHeight = clientHeight - 167
        this.mapHeight = clientHeight - 70
        console.log('this.mapHeight:' + this.mapHeight)
      }
    }
  }
</script>
<style scoped>

</style>
