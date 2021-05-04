<template>
  <div>
    <!--suppress HtmlUnknownBooleanAttribute -->
    <b-container fluid>
      <EditableDiv identity="hardyAdap-1"></EditableDiv>
      <div id="podBox">
        <EditableDiv identity="hardyAdap-2"></EditableDiv>
        <audio src="" controls class="w-75"></audio>
      </div>
      <b-row>
        <b-col>
          <EditableDiv identity="hardyBiog"></EditableDiv>
        </b-col>
        <b-col>
          <b-img fluid :src="require('../assets/welc-caro/trollope-portrait.jpg')"></b-img>
          <EditableDiv identity="hardyWessex"></EditableDiv>
        </b-col>
      </b-row>
      <b-row>
        <EditableDiv identity="hardyAdap-4"></EditableDiv>
      </b-row>
      <b-row>
        <EditableDiv identity="hardyAdap-5"></EditableDiv>
      </b-row>
    </b-container>

  </div>

</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: "Projects",
  components: {EditableDiv}
}
</script>

<style lang="scss">
@import "src/assets/livery";

#podBox {
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
}

img {
  margin: 1em;
}
</style>
