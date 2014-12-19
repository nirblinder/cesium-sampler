/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("CameraUtils", function (CesiumService, CesiumEventUtils) {
    return {
        flyToJerusalem: function () {
            CesiumService.getScene().camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(34.96, 31.88, 15000.0)
            });
        },
        flyToRectangle: function (west, south, east, north) {
            CesiumService.getCamera().flyToRectangle({
                destination: Cesium.Rectangle.fromDegrees(west, south, east, north)
            });
        },
        setMouseHandler: function () {
            var scene = CesiumService.getScene();
            var canvas = scene.canvas;
            canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
            canvas.onclick = function () {
                canvas.focus();
            };
            var ellipsoid = CesiumService.getViewer().scene.globe.ellipsoid;

// disable the default event handlers
            scene.screenSpaceCameraController.enableRotate = false;
            scene.screenSpaceCameraController.enableTranslate = false;
            scene.screenSpaceCameraController.enableZoom = false;
            scene.screenSpaceCameraController.enableTilt = false;
            scene.screenSpaceCameraController.enableLook = false;

            var startMousePosition;
            var mousePosition;
            var flags = {
                looking: false,
                moveForward: false,
                moveBackward: false,
                moveUp: false,
                moveDown: false,
                moveLeft: false,
                moveRight: false
            };

            var handler = new Cesium.ScreenSpaceEventHandler(canvas);

            handler.setInputAction(function (movement) {
                flags.looking = true;
                console.log("left_down");
                console.log(movement.position);
                mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
                CesiumService.getScene().camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(mousePosition.x, mousePosition.y, 0.0)
                });
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

            //handler.setInputAction(function (movement) {
            //    console.log("mouse_move");
            //    console.log(movement);
            //    mousePosition = movement.endPosition;
            //}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            CesiumEventUtils.setScreenSpaceHandler(function (movement) {
                console.log("mouse_move");
                console.log(movement.endPosition);
                mousePosition = movement.endPosition;


            });

            handler.setInputAction(function (position) {
                console.log("left_up");
                flags.looking = false;
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            CesiumService.getViewer().clock.onTick.addEventListener(function (clock) {
                var camera = scene.camera;

                if (flags.looking) {
                    var width = canvas.clientWidth;
                    var height = canvas.clientHeight;

                    // Coordinate (0.0, 0.0) will be where the mouse was clicked.
                    var x = (mousePosition.x - startMousePosition.x) / width;
                    var y = -(mousePosition.y - startMousePosition.y) / height;

                    var lookFactor = 0.05;
                    camera.lookRight(x * lookFactor);
                    camera.lookUp(y * lookFactor);
                }

                // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
                var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
                var moveRate = cameraHeight / 100.0;

                if (flags.moveForward) {
                    camera.moveForward(moveRate);
                }
                if (flags.moveBackward) {
                    camera.moveBackward(moveRate);
                }
                if (flags.moveUp) {
                    camera.moveUp(moveRate);
                }
                if (flags.moveDown) {
                    camera.moveDown(moveRate);
                }
                if (flags.moveLeft) {
                    camera.moveLeft(moveRate);
                }
                if (flags.moveRight) {
                    camera.moveRight(moveRate);
                }
            });
        }
    }
});
