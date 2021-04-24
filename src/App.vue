<template>
  <b-container fluid id="app">
    <div id="banner-box">
      <b-row id="banner">
        <b-col cols lg="1" md="2">
          <img src="@/assets/logo200.gif" class="img-fluid" alt="The Daily Dilettante logo">
        </b-col>
        <b-col>
          <p id="title">The Daily Dilettante</p>
          <p id="log-line">
            <img src="@/assets/yorkshire-rose.gif" alt="a Yorkshire rose" class="img-fluid">
            Bringing you entertainment since 1720
            <img src="@/assets/yorkshire-rose.gif" alt="a Yorkshire rose" class="img-fluid">
          </p>
          <b-navbar toggleable="sm">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav fill>
                <b-nav-item :active='$route.name ==="Welcome"' to="/">Welcome</b-nav-item>
                <b-nav-item :active='$route.name ==="Novels"' to="/novels">Period Novels & their films</b-nav-item>
                <b-nav-item :active='$route.name ==="Adaptations"' to="/adaptations">Our Adaptations</b-nav-item>
                <b-nav-item :active='$route.name ==="About"' to="/about">About</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-col>
        <b-col cols lg="1" md="2">
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
            <b-nav-item-dropdown dropup>
              <!-- Using 'button-content' slot -->
              <template #button-content>User</template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
$colour-page-background: #E0fff0; /* eau de nil */
$colour-banner-background: #660000; /* dark maroon / dark cherry */
$colour-dark-text: #006666; /* dark turquoise */
$colour-body-text: black;

$margin-furniture: 0.5rem;
$pin-stripe-width: 1px;
$pin-stripe-style: solid;

@font-face {
  font-family: 'dominica';
  src: url('/assets/DOMINICA.eot');
  src: url('/assets/DOMINICA.woff') format('woff'), /* Modern Browsers */
  url('/assets/DOMINICA.woff2') format('woff2'), /* Modern Browsers */
  url('assets/DOMINICA.TTF') format('truetype'); /* Safari, Android, iOS */
}

.row {
  /* the b-row element all have a -15px margin. This causes Chrome to make the page a little wider than it is */
  margin: 0 !important;
}

body {
  background-color: $colour-page-background !important;
}

#app {
  padding: 0; /* despite being fluid, it is given some padding */
}

#banner-box {
  background-color: $colour-banner-background;
  color: $colour-page-background;
  padding-top: $margin-furniture;
  padding-bottom: $margin-furniture;

  #banner {
    font-family: dominica, "Times New Roman", Times, serif;
    padding: 4px 0;
    border-color: $colour-page-background;
    border-top: $pin-stripe-width $pin-stripe-style;
    border-bottom: $pin-stripe-width $pin-stripe-style;
    text-align: center;
    display: flex !important;
    align-items: center;

    img {
      padding-top: $margin-furniture;
      padding-left: $margin-furniture;
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
      font-size: 2em;
      line-height: 1.1em;

      img {
        position: unset;
        height: auto;
        width: auto;
        margin: auto;
        max-height: .75em;
      }
    }

    nav {
      font-size: 1.5em;
      padding: 0;
      text-align: center;
      line-height: 1em;

      a {
        font-weight: bold;
        color: $colour-page-background;
      }

      .nav-item > a {
        color: $colour-page-background !important;
      }

      .nav-item > a.active {
        text-decoration: underline;
        font-style: inherit;
      }

      #nav-collapse > ul {
        width: 100%; /* I don't know why, but the UL making the list is not, of itself, being full width */
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
  padding-bottom: 3em; /* exceed the height of the footer */

  h1 {
    font-family: dominica, "Times New Roman", Times, serif;
    text-shadow: 5px 5px 10px darkgray;
  }

  a {
    color: $colour-dark-text;
    font-style: italic;
  }

  img {
    border-radius: 5px;
    box-shadow: 5px 5px 10px darkgray;
  }
}

#footer-box {
  font-family: dominica, "Times New Roman", Times, serif;
  background-color: $colour-banner-background;

  #footer {
    border-top: $pin-stripe-width $pin-stripe-style $colour-page-background;
    margin-top: $margin-furniture;

    nav {
      margin-top: 0;
      margin-bottom: 0;
      padding-right: 3em; /* give room for the user drop-up to show*/
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
        /* these have to show up again a light background */
        color: $colour-banner-background;
      }
    }
  }
}
</style>
