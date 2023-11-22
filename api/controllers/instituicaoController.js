module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listarIntituicoes = async (req, res) => {
        const response = await db.query (
            `SELECT 
                AD001_IT_ATUAC,
                (SELECT AD003_VC_DESC FROM AD.AD003 WHERE AD003_IT_ID = AD001_IT_ATUAC),
                AD001_IT_ID,
                AD001_VC_NFANTA,
                AD001_VC_LOGO,
                AD001_VC_BAIRRO,
                AD001_VC_CIDADE,
                AD001_VC_BIOGRAF,
                AD001_VC_EMAIL,
                AD001_VC_TELEF
             FROM 
               AD.AD001
             WHERE
               AD001_IT_SITUAC = 1
             ORDER BY 
               AD001_IT_ID
            `
        );
        res.status(200).send(response.rows);
    }

    controller.listarInstituicaoId = async (req, res) => {
        const id = parseInt(req.params.id);
        const response = await db.query(
            `
            SELECT 
              AD001_IT_ATUAC,
              (SELECT AD003_VC_DESC FROM AD.AD003 WHERE AD003_IT_ID = AD001_IT_ATUAC),
              AD001_IT_ID,
              AD001_VC_NFANTA,
              AD001_VC_LOGO,
              AD001_VC_BAIRRO,
              AD001_VC_CIDADE,
              AD001_VC_BIOGRAF,
              AD001_VC_EMAIL,
              AD001_VC_TELEF
            FROM 
              AD.AD001 
            WHERE 
              AD001_IT_ID = $1
            `,
            [id]
        );

        res.status(200).send(response.rows);
    }

    controller.login = async (req, res) => {
        const login = req.params.login;
        const senha = req.params.senha;

        const response = await db.query(
            "SELECT * FROM AD.PAD001003(1, $1, $2)",
            [login, senha]
        );

        res.status(200).send(response.rows);
    }

    controller.cadastrarInstituicao = async (req, res) => {
        const { ENT_IT_ID,
                ENT_VC_RZSOCI,
                ENT_VC_NFANTA,
                ENT_VC_BIOGRAF,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_ESTADO,
                ENT_VC_EMAIL,
                ENT_VC_TELEF,
                ENT_VC_LOGIN,
                ENT_VC_SENHA,
                ENT_DT_ABERTURA,
                ENT_IT_ATUAC,
                ENT_VC_CNPJ,
                ENT_VC_INSCMUN,
                ENT_VC_INSCEST,
                ENT_VC_LOGO      } = req.body;

                var command = "I";

        const response = await db.query (
            `SELECT * FROM AD.PAD001001(1, $21, $22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 1)`,
            [   ENT_VC_RZSOCI,
                ENT_VC_NFANTA,
                ENT_VC_BIOGRAF,
                ENT_VC_END,
                ENT_IT_NUM,
                ENT_VC_COMPL,
                ENT_VC_BAIRRO,
                ENT_VC_CIDADE,
                ENT_VC_CEP,
                ENT_VC_ESTADO,
                ENT_VC_EMAIL,
                ENT_VC_TELEF,
                ENT_VC_LOGIN,
                ENT_VC_SENHA,
                ENT_DT_ABERTURA,
                ENT_IT_ATUAC,
                ENT_VC_CNPJ,
                ENT_VC_INSCMUN,
                ENT_VC_INSCEST,
                ENT_VC_LOGO, 
                command,
                ENT_IT_ID ]
        );

        res.status(200).send(response.rows);
    }

    controller.atualizarInstituicao = async (req, res) => {
        const { 
            ENT_IT_ID,
            ENT_VC_RZSOCI,
            ENT_VC_NFANTA,
            ENT_VC_BIOGRAF,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_LOGIN,
            ENT_VC_SENHA,
            ENT_DT_ABERTURA,
            ENT_IT_ATUAC,
            ENT_VC_CNPJ,
            ENT_VC_INSCMUN,
            ENT_VC_INSCEST,
            ENT_VC_LOGO      } = req.body;

            var command = "U";


    const response = await db.query (
        `SELECT * FROM AD.PAD001001(1, $21, $22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 1)`,
        [   ENT_VC_RZSOCI,
            ENT_VC_NFANTA,
            ENT_VC_BIOGRAF,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_LOGIN,
            ENT_VC_SENHA,
            ENT_DT_ABERTURA,
            ENT_IT_ATUAC,
            ENT_VC_CNPJ,
            ENT_VC_INSCMUN,
            ENT_VC_INSCEST,
            ENT_VC_LOGO, 
            command,
            ENT_IT_ID ]
    );

    res.status(200).send(response.rows);
    }

    controller.deletarInstituicao = async (req, res) => {
        const { 
            ENT_IT_ID,
            ENT_VC_RZSOCI,
            ENT_VC_NFANTA,
            ENT_VC_BIOGRAF,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_LOGIN,
            ENT_VC_SENHA,
            ENT_DT_ABERTURA,
            ENT_IT_ATUAC,
            ENT_VC_CNPJ,
            ENT_VC_INSCMUN,
            ENT_VC_INSCEST,
            ENT_VC_LOGO      } = req.body;

            var command = "D";


    const response = await db.query (
        `SELECT * FROM AD.PAD001001(1, $21, $22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 1)`,
        [   ENT_VC_RZSOCI,
            ENT_VC_NFANTA,
            ENT_VC_BIOGRAF,
            ENT_VC_END,
            ENT_IT_NUM,
            ENT_VC_COMPL,
            ENT_VC_BAIRRO,
            ENT_VC_CIDADE,
            ENT_VC_CEP,
            ENT_VC_ESTADO,
            ENT_VC_EMAIL,
            ENT_VC_TELEF,
            ENT_VC_LOGIN,
            ENT_VC_SENHA,
            ENT_DT_ABERTURA,
            ENT_IT_ATUAC,
            ENT_VC_CNPJ,
            ENT_VC_INSCMUN,
            ENT_VC_INSCEST,
            ENT_VC_LOGO, 
            command,
            ENT_IT_ID ]
    );

    res.status(200).send(response.rows);
    }

    return controller;
}