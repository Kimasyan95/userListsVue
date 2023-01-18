<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <table class="table">
            <tbody>
              <tr class="table__header">
                <td>Идентификатор</td>
                <td>Телефон</td>
                <td>ФИО</td>
                <td>Баланс</td>
                <td>Статус</td>
              </tr>
              <tr class="table__header">
                <td></td>
                <td>
                  <b-form-group class="table__input">
                    <b-form-input placeholder="Телефон" v-model="formPhone" />
                  </b-form-group>
                </td>
                <td>
                  <b-form-group class="table__input">
                    <b-form-input placeholder="ФИО" v-model="formName" />
                  </b-form-group>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr
                class="table__item"
                v-for="(list, prop) in searchHandler"
                v-bind:key="prop"
                v-on:click="showModal(prop)"
                v-b-modal.modal-info
              >
                <td>{{ list.id }}</td>
                <td>{{ list.phone }}</td>
                <td>{{ list.fullName }}</td>
                <td>{{ list.balance }} ₽</td>
                <td>
                  <span class="table__status">{{
                    list.active ? "Активный" : "Заблокирован"
                  }}</span>
                  <label class="switch" v-on:click.stop>
                    <input type="checkbox" v-model="list.active" />
                    <span class="slider round"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <b-button
            variant="primary"
            class="sign-up__button"
            v-b-modal.modal-sign-up
            >Регистрация</b-button
          >
          <b-modal
            id="modal-info"
            title="Данные о пользователе"
            ok-only
            ok-title="Закрыть"
            centered
          >
            <p class="modal-info__text">Идентификатор: {{ modal.id }}</p>
            <p class="modal-info__text">Номер телефона: {{ modal.phone }}</p>
            <p class="modal-info__text">ФИО: {{ modal.fullName }}</p>
            <p class="modal-info__text">Баланс: {{ modal.balance }} ₽</p>
            <p class="modal-info__text">
              Статус: {{ modal.active ? "Активный" : "Заблокирован" }}
            </p>
          </b-modal>
          <b-modal
            id="modal-sign-up"
            title="Регистрация"
            ok-only
            ok-title="ОК"
            v-on:ok="signUpSubmit"
            centered
          >
            <form ref="signUpForm" v-on:submit.prevent>
              <b-form-group class="modal__input">
                <b-form-input
                  placeholder="Логин"
                  v-model="formData.login"
                  required
                />
              </b-form-group>
              <b-form-group class="modal__input">
                <b-form-input
                  placeholder="Пароль"
                  v-model="formData.password"
                  type="password"
                  required
                />
              </b-form-group>
              <b-form-group class="modal__input">
                <b-form-input placeholder="ФИО" v-model="formData.fullName" />
              </b-form-group>
              <b-form-group class="modal__input">
                <b-form-input
                  placeholder="Номер телефона"
                  v-model="formData.phone"
                  type="number"
                  required
                />
              </b-form-group>
              <b-form-group class="modal__input">
                <b-form-input
                  placeholder="Баланс"
                  v-model="formData.balance"
                  type="number"
                  required
                />
              </b-form-group>
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "UsersTable",
  data: () => ({
    formName: "",
    formPhone: "",
    modal: {
      id: "",
      phone: "",
      fullName: "",
      balance: "",
      active: "",
    },
    formData: {
      login: "",
      password: "",
      phone: "",
      fullName: "",
      balance: "",
    },
  }),
  computed: {
    ...mapGetters("users", ["usersList"]),
    searchHandler() {
      return this.usersList.filter(
        (el) =>
          el.fullName.toLowerCase().includes(this.formName.toLowerCase()) &&
          el.phone.includes(this.formPhone)
      );
    },
  },
  methods: {
    ...mapActions("users", ["addNewUser"]),
    showModal(key) {
      this.modal.id = this.usersList[key]["id"];
      this.modal.phone = this.usersList[key]["phone"];
      this.modal.fullName = this.usersList[key]["fullName"];
      this.modal.balance = this.usersList[key]["balance"];
      this.modal.active = this.usersList[key]["active"];
    },
    addUser() {
      const newUser = {
        ...this.formData,
      };

      this.addNewUser(newUser);
    },
    signUpSubmit(e) {
      e.preventDefault();
      const values = Object.values(this.formData).filter((el) => el.length < 1);

      if (values.length > 0) {
        alert("Заполните все поля");
        return;
      } else {
        this.addUser();

        this.formData = Object.assign({}, this.formData, {
          login: "",
          password: "",
          phone: "",
          fullName: "",
          balance: "",
        });

        this.$nextTick(() => {
          this.$bvModal.hide("modal-sign-up");
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  color: #545e79;
  max-width: 1200px;
  margin: auto;

  &__input {
    max-width: 50%;
  }

  &__header {
    font-size: 11px;
    color: #bac1d1;
    text-transform: uppercase;
    font-weight: 500;

    td {
      &:first-child {
        width: 15%;
      }

      &:nth-child(2) {
        width: 25%;
      }

      &:nth-child(3) {
        width: 35%;
      }

      &:nth-child(4) {
        width: 10%;
      }

      &:last-child {
        width: 15%;
      }
    }
  }

  &__item {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
  }

  td {
    padding: 24px 0;
    &:first-child {
      font-size: 12px;
      color: #979fb4;
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 21px;
    margin-left: 10px;
    float: right;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(19px);
    -ms-transform: translateX(19px);
    transform: translateX(19px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}

.modal {
  &__input {
    margin-bottom: 10px;
  }
}

.sign-up {
  &__button {
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    padding: 10px 32px;
    &_wide {
      width: 100%;
    }
  }
}
</style>
