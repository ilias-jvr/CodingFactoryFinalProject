const { PatientsService } = require('../services/patients.service');

const PatientsController = {
    async findAll(req, res) {
        console.log('Find all patient');
        try {
            const result = await PatientsService.findAll(req.user.doctor_id);
            res.status(200).json({ status: true, data: result });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },

    async findOne(req, res) {
        console.log('Find one patient');
        try {
            console.log(req.params.id);
            const result = await PatientsService.findOne(
                req.user.doctor_id,
                req.params.id
            );
            res.status(200).json({ status: true, data: result });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },

    async create(req, res) {
        console.log('Create patient');
        try {
            req.body.date_of_birth = req.body.dateOfBirth;
            const result = await PatientsService.create(
                req.user.doctor_id,
                req.body
            );
            res.status(200).json({ status: true, data: result });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },

    async update(req, res) {
        console.log('Update patient');
        try {
            const result = await PatientsService.update(
                req.user.doctor_id,
                req.params.id,
                req.body
            );
            res.status(200).json({ status: true, data: result });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },

    async remove(req, res) {
        console.log('Remove patient');
        try {
            const result = await PatientsService.remove(
                req.user.doctor_id,
                req.params.id
            );
            res.status(200).json({ status: true, data: result });
        } catch (err) {
            res.status(400).json({ status: false, data: err.message });
        }
    },
};

module.exports = PatientsController;
