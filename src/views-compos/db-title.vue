<template>
  <div class="title-me">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {}
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.title-me{
  /* What do you want to: */
  font-family: SourceSansPro-Bold, Arial, Helvetica, sans-serif;
  font-size: 62px;
  color: #484848;
  letter-spacing: 0;
}
</style>
