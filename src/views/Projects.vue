<template>
  <div>
    <EditableDiv identity="hardyAdap-1"></EditableDiv>
    <div id="podBox">
      <EditableDiv identity="hardyAdap-2"></EditableDiv>
      <audio src="" controls class="w-75"></audio>
    </div>
    <EditableDiv identity="hardyAdap-3"></EditableDiv>
    <EditableDiv identity="hardyAdap-4"></EditableDiv>
    <EditableDiv identity="hardyAdap-5"></EditableDiv>
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

td {
  // a table is used in the markup to give you two columns
  // this is thought to be simpler for the user to handle than writing more conventional set-up tags
  // this makes it look a little more pretty
  padding: 1.5em;
}

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
</style>
