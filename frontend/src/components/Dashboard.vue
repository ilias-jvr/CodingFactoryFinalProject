<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Patients Dashboard</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button class="mb-2 float-right" variant="primary" href="#" v-b-modal.modal1>Add Patient</b-button>
                <b-table :items="patients" :fields="fields" @row-clicked="handleRowClicked">
                    <template #cell(actions)="row">
                        <b-button-group>
                            <b-button variant="primary" size="sm" @click="editPatient(row.item)">
                                Edit
                            </b-button>
                            <b-button variant="danger" size="sm" @click="deletePatient(row.item)">
                                Delete
                            </b-button>
                        </b-button-group>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-modal id="modal1" title="Add Patient" hide-footer>
            <b-container>
                <b-form ref="addPatientForm" @submit="addPatient">
                    <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                        <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Enter email"
                            required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
                        <b-form-input id="input-2" v-model="form.first_name" type="text" placeholder="Enter first name"
                            required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-3" label="Last Name:" label-for="input-3">
                        <b-form-input id="input-3" v-model="form.last_name" type="text" placeholder="Enter last name"
                            required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-4" label="Date of Birth:" label-for="input-4">
                        <b-form-input id="input-4" v-model="form.dateOfBirth" type="date" placeholder="Enter date of birth"
                            required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-5" label="Address:" label-for="input-5">
                        <b-form-input id="input-5" v-model="form.address" type="text" placeholder="Enter address"
                            required></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-6" label="Medical History:" label-for="input-6">
                        <b-form-textarea id="input-6" v-model="form.medical_history" rows="3" max-rows="6"
                            placeholder="Enter medical history"></b-form-textarea>
                    </b-form-group>
                <b-form-input id="input-6" v-model="form.id" type="text" placeholder="Enter medical history" hidden></b-form-input>
                    <b-button class="float-right" type="reset" variant="danger" @click="clearForm">Reset</b-button>
                    <b-button class="float-right" type="submit" variant="primary">Submit</b-button>
                    <!-- Add submit button -->
                </b-form>
            </b-container>
        </b-modal>
        <b-modal id="modal2" title="rowInfo">
            <b-container>
                <b-col>
                    <b-tabs v-if="selectedRow" content-class="mt-3" fill>
                        <b-tab title="Patients">
                            <p>Selected Row Info:</p>
                            <p>ID: {{ selectedRow.patient_id }}</p>
                            <p>First Name: {{ selectedRow.first_name }}</p>
                            <p>Last Name: {{ selectedRow.last_name }}</p>
                            <p>Age: {{ this.calculateAge(selectedRow.date_of_birth) }}</p>
                            <p>Address: {{ selectedRow.address }}</p>
                        </b-tab>
                        <b-tab title="Patient History">
                            <p> {{ this.getPatientHistory(selectedRow.patient_id) }}</p>
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            patients: [],
            patientData: [],
            fields: [
                'patient_id',
                'first_name',
                'last_name',
                'date_of_birth',
                'address',
                'actions',
            ],
            selectedRow: null,
            form: {
                id: '',
                email: '',
                first_name: '',
                last_name: '',
                dateOfBirth: '',
                address: '',
                medical_history: '',
            },
        };
    },
    methods: {
        getPatientHistory(patientId) {
            const patient = this.patientData.find(
                patient => patient.patient_id === patientId
            );
            return patient ? patient.medical_history : '';
        },
        calculateAge(dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (
                month < 0 ||
                (month === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            return age;
        },
        async fetchData() {
            console.log('fetchData');
            const token = window.localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            try {
                const response = await fetch(
                    'http://localhost:8085/api/patients/',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }
                );
                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }
                const data = await response.json();

                this.patientData = data.data;
                this.patients = data.data.map(patient => {
                    return {
                        patient_id: patient.patient_id,
                        first_name: patient.first_name,
                        last_name: patient.last_name,
                        date_of_birth: patient.date_of_birth,
                        address: patient.address,
                    };
                });
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        },
        handleRowClicked(item, index, event) {
            event.preventDefault();
            this.selectedRow = item;
            this.$bvModal.show('modal2');
        },
        async addPatient(event) {
            event.preventDefault();
            const token = window.localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            try {
                const response = await fetch(
                    'http://localhost:8085/api/patients/',
                    {
                        method: this.form.id != '' ? 'PUT' : 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                        body: JSON.stringify(this.form),
                    }
                );
                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }
                this.fetchData();
                this.$bvModal.hide('modal1');
                this.clearForm();
            } catch (error) {
                console.error('Error adding patient:', error);
            }
        },
        clearForm() {
            this.form = {
                id: '',
                email: '',
                first_name: '',
                last_name: '',
                dateOfBirth: '',
                address: '',
                medical_history: '',
            };
        },
        editPatient(patient) {
            console.log('editPatient');
            this.form = {
                email: patient.email,
                first_name: patient.first_name,
                last_name: patient.last_name,
                dateOfBirth: patient.date_of_birth,
                address: patient.address,
                medical_history: patient.medical_history,
            };
            this.$bvModal.show('modal1');
        },
        async deletePatient(patient) {
            console.log('deletePatient');
            try {
                const token = window.localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }
                const response = await fetch(
                    `http://localhost:8085/api/patients/${patient.patient_id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }
                );
                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }
                this.fetchData();
            } catch (error) {
                console.error('Error deleting patient:', error);
            }
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style>
/* Add any custom styles for the table here */
</style>
