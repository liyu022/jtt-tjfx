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
      this.Map = new HMap({
        target: 'map',
        view: {
          center: [109.19554267784362, 34.957311521091796],
          projection: 'EPSG:4326',
          zoom: 7
        },
        baseLayers: [{
          layerName: 'ArcGIS',
          isDefault: true,
          layerType: 'TileXYZ',
          tileGrid: {
            tileSize: 256,
            extent: [73.50444037991963, 3.4393047302291393, 135.10269720521194, 53.553227819808114
            ],
            origin: [-400, 399.9999999999998],
            resolutions: [
              0.7031249998602068,
              0.3515625011198339,
              0.17578124937018644,
              0.08789062468509322,
              0.04394531353227711,
              0.021972656766138556,
              0.010986328383069278,
              0.005493164191534639,
              0.0027465809060368165,
              0.0013732916427489112,
              6.866458213744556E-4,
              3.433229106872278E-4,
              1.716614553436139E-4,
              8.582953794130404E-5,
              4.291595870115493E-5,
              2.1457979350577466E-5,
              1.0728989675288733E-5
            ]
          },
          layerUrl: 'http://10.228.2.72:6080/arcgis/rest/services/QBase/MapServer/tile/{z}/{y}/{x}'
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
