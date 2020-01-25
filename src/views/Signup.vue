<template>
 <div id="signup">
    <div class="signup-form">
        <h3 style="text-align:center; color:#4AAE9B;">Sign Up Form</h3>
      <form @submit.prevent="onSubmit">
            <div class="input">
                <label for="email">Email</label>
                <input
                        type="email"
                        id="email"
                        v-model="email">
            </div>
            
            
            <div class="input">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password">
            </div>
            <div class="input">
                <label for="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
            </div>
            <div class="submit">
                <button :disabled="btnMsg" type="submit" >Submit</button>
            </div>
        </form>
    </div>
 </div>  
    
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      btnMsg: false
    }
  },
  methods: {
    onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        }
        console.log(formData)
        this.btnMsg = true
        this.$store.dispatch('alterLink', 'signup')
        this.$store.dispatch('signup', formData)

    }
  }
    
}
</script>
<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow:5px 5px 5px 0px black;
    border-radius: 5%;
    background-color: #f8f9fa
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #4AAE9B;
    background-color: #eee;
  }

  .input.invalid input {
    background-color: #c05454;
    border: 1px solid red;
    color: red
  }
  .input.invalid label {
    color: red
  }
  
  .submit button {
    border: 1px solid #4AAE9B;
    color: #4AAE9B;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #4AAE9B;
    color: black;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>