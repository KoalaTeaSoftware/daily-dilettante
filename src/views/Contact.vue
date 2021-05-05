<template>
  <div>
    <h1>Contact</h1>
    <b-form
        @submit="onSubmit"
        @reset="onReset"
    >
      <!--suppress HtmlFormInputWithoutLabel -->
      <input hidden id="whadyano" value="<?= $timeNow ?>">
      <b-form-input
          v-model="formData.name"
          :state="checkName"
          pattern="[A-Za-z0-9 .-]+"
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
          pattern="[A-Za-z0-9 .-]+"
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
          pattern="[A-Za-z0-9 .-]+"
          required
          id="message"
          name="message"
          placeholder="Enter something..."
          rows="10"></b-form-textarea>
      <b-form-invalid-feedback :state="checkMessage">
        This must be between 10 and 5,000 chars long, and be only letters, numbers, and similar ordinary characters.
      </b-form-invalid-feedback>

      <span id="counter">(Chars left: <span id="letterCount">500</span>)</span>
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

export default {
  name: "Contact",
  data() {
    return {
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
      if (this.checkEmails && this.checkName)
        alert(JSON.stringify(this.formData))
    },
    onReset: function (event) {
      console.log("Resetting")
      event.preventDefault()
      this.formData.name = this.formData.address1 = this.formData.address2 = this.formData.subject = this.formData.message = ""
    },
    setFieldHighlight: function (element) {
      element.classList.add("erroneousField");
    },
    clearFieldHighlight: function (element) {
      element.classList.remove("erroneousField");
    },
    showCount: function () {
      document.getElementById("letterCount").innerText =
          (500 - document.getElementById('message').value.length).toString()
    }
  },
  computed: {
    checkName: function () {
      return (
          (this.formData.name.length > nameLengthMin) &&
          (this.formData.name.length <= nameLengthMax) &&
          (this.formData.name.match(nameRegexp) != null)
      )
    },
    checkEmails: function () {
      // rely on the browser to validate the email formats
      return (
          (this.formData.address1.length > emailLengthMin) &&
          (this.formData.address1.length <= emailLengthMax) &&
          (this.formData.address1 === this.formData.address2)
      )
    },
    checkSubject: function () {
      return (
          (this.formData.subject.length > subjectLengthMin) &&
          (this.formData.subject.length <= subjectLengthMax) &&
          (this.formData.subject.match(subjectRegexp) != null)
      )
    },
    checkMessage: function () {
      return (
          (this.formData.message.length > msgLengthMin) &&
          (this.formData.message.length <= msgLengthMax) &&
          (this.formData.message.match(msgRegexp) != null)
      )
    }
  }
}
</script>

