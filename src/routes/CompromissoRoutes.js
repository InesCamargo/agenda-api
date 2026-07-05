const express = require('express');
const CompromissoController = require('../controllers/CompromissoController');
const { executarVerificacaoCronEmail } = require('../cron/cronEmail');

const router = express.Router();

router.post('/', CompromissoController.criar);
router.get('/', CompromissoController.listar);
router.get('/usuario/:usuario_id', CompromissoController.listarPorUsuario);
router.post('/teste-cron', async (req, res) => {
	try {
		await executarVerificacaoCronEmail();
		return res.json({ mensagem: 'Teste de cron executado com sucesso' });
	} catch (error) {
		return res.status(500).json({ erro: 'Falha ao executar teste de cron' });
	}
});
router.get('/:id', CompromissoController.buscarPorId);
router.put('/:id', CompromissoController.atualizar);
router.delete('/:id', CompromissoController.deletar);

module.exports = router;
