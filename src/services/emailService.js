const nodemailer = require('nodemailer');
require('dotenv').config();

const rejectUnauthorized = process.env.EMAIL_TLS_REJECT_UNAUTHORIZED === 'true';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Em ambiente local com proxy corporativo, o SMTP pode falhar por certificado interceptado.
  tls: {
    rejectUnauthorized
  }
});

async function enviarEmail(destinatario, assunto, mensagem) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: assunto,
      text: mensagem
    });

    console.log('Email enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

module.exports = { enviarEmail };


