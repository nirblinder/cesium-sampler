/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("PinUtils", function (CesiumService, BillboardUtils, LocationUtils) {
    var pinBuilder = CesiumService.getPinBuilder();
    var pin, baseGeoX = 34.96, baseGeoY = 31.88, randomGeoX, randomGeoY;
    var bluePin = pinBuilder.fromText('Frog', Cesium.Color.ROYALBLUE, 48);
    var redPin = pinBuilder.fromText('SA17', Cesium.Color.RED, 48);

    return {
        pinOffset: -0.01,
        addPins: function (points, color, billboardCollection) {
            if (color === "blue") {
                return BillboardUtils.addPinBillboards(points, bluePin);
            } else if (color === "red") {
                return BillboardUtils.addPinBillboards(points, redPin);
            }

            return undefined;
        }
    }
});
