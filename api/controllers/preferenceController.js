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
    return controller;
}