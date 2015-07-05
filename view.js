(function (root) {
    var app = root.app;


    var initMethodsList = ['init'];
    var renderMethodList = ['loadMeta', 'beforeRender', 'renderTemplate', 'afterRender'];


    var View = Backbone.View.extend({
        template: 'needs to be overridden',
        constructor: function (options) {
            var _this = this;
            Backbone.View.apply(_this, arguments);
            _this._moduleIndex = {};
            _.each(options.modules, function (name) {
                _this._moduleIndex[name] = app.getViewModule(name);
            })
            _this._executeMethodList(initMethodsList);
        },

        _executeMethodList: function (methodList) {
            var overRiddenMethods = {};
            var chainedMethods = {};
            var _this = this;
            _.each(methodList, function (methodName) {
                chainedMethods[methodName] = [];
            })
            _.each(this._moduleIndex, function (module) {
                var moduleOverride = module.override;
                if (moduleOverride) {
                    overRiddenMethods = _.extend({}, overRiddenMethods, _.pick.apply(null, [].concat(moduleOverride).concat(methodList)));
                }
                var moduleChain = module.chain;
                if (moduleChain) {
                    _.each(methodList, function (methodName) {
                        if (moduleChain[methodName]) {
                            chainedMethods[methodName].push(moduleChain[methodName]);
                        }
                    });
                }
            });

            var toBeCalled = [];

            _.each(methodList, function (methodName) {
                var overRiddenMethod = overRiddenMethods[methodName];
                var chainedMethodList = chainedMethods[methodName];

                if (overRiddenMethod) {
                    //overRiddenMethod.call(_this);
                    toBeCalled.push(overRiddenMethod);
                } else {
                    toBeCalled.push(_this[methodName]);
                    //_this[methodName].call(_this);
                    if (chainedMethodList.length > 0) {
                        _.each(chainedMethodList, function (chainedMethod) {
                            //chainedMethod.call(_this);
                            toBeCalled.push(chainedMethod);
                        })
                    }
                }
            })

            console.log(toBeCalled);
            this._executeSyncAsync(toBeCalled);
        },
        _executeSyncAsync: function(list){
            if(list.length === 0){
                return;
            }
            var _this = this;
            var methodToCall = list.shift();
            var returnObj = methodToCall.call(_this);
            if(returnObj && returnObj.always){
                returnObj.always(function(){
                    _this._executeSyncAsync(list);
                })
            }else{
                _this._executeSyncAsync(list);
            }
        },
        init: function () {
            console.log('init called');
        },
        loadMeta: function () {
            console.log('loadMeta called');
            var def = $.Deferred();
            console.log('started waiting');
            setTimeout(function(){
                console.log(' waiting done');
                def.resolve()
            },1000)

            return def;
        },
        beforeRender: function () {
            console.log('beforeRender called');
        },
        render: function () {
            console.log('render called');
            this._executeMethodList(renderMethodList);
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