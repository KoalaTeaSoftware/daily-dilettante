Notice that the v-html attribute of the article text does not start with a colon (like you might expect)

<template>
  <b-container fluid class="confidentialPage">
    <EditableDiv identity="the-hand-of-ethelberta-1"></EditableDiv>
  </b-container>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: 'TheHandOfEthelberta',
  components: { EditableDiv},
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/livery";

.confidentialPage{
  h2, h3{
    text-align: unset!important;
  }
  blockquote{
    margin-left: 1rem;
    padding-left: 1rem;
    border-left-style: solid;
    border-left-width: 3px;
    font-weight: bolder;
    font-size: xx-large;
    font-style: italic;
  }
  a{
    font-size: 2rem;
  }
}

</style>
