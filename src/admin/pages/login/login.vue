<template lang="pug">
  .login-page-component
    .content
      form.form(@submit.prevent="handlesubmit")
        .form-title Авторизация
        .row
          app-input(
            v-model="user.name"
            title="Логин"
            icon="user"
            :errorMessage="validation.firstError('user.name')"
          )
        .row
          app-input(
            v-model="user.password"
            title="Пароль"
            icon="key"
            type="password"
            :errorMessage="validation.firstError('user.password')"
          )
        .btn
          app-button(title="Отправить")
</template>

<script>
import appInput from "../../components/input";
import button from '../../components/button';
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": (value) => {
      return Validator.value(value).required("Введите имя пользователя").email("Введите коректный email");
    },
    "user.password": (value) => {
      return Validator.value(value).required("Введите пароль");
    },
  },
  components: {
    appInput,
    appButton: button,
  },
  data: () => ({
    user: {
        name: "",
        password: ""
    }
  }),
  methods: {
    handlesubmit() {
      this.$validate().then((isValid) => {
        if (isValid === false) return;

        
      })
    }
  }
};

</script>


<style lang="postcss" scoped src="./login.pcss"></style>