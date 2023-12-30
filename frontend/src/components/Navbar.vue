<template>
<b-navbar toggleable="md" type="dark" class="nav-background mb-5">

<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

<b-navbar-brand href="/">Dashboard</b-navbar-brand>

<b-collapse is-nav id="nav_collapse">

<b-navbar-nav class="ml-auto">

  <b-nav-item-dropdown right>
     <template slot="button-content" disabled>
      <em>User</em>
    </template>
    <b-dropdown-item href="/logout">Logout</b-dropdown-item>
  </b-nav-item-dropdown>
</b-navbar-nav>
</b-collapse> 
</b-navbar>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<style >
nav {
    background-color: #f2f2f2;
    padding: 10px;
}

ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
}

li {
    margin-right: 10px;
}

a {
    text-decoration: none;
    color: #333;
}
</style>
