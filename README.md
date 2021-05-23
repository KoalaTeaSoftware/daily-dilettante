# The Daily Dilettante

Notes on the construction of this site

* The background image
  * The aim is to try and make the site look like it is written on paper.
  * The actual file used is in public/assets (it is very static)
  * It was converted on-line from the fw.png in raw-assets/parchment
  * it is specified (to the browser) in App.vue > style

* Livery
  * this is specified in src/assets/livery.scss
  * this is then imported into most of the views (hence their style sections have to be land="scss")

* Secrets for the server-side functions
  * Needed for access to the mail server
  * These are collected in a config file that is prevented from appearing the public GitHub repo
