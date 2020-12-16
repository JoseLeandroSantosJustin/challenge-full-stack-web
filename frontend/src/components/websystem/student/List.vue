<template>
  <v-main>    
    <AppBar>Consulta de alunos</AppBar>
    <div class="pa-4">
      <v-btn
        color="success"
        to="/websystem/students">Cadastrar</v-btn>

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
            @click="toStudentUpdate(item)"
            text
            small>Editar</v-btn>

          <RemovalDialog :student="item"/>
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
        students: [
          {
            ra: 'alu202000001',
            name: 'Jose Leandro Santos Justin',
            cpf: '85896152000',
            id: 4,
          },
          {
            ra: 'alu202000002',
            name: 'Maria Joaquina Justin',
            cpf: '57543158000',
            id: 2,
          },
        ]
      }
    },
    methods: {
      toStudentUpdate(item) {
        this.$router.push(`/websystem/students/${item.id}`)
      },
    }
  }
</script>

<style>

</style>