<template>
  <div class="row">
    <app-notes
      v-for="note in notes" 
      :key="note.message" 
      :note="note">
    </app-notes> 
    <app-modal v-if="modalView" ></app-modal>
    
    <transition name="fade" appear mode="out-in">
      <div class="noNotes"> 
        <h4 style="text-align: center" v-if="notes.length === 0" >No Notes Yet!!</h4>
      </div>
    </transition>
    
    <app-loader v-if="notes.length === 0 && link === 'Loading Notes'" ></app-loader>
</div>
</template>
<script>
import {mapState} from 'vuex'
import Note from '../components/Note.vue'
import Modal from '../components/Modal.vue'
import store from '../store/index'
import Loader from '../components/Loader.vue'


export default {


    computed: {
      ...mapState({
          notes: 'notes',
          modalView: 'isModalView',
          link: 'link'
      }),

    },

    created(){
      if(store.state.notes.length == 0){
        store.dispatch('fetchNotes', store.state.userId)
      }else{
        return
      }

      if(performance.navigation.type === performance.navigation.TYPE_RELOAD){
        this.$store.dispatch('alterLink', 'readNotes')
      }
      
    },

    components: {
      appNotes: Note,
      appModal: Modal,
      appLoader: Loader
        
    },
    
}
</script>
<style scoped>

 .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 2s ease;
    
   
    
  }

  .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-move {
    transition: transform 1s;
  }

.flip-enter-active {
  animation: flip-in 1s ease-out forwards;

}
.flip-leave-active {
  animation: flip-out 1s ease-out forwards;
}

.flip-move {
  transition: transform 2s
}

.noNotes {
  margin: 1rem auto
}



@keyframes flip-in {
   from{
    transform: rotateY(90deg)
  }
  to {
    transform: rotateY(0deg)
  }
  
}

@keyframes flip-out {
  from{
    transform: rotateY(0deg)
  }
  to {
    transform: rotateY(90deg)
  }
}
</style>