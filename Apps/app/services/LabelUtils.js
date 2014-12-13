/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("LabelUtils", function (CesiumService) {
    return {
        labels: undefined,
        setLabelCollection: function () {
            this.labels = CesiumService.getScene().primitives.add(new Cesium.LabelCollection());
        },
        addLabel: function () {
            if (!angular.isDefined(this.labels)) {
                this.setLabelCollection();
            }

            return this.labels.add();
        }
    }
});
