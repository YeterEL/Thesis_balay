<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-weight-medium text-indigo q-mb-md">House Information</div>
    <div class="q-gutter-y-xs column">
        <q-input
          color="indigo"
          outlined
          v-model="house_name"
          type="text"
          prefix="House Name:"
          ref="input"
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          color="indigo"
          outlined
          autogrow
          v-model="address"
          type="text"
          prefix="Address:"
          ref="input"
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          color="indigo"
          outlined
          autogrow
          v-model="contact_number1"
          type="text"
          prefix="Contact # (Smart):"
          ref="input"
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          color="indigo"
          outlined
          autogrow
          v-model="contact_number2"
          type="text"
          prefix="Contact # (Globe):"
          ref="input"
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          class="q-mb-md"
          square
          v-model="details"
          type="textarea"
          outlined
          color="indigo"
          placeholder="Enter your house information you can edit it later"
        />
        <q-select outlined v-model="near" :options="options" color="indigo" label="House Nearest to: " stack-label />
        <div class="q-pa-md">
          <q-badge color="indigo">
            Distance to {{ near }} : {{ distance }} km
          </q-badge>

          <q-slider v-model="distance" color="indigo" :min="0" :max="10" :step="0.5"/>
        </div>
        <div class="q-pa-md">
          <q-badge color="indigo">
            Rooms monthly price range: {{ price.min }} - {{ price.max }}
          </q-badge>

          <q-range
            v-model="price"
            :min="0"
            :max="4000"
            :step="50"
            color="indigo"
          />
        </div>
        <div class="q-pa-md">
          <q-badge color="indigo">
            Total number of rooms : {{ rooms }}
          </q-badge>

          <q-slider v-model="rooms" color="indigo" :min="0" :max="50" :step="1"/>
        </div>
        <div>
          <q-toggle
            v-model="wifi"
            false-value="Wifi Not Available"
            true-value="Wifi Available"
            color="indigo"
            checked-icon="wifi"
            unchecked-icon="wifi_off"
            size="lg"
          />
        </div>
      <q-btn @click="addHouse" color="indigo" class="full-width q-mt-md" label="Upload House" />
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'

export default {
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      this.user_id = user.uid
      this.uploadedBy = user.displayName
    })
  },
  data () {
    return {
      user_id: '',
      uploadedBy: '',
      house_name: '',
      address: '',
      contact_number1: null,
      contact_number2: null,
      near: '',
      options: [
        'WMSU', 'APMC', 'ZDSPGC', 'STA'
      ],
      distance: 0,
      price: {
        min: 100,
        max: 2000
      },
      rooms: 0,
      wifi: 'Wifi Not Available',
      details: '',
      images: []
    }
  },
  methods: {
    addHouse () {
      if (this.wifi === 'Wifi Available') {
        this.wifi = true
      }
      if (this.wifi === 'Wifi Not Available') {
        this.wifi = false
      }
      this.$store.dispatch('firestore/addHouse', {
        user_id: this.user_id,
        house_name: this.house_name,
        address: this.address,
        near: this.near,
        distance: this.distance,
        contact_number1: this.contact_number1,
        contact_number2: this.contact_number2,
        details: this.details,
        price_max: this.price.max,
        price_min: this.price.min,
        available_room: Number(this.rooms),
        wifi: this.wifi,
        images: this.images,
        uploadedBy: this.uploadedBy
      })
      this.$router.go(-1)
    }
  }
}
</script>
