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
            v-model="name"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="E-mail"
            placeholder="Informe apenas um e-mail"
            :rules="emailRules"
            v-model="email"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="RA"
            :value="ra"
            disabled></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="CPF"
            placeholder="Informe o número do documento"
            :value="cpf"
            disabled></v-text-field>
        </v-row>

        <v-alert
          class="mx-n3"
          :value="alert.show"
          :type="alert.type">
          {{ alert.message }}
        </v-alert>

        <v-row>
          <v-spacer></v-spacer>

          <v-btn
            color="info"
            class="mt-4"
            to="/websystem/students-list"
            :loading="showLoading">Voltar</v-btn>

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
        name: '',
        email: '',
        ra: '',
        cpf: '',
        alert: { show: false, type: 'info', message: '' },
        showLoading: false,
        nameRules: [
          name => {
            if(name !== '') {
              return (name || '').length > 3 || 'Informe o nome completo'
            } else {
              return true
            }
          }
        ],
        emailRules: [
          email => {
            if(email !== '') {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(email) || 'E-mail informado é inválido'
            } else {
              return true
            }
          }
        ]
      }
    },
    created(){
      this.getStudent()
    },
    methods: {
      getStudent() {
        this.$http.get(
          `/students/${this.id}`,
          { 
            headers: {
              'Authorization': this.$store.getters['user/getToken']
            }
          }
        ).then(response => {
          this.name = response.data._name === undefined ? '' : response.data._name
          this.email = response.data._email === undefined ? '' : response.data._email
          this.ra = response.data._ra
          this.cpf = response.data._cpf
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
            `/students/${this.id}`,
            {
              name: this.name,
              email: this.email
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
            this.alert.message = error.response.data.error
            this.showLoading = !this.showLoading
            setTimeout(() => { this.alert.show = false }, 3000)
          });
        }
      }
    }
  }
</script>
