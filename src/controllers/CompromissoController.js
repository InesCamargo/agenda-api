const CompromissoModel = require('../models/CompromissoModel');

// Criar compromisso
async function criar(req, res) {
    try {
        const compromisso = await CompromissoModel.criar(req.body);
        res.status(201).json(compromisso);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar compromisso' });
    }
}

// Listar todos
async function listar(req, res) {
    try {
        const compromissos = await CompromissoModel.listar();
        res.json(compromissos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar compromissos' });
    }
}

// Buscar por ID
async function buscarPorId(req, res) {
    try {
        const compromisso = await CompromissoModel.buscarPorId(req.params.id);

        if (!compromisso) {
            return res.status(404).json({ erro: 'Compromisso não encontrado' });
        }

        res.json(compromisso);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar compromisso' });
    }
}

// Listar compromissos por usuário
async function listarPorUsuario(req, res) {
    try {
        const compromissos = await CompromissoModel.listarPorUsuario(req.params.usuario_id);
        res.json(compromissos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar compromissos do usuário' });
    }
}

// Atualizar compromisso
async function atualizar(req, res) {
    try {
        const compromisso = await CompromissoModel.atualizar(req.params.id, req.body);
        res.json(compromisso);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar compromisso' });
    }
}

// Deletar compromisso
async function deletar(req, res) {
    try {
        await CompromissoModel.deletar(req.params.id);
        res.json({ mensagem: 'Compromisso deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar compromisso' });
    }
}

/* ⭐ FUNÇÃO REAL PARA O CRON
   - Busca compromissos no banco
   - Verifica se está faltando 1 hora
   - Evita enviar duplicado
*/
async function buscarCompromissosParaEnviar() {
    try {
        const compromissos = await CompromissoModel.listar();

        const agora = new Date();

        const compromissosParaEnviar = compromissos.filter(c => {
            const dataCompromisso = new Date(c.data_hora);

            const diffMinutos = (dataCompromisso - agora) / 1000 / 60;

            return (
                diffMinutos <= 60 &&      // Falta 1 hora
                diffMinutos > 0 &&        // Ainda não passou
                !c.email_enviado          // Evita duplicação
            );
        });

        return compromissosParaEnviar;

    } catch (error) {
        console.error('Erro ao buscar compromissos para enviar:', error);
        return [];
    }
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    listarPorUsuario,
    atualizar,
    deletar,
    buscarCompromissosParaEnviar
};


