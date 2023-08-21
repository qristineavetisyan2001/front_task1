<template>
  <div class="hello">
    <navigation-panel />

    <section class="vh-100" style="background-color: #f0c6fb;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <h3 class="mb-5">Sign in</h3>
              <div class="form-outline mb-4">
                <input type="email" v-model="form.name"  placeholder = "Email:" class="form-control form-control-lg" />
              </div>
              <div class="form-outline mb-4">
                <input type="password"  id="password" v-model="form.pass" placeholder = "Password:" class="pass form-control form-control-lg" />
              </div>
              <!-- Checkbox -->
              <div class="form-check d-flex justify-content-start mb-4">
                <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
                <label class="form-check-label mx-2" for="form1Example3"> Remember password </label>
              </div>
              <button @keydown.enter.prevent="login()" class="btn_login w-100 btn btn-primary btn-lg btn-block" @click.prevent="login()">Login</button>
              <hr class="my-4">
              <div class = "error_mes" role="alert" v-if="error" >{{ error}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import NavigationPanel from "@/components/navigationPanel.vue";
export default {
  name: 'HelloWorld',
    components: {NavigationPanel},
  data() {
    return {
      errorMessage:'',
      form: {
        name: null,
        pass: null,
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true,
      error:null
    }
  },

  methods: {

    login() {
        if (this.form.name && this.form.pass) {
          var self = this;

          fetch('http://localhost:8000/admin/login', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(self.form)
          })
              .then(response => response.json()) // Parse the response as JSON
              .then(data => {
                // Handle the response data
                console.log('Login response:', data);
                if (data.success_mes) {
                  // $(".error_mes").html("<div class = 'alert alert-success'>" + data.success_mes + "</div>");
                  // setTimeout(function(){
                  localStorage.setItem('token', 'token');
                  //localStorage.setItem('token', data.token);
                   self.$router.push('/dashboard')
                  // },500)

                } else {
                  // Handle unsuccessful login here, e.g., show error message
                  self.error = data.error_mes;
                }
              })
              .catch(error => {
                // Handle any error that occurred during the fetch request
                console.error(error);
              });
        } else {
          // Handle form validation errors if needed
        }




    }
  },


    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.pass = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

