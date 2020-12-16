<template>
  <v-main>    
    <AppBar>Atualização do aluno</AppBar>
    <v-container class="pa-6">
      <v-form ref="form">
        <v-row>
          <v-text-field
            class="mt-4"
            label="Nome"
            placeholder="Informe o nome completo"
            :rules="nameRules"
            v-model="student.name"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="E-mail"
            placeholder="Informe apenas um e-mail"
            :rules="emailRules"
            v-model="student.email"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="RA"
            :value="student.ra"
            disabled></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="CPF"
            placeholder="Informe o número do documento"
            :rules="cpfRules"
            v-model="student.cpf"
            disabled></v-text-field>
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
            to="/websystem/students-list"
            :loading="showLoading">Cancelar</v-btn>

          <v-btn
            color="success"
            class="ml-2 mt-4"
            :loading="showLoading"
            @click="updateStudent">Salvar</v-btn>
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
    props: {
      id: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        alert: { show: false, type: 'info', message: '' },
        showLoading: false,
        student: {
            id: this.id,
            name: '',
            email: '',
            ra: '',
            cpf: '',
          },
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
        cpfRules: [
          cpf => !!cpf || 'CPF precisa ser informado'
        ]
      }
    },
    created(){
      this.getStudent()
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
      getStudent() {
        this.$http.get(
          `/students/${this.student.id}`,
          { 
            headers: {
              'Authorization': this.$store.getters['user/getToken']
            }
          }
        ).then(response => {
          this.student.name = response.data._name
          this.student.email = response.data._email
          this.student.ra = response.data._ra
          this.student.cpf = response.data._cpf
        }).catch(() => {
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.message = 'Ocorreu um erro grave. Por favor comunique o administrador'
          setTimeout(() => { this.alert.show = false }, 3000)
        });
      },
      updateStudent() {
        if(this.$refs.form.validate()){
          this.showLoading = !this.showLoading

          this.$http.put(
            `/students/${this.student.id}`,
            {
              name: this.student.name,
              email: this.student.email
            },
            {
              headers: {
                'Authorization': this.$store.getters['user/getToken']
              }
            }
          ).then(() => {
            this.alert.show = true
            this.alert.type = 'success'
            this.alert.message = 'Estudante atualizado com sucesso'
            this.showLoading = !this.showLoading
            setTimeout(() => { this.alert.show = false }, 3000)
          }).catch((error) => {
            this.alert.show = true
            this.alert.type = 'error'
            this.alert.message = error.message
            this.showLoading = !this.showLoading
            setTimeout(() => { this.alert.show = false }, 3000)
          });
        }
      }
    }
  }
</script>
