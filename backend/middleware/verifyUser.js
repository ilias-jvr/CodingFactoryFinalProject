const jwt = require('jsonwebtoken');
const dataSource = require('../connect');
const Doctor = require('../models/doctor');

const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'your_secret_key'); // Use your secret key used for JWT signing
        if (!decoded || !decoded.doctor_id) {
            return res
                .status(401)
                .json({ message: 'Unauthorized: Invalid token' });
        }
        const user = await dataSource.getRepository(Doctor).findOne({
            where: { doctor_id: decoded.doctor_id },
        });

        if (!user) {
            return res
                .status(401)
                .json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach the user object to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyUser;
