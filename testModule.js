(function (root) {
    var app = root.app;
    app.viewModule('testModule',function(){
        return {
            override: {
                init:function(){
                    console.log('overridden init')
                }
            },
            chainAfter: {
                bindEvents:function(){
                    console.log('chainedAfter bindEvents called');
                }
            }
        }
    })

})(this)