<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo row justify-start">
          Email verfication
        </div>
      </q-card-section>
      <q-card-section>
        <div>Email verfication sent.. Verify your email first and proceed.</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="indigo"
          v-if="isVerificationSent"
          @click="sendEmailVerification"
        >Send Verification Again</q-btn>
        <q-btn
          color="indigo"
          v-else
          disable
        >Email Sent</q-btn>
        <q-btn
          flat
          color="indigo"
          @click="termsAndCondition"
        >Proceed</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      isVerificationSent: true
    }
  },
  methods: {
    termsAndCondition () {
      this.$router.go()
    },
    sendEmailVerification () {
      this.$store.dispatch('firestore/verifyEmail')
    }
  },
  async created () {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/login')
      }
    })
  }
}
</script>
