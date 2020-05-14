<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-mt-xl">
      <q-avatar size="200px" font-size="45px" color="indigo-2" text-color="indigo">
        Balay
      </q-avatar>
    </div>
    <div class="column content-center text-subtitle1 q-mt-md">
      <div>You are now login manage your house and boarders.</div>
    </div>
     <div class="q-mt-sm">
      <q-btn class="full-width" icon="dashboard" outline color="indigo" label="Manage Boarders" @click="boardersPage (userId)" ></q-btn>
      <q-btn class="full-width q-mt-sm" icon="house" outline color="indigo" label="Manage House" @click="housePage (userId)"></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'RegisteredUser',
  created () {
    console.log(this.userId)
  },
  computed: {
    userId () {
      return this.$store.state.firestore.userId
    }
  },
  methods: {
    boardersPage (id) {
      this.$router.push({ path: `/boarders/${id}` })
    },
    housePage (id) {
      this.$router.push({ path: `/house/${id}` })
    }
  }
}
</script>
