// middlewares/authorizeAdmin.js

module.exports = (req, res, next) => {
    // Verifica se o usuário autenticado tem o papel de 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // Usuário autorizado, continue para a próxima função
    } else {
        res.status(403).json({ message: 'Acesso negado: Apenas administradores têm permissão para acessar essa rota' });
    }
};
