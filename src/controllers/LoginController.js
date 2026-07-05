const Usuario = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        if (usuario.senha !== senha) {
            return res.status(401).json({ erro: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            'segredo_da_miga',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao fazer login",
            detalhes: erro.message
        });
    }
}

module.exports = { login };
