require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Middleware
app.use(express.json());

app.use(cors()); // Adiciona o middleware CORS
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Sincronizar banco de dados
db.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.log('Erro ao sincronizar o banco de dados:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
