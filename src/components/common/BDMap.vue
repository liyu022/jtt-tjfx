<template>
  <div id="map">
    <div id="popDiv" class="ol-popup">
      <el-row>
        <el-col :span="8"><div class="lable">路线名称：</div></el-col>
        <el-col :span="16"><div class="content">{{mtPopData.roadcode}} - {{mtPopData.roadname}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="lable">桩号范围：</div></el-col>
        <el-col :span="16"><div class="content">{{mtPopData.roadRangText}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="lable">养护类型：</div></el-col>
        <el-col :span="16"><div class="content">{{mtPopData.blockReason}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="lable">施工方向：</div></el-col>
        <el-col :span="16"><div class="content">{{mtPopData.directiontext}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="lable">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="text_area content">{{mtPopData.sceneDesc}}</div></el-col>
      </el-row>
    </div>
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
      Map: null,
      mtPopData: {
        roadcode:'',
        roadname:'',
        detectTime:'',
        distcode:'',
        blockMileage:'',
        source:'',
        centerPoint:'',
        happenTime:'',
        directiontext:'',
        roadRangText:'',
        sceneDesc:'',
        blockReason: ''
      }
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
          zoom: 4
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
        id:'pop',
        element: document.getElementById("popDiv"),
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
        let currentFeatrue = e.target.getFeatures().getArray()[0];
        let properties = currentFeatrue.getProperties()
        if(properties.params.layerName === 'mainTainPoint') {
          this.mtPopData.roadcode = properties.roadcode
          this.mtPopData.roadname = properties.roadname
          this.mtPopData.distcode = properties.distcode
          this.mtPopData.blockMileage = properties.blockMileage
          this.mtPopData.source = properties.source
          this.mtPopData.centerPoint = properties.centerPoint
          this.mtPopData.happenTime = properties.happenTime
          this.mtPopData.directiontext = properties.directiontext
          this.mtPopData.roadRangText = properties.roadRangText
          this.mtPopData.sceneDesc = properties.sceneDesc
          this.mtPopData.blockReason = properties.blockReason
          let geometry = currentFeatrue.getGeometry()
          //this.showPop(geometry.getCoordinates());
          this.showPop(e.mapBrowserEvent.coordinate)

          //将pop移动至地图中心
          let centerCoord = this.getPopCoord(e);
          this.Map.getView().animate({
            center: centerCoord,
            duration: 500
          });
        }
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
    showPop(coordinate) {
      let overLay = this.Map.getOverlayById('pop');
      overLay.setPosition(coordinate);
      // $(overLay.getElement()).popover({
      //   'placement': 'top',
      //   'animation': false,
      //   'html': true,
      //   'title':title,
      //   'content': content
      // });
      // $(overLay.getElement()).popover('show');
    },
    hidePop(){
      let overLay = this.Map.getOverlayById('pop')
      overLay.setPosition(undefined);
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
 .ol-popup {
   width: 280px;
   height: 150px;
   position: absolute;
   background-color: white;
   -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
   filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
   padding: 15px;
   border-radius: 10px;
   border: 1px solid #cccccc;
   bottom: 12px;
   left: -50px;
 }
 .ol-popup:after, .ol-popup:before {
   top: 100%;
   border: solid transparent;
   content: " ";
   height: 0;
   width: 0;
   position: absolute;
   pointer-events: none;
 }
 .ol-popup:after {
   border-top-color: white;
   border-width: 10px;
   left: 48px;
   margin-left: -10px;
 }
 .ol-popup:before {
   border-top-color: #cccccc;
   border-width: 11px;
   left: 48px;
   margin-left: -11px;
 }
  .text_area {
    width: 100%;
    height: 110px;
    text-indent: 2em;
  }
  .ol-popup .lable {
    color: #7a7a7a;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .ol-popup .content {
    color: #7a7a7a;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
