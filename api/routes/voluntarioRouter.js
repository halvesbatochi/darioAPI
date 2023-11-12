module.exports = app => {
    const controller = app.controllers.voluntarioController;

    app.route('/volunt/:login/:senha')
        .get(controller.loginVoluntario);

    app.route('/volunt')
        .post(controller.cadastrarVoluntario);

    app.route('/volunt')
        .put(controller.atualizarVoluntario);

    app.route('/volunt')
        .delete(controller.deletarVoluntario);

    app.route('/volunt/insc')
        .post(controller.inscreverEvento);

    app.route('/volunt/insc')
        .put(controller.atualizarInscreverEvento);

    app.route('/volunt/insc')
        .delete(controller.deletarInscricaoEvento);

}