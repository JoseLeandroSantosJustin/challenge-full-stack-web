<template>
  <v-app-bar elevation="0" dense>
    <v-app-bar-nav-icon class="blue--text">
      <v-icon v-if="showMenuIcon" @click="switchIconState(false)">mdi-menu</v-icon>
      <v-icon v-else @click="switchIconState(true)">mdi-close</v-icon>
    </v-app-bar-nav-icon>

    <v-flex>
      <v-toolbar-title>
          <v-container class="text-center blue--text">
            <slot></slot>
          </v-container>
      </v-toolbar-title>
    </v-flex>
  </v-app-bar>
</template>

<script>
export default {
	computed: {
		showMenuIcon: {
			get() {
				return this.$store.getters['appbar/showMenuIcon']
			},

			set(state) {
				this.$store.dispatch('appbar/switchIconState', state)
			}
		}
	},
  methods: {
    switchIconState(state) {
      this.showMenuIcon = state;
      this.$store.dispatch('navigationdrawer/setVisibility', !state)
    }
  }
}
</script>
