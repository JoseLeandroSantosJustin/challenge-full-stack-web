<template>
  <v-main>    
    <AppBar>Consulta de alunos</AppBar>
    <div class="pa-4">
      <v-btn
        color="success"
        to="/websystem/students">Cadastrar</v-btn>

      <v-alert
        class="mt-2"
        :value="alert.show"
        :type="alert.type">
        {{ alert.message }}
      </v-alert>

      <v-data-table
        :headers="headers"
        :items="students"
        :items-per-page="5"
        :search="search"
        class="elevation-1 mt-4">

        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Pesquisar" 
            class="mx-4"></v-text-field>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color="warning"
            @click="toStudentUpdate(item.id)"
            text
            small>Editar</v-btn>

          <RemovalDialog :student="item" :onDeleteStudent="updateList"/>
        </template>
      </v-data-table>
    </div>
  </v-main>
</template>

<script>
  import AppBar from '../main/AppBar'
  import RemovalDialog from '../main/RemovalDialog'

  export default {
    components: {
      AppBar,
      RemovalDialog
    },
    data() {
      return {
        search: '',
        headers: [
          { text: 'Registro Acadêmico', value: 'ra' },
          { text: 'Nome', value: 'name' },
          { text: 'CPF', value: 'cpf' },
          { text: 'Ações', value: 'actions', align: 'center', sortable: false, filterable: false },
        ],
        alert: { show: false, type: 'info', message: '' },
        students: [],
        userJWT: ''
      }
    },
    created(){
      this.getAllStudents()
    },
    methods: {
      getAllStudents() {
        this.$http.get(
          '/students',
          { 
            headers: {
              'Authorization': this.$store.getters['user/getToken']
            }
          }
        ).then(response => {
          response.data.forEach(student => {
            this.students.push({
              id: student._id,
              ra: student._ra,
              name: student._name,
              cpf: student._cpf,
            });
          })
        }).catch(() => {
          this.alert.show = true;
          this.alert.type = 'error'
          this.alert.message = 'Ocorreu um erro grave. Por favor comunique o administrador';
        });

        setTimeout(() => { this.alert.show = false }, 3000)
      },
      toStudentUpdate(id) {
        this.$router.push(`/websystem/students/${id}`)
      },
      updateList(alert) {
        this.students = [];
        this.getAllStudents()
        this.alert = alert;
        setTimeout(() => { this.alert.show = false }, 3000)
      }
    },
  }
</script>
