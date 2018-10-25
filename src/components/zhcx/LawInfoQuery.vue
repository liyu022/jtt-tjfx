<template>
  <div>{{title}}</div>
</template>

<script>
export default {
  name: 'LawInfoQuery',
  data () {
    return {
      title: '路政执法信息查询',
      field: null
    }
  },
  props: {},
  computed: {},
  watch: {
    field: function (preVal, newVal) {
      console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
    }
  },
  created () {
    console.log('component created')
  },
  mounted () {
    console.log('component mounted')
  },
  methods: {
    getList () {
    }
  },
  destroyed: function () {
  },
  components: {}
}
</script>

<style scoped>

</style>
