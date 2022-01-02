<template>
  <div id="storyWorlds">
    <b-container>
      <h1>Storyworlds</h1>
      <h2>Thomas Hardy's Wessex Dramas</h2>
      <h3>B) An Anthology Feature comprising four of Hardy's short stories, 2022:</h3>
      <div class="row">
        <div class="display-4">"Hardy's Regrets"</div>
      </div>
      <div class="row">
        <img id="poster" class="mr-3"
             :src="require('@/assets/wessex/features/hardys-regrets/poster.jpg')"
             alt="Poster for the film"
        >
        <ol>
          <li>
            <span class="title">The Superstitious Man</span>
            <a href="https://www.dropbox.com/s/s66v9yxl56wqz9c/Superstitious.pdf?dl=0"
               class="list-item-additional-data ext-link"
               target="_blank">Read the screenplay</a>
          </li>
          <li>
            <span class="title">What The Shepherd Saw</span>
            <a href="https://www.dropbox.com/s/s2n68bwo8ykgj8r/What%20The%20Shepherd%20Saw.pdf?dl=0"
               class="list-item-additional-data ext-link"
               target="_blank"
               title="See the screenplay in a new tab"
            >Read the screenplay</a>
          </li>
          <li>
            <span class="title">The Three Strangers</span>
            <a href="https://www.dropbox.com/s/vbmwyjz74gbwlm0/The%20Three%20Strangers.pdf?dl=0"
               class="list-item-additional-data ext-link"
               target="_blank"
               title="See the screenplay in a new tab"
            >Read the screenplay</a>
          </li>
          <li>
            <span class="title">The Spectre of the Real</span>
            <span class="list-item-additional-data">Screenplay available end Feb. '22</span>
          </li>
        </ol>
      </div>
      <div class="row mt-3">
        <div class="col">
          <p>Everyone in Dorset is welcome to audition for this feature's, cast and crew roles. Please drop us a line
            using <!--suppress HtmlUnknownTarget -->
            <a href="/contact" title="Go to the contact form">our contact form</a></p>
        </div>
      </div>
      <div class="row text-center">
        <div class="col">
          <h4>Shooting Dates</h4>
          <ol>
            <li>
              <span class="title">The Superstitious Man</span>
              <span class="list-item-additional-data">Shooting 2 weekends late April</span>
            </li>
            <li>
              <span class="title">What The Shepherd Saw</span>
              <span class="list-item-additional-data">Shooting 2 weekends late May</span>
            </li>
            <li>
              <span class="title">The Three Strangers</span>
              <span class="list-item-additional-data">Shooting 2 weekends late June</span>
            </li>
            <li>
              <span class="title">The Spectre of the Real</span>
              <span class="list-item-additional-data">Shooting 2 weekends late July</span>
            </li>
          </ol>
        </div>
      </div>
      <div class="row text-center">
        <div class="col">
          <h4>Locations</h4>
          <p>1 weekend outdoors & 1 weekend indoors, for each short story, in the Portland / Weymouth area: Hardy's
            home</p>
          <p>These four shorts will be linked by a narrator, to create a feature-length film. Then the Worldwide
            Premiere wil be held at Christmas, locally</p>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "WessexFeatures",
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#storyWorlds {
  #poster {
    float: left;
    width: 128px;
    //height: fit-content;
  }

  .display-4, h4 {
    margin: auto;
    text-align: unset;
  }

  ol {
    list-style-type: lower-roman;
    text-align: left;

    li {
      margin-top: .5rem;

      /*
      Sadly this does not look that good on phones, but still not bad
      Splitting it with Bootstrap cols give a problem with vertical alignment
      Maybe think about media queries, of something else?
       */
      .title {
        font-weight: bold;
        display: inline-block;
        width: 12em;
      }
    }
  }
}
</style>
