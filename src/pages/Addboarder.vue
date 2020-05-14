<template>
  <q-card>
    <q-card-section>
    <q-stepper
      v-model="step"
      vertical
      color="indigo"
      animated
    >
      <q-step
        :name="1"
        color="indigo"
        title="Add boarder full name and address"
        icon="settings"
        :done="step > 1"
      >
        <div class="column">
            <q-input v-model="full_name" outlined placeholder="Full Name eg. Wellim A. Turno" dense />
            <q-input v-model="address" autogrow class="q-mt-sm" outlined placeholder="Addresss" dense />
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="indigo" outline label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        color="indigo"
        title="Add house boarder contact information"
        icon="phone"
        :done="step > 2"
      >
        <q-input v-model="phone" class="q-mt-sm" outlined placeholder="Phone number" dense />

        <q-stepper-navigation>
          <q-btn @click="step = 1" color="red" outline label="Back" />
          <q-btn class="q-ml-xl" @click="step = 3" color="indigo" outline label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        color="indigo"
        title="House boarder montly bill and room number"
        icon="attach_money"
      >
        <q-input v-model="rent" type="number" class="q-mt-sm" outlined placeholder="Monthly bill" dense />
        <q-input v-model="room" type="number" class="q-mt-sm" outlined placeholder="room number" dense />

        <q-stepper-navigation>
          <q-btn @click="step = 2" outline color="red" label="Back" />
          <q-btn class="q-ml-xl" outline @click="addBoarder" color="indigo" label="Finish" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AddBoarders',
  data () {
    return {
      step: 1,
      full_name: '',
      address: '',
      phone: '',
      rent: null,
      room: null,
      dialog: true,
      maximizedToggle: true
    }
  },
  computed: {
    userId () {
      return this.$store.state.firestore.userId
    },
    houseId () {
      return this.$store.state.firestore.houseId
    },
    numberOfBoarders () {
      return this.$store.state.firestore.numberOfBoarders
    }
  },
  methods: {
    addBoarder () {
      this.$store.dispatch('firestore/addBoarder', {
        owner_id: this.userId,
        full_name: this.full_name,
        address: this.address,
        phone: this.phone,
        rent: this.rent,
        balance: Number(this.rent),
        room: this.room,
        status: 'unpaid'
      })
      this.$store.dispatch('firestore/updateHouseBoarders', {
        id: this.houseId,
        boarder: this.numberOfBoarders + 1
      })
      this.$router.go(-1)
      var boarders = this.numberOfBoarders + 1
      console.log(boarders, this.houseId)
    }
  }
}
</script>
