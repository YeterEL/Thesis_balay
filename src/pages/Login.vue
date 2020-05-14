<template>
  <q-page class="q-pa-lg">
    <div class="text-h6 text-indigo row justify-center q-mb-md">
      Login
    </div>
    <q-form
      @submit="onSubmit"
      ref="logInForm"
    >

      <div class="q-gutter-y-xs column column">
        <div>
          <q-input
            color="indigo"
            outlined
            v-model="email"
            type="email"
            prefix="Email:"
            :rules="
            [
              val => !!val || 'Field is required'
            ]"
          />
        </div>
        <q-input
          color="indigo"
          class="q-pb-none"
          outlined
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          prefix="Password:"
          :rules="
          [
            val => !!val || 'Field is required',
            val => val.length > 6 || 'Manimum of 6'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <span class="text-caption q-my-sm text-indigo-6 text-right q-ma-none q-pa-none">
          <q-btn
            flat
            @click="$router.replace('/register')"
            no-caps
            dense
          >
            Register Now
          </q-btn>
        </span>
        <!-- v-if="this.email && this.password" -->
        <q-btn
          color="indigo"
          type="submit"
          class="full-width"
          label="Login"
        />
        <!-- <q-btn
          v-else
          disabled
          color="indigo"
          class="full-width"
          label="Login"
        /> -->
      </div>
    </q-form>
  </q-page>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      isPwd: true,
      password: ''
    }
  },
  methods: {
    async loginUser () {
      await this.$store.dispatch('firestore/loginUser', {
        email: this.email,
        password: this.password
      })
        .then(
          this.$router.replace('/verify'))
        .catch((err) => {
          console.log(err)
        })
    },
    async onSubmit () {
      if (this.$refs.logInForm.validate()) {
        console.log(`Signing user ${this.email}.`)
        try {
          await this.$store.dispatch('firestore/loginUser', {
            email: this.email,
            password: this.password
          })
            .then(
              this.$router.replace('/'))
            .catch((err) => {
              this.$q.dialog({
                title: 'Error!',
                message: err.message,
                persistent: true
              })
              console.log(err)
            })
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
  }
}
</script>
