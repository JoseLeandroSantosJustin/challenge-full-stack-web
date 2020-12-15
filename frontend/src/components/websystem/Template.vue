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
    }
  }
</script>