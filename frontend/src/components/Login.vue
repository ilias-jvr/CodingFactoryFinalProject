<template>
    <b-container>
        <b-row>
            <b-col class="center-div bg-light p-4 col-sm-4">
                <h1>Login</h1>
                <b-form @submit.prevent="login">
                    <b-form-group label="Email:" label-for="email">
                        <b-form-input id="email" v-model="email" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Password:" label-for="password">
                        <b-form-input type="password" id="password" v-model="password" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit">Login</b-button>
                </b-form>
                <br>
                <p>Don't have an account?</p>
                <b-button href="/register">Register</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            // Perform login logic here
            const response = await fetch('http://localhost:8085/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            });
            if (response.status === 201) {
                const data = await response.json();
                const token = data.token;
                // Save the token to use it in the request header
                window.localStorage.setItem('token', token);
                window.location.href = '/';
            } else {
                alert('Login failed');
            }
        },
    },
};
</script>

<style>
.center-div {
    position: absolute !important;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
}
</style>
