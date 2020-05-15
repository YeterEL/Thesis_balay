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
              height="300px"
            >
              <q-carousel-slide v-for="(image, i) in images" :key="i" :name="i" :img-src="image.image_url" />
            </q-carousel>
            </q-card>
            <q-card>
              <div class="q-pa-xs column">
                <UploadImage :house_id="house.id" />
                <q-btn icon="edit" @click="editPage (house.id)" color="green" class="full-width q-mt-sm" outline rounded label="Edit House Information" />
                <!-- <q-btn icon="delete" color="red" class="full-width q-mt-sm" outline rounded label="Delete House" /> -->
              </div>
              <q-card-section>
                <div class="text-h6 text-weight-medium"> {{ house.house_name }} </div>
                <div> {{ house.address }} </div>
                <div>
                  <div>
                   <q-rating
                    v-model="house.rate"
                    max="5"
                    size="1.5em"
                    color="warning"
                    icon="star_border"
                    icon-selected="star"
                    icon-half="star_half"
                    no-dimming
                />
                  ( {{ house.numberOfReviews }} )
                </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-subtitle2">House Information : </div>
                <div> {{ house.details }} </div>
                <div class="text-subtitle2 q-mt-md">Contact Information : </div>
                <div> Smart: {{ house.contact_number1 }} </div>
                <div> Globe: {{ house.contact_number2 }} </div>
              </q-card-section>
              <q-card-section>
                <q-list class="row justify-between">
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="primary" size="md" name="money" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Price range</q-item-label>
                      <q-item-label caption> ₱{{ house.price_min }}  -  ₱{{ house.price_max }} </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="cyan" size="md" name="directions" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Near  {{ house.near }} </q-item-label>
                      <q-item-label caption> {{ house.distance }} km </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="teal" size="md" name="local_hotel" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Vacancy<q-badge :color="color (house.vacancy)" floating>{{ house.vacancy }}</q-badge></q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="house.wifi">
                    <q-item-section avatar>
                      <q-icon color="red" size="md" name="wifi" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Wifi Available</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-else>
                    <q-item-section avatar>
                      <q-icon color="red" size="md" name="wifi_off" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Not Available</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
</template>

<script>
import UploadImage from '../Buttons/UploadImage'
// import EditHouseInfo from '../Buttons/EditHouseInfo

export default {
  name: 'GuessHouseInfo',
  data () {
    return {
      slide: 1,
      like: false,
      modal: false,
      inquire: false
    }
  },
  computed: {
    singleHouse () {
      return this.$store.state.firestore.singleHouse
    },
    images () {
      return this.$store.state.firestore.house_images
    },
    comments () {
      return this.$store.state.firestore.houseComments
    }
  },
  components: {
    UploadImage
  },
  methods: {
    editPage (id) {
      this.$router.push({ path: `/house/${id}/edit` })
    },
    color (vacancy) {
      if (vacancy === 0) {
        return 'red'
      } else if (vacancy <= 10) {
        return 'warning'
      } else {
        return 'teal'
      }
    }
  }
}
</script>

<style>
</style>
