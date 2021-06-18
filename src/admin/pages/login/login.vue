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
          app-button(title="Отправить" :disbled="isSubmitDisabled")
</template>

<script>
import appInput from "../../components/input";
import button from '../../components/button';
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import $axios from '../../request';
export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": (value) => {
      return Validator.value(value).required("Введите имя пользователя");
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
    },
    isSubmitDisabled: false,
  }),
  methods: {
    async handlesubmit() {
      this.$validate().then(async (isValid) => {
        if (isValid === false) return;
        this.isSubmitDisabled = true;
        try {
          const response = await $axios.post("/login", this.user);
          const token = response.data.token;
          localStorage.setItem("token", token);
          $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
          this.$router.replace('/');
        } catch (error) {console.log(error.response.data.error)}
          finally {
          this.isSubmitDisabled = false;
        }
        
      })
    }
  }
};

</script>


<style lang="postcss" scoped src="./login.pcss"></style>