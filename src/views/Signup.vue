<template>
 <div id="signup">
    <div class="signup-form">
        <h3 style="text-align:center; color:#4AAE9B;">Sign Up Form</h3>
        <em class="error" v-if="error === 'Unauthorized'">email already exist</em>
      <form @submit.prevent="onSubmit">
            <div class="input">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    @blur="$v.email.$touch()"
                    v-model="email"
                    :class="{inputError: $v.email.$error}"
                    >
                    <em v-if="$v.email.$error" class="error">please enter a valid email</em>       
            </div>
            
            
            <div class="input">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    :class="{inputError: $v.password.$error}"
                    @blur="$v.password.$touch()"
                    :disabled="$v.email.$invalid || $v.email.$error"
                    v-model="password"
                >
                <em v-if="$v.password.$error" class="error">password length should be above {{$v.password.$params.minLen.min}}</em>
            </div>

            <div class="input">
                <label for="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  :class="{inputError: $v.confirmPassword.$error}"
                  id="confirm-password"
                  @input="$v.confirmPassword.$touch()"
                  :disabled="$v.email.$invalid || $v.email.$error"
                  v-model="confirmPassword">

                  <em class="error" v-if="$v.confirmPassword.$error">Password Mismatch</em>
            </div>
            <div class="submit">
                <button :disabled="$v.$anyError || !confirmPassword" type="submit" >Submit</button>
            </div>
        </form>
    </div>
 </div>  
    
</template>
<script>
import globalAxios from 'axios'
import store from '../store/index'
import {required, email, numeric, sameAs, minValue, minLength, requiredUnless} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        }
        
        this.btnMsg = true
        this.$store.dispatch('alterLink', 'signup')
        this.$store.dispatch('signup', formData)

    }
  },

  computed: {
    error(){
        return store.getters.errorMsg
      }
  },

  validations: {
    email: {
      required,
      email,
      unique: val => {
          if(val === '' || !/\S+@\S+\.\S+/.test(val)) return true
          return globalAxios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
          .then(res => {
            if(Object.keys(res.data).length === 0){
              store.dispatch('clearErrorLog')
              return true
            }else {
              const errorMessage = {
                statusText: 'Unauthorized'
              }
              store.dispatch('errorMessage', errorMessage )
            }
            
          })
          .catch(error => {
            const errorMessage = {
              statusText: 'Unknown error'
            }
            store.dispatch('errorMessage', errorMessage)
          })
          
        }
    },

     password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        required,
        sameAs: sameAs(vm => {
          return vm.password
        })
      },


  }
    
}
</script>
<style scoped>
  .signup-form {
     max-width: 30rem;
    margin: 1rem auto;
    border: 1px solid #eee;
    padding: 1rem;
    box-shadow:5px 5px 5px 0px black;
    border-radius: 10px;
    background-color: #f8f9fa
  }

  .signup-form .submit {
    text-align: right;
  }

  .error {
    color: red;
  }

  .inputError {
    background-color: red;
    transition: background-color 0.5s ease-out
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
    border-radius: 20px;
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