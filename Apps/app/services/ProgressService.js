/**
 * Created by Micha on 11/28/2014.
 */
cs.factory("ProgressService", function () {
    return {
        showProgress: function () {
            NProgress.start();
        },
        hideProgress: function () {
            NProgress.done();
        }
    }
});
