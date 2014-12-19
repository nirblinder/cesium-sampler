/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("CesiumService", function () {
    return {
        viewer: new Cesium.Viewer('cesiumContainer', {
            timeline: false,
            animation: false
        }),
        polylines: undefined,
        getViewer: function () {
            return this.viewer;
        },
        getScene: function () {
            return this.viewer.scene;
        },
        getClock: function () {
            return this.viewer.clock;
        },
        getCamera: function () {
            return this.getScene().camera;
        },
        getCanvas: function () {
            return this.getScene.canvas;
        },
        getPinBuilder: function () {
            return new Cesium.PinBuilder();
        },
        getDataSources: function () {
            return this.viewer.dataSources;
        },
        getPolylines: function () {
            if (!angular.isDefined(this.polylines)) {
                this.polylines = this.addPolylines();
            }

            return this.polylines;
        },
        addPolylines: function () {
            return this.getScene().primitives.add(new Cesium.PolylineCollection());
        }
    }
});
