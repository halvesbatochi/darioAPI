module.exports = () => {
    const dados = require('../data/teste.json');
    const controller = {};

    controller.tes = (req, res) => res.status(200).json(dados);
    
    return controller;
}