<template>
  <div id="app">
    <!-- <UsersTable />
          <AuthorizationForm /> -->
    <router-view />
  </div>
</template>

<script>
// import UsersTable from "./components/UsersTable.vue";
// import AuthorizationForm from "./components/Authorization.vue";

export default {
  name: "App",
  components: {
    // UsersTable,
    // AuthorizationForm,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

#app {
  font-family: "Roboto", sans-serif;
}
</style>
