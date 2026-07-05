const Compromisso = require('../models/CompromissoModel');
const Usuario = require('../models/UsuarioModel');

class CompromissoRepository {

    async criar(dados) {
        return await Compromisso.create(dados);
    }

    async listar() {
        return await Compromisso.findAll({
            include: {
                model: Usuario,
                attributes: ['id', 'nome', 'email']
            }
        });
    }

    async buscarPorId(id) {
        return await Compromisso.findByPk(id, {
            include: {
                model: Usuario,
                attributes: ['id', 'nome', 'email']
            }
        });
    }

    async listarPorUsuario(usuario_id) {
        return await Compromisso.findAll({
            where: { usuario_id },
            include: {
                model: Usuario,
                attributes: ['id', 'nome', 'email']
            }
        });
    }

    async atualizar(id, dados) {
        const compromisso = await Compromisso.findByPk(id);
        if (!compromisso) return null;

        await compromisso.update(dados);
        return compromisso;
    }

    async deletar(id) {
        const compromisso = await Compromisso.findByPk(id);
        if (!compromisso) return null;

        await compromisso.destroy();
        return compromisso;
    }
}

module.exports = new CompromissoRepository();
