const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const { port } = require('./config/config');

const app = express();

// Configurações iniciais
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
connectDB();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
