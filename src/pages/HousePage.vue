<template>
  <q-page>
    <UserHousePage />
  </q-page>
</template>

<script>
import UserHousePage from '../components/HousePage/UserhousePage'

export default {
  components: {
    UserHousePage
  },
  created () {
    this.$store.dispatch('firestore/retrieveSingleHouse', this.$route.params.house_id)
    this.$store.dispatch('firestore/retrieveHouseImages', this.$route.params.house_id)
  }
}
</script>
