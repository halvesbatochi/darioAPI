module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listarDonates = async (req, res) => {
        const response = await db.query (
        `SELECT
            (SELECT ad001_vc_nfanta FROM AD.AD001 WHERE AD001_IT_ID = EV005_IT_IDINST),
            (SELECT AD001_VC_LOGO  FROM AD.AD001 WHERE AD001_IT_ID = EV005_IT_IDINST),
            EV005_IT_ID,
            EV005_VC_METOD,
            EV005_VC_DESC,
            EV005_VC_DESCAUX
        FROM
            EV.ev005
        WHERE
            EV005_IT_SITUAC = 1;`
        )
        res.status(200).send(response.rows);
    }

    return controller;
}