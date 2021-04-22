<template>
  <div id="app">
    <div id="banner">
      <!--suppress HtmlUnknownAttribute  'fluid' -->
      <img src="@/assets/logo200.gif" fluid alt="The Daily Dilettante logo">
      <p>The Daily Dilettante</p>
      <b-navbar toggleable="sm">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav align="center">
            <b-nav-item :active='$route.name ==="Home"' to="/">Home</b-nav-item>
            <b-nav-item :active='$route.name ==="About"' to="/about">About</b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>Account</template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
$col-page-background: #E0FFF0; /* eau de nil */
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

#banner {
  background-color: $col-banner-background;
  color: $col-page-background;
  font-family: dominica, "Times New Roman", Times, serif;

  img {
    float: left;
    height: 2.5rem;
    padding-top: .25rem;
    padding-left: .25rem;
  }

  p {
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
  }

  nav {
    padding: 0;
    text-align: center;

    a {
      font-weight: bold;
      color: $col-page-background;
    }

    //noinspection CssInvalidHtmlTagReference
    b-dropdown-item {
      color: $col-banner-background !important;
    }
  }

  .nav-item > a {
    color: $col-page-background !important;
  }

  .nav-item > a.active {
    text-decoration: underline;
    font-style: inherit;
  }

  #nav-collapse > ul {
    margin: auto;
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
