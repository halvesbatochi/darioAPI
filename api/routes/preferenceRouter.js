module.exports = app => {
    const controller = app.controllers.preferenceController;

    app.route('/preference')
        .get(controller.listarPreferencias)
}