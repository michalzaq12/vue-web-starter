<template>
<div class="app">
  <v-app>
    <navigation></navigation>
    <v-content>
      <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown}" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="blue-grey lighten-2" class="white--text" app>
      <span class="ml-3">@michalzaq12</span>
      <v-spacer></v-spacer>
      <span class="mr-3">&copy; 2018</span>
    </v-footer>
  </v-app>

</div>
</template>

<script>
  import '@/assets/reset.css';
  import Home from '@/views/Home';
  import Navigation from '@/components/Navigation';
  export default {
    name: 'app',
    components: { Home, Navigation },
  }

</script>

<style>
  html{
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
