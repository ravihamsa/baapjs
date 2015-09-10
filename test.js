(function (root) {
    var app = root.app;
    var view = app.createView({modules:['testModule']});
    view.render();
    view.$el.appendTo('.container');

})(this)