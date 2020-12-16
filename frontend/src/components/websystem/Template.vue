<template>
  <v-app>
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
    }
  }
</script>