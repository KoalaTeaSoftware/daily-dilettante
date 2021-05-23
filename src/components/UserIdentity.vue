Depends on >npm install --save auth firebaseui vue-router

It will change the auth user, to take notice of that fact, it will be necessary to set up watchers that do whatever is important

<template>
  <b-modal id="identify" title="Please sign-in, or sign-up">
    <div id="firebaseui-auth-container"></div>
  </b-modal>
</template>

<script>
import 'firebaseui/dist/firebaseui.css'; // otherwise it looks crap
import * as firebaseui from "firebaseui" // all the interactivity

import firebase from "firebase/app"; // have to have this before you ask for the auth bit
import "firebase/auth"; // have to have the auth bit because this is handling sign-in and out

export default {
  name: "UserIdentity",
  data() {
    return {
      address: null
    }
  },
  methods: {
    logIn() {
      console.log("Showing the identity modal")
      this.$bvModal.show('identify')
      // the form inside this may result in a change of the user identity.
      // This will be handled by someone who has set an watch on it
    },
    logOut() {
      console.log("Logging Out")
      firebase.auth().signOut()
    },
    hide() {
      this.$bvModal.hide('identify')
    }
  },
  computed: {
    amEditor: function () {
      return false
    },
    amSignedIn: function () {
      console.log(`[amSignedIn] : ${this.address !== null}`)
      return this.address !== null
    }
  },
  mounted() {
    // noinspection JSUnusedLocalSymbols
    const firebaseUiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Prevent any change of the browser's location
          return true;
        },
        uiShown: () => {
          // document.getElementById('loader').style.display = 'none';
        },
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      // Your terms of service url.
      tosUrl: 'policies',
      // Your privacy policy url.
      privacyPolicyUrl: 'policies',
    }

    // Initialize the Firebase UI mechanism
    const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

    // When the app is mounted, watch the _identity_ modal and start up the login.
    // This is necessary because this sort of modal does not even exist in the DOM until it is needed.
    // Therefore, until the modal is drawn, the div that is to contain the Google shite does not exist.
    this.$root.$on('bv::modal::shown', (bvEvent, modalID) => {
      if (modalID === "identify") {
        console.log('Going to show the identity modal', bvEvent, modalID)
        firebaseUI.start('#firebaseui-auth-container', firebaseUiConfig)
      }
    })
  }
}
</script>

<style scoped>
</style>
