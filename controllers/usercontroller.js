const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Função de Registro de Usuário
exports.registerUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Verifica se o número de telefone e a senha foram fornecidos
        if (!phone || !password) {
            return res.status(400).json({ message: 'Número de telefone e senha são obrigatórios' });
        }

        // Verifica se o número de telefone já existe
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'Número de telefone já cadastrado' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const user = new User({
            phone,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error("Erro ao registrar o usuário:", error.message); // Log da mensagem do erro
        console.error("Erro completo:", error); // Log completo do erro para depuração
        res.status(500).json({ message: 'Erro ao registrar o usuário', error: error.message });
    }
};

// Função de Login de Usuário
exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Verifica se o número de telefone e a senha foram fornecidos
        if (!phone || !password) {
            return res.status(400).json({ message: 'Número de telefone e senha são obrigatórios' });
        }

        // Verifica se o usuário existe pelo número de telefone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Verifica a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        // Gera um token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login bem-sucedido' });
    } catch (error) {
        console.error("Erro ao fazer login:", error.message); // Log da mensagem do erro
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
};

// Função de Solicitação de Redefinição de Senha
exports.requestPasswordReset = async (req, res) => {
    try {
        const { phone } = req.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'Número de telefone não encontrado' });
        }

        // Gera um código de verificação de 6 dígitos
        const resetCode = crypto.randomInt(100000, 999999).toString();
        const resetCodeExpiration = new Date(Date.now() + 10 * 60 * 1000); // Código válido por 10 minutos

        // Salva o código e a data de expiração no banco de dados
        user.resetCode = resetCode;
        user.resetCodeExpiration = resetCodeExpiration;
        await user.save();

        // Envia o código para o telefone do usuário (placeholder para integração SMS)
        console.log(`Código de redefinição de senha para ${phone}: ${resetCode}`);

        res.status(200).json({ message: 'Código de redefinição enviado ao telefone' });
    } catch (error) {
        console.error('Erro ao solicitar redefinição de senha:', error.message);
        res.status(500).json({ message: 'Erro ao solicitar redefinição de senha' });
    }
};

// Função de Redefinição de Senha
exports.resetPassword = async (req, res) => {
    try {
        const { phone, resetCode, newPassword } = req.body;

        // Verifica se o usuário existe e se o código é válido
        const user = await User.findOne({
            phone,
            resetCode,
            resetCodeExpiration: { $gt: new Date() } // Código ainda válido
        });

        if (!user) {
            return res.status(400).json({ message: 'Código inválido ou expirado' });
        }

        // Criptografa a nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualiza a senha do usuário e remove o código de redefinição
        user.password = hashedPassword;
        user.resetCode = undefined;
        user.resetCodeExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
        console.error('Erro ao redefinir senha:', error.message);
        res.status(500).json({ message: 'Erro ao redefinir senha' });
    }
};
