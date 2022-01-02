<template>
  <div id="storyWorlds">
    <!--suppress HtmlUnknownBooleanAttribute -->
    <b-container>
      <h1>Storyworlds</h1>
      <h2>Thomas Hardy's Wessex Dramas</h2>
      <h3>A) Dramatic Podcast Releases in 2022</h3>
      <b-card v-for="data in panels" class="series">
        <img class="mr-3"
             :src="require('@/assets/wessex/podcasts/' + data.poster)"
             alt="Poster for the podcast"
             width="128"
        >
        <h4 class="mt-0">{{ data.title }}<span class="dueDate">({{ data.dueDate }})</span></h4>

        <p v-for="para in data.synopsis">{{ para }}</p>
        <div class="row">
          <audio v-for="episode in data.episodeList" controls class="w-75">
            <source :src="require('@/assets/wessex/podcasts/' + episode.link + '.mp3')" type="audio/mpeg">
            <source :src="require('@/assets/wessex/podcasts/' + episode.link + '.ogg')" type="audio/ogg">
            <source :src="require('@/assets/wessex/podcasts/' + episode.link + '.wav')" type="audio/wav">
            There's a surprise, your browser does not support the audio tag
          </audio>
        </div>
        <div class="row">
          <a :href="data.screenplayLink"
             target="_blank"
             class="list-item-additional-data ext-link"
             title="See the screenplay in a new tab"
          >Click here to read the feature's screenplay</a>
        </div>

      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "WessexPodcasts",
  data() {
    return {
      panels: [
        {
          title: "Desperate Remedies",
          poster: "desperate-remedies/desperate-remedies-poster.jpg",
          dueDate: "Starts end Jan",
          synopsis: ["Cytherea, an orphaned teenaged girl, is forced to become a paid companion to a wealthy woman, Miss Aldclyffe. Cytherea’s fiancé is tricked away from her, and she is pressured into marrying Miss Aldclyffe’s own illegitimate, already-married son.",
            "Cytherea desperately tries to discover if she, herself, truly is married, or not, and how many “wives” are actually involved ….. all before this heir gets his hands on her"
          ],
          episodeList: [
            {
              link: "desperate-remedies/DesperateRemediesMainTheme"
            }
          ],
          screenplayLink: "https://www.dropbox.com/s/8678tahc96nqulf/Desperate%20remedies%20-%20podcasted%20-%20screenplay.pdf?dl=0"
        },
        {
          title: "The Hand of Ethelberta",
          poster: "the-hand-of-ethelberta/Thumbnail.png",
          dueDate: "Starts end May",
          synopsis: ["Ethelberta, is an ex-governess from a large servant family. She is already (at 21 years old) widowed, after having married Lady Petherwin's son. When her mother-in-law dies, she attempts to earn her living, dramatising her own poetry. In London, she moves her many siblings, and mother, into her house, passing them off as her own servants in an attempt to disguise her straightened means.",
            "Unfortunately, her young sister, Picotee, falls In love with one of Ethelbert's suitors. Complications ensue."
          ],
          episodeList: [
            {
              link: "desperate-remedies/DesperateRemediesMainTheme"
            }
          ],
          screenplayLink: "https://www.dropbox.com/s/sx6e2dcc6y7bv3p/The%20Hand%20Of%20Ethelberta.pdf?dl=0"
        },
        {
          title: "A Laodicean",
          poster: "a-laodicean/poster.jpg",
          dueDate: "Starts end Sept",
          synopsis: ["George Somerset, a new Architecture graduate, asks to sketch the interior of a castle. He ends up falling in love with its millionaire owner, Paula Power: a very 'Modern Miss' with decided opinions of her own.",
            "Unfortunately there are malignant influences amongst the former aristocratic castle-owners, and the course of love does not run so smooth."
          ],
          episodeList: [
            {
              link: "desperate-remedies/DesperateRemediesMainTheme"
            }
          ],
          screenplayLink: "https://www.dropbox.com/s/zbg3snqs8vyn49p/2021-12-28%20A%20Laodicean%20-%20podcasted.pdf?dl=0"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#storyWorlds {

  .card {
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 10px black;
    margin: 0.5em 0.25em 0.25em;

    .card-body {
      h4 {
        text-align: unset;
        font-weight: bold;
      }

      img {
        float: left;
      }

      .dueDate {
        float: right;
        font-weight: normal;
      }

      .row {
        audio {
          margin: 0.5em auto auto;
        }

        a {
          margin: auto
        }

        .list-item-additional-data {
          padding-top: .75em;
        }
      }
    }
  }
}
</style>
