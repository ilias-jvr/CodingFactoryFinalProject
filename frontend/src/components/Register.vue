<template>
    <b-container>
        <b-row class="justify-content-center">
            <b-col class="center-div bg-light p-4 col-sm-4">
                <b-form @submit="registerUser">
                    <b-form-group label="Email" label-for="email">
                        <b-form-input id="email" v-model="email" type="email" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Password" label-for="password">
                        <b-form-input id="password" v-model="password" type="password" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="First Name" label-for="first_name">
                        <b-form-input id="first_name" v-model="first_name" type="text" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Last Name" label-for="last_name">
                        <b-form-input id="last_name" v-model="last_name" type="text" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Address" label-for="address">
                        <b-form-input id="address" v-model="address" type="text" required></b-form-input>
                    </b-form-group>

                    <b-form-group label="Contact Number" label-for="contact_number">
                        <b-form-input id="contact_number" v-model="contact_number" type="text" required></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Register</b-button>
                </b-form>
                <br>
                <p>Already have an account?</p>
                <b-button href="/login">Login</b-button>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            address: '',
            contact_number: '',
        };
    },
    methods: {
        async registerUser(event) {
            event.preventDefault();
            const data = {
                email: this.email,
                password: this.password,
                first_name: this.first_name,
                last_name: this.last_name,
                address: this.address,
                contact_number: this.contact_number,
            };
            const response = await fetch(
                'http://localhost:8085/api/register/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            console.log(response);
            if (response.status === 201) {
                this.$router.push('/login');
            } else {
                alert('User registration failed');
            }
        },
    },
    mounted() {
        if (window.localStorage.getItem('token')) {
            this.$router.push('/');
        }
    },
};
</script>

<style >
/* Add custom styles here */
</style>
