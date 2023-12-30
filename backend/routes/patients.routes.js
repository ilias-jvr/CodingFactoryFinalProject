const express = require('express');
const PatientsController = require('../controllers/patients.controller');
const router = express.Router();
const { body, validationResult, query, param } = require('express-validator');
const verifyUser = require('../middleware/verifyUser');

router.get('/', verifyUser, PatientsController.findAll);

const idValidator = () => {
    return [
        param('id').isNumeric().withMessage('ID must be a number'),
        param('id').isLength({ min: 1 }).withMessage('ID must not be empty'),
    ];
};
router.get(
    '/:id',
    verifyUser,
    idValidator(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ status: false, data: errors.array() });
        }
        next();
    },
    PatientsController.findOne
);

router.post('/', verifyUser, PatientsController.create);

router.put(
    '/:id',
    verifyUser,
    idValidator(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ status: false, data: errors.array() });
        }
        next();
    },
    PatientsController.update
);

router.delete(
    '/:id',
    verifyUser,
    idValidator(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ status: false, data: errors.array() });
        }
        next();
    },
    PatientsController.remove
);

module.exports = router;
