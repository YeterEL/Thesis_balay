<template>
  <q-page>
    <div class="row wrap justify-evenly q-mt-sm">
      <PaidBoardersKnob />
      <VacancyKnob />
    </div>
    <q-input
      color="indigo"
      placeholder="Search Boarders by Name"
      dense
      rounded
      outlined
      class="q-pa-sm q-mt-sm"
    >
      <template v-slot:append>
        <q-icon color="indigo" name="search" />
      </template>
    </q-input>
    <q-card bordered class="q-ml-sm q-mr-sm">
    <q-btn @click="addBoarder" icon="person" color="teal" class="full-width" outline label="Add boarder" />
      <div class="row justify-between q-pa-sm">
        <q-btn flat size="sm" color="indigo" label="sort by" />
        <q-btn @click="date = true" outline size="sm" color="red" label="set payment due date" />
        <q-dialog v-model="date">
          <q-card>
            <q-card-section>
              <q-date
                v-model="dueDate"
                minimal
                color="indigo"
              />
            </q-card-section>
            <q-card-actions class="row justify-between q-ml-sm q-mr-sm q-mb-sm">
              <q-btn @click="date = false" color="red" outline>cancel</q-btn>
              <q-btn @click="addDueDate" color="indigo" outline>Add</q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <q-list v-for="boarder in boarders" :key="boarder.full_name" bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          :label="boarder.full_name"
          :caption="boarder.address"
        >
            <q-card-section>
              <q-list class="row">
                <q-item class="col-6">
                  <q-item-section>
                    <q-item-label>Contact #</q-item-label>
                    <q-item-label class="text-caption text-weight-small"> {{ boarder.phone }} </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-if="boarder.status == 'unpaid'" class="col-6">
                  <q-item-section>
                    <q-item-label>Status :</q-item-label>
                    <q-item-label class="text-caption text-red">{{ boarder.status }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item v-if="boarder.status == 'paid'" class="col-6">
                  <q-item-section>
                    <q-item-label>Status :</q-item-label>
                    <q-item-label class="text-caption text-green">{{ boarder.status }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="col-6">
                  <q-item-section>
                    <q-item-label>Monthly bill :</q-item-label>
                    <q-item-label class="text-caption">₱ {{ boarder.rent }} </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="col-6">
                  <q-item-section>
                    <q-item-label>Balance :</q-item-label>
                    <q-item-label class="text-caption text-weight-small"> {{ boarder.balance }} </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator />
              <q-card-actions align="between">
                <q-btn color="indigo" flat label="more info" />
                <q-btn @click="payment (boarder.id)" color="indigo" flat label="payment" />
              </q-card-actions>
            </q-card-section>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import VacancyKnob from '../BoardersPage/VacancyKnob'
import PaidBoardersKnob from '../BoardersPage/PaidBoardersKnob'

export default {
  props: [
    'userId'
  ],
  created () {
    console.log(this.userId)
    this.$store.dispatch(
      'firestore/retrieveSingleHouse',
      this.userId
    )
    this.$store.dispatch(
      'firestore/retrieveSingleBoarder',
      'dummy id'
    )
    this.$store.dispatch(
      'firestore/retrieveAvailableRoom',
      this.userId
    )
    this.$store.dispatch(
      'firestore/retrieveHouseBoarders',
      this.userId
    )
    this.$store.dispatch(
      'firestore/retrievePaidBoarders',
      this.userId
    )
    this.$store.dispatch(
      'firestore/retrieveVacancy',
      this.userId
    )
    this.$store.dispatch(
      'firestore/retrieveHouseId',
      this.userId
    )
    this.$store.dispatch(
      'firestore/retrieveDueDate',
      this.userId
    )
    for (var house in this.singleHouse) {
      this.room = this.singleHouse[house].available_room
      var calendar = new Date()
      var month = calendar.getMonth() + 1
      if (month <= 9) {
        month = '0' + month
      }
      var day = calendar.getDate()
      if (day <= 9) {
        day = '0' + day
      }
      var year = calendar.getFullYear()
      var now = year + '/' + month + '/' + day
      console.log(now)
      var boarders = this.boardersCount
      var boarders2 = this.boardersCount

      this.occupiedRooms = this.boardersCount / this.availableRoom * 100
    }

    for (var boarder in this.boarders) {
      var id = this.boarders[boarder].id
      var balance = this.boarders[boarder].balance
      var rent = this.boarders[boarder].rent
      var status = this.boarders[boarder].status
      // console.log(boarders)

      if (status === 'unpaid') {
        boarders = boarders - 1
        this.paidBoarders = boarders
      }
      this.paidPercentage = boarders / boarders2 * 100
      if (this.dueDate === now) {
        this.$store.dispatch(
          'firestore/updateDueDate', {
            date: null,
            id: this.houseId
          }
        )
        this.date = true
        if (status === 'unpaid') {
          balance = Number(rent) + balance
          console.log(balance)
        }
        if (status === 'paid') {
          status = 'unpaid'
          console.log(status)
        }

        this.$store.dispatch(
          'firestore/updateBalance', {
            id: id,
            balance: balance,
            status: status
          }
        )
      }
    }
  },
  name: 'UserBoardersPage',
  data () {
    return {
      // now: '',
      occupiedRooms: 0,
      numberOfRooms: 0,
      paidPercentage: 0,
      paymentId: '',
      paidBoarders: 0,
      date: false,
      dialog: false,
      maximizedToggle: true,
      knobVal: 33,
      knob: 60,
      text: '',
      prompt: false
    }
  },
  computed: {
    boarders: {
      set (val) {
        this.$store.commit(
          'firestore/setBoarders',
          val
        )
      },
      get () {
        return this.$store.state.firestore.boarders
      }
    },
    singleHouse () {
      return this.$store.state.firestore.singleHouse
    },
    houseId () {
      return this.$store.state.firestore.houseId
    },
    availableRoom () {
      return this.$store.state.firestore.available_room
    },
    boardersCount () {
      return this.$store.state.firestore.numberOfBoarders
    },
    dueDate: {
      set (val) {
        this.$store.commit(
          'firestore/setDueDate',
          val
        )
      },
      get () {
        return this.$store.state.firestore.due_date
      }
    }
  },
  methods: {
    payment (id) {
      this.$router.push({ path: `/boarders/${id}/payment` })
    },
    addBoarder () {
      this.$router.push({ path: `/addBoarder` })
    },
    addDueDate () {
      console.log(this.houseId, this.dueDate)
      this.$store.dispatch(
        'firestore/updateDueDate', {
          id: this.houseId,
          date: this.dueDate
        }
      )
      this.date = false
    }
  },
  components: {
    VacancyKnob,
    PaidBoardersKnob
  }
}
</script>
