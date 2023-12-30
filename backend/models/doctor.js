const { EntitySchema } = require('typeorm');

const Doctor = new EntitySchema({
    name: 'Doctor',
    tableName: 'Doctors',
    columns: {
        doctor_id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        first_name: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        last_name: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        contact_number: {
            type: 'varchar',
            length: 20,
            nullable: true, // Change to false if it cannot be null
        },
        email: {
            type: 'varchar',
            length: 100,
            nullable: true, // Change to false if it cannot be null
        },
        address: {
            type: 'varchar',
            length: 255,
            nullable: true, // Change to false if it cannot be null
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false, // Change to false if it cannot be null
        },
        // Add more fields as needed
    },
    // Define relations if any
    relations: {
        patients: {
            type: 'one-to-many',
            target: 'Patients',
            inverseSide: 'doctor',
        },
    },
});

module.exports = Doctor;
