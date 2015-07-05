(function (root) {
    var app = root.app;
    app.addModule('view', 'testModule',function(){
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