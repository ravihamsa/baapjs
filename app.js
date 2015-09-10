(function (root) {


    var baseIndex = {};
    var viewModuleIndex = {};

    var app = {
        base: function (baseName, fun) {
            baseIndex[baseName] = fun;
        },
        viewModule: function (moduleName, moduleFn) {
            var module = moduleFn();
            module.type = 'view';
            module.name = moduleName;
            viewModuleIndex[moduleName] = module
        },
        getBase: function (baseName) {
            return baseIndex[baseName];
        },
        getViewModule: function (moduleName) {
            return viewModuleIndex[moduleName];
        },
        createView: function(config){
            config.base = config.base || 'view';
            var View = this.getBase(config.base);
            return new View(config);
        }
    }


    root.app = app;

})(this)