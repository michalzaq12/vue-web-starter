<template>
<div class="app">
  <v-app>
    <navigation></navigation>

    <v-content :class="{'pa-0': $vuetify.breakpoint.xsOnly}">
      <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown}" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer color="blue-grey lighten-2" class="white--text hidden-xs-only" app>
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

<style lang="scss">
  html{
    overflow: hidden;
    @media only screen and (max-width: 600px) {
      overflow-y: scroll;
    }
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
