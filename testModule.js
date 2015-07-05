(function (root) {
    var app = root.app;
    app.viewModule('testModule',function(){
        return {
            override: {
                init:function(){
                    console.log('overridden init')
                }
            },
            chain: {
                loadMeta: function(){
                    console.log('chained load meta called');
                }
            }
        }
    })

})(this)