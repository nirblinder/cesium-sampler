/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("BillboardUtils", function (CesiumService, $interval, $q) {
        var billboardCollection = CesiumService.getScene().primitives.add(new Cesium.BillboardCollection());
        var baseLocX = -75.59777;
        var baseLocY = 40.03883;
        var nearFarScalar = new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5);
        var BILLBOARD_THRESHOLD = 1000, MODULAR_LOAD_TIMEOUT = 2000;

        var computeModularLoadingProperties = function (billboardCount) {
            BILLBOARD_THRESHOLD = Math.floor(billboardCount / 10);
            MODULAR_LOAD_TIMEOUT = BILLBOARD_THRESHOLD * 2;
        };

        var constructPin = function (pin, geoX, geoY) {
            return {
                image: pin,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                position: Cesium.Cartesian3.fromDegrees(geoX, geoY, 0),
                translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2)
            }
        };

        var addAllBillboards = function (billboards, points, low, high, pin) {
            for (var i = low; i < high; i++) {
                billboards.push(billboardCollection.add(constructPin(pin, points[i].geoX, points[i].geoY)));
            }
            console.log("------- added " + (high - low) + " to total of " + billboards.length + " --------");

            return billboards;
        };
        return {
            addBillboard: function (geoX, geoY, pic) {
                billboardCollection.add({
                    image: '/Apps/images/' + pic + '.png',
                    position: Cesium.Cartesian3.fromDegrees(geoX, geoY),
                    scaleByDistance: nearFarScalar
                });
            },
            addBillboards: function (numOfBillboards, pic) {
                for (var i = 0; i < numOfBillboards; i++) {
                    billboardCollection.add({
                        image: '/Apps/images/' + pic + '.png',
                        position: Cesium.Cartesian3.fromDegrees(baseLocX += 10, baseLocY += 10),
                        scaleByDistance: nearFarScalar
                    });
                }
            },
            addPinBillboards: function (points, pin, billboardCountHolder) {
                billboardCollection = CesiumService.getScene().primitives.add(new Cesium.BillboardCollection());

                var pinBillboards = [];
                var pinsLeft = points.length, pinsAdded = 0, pinsToAdd = 0;
                var deferred = $q.defer();
                computeModularLoadingProperties(points.length);

                var addBillboardsInRange = function () {
                    if (pinsLeft <= 0) {
                        $interval.cancel(intervalJob);
                        deferred.resolve(pinBillboards);
                    } else {
                        pinsToAdd = Math.min(pinsLeft, BILLBOARD_THRESHOLD);
                        pinBillboards = addAllBillboards(pinBillboards, points, pinsAdded, pinsAdded + pinsToAdd, pin);
                        angular.isDefined(billboardCountHolder) ? billboardCountHolder.value += pinsToAdd : noop;
                        pinsLeft = points.length - (pinsAdded += pinsToAdd);
                    }
                };

                addBillboardsInRange();

                var intervalJob = $interval(addBillboardsInRange, MODULAR_LOAD_TIMEOUT);

                return deferred.promise;
            }
        }
    }
)
;
