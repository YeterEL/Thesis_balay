<template>
  <div class="column content-center">
    <q-knob
      show-value
      font-size="12px"
      v-model="paidPercentage"
      size="90px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
    >{{ paidBoarders }} / {{ numberOfBoarders }}</q-knob>
    <div>Paid House Boarders</div>
  </div>
</template>

<script>
export default {
  name: 'VacancyKnob',
  computed: {
    numberOfBoarders () {
      return this.$store.state.firestore.numberOfBoarders
    },
    paidBoarders () {
      return this.$store.state.firestore.paidBoarders
    },
    paidPercentage () {
      return this.paidBoarders / this.numberOfBoarders * 100
    }
  }
}
</script>
