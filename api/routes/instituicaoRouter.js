module.exports = app => {
    const controller = app.controllers.instituicaoController;

    app.route('/inst')
        .get(controller.listarIntituicoes);

    app.route('/inst/:id')
        .get(controller.listarInstituicaoId);

    app.route('/inst/:login/:senha')
        .get(controller.login);

    app.route('/inst')
        .post(controller.cadastrarInstituicao);

    app.route('/inst')
        .put(controller.atualizarInstituicao);
}