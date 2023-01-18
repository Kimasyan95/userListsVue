<template>
  <div class="auth__page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="auth__container">
            <h1>Введите ваши данные в форме ниже</h1>
            <Authorization />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Authorization from "@/components/Authorization.vue";

export default {
  name: "AuthorizationPage",
  components: {
    Authorization,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: 60px;
}
.auth {
  &__container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
