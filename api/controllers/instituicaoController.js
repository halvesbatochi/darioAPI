module.exports = () => {

    const db = require('../../config/database');
    const controller = {};

    controller.listarIntituicoes = async (req, res) => {
        const response = await db.query (
            "SELECT * FROM AD.AD001 ORDER BY AD001_IT_ID"
        );
        res.status(200).send(response.rows);
    }

    controller.listarInstituicaoId = async (req, res) => {
        const id = parseInt(req.params.id);
        const response = await db.query(
            "SELECT * FROM AD.AD001 WHERE AD001_IT_ID = $1",
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
        const { AD001_IT_ID,
                AD001_VC_RZSOCI,
                AD001_VC_NFANTA,
                AD001_VC_BIOGRAF,
                AD001_VC_END,
                AD001_IT_NUM,
                AD001_VC_COMPL,
                AD001_VC_BAIRRO,
                AD001_VC_CIDADE,
                AD001_VC_CEP,
                AD001_VC_ESTADO,
                AD001_VC_EMAIL,
                AD001_VC_TELEF,
                AD001_VC_LOGIN,
                AD001_VC_SENHA,
                AD001_DT_ABERTURA,
                AD001_IT_ATUAC,
                AD001_VC_CNPJ,
                AD001_VC_INSCMUN,
                AD001_VC_INSCEST,
                AD001_VC_LOGO      } = req.body;

                var command = "I";

        const response = await db.query (
            `SELECT * FROM AD.PAD001001(1, $21, $22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 1)`,
            [   AD001_VC_RZSOCI,
                AD001_VC_NFANTA,
                AD001_VC_BIOGRAF,
                AD001_VC_END,
                AD001_IT_NUM,
                AD001_VC_COMPL,
                AD001_VC_BAIRRO,
                AD001_VC_CIDADE,
                AD001_VC_CEP,
                AD001_VC_ESTADO,
                AD001_VC_EMAIL,
                AD001_VC_TELEF,
                AD001_VC_LOGIN,
                AD001_VC_SENHA,
                AD001_DT_ABERTURA,
                AD001_IT_ATUAC,
                AD001_VC_CNPJ,
                AD001_VC_INSCMUN,
                AD001_VC_INSCEST,
                AD001_VC_LOGO, 
                command,
                AD001_IT_ID ]
        );

        res.status(200).send(response.rows);
    }

    controller.atualizarInstituicao = async (req, res) => {
        const { 
            AD001_IT_ID,
            AD001_VC_RZSOCI,
            AD001_VC_NFANTA,
            AD001_VC_BIOGRAF,
            AD001_VC_END,
            AD001_IT_NUM,
            AD001_VC_COMPL,
            AD001_VC_BAIRRO,
            AD001_VC_CIDADE,
            AD001_VC_CEP,
            AD001_VC_ESTADO,
            AD001_VC_EMAIL,
            AD001_VC_TELEF,
            AD001_VC_LOGIN,
            AD001_VC_SENHA,
            AD001_DT_ABERTURA,
            AD001_IT_ATUAC,
            AD001_VC_CNPJ,
            AD001_VC_INSCMUN,
            AD001_VC_INSCEST,
            AD001_VC_LOGO      } = req.body;

            var command = "U";


    const response = await db.query (
        `SELECT * FROM AD.PAD001001(1, $21, $22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 1)`,
        [   AD001_VC_RZSOCI,
            AD001_VC_NFANTA,
            AD001_VC_BIOGRAF,
            AD001_VC_END,
            AD001_IT_NUM,
            AD001_VC_COMPL,
            AD001_VC_BAIRRO,
            AD001_VC_CIDADE,
            AD001_VC_CEP,
            AD001_VC_ESTADO,
            AD001_VC_EMAIL,
            AD001_VC_TELEF,
            AD001_VC_LOGIN,
            AD001_VC_SENHA,
            AD001_DT_ABERTURA,
            AD001_IT_ATUAC,
            AD001_VC_CNPJ,
            AD001_VC_INSCMUN,
            AD001_VC_INSCEST,
            AD001_VC_LOGO, 
            command,
            AD001_IT_ID ]
    );

    res.status(200).send(response.rows);
    }

    controller.deletarInstituicao = async (req, res) => {
        const { 
            AD001_IT_ID,
            AD001_VC_RZSOCI,
            AD001_VC_NFANTA,
            AD001_VC_BIOGRAF,
            AD001_VC_END,
            AD001_IT_NUM,
            AD001_VC_COMPL,
            AD001_VC_BAIRRO,
            AD001_VC_CIDADE,
            AD001_VC_CEP,
            AD001_VC_ESTADO,
            AD001_VC_EMAIL,
            AD001_VC_TELEF,
            AD001_VC_LOGIN,
            AD001_VC_SENHA,
            AD001_DT_ABERTURA,
            AD001_IT_ATUAC,
            AD001_VC_CNPJ,
            AD001_VC_INSCMUN,
            AD001_VC_INSCEST,
            AD001_VC_LOGO      } = req.body;

            var command = "D";


    const response = await db.query (
        `SELECT * FROM AD.PAD001001(1, $21, $22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 1)`,
        [   AD001_VC_RZSOCI,
            AD001_VC_NFANTA,
            AD001_VC_BIOGRAF,
            AD001_VC_END,
            AD001_IT_NUM,
            AD001_VC_COMPL,
            AD001_VC_BAIRRO,
            AD001_VC_CIDADE,
            AD001_VC_CEP,
            AD001_VC_ESTADO,
            AD001_VC_EMAIL,
            AD001_VC_TELEF,
            AD001_VC_LOGIN,
            AD001_VC_SENHA,
            AD001_DT_ABERTURA,
            AD001_IT_ATUAC,
            AD001_VC_CNPJ,
            AD001_VC_INSCMUN,
            AD001_VC_INSCEST,
            AD001_VC_LOGO, 
            command,
            AD001_IT_ID ]
    );

    res.status(200).send(response.rows);
    }

    return controller;
}