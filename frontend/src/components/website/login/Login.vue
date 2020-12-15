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
          :rules="emailRules"
          required></v-text-field>

        <v-text-field
          class="mt-2"
          label="Senha"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          counter
          required></v-text-field>

        <v-btn
          color="error"
          class="mt-4"
          @click="resetForm">Reset</v-btn>

        <v-btn
          color="success"
          class="ml-2 mt-4"
          @click="login">Login</v-btn>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
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
    methods: {
      login() {
        if (this.$refs.form.validate()){
          // post backend:8081
        }
      },
      resetForm () {
        this.$refs.form.reset()
      }
    }
  }
</script>
