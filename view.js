(function (root) {
    var app = root.app;


    var initMethodsList = ['init', 'loadMeta', 'beforeRender', 'render', 'afterRender'];


    var View = Backbone.View.extend({
        template: 'needs to be overridden',
        constructor: function (options) {
            var _this = this;
            Backbone.View.apply(_this, arguments);
            _this._moduleIndex = {};
            _.each(options.modules, function (name) {
                _this._moduleIndex[name] = app.getViewModule(name);
            })
            _this._baseInit();
        },
        _baseInit: function () {
            var overRiddenMethods = {};
            var chainedMethods = {};
            var _this = this;
            _.each(initMethodsList, function (methodName) {
                chainedMethods[methodName] = [];
            })
            _.each(this._moduleIndex, function (module) {
                var moduleOverride = module.override;
                if (moduleOverride) {
                    overRiddenMethods = _.extend({}, overRiddenMethods, _.pick.apply(null, [].concat(moduleOverride).concat(initMethodsList)));
                }
                var moduleChain = module.chain;
                if (moduleChain) {
                    _.each(initMethodsList, function (methodName) {
                        if (moduleChain[methodName]) {
                            chainedMethods[methodName].push(moduleChain[methodName]);
                        }
                    });
                }
            });

            _.each(initMethodsList, function (methodName) {
                var overRiddenMethod = overRiddenMethods[methodName];
                var chainedMethodList = chainedMethods[methodName];

                if (overRiddenMethod) {
                    overRiddenMethod.call(_this);
                } else {
                    _this[methodName].call(_this);
                    if (chainedMethodList.length > 0) {
                        _.each(chainedMethodList, function (chainedMethod) {
                            chainedMethod.call(_this);
                        })
                    }
                }
            })
        },
        init: function () {
            console.log('init called');
        },
        loadMeta: function () {
            console.log('loadMeta called');
        },
        beforeRender: function () {
            console.log('beforeRender called');
        },
        render: function () {
            console.log('render called');
            this.renderTemplate();
        },
        renderTemplate: function () {
            console.log('renderTemplate called');
            this.$el.html('ravi kumar ha')
        },
        afterRender: function () {
            console.log('afterRender called');
        },
        serialize: function () {

        }
    })

    app.base('view', View)

})(this)