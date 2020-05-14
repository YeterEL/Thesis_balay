<template>
  <q-page class="q-pa-lg">
    <div class="text-h6 text-indigo row justify-center q-mb-md">
      Login
    </div>
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
      <q-btn v-if="this.email && this.password"
        @click="loginUser"
        color="indigo"
        class="full-width"
        label="Login"
      />
      <q-btn v-else disabled color="indigo" class="full-width" label="Login" />
    </div>
  </q-page>
</template>

<script>
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
    loginUser () {
      this.$store.dispatch('firestore/loginUser', {
        email: this.email,
        password: this.password
      })
      this.$router.go(-1)
    }
  }
}
</script>
