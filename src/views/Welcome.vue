<template>
  <div class="welcome">
    <img alt="The Daily Dilettante logo" src="../assets/logo200.gif">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Welcome',
  components: {
    HelloWorld
  }
}
</script>
