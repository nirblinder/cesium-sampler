/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("LocationUtils", function (CesiumService) {
    var ellipsoid = CesiumService.getScene().globe.ellipsoid;
    var cartesian;

    return {
        getCartesianLocation: function (cartesianPosition) {
            return CesiumService.getCamera().pickEllipsoid(cartesianPosition, ellipsoid);
        },
        getCartographicPosition: function (cartesianPosition) {
            return (cartesian = this.getCartesianLocation(cartesianPosition)) ? ellipsoid.cartesianToCartographic(cartesian) : 0;
        },
        getLongtitude: function (cartesianPosition, precision) {
            var cartographic = this.getCartographicPosition(cartesianPosition);
            return Cesium.Math.toDegrees(cartographic.longitude).toFixed(precision);
        },
        getLatitude: function (cartesianPosition, precision) {
            var cartographic = this.getCartographicPosition(cartesianPosition);
            return Cesium.Math.toDegrees(cartographic.latitude).toFixed(precision);
        },
        generateLocation: function () {
            return Math.random() * 200 + 1;
        }
    }
});
