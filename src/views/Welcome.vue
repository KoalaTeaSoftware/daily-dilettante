<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <b-container fluid class="welcome">
    <b-row>
      <b-col>
        <h1>Welcome</h1>
        <EditableDiv identity="welcome-1"></EditableDiv>
      </b-col>
    </b-row>
    <b-row style="display: flex !important; align-items: center;">
      <b-col md="12" lg="4">
        <b-carousel id="welc-caro" fade class="m-auto" style="margin-bottom: 1em">
          <b-carousel-slide
              v-for="pic in caroImgList"
              :img-src="require('@/assets/welc-caro/' + pic)">
          </b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col md="12" lg="4" style="text-align: center; margin-top: 1em" class="mainText">
        <EditableDiv identity="welcome-2"></EditableDiv>
      </b-col>
      <b-col md="12" lg="4" id="blog-role">
        <TumblrBlock trimLength=500 redirect-location="/novels"></TumblrBlock>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
@import "src/assets/livery";

/* As the inner is tightly around the image, you will not be able to see the inherited shadow from app.vue.
 Therefore give the inner (not the image) the same attributes */
.carousel-inner {
  border-radius: 5px;
  box-shadow: 5px 5px 10px $colour-body-text-shadow;
  /* This also means that we have to prevent the image in the carousel from having the shadow (otherwise it can look wrong) */
  img {
    margin-top: 0;
    box-shadow: none;
  }
}

#welcome-1 {
  .editedContent {
    font-size: larger;
    font-weight: bolder;
    text-align: center !important;
  }
}

.mainText p {
  text-align: center;
}

#blog-role {
  margin: auto;

  img {
    //width: 100%; /* Force the image to be sized by the column width, not from the source */
    margin: 0.5em;
  }

}
</style>

<script>
import EditableDiv from "@/components/EditableDiv";
import TumblrBlock from "@/components/TumblrBlock";

export default {
  name: 'Welcome',
  components: {TumblrBlock, EditableDiv},
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
