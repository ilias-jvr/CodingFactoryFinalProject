const e = require('express');
const dataSource = require('../connect');
const Doctor = require('../models/doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SystemService = {
    async login(email, password) {
        const doctor = await dataSource.getRepository(Doctor).findOne({
            where: { email: email },
        });

        if (!doctor) {
            throw new Error('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }
        const payload = {
            doctor_id: doctor.doctor_id,
        };
        return jwt.sign(payload, 'your_secret_key');
    },
    async register(body) {
        if (!body.email || !body.password) {
            throw new Error('Invalid email or password');
        }
        const repository = dataSource.getRepository(Doctor);
        const currentDoctor = await repository.findOne({
            where: { email: body.email },
        });
        if (currentDoctor) {
            throw new Error('Email already exists');
        }
        body.password = await bcrypt.hash(body.password, 10);
        const doctor = repository.create(body);
        await repository.save(doctor);
    },
};

exports.SystemService = SystemService;
