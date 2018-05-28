<template>
  <div>

    <div v-if="isLoading" class="loader"></div>


    <v-list class="container" three-line>
      <template v-for="(post, index) in postPerPage">
        <v-divider v-if="index != 0" :inset="true" :key="index"></v-divider>
        <v-list-tile>
          <v-list-tile-avatar :color="post.color">
            <span class="white--text headline">{{post.title[0].toUpperCase()}}</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="post.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="post.body"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>


    <v-pagination :length="Math.ceil(postsCount / itemsPerPage)"
                  :total-visible="visiblePagesCount"
                  v-model="currentPage"
                  :class="{'ma-0': $vuetify.breakpoint.xsOnly, 'ma-4': $vuetify.breakpoint.smAndUp}"
                  color="blue-grey lighten-1"
                  circle
    >

    </v-pagination>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { action, getter, mutation } from '@/store/modules/post.type'
    export default {
        name: "Home",
        data () {
          return {
            currentPage: 1,
            itemsPerPage: 10
          }
        },
        computed: {
          ...mapGetters([getter.POST_PER_PAGE, getter.IS_LOADING, getter.POSTS_COUNT]),
          visiblePagesCount() {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs':
                return 5;
              default:
                return 7;
            }
          }
        },
        methods:{
          fetchPosts(){
            this.$store.dispatch(action.FETCH_POSTS);
          }
        },
        watch: {
          currentPage(newValue){
            this.$store.commit(mutation.SET_PAGE, newValue);
          }
        },
        mounted(){
          this.fetchPosts();
        },
        beforeMount(){
          this.$store.commit(mutation.SET_PAGE, this.currentPage);
          this.$store.commit(mutation.SET_ITEMS_PER_PAGE, this.itemsPerPage);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $sm: 960px;
  $xs: 600px;
  .container{
    height: calc(100vh - 150px);
    overflow-y: scroll;
    @media only screen and (max-width: $sm) {
      height: calc(100vh - 130px);
    }
    @media only screen and (max-width: $xs) {
      height: calc(100vh - 105px);
    }
  }
</style>
