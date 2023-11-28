module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listarPreferencias = async (req, res) => {

        const response = await db.query (
            `
            SELECT
              AD004_IT_ID,
              AD004_VC_DESC
            FROM
              AD.AD004
            ORDER BY
              AD004_IT_ID
            `
        )
        res.status(200).send(response.rows);
    }

    controller.gravarPreferencia = async (req, res) => {

        const {
            ENT_IT_PREF,
            ENT_IT_VOLUNT
        } = req.body;

        const response = await db.query (
            `
            INSERT INTO AD.AD005(AD005_IT_VOLUNT, AD005_IT_PREFER, AD005_DT_ULTATU, AD005_DT_INCLUS)
            VALUES ($1, $2, NOW(), NOW())
            `,
            [   
            ENT_IT_VOLUNT,
            ENT_IT_PREF
            ]
        );

        res.status(200).send({"cd_erro":"0","ds_erro":"OK"});

    }
    return controller;
}