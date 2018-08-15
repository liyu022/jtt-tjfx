<template>
  <div id="map">
    <div id="popup" style="width: auto"></div>
  </div>
</template>

<script>
  const wktFormat = new ol.format.WKT();
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
        this.Map.removeFeatureByLayerName(oline.parames.layerName)
      }
      if (nLine != null){
        this.Map.addPolylines(nLine.data, nLine.parames)
      }
    },
    pointLayer: function (nData, oData) {
      if (oData != null) {
        // this.Map.removeFeatureByLayerName(this.pointName)
        this.Map.removeFeatureByLayerName(oData.parames.layerName)
      }
      if (nData != null){
        this.Map.addPoints(nData.data, nData.parames)
      }
    }
  },
  methods: {
    initMap () {
      // 创建地图
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
      //创建弹窗
      let overlay = new ol.Overlay({
        id:'mark',
        element: document.getElementById("popup"),
        autoPan: true,    //位置超出地图视图是，移动地图
        autoPanAnimation: {
          duration: 250
        },
        stopEvent: true
      });
      this.Map.addOverlay(overlay)
      //创建交互
      let selectClick = new ol.interaction.Select({
        condition: ol.events.condition.click,
        multi: true
      })
      selectClick.setHitTolerance(5)
      selectClick.on('select',this.featureClick)
      this.Map.addInteraction(selectClick)
    },
    featureClick (e) {
      this.hidePop();
      let count = e.target.getFeatures().getLength();
      if(count >0){
        // this.cchighlFeature();
        let currentFeatrue = e.target.getFeatures().getArray()[0];
        let properties = currentFeatrue.getProperties()
        //var html = this.randerFeature();
        //this.showPop(name,html,geo.getCoordinates());
        //将pop移动至地图中心
        let centerCoord = this.getPopCoord(e);
        this.Map.getView().animate({
          center: centerCoord,
          duration: 500
        });
        console.log("选中要素的layerName:" + properties.params.layerName)
      }
    },
    getPopCoord (e) {
      let pixel = this.Map.getEventPixel(event);
      let popHeight = 460;
      /*
            height = $("input[id^='popover']").height();
            $(overLay.getElement()).height();
            */

      //let popCenterPixel = [pixel[0], pixel[1]-popHeight/2 + 60];
      let popCenterPixel = [pixel[0], pixel[1]];
      let popCenterCoord = this.Map.getCoordinateFromPixel(popCenterPixel);
      return popCenterCoord;
    },
    showPop(title,content,coordinate) {
      let overLay = this.map.getOverlayById('mark');
      $(overLay.getElement()).popover('destroy');
      overLay.setPosition(coordinate);
      $(overLay.getElement()).popover({
        'placement': 'top',
        'animation': false,
        'html': true,
        'title':title,
        'content': content
      });
      $(overLay.getElement()).popover('show');
    },
    hidePop(){

    },
    fixToExtent (){
      let mapParames = config.mapParames.getCurrent()
      geometry = wktFormat.readGeometry('WKT', {
        dataProjection: mapParames.projection ? mapParames.projection : undefined,
        featureProjection: mapParames.projection ? mapParames.projection : undefined
      })
      var extent = geometry.getExtent();
      this.Map.zoomToExtent(extent, true);
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
