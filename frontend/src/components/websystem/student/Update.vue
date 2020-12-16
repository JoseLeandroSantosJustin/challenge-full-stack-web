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
            :value="student.name"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            class="mt-4"
            label="E-mail"
            placeholder="Informe apenas um e-mail"
            :rules="emailRules"
            :value="student.email"
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
            :value="student.cpf"
            :disabled="student.cpf ? true : false"
            required></v-text-field>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>

          <v-btn
            color="warning"
            class="mt-4"
            to="/websystem/students-list">Cancelar</v-btn>

          <v-btn
            color="success"
            class="ml-2 mt-4"
            @click="updateStudent">Cadastrar</v-btn>
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
        student: {
            id: 4,
            name: 'Jose Leandro Santos Justin',
            email: 'joselsjustin@gmail.com',
            ra: 'alu202000001',
            cpf: '85896152000'
          },
        nameRules: [
          name => !!name || 'Nome precisa ser informado',
          name => !!name && name.length < 4 || 'Nome completo ser informado',
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
    methods: {
      updateStudent() {
        if(this.$refs.form.validate()){
          // Put
        }
      }
    }
  }
</script>
