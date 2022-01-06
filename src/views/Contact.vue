<template>
  <div>
    <h1>Contact</h1>
    <b-form
        @submit="onSubmit"
        @reset="onReset"
        id="contactForm"
    >
      <!--suppress HtmlFormInputWithoutLabel -->
      <input hidden id="whadyano">
      <p id="server-feedback" v-show="this.serverMessage">{{ serverMessage }}</p>
      <b-form-group
          id="name-group"
          label="Your Name:"
          label-for="name"
      >
        <b-form-invalid-feedback :state="checkName">
          This must be between {{ this.config.nameLengthMin }} and {{ this.config.nameLengthMax }} chars long, and be
          only letters, numbers, or similar sensible characters.
        </b-form-invalid-feedback>
        <b-form-input
            v-model="formData.name"
            :state="checkName"
            :maxlength=this.config.nameLengthMax
            required
            id="name"
            name="name"
            type="text"
            placeholder="Please tell me your name"
            autofocus></b-form-input>
      </b-form-group>

      <b-form-group
          id="address-group-1"
          label="Your Email Address:"
          label-for="address1"
      >
        <b-form-invalid-feedback :state="checkEmails">
          Please provide a valid email address, and that both fields are identical
        </b-form-invalid-feedback>
        <b-form-input
            v-model="formData.address1"
            :state="checkEmails"
            required
            id="address1"
            name="address1"
            type="email"
            placeholder="Please tell me your email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="address-group-2"
          label="Please Confirm Your Email Address:"
          label-for="address2"
      >
        <b-form-invalid-feedback :state="checkEmails">
          Please provide a valid email address, and that both fields are identical
        </b-form-invalid-feedback>
        <b-form-input
            v-model="formData.address2"
            :state="checkEmails"
            required
            id="address2"
            name="address2"
            maxlength="50"
            type="email"
            placeholder="Please tell confirm your email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="subject-group"
          label="Subject:"
          label-for="subject"
      >
        <b-form-invalid-feedback :state="checkSubject">
          This must be between {{ config.subjectLengthMin }} and {{ config.subjectLengthMax }} chars long, and be only
          letters, numbers, and similar ordinary characters.
        </b-form-invalid-feedback>
        <b-form-input
            v-model="formData.subject"
            :state="checkSubject"
            :maxlength=this.config.subjectLengthMax
            required
            id="subject"
            name="subject"
            type="text"
            placeholder="Please provide some subject for this message"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="message-group"
          label="Your Message:"
          label-for="message"
      >
        <b-form-invalid-feedback :state="checkMessage">
          This must be between {{ this.config.msgLengthMin }} and {{ this.config.msgLengthMax }} chars long, and be only
          letters, numbers, and similar ordinary characters.
        </b-form-invalid-feedback>
        <b-form-textarea
            v-model="formData.message"
            :state="checkMessage"
            :maxlength=this.config.msgLengthMax
            @keyup="showCount"
            required
            id="message"
            name="message"
            placeholder="Enter something..."
            rows="10"
        ></b-form-textarea>
      </b-form-group>
      <span id="counter">(Chars left: <span id="letterCount">{{ remainingMsgChars }}</span>)</span>
      <b-button type="submit" id="submitButton" :disabled="!this.checkAll">Submit</b-button>
      <b-button type="reset" id="resetButton">Reset</b-button>
    </b-form>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery.scss";

#contactForm {
  width: 75%;
  margin: auto;

  label {
    float: left;
    font-weight: bold;
  }

  input, textarea {
    margin: 1em;
  }

  .invalid-feedback {
    text-align: right;
  }

  .erroneousField {
    border-color: red;
    color: red;
  }

  #counter {
    float: right;
    font-size: smaller;
    font-style: italic;
  }

  #submitButton {
    background-color: $colour-banner-background;
    color: $colour-banner-primary-text;
    margin: 1em;
    float: left;
  }

  #resetButton {
    background-color: transparent;
    color: $colour-banner-background;
    margin: 1em;
    float: left;
  }
}
</style>

<script>

const config = require('../../functions/email.config.json')

const mailService = "https://us-central1-daily-dilettante.cloudfunctions.net/sendMail"

export default {
  name: "Contact",
  data() {
    return {
      serverMessage: null,
      remainingMsgChars: 1,
      formData: {
        name: "",
        address1: "",
        address2: "",
        subject: "",
        message: ""
      },
      config
    }
  },
  methods: {
    onSubmit: function (event) {
      event.preventDefault()
      if (this.checkAll) {

        const fields = document.getElementById("contactForm").getElementsByTagName('*');
        for (const elem of fields) {
          elem.disabled = true
        }

        const formData = this.formData
        // console.log(`form data ${JSON.stringify(formData)}`)
        // console.log(`Sending to ${mailService}`)

        fetch(
            mailService,
            {
              method: 'POST',
              mode: "cors",
              headers: {"content-type": "application/json"},
              body: JSON.stringify(formData)
            })
            .then(response => {
              if (response.ok) {
                this.serverMessage = "Thank you for your message. We will get back to you as soon as possible."
              } else {
                this.serverMessage = "Unfortunately, your message could not be sent. Please try again later."
                response.text().then(text => {
                  console.log(`Sending email has failed because:${text}:`);
                })
              }
            })
            .catch(reason => {
              console.log("Back in the Contact form, Sending email appears to have failed:" + reason);
              this.serverMessage = "Unfortunately, your message could not be sent. Please try again later."
            })
      } else {
        console.log("There is some sort of validation failure")
      }
    },
    onReset: function (event) {
      console.log("Resetting")
      event.preventDefault()
      this.formData.name = this.formData.address1 = this.formData.address2 = this.formData.subject = this.formData.message = ""
    },
    setFieldHighlight: function (element) {
      element.classList.add("erroneousField");
    },
    showCount: function () {
      const len = document.getElementById('message').value.length
      this.remainingMsgChars = (this.config.msgLengthMax - len).toLocaleString()
    }
  },
  computed: {
    checkAll: function () {
      return (this.checkName && this.checkEmails && this.checkSubject && this.checkMessage)
    },
    checkName: function () {
      return (
          (this.formData.name.length > this.config.nameLengthMin) &&
          (this.formData.name.length <= this.config.nameLengthMax) &&
          (this.formData.name.match(this.config.nameRegexp) != null)
      )
    },
    checkEmails: function () {
      if (
          (this.formData.address1.length > this.config.emailLengthMin) &&
          (this.formData.address1.length <= this.config.emailLengthMax) &&
          (this.formData.address1 === this.formData.address2)
      ) {
        // can't rely on the browser to validate the email formats, so put it in there
        const exp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        return exp.test(this.formData.address1)
      } else
        return false;
    },
    checkSubject: function () {
      return (
          (this.formData.subject.length > this.config.subjectLengthMin) &&
          (this.formData.subject.length <= this.config.subjectLengthMax) &&
          (this.formData.subject.match(this.config.subjectRegexp) != null)
      )
    },
    checkMessage: function () {
      return (
          (this.formData.message.length > this.config.msgLengthMin) &&
          (this.formData.message.length <= this.config.msgLengthMax) &&
          (this.formData.message.match(this.config.msgRegexp) != null)
      )
    }
  },
  mounted() {
    const currentDate = new Date();
    this.remainingMsgChars = config.msgLengthMax

    document.getElementById("name").setAttribute("maxlength", this.config.nameLengthMax.toString())
    document.getElementById("address1").setAttribute("maxlength", this.config.emailLengthMax.toString())
    document.getElementById("address2").setAttribute("maxlength", this.config.emailLengthMax.toString())
    document.getElementById("subject").setAttribute("maxlength", this.config.subjectLengthMax.toString())
    document.getElementById("message").setAttribute("maxlength", this.config.msgLengthMax.toString())

    document.getElementById("whadyano").setAttribute("value", currentDate.getTime().toString())

    const subj = new URLSearchParams(window.location.search).get('subject')
    if (subj && subj.length > 0)
      this.formData.subject = subj.substr(0, (this.config.subjectLengthMax - 1))
  }
}
</script>

