<template>
  <b-container fluid class="welcome">
    <b-row>
      <b-col><h1>Welcome</h1></b-col>
    </b-row>
    <b-row style="display: flex !important; align-items: center;">
      <b-col>
        <b-carousel id="welc-caro" fade class="m-auto">
          <b-carousel-slide
              :img-src="require('../assets/welc-caro/silverville-principle-women.jpg')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('../assets/welc-caro/thackeray-books.jpg')"></b-carousel-slide>
          <b-carousel-slide
              :img-src="require('../assets/welc-caro/Maria_Edgeworth_by_John_Downman_1807.jpg')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('../assets/welc-caro/trollope-books.jpg')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('../assets/welc-caro/trollope-portrait.jpg')"></b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col>
        <ul>
          <li>We fill an need for stories set in the Britain of the 19th century, and lat 18th century that are
            dramatised
            in costumer and characteristic colour
          </li>
          <li>You get ...</li>
        </ul>
      </b-col>
      <b-col>
        <ul>
          <li>We make adaptations of original old British novels for podcasts, websites, and then, feature films. We
            will run period balls to celebrate our premieres, and to distribute our films. We will provide here and on
            social media, an ongoing period drama competition and an 18th century cooking exploration
          </li>
          <li>Unlike other period story / fil sites, you can join in with us, from entering into competitions, through
            acting / helping in our podcasts to dressing up and dancing at our balls.
          </li>
        </ul>
      </b-col>
      <b-col id="blog-viewer">
        <b-img :src="require('../assets/welc-caro/trollope-portrait.jpg')" class="m-auto"></b-img>
        <h2>Some old guff</h2>
        <p>Pellentesque euismod sem tortor, quis mattis neque imperdiet ut. Maecenas eleifend est in semper solli
          <b-link to="/blog"> more ...</b-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
/* As the inner is tightly around the image, you will not be able to see the inherited shadow. Therefore put it in here too*/
.carousel-inner {
  border-radius: 5px;
  box-shadow: 5px 5px 10px darkgray;
}

#blog-viewer {
  margin: auto;

  img {
    width: 100%; /* Force the image to be sized by the column width, not from the source */
  }
}
</style>

<script>
export default {
  name: 'Welcome'
}
</script>
