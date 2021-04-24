<template>
  <div id="app">
    <div id="banner-box">
      <div id="banner">
        <!--suppress HtmlUnknownAttribute  'fluid' -->
        <img src="@/assets/logo200.gif" fluid alt="The Daily Dilettante logo">
        <p>The Daily Dilettante</p>
        <b-navbar toggleable="sm">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav align="center">
              <b-nav-item :active='$route.name ==="Welcome"' to="/">Welcome</b-nav-item>
              <b-nav-item :active='$route.name ==="About"' to="/about">About</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div id="contents">
      <router-view/>
    </div>
    <div id="footer-box" class="fixed-bottom">
      <div id="footer">
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
      </div>
    </div>
  </div>
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

body {
  background-color: $colour-page-background !important;
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


    p {
      font-size: 6em;
      font-weight: bold;
      text-align: center;
      margin: 0;
      padding-left: 8rem; /* so it does not get obscured by the logo */
      padding-right: 8rem; /* to balance the left padding*/
      line-height: 1.1em;
    }

    img {
      position: absolute;
      top: 1em;
      left: .75em;
      height: 8em;
    }

    nav {
      font-size: 2em;
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
        margin: auto;
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
  padding-bottom: 3em; /* exceed the height of the footer */
  a {
    color: $colour-dark-text;
    font-style: italic;
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
