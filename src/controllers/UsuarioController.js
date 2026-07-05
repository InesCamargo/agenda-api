const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioController {

    async criar(req, res) {
        try {
            const usuario = await UsuarioRepository.criar(req.body);
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
        }
    }

    async listar(req, res) {
        try {
            const usuarios = await UsuarioRepository.listar();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const usuario = await UsuarioRepository.buscarPorId(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const usuario = await UsuarioRepository.atualizar(req.params.id, req.body);
            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const usuario = await UsuarioRepository.deletar(req.params.id);
            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            return res.json({ mensagem: 'Usuário deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: error.message });
        }
    }
}

module.exports = new UsuarioController();
