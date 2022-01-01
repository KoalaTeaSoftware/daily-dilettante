Notice that the v-html attribute of the article text does not start with a colon (like you might expect)

<template>
  <b-container fluid class="infoPage">
    <h1>The <span id="medium">{{ this.medium }}</span> of <br>
      <span id="author">{{ this.niceName(this.author) }}</span>'s novel <br>
      <span id="book">{{ this.niceName(this.book) }}</span></h1>
    <EditableDiv :identity="dbTag"></EditableDiv>
  </b-container>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";
import router from "@/router";

export default {
  name: 'InfoPage',
  components: {EditableDiv},
  data() {
    return {
      author: null,
      medium: null,
      book: null,
      dbTag: ""
    }
  },
  mounted() {
    this.author = this.$route.params.author
    this.medium = this.$route.params.medium ? this.$route.params.medium : "podcast"
    this.book = this.$route.params.book

    this.dbTag = `info_${this.medium}_${this.niceName(this.author)}_${this.niceName(this.book)}`
        .replace(/\s+/g, '-')
        .toLowerCase()

    switch (this.medium.toLowerCase()) {
      case 'podcast':
      case 'movie':
        return
      default:
        router.push({path: '/'})
    }
  },
  methods: {
    niceName: function (raw) {
      console.log('raw is', raw)
      const words = raw.split("-");

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(" ")
    }
  }
  /*

   */
}
</script>

<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/livery";

.infoPage {
  h1 {
    #book {
      font-style: italic;
    }
  }

  h2, h3 {
    text-align: unset !important;
  }

  blockquote {
    margin-left: 1rem;
    padding-left: 1rem;
    border-left-style: solid;
    border-left-width: 3px;
    font-weight: bolder;
    font-size: xx-large;
    font-style: italic;
  }

  a {
    font-size: 2rem;
  }
}

</style>
