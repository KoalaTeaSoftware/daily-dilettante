<template>
  <div>
    <EditableDiv identity="about-editor-title"></EditableDiv>
    <!--suppress HtmlUnknownBooleanAttribute -->
    <b-container fluid class="bio">
      <b-row id="roseBio">
        <b-col cols="2">
          <b-img :src="require('@/assets/about/rose.jpg')" fluid></b-img>
        </b-col>
        <b-col>
          <EditableDiv identity="rose-bio"></EditableDiv>
        </b-col>
      </b-row>
      <b-row style="display: flex !important; align-items: center;">
        <b-col>
          <b-card-group deck>
            <b-card
                v-for="data in caroDataList" :key="data.link"
                :header="data.caption">
              <b-card-text>
                <b-img v-if="data.img" fluid :src="require('@/assets/about/' + data.img)"></b-img>
                <EditableDiv v-if="data.body" :identity="data.body" class="card-text"></EditableDiv>
                <!--a v-if="data.link" target="_blank" :href="data.link">{{ data.footNote }}</a-->
                <p v-else>{{ data.footNote }}</p>
              </b-card-text>
            </b-card>
          </b-card-group>
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
          img: "caro-instagram.jpg",
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

#roseBio {
  padding: 1em;
}

.card, .card-header, .card-footer {
  border: none;
  background-color: transparent;

  /* done this way, the header is not given a h? class, so make it seem that way */
  .card-header {
    font-family: branded-font, "Times New Roman", Times, serif;
    font-weight: bold;
  }

  .card-body {
    padding-top: 0;
    padding-bottom: 0; // there is tool large a gap
    .card-text {
      font-size: small;
      margin-top: 1.5em;

      p {
        text-align: center;
        // this is required because the nice shadow around the iframe makes the caption below it look cramped
        // sadly, I can't target that caption any better than this, but collateral damage seems negligible
        margin-top: 0.5em;
      }
    }
  }
}
</style>
