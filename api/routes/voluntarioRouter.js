module.exports = app => {
    const controller = app.controllers.voluntarioController;

    app.route('/volunt/:login/:senha')
        .get(controller.loginVoluntario);

}