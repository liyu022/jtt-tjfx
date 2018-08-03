<template>
<span>{{title }}</span>
</template>

<script>
export default {
  name: "",
  data () {
    return {
      title: "全省高速公路交通量分析"
    }
  },
  props: {
    carType: '0',
    interval: 'y',
    date: ''
  },
}
</script>

<style scoped>

</style>
