<template>
  <div class="full">
    <div class="wrapper-content">
      <db-title :title="`Let's Fast Edit:`"></db-title>
      <db-options :links="collections" @item-click="() => {}"></db-options>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'db-options': require('../views-compos/db-options.vue').default,
    'db-title': require('../views-compos/db-title.vue').default
  },
  data () {
    return {
      collections: [
        {
          text: 'Text'
        },
        {
          text: 'CSS'
        },
        {
          text: 'Shader'
        },
        {
          text: 'Uniforms'
        },
        {
          text: 'Object 3D'
        },
        {
          text: 'Component'
        }
      ]
    }
  }
}
</script>
<style>
@import url('../assets/source-sans-pro/source-sans-pro.css');
</style>

<style scoped>
.wrapper-content{
  margin: 30px;
}
</style>
