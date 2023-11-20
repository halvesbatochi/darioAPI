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
            ENT_IT_ID,
            ENT_IT_EVENTO,
            ENT_IT_ATIVID,
            ENT_IT_VOLUNT
        } = req.body;

        var command = "I";

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