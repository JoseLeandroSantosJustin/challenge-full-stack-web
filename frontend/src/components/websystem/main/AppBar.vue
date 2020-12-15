<template>
  <v-app-bar elevation="0" dense>
    <v-app-bar-nav-icon class="blue--text">
      <v-icon v-if="true">mdi-menu</v-icon>
      <v-icon v-else>mdi-close</v-icon>
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
