/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("GeometryUtils", function (CesiumService) {
    return {
        drawRectangle: function (west, south, east, north) {
            CesiumService.getPolylines().add({
                positions: Cesium.Cartesian3.fromDegreesArray([
                    west, south,
                    west, north,
                    east, north,
                    east, south,
                    west, south
                ])
            });
        }
    }
});
