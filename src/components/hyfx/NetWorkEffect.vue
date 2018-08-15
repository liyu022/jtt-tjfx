<template>
  <hd-map :style="'height:'+ mapHeight +'px;width:100%;'" :chartLayer="chartLayer" :lineLayer="lineLayer" :pointLayer="pointLayer"></hd-map>
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
        lineData:[],
        pointData: [],
        pointType: 0,
        fullHeight:0
      }
    },
    computed: {
      lineLayer: function () {
        //debugger
        return {
          data: this.params.lineData,
          parames: {
            layerName: 'clusterLine',
            zoomToExtent: true,
            selectable: true,
            style: {
              stroke: {
                strokeColor: '#D81E06',
                strokeWidth: 3
              }
            },
            selectStyle: {
              stroke: {
                strokeColor: '#1115ff',
                strokeWidth: 3
              }
            }
          }
        }
      },
      pointLayer: function () {
        let points = this.dataToLayer(this.params.pointData);
        return {
          data: points,
          parames: {
            layerName: this.params.pointType===0?'clusterPoint':'mainTainPoint',
            zoomToExtent: true,
            selectable: false
          }
        }
      }
    },
    watch: {
      'params.fullHeight' (val) {
        this.setSize()
      }
    },
    created () {
      this.setSize()
    },
    methods: {
      dataToLayer (data) {
        let result = null;
        if(this.params.pointType === 0) {
          result = [];
          let obj = {}
          let nData = data
          for (let i = 0; i < nData.length; i++) {
            if (nData[i]['geometry']) {
              obj = {}
              // obj['attributes'] = nData[i]
              obj['attributes'] = {}
              obj.attributes['style'] = {
                zIndex: i,
                image: {
                  type: 'icon',
                  image: {
                    imageSrc: 'static/images/marker.png',
                    imageAnchor: [0.5, 1]
                  }
                },
                text: {
                  text: nData[i]['id'].toString(),
                  textOffsetX: 3,
                  textOffsetY: -15,
                  textFill: {
                    fillColor: '#FFF'
                  },
                  textStroke: {
                    strokeColor: '#FFF'
                  }
                }
              }
              obj.attributes['selectStyle'] = {
                zIndex: i,
                image: {
                  type: 'icon',
                  image: {
                    imageSrc: 'static/images/marker.png',
                    imageAnchor: [0.5, 1]
                  }
                },
                text: {
                  text: nData[i]['id'].toString(),
                  textOffsetX: 3,
                  textOffsetY: -15,
                  textFill: {
                    fillColor: '#FFF'
                  },
                  textStroke: {
                    strokeColor: '#FFF'
                  }
                }
              }
              obj['geometry'] = nData[i].geometry
              obj['geometryType'] = 'Point'
              result.push(obj)
            }
          }
        }else if(this.params.pointType === 1){
          result = [];
          let obj = {}
          let nData = data
          for (let i = 0; i < nData.length; i++) {
            if (nData[i]['centerPoint']) {
              obj = {}
              obj['attributes'] = {
                "id":nData[i]['id'],
                "roadcode":nData[i]['roadcode'],
                "roadname":nData[i]['roadname'],
                "blockReason":nData[i]['blockReason'],
                "detectTime":nData[i]['detectTime'],
                "roadstart":nData[i]['roadstart'],
                "roadend":nData[i]['roadend'],
                "distcode":nData[i]['distcode'],
                "blockMileage":nData[i]['blockMileage'],
                "closeable":nData[i]['closeable'],
                "sysOtime":nData[i]['sysOtime'],
                "source":nData[i]['source'],
                "centerPoint":nData[i]['centerPoint'],
                "happenTime":nData[i]['happenTime'],
                "directiontext":nData[i]['directiontext'],
                "roadRangText":nData[i]['roadRangText']
              }
              obj.attributes['style'] = {
                zIndex: i,
                image: {
                  type: 'icon',
                  image: {
                    imageSrc: 'static/images/yhsg.png',
                    imageAnchor: [0.5, 1]
                  }
                }
              }
              obj.attributes['selectStyle'] = {
                zIndex: i,
                image: {
                  type: 'icon',
                  image: {
                    imageSrc: 'static/images/yhsg.png',
                    imageAnchor: [0.5, 1]
                  }
                }
              }
              obj['geometry'] = nData[i].centerPoint
              obj['geometryType'] = 'Point'
              result.push(obj)
            }
          }
        }
        return result
      },
      /**
       * 布局计算
       */
      setSize () {
        // const clientHeight = document.documentElement.clientHeight
        const clientHeight = this.params.fullHeight === 0? document.documentElement.clientHeight:this.params.fullHeight
        this.tableHeight = clientHeight - 167
        this.mapHeight = clientHeight - 70
        // console.log('this.mapHeight:' + this.mapHeight)
      }
    }
  }
</script>
<style scoped>

</style>
