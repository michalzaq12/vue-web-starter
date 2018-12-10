<template>
  <div class="_content">

    <v-list id="container" class="container" three-line v-resize="onResize" :class="{'pa-1': $vuetify.breakpoint.xsOnly}">

      <v-layout v-if="isLoading" align-center justify-center fill-height>
        <v-progress-circular  indeterminate color="blue-grey" />
      </v-layout>

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

    <div class="text-xs-center">
      <v-pagination :length="Math.ceil(postsCount / itemsPerPage)"
                    :total-visible="7"
                    v-model="currentPage"
                    :class="{'ma-0': $vuetify.breakpoint.xsOnly, 'ma-4': $vuetify.breakpoint.smAndUp}"
                    color="blue-grey lighten-1"
                    circle
                    class="hidden-xs-only"
      />
      <v-progress-circular v-if="loaderOnMobile" indeterminate color="blue-grey" class="hidden-sm-and-up mt-3" />
    </div>




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
            itemsPerPage: 20,
            loadAfterScroll: false,
            loaderOnMobile: true
          }
        },
        computed: {
          ...mapGetters([getter.POST_PER_PAGE, getter.IS_LOADING, getter.POSTS_COUNT])
        },
        methods:{
          fetchPosts(){
            this.$store.dispatch(action.FETCH_POSTS);
          },
          onResize(){
            if(window.innerWidth < 600){
              if(this.loadAfterScroll) return;
              window.addEventListener('scroll', this.onScroll);
              this.currentPage = 1;
              return this.loadAfterScroll = true;
            }
            if(!this.loadAfterScroll) return;
            window.removeEventListener('scroll', this.onScroll);
            this.loadAfterScroll = false;
            this.itemsPerPage = 10;
          },
          onScroll(e){
            const EPS = -105;
            let y = (window.pageYOffset || document.documentElement.scrollTop) + window.innerHeight;
            let contentHeight = document.querySelector('#container').scrollHeight;
            if(y + EPS > contentHeight) {
              if(this.$store.getters[getter.POSTS_COUNT] <= this.itemsPerPage){
                this.loaderOnMobile = false;
                return;
              }
              this.itemsPerPage += 10;
            }
          }
        },
        watch: {
          currentPage(newValue){
            this.$store.commit(mutation.SET_PAGE, newValue);
          },
          itemsPerPage(newValue){
            this.$store.commit(mutation.SET_ITEMS_PER_PAGE, newValue);
          }
        },
        mounted(){
          this.fetchPosts();
        },
        beforeMount(){
          this.$store.commit(mutation.SET_PAGE, this.currentPage);
          this.$store.commit(mutation.SET_ITEMS_PER_PAGE, this.itemsPerPage);
        },
        beforeDestroy(){
          window.removeEventListener('scroll', this.onScroll);
        }
    }
</script>


<style lang="scss" scoped>
  .container{
    height: calc(100vh - 150px);
    overflow-y: scroll;
    @media only screen and (max-width: $sm) {
      height: calc(100vh - 130px);
    }
    @media only screen and (max-width: $xs) {
      height: 100%;
      overflow: hidden;
    }
  }

  ._content{
    @media only screen and (max-width: $xs) {
      margin-bottom: 100px;
    }
  }
</style>
