<template>
  <div id="storyWorlds">
    <!--suppress HtmlUnknownBooleanAttribute -->
    <b-container fluid>
      <EditableDiv identity="hardyAdaptation-1"></EditableDiv>
      <div class="subProjectBox">
        <EditableDiv identity="hardyAdaptation-2"></EditableDiv>
        <audio  controls class="w-75">
          <source src="@/assets/dd-intro.mp3/" type="audio/mpeg">There's a surprise, your browser does not support the audio tag
        </audio>
      </div>
      <b-row>
        <b-col class="subProjectBox">
          <EditableDiv identity="hardyAdaptation-shorts"></EditableDiv>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <EditableDiv identity="hardyBiog"></EditableDiv>
        </b-col>
        <b-col>
          <b-img fluid :src="require('../assets/thomas-hardy.jpg')"></b-img>
          <EditableDiv identity="hardyWessex"></EditableDiv>
        </b-col>
      </b-row>
      <b-row>
        <EditableDiv identity="hardyAdaptation-4"></EditableDiv>
      </b-row>
      <b-row>
        <EditableDiv identity="hardyAdaptation-5"></EditableDiv>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: "StoryWorlds",
  components: {EditableDiv}
}
</script>

<style lang="scss">
@import "src/assets/livery";

#storyWorlds {
  .subProjectBox {
    background-color: $colour-banner-background;
    color: $colour-banner-primary-text;
    padding: $margin-furniture; // allows the margin around the child to be visible
    margin: 1em; // make it stand out

    p {
      font-family: branded-font, "Times New Roman", Times, serif;
      font-size: larger;
      text-align: center;
      margin: .5em; // force the lettering to be vertically tidy
    }

    a {
      color: $colour-banner-secondary-text;
    }
  }

  img {
    margin: 1em;
  }
}
</style>
