<template>

  <div class="col-xs-6 col-md-4">
    <div :style="{backgroundColor: note.color}" class=" quote mb-3" @click="radomColor(note.id)">

      <small class="float-left">card: {{ changedColor ? changedColor : note.color}}</small>
      <span id="deleteBtn" @click="deleteNote(note.id)" class="float-right">X</span>
      <br>

      <p>{{note.message}}</p>

      <br> 
      <span @click="viewModal(note.id)" id="editBtn" class="float-right">Edit</span >

    </div>
  </div> 

</template>

<script>
import {mapState} from 'vuex'
export default {

    data(){
      return {
        changedColor: '',
        selectColors: ['white', 'skyblue', 'orangered', 'purple']
      }
    },
    props: ['note', 'index'],
    computed: {
      ...mapState(['color'])
    },
    
    methods:{

        deleteNote(noteId){
            console.log(noteId)
            this.$store.dispatch('deleteNote', noteId)
        },

        viewModal(Id){
          this.$store.dispatch('openModal', Id)
        },

        radomColor(noteId){
          const randNum = Math.floor(Math.random() * this.selectColors.length)
          console.log(this.selectColors[randNum])
          const newColor = this.selectColors[randNum]
          this.changedColor = newColor
          this.$store.dispatch('changeColor', {
            color: newColor,
            id: noteId
          })
        }
    }

}
</script>

<style>

    .quote {
      font-size: 20px;
      color: black;
      cursor: pointer;
      box-shadow: 5px 5px 5px 0px black;
      height: 15rem;
      box-sizing: border-box;
      padding: 0.5rem;
      background-color: #f8f9fa;
      transition: background-color .5s ease-out  
    }
   
    #editBtn {
        position: absolute;
        right: 1.3rem;
        bottom: 1rem
    }

     .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .5s ease;
    
  }

  .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-move {
    transition: transform 1s;
  }

  
    
</style>