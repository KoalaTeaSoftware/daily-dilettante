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
                <EditableDiv v-if="data.body" :identity="data.body" class="card-text"></EditableDiv>
                <a v-if="data.link" target="_blank" :href="data.link">{{ data.footNote }}</a>
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
          body: "rose-as-film-maker",
          footNote: "Click here to see more about the feature films that I have made",
          link: "https://rosegoldthorp.com/released-features"
        },
        {
          img: "caro-stories.jpg",
          caption: "Rose as Podcaster",
          body: "rose-as-podcaster",
          footNote: "Click here to see the podcasts that I have made so far for The Greenlands",
          link: "https://the-greenlands.com/stories"
        },
        {
          img: "caro-instagram.jpg",
          caption: "Rose as Artist",
          body: "rose-as-artist",
          footNote: "Click here to see my Instagram for The Greenlands",
          link: "https://www.instagram.com/the_greenlands/"
        },
        {
          img: "",
          caption: "Rose as Writer",
          body: "rose-as-writer",
          footNote: "Contact me for further details",
          link: "/contact"
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
    }
  ;
  }


}
</style>
