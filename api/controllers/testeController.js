module.exports = () => {
    const dados = require('../../api/data/teste.json');
    
    const controller = {};

    controller.tes = (req, res) => res.status(200).json(dados);
    
    return controller;
}