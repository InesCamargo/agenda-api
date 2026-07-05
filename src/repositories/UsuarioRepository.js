const Usuario = require('../models/UsuarioModel');

class UsuarioRepository {

    async criar(dados) {
        return await Usuario.create(dados);
    }

    async listar() {
        return await Usuario.findAll();
    }

    async buscarPorId(id) {
        return await Usuario.findByPk(id);
    }

    async atualizar(id, dados) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return null;

        await usuario.update(dados);
        return usuario;
    }

    async deletar(id) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return null;

        await usuario.destroy();
        return usuario;
    }
}

module.exports = new UsuarioRepository();
