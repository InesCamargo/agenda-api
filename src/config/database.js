const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agenda', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Testa a conexão automaticamente
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com MySQL estabelecida com sucesso!');

        // Proteção de compatibilidade para ambiente local: cria a coluna se ela ainda não existir.
        const [colunas] = await sequelize.query(`
            SELECT COLUMN_NAME
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = 'compromissos'
              AND COLUMN_NAME = 'email_enviado'
            LIMIT 1
        `);

        if (!colunas.length) {
            await sequelize.query(`
                ALTER TABLE compromissos
                ADD COLUMN email_enviado TINYINT(1) NOT NULL DEFAULT 0
            `);
            console.log('Coluna email_enviado adicionada na tabela compromissos.');
        }
    } catch (error) {
        console.error('Erro ao conectar no MySQL:', error);
    }
}

connect();

module.exports = sequelize;

