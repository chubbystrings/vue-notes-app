<template>
    <div class="row">
        <div class="text-form">
            <div>
            <textarea placeholder="Write short Note" rows="10" cols="40"  v-model="message" class=" textDiv" maxlength="100">

            </textarea> 
            
            <button :disabled="!message"  @click="saveBtn" id="saveBtn" class="saveBtn btn-green mt-3">Save</button> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
            message: ''
            
        }
    },
    methods: {
        saveBtn(){
            this.$store.dispatch('alterLink', 'newNote')
            this.$store.dispatch('addNewNote', {
                message: this.message,
                userId: this.$store.state.userId,
                color: 'white'
            })
        }
    }
    
}
</script>
<style>
.text-form {
    max-width: 30rem;
    margin: 1rem auto;
    padding: 0.5rem;
    border-radius: 5%;
}
.textDiv {
    display: block;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 5px 5px 5px 0px black
}
.textDiv:focus {
    outline: none;
}
#saveBtn {
border: 1px solid #4AAE9B;
color: black;
padding: 10px 20px;
font: inherit;
cursor: pointer;
background-color: #f8f9fa
} 

#saveBtn:hover,
#saveBtn:active {
background-color: #4AAE9B;
color: black;
}

#saveBtn[disabled],
#saveBtn[disabled]:hover,
#saveBtn[disabled]:active {
border: 1px solid #ccc;
background-color: transparent;
color: #ccc;
cursor: not-allowed;
}

</style>