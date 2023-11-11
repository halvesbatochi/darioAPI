module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listaAtuacoes = async (req, res) => {
        const response = await db.query("SELECT AD003_IT_ID, AD003_VC_DESC FROM AD.AD003 ORDER BY AD003_IT_ID");
        res.status(200).send(response.rows);
    }

    controller.criarAtuacao = async (req, res) => {
        const { ent_vc_atuac } = req.body;
        const data = new Date().getTime();
        const { rows } = await db.query(
            "INSERT INTO AD.AD003 (ad003_vc_desc, ad003_dt_ultatu, ad003_dt_inclus) VALUES ($1, now(), now())",
            [ent_vc_atuac]
        );

        res.status(201).send({
            message: "Atuação criada com sucesso!"
        });
    }

    return controller;
}