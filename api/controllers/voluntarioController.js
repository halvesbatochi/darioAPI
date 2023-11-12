module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.loginVoluntario = async (req, res) => {
        const login = req.params.login;
        const senha = req.params.senha;

        const response  = await db.query (
            "SELECT * FROM AD.PAD001004(1, $1, $2)",
            [login, senha]
        );

        res.status(200).send(response.rows);
    }

    controller.cadastrarVoluntario = async (req, res) => {
        
    }


    return controller;
}