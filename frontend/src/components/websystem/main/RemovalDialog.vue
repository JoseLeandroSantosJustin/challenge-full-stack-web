<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="360">

    <template v-slot:activator="{ on }">
      <v-btn
        class="ml-1"
        color="error"
        v-on="on"
        text
        small>Deletar</v-btn>
    </template>

    <v-card class="pa-2">
      <v-card-title class="headline">Confirmar exclusão?</v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-4">
        Registro acadêmico: {{ student.ra }}<br />
        Nome: {{ student.name }} <br />
        CPF: {{ student.cpf }} <br />
      </v-card-text>

      <v-alert
        border="left"
        color="orange"
        type="error"
        class="mb-1 pa-3">Não há como reverter esta ação!</v-alert>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          @click="dialog = false"
          small>Cancelar</v-btn>

        <v-btn
          color="error"
          @click="removeStudent"
          small>Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      student: {
        type: Object,
        required: true
      },
      onDeleteStudent: { required: true }
    },
    data () {
      return {
        item: 0,
        dialog: false,
        alert: {}
      }
    },
    methods: {
      removeStudent() {
        this.$http.delete(
          `/students/${this.student.id}`,
          { 
            headers: {
              'Authorization': this.$store.getters['user/getToken']
            }
          }
        ).then(() => {
          const alert = {
            show: true,
            type: 'success',
            message: 'Estudante removido com sucesso'
          };

          this.onDeleteStudent(alert)
          this.dialog = false
        }).catch(() => {
          const alert = {
            show: true,
            type: 'error',
            message: 'Não foi possivel excluir o estudante. Por favor comunique o administrador'
          };

          this.onDeleteStudent(alert)
          this.dialog = false
        });
      }
    }
  }
</script>
