const dataSource = require('../connect');
const Patients = require('../models/patient');

const PatientsService = {
    async findAll(doctor_id) {
        return dataSource.getRepository(Patients).find({
            where: { doctor_id: doctor_id },
        });
    },

    async findOne(doctor_id, id) {
        const patient = await dataSource.getRepository(Patients).findOne({
            where: { patient_id: id, doctor_id: doctor_id },
        });

        if (!patient) {
            throw new Error('Patient not found');
        }

        return patient;
    },

    async create(doctor_id, body) {
        body.doctor_id = doctor_id;
        const repository = dataSource.getRepository(Patients);
        const patient = repository.create(body);
        return repository.save(patient);
    },

    async update(doctor_id, id, body) {
        const repository = dataSource.getRepository(Patients);
        const patient = await repository.findOne({
            where: { patient_id: id, doctor_id: doctor_id },
        });

        if (!patient) {
            throw new Error('Patient not found');
        }

        repository.merge(patient, body);
        return repository.save(patient, body);
    },

    async remove(doctor_id, id) {
        const repository = dataSource.getRepository(Patients);
        const patient = await repository.findOne({
            where: { patient_id: id, doctor_id: doctor_id },
        });
        if (!patient) {
            throw new Error('Patient not found');
        }

        return repository.remove(patient);
    },
};

exports.PatientsService = PatientsService;
