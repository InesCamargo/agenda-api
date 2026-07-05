const express = require('express');
const app = express();

const usuarioRoutes = require('./src/routes/UsuarioRoutes');
const compromissoRoutes = require('./src/routes/CompromissoRoutes');
const loginRoutes = require('./src/routes/LoginRoutes'); 

app.use(express.json());


app.use('/login', loginRoutes);           
app.use('/usuarios', usuarioRoutes);
app.use('/compromissos', compromissoRoutes);

app.listen(3000, () => {
    console.log('API rodando na porta 3000');
});
