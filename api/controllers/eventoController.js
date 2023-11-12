module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listarEventos = async (req, res) => {
        const response = await db.query (
            "SELECT * FROM EV.EV001 ORDER BY EV001_IT_ID"
        );
        res.status(200).send(response.rows);
    }

    controller.listarAlgoritmo = async (req, res) => {
        res.status(200).send({message: "AQUI VAI SER A CHAMADA DO ALGORITMO"});
    }

    controller.listarEventoId = async (req, res) => {
        const id = parseInt(req.params.id);
        const response = await db.query(
            "SELECT * FROM EV.EV001 WHERE EV001_IT_ID = $1",
            [id]
        );

        res.status(200).send(response.rows);
    }

    controller.cadastrarEvento = async (req, res) => {
        const {
            ENT_IT_INSTID,
            ENT_IT_EVNID,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_TITULO,
            ENT_DT_INIC,
            ENT_HR_INIC,
            ENT_DT_FIM,
            ENT_HR_FIM,
            ENT_IT_NPART,
            ENT_VC_FMSG1,
            ENT_VC_FMSG2,
            ENT_VC_FMSG3,
            ENT_VC_FMSG4,
            ENT_VC_FMSG5,
            ENT_VC_PMSG1,
            ENT_VC_PMSG2,
            ENT_VC_IMG1,
            ENT_VC_IMG2,
            ENT_IT_ATV1,
            ENT_IT_ATV2,
            ENT_IT_ATV3,
        } = req.body;

        var command = "I";

        const response = await db.query (
            `SELECT * FROM AD.PAD001002(1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 1)`,
            [   command,
                ENT_IT_INSTID,
                ENT_IT_EVNID,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_ESTADO,
                ENT_VC_TITULO,
                ENT_DT_INIC,
                ENT_HR_INIC,
                ENT_DT_FIM,
                ENT_HR_FIM,
                ENT_IT_NPART,
                ENT_VC_FMSG1,
                ENT_VC_FMSG2,
                ENT_VC_FMSG3,
                ENT_VC_FMSG4,
                ENT_VC_FMSG5,
                ENT_VC_PMSG1,
                ENT_VC_PMSG2,
                ENT_VC_IMG1,
                ENT_VC_IMG2,
                ENT_IT_ATV1,
                ENT_IT_ATV2,
                ENT_IT_ATV3 ]
        );

        res.status(200).send(response.rows);
    }

    controller.atualizarEvento = async (req, res) => {
        const {
            ENT_IT_INSTID,
            ENT_IT_EVNID,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_TITULO,
            ENT_DT_INIC,
            ENT_HR_INIC,
            ENT_DT_FIM,
            ENT_HR_FIM,
            ENT_IT_NPART,
            ENT_VC_FMSG1,
            ENT_VC_FMSG2,
            ENT_VC_FMSG3,
            ENT_VC_FMSG4,
            ENT_VC_FMSG5,
            ENT_VC_PMSG1,
            ENT_VC_PMSG2,
            ENT_VC_IMG1,
            ENT_VC_IMG2,
            ENT_IT_ATV1,
            ENT_IT_ATV2,
            ENT_IT_ATV3,
        } = req.body;

        var command = "U";

        const response = await db.query (
            `SELECT * FROM AD.PAD001002(1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 1)`,
            [   command,
                ENT_IT_INSTID,
                ENT_IT_EVNID,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_ESTADO,
                ENT_VC_TITULO,
                ENT_DT_INIC,
                ENT_HR_INIC,
                ENT_DT_FIM,
                ENT_HR_FIM,
                ENT_IT_NPART,
                ENT_VC_FMSG1,
                ENT_VC_FMSG2,
                ENT_VC_FMSG3,
                ENT_VC_FMSG4,
                ENT_VC_FMSG5,
                ENT_VC_PMSG1,
                ENT_VC_PMSG2,
                ENT_VC_IMG1,
                ENT_VC_IMG2,
                ENT_IT_ATV1,
                ENT_IT_ATV2,
                ENT_IT_ATV3 ]
        );

        res.status(200).send(response.rows);
    }

    controller.deletarEvento = async (req, res) => {
        const {
            ENT_IT_INSTID,
            ENT_IT_EVNID,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_TITULO,
            ENT_DT_INIC,
            ENT_HR_INIC,
            ENT_DT_FIM,
            ENT_HR_FIM,
            ENT_IT_NPART,
            ENT_VC_FMSG1,
            ENT_VC_FMSG2,
            ENT_VC_FMSG3,
            ENT_VC_FMSG4,
            ENT_VC_FMSG5,
            ENT_VC_PMSG1,
            ENT_VC_PMSG2,
            ENT_VC_IMG1,
            ENT_VC_IMG2,
            ENT_IT_ATV1,
            ENT_IT_ATV2,
            ENT_IT_ATV3,
        } = req.body;

        var command = "D";

        const response = await db.query (
            `SELECT * FROM AD.PAD001002(1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 1)`,
            [   command,
                ENT_IT_INSTID,
                ENT_IT_EVNID,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_ESTADO,
                ENT_VC_TITULO,
                ENT_DT_INIC,
                ENT_HR_INIC,
                ENT_DT_FIM,
                ENT_HR_FIM,
                ENT_IT_NPART,
                ENT_VC_FMSG1,
                ENT_VC_FMSG2,
                ENT_VC_FMSG3,
                ENT_VC_FMSG4,
                ENT_VC_FMSG5,
                ENT_VC_PMSG1,
                ENT_VC_PMSG2,
                ENT_VC_IMG1,
                ENT_VC_IMG2,
                ENT_IT_ATV1,
                ENT_IT_ATV2,
                ENT_IT_ATV3 ]
        );

        res.status(200).send(response.rows);
    }

    return controller;
}