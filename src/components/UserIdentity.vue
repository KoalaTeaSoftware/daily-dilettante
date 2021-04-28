Depends on >npm install --save firebase firebaseui vue-router

It will change the firebase user, to take notice of that fact, it will be necessary to set up watchers that do whatever is important

<template>
  <b-modal id="identify" title="Please sign-in, or sign-up">
    <div id="firebaseui-auth-container"></div>
  </b-modal>
</template>

<script>
import * as firebaseui from "firebaseui"
import 'firebaseui/dist/firebaseui.css';
import firebase from "firebase";

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
    // Initialize Firebase
    const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
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

    // When the app is mounted, watch the identity modal and start up the login.
    // This is necessary because the b-modal does not actually exist in the DOM until it is shown.
    // Therefore, until the modal is drawn, the div that is to contain the Google shite does not exist.
    this.$root.$on('bv::modal::shown', (bvEvent, modalID) => {
      console.log('Modal is about to be shown', bvEvent, modalID)
      firebaseUI.start('#firebaseui-auth-container', firebaseUiConfig)
    })
  }
}
</script>

<style scoped>

</style>
