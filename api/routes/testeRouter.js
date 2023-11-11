module.exports = app => {
    const controller = app.controllers.testeController;

    app.route('/teste')
        .get(controller.tes);
}