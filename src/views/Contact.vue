<template>
  <div>
    <h1>Contact</h1>
    <form method="post" onsubmit="return checkForm()" action="/chapters/contact/sendmail.php">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input hidden id="whadyano" value="<?= $timeNow ?>">
      <div class="form-group">
        <label :for="this.nameFieldName">Your Name</label>
        <input class="form-control"
               required
               :id="this.nameFieldName"
               :name="this.nameFieldName"
               :maxlength="this.maxNameLength"
               :pattern="this.nameRegex"
               type="text"
               placeholder="Please tell me your name"
               autofocus>
      </div>
      <div class="form-group">
        <label for="this.email1FieldName">Email address</label>
        <input class="form-control"
               required
               id="this.email1FieldName"
               name="this.email1FieldName"
               maxlength="this.maxEmailLength"
               type="email"
               placeholder="Please enter your email"
               onblur="checkEmails()"
               aria-describedby="emailHelp">
        <small class="form-text text-muted" id="emailHelp">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="this.email2FieldName">Email address confirmation</label>
        <input class="form-control"
               required
               id="this.email2FieldName"
               name="this.email2FieldName"
               maxlength="this.maxEmailLength"
               type="email"
               placeholder="Please re-enter your email"
               onblur="checkEmails()"
               aria-describedby="emailConfHelp">
        <small class="form-text text-muted" id="emailConfHelp">Please type it again, just to check.</small>
      </div>

      <div class="form-group">
        <label for="this.subjectFieldName">Subject</label>
        <input class="form-control"
               required
               id="this.subjectFieldName"
               name="this.subjectFieldName"
               maxlength="this.maxSubjectLength"
               value="this.subject"
               type="text"
               placeholder="RE: something ... "
               aria-describedby="subjectHelp">
        <small class="form-text text-muted" id="subjectHelp">Please provide a subject.</small>
      </div>
      <div class="form-group">
        <label>Your Message: (chars left: <span id="letterCount">this.msgMaxLen ?></span>)
          <textarea class="form-control"
                    required
                    id="this.messageFieldName"
                    name="this.messageFieldName"
                    minlength="this.msgMinLen"
                    maxlength="this.msgMaxLen"
                    rows="5" cols="180"
                    onkeyup="showCount(this.value)"></textarea>
        </label>
      </div>
      <button class="btn btn-lg" type="submit" name="this.submitButtonIdName">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      maxNameLength: 40,
      maxEmailLength: 50,
      maxSubjectLength: 50,
      msgMaxLen: 5000,
      msgMinLen: 10,

      nameFieldName: "name",
      email1FieldName: "emailAddress",
      email2FieldName: "emailAddressConf",
      subjectFieldName: "subject",
      messageFieldName: "yourMessage",
      submitButtonIdName: "sendMsg",

      nameRegex: "[A-Za-z0-9 .\-]+"
    }
  }
}
</script>

<style scoped>

</style>
