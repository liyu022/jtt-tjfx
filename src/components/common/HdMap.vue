<template>
  <div id="map"></div>
</template>

<script>
  export default {
  name: "HdMap",
  props: {
    chartLayer: null,
    lineLayer: null,
    pointLayer: null
  },
  data () {
    return {
      lineName: 'line',
      pointName: 'point',
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
    lineLayer: function (nLine, oline) {
      if (oline != null) {
        this.Map.removeFeatureByLayerName(this.lineName)
      }
      if (nLine != null){
        nLine.parames.layerName = this.lineName
        this.Map.addPolylines(nLine.data, nLine.parames)
      }
    },
    pointLayer: function (nData, oData) {
      if (oData != null) {
        this.Map.removeFeatureByLayerName(this.pointName)
      }
      if (nData != null){
        nData.parames.layerName = this.pointName
        this.Map.addPoints(nData.data, nData.parames)
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
