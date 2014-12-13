/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("BillboardUtils", function (CesiumService) {
    var billboards = CesiumService.getScene().primitives.add(new Cesium.BillboardCollection());
    var baseLocX = -75.59777;
    var baseLocY = 40.03883;
    var nearFarScalar = new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5);

    return {
        addBillboard: function (geoX, geoY, pic) {
            billboards.add({
                image: '/Apps/images/' + pic + '.png',
                position: Cesium.Cartesian3.fromDegrees(geoX, geoY),
                scaleByDistance: nearFarScalar
            });
        },
        addBillboards: function (numOfBillboards, pic) {
            for (var i = 0; i < numOfBillboards; i++) {
                billboards.add({
                    image: '/Apps/images/' + pic + '.png',
                    position: Cesium.Cartesian3.fromDegrees(baseLocX += 10, baseLocY += 10),
                    scaleByDistance: nearFarScalar
                });
            }
        },
        addPinBillboard: function (pin, geoX, geoY) {
            billboards.add({
                image: pin,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                position: Cesium.Cartesian3.fromDegrees(geoX, geoY, 0)
            });
        }
    }
});
