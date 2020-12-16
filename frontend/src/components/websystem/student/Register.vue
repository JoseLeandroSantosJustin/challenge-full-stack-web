<template>
  <v-main>    
    <AppBar>Cadastro de aluno</AppBar>
    <v-container class="pa-6">
      <v-form ref="form">
        <v-row>
          <v-text-field
            class="mt-4"
            label="Nome"
            placeholder="Informe o nome completo"
            v-model="name"
            :rules="nameRules"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="E-mail"
            placeholder="Informe apenas um e-mail"
            v-model="email"
            :rules="emailRules"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="RA"
            placeholder="Informe o registro acadêmico"
            v-model="ra"
            :rules="raRules"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="CPF"
            placeholder="Informe o número do documento"
            v-model="cpf"
            :rules="cpfRules"
            required></v-text-field>
        </v-row>

        <v-alert
          :value="alert.show"
          :type="alert.type">
          {{ alert.message }}
        </v-alert>

        <v-row>
          <v-spacer></v-spacer>

          <v-btn
            color="warning"
            class="mt-4"
            :loading="showLoading"
            to="/websystem/students-list">Cancelar</v-btn>

          <v-btn
            color="success"
            class="ml-2 mt-4"
            :loading="showLoading"
            @click="saveStudent">Cadastrar</v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
  import AppBar from '../main/AppBar'

  export default {
    components: {
      AppBar
    },
    data() {
      return {
        name: '',
        email: '',
        ra: '',
        cpf: '',
        alert: {},
        showLoading: false,
        nameRules: [
          name => !!name || 'Nome precisa ser informado',
          name => (name || '').length > 3 || 'Nome completo precisa ser informado',
        ],
        emailRules: [
          email => !!email || 'E-mail precisa ser informado',
          email => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(email) || 'E-mail informado é inválido'
          }
        ],
        raRules: [
          ra => !!ra || 'RA precisa ser informado'
        ],
        cpfRules: [
          cpf => !!cpf || 'CPF precisa ser informado',
          cpf => this.checksCPF(cpf) || 'É necessário um CPF válido'
        ]
      }
    },
    methods: {
      checksCPF(inputCPF) {
        if(inputCPF != undefined){
          var soma = 0;
          var i;
          var resto;
          var cpf = inputCPF;

          if (cpf == "00000000000") return false;

          for (i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            resto = (soma * 10) % 11;

          if (resto == 10 || resto == 11) resto = 0;

          if (resto != parseInt(cpf.substring(9, 10))) return false;

          soma = 0;
          for (i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            resto = (soma * 10) % 11;

          if (resto == 10 || resto == 11) resto = 0;

          if (resto != parseInt(cpf.substring(10, 11))) return false;
          return true;
        }
      },
      saveStudent() {
        if(this.$refs.form.validate()){
          this.showLoading = !this.showLoading

          this.$http.post(
            '/students',
            {
              name: this.name,
              email: this.email,
              ra: this.ra,
              cpf: this.cpf
            },
            {
              headers: {
                'Authorization': this.$store.getters['user/getToken']
              }
            }
          ).then(() => {
            this.alert.show = true;
            this.alert.type = 'success'
            this.alert.message = 'Estudante cadastrado com sucesso'
            setTimeout(() => { this.alert.show = false }, 3000)
            this.showLoading = !this.showLoading
            this.$refs.form.reset()
          }).catch((error) => {
            this.alert.show = true;
            this.alert.type = 'error'
            this.alert.message = error.message
            setTimeout(() => { this.alert.show = false }, 3000)
            this.showLoading = !this.showLoading
          });
        }
      }
    }
  }
</script>
