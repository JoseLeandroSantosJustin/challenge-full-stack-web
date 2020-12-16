<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-card elevation="0" tile>
      <v-card-title 
        class="text-center font-weight-black blue darken-3 white--text pa-2">
          <v-container class="pa-1">
            Modulo Acadêmico
          </v-container>
        </v-card-title>
    </v-card>

    <v-list class="pa-0">
      <v-list-item-group>
        <v-list-item to="/websystem/students-list">
          <v-list-item-content>
            <v-list-item-title>Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
	computed: {
		drawer: {
			get() {
				return this.$store.getters['navigationdrawer/isVisible']
			},

			set(value) {
				this.$store.dispatch('appbar/switchIconState', !value)
			}		
		}
	}
}
</script>
