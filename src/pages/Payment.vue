<template>
<q-page class="q-pa-md">
  <q-card>
    <div class="text-h6 text-weight-medium text-indigo q-pa-md">House Boarder Information</div>
      <q-list v-for="boarder in singleBoarder" :key="boarder.full_name">
        <q-item>
          <q-item-section>
            <q-item-label class="text-h7 text-weight-medium">{{ boarder.full_name }}</q-item-label>
            <q-item-label>{{ boarder.address }}</q-item-label>
            <q-item-label>room #: {{ boarder.room }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <q-list class="row">
            <q-item class="col-6">
              <q-item-section>
                <q-item-label>Contact #</q-item-label>
                <q-item-label class="text-caption text-weight-small">{{ boarder.phone }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="col-6">
              <q-item-section>
                <q-item-label>Status :</q-item-label>
                <q-item-label class="text-caption text-red">{{ boarder.status }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="col-6">
              <q-item-section>
                <q-item-label>Monthly bill :</q-item-label>
                <q-item-label class="text-caption">₱ {{ boarder.rent }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="col-6">
              <q-item-section>
                <q-item-label>Balance :</q-item-label>
                <q-item-label class="text-caption text-weight-small">{{ boarder.balance }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-list>
        <q-separator />
        <PaymentButtons :userId="userId" :houseId="houseId"/>
  </q-card>
</q-page>
</template>

<script>
import PaymentButtons from '../components/Payment/PaymentButtons'

export default {
  components: {
    PaymentButtons
  },
  created () {
    this.$store.dispatch(
      'firestore/retrieveSingleBoarder',
      this.$route.params.boarder_id
    )
  },
  computed: {
    singleBoarder () {
      return this.$store.state.firestore.singleBoarder
    },
    userId () {
      return this.$store.state.firestore.userId
    },
    houseId () {
      return this.$store.state.firestore.houseId
    }
  }
}
</script>
