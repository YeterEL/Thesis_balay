<template>
  <q-page class="q-pa-lg">
    <div class="text-h6 text-indigo row justify-center q-mb-md">
      Register
    </div>
    <q-form
      @submit="onSubmit"
      ref="signUnForm"
    >
      <div class="q-gutter-y-xs column column">
        <q-input
          color="indigo"
          outlined
          v-model="userName"
          type="text"
          prefix="User Name:"
          ref="input"
          :rules="[val => !!val || 'Field is required']"
        />
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
        <q-input
          color="indigo"
          outlined
          v-model="confirm"
          :type="isPwd ? 'password' : 'text'"
          prefix="Confirm:"
          :rules="
          [
            val => !!val || 'Field is required',
            val => val == this.password || 'password dont match'
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
            @click="$router.replace('/login')"
            no-caps
            dense
          >
            Already have an account
          </q-btn>
        </span>
        <!-- v-if="this.userName && this.email && this.password && this.password == this.confirm" -->
        <q-btn
          type="submit"
          color="indigo"
          class="full-width"
          label="Register"
        />
        <!-- <q-btn
          v-else
          disabled
          color="indigo"
          class="full-width"
          label="Register"
        /> -->
        <!-- verification dialog -->
        <!-- <q-dialog v-model="verify">
        <q-card>
          <q-card-section>
            <div class="text-h6">Email Verification</div>
          </q-card-section>

          <q-card-section>
            <div>Email verfication sent.. Open your email(<span class="text-primary">{{ email }}</span>) to verify and proceed.</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn v-if="emailVerified" flat label="proceed" color="primary" v-close-popup />
            <q-btn v-else disable flat label="proceed" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog> -->
      </div>
    </q-form>
  </q-page>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Register',
  data () {
    return {
      userName: '',
      email: '',
      isPwd: true,
      password: '',
      confirm: ''
    }
  },
  methods: {
    async registerUser () {
      await this.$store.dispatch('firestore/registerUser', {
        displayName: this.userName,
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
    },
    async onSubmit () {
      console.log(this.$refs)
      if (this.$refs.signUnForm.validate()) {
        console.log(`Signing user ${this.email}.`)
        try {
          await this.$store.dispatch('firestore/registerUser', {
            displayName: this.userName,
            email: this.email,
            password: this.password
          })
            .then(
              setTimeout(() => {
                this.$router.replace('/')
              }, 1000)
            )
            .catch((err) => {
              this.$q.dialog({
                title: 'Error!',
                message: err.message,
                persistent: true
              })
              console.log(err)
            })
        } catch (err) {
          this.$q.dialog({
            title: 'Error!',
            message: err.message,
            persistent: true
          })
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
