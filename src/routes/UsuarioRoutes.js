const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { enviarEmail } = require('../services/emailService'); // IMPORTAÇÃO CORRETA

const router = express.Router();

// ⭐ ROTA DE TESTE DE E-MAIL — TEM QUE VIR ANTES DE /:id
router.get('/teste-email', async (req, res) => {
    try {
        await enviarEmail(
            'inesvieiracamargo@gmail.com',
            'Teste da Agenda API',
            'Miga, este é o primeiro e-mail enviado pela tua API!'
        );

        res.json({ mensagem: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Falha ao enviar e-mail' });
    }
});

// ⭐ ROTAS DE USUÁRIO
router.post('/', UsuarioController.criar);
router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

module.exports = router;


