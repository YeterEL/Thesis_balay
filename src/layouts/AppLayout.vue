<template>
  <q-layout view="hHh Lpr fFf">
    <q-header
      v-if="$route.path == '/'"
      bordered
      class="bg-white text-indigo"
    >
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title class="text-h6 text-weight-bold">
          Balay
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-header
      v-else
      bordered
      class="bg-white text-indigo"
    >
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.go(-1)"
        />
        <q-toolbar-title class="text-h6 text-weight-bold">
          BALAY
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- registered user drawer -->
    <q-drawer
      v-model="leftDrawer"
      :width="200"
      side="left"
      bordered
      v-if="authStatus"
    >
      <q-list>
        <q-item>
          <q-item-section class="row justify-center q-pa-md">
            <div class="column items-center">
              <q-item-section avatar>
                <q-icon
                  color="indigo"
                  size="60px"
                  name="account_circle"
                ></q-icon>
              </q-item-section>
              <q-item-label class="text-indigo q-mt-sm q-mr-md"> {{ uname }} </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="dashboard"
            ></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>Manage Boarders</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="house"
            ></q-icon>
          </q-item-section>
          <q-item-section @click="housePage (userId)">
            <q-item-label>Manage House</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="settings_applications"
            ></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>Acount Settings</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="help"
            ></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>About App</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item class="q-mt-sm">
          <q-item-section avatar>
            <q-icon
              color="red"
              name="exit_to_app"
            ></q-icon>
          </q-item-section>
          <q-item-section @click="logoutUser">
            <q-item-label>Log out</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

      </q-list>
    </q-drawer>
    <!-- guess user drawer -->
    <q-drawer
      v-model="leftDrawer"
      :width="200"
      side="left"
      bordered
      v-if="authStatus == null"
    >
      <q-list>
        <q-item>
          <q-item-section class="row justify-center q-pa-md">
            <div class="column items-center">
              <q-item-section avatar>
                <q-icon
                  color="indigo"
                  size="60px"
                  name="account_circle"
                ></q-icon>
              </q-item-section>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item>
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="person"
            ></q-icon>
          </q-item-section>
          <q-item-section @click="loginPage">
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item>
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="person_add"
            ></q-icon>
          </q-item-section>
          <q-item-section @click="registerPage">
            <q-item-label>Register</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item>
          <q-item-section avatar>
            <q-icon
              color="indigo"
              name="help_outline"
            ></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>About App</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      authStatus: null,
      leftDrawer: false,
      userId: ''
    }
  },
  async created () {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.authStatus = user
        this.userId = user.uid
        this.uname = user.displayName
      }
    })
  },
  methods: {
    housePage (id) {
      console.log(this.userId)
      this.$router.push({ path: `/${id}` })
    },
    registerPage () {
      this.$router.push({ path: `/register` })
    },
    loginPage () {
      this.$router.push({ path: `/login` })
    },
    logoutUser () {
      this.$store.dispatch('firestore/logoutUser')
      this.$router.go()
    }
  }
}
</script>
