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
              <b-nav-item-dropdown>
                <!-- Using 'button-content' slot -->
                <template #button-content>Account</template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <router-view/>
    <div id="footer">
      <b-container fluid class="p-4 bg-dark">
        <b-row>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<style lang="scss">
$col-page-background: #E0fff0; /* eau de nil */
$col-text: #006666; /* dark turquoise */
$col-banner-background: #660000; /* dark maroon / dark cherry */

@font-face {
  font-family: 'dominica';
  src: url('/assets/DOMINICA.eot');
  src: url('/assets/DOMINICA.woff') format('woff'), /* Modern Browsers */
  url('/assets/DOMINICA.woff2') format('woff2'), /* Modern Browsers */
  url('assets/DOMINICA.TTF') format('truetype'); /* Safari, Android, iOS */
}

body {
  background-color: $col-page-background !important;
}

#banner-box {
  background-color: $col-banner-background;
  color: $col-page-background;
  padding-top: .5em;
  padding-bottom: .5em;

  #banner {
    font-family: dominica, "Times New Roman", Times, serif;
    padding: 4px 0;
    border-color: $col-page-background;
    border-top-style: solid;
    border-top-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;


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
        color: $col-page-background;
      }

      //noinspection CssInvalidHtmlTagReference
      .dropdown-item {
        color: $col-banner-background !important;
      }

      .nav-item > a {
        color: $col-page-background !important;
      }

      .nav-item > a.active {
        text-decoration: underline;
        font-style: inherit;
      }

      .dropdown-toggle::after { /*this is responsible for the arrow you see in the button*/
        display: none;
      }

      #nav-collapse > ul {
        margin: auto;
      }
    }
  }
}

#app {
  font-family: "Times New Roman", Times, serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
