/**
 * Created by Micha on 11/28/2014.
 */
cs.controller("MainController", function ($scope, CesiumService, BillboardUtils,
                                          CameraUtils, GeometryUtils, PinUtils,
                                          CesiumEventUtils, LabelUtils, LocationUtils,
                                          GeoJsonUtils, ModelUtils) {
    $scope.showLocationLabel = false;
    $scope.pinCount = 1000;
    $scope.totalPins = 0;

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

    $scope.flyToRectangle = function () {
        var west = -77.0;
        var south = 38.0;
        var east = -72.0;
        var north = 42.0;
        CameraUtils.flyToRectangle(west, south, east, north);
        GeometryUtils.drawRectangle(west, south, east, north);
    };

    $scope.addBluePin = function () {
        for (var i = 0; i < $scope.pinCount; i++) {
            PinUtils.addPin("blue");
        }
        $scope.totalPins += $scope.pinCount;
    };

    $scope.addRedPin = function () {
        for (var i = 0; i < $scope.pinCount; i++) {
            PinUtils.addPin("red");
        }
        $scope.totalPins += $scope.pinCount;
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

    $scope.addUsStatesDataSource = function () {
        GeoJsonUtils.appendDataSource("/Apps/SampleData/ne_10m_us_states.topojson");
    };

    $scope.addCustomGeoJson = function () {
        GeoJsonUtils.appendDataSource("/Apps/SampleData/JSGeoExample/micha.geojson");
    };

    $scope.addPlaneModel = function () {
        for (var i = 0; i < 500; i++) {
            ModelUtils.createModel('/Apps/SampleData/models/plane/fighter.gltf', 5000.0);
        }
    };

    $scope.addDroneModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/drone/drone.gltf', 2000.0);
    };

    $scope.addFighterModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/plane/F15/F-15C_Eagle.gltf', 6000.0);
    };

    $scope.addHelicopterModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/drone/helicopter/helicopter.gltf', 3000.0);
    };

    $scope.addTankModel = function () {
        ModelUtils.createModel('/Apps/SampleData/models/tank/T90/T-90.gltf', 0.0);
    };

    $scope.addAllModels = function () {
        for (var i = 0; i < 20; i++) {
            $scope.addFighterModel();
            $scope.addHelicopterModel();
            $scope.addTankModel();
        }
    }
});
