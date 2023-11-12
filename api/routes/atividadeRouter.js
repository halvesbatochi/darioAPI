module.exports = app => {

    const controller = app.controllers.atividadeController;

    app.route('/ativid')
        .get(controller.listarAtividades);

    app.route('/ativid')
        .post(controller.cadastrarAtividade);
}