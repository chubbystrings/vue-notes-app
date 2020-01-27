<template>

<div class="card mb-2" style="width: 20rem;" :style="{backgroundColor: note.color}">
  <div class="card-title">
    <small   class=" float-left">{{ changedColor ? changedColor : note.color}}</small>
    <button  id="colorBtn" @click="radomColor(note.id)" class="float-right ">C</button>
  </div>
  <div class="card-body">
    <p class="card-text">{{note.message}}</p>
    <button id="editBtn"  @click="viewModal(note.id)">Edit</button>
    <button  id="closeBtnNote" @click="deleteNote(note.id)" class="btn float-right">X</button>
  </div>
</div>


  <!-- <div class="col-xs-6 col-md-4">
    <div :style="{backgroundColor: note.color}" class=" quote mb-3" @click="radomColor(note.id)">
      
      <small class="float-left">card: {{ changedColor ? changedColor : note.color}}</small>
      <button id="deleteBtn" @click="deleteNote(note.id)" class="float-right">X</button>
      <br>

      {{note.message}}

      <br> 
      <button @click="viewModal(note.id)" id="editBtn" class="float-right">Edit</button >

    </div>
  </div>  -->

</template>

<script>
import {mapState} from 'vuex'
export default {

    data(){
      return {
        changedColor: '',
        selectColors: [
          'white', 'skyblue', 'orangered', 
          'purple', 
           'tan','lemon', 'yellow', 'gold', 
           'orange', 'red', 'orchid', 
           'azure', 'indigo',  'lime', 'brown', 'chocolate'
          ]
      }
    },
    props: ['note', 'index'],
    computed: {
      ...mapState(['color'])
      
    },
    
    methods:{

        deleteNote(noteId){
            this.$store.dispatch('deleteNote', noteId)
        },

        viewModal(Id){
          this.$store.dispatch('openModal', Id)
        },

        radomColor(noteId){
          const randNum = Math.floor(Math.random() * this.selectColors.length)
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

    .card {
      display: block;
      font-size: 20px;
      color: black;
      cursor: pointer;
      box-shadow: 5px 5px 5px 0px black;
      height: 14rem;
      box-sizing: border-box;
      padding: 0.5rem;
      background-color: #f8f9fa;
      transition: background-color .5s ease-out;
      margin-left: 0.5rem;
    }
   
    #closeBtnNote {
      position:absolute;
      right: 0.1rem;
      bottom: 0.5rem;
      background-color: transparent;
      outline: none;
      border: none;
    }

    #colorBtn {
      background-color: transparent;
      outline: none;
     
    }

    #editBtn {
      position:absolute;
      left: 0.1rem;
      bottom: 0.5rem;
      background-color: transparent;
      outline: none;
      border: none;
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