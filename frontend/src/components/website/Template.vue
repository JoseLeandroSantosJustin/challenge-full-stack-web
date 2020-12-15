<template>
  <v-app>
    <div class="application-body blue lighten-4 white--text">
        <router-view></router-view>
    </div> 
  </v-app>
</template>

<style scoped>
  .application-body {
    min-width: 500px;
    height: 100%;
  }
</style>