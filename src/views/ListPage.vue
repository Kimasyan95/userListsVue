<template>
  <div class="home">
    <UsersTable />
  </div>
</template>

<script>
// @ is an alias to /src
import UsersTable from "@/components/UsersTable.vue";

export default {
  name: "ListPage",
  components: {
    UsersTable,
  },
};
</script>
