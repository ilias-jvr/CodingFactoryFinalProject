<template>
  <div id="app">
    <Navbar />
    <Dashboard />

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Dashboard from './components/Dashboard.vue';

export default {
    name: 'app',
    components: {
        Navbar,
        Dashboard,
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');

body {
    background: #eef1f4 !important;
    font-family: 'Lato', sans-serif !important;
}

.nav-background {
    background: #353535;
}
</style>
