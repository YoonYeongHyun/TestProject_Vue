<template>
    <header>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/PageAxios">Axios</router-link> |
            <router-link to="/PageComponents">Components</router-link>
        </div>
    </header>
    <hr />
</template>

<script lang="ts">
    export default {
        
    }
</script>

<style>
    #nav {
    padding: 10px;
    }

    #nav a {
        text-decoration: none;
        font-weight: bold;
        font-size: 1.5em;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>