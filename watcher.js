(function (root) {
    var app = root.app;
    app.viewModule('watcher',function(){
        return {
            override: {
                init:function(){
                    console.log('overridden init')
                }
            },
            chainAfter: {
                bindEvents:function(){
                    console.log('chained bindEvents called');
                }
            }
        }
    })

})(this)