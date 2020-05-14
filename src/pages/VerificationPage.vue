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
            <q-btn flat color="indigo" @click="termsAndCondition">proceed</q-btn>
        </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  methods: {
    termsAndCondition () {
      this.$router.push({ path: `/termsanconditions` })
    }
  }
}
</script>
