<template>
  <div id="map"></div>
</template>

<script>
  export default {
  name: "HdMap",
  props: {
    chartLayer: null,
    lineData: null
  },
  data () {
    return {
      lineLayer: 'line',
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
