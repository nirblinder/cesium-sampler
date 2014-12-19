/**
 * Created by Micha on 11/28/2014.
 */
cs.controller("MainController", function ($scope, CesiumService, BillboardUtils,
                                          CameraUtils, GeometryUtils, PinUtils,
                                          CesiumEventUtils, LabelUtils, LocationUtils,
                                          GeoJsonUtils, ModelUtils, $interval, ProgressService) {
    $scope.showLocationLabel = false;
    $scope.pinCount = 1000;
    $scope.billboardCountHolder = {value: 0};
    $scope.modelsLoaded = 0;
    $scope.modelLoadingMode = false;

    $scope.addBillboards = function () {
        var geoX = -117.16, geoY = 32.71;
        BillboardUtils.addBillboard(geoX, geoY, "drone2");
    };

    $scope.addBillboards = function () {
        BillboardUtils.addBillboards(1000, "drone2");
    };

    $scope.flyToJerusalem = function () {
        CameraUtils.flyToJerusalem();
    };

    $scope.setMouseHandler = function () {
        CameraUtils.setMouseHandler();
    };

    $scope.flyToRectangle = function () {
        var west = -77.0;
        var south = 38.0;
        var east = -72.0;
        var north = 42.0;
        CameraUtils.flyToRectangle(west, south, east, north);
        GeometryUtils.drawRectangle(west, south, east, north);
    };

    $scope.addBluePin = function () {
        var points = [];
        var bluePinCount = Math.floor(Math.random() * 10000) + 1000;

        for (var i = 0; i < bluePinCount; i++) {
            points.push({
                geoX: LocationUtils.generateLocation(),
                geoY: LocationUtils.generateLocation()
            });
        }

        ProgressService.showProgress();
        PinUtils.addPins(points, "blue", $scope.billboardCountHolder).then(function (bluePins) {
            ProgressService.hideProgress();
            console.log("added all blue pins, starting blue pin marathon");

            setInterval(function () {
                bluePins.forEach(function (bluePin) {
                    var carto = CesiumService.getViewer().scene.globe.ellipsoid.cartesianToCartographic(bluePin.position);
                    var x = (carto.longitude * 180 / Math.PI) + 0.01;
                    var y = (carto.latitude * 180 / Math.PI) + 0.01;
                    if (x > 120) {
                        x = -120;
                    }
                    if (y > 70) {
                        y = -70;
                    }
                    bluePin.position = Cesium.Cartesian3.fromDegrees(x, y);
                });
            }, 30);
        });
    };

    $scope.addRedPin = function () {
        var points = [];

        var redPinCount = Math.floor(Math.random() * 10000) + 1000;

        for (var i = 0; i < redPinCount; i++) {
            points.push({
                geoX: -LocationUtils.generateLocation(),
                geoY: -LocationUtils.generateLocation()
            });
        }

        ProgressService.showProgress();
        PinUtils.addPins(points, "red", $scope.billboardCountHolder).then(function (redPins) {
            ProgressService.hideProgress();
            console.log("added all red pins, starting red pin marathon");

            setInterval(function () {
                redPins.forEach(function (redPin) {
                    var carto = CesiumService.getViewer().scene.globe.ellipsoid.cartesianToCartographic(redPin.position);
                    var x = (carto.longitude * 180 / Math.PI) - 0.01;
                    var y = (carto.latitude * 180 / Math.PI) - 0.01;
                    if (x > 120) {
                        x = -120;
                    }
                    if (y > 70) {
                        y = -70;
                    }
                    redPin.position = Cesium.Cartesian3.fromDegrees(x, y);
                });
            }, 30);
        });
    };

    var handleScreenSpaceEvent = function () {
        var label = LabelUtils.addLabel();

        CesiumEventUtils.setScreenSpaceHandler(function (movement) {
            label.show = true;
            label.text = '(' + LocationUtils.getLongtitude(movement.endPosition, 2) +
            ', ' + LocationUtils.getLatitude(movement.endPosition, 2) + ')';
            label.position = LocationUtils.getCartesianLocation(movement.endPosition);
            console.log(LocationUtils.getCartographicPosition(movement.endPosition));
        });
    };

    $scope.showLocationPicker = function () {
        handleScreenSpaceEvent();
        $scope.showLocationLabel = !$scope.showLocationLabel;
    };

    $scope.clearScreen = function () {
        handleClearScreenEvent();
    };

    $scope.addUsStatesDataSource = function () {
        GeoJsonUtils.appendDataSource("/Apps/SampleData/ne_10m_us_states.topojson");
    };

    $scope.addCustomGeoJson = function () {
        GeoJsonUtils.appendDataSource("/Apps/SampleData/JSGeoExample/micha.geojson");

        // just for this usecase
        $scope.flyToJerusalem();
    };

    $scope.addPlaneModel = function () {
        $scope.modelsToLoad = 500;
        $scope.modelLoadingMode = true;

        for (var i = 0; i < $scope.modelsToLoad; i++) {
            ModelUtils.createModel('/Apps/SampleData/models/plane/fighter.gltf', 5000.0);
        }

    };

    $scope.addDroneModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/drone/drone.gltf', 2000.0);
    };

    $scope.addFighterModel = function () {
        $scope.modelsToLoad = 20;
        $scope.modelLoadingMode = true;

        for (var i = 0; i < $scope.modelsToLoad; i++) {
            ModelUtils.createModel('/Apps/SampleData/models/plane/F15/F-15C_Eagle.gltf', 6000.0).then(function (ready) {
                console.log(ready);
            });
        }
    };

    $scope.addHelicopterModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/drone/helicopter/helicopter.gltf', 3000.0).then(function (model) {
            console.log("model is ready!");
            console.log(model);

            $interval(function () {
                var geoX = 30.12;
                var geoY = 31.88;
                model.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(geoX, geoY, 3000.0));

            }, 1000);
        });
    };

    $scope.addTankModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/tank/T90/T-90.gltf', 0.0);
    };

    $scope.addAllModels = function () {
        $scope.addFighterModel();
        $scope.addHelicopterModel();
        $scope.addTankModel();
    }

    $scope.clearAllModels = function () {
        CesiumService.getScene().primitives.removeAll();
    }

});
