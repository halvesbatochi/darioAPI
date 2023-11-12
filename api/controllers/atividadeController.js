module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listarAtividades = async (req, res) => {
        const response = await db.query (
            "SELECT EV002_IT_ID, EV002_VC_DESC FROM EV.EV002 ORDER BY EV002_IT_ID"
        );
        res.status(200).send(response.rows);
    }

    controller.cadastrarAtividade = async (req, res) => {
        const {ENT_VC_DESC} = req.body;
        const response = await db.query (
            "INSERT INTO EV.EV002 (EV002_VC_DESC, EV002_DT_ULTATU, EV002_DT_INCLUS) VALUES ($1, NOW(), NOW())",
            [ENT_VC_DESC]
        );
        res.status(200).send(response.rows);
    }

    return controller;
}