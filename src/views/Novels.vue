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
        <TumblrBlock trimLength="0" redirect-location="" id="blog-role"></TumblrBlock>
      </b-col>
      <b-col>
        <div id="vid-role" v-for="video in videos">
          <!--suppress SpellCheckingInspection -->
          <iframe
              class="vid-viewer"
              width="560" height="315"
              :src="video.vidSrc + '?showinfo=0&modestbranding=0'"
              title="A video from out channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
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

#blog-role {
  .article-img {
    margin-right: 1.75em;
    margin-bottom: 1.5em;
    float: left;
  }

  .article-text {
    text-align: left;
  }
}

#vid-role {
  .vid-viewer {
    border-radius: 5px;
    box-shadow: 5px 5px 10px $colour-body-text-shadow;
    margin-bottom: 1em;
    border: 0;
  }
}
</style>
