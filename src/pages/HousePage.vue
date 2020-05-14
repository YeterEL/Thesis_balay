<template>
  <q-page>
    <UserHousePage v-if="!isLoading" />
    <div
      v-if="isLoading"
      class="col-10 flex flex-center"
    >
      <q-spinner-facebook
        size="50px"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script>
import UserHousePage from '../components/HousePage/UserhousePage'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    UserHousePage
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('firestore/retrieveSingleHouse', this.$route.params.house_id)
    this.$store.dispatch('firestore/retrieveHouseImages', this.$route.params.house_id)
    this.isLoading = false
  }
}
</script>
