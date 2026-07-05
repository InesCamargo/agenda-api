const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definição do modelo
const Compromisso = sequelize.define('Compromisso', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email_enviado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'compromissos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

// Criar compromisso
async function criar(dados) {
    return await Compromisso.create(dados);
}

// Listar todos
async function listar() {
    return await Compromisso.findAll();
}

// Buscar por ID
async function buscarPorId(id) {
    return await Compromisso.findByPk(id);
}

// Listar compromissos por usuário
async function listarPorUsuario(usuario_id) {
    return await Compromisso.findAll({ where: { usuario_id } });
}

// Atualizar compromisso
async function atualizar(id, dados) {
    await Compromisso.update(dados, { where: { id } });
    return buscarPorId(id);
}

// Deletar compromisso
async function deletar(id) {
    await Compromisso.destroy({ where: { id } });
}

// Marcar email enviado
async function marcarEmailEnviado(id) {
    await Compromisso.update(
        { email_enviado: true },
        { where: { id } }
    );
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    listarPorUsuario,
    atualizar,
    deletar,
    marcarEmailEnviado
};


