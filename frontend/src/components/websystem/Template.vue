<template>
  <v-app class="application-body">
    <NavigationDrawer />
    <router-view></router-view>    
  </v-app>
</template>

<script>
  import NavigationDrawer from './main/NavigationDrawer'

  export default {
    components: {
      NavigationDrawer
    },
    mounted() {
      // Checks logged user
      if (this.$store.getters['user/getId'] === undefined) {
        this.$store.dispatch('alert/setAlert', {
          show: true,
          type: 'error',
          message: 'Para acessar o sistema é necessário a autenticação'
        });

        this.$router.push('/login')
      }

      this.$store.dispatch('navigationdrawer/setVisibility', false)
    }
  }
</script>

<style scoped>
  .application-body {
    min-width: 410px;
    height: 100%;
  }
</style>
