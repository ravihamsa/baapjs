(function (root) {
    var app = root.app;
    var View = app.getBase('view');

    var view = new View();
    view.render();
    view.$el.appendTo('.container');

})(this)