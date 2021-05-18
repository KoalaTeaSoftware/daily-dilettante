Notice that the v-html attribute of the article text does not start with a colon (like you might expect)

<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <b-container fluid>
    <b-row>
      <b-col>
        <EditableDiv identity="novels-1"></EditableDiv>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <TumblrBlock trimLength=0 redirect-location="" id="blog-roll" blogType="article"></TumblrBlock>
      </b-col>
      <b-col>
        <TumblrBlock trimLength=0 redirect-location="" id="vid-roll" blogType="video"></TumblrBlock>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";
import TumblrBlock from "@/components/TumblrBlock";

export default {
  name: 'Novels',
  components: {TumblrBlock, EditableDiv},
  data() {
    return {
      videos: [
        {vidSrc: "https://www.youtube.com/embed/5O4Y9TbyEag"},
        {vidSrc: "https://www.youtube.com/embed/99Hly9Cr8Q4"},
        {vidSrc: "https://www.youtube.com/embed/9puKSBPY_cg"},
        {vidSrc: "https://www.youtube.com/embed/GypebgAtyuY"}
      ]
    }
  }
}
</script>

<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/livery";

#blog-roll {
  .article-img {
    margin-right: 1.75em;
    margin-bottom: 1.5em;
    float: left;
  }

  .article-text {
    text-align: left;
  }
}

#vid-roll {
  //noinspection SassScssResolvedByNameOnly
  .vid-viewer {
    border-radius: 5px;
    box-shadow: 5px 5px 10px $colour-body-text-shadow;
    margin-bottom: 1em;
    border: 0;
  }
}
</style>
