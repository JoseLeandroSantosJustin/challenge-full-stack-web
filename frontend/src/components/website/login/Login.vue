<template>

  <v-card 
    elevation="2"
    outlined
    class="ma-16">
  
    <v-card-title
      class="blue darken-3 white--text">Login</v-card-title>

    <v-card-text>
      <v-form
        ref="form">

        <v-text-field
          class="mt-4"
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required></v-text-field>

        <v-text-field
          class="mt-2"
          label="Senha"
          v-model="password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          counter
          required></v-text-field>

        <v-container class="ma-0 pl-0 pa-0">
          Não é cadastrado? <a href="#" class="text-decoration-none" @click="goToUserRegister">Cadastre-se</a>
        </v-container>

        <v-alert
          class="mt-2"
          :value="alert.show"
          :type="alert.type">
          {{ alert.message }}
        </v-alert>

        <v-btn
          color="error"
          class="mt-4"
          :loading="showLoading"
          @click="resetForm">Limpar</v-btn>

        <v-btn
          color="success"
          class="ml-2 mt-4"
          :loading="showLoading"
          @click="login">Login</v-btn>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        showLoading: false,
        showPassword: false,
        alert: { show: false, type: 'info', message: '' },
        emailRules: [
          email => !!email || 'E-mail precisa ser informado',
          email => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(email) || 'E-mail informado é inválido'
          }
        ],
        passwordRules: [
          password => !!password || 'A senha precisa ser informada'
        ],
      }
    },
    mounted() {
      this.alert = this.$store.getters['alert/getAlert']
      setTimeout(() => { this.alert.show = false }, 3000)
    },
    methods: {
      resetForm () {
        this.$refs.form.reset()
      },
      login() {
        if (this.$refs.form.validate()){
          this.showLoading = true;

          this.$http.post(
            '/login',
            {
              email: this.email,
              password: this.password
            }
          ).then((result) => {
            if (result.data.message === "Authenticated") {
              this.alert.show = false;
              this.showLoading = !this.showLoading
              this.$store.dispatch('user/setId', result.data.user._id)
              this.$store.dispatch('user/setEmail', result.data.user._email)
              this.$store.dispatch('user/setToken', result.data.token)
              this.goToHome()
            } else {
              this.alert.show = true;
              this.alert.type = 'warning'
              this.alert.message = result.data.message
              setTimeout(() => { this.alert.show = false }, 3000)
              this.showLoading = !this.showLoading
            }
          }).catch((error) => {
            this.alert.show = true;
            this.alert.type = 'error'
            this.alert.message = error.response.data.error
            setTimeout(() => { this.alert.show = false }, 3000)
            this.showLoading = !this.showLoading
          });
        }
      },
      goToHome() {
        this.$router.push('/websystem/students-list')
      },
      goToUserRegister(e) {
        e.preventDefault();
        this.$router.push('/users')
      }
    }
  }
</script>
