<template>  
    <div style="text-align: center;" >
      <!-- <transition name="fade" appear>
        <small id="small" 
        v-if="btnMsg">
        Upadating note please wait....
        </small>
        </transition> -->

      <div>
        <transition name="adjust">
        <textarea rows="5" cols="44" 
        :value="msg" @blur="changeMsg($event)"  
        class="" maxlength="200">
        </textarea> 
        </transition>
      </div>

      <div>
         <button :disabled="btnMsg"  
         @click="updateNote(id)" id="updateBtn" 
         class=" updateBtn">Update
         </button>
      </div> 
    </div>    
</template>

<script>
export default {
    data(){
        return {
            message: '',
            btnMsg: false,
            
        }
    },
    props: ['id', 'msg'],
    
    methods: {

         changeMsg(event){
            this.message = event.target.value
        },

        updateNote(id){
            this.btnMsg = true
            const editedNote = {
                id,
                message: this.message
            }

            this.$emit('loading', 'upadating please wait..')
            console.log(this.btnMsg)
            this.$store.dispatch('updateNote', editedNote)
            
        }
    }
}
</script>
<style>
textarea {
  outline: none !important;
}

#small {
  color: #4AAE9B;
}
  #updateBtn {
    border: 1px solid #4AAE9B;
    color: #4AAE9B;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  } 

  #updateBtn:hover,
  #updateBtn:active {
    background-color: #4AAE9B;
    color: black;
  }

  #updateBtn[disabled],
  #updateBtn[disabled]:hover,
  #updateBtn[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease
  }

   
</style>
