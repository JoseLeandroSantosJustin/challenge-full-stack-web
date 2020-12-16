<template>

  <v-card 
    elevation="2"
    outlined
    class="ma-16">
  
    <v-card-title
      class="blue darken-3 white--text">Cadastro de usuário</v-card-title>

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
          v-model="password1"
          :rules="password1Rules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          counter
          required></v-text-field>

        <v-text-field
          class="mt-2"
          label="Confirmar senha"
          v-model="password2"
          :rules="password2Rules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          counter
          required></v-text-field>

        <v-alert
          class="mt-2 mb-0"
          :value="alert.show"
          :type="alert.type">
          {{ alert.message }}
        </v-alert>

        <v-btn
          color="info"
          class="mt-4"
          :loading="showLoading"
          to="/login">Voltar</v-btn>

        <v-btn
          color="error"
          class="ml-2 mt-4"
          :loading="showLoading"
          @click="resetForm">Limpar</v-btn>

        <v-btn
          color="success"
          class="ml-2 mt-4"
          :loading="showLoading"
          @click="postUser">Cadastrar</v-btn>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password1: '',
        password2: '',
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
        password1Rules: [
          password => !!password || 'A senha precisa ser informada',
          password => (password || '').length > 5 || 'A senha precisa ter mais de 5 caracteres',
        ],
        password2Rules: [
          password => !!password || 'É necessário confirmar a senha',
          password => password === this.password1 || 'As senhas precisam ser iguas'
        ]
      }
    },
    methods: {
      resetForm () {
        this.$refs.form.reset()
      },
      postUser() {
        if (this.$refs.form.validate()){
          this.showLoading = true;

          this.$http.post(
            '/users',
            {
              email: this.email,
              password: this.password1
            }
          ).then(() => {
            this.alert.show = false;
            this.showLoading = !this.showLoading

            this.$store.dispatch('alert/setAlert', {
              show: true,
              type: 'success',
              message: 'Usuário cadastrado com sucesso, agora é só acessar'
            });

            this.goToLogin()
          }).catch((error) => {
            this.alert.show = true;
            this.alert.type = 'error'
            this.alert.message = error.response.data.error
            setTimeout(() => { this.alert.show = false }, 3000)
            this.showLoading = !this.showLoading
          });
        }
      },
      goToLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>
