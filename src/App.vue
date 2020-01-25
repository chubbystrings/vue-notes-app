<template>
  <div>
        <app-header></app-header>
        <div class="container-fluid">
            <app-loader v-if="link && notes.length === 0"></app-loader>
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
            <app-loader v-if="link && link !== 'Loading Notes'"></app-loader>
            <!-- <app-loader v-if="link === 'Loading new Note'"></app-loader> -->
        </div>
    </div>
</template>
<script>
import Header from './components/Header.vue'
import { mapState} from 'vuex'
import Loader from './components/Loader.vue'
export default {
    computed: {
        ...mapState(['link', 'notes'])
    },
    
    components: {
    appHeader: Header,
    appLoader: Loader
    },

    //try to auto log user when app reloads
    created(){
      this.$store.dispatch('tryAutoLogin')
    }
}
</script>

<style>
 body {
    background-color: #4AAE9B;
}
 .slide-enter-active {
        animation: slide-in 200ms ease-out forwards

    }
    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards
    }

    @keyframes slide-in {
        from {
            transform: translateX(-30px);
            opacity: 0
        }
        to {
            transform: translateX(0);
            opacity: 1
        }
    }
    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1
        }
        to {
            transform: translateX(-30px);
            opacity: 0;

        }
    }

</style>
