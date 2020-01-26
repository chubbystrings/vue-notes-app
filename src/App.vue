<template>
  <div>
        <app-header></app-header>
        <app-side-bar>
            <div class="sidebar-nav ">
                <h5>MENU</h5>
                <ul class="navbar-nav">
                    <router-link to="/" tag="li" activeClass="active" exact><a @click="closeSideBar" class="nav-link" >Home</a></router-link>
                    <router-link v-if="auth"   to="/notes" tag="li" activeClass="active"><a @click="sendInfo" class="nav-link">Notes</a></router-link>
                    <router-link v-if="auth"  to="/newnote" tag="li" activeClass="active"><a @click="closeSideBar" class="nav-link">New Note</a></router-link>
                    <router-link v-if="!auth" to="/signup" tag="li" activeClass="active" exact><a @click="closeSideBar" class="nav-link">SignUp</a></router-link>
                    <router-link v-if="!auth" to="/login" tag="li" activeClass="active" exact><a @click="closeSideBar" class="nav-link">Login</a></router-link>
                    <li v-if="auth">
                        <a  @click="logout" class="logout nav-link">Logout</a>
                    </li>
                </ul>
            </div>
        </app-side-bar>
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
import SideBar from './components/SideBar.vue'
export default {
    computed: {
        ...mapState(['link', 'notes']),

        auth(){
          return this.$store.getters.isAuthenticated
        },

        
    },

    methods: {
        closeSideBar(){
            this.$store.dispatch('toggleNavBar')
        },

        sendInfo(){
            this.$store.dispatch('alterLink', 'readNotes')
            this.closeSideBar()
        },

        logout(){
            this.$store.dispatch('logout')
            this.closeSideBar()
        }
    },
    
    components: {
    appHeader: Header,
    appLoader: Loader,
    appSideBar: SideBar
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
div.sidebar-nav {
    width: 100%;
    margin-left: 1rem ;
    margin-right: 1rem ;
    margin-top: 4rem ;
}

div.sidebar-nav ul li {
    border-bottom: 1px solid white;
}

div.sidebar-nav ul a {
    color: black;
    cursor: pointer;
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
