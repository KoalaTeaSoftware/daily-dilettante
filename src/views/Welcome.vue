<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <b-container fluid class="welcome">
    <b-row>
      <b-col><h1>Welcome</h1></b-col>
    </b-row>
    <b-row style="display: flex !important; align-items: center;">
      <b-col>
        <b-carousel id="welc-caro" fade class="m-auto">
          <b-carousel-slide v-for="pic in caroImgList"
                            :img-src="require('@/assets/welc-caro/' + pic)"></b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col style="text-align: center" class="mainText">
        <EditableDiv identity="welcome-1"></EditableDiv>
      </b-col>
      <b-col style="text-align: center" class="mainText">
        <EditableDiv identity="welcome-2"></EditableDiv>
      </b-col>
      <b-col id="blog-role">
        <b-img :src="require('../assets/welc-caro/trollope-portrait.jpg')" class="m-auto"></b-img>
        <h2>Some old guff</h2>
        <p>Pellentesque euismod sem tortor, quis mattis neque imperdiet ut. Maecenas eleifend est in semper solli
          <b-link id="more" to="/blog"> more ...</b-link>
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

.mainText P {
  text-align: center;
}

#blog-role {
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
  data() {
    return {
      caroImgList: [
        "silverville-principle-women.jpg",
        "thackeray-books.jpg",
        "Maria_Edgeworth_by_John_Downman_1807.jpg",
        "trollope-books.jpg",
        "trollope-portrait.jpg"
      ]
    }
  }
}
</script>
