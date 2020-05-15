<template>
  <q-card>
    <q-bar class="bg-teal">
      <q-space />
      <q-btn dense color="white" flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section>
    <q-stepper
      v-model="step"
      vertical
      color="teal"
      animated
    >
      <q-step
        :name="1"
        color="teal"
        title="Add boarder full name and address"
        icon="settings"
        :done="step > 1"
      >
        <div class="column">
            <q-input v-model="full_name" outlined placeholder="Full Name eg. Wellim A. Turno" dense />
            <q-input v-model="address" autogrow class="q-mt-sm" outlined placeholder="Addresss" dense />
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="teal" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        color="teal"
        title="Add house boarder contact information"
        icon="phone"
        :done="step > 2"
      >
        <q-input v-model="phone" class="q-mt-sm" outlined placeholder="Phone number" dense />

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="teal" label="Continue" />
          <q-btn flat @click="step = 1" color="teal" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        color="teal"
        title="House boarder montly bill and room number"
        icon="attach_money"
      >
        <q-input v-model="rent" type="number" class="q-mt-sm" outlined placeholder="Monthly bill" dense />
        <q-input v-model="room" type="number" class="q-mt-sm" outlined placeholder="room number" dense />

        <q-stepper-navigation>
          <q-btn @click="addBoarder" color="teal" label="Finish" />
          <q-btn flat @click="step = 2" color="teal" label="Back" class="q-ml-sm" />
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
  methods: {
    addBoarder () {
      console.log(this.$route.params.house_id, this.full_name, this.address)
      // this.$store.dispatch('firestore/addBoarder', {
        // owner_id: this.$route.params.house_id,
        // full_name: this.full_name,
        // address: this.address,
        // phone: this.phone,
        // rent: this.rent,
        // balance: Number(this.rent),
        // room: this.room,
        // status: 'unpaid'
      // })
    }
  }
}
</script>
