/* eslint-disable */
var config = {
  // 原始地址
  // baseUrl: 'http://10.228.2.135:8813',
  // 代理地址
  baseUrl: 'http://localhost:8804/lwgl-statanalysis',
  mapParames: {
    sxLiving: {
      center: [109.19554267784362, 34.957311521091796],
      projection: 'EPSG:4326',
      zoom: 7,
      origin: [-400, 399.9999999999998],
      extent: [73.50444037991963, 3.4393047302291393, 135.10269720521194, 53.553227819808114],
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
      ],
      mapUrl: 'http://10.228.2.72:6080/arcgis/rest/services/QBase/MapServer/tile/{z}/{y}/{x}'
    },
    arcgisOnLine: {
      center: [12118909.300259633, 4086043.1061670054],
      projection: 'EPSG:3857',
      zoom: 7,
      origin: [-2.0037508342787E7, 2.0037508342787E7],
      extent: [-2.0037507067161843E7, -3.0240971958386254E7, 2.0037507067161843E7, 3.0240971958386205E7],
      resolutions: [
          156543.03392800014,
          78271.51696399994,
          39135.75848200009,
          19567.87924099992,
          9783.93962049996,
          4891.96981024998,
          2445.98490512499,
          1222.992452562495,
          611.4962262813797,
          305.74811314055756,
          152.87405657041106,
          76.43702828507324,
          38.21851414253662,
          19.10925707126831,
          9.554628535634155,
          4.77731426794937,
          2.388657133974685
      ],
      mapUrl: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
    },
    getCurrent: function() {
      return this.sxLiving
    }
  },
  service: {
    ydpm: {
      ydList: '/ydpm/getYdList',
      ydHeatData: '/ydpm/getYdHeatData',
      lineData: 'http://10.228.2.135:8804/lwgl-cljg/road/findByLxdm',
      ydHisList: '/ydpm/getYdHisList',
      ydHisHeatData: '/ydpm/getYdHisHeatData'
    },
    jtll: {
      cityJtl: {
        chartData: '/trffic-flow/statCityHighWayBar'
      },
      dmJtl: {
        chartData: '/trffic-flow/statTrafficSection',
      },
      provinceJtl: {
        chartData: '/trffic-flow/statProvinceHighWayBar'
      },
      provinceBoundJtl: {
        chartData: '/trffic-flow/statBoundTrafficFlow'
      }
    },
    hyfx: {
      maintainPeriod: {
        chartData: '/hyfx/statMaintainPeriod'
      },
      netWorkEffect: {
        minChart: 'http://10.228.2.135:8804/lwgl-yxjc/block/chart/mainplan',
        minTable: '/hyfx/NetWorkEffect'
        // minTable: 'http://localhost:8080/api/netWorkEffect'
      }
    },
    zhcx: {
      lawInfoQuery: {
        listData: '/ZhQuery/lzzfQuery'
      },
      punishInfoQuery: {
        listData: '/ZhQuery/zccfQuery'
      }
    }
  }
}
