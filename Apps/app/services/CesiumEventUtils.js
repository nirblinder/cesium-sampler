/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("CesiumEventUtils", function (CesiumService) {
    return {
        setScreenSpaceHandler: function (screenSpaceHandler) {
            var handler = new Cesium.ScreenSpaceEventHandler(CesiumService.getCanvas());

            handler.setInputAction(function (movement) {
                if (angular.isDefined(screenSpaceHandler)) {
                    screenSpaceHandler(movement);
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
    }
});
