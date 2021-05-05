Notice that the v-html attribute of the article text does not start with a colon (like you might expect)

<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <b-container fluid>
    <b-row>
      <b-col>
        <EditableDiv identity="novels-1"></EditableDiv>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="blog-role" v-for="article in articles">
          <div class="img-holder">
            <img class="article-img w-50" :src="article.imgSrc" alt="Hero image from article">
          </div>
          <h2 class="article-title">{{ article.title }}</h2>
          <div class="article-text">
            <span v-html="article.text"></span>
          </div>
        </div>
      </b-col>
      <b-col>
        <div id="vid-role" v-for="video in videos">
          <!--suppress SpellCheckingInspection -->
          <iframe
              class="vid-viewer"
              width="560" height="315"
              :src="video.vidSrc + '?showinfo=0&modestbranding=0'"
              title="A video from out channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: 'Novels',
  components: {EditableDiv},
  data() {
    return {
      articles: [
        {
          title: "Some Old Guff",
          imgSrc: "https://daily-dilettante.web.app/img/trollope-portrait.a0e4187c.jpg",
          text: "<p>Aenean non augue in risus hendrerit rutrum. Donec tristique sed erat posuere blandit. Aliquam volutpat\n" +
              "        consequat nulla. Fusce sit amet tempor arcu. Proin urna arcu, dignissim id faucibus interdum, commodo et\n" +
              "        neque. Sed vestibulum tortor eu magna eleifend commodo at quis erat. Nullam eu feugiat tortor. Donec in urna\n" +
              "        accumsan, blandit magna sagittis, varius turpis. Interdum et malesuada fames ac ante ipsum primis in\n" +
              "        faucibus. Vivamus vitae hendrerit nisl, sed tempus dolor. Class aptent taciti sociosqu ad litora torquent\n" +
              "        per conubia nostra, per inceptos himenaeos.</p>" +
              "<p>Aenean non augue in risus hendrerit rutrum. Donec tristique sed erat posuere blandit. Aliquam volutpat\n" +
              "        consequat nulla. Fusce sit amet tempor arcu. Proin urna arcu, dignissim id faucibus interdum, commodo et\n" +
              "        neque. Sed vestibulum tortor eu magna eleifend commodo at quis erat. Nullam eu feugiat tortor. Donec in urna\n" +
              "        accumsan, blandit magna sagittis, varius turpis. Interdum et malesuada fames ac ante ipsum primis in\n" +
              "        faucibus. Vivamus vitae hendrerit nisl, sed tempus dolor. Class aptent taciti sociosqu ad litora torquent\n" +
              "        per conubia nostra, per inceptos himenaeos.</p>" +
              "<p>Aenean non augue in risus hendrerit rutrum. Donec tristique sed erat posuere blandit. Aliquam volutpat\n" +
              "        consequat nulla. Fusce sit amet tempor arcu. Proin urna arcu, dignissim id faucibus interdum, commodo et\n" +
              "        neque. Sed vestibulum tortor eu magna eleifend commodo at quis erat. Nullam eu feugiat tortor. Donec in urna\n" +
              "        accumsan, blandit magna sagittis, varius turpis. Interdum et malesuada fames ac ante ipsum primis in\n" +
              "        faucibus. Vivamus vitae hendrerit nisl, sed tempus dolor. Class aptent taciti sociosqu ad litora torquent\n" +
              "        per conubia nostra, per inceptos himenaeos.</p>" +
              "      "
        },
        {
          title: "More Stuff",
          imgSrc: "https://daily-dilettante.web.app/img/trollope-portrait.a0e4187c.jpg",
          text: "<p>Nulla bibendum quam eget vestibulum interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ullamcorper vulputate enim quis pretium. Phasellus gravida, quam sit amet blandit porta, massa nulla gravida nulla, quis auctor erat libero sed lacus. In molestie metus massa, vel euismod mi ullamcorper et. Pellentesque elementum lectus nec scelerisque dignissim. Praesent eget tincidunt sem. Nulla sapien quam, semper non fermentum id, suscipit eu arcu. Pellentesque gravida consectetur vestibulum. Praesent in vestibulum lorem, ut tristique diam. Nulla tincidunt aliquet quam vitae maximus.</p>" +
              "<p>Suspendisse potenti. Suspendisse tempor velit at dui tempor, quis viverra turpis porttitor. In non gravida sem. Nulla fermentum consequat vulputate. Suspendisse gravida cursus est eu mollis. Fusce consectetur velit sed ex tincidunt, non ornare augue auctor. In in consectetur risus, at tincidunt neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin tempus leo id lorem condimentum consectetur. Maecenas vel iaculis ligula, et blandit tellus. Donec vitae cursus sem.</p>" +
              "<p>Aenean non augue in risus hendrerit rutrum. Donec tristique sed erat posuere blandit. Aliquam volutpat consequat nulla. Fusce sit amet tempor arcu. Proin urna arcu, dignissim id faucibus interdum, commodo et neque. Sed vestibulum tortor eu magna eleifend commodo at quis erat. Nullam eu feugiat tortor. Donec in urna accumsan, blandit magna sagittis, varius turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vitae hendrerit nisl, sed tempus dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos</p>"
        }
      ],
      videos: [
        {vidSrc: "https://www.youtube.com/embed/5O4Y9TbyEag"},
        {vidSrc: "https://www.youtube.com/embed/99Hly9Cr8Q4"},
        {vidSrc: "https://www.youtube.com/embed/9puKSBPY_cg"},
        {vidSrc: "https://www.youtube.com/embed/GypebgAtyuY"}
      ]
    }
  }
}
</script>

<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/livery";

#blog-role {
  .article-img {
    margin-right: 1.75em;
    margin-bottom: 1.5em;
    float: left;
  }

  .article-text {
    text-align: left;
  }
}

#vid-role {
  .vid-viewer {
    border-radius: 5px;
    box-shadow: 5px 5px 10px $colour-body-text-shadow;
    margin-bottom: 1em;
    border: 0;
  }
}
</style>
