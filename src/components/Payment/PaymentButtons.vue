<template>
  <div>
  <div v-for="boarder in singleBoarder" :key="boarder.full_name">
  <q-input v-model="money" color="indigo" class="q-pa-sm" type="number" outlined :placeholder="boarder.balance" />
    <q-card-actions align="between">
      <q-btn outline color="red" label="back" />
      <q-btn outline color="indigo" label="payment" @click="payment (boarder.id, boarder.status, boarder.balance)"/>
    </q-card-actions>
  </div>
  </div>
</template>

<script>
export default {
  props: ['userId', 'houseId'],
  name: 'PaymentButtons',
  data () {
    return {
      money: null
    }
  },
  computed: {
    singleBoarder () {
      return this.$store.state.firestore.singleBoarder
    },
    paidBoarders () {
      return this.$store.state.firestore.paidBoarders
    }
  },
  methods: {
    payment (id, status, balance) {
      console.log(id, status, balance, this.money)
      if (Number(this.money) === Number(balance)) {
        this.$store.dispatch(
          'firestore/updateBalance', {
            id: id,
            balance: balance - this.money,
            status: 'paid'
          }
        )
        this.$store.dispatch(
          'firestore/updatePaidBoarders', {
            id: this.houseId,
            paidBoarders: this.paidBoarders + 1
          })
      } else {
        this.$store.dispatch(
          'firestore/updateBalance', {
            id: id,
            balance: balance - this.money,
            status: 'unpaid'
          }
        )
      }
      this.$store.dispatch(
        'firestore/retrieveBoarders',
        this.userId
      )
      this.$router.go(-1)
    }
  }
}
</script>
