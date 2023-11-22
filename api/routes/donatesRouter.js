module.exports = app => {
    const controller = app.controllers.donatesController;

    app.route('/donates')
        .get(controller.listarDonates);
}