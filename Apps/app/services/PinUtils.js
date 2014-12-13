/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("PinUtils", function (CesiumService, BillboardUtils, LocationUtils) {
    var pinBuilder = CesiumService.getPinBuilder();
    var pin, baseGeoX = 34.96, baseGeoY = 31.88, randomGeoX, randomGeoY;
    return {
        pinOffset: -0.01,
        addPin: function (color) {
            if (color === "blue") {
                randomGeoX = -LocationUtils.generateLocation();
                randomGeoY = -LocationUtils.generateLocation();
                pin = pinBuilder.fromText('Frog', Cesium.Color.ROYALBLUE, 48);
                BillboardUtils.addPinBillboard(pin, randomGeoX, randomGeoY);
            } else if (color === "red") {
                randomGeoX = LocationUtils.generateLocation();
                randomGeoY = LocationUtils.generateLocation();
                pin = pinBuilder.fromText('SA17', Cesium.Color.RED, 48);
                BillboardUtils.addPinBillboard(pin, randomGeoX, randomGeoY);
            }
        }
    }
});
