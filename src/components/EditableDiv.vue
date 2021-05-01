This component uses a 'identity' _Property_ that gives the div (that wraps it) an HTML ID attribute. This could be used by CSS.
It depends on previous, external setting-up of the Firebase firestore stuff.
It depends on a firestore collection called pages. Each item in that collection must have:
1) A string attribute called pageName which must match to the identity property's value
2) A string attribute called contents

ToDo: Currently, it is not clever enough to create a page if it does not already exist

The VueShowdown component is detailed in various places
* https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax
* https://vue-showdown.js.org/

NOTE: Anyone that is logged-in will be able to edit, therefore use the Firebase console to ensure that only editors
have credentials that allow them log in

The markDownPanel that the user sees within the page takes in MarkDown and interprets it as HTML. The user journey is:
* double-click the div - gives a pop-up
* edit the markdown
* click preview - you see what it **will** look like to the world
* If you like it
* Double-click it again -> the popup again
* Click the publish button
* If you don't like ti, just refresh the page

<template>
  <div :id="this.identity" @dblclick="editMe">
    <b-spinner small v-show="busy" class="loadingSpinner"></b-spinner>
    <span class="sr-only" v-show="busy">Loading...</span>
    <markDownPanel
        class="container"
        flavor="github"
        :options="{ emoji: false, tasklists : true }"
        :markdown=this.displayVersion
        style="text-align: left"
    />
    <b-modal :id="this.identity + '-editor'" size="xl" title="Editing the panel">
      <div v-show="this.serverError" class="bg-warning">{{ serverError }}</div>
      <pre :id="this.identity + '-markdown-area'" contenteditable="true">{{ trialVersion }}</pre>
      <template #modal-footer="{ ok, cancel }">
        <b-button size="lg" variant="outline-primary" @click="preview()">Preview</b-button>
        <b-button size="sm" variant="warning" @click="publish()">Publish</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase";
import {VueShowdown} from 'vue-showdown';

export default {
  props: {identity: String},
  components: {'markDownPanel': VueShowdown},
  data() {
    return {
      busy: true,
      // currentUser: null,
      displayVersion: "", // this is read from the store, shown on the screen and initialised the edit panel
      trialVersion: "Loading ....", // this is what is in the edit panel, directly editable by the user
      docId: null, // shared between the reading and writing actions
      serverError: "",
      modalId: this.identity + '-editor',
      editPanelId: this.identity + '-markdown-area'
    }
  },
  methods: {
    preview() {
      /* This takes the MD from the editing panel and places it into the panel that the user sees
       * It is NOT making the changes permanent
       */
      const editBlock = document.getElementById(this.identity + '-markdown-area')
      this.displayVersion = editBlock.innerText // remember, this component automatically translates what the user ees into HTML
      this.$bvModal.hide(this.modalId)
    },
    publish() {
      /*
       * This takes the markdown (that looks like HTML to the user) and places it into the Firebase store,
       * making the change permanent
       */
      this.busy = true
      firebase.firestore()
          .collection("pages")
          .doc(this.docId)
          .update({contents: this.displayVersion})
          .then(() => {
            this.busy = false
            console.log("Document Saved")
            this.$bvModal.hide(this.modalId)
          })
          .catch(e => {
            this.busy = false
            this.serverError = e.message
            console.log("Unable to store the new data for page " + this.identity + ":" + e.message + ".");
          })
    },
    editMe() {
      if (firebase.auth().currentUser) {
        this.trialVersion = this.displayVersion.slice(0) // deep copy from shown to the editor
        this.$bvModal.show(this.modalId)
      } else
        alert("You can't edit me")
    }
  },
  mounted() {
    if (firebase.auth().currentUser) {
      // This has to be done the hard way because we are in the 'mounted' function.
      // If you make the presence of the class conditional (in the template) on an exported attribute,
      // you make it remount and get a stack overflow
      console.log(`Element ${this.identity} is editable`)
      document.getElementById(this.identity).classList.add('isEditable')
    }
    console.log(`Going to try to get page ${this.identity}`)
    firebase.firestore()
        .collection("pages")
        .where("pageName", "==", this.identity)
        .get()
        .then(querySnapshot => {
          this.busy = false
          this.displayVersion = querySnapshot.docs[0].data().contents
          this.docId = querySnapshot.docs[0].id
          this.trialVersion = this.displayVersion
        })
        .catch(function (e) {
          console.log(`Unable to get, or show the page: ${e.message}.`);
        })
  }
}
</script>

<style scoped>
/* noinspection CssUnknownTarget, CssUnusedSymbol */
.isEditable {
  background-image: url("/assets/pencil.svg");
  background-repeat: no-repeat;
  background-size: .75em;
  background-position: .5rem .5rem;
  border-style: dotted;
  border-width: 2px;
  border-color: #5AB59B;
}

h1 {
  text-transform: capitalize
}

pre {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  /*   white-space: -pre-wrap; Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

</style>
