<template>

  <div class="home">
    <transition name="fade" appear>
      <div>
        <img src="../assets/logo.png" @load="loaded = true">
      </div>
    </transition>
    <transition name="fade" appear>
    <div v-if="loaded">
      <div>
        <h2>Welcome To Your fav short Notes App</h2>
        <h5 >save your short notes securely and hapily &#128526;</h5> 
      </div>
      <div v-if="!auth">
      <router-link  to="/login"  ><a class="btn homeButtons">Login</a></router-link> 
      <router-link  to="/signup"  ><a class="btn homeButtons">sign Up</a></router-link>
      </div>
      <div v-if="auth">
        <h6>Welcome, click below to see your notes</h6>
        <router-link  to="/notes"  ><a class="btn homeButtons">Your notes</a></router-link> 
      </div>
      <small> Built with Vue and so much love by codeOfConduct</small>
    </div>
    </transition>  
</div>
</template>

<script>

export default {
  data(){
    return  {
      loaded: false
    }
  },
  computed: {
    auth(){
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
 .homeButtons {
    font-size: 1.8rem;
    margin-right: 0.3rem;
    margin-top: 1rem;
    padding: 1rem 0;
    width: 10rem;
    text-align: center;
    margin-bottom: 1rem;
    text-decoration: none;
    color: black;
    background-color: skyblue;
}

.homeButtons:hover {
    cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 234, 0.5);
    background-color: aliceblue;
    color: #4AAE9B;
    transform: translateY(-0.1rem);
    transition: transform 150ms;
}

 .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s ease;
   
    
  }

  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-move {
    transition: transform 1s;
  }
</style>
