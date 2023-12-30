<template>
    <div></div>
</template>

<script>
export default {
    name: 'Logout',
    mounted() {
        window.localStorage.removeItem('token');
        window.location.href = '/';
    },
};
</script>
