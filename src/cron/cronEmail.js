const cron = require('node-cron');
const { enviarEmail } = require('../services/emailService');
const CompromissoController = require('../controllers/CompromissoController');
const CompromissoModel = require('../models/CompromissoModel');
const UsuarioModel = require('../models/UsuarioModel');

async function executarVerificacaoCronEmail() {
    console.log('Cron rodando: verificando compromissos...');

    try {
        const compromissos = await CompromissoController.buscarCompromissosParaEnviar();

        for (const compromisso of compromissos) {
            const usuario = await UsuarioModel.findByPk(compromisso.usuario_id);
            if (!usuario || !usuario.email) {
                continue;
            }

            await enviarEmail(
                usuario.email,
                `Lembrete: ${compromisso.titulo}`,
                `Miga, tu tem um compromisso: ${compromisso.descricao}`
            );

            await CompromissoModel.marcarEmailEnviado(compromisso.id);
            console.log(`Email enviado para ${usuario.email}`);
        }
    } catch (error) {
        console.error('Erro no cron:', error);
    }
}

cron.schedule('* * * * *', executarVerificacaoCronEmail);

module.exports = { executarVerificacaoCronEmail };
