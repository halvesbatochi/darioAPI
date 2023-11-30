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

        res.status(200).send(response.rows[0]);
    }

    controller.historicoVoluntario = async (req, res) => {
        const id = req.params.id;

        const response = await db.query (
            `
            select
                (SELECT AD001_VC_NFANTA FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
                (SELECT AD001_VC_LOGO FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
                (SELECT AD001_IT_ATUAC FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
                (SELECT A.AD003_VC_DESC FROM AD.AD001 I INNER JOIN AD.AD003 A ON (I.AD001_IT_ATUAC = A.AD003_IT_ID) WHERE AD001_IT_ID = EV001_IT_INST),
                (SELECT EV002_VC_DESC AS EV001_VC_ATV1 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV1),
                (SELECT EV002_VC_DESC AS EV001_VC_ATV2 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV2),
                (SELECT EV002_VC_DESC AS EV001_VC_ATV3 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV3),
                ev001_it_id,
                ev001_it_inst,
                ev001_vc_end,
                ev001_it_num,
                ev001_vc_compl,
                ev001_vc_bairro,
                ev001_vc_cidade,
                ev001_vc_estado,
                ev001_vc_pais,
                ev001_vc_titulo,
                ev001_dt_inic,
                ev001_hr_inic,
                ev001_dt_fim,
                ev001_hr_fim,
                ev001_it_npart,
                ev001_vc_fmsg1,
                ev001_vc_fmsg2,
                ev001_vc_fmsg3,
                ev001_vc_fmsg4,
                ev001_vc_fmsg5,
                ev001_vc_pmsg1,
                ev001_vc_pmsg2,
                ev001_vc_img1,
                ev001_vc_img2,
                ev001_it_atv1,
                ev001_it_atv2,
                ev001_it_atv3,
                ev001_it_situac,
                ev001_dt_ultatu,
                ev001_dt_inclus
            FROM 
              ev.ev001 a inner join ev.ev003 b on (a.ev001_it_id = b.ev003_it_evento) 
            where 
                ev003_it_situac = 1
            and ev003_it_volunt = $1
            order by
                ev003_dt_ultatu;`,
        [id]
        );

        res.status(200).send(response.rows);
    }

    controller.cadastrarVoluntario = async (req, res) => {
        const {
            ENT_IT_ID,
            ENT_VC_NOME,
            ENT_VC_SOBREN,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_RG,
            ENT_VC_CPF,
            ENT_DT_NASC,
            ENT_IT_SEXO,
            ENT_VC_LOGIN,
            ENT_VC_SENHA
        } = req.body;

        var command = "I";

        const response = await db.query (
            "SELECT * FROM AD.PAD001005(1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $19, $11, $12, $13, $14, $15, $16, $17, $18, 1)",
            [   command,
                ENT_IT_ID,
                ENT_VC_NOME,
                ENT_VC_SOBREN,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_EMAIL,
                ENT_VC_TELEF,
                ENT_VC_RG,
                ENT_VC_CPF,
                ENT_DT_NASC,
                ENT_IT_SEXO,
                ENT_VC_LOGIN,
                ENT_VC_SENHA,
                ENT_VC_ESTADO
            ]
        );

        res.status(200).send(response.rows);
    }

    controller.atualizarVoluntario = async (req, res) => {
        const {
            ENT_IT_ID,
            ENT_VC_NOME,
            ENT_VC_SOBREN,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_RG,
            ENT_VC_CPF,
            ENT_DT_NASC,
            ENT_IT_SEXO,
            ENT_VC_LOGIN,
            ENT_VC_SENHA
        } = req.body;

        var command = "U";

        const response = await db.query (
            "SELECT * FROM AD.PAD001005(1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $19, $11, $12, $13, $14, $15, $16, $17, $18, 1)",
            [   command,
                ENT_IT_ID,
                ENT_VC_NOME,
                ENT_VC_SOBREN,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_EMAIL,
                ENT_VC_TELEF,
                ENT_VC_RG,
                ENT_VC_CPF,
                ENT_DT_NASC,
                ENT_IT_SEXO,
                ENT_VC_LOGIN,
                ENT_VC_SENHA, 
                ENT_VC_ESTADO]
        );

        res.status(200).send(response.rows);
    }

    controller.deletarVoluntario = async (req, res) => {
        const {
            ENT_IT_ID,
            ENT_VC_NOME,
            ENT_VC_SOBREN,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_RG,
            ENT_VC_CPF,
            ENT_DT_NASC,
            ENT_IT_SEXO,
            ENT_VC_LOGIN,
            ENT_VC_SENHA
        } = req.body;

        var command = "D";

        const response = await db.query (
            "SELECT * FROM AD.PAD001005(1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $19, $11, $12, $13, $14, $15, $16, $17, $18, 1)",
            [   command,
                ENT_IT_ID,
                ENT_VC_NOME,
                ENT_VC_SOBREN,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_EMAIL,
                ENT_VC_TELEF,
                ENT_VC_RG,
                ENT_VC_CPF,
                ENT_DT_NASC,
                ENT_IT_SEXO,
                ENT_VC_LOGIN,
                ENT_VC_SENHA,  
                ENT_VC_ESTADO]
        );

        res.status(200).send(response.rows);
    }

    controller.inscreverEvento = async (req, res) => {
        const {
            ENT_IT_ATIVID,
            ENT_IT_EVENTO,
            ENT_IT_VOLUNT
        } = req.body;

        var command = "I";

        const response = await db.query(
            "SELECT * FROM EV.PEV001001(1, $1, null, $2, $3, $4)",
            [
                command,
                ENT_IT_EVENTO,
                ENT_IT_ATIVID,
                ENT_IT_VOLUNT
            ]
        );
        res.status(200).send(response.rows[0]);
    }

    controller.cadastrarVisita = async (req, res) => {
        const {
            ENT_IT_VOLUNT,
            ENT_IT_EVENT,
            ENT_IT_ATUAC,
            ENT_IT_ATV1,
            ENT_IT_ATV2,
            ENT_IT_ATV3
        } = req.body

        const response = await db.query (
            `INSERT INTO EV.EV006 VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
            [
                ENT_IT_VOLUNT,
                ENT_IT_EVENT,
                ENT_IT_ATUAC,
                ENT_IT_ATV1,
                ENT_IT_ATV2,
                ENT_IT_ATV3
            ]
        );
        res.status(200).send({"DS_ERRO":"Visita cadastrada"})
    }

    controller.atualizarInscreverEvento = async (req, res) => {
        const {
            ENT_IT_ID,
            ENT_IT_EVENTO,
            ENT_IT_ATIVID,
            ENT_IT_VOLUNT
        } = req.body;

        var command = "U";

        const response = await db.query(
            "SELECT * FROM EV.PEV001001(1, $1, $2, $3, $4, $5)",
            [
                command,
                ENT_IT_ID,
                ENT_IT_EVENTO,
                ENT_IT_ATIVID,
                ENT_IT_VOLUNT
            ]
        );

        res.status(200).send(response.rows);
    }

    controller.deletarInscricaoEvento = async (req, res) => {
        const {
            ENT_IT_ID,
            ENT_IT_EVENTO,
            ENT_IT_ATIVID,
            ENT_IT_VOLUNT
        } = req.body;

        var command = "D";

        const response = await db.query(
            "SELECT * FROM EV.PEV001001(1, $1, $2, $3, $4, $5)",
            [
                command,
                ENT_IT_ID,
                ENT_IT_EVENTO,
                ENT_IT_ATIVID,
                ENT_IT_VOLUNT
            ]
        );

        res.status(200).send(response.rows);
    }


    return controller;
}