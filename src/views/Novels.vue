Notice that the v-html attribute of the article text does not start with a colon (like you might expect)

<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <b-container fluid id="novels">
    <b-row>
      <b-col>
        <EditableDiv identity="novels-1"></EditableDiv>
      </b-col>
    </b-row>
    <b-row id="rolls">
      <b-col>
        <TumblrBlock
            trimLength=0
            redirect-location="https://dailydilettante.tumblr.com/"
            id="blog-roll"
            blogType="article"
            maxNumPosts=3></TumblrBlock>
      </b-col>
      <b-col>
        <TumblrBlock
            trimLength=0
            redirect-location="https://dailydilettante.tumblr.com/"
            id="vid-roll"
            blogType="video"
            maxNumPosts=3></TumblrBlock>
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
      // videos: [
      //   {vidSrc: "https://www.youtube.com/embed/5O4Y9TbyEag"},
      //   {vidSrc: "https://www.youtube.com/embed/99Hly9Cr8Q4"},
      //   {vidSrc: "https://www.youtube.com/embed/9puKSBPY_cg"},
      //   {vidSrc: "https://www.youtube.com/embed/GypebgAtyuY"}
      // ]
    }
  }
}
</script>

<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/livery";

#rolls {
  .post {
    border-radius: 5px;
    box-shadow: 5px 5px 10px black;
    margin: .25em;

    .postHolder {
      padding: .25em;
    }
  }

  .more {
    font-size: 1.5em;
  }

  .postListTail {
    margin: 1em;
  }
}

#blog-roll {
  img {
    margin-right: 1.75em;
    margin-bottom: 1.5em;
    float: left;
  }

  .post {
    clear: both;
    border-top: #05423C solid thin;
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
