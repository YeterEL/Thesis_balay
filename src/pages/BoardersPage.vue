<template>
    <q-page>
      <UserBoardersPage :userId="userId"/>
    </q-page>
</template>

<script>
import UserBoardersPage from '../components/BoardersPage/UserBoardersPage'

export default {
  name: 'Dashboard',
  components: {
    UserBoardersPage
  },
  computed: {
    userId () {
      return this.$store.state.firestore.userId
    }
  }
}
</script>
