const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Cadastro de novo usuário
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Dados insuficientes' });
  }

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Erro ao tentar fazer o cadastro:', error);
    res.status(500).json({ message: 'Erro ao tentar fazer o cadastro' });
  }
};

// Login de usuário existente
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Encontra o usuário
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifica a senha criptografada
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Cria um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).json({ message: 'Erro ao tentar fazer login' });
  }
};
