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
      <b-col style="text-align: left">
        <EditableDiv identity="welcome-1"></EditableDiv>
      </b-col>
      <b-col>
        <EditableDiv identity="welcome-2"></EditableDiv>
      </b-col>
      <b-col id="blog-viewer">
        <b-img :src="require('../assets/welc-caro/trollope-portrait.jpg')" class="m-auto"></b-img>
        <h2>Some old guff</h2>
        <p>Pellentesque euismod sem tortor, quis mattis neque imperdiet ut. Maecenas eleifend est in semper solli
          <b-link id="more" to="/blog"></b-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
@import "src/assets/livery";

/* As the inner is tightly around the image, you will not be able to see the inherited shadow. Therefore put it in here too*/
.carousel-inner {
  border-radius: 5px;
  box-shadow: 5px 5px 10px $colour-body-text-shadow;
}

#blog-viewer {
  margin: auto;

  img {
    width: 100%; /* Force the image to be sized by the column width, not from the source */
  }

}
</style>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: 'Welcome',
  components: {EditableDiv},
}
</script>
