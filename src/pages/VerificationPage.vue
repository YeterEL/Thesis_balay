<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo row justify-start">
          Email verfication
        </div>
      </q-card-section>
      <q-card-section>
        <div>Email verfication sent.. <p>Open your Gmail account to verify your email and proceed.</p></div>
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
          @click="termsAndCondition = true"
        >Proceed</q-btn>
        <q-dialog v-model="termsAndCondition" transition-show="rotate" transition-hide="rotate">
          <q-card>
            <q-card-section>
              <div class="text-h6">Terms of Agreement</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Decline" color="primary" v-close-popup />
              <q-btn flat label="Accept" color="primary" @click="proceed" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      isVerificationSent: true,
      termsAndCondition: false
    }
  },
  methods: {
    proceed () {
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
          this.$router.push('/addhouse')
        }
      } else {
        this.$router.push('/login')
      }
    })
  }
}
</script>
