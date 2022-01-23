This uses the straight Bootstrap 3 embedding, rather than the bootstrap-vue one, because the bootstrap-vue version does not
appear to want to play. Rather than spend any longer trying to find out why, I use the first effective solution.

See the comments in the props section to see how to use this component.

Note:
* Rose creates her posts using the app, which creates all items as regular
Therefore, it is imperative that she use the right hash tags.
* Also, this does not creat item-titles, but shoves h2 elements into the regular-body

It depends on a proxy to a Tumblr blog, which returns a bag of XML. It processes that XML and draws a div containing
appropriate elements for different types of post. For the moment, the range of types supported is rather narrow.

<template>
  <div class="tumblrBlogRoll">
    <b-spinner small v-show="busy" class="loadingSpinner"></b-spinner>
    <div class="post" v-for="(post) in fullPostList">
      <div class="postHolder">
        <h2 v-if="post.title">{{ post.title }}</h2>
        <b-img v-if="post.imgLink" :src="post.imgLink" alt="'Image to go with '+post.title" fluid></b-img>
        <div v-if="post.vidLink" class="embed-responsive embed-responsive-16by9">
          <iframe
              :title="post.title"
              class="embed-responsive-item vid-viewer"
              :src="post.vidLink + '?showinfo=0&modestbranding=0'"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
        <div v-if="post.text" v-html="post.text"></div>
      </div>
    </div>
    <div v-if="busy">
      <b-spinner small class="loadingSpinner"></b-spinner>
    </div>
    <div v-else class="postListTail">
      <a v-if="redirectLocation" :href="redirectLocation" class="more ext-link" target="_blank"> read more ... </a>
    </div>
  </div>
</template>

<script>
/* readXML is defined, although it does not seem necessary for it to persist (compared to the interpreted data),
 * so as to force coercion of the response, when it is being processed, into a string
 */
export default {
  name: "TumblrBlock",
  props: {
    /**
     * If this is anything other than zero, then this will show only the first post, and that will have its text trimmed
     * To this length, plus an anchor tag using the next property
     */
    trimLength: String,

    /**
     * Used (if the trimLength is anything other than zero) in the trailing anchor tag
     * Something like /novels is most likely, but I don't see why it shouldn't be an entire URL
     * The target is going to be _self
     */
    redirectLocation: String,

    /**
     * Use this in order to get a block that contains only posts of a certain type.
     * The type that you give has to correspond to some tag that you give some posts in the target blog
     * If you don't give a value to this, it will come through as "undefined", and the product will be the entire blog
     * (well, actually, just the default max number of entries)
     * If you give a value that does not match any of your tags, then you risk getting nothing back
     */
    blogType: String,

    /**
     * It should output no more than this number of posts
     * Has to be a string because (it seems) the builder makes it into one, but it should be a number
     */
    maxNumPosts: String
  },
  data() {
    return {
      busy: true,
      readXML: "",
      parsedXML: null,
      fullPostList: [],
      mutableMax: 1
    }
  },
  mounted: function () {
    if (this.maxNumPosts > 0)
      this.mutableMax = this.maxNumPosts
    else
      this.mutableMax = 100 // an arbitrary number tha should prevent it from breaking the bank, but otherwise not noticable

    let tumblrProxy = "https://us-central1-daily-dilettante.cloudfunctions.net/readTumblr"
    if (this.blogType)
      tumblrProxy += `?tag=${this.blogType}`
      console.log("This is the query:" + tumblrProxy + ":")

    let dummyText =
        "'<tumblr version=\"1.0\">\\n' +\n" +
        "          '<tumblelog name=\"dailydilettante\" timezone=\"US/Eastern\" title=\"The Daily Dilettante\"> </tumblelog>\\n' +\n" +
        "          '<posts start=\"0\" total=\"2\">\\n' +\n" +
        "          '<post id=\"650417731594797056\" url=\"https://dailydilettante.tumblr.com/post/650417731594797056\" url-with-slug=\"https://dailydilettante.tumblr.com/post/650417731594797056/thomas-hardy-n-sit-amet-nisi-finibus-elit\" type=\"Photo\" date-gmt=\"2021-05-06 07:38:05 GMT\" date=\"Thu, 06 May 2021 03:38:05\" unix-timestamp=\"1620286685\" format=\"html\" reblog-key=\"z8z1H1FM\" slug=\"thomas-hardy-n-sit-amet-nisi-finibus-elit\" note-count=\"0\" width=\"460\" height=\"350\">\\n' +\n" +
        "          '<tumblelog title=\"The Daily Dilettante\" name=\"dailydilettante\" url=\"https://dailydilettante.tumblr.com/\" timezone=\"US/Eastern\" avatar-url-512=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s512x512u_c1/6217b0c4a4c75a1f99d03aa4fedb9a9ac44140ff.jpg\" avatar-url-128=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s128x128u_c1/0ac0a8c8e9cac972d2a62c777556882782584b82.jpg\" avatar-url-96=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s96x96u_c1/93d5ce4aaed761b9f096e4fe24364e778e2d2bc2.jpg\" avatar-url-64=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s64x64u_c1/4606419e8cd45623e6f6309d6787a8b73153e616.jpg\" avatar-url-48=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s48x48u_c1/2a011bf2de96940fc8005b4a93a2171afb770707.jpg\" avatar-url-40=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s40x40u_c1/4d6d261852439de83865a3dbae0eecba324b3c68.jpg\" avatar-url-30=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s30x30u_c1/9c6a171173ac446a6ad85982f438723f965ff77d.jpg\" avatar-url-24=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s24x24u_c1/78cedc5712a19e5420b42cf1474fe1515c88d287.jpg\" avatar-url-16=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s16x16u_c1/c21cb7ad4d14239b4facc666693776427eca1ef6.jpg\"/>\\n' +\n" +
        "          '<photo-caption><p>Thomas Hardy</p><p>Finibus elit interdum facilisis. Dummy vestibulum sed justo vitae erat volutpat suscipit. Aliquam dapibus diam ut massa tincidunt, eu varius nisl luctus. Donec condimentum hendrerit pretium. Mauris vel dictum eros. Maecenas fermentum nunc eu venenatis efficitur. Vivamus id neque tincidunt, facilisis sem nec, porta leo. Donec finibus pellentesque elit eu egestas. Mauris faucibus sem quis enim elementum faucibus. Cras tempus sed sapien nec luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mi tortor, congue eget suscipit blandit, tincidunt ut magna. Mauris id dignissim justo, nec eleifend risus.</p><p>Sed non dolor et ipsum elementum faucibus in quis justo. Aenean bibendum lectus at ante varius condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus convallis quam risus, non ullamcorper nisl sagittis sit amet. Nunc ut aliquam tellus. Quisque id sapien a justo vestibulum consequat quis a ligula. Sed et lacus suscipit, scelerisque tellus eu, mattis eros. Donec eu nunc vel dolor vehicula tincidunt. Morbi et enim eget leo scelerisque malesuada nec a quam. Aenean lacinia cursus nisi.</p><p>Aliquam hendrerit id nisl at tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id arcu mauris. Curabitur non posuere neque, lacinia rhoncus elit. Proin eu lorem eu leo volutpat pulvinar. Aenean in odio a nibh fermentum vulputate congue et tellus. Praesent ut mauris sed ligula iaculis blandit.</p></photo-caption>\\n' +\n" +
        "          '<photo-url max-width=\"1280\">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s500x750/1c3737febf05ff76deb554b5af2b79ed72bfb6d0.png</photo-url>\\n' +\n" +
        "          '<photo-url max-width=\"500\">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s500x750/1c3737febf05ff76deb554b5af2b79ed72bfb6d0.png</photo-url>\\n' +\n" +
        "          '<photo-url max-width=\"400\">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s400x600/82f7548b331d3240b9cb35d40e63479b2be9a42a.png</photo-url>\\n' +\n" +
        "          '<photo-url max-width=\"250\">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s250x400/e3536c3567bf453c5ea3844650661223a8c2aff1.png</photo-url>\\n' +\n" +
        "          '<photo-url max-width=\"100\">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s100x200/52fee8d182c4267798d9ad6c76e0358bedc534f2.png</photo-url>\\n' +\n" +
        "          '<photo-url max-width=\"75\">https://64.media.tumblr.com/e1e9292175683ba2283a4c2d1b1ec26d/2672e3af585b6288-89/s75x75_c1/fac32c391289965785d8adab822669be86885af9.png</photo-url>\\n' +\n" +
        "          '<tag>thomas hardy</tag>\\n' +\n" +
        "          '</post>\\n' +\n" +
        "          '<post id=\"650416938739204096\" url=\"https://dailydilettante.tumblr.com/post/650416938739204096\" url-with-slug=\"https://dailydilettante.tumblr.com/post/650416938739204096/a-second-post\" type=\"Regular\" date-gmt=\"2021-05-06 07:25:29 GMT\" date=\"Thu, 06 May 2021 03:25:29\" unix-timestamp=\"1620285929\" format=\"html\" reblog-key=\"dz4bM13f\" slug=\"a-second-post\" note-count=\"0\">\\n' +\n" +
        "          '<tumblelog title=\"The Daily Dilettante\" name=\"dailydilettante\" url=\"https://dailydilettante.tumblr.com/\" timezone=\"US/Eastern\" avatar-url-512=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s512x512u_c1/6217b0c4a4c75a1f99d03aa4fedb9a9ac44140ff.jpg\" avatar-url-128=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s128x128u_c1/0ac0a8c8e9cac972d2a62c777556882782584b82.jpg\" avatar-url-96=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s96x96u_c1/93d5ce4aaed761b9f096e4fe24364e778e2d2bc2.jpg\" avatar-url-64=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s64x64u_c1/4606419e8cd45623e6f6309d6787a8b73153e616.jpg\" avatar-url-48=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s48x48u_c1/2a011bf2de96940fc8005b4a93a2171afb770707.jpg\" avatar-url-40=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s40x40u_c1/4d6d261852439de83865a3dbae0eecba324b3c68.jpg\" avatar-url-30=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s30x30u_c1/9c6a171173ac446a6ad85982f438723f965ff77d.jpg\" avatar-url-24=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s24x24u_c1/78cedc5712a19e5420b42cf1474fe1515c88d287.jpg\" avatar-url-16=\"https://64.media.tumblr.com/ee3b3d4a4fa6bb9d82e1191b751710cf/0987ec65eeba4067-3e/s16x16u_c1/c21cb7ad4d14239b4facc666693776427eca1ef6.jpg\"/>\\n' +\n" +
        "          '<regular-title>A Second Post</regular-title>\\n' +\n" +
        "          '<regular-body><p>In sit amet nisi finibus elit interdum facilisis. Vestibulum sed justo vitae erat volutpat suscipit. Aliquam dapibus diam ut massa tincidunt, eu varius nisl luctus. Donec condimentum hendrerit pretium. Mauris vel dictum eros. Maecenas fermentum nunc eu venenatis efficitur. Vivamus id neque tincidunt, facilisis sem nec, porta leo. Donec finibus pellentesque elit eu egestas. Mauris faucibus sem quis enim elementum faucibus. Cras tempus sed sapien nec luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mi tortor, congue eget suscipit blandit, tincidunt ut magna. Mauris id dignissim justo, nec eleifend risus.</p><p>Sed non dolor et ipsum elementum faucibus in quis justo. Aenean bibendum lectus at ante varius condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus convallis quam risus, non ullamcorper nisl sagittis sit amet. Nunc ut aliquam tellus. Quisque id sapien a justo vestibulum consequat quis a ligula. Sed et lacus suscipit, scelerisque tellus eu, mattis eros. Donec eu nunc vel dolor vehicula tincidunt. Morbi et enim eget leo scelerisque malesuada nec a quam. Aenean lacinia cursus nisi.</p><p>Aliquam hendrerit id nisl at tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id arcu mauris. Curabitur non posuere neque, lacinia rhoncus elit. Proin eu lorem eu leo volutpat pulvinar. Aenean in odio a nibh fermentum vulputate congue et tellus. Praesent ut mauris sed ligula iaculis blandit.</p></regular-body>\\n' +\n" +
        "          '<tag>testing</tag>\\n' +\n" +
        "          '</post>\\n' +\n" +
        "          '</posts>\\n' +\n" +
        "          '</tumblr>'"

    fetch(tumblrProxy)
        .then(response => {
          if (response.ok) {
            // This will create a promise carrying the relevant data  - Despite best efforts, it will be the text of the message
            return response.text()
          } else {
            console.error(`Failed to read Tumblr. Server returned ${response.status}: ${response.statusText}. Therefore using the dummy text`)
            return dummyText
          }
        })
        .then(response => {
          // sadly, some of the bits of html in the response are encoded.
          // This has to be undone before we parse it into structured data
          this.readXML = this.decodeHtml(response)

          // This should be a cross-browser piece to parse the response into structured data
          if (typeof window.DOMParser != "undefined") {
            this.parsedXML = (new window.DOMParser()).parseFromString(this.readXML, "text/html")
          } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
            let xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(this.readXML);
            this.parsedXML = xmlDoc;
          } else {
            console.log("No XML parser found");
          }
          if (this.parsedXML != null) {
            const allPosts = this.parsedXML.getElementsByTagName("post")
            if (this.trimLength > 0) {
              // this means that the screen should show only 1 item (and that should be trimmed and tailed)
              this.mutableMax = 1
            }
            for (let i = 0; i < this.mutableMax; i++) {
              let thisXmlObj = allPosts[i]
              // make a working stub object
              let thisPost = {
                type: thisXmlObj.getAttribute("type"),
                title: "",
                text: "",
                imgLink: "",
                vidLink: ""
              }
              // console.log(`Processing a ${thisXmlObj.getAttribute("type")} of blog`)
              // depending on the type of the blog, we will have to do different processing
              switch (thisXmlObj.getAttribute("type")) {
                case "Photo":
                  let allCaption = thisXmlObj.getElementsByTagName('photo-caption')[0]
                  // there should be only 1 and that is what we want for the caption
                  // it is going be wrapped in P tags, and we want rid of them
                  let caption = this.xmlToString(allCaption.childNodes[0]) || ""
                  thisPost.title = caption.replace(/(<([^>]+)>)/gi, "")

                  // Now shove the rest of the nodes into the text field
                  let captionNodeCount = allCaption.childNodes.length
                  for (let j = 1; j < captionNodeCount; j++) {
                    let node = allCaption.childNodes[j]
                    // console.log(`node${j}: ${this.xmlToString(node)}`)
                    thisPost.text += this.xmlToString(node)
                  }

                  // Now grab the photo itself - there is, in fact an array of tags with this name, so, at first, just grab the first one
                  // ToDo: turn this into a srcset array
                  thisPost.imgLink = thisXmlObj.getElementsByTagName('photo-url')[0].childNodes[0].nodeValue
                  break

                case "Regular":
                  const titleList = thisXmlObj.getElementsByTagName('regular-title')
                  if (titleList.length > 1) {
                    thisPost.title = this.xmlToString(titleList[0].childNodes[0])
                  }
                  thisPost.text = this.xmlToString(thisXmlObj.getElementsByTagName('regular-body')[0])
                  thisPost.imgLink = null
                  break
                case "Video":
                  // this sort of post does not have a title, and we don't seem to want one
                  thisPost.title = null
                  // This node is actually a bag of HTML, including P tags, so we should be able to simply dum it out
                  thisPost.text = this.xmlToString(thisXmlObj.getElementsByTagName('video-caption')[0])

                  // there will be only one such node, but this will be in an array (because it is a getElement_s_
                  // This child node is a https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement
                  thisPost.vidLink = thisXmlObj.getElementsByTagName('video-player')[0].childNodes[0].src
                  break
                default:
                  console.log(`Unknown blog item type ${thisXmlObj.getAttribute("type")}`)
              }
              // If the output has to be trimmed, we are currently within the iteration of the loop where this has to be done
              if (this.trimLength > 0) {
                // noinspection JSCheckFunctionSignatures
                thisPost.text = thisPost.text.substr(0, this.trimLength)
                thisPost.text += ` <a href="${this.redirectLocation}" class="more" target="_self"> more ...</a>`
              }
              this.fullPostList.push(thisPost)
            }
          }
        })
        .catch(function (err) {
          console.log('Fetch Error :%s', err);
        });
    this.busy = false
  },
  methods: {
    /**
     * Uses browser-built-in stuff to parse the XML into something nice
     *
     * @param xmlData - an XML element
     * @returns {string} - the value, or content of the element in a useful string
     */
    xmlToString: function (xmlData) {
      let xmlString;
      //IE
      if (window.ActiveXObject) {
        xmlString = xmlData.xml;
      }
      // code for Mozilla, Firefox, Opera, etc.
      else {
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
      }
      return xmlString;
    },

    /**
     * A quick-ish and apparently robust way of un-encoding html
     * Interestingly enough, this element never becomes visible.
     *
     * @param html
     * @returns {string}
     */
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
}
</script>
