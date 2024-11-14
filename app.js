require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Inicializar o aplicativo Express
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Importando e registrando as rotas
try {
    const userRoutes = require('./routes/userRoutes');
    const investmentRoutes = require('./routes/investmentRoutes');
    const earningsRoutes = require('./routes/earningsRoutes');
    const depositRoutes = require('./routes/depositRoutes');
    const withdrawalRoutes = require('./routes/withdrawalRoutes');
    const checkinRoutes = require('./routes/checkinRoutes');
    const transactionHistoryRoutes = require('./routes/transactionHistoryRoutes'); // Adicionando rota de histórico de transações
    const adminReportsRoutes = require('./routes/adminReportsRoutes'); // Adicionando rota de relatórios administrativos

    app.use('/api/users', userRoutes);
    app.use('/api/investments', investmentRoutes); // Registrando as rotas de investimentos
    app.use('/api/earnings', earningsRoutes); // Registrando as rotas de ganhos
    app.use('/api/deposits', depositRoutes); // Registrando as rotas de depósitos
    app.use('/api/withdrawals', withdrawalRoutes); // Registrando as rotas de saques
    app.use('/api/checkin', checkinRoutes); // Registrando a rota de check-in diário
    app.use('/api/transactions', transactionHistoryRoutes); // Registrando a rota de histórico de transações
    app.use('/api/admin-reports', adminReportsRoutes); // Registrando a rota de relatórios administrativos

    console.log('Rotas configuradas com sucesso');
} catch (error) {
    console.error('Erro ao configurar as rotas:', error);
}

// Configurar a porta e iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
