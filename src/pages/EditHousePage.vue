<template>
    <div>
      <div v-if="singleHouse === []" class="row justify-center">
        <h6>Loading ...</h6>
      </div>
      <div v-else>
        <div v-for="house in singleHouse" :key="house.house_name" class="q-pa-md">
          <q-card class="q-mb-sm">
            <q-carousel
              swipeable
              animated
              v-model="slide"
              thumbnails
              infinite
              autoplay
              height="200px"
            >
              <q-carousel-slide v-for="(image, i) in googleImages" :key="i" :name="i" :img-src="image.image_url" />
            </q-carousel>
            </q-card>
            <UploadGoogleMap :house_id="$route.params.house_id"/>
            <q-card>
              <div class="q-pa-xs column">
              </div>
              <q-card-section>
               <q-input color="indigo" square autogrow v-model="house_name">
                  <template v-slot:prepend>
                    <q-icon name="house" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
                <q-input color="indigo" square autogrow v-model="address">
                  <template v-slot:prepend>
                    <q-icon name="place" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
                <q-input color="indigo" label="Smart " stack-label square autogrow v-model="contact_number1">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
                 <q-input color="indigo" label="Globe " stack-label square autogrow v-model="contact_number2">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-section>
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
              </q-card-section>
              <q-card-section>
                <q-list class="row justify-between">
                  <q-item>
                    <div class="q-pa-md">
                      <q-badge color="primary">
                        Rooms monthly price range: {{ price.min }} - {{ price.max }}
                      </q-badge>

                      <q-range
                        v-model="price"
                        :min="0"
                        :max="4000"
                        :step="50"
                        color="primary"
                      />
                    </div>
                  </q-item>
                  <q-item>
                    <div class="q-pa-md">
                      <q-badge color="cyan">
                        Distance to {{ near }} : {{ distance }} km
                      </q-badge>

                      <q-slider v-model="distance" color="cyan" :min="0" :max="10" :step="0.5"/>
                    </div>
                  </q-item>

                  <q-item>
                    <div class="q-pa-md">
                    <q-badge color="teal">
                        Total number of rooms : {{ available_room }}
                    </q-badge>

                    <q-slider v-model="available_room" :color="color (available_room)" :min="0" :max="50" :step="1"/>
                    </div>
                  </q-item>
                  <q-item>
                    <div>
                      <q-toggle
                        v-model="wifi"
                        :label="label (wifi)"
                        color="red"
                        checked-icon="wifi"
                        unchecked-icon="wifi_off"
                        size="lg"
                      />
                    </div>
                  </q-item>
                </q-list>
                <q-separator />
                <div class="row justify-between q-ma-sm">
                  <q-card-actions>
                      <q-btn @click="cancelEdit" color="red" flat size="18px" icon="cancel" />
                  </q-card-actions>
                  <q-card-actions>
                    <q-btn @click="updateHouse" color="green" flat size="18px" icon="check" />
                  </q-card-actions>
                </div>
              </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
</template>

<script>
import UploadGoogleMap from '../components/Buttons/UploadGoogleMap'

export default {
  name: 'GuessHouseInfo',
  created () {
    this.$store.dispatch('firestore/retrieveGoogleImages', this.$route.params.house_id)
    for (var house in this.singleHouse) {
      this.house_id = this.singleHouse[house].house_id
      this.house_name = this.singleHouse[house].house_name
      this.address = this.singleHouse[house].address
      this.details = this.singleHouse[house].details
      this.near = this.singleHouse[house].near
      this.distance = this.singleHouse[house].distance
      this.price = {
        min: this.singleHouse[house].price_min,
        max: this.singleHouse[house].price_max
      }
      this.available_room = this.singleHouse[house].available_room
      this.contact_number1 = this.singleHouse[house].contact_number1
      this.contact_number2 = this.singleHouse[house].contact_number2
      this.wifi = this.singleHouse[house].wifi
    }
  },
  data () {
    return {
      house_id: '',
      house_name: '',
      address: '',
      details: '',
      near: 0,
      distance: 0,
      price_max: 0,
      price_min: 0,
      available_room: 0,
      contact_number1: null,
      contact_number2: null,
      wifi: null,
      slide: 1,
      like: false,
      modal: false,
      inquire: false,
      ratingModel: 4,
      price: {
        min: 0,
        max: 0
      },
      options: [
        'WMSU', 'APMC', 'ZDSPGC', 'STA'
      ]
    }
  },
  computed: {
    singleHouse () {
      return this.$store.state.firestore.singleHouse
    },
    googleImages () {
      return this.$store.state.firestore.house_googlemap
    }
  },
  components: {
    UploadGoogleMap
  },
  methods: {
    color (vacancy) {
      if (vacancy === 0) {
        return 'red'
      } else if (vacancy <= 10) {
        return 'warning'
      } else {
        return 'teal'
      }
    },
    label (wifi) {
      if (wifi === true) {
        return 'Wifi Available'
      }
      if (wifi === false) {
        return 'Wifi Not Available'
      }
    },
    updateHouse () {
      this.$store.dispatch('firestore/updateHouse', {
        id: this.$route.params.house_id,
        house_name: this.house_name,
        address: this.address,
        near: this.near,
        distance: this.distance,
        details: this.details,
        price_max: this.price.max,
        price_min: this.price.min,
        contact_number1: this.contact_number1,
        contact_number2: this.contact_number2,
        available_room: Number(this.available_room),
        wifi: this.wifi
      })
      this.$router.go(-1)
    },
    cancelEdit () {
      this.$router.go(-1)
      // console.log(this.calendar)
    }
  }
}
</script>

<style>
</style>
