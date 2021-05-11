<template>
  <div>
    <h1>Contact</h1>
    <b-form
        @submit="onSubmit"
        @reset="onReset"
        id="contactForm"
    >
      <!--suppress HtmlFormInputWithoutLabel -->
      <input hidden id="whadyano" value="<?= $timeNow ?>">
      <p id="server-feedback" v-show="this.serverMessage">{{ serverMessage }}</p>
      <b-form-input
          v-model="formData.name"
          :state="checkName"
          required
          id="name"
          name="name"
          maxlength="50"
          type="text"
          placeholder="Please tell me your name"
          autofocus></b-form-input>
      <b-form-invalid-feedback :state="checkName">
        This must be between 5 and 50 chars long, and be only letters, numbers, similar sensible characters.
      </b-form-invalid-feedback>

      <b-form-input
          v-model="formData.address1"
          :state="checkEmails"
          required
          id="address1"
          name="address1"
          maxlength="50"
          type="email"
          placeholder="Please tell me your email address"
          autofocus></b-form-input>
      <b-form-invalid-feedback :state="checkEmails">
        Please ensure that a valid email address is provided
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
          autofocus></b-form-input>
      <b-form-invalid-feedback :state="checkEmails">
        Please ensure that both email address fields contain identical data
      </b-form-invalid-feedback>

      <b-form-input
          v-model="formData.subject"
          :state="checkSubject"
          required
          id="subject"
          name="subject"
          maxlength="50"
          type="text"
          placeholder="Please provide some subject for this message"
          autofocus></b-form-input>
      <b-form-invalid-feedback :state="checkSubject">
        This must be between 5 and 50 chars long, and be only letters, numbers, and similar ordinary characters.
      </b-form-invalid-feedback>

      <b-form-textarea
          v-model="formData.message"
          :state="checkMessage"
          @keyup="showCount"
          required
          id="message"
          name="message"
          placeholder="Enter something..."
          rows="10"></b-form-textarea>
      <b-form-invalid-feedback :state="checkMessage">
        This must be between 10 and 5,000 chars long, and be only letters, numbers, and similar ordinary characters.
      </b-form-invalid-feedback>

      <span id="counter">(Chars left: <span id="letterCount">{{ remainingMsgChars }}</span>)</span>
      <b-button type="submit" id="submitButton">Submit</b-button>
      <b-button type="reset" id="resetButton">Reset</b-button>
    </b-form>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/livery.scss";

form {
  width: 75%;
  margin: auto;

  input, textarea {
    margin: 1em;
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
// this needs to correspond with the data in ~/functions/config.json
// todo: make it use that file instead of these local constants
const nameLengthMin = 5
const nameLengthMax = 40
const nameRegexp = /^[a-z0-9., -]+$/i
const emailLengthMin = 1
const emailLengthMax = 50
const subjectLengthMin = nameLengthMin
const subjectLengthMax = 50
const subjectRegexp = /^[£a-z0-9., -]+$/i
const msgLengthMin = 10
const msgLengthMax = 5000
const msgRegexp = /^[£a-z0-9., -/?/)(]+$/i
const mailService = "https://us-central1-daily-dilettante.cloudfunctions.net/sendMail"

export default {
  name: "Contact",
  data() {
    return {
      serverMessage: null,
      remainingMsgChars: msgLengthMax,
      formData: {
        name: "",
        address1: "",
        address2: "",
        subject: "",
        message: ""
      }
    }
  },
  methods: {
    onSubmit: function (event) {
      event.preventDefault()
      const fields = document.getElementById("contactForm").getElementsByTagName('*');
      if (this.checkAll) {

        for (let i = 0; i < fields.length; i++) {
          fields[i].disabled = true;
        }

        // const data = new FormData(event.target);
        const formData = this.formData //Object.fromEntries(data.entries());
        console.log(`form data ${JSON.stringify(formData)}`)
        console.log(`Sending to ${mailService}`)

        fetch(
            mailService,
            {
              method: 'POST',
              mode: "no-cors",
              headers: {"content-type": "application/json"},
              body: JSON.stringify(formData)
            })
            .then(response => {
              /*
              There is a basic problem here, because there are are two domains involved,
              https://daily-dilettante.web.app & the one above, we get back almost no information,
              not even useful success / failure flags.
              Therefore response.type - "opaque" we assume that it worked
               */
              console.log("Back in the Contact form. Type value is :" + response.type);
              if (response.type === "opaque" || ((response.type !== "opaque") && response.ok)) {
                console.log("Back in the Contact form, Sending email appears to have succeeded:" + JSON.stringify(response));
                this.serverMessage = "Thank you for you message. We will try to reply as soon as possible."
                // cwMessageBlock.innerHTML = "";
                // messageWidget.show("Thank you. We will reply as soon as possible.");
                // contactWidget.hide();
              } else {
                console.log("Back in the Contact form, Sending email appears to have failed. Unable to say why." + JSON.stringify(response));
                this.serverMessage = "Unfortunately, your message could not be sent. Please try again later."
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
    }

    ,
    setFieldHighlight: function (element) {
      element.classList.add("erroneousField");
    }
    ,
    clearFieldHighlight: function (element) {
      element.classList.remove("erroneousField");
    }
    ,
    showCount: function () {
      const len = document.getElementById('message').value.length
      this.remainingMsgChars = (msgLengthMax - len).toLocaleString()
    }
  }
  ,
  computed: {
    checkAll: function () {
      return (this.checkName && this.checkEmails && this.checkSubject && this.checkMessage)
    }
    ,
    checkName: function () {
      return (
          (this.formData.name.length > nameLengthMin) &&
          (this.formData.name.length <= nameLengthMax) &&
          (this.formData.name.match(nameRegexp) != null)
      )
    }
    ,
    checkEmails: function () {
      // rely on the browser to validate the email formats
      return (
          (this.formData.address1.length > emailLengthMin) &&
          (this.formData.address1.length <= emailLengthMax) &&
          (this.formData.address1 === this.formData.address2)
      )
    }
    ,
    checkSubject: function () {
      return (
          (this.formData.subject.length > subjectLengthMin) &&
          (this.formData.subject.length <= subjectLengthMax) &&
          (this.formData.subject.match(subjectRegexp) != null)
      )
    }
    ,
    checkMessage: function () {
      if (this.formData.message.length > msgLengthMin)
        console.log("Message is long enough")
      if (this.formData.message.length <= msgLengthMax)
        console.log("Message is short enough")
      if (this.formData.message.match(msgRegexp) != null)
        console.log("message is well formed")


      return (
          (this.formData.message.length > msgLengthMin) &&
          (this.formData.message.length <= msgLengthMax) &&
          (this.formData.message.match(msgRegexp) != null)
      )
    }
  }
}
</script>

