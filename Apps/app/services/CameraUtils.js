/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("CameraUtils", function (CesiumService) {
    return {
        flyToJerusalem: function () {
            CesiumService.getScene().camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(34.96, 31.88, 15000.0)
            });
        },
        flyToRectangle: function (west, south, east, north) {
            CesiumService.getCamera().flyToRectangle({
                destination: Cesium.Rectangle.fromDegrees(west, south, east, north)
            });
        }
    }
});
