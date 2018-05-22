<template>

    <v-navigation-drawer v-model="drawer" v-resize="onResize" :mini-variant.sync="mini" permanent absolute app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="routeTo(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard', routeTo: 'home'},
          { title: 'About', icon: 'question_answer', routeTo: 'about' }
        ],
        right: null,
        mini: false
      }
    },
    methods:{
      routeTo(item){
        this.$router.push({name: item.routeTo});
      },
      onResize(){
        if(window.innerWidth < 700){
          this.mini = true;
          return;
        }
        this.mini = false;
      }
    }
  }
</script>

<style scoped>

</style>
