module.exports = app => {
    const controller = app.controllers.eventoController;

    app.route('/event')
        .get(controller.listarEventos);

    app.route('/event/:id')
        .get(controller.listarEventoId);

    app.route('/event')
        .post(controller.cadastrarEvento);

    app.route('/event')
        .put(controller.atualizarEvento);

    app.route('/event')
        .delete(controller.deletarEvento);
}