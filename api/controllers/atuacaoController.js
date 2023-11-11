module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listaAtuacoes = (req, res) => {
        res.status(200).json({"mensagem":"Sucesso"});
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