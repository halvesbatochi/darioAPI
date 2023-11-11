module.exports = app => {
    const controller = app.controllers.atuacaoController;

    app.route('/atuac')
        .get(controller.listaAtuacoes);

    app.route('/atuac')
    .post(controller.criarAtuacao);;

}