<template>
  <q-page class="q-pa-md">
    <div class="column content-start q-mt-md">
      <div class="text-h4 text-weight-small text-indigo">Welcome!</div>
    </div>
    <div class="column content-start q-mt-md">
      <div>Login or Register to manage your houses.</div>
    </div>
    <div class="row wrap justify-between q-mt-sm">
      <q-btn flat color="indigo">Login</q-btn>
      <q-btn flat color="indigo" @click="registerPage">Register</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'GuessUser',
  methods: {
    registerPage () {
      this.$router.push({ path: `/register` })
    }
  }
}
</script>
