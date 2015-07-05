(function (root) {


    var baseIndex = {};

    var app = {
        base: function (baseName, fun) {
            baseIndex[baseName] = fun;
        },
        addModule: function (baseName, moduleName, fun) {
            var baseClass = baseIndex[baseName];
            baseClass.addModule(moduleName, fun);
        },
        getBase: function (baseName) {
            return baseIndex[baseName];
        }
    }


    root.app = app;

})(this)