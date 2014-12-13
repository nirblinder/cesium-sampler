/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("GeoJsonUtils", function (CesiumService) {
    return {
        appendDataSource: function (geoJsonUrl) {
            CesiumService.getDataSources().add(Cesium.GeoJsonDataSource.fromUrl(geoJsonUrl, {
                stroke: Cesium.Color.HOTPINK,
                fill: Cesium.Color.PINK,
                strokeWidth: 3,
                markerSymbol: '?'
            }));
        }
    }
});
