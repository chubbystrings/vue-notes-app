<template>
  <div id="signin">
    <div class="signin-form">
        <h3 style="text-align:center; color:#4AAE9B;">Log In</h3>
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
        <div class="submit">
          <button :disabled="btnMsg" type="submit">Submit</button>
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
        btnMsg: false
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
          this.$store.dispatch('alterLink', 'signin')
          this.btnMsg = true
         this.$store.dispatch('login', {email: formData.email, password: formData.password})
      }
    }
    
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
    border-radius: 5%;
  }

  .input {
    margin: 10px auto;
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