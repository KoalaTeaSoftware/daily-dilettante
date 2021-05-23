<template>
  <div>
    <EditableDiv identity="about-editor-title"></EditableDiv>
    <!--suppress HtmlUnknownBooleanAttribute -->
    <b-container fluid class="bio">
      <b-row id="roseBioBlock">
        <b-col sm="12" md="4" lg="2">
          <b-img :src="require('@/assets/about/rose.jpg')" fluid></b-img>
        </b-col>
        <b-col>
          <EditableDiv identity="rose-bio"></EditableDiv>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="data in caroDataList" :key="data.link" sm="12" md="6" lg="3">
          <h2>{{ data.caption }}</h2>
          <b-img v-if="data.img" fluid :src="require('@/assets/about/' + data.img)"></b-img>
          <EditableDiv v-if="data.body" :identity="data.body" class="about-caro-text"></EditableDiv>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: "About",
  components: {EditableDiv},
  data() {
    return {
      caroDataList: [
        {
          img: "caro-on-release.jpg",
          caption: "Rose as Film Maker",
          body: "rose-as-film-maker"
        },
        {
          img: "caro-stories.jpg",
          caption: "Rose as Podcaster",
          body: "rose-as-podcaster"
        },
        {
          img: "caro-instagram2.jpg",
          caption: "Rose as Artist",
          body: "rose-as-artist"
        },
        {
          img: "",
          caption: "Rose as Writer",
          body: "rose-as-writer"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#roseBioBlock {
  img {
    margin-bottom: 0.5em;
  }
}

.about-caro-text {
  p {
    text-align: center;
    // this is required because the nice shadow around the iframe makes the caption below it look cramped
    // sadly, I can't target that caption any better than this, but collateral damage seems negligible
    margin-top: 0.5em;
  }
}

</style>
