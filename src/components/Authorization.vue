<template>
  <form ref="authForm" class="auth__box" v-on:submit.prevent>
    <h2 class="auth__title">Введите данные</h2>
    <b-form-group class="auth__input">
      <b-form-input placeholder="Введите логин" v-model="formLogin" />
    </b-form-group>
    <b-form-group class="auth__input">
      <b-form-input
        placeholder="Введите пароль"
        type="password"
        v-model="formPassword"
      />
    </b-form-group>
    <b-button variant="primary" class="auth__button" v-on:click="onSubmit"
      >Отправить запрос</b-button
    >
  </form>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AuthorizationForm",
  data: () => ({
    formLogin: "",
    formPassword: "",
  }),
  computed: {
    ...mapGetters("users", ["usersList"]),
  },
  methods: {
    onSubmit() {
      if (!this.formLogin || !this.formPassword) {
        alert("Введите данные");
        return;
      }

      let user = this.usersList.filter(
        (el) => el.login === this.formLogin && el.password === this.formPassword
      );

      if (user.length === 1) {
        console.log("Авторизация прошла успешно");
        this.$refs.authForm.reset();
        router.push("list");
      } else {
        alert("Такого пользователя не существует");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  &__box {
    max-width: 448px;
    padding: 64px 103px;
    text-align: center;
    color: #979fb4;
    margin: 0 auto;
    box-shadow: 4px 4px 10px 3px rgba(34, 60, 80, 0.04);
    border-radius: 16px;
  }

  &__title {
    font-size: 17px;
    font-weight: 500;
    color: #545e79;
    margin-bottom: 24px;
  }

  &__input {
    margin-bottom: 24px;
  }

  &__button {
    padding: 10px 32px;
  }
}
</style>
