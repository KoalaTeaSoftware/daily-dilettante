<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <b-container fluid id="app">
    <div id="banner-box">
      <b-row id="banner">
        <!--suppress HtmlUnknownBooleanAttribute -->
        <b-col cols lg="2" md="3">
          <!--suppress HtmlUnknownTarget -->
          <img src="/assets/logo200.gif" class="img-fluid" alt="The Daily Dilettante logo">
        </b-col>
        <b-col>
          <p id="title">The Daily Dilettante</p>
          <b-row id="log-line">
            <b-col cols="1">&nbsp;</b-col>
            <b-col cols="2">
              <!--suppress HtmlUnknownTarget -->
              <img src="/assets/medallion.png" alt="a medallion" class="img-fluid" style="padding-right: 0;">
            </b-col>
            <b-col>
              Bringing you entertainment since 1720
            </b-col>
            <b-col cols="2">
              <!--suppress HtmlUnknownTarget -->
              <img src="/assets/medallion.png" alt="a medallion" class="img-fluid" style="padding-left: 0;">
            </b-col>
            <b-col cols="1">&nbsp;</b-col>
          </b-row>
          <b-navbar toggleable="sm">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav fill>
                <b-nav-item :active='$route.name ==="Welcome"' to="/">Welcome</b-nav-item>
                <b-nav-item :active='$route.name ==="Novels"' to="/novels">Period Novels & their Films</b-nav-item>

                <b-nav-item-dropdown
                    id="my-nav-dropdown"
                    text="Story Worlds"
                    toggle-class="nav-link-custom"
                    right
                >
                  <b-dropdown-item :active='$route.name === "WessexPodcasts"' to="/storyworlds/wessex/podcasts">Hardy's
                    Wessex Podcasts
                  </b-dropdown-item>
                  <b-dropdown-item :active='$route.name === "WessexFeatures"' to="/storyworlds/wessex/features">Hardy's
                    Wessex Feature Films
                  </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item :active='$route.name ==="About"' to="/about">About</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-col>
        <!--suppress HtmlUnknownBooleanAttribute -->
        <b-col cols lg="2" md="3">
          &nbsp;
        </b-col>
      </b-row>
    </div>
    <b-row id="contents">
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
    <b-row id="footer-box" class="fixed-bottom">
      <b-col id="footer">
        <b-navbar>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :active='$route.name ==="Policies"' to="/policies">Policies</b-nav-item>
            <b-nav-item :active='$route.name ==="Contact"' to="/contact">Contact</b-nav-item>
            <div v-if="amLoggedIn">
              <b-nav-item-dropdown dropup>
                <!-- Using 'button-content' slot -->
                <template #button-content>My Account</template> <!-- {{ userData.displayName }} -->
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="$refs.identityComponent.logOut()">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </div>
            <div v-else>
              <b-nav-item @click="$refs.identityComponent.logIn()">Sign-in</b-nav-item>
            </div>
          </b-navbar-nav>
        </b-navbar>
      </b-col>
    </b-row>
    <UserIdentity ref="identityComponent"></UserIdentity>
  </b-container>
</template>

<style lang="scss">
@import "/assets/livery";

.row {
  /* the b-row element all have a -15px margin. This causes Chrome to make the page a little wider than it is */
  margin: 0 !important;
}

body {
  background-color: $colour-page-background !important;
  //noinspection CssUnknownTarget
  background-image: url("/assets/paper.webp");
  background-repeat: repeat;
}

#app {
  padding: 0; /* despite being fluid, Bootstrap(?) gives it some padding, so it needs to be told not to */
}

#banner-box {
  background-color: $colour-banner-background;
  color: $colour-banner-primary-text;
  padding-top: $margin-furniture;
  padding-bottom: $margin-furniture;

  #banner {
    font-family: branded-font, "Times New Roman", Times, serif;
    padding: 4px 0;
    border-color: $colour-page-background;
    border-top: $pin-stripe-width $pin-stripe-style;
    border-bottom: $pin-stripe-width $pin-stripe-style;
    text-align: center;
    display: flex !important;
    align-items: center;

    img {
      //padding-top: $margin-furniture;
      //padding-left: $margin-furniture;
      padding: 0;
      max-height: 9em;
    }

    #title {
      /* With zero padding given to the col that contains this, 5em seems to give 1 line on the iPad */
      font-size: 5em;
      font-weight: bold;
      text-align: center;
      margin: 0;
      line-height: 1em;
    }

    #log-line {
      font-size: 1.5em;
      line-height: 1.1em;
      color: $colour-banner-secondary-text;

      img {
        position: unset;
        width: auto;
        margin: auto;
        height: 1.25em;
      }
    }

    .navbar-toggler {
      border-color: $colour-page-background;

      .navbar-toggler-icon {
        background-image: url("/assets/hamburger.svg");
      }
    }

    nav {
      font-size: 1.5em;
      padding: 0;
      text-align: center;
      line-height: 1em;

      .nav-link, .dropdown-item, {
        color: $colour-page-background !important;
        background-color: $colour-banner-background;
        padding-bottom: 0;
      }

      .nav-link.active, .dropdown-item.active {
        text-decoration: underline;
        font-style: inherit;
      }


      .dropdown-menu {
        background-color: $colour-banner-background;
        border-color: $colour-page-background;
        margin: 0.25rem;
        padding: 0.25rem;
      }

      .dropdown-item {
        font-size: 1.5em; /* matching the rest of the menu */
        padding-top: 0.5rem;
        padding-bottom: 0.5rem !important;
      }

      .dropdown-item:hover {
        color: $colour-banner-background !important;
        background-color: $colour-page-background !important;
      }

      /* I don't know why, but the UL making the list is not, of itself, being full width */
      #nav-collapse > ul {
        width: 100%;
      }
    }
  }
}

#contents {
  font-family: "Times New Roman", Times, serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $colour-body-text;
  padding-top: .75em; /* just to make it look a bit bitter */
  padding-bottom: 5em; /* exceed the height of the footer */

  h1, h2, h3, h4 {
    font-family: branded-font, "Times New Roman", Times, serif;
    text-align: center;
  }

  h4 {
    text-align: left;
  }

  a {
    color: $colour-body-text;
    font-style: italic;
    font-weight: bold;
  }

  img, iframe, audio {
    border-radius: 5px;
    box-shadow: 5px 5px 10px $colour-body-text-shadow;
  }

  /* As the inner is tightly around its images, you will not be able to see the shadow tht the image has.
   * Therefore give the inner (not the image) the attributes that provide the shadow */
  .carousel-inner {
    border-radius: 5px;
    box-shadow: 5px 5px 10px $colour-body-text-shadow;
    /* This also means that we have to prevent the image in the carousel from having the shadow (otherwise it can look wrong) */
    img {
      margin: 0;
      box-shadow: none;
    }
  }

  .ext-link::after {
    content: "\1F5D7";
    display: inline-block;
    vertical-align: super;
    width: .75em;
    height: .75em;
    margin-left: 0.5em;
  }
}

#footer-box {
  font-family: branded-font, "Times New Roman", Times, serif;
  background-color: $colour-banner-background;

  #footer {
    border-top: $pin-stripe-width $pin-stripe-style $colour-page-background;
    margin-top: $margin-furniture;

    nav {
      margin-top: 0;
      margin-bottom: 0;
      padding-right: 3em; /* give room for the user drop-up to showIdModal*/
      padding-top: 0; /* these two are good for making the footer take up less vertical space*/
      padding-bottom: 0;

      //noinspection CssUnusedSymbol
      .dropdown-toggle::after {
        /* this is responsible for the arrow you see in the button. It looks 'modern', so hide it */
        display: none;
      }

      //noinspection CssUnusedSymbol
      .nav-link {
        /* These make it possible for the footer's menu to take up less vertical space*/
        margin-top: 0;
        margin-bottom: 0;
      }

      a {
        color: $colour-page-background;
      }

      //noinspection CssUnusedSymbol
      .dropdown-item {
        /* these have to showIdModal up again a light background */
        color: $colour-banner-background;
      }
    }
  }
}
</style>

<script>
import firebase from "firebase/app"; // needed by the immediately following items
import UserIdentity from "@/components/UserIdentity"; // The stuff that allow a user to log in

// import {BootstrapVue, IconsPlugin} from 'bootstrap-vue' // so as to be able to use the bootstrap-vue stuff
import {BootstrapVue} from 'bootstrap-vue' // so as to be able to use the bootstrap-vue stuff

import Vue from "vue"; // so that the following statement means something to someone
Vue.use(BootstrapVue) // hast be used, otherwise the b-... objects don't get defined properly

export default {
  components: {UserIdentity},
  data() {
    return {
      userData: null
    }
  },
  computed: {
    amLoggedIn() {
      console.log(`[amLoggedIn?]: ${this.userData !== null}`)
      return (this.userData !== null)
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(`User is now ${JSON.stringify(user)}`)
        this.userData = user
        // use this if there were any different pages when the user is logged in
        // this.$router.push('/success')
      } else {
        console.log(`User is now undefined`)
        this.userData = null
        // this.$router.push('/auth')
      }
    });
  }
}
</script>
