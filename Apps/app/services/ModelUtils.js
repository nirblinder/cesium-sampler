/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("ModelUtils", function (CesiumService, LocationUtils) {
        var handler = new Cesium.ScreenSpaceEventHandler(CesiumService.getCanvas());

        handler.setInputAction(function (movement) {
            var pick = CesiumService.getScene().pick(movement.endPosition);
            if (Cesium.defined(pick) && Cesium.defined(pick.node) && Cesium.defined(pick.mesh)) {
                // Output glTF node and mesh under the mouse.
                console.log('node: ' + pick.node.name + '. mesh: ' + pick.mesh.name);
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        var constructModel = function (url, matrix) {
            return Cesium.Model.fromGltf({
                url: url,
                modelMatrix: matrix,
                scale: 3000
            });
        };

        return {
            createSimpleModel: function (modelUrl, height) {
                height = Cesium.defaultValue(height, 0.0);
                var geoX = LocationUtils.generateLocation();
                var geoY = LocationUtils.generateLocation();
                var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(geoX, geoY, height));
                CesiumService.getScene().primitives.add(constructModel(modelUrl, modelMatrix));
            },
            createModel: function (modelUrl, height) {
                height = Cesium.defaultValue(height, 0.0);

                var geoX = -120 + Math.random() * 6;
                var geoY = 44 + Math.random() * 10;

                var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(geoX, geoY, height));

                var model = CesiumService.getScene().primitives.add(constructModel(modelUrl, modelMatrix));
            }
        }
    }
)
;
