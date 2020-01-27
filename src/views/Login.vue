<template>
  <div id="signin">
    <div class="signin-form">
        <h3 style="text-align:center; color:#4AAE9B;">Log In</h3>
        <em class="error" v-if="error == 'INVALID_PASSWORD' || error =='EMAIL_NOT_FOUND'">invalid email or password!!</em>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <input
                  type="email"
                  id="email" 
                  @blur="$v.email.$touch()"
                  v-model="email"
                  :class="{inputError: $v.$error}"
                  >
           <em v-if="$v.$error" class="error">please enter a valid email</em>       
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password"
                  :disabled="!$v.email.email || !email"
                  >
        </div>
        <div class="submit">
          <button :disabled="$v.$anyError || !password"  type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import {required, email, numeric, sameAs, minValue, minLength, requiredUnless} from 'vuelidate/lib/validators'
export default {
    
    data () {
      return {
        email: '',
        password: '',
        btnMsg: false
      }
    },
    computed:{
      error(){
        this.btnMsg = false
        return this.$store.getters.errorMsg
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        
        this.$store.dispatch('alterLink', 'signin')
         this.$store.dispatch('login', {email: formData.email, password: formData.password})
         this.password = ''
      }
    },

    validations: {
      email:{
        required,
        email
      }
    },
    
}
</script>
<style scoped>
.signin-form {
    background-color: #f8f9fa;
    max-width: 30rem;
    margin: 1rem auto;
    border: 1px solid #eee;
    padding: 1rem;
    box-shadow:5px 5px 5px 0px black;
    border-radius: 10px;
  }

  .signin-form .submit {
    text-align: right;
  }

  .error {
    color: red;
  }

  .input {
    
    margin: 10px auto;
  }

  .inputError {
    background-color: red;
    transition: background-color 0.5s ease-out
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #4AAE9B;
    background-color: #eee;
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