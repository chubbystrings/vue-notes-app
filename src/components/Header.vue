<template>
   <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <router-link to="/" class="navbar-brand">Notes App</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" >
                <ul class="navbar-nav">
                    <router-link to="/" tag="li" activeClass="active" exact><a class="nav-link">Home</a></router-link>
                    <router-link v-if="auth"   to="/notes" tag="li" activeClass="active"><a @click="sendInfo" class="nav-link">Notes</a></router-link>
                    <router-link v-if="auth"  to="/newnote" tag="li" activeClass="active"><a class="nav-link">New Note</a></router-link>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <router-link v-if="!auth" to="/signup" tag="li" activeClass="active" exact><a class="nav-link">SignUp</a></router-link>
                   <router-link v-if="!auth" to="/login" tag="li" activeClass="active" exact><a class="nav-link">Login</a></router-link>
                    <li v-if="auth">
                        <button  @click="logout" class="logout nav-link">Logout</button>
                    </li>
                </ul>
                 
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    
    methods: {
        logout(){
            this.$store.dispatch('logout')
        },

        sendInfo(){
            this.$store.dispatch('alterLink', 'readNotes')
        }
    },
    computed: {
      auth(){
          return this.$store.getters.isAuthenticated
      }
  }
}
</script>
<style>
  nav {
    box-shadow: 1px 1px 10px 1px black;
    
  }
</style>