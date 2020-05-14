<template>
  <q-page class="q-pa-md">
    <GuessUser v-if="authStatus === null" />
    <RegisteredUser />
  </q-page>
</template>

<script>
import GuessUser from '../components/Dashboard/GuessUser'
import RegisteredUser from '../components/Dashboard/RegisteredUser'
import firebase from 'firebase'

export default {
  name: 'Index',
  data () {
    return {
      authStatus: null
    }
  },
  components: {
    GuessUser,
    RegisteredUser
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      this.authStatus = user.authStatus
    })
    this.$store.dispatch(
      'firestore/retrieveUserId'
    )
    this.$store.dispatch(
      'firestore/retrieveBoarders',
      this.userId
    )
  },
  computed: {
    userId () {
      return this.$store.state.firestore.userId
    }
  }
}
</script>
