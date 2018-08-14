<template>
  <div id="map"></div>
</template>

<script>
  export default {
  name: "HdMap",
  props: {
    chartLayer: null,
    lineData: null,
    pointData: null
  },
  data () {
    return {
      lineLayer: 'line',
      pointLayer: 'point',
      Map: null
    }
  },
  mounted () {
    this.initMap()
  },
  watch: {
    chartLayer: function (nLayer, oLayer) {
      if (oLayer != null) {
        oLayer.remove()
      }
      if (nLayer != null){
        nLayer.appendTo(this.Map.getMap())
      }
    },
    lineData: function (nLine, oline) {
      if (oline != null) {
        this.Map.removeFeatureByLayerName(this.lineLayer)
      }
      if (nLine != null){
        this.Map.addPolylines(nLine, {
          layerName: this.lineLayer,
          zoomToExtent: true,
          selectable: true,
          style: {
            stroke: {
              strokeColor: '#1115ff',
              strokeWidth: 3
            }
          },
          selectStyle: {
            stroke: {
              strokeColor: '#D81E06',
              strokeWidth: 3
            }
          }
        })
      }
    },
    pointData: function (nData, oData) {
      //debugger
      if (oData != null) {
        this.Map.removeFeatureByLayerName(this.pointLayer)
      }
      if (nData != null){
        let points = []
        let obj = {}
        for (let i = 0; i < nData.length; i++) {
          if (nData[i]['centerPoint']) {
            obj = {}
            obj['attributes'] = nData[i]
            obj['attributes']['layerName'] = this.pointLayer
            obj.attributes['style'] = {
              zIndex: i,
              image: {
                type: 'icon',
                image: {
                  imageSrc: 'static/images/yhsg.png',
                  imageAnchor: [0.5, 1]
                }
              },
             text: {
               text: (i + 1).toString(),
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
                  imageSrc: 'static/images/yhsg.png',
                  imageAnchor: [0.5, 1]
                }
              },
             text: {
               text: (i + 1).toString(),
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
            obj['geometry'] = nData[i].centerPoint
            obj['geometryType'] = 'Point'
            points.push(obj)
          }
        }
        this.Map.addPoints(points, {
          layerName: this.pointLayer,
          zoomToExtent: true,
          selectable: false
        })
      }
    }
  },
  methods: {
    initMap () {
      // debugger
      let mapParames = config.mapParames.getCurrent()
      this.Map = new HMap({
        target: 'map',
        view: {
          center: mapParames.center,
          projection: mapParames.projection,
          zoom: mapParames.zoom
        },
        baseLayers: [{
          layerName: 'ArcGIS',
          isDefault: true,
          layerType: 'TileXYZ',
          tileGrid: {
            tileSize: 256,
            extent: mapParames.extent,
            origin: mapParames.origin,
            resolutions: mapParames.resolutions
          },
          layerUrl: mapParames.mapUrl
        }]
      })
    }

  }
}
</script>

<style scoped>
 #map {
   width: 100%;
   height: 100%;
 }
</style>
