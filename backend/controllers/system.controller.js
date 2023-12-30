const { SystemService } = require('../services/system.service');

const SystemController = {
    async login(req, res) {
        console.log('Login');
        try {
            if (!req.body.email || !req.body.password) {
                throw new Error('Invalid email or password');
            }
            const payload = await SystemService.login(
                req.body.email,
                req.body.password
            );
            res.status(201).json({
                status: true,
                message: 'Login successful',
                token: payload,
            });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },
    async register(req, res) {
        console.log('register');
        try {
            await SystemService.register(req.body);
            res.status(201).json({
                status: true,
                message: 'Register successful',
            });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },
};

module.exports = SystemController;
