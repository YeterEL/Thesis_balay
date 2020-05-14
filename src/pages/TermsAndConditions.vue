<template>
  <q-page class="q-pa-md">
    <div> verified: {{ emailVerified }} </div>
    <q-card v-if="emailVerified === true">Verified</q-card>
    <q-card v-if="emailVerified === false">Not Verified please verify first</q-card>
    <q-card></q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      emailVerified: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      this.emailVerified = user.emailVerified
    })
  }
}
</script>
