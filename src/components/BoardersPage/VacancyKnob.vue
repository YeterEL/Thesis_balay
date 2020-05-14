<template>
  <div class="column content-center">
    <q-knob
      show-value
      font-size="12px"
      v-model="occupiedRooms"
      size="90px"
      :thickness="0.22"
      color="primary"
      track-color="grey-3"
      class="q-ma-md"
    >{{ numberOfBoarders }} / {{ availableRoom }}</q-knob>
    <div class="q-ml-sm">House Vacancy</div>
  </div>
</template>

<script>
export default {
  name: 'VacancyKnob',
  props: [
    'boardersCount'
  ],
  computed: {
    availableRoom () {
      return this.$store.state.firestore.available_room
    },
    numberOfBoarders () {
      return this.$store.state.firestore.numberOfBoarders
    },
    occupiedRooms () {
      return this.numberOfBoarders / this.availableRoom * 100
    }
  }
}
</script>
