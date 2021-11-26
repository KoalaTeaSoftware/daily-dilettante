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

* Integration with Firebase
    * The editable divs are stored in Cloud Firestore
    * The rules are set at https://console.firebase.google.com/u/0/project/daily-dilettante/firestore/rules
        * At the moment, I match the email address, rather than a UID because, in the past, I have had to remove the
          auth entry, and create a new entity with this email address. In that case the UID changed, but I did not want
          the functionality fo the user with this email address to change.
