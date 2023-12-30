// Import necessary modules
const { EntitySchema } = require('typeorm');

// Define the Patients entity schema
const Patients = new EntitySchema({
    name: 'Patients',
    tableName: 'Patients',
    columns: {
        patient_id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        doctor_id: {
            type: 'int',
            nullable: true, // Change to false if it cannot be null
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
        date_of_birth: {
            type: 'date',
            nullable: true, // Change to false if it cannot be null
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
        medical_history: {
            type: 'text',
            nullable: true, // Change to false if it cannot be null
        },
        // Add more fields as needed
    },
    // Define relations if any
    relations: {
        doctor: {
            type: 'many-to-one',
            target: 'Doctor',
            joinColumn: {
                name: 'doctor_id',
                referencedColumnName: 'doctor_id',
            },
        },
        // Define relations here (e.g., to link patients to doctors)
    },
});

module.exports = Patients;
