<template>
  <div class="linkers-wrap">
    <div :key="ii" v-for="(link, ii) in links" @click="$emit('item-click', link); activeII = ii;">
      <div class="linker" :class="{ active: activeII === ii }" >{{ link.text }}</div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    links: {}
  },
  components: {
  },
  data () {
    return {
      activeII: -1
    }
  }
}
</script>
<style>
@import url('../assets/source-sans-pro/source-sans-pro.css');
</style>

<style scoped>

.linkers-wrap{
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: -10px;
}
.linker{
  display: inline-block;
  transition: text-shadow 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  font-family: SourceSansPro-Regular, Arial, Helvetica, sans-serif;
  font-size: 52px;
  line-height: 52px;
  color: rgba(0, 0, 0, 0.692);
  letter-spacing: 0;
  text-shadow: none;
  padding: 10px;
}
.linker:nth-child(1){
  margin-left: 0px;
}

.linker:hover, .linker.active {
  transition: text-shadow 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
}
.linker:hover{
  text-shadow: -2px -2px 0 rgba(0, 213, 255, 0.345), 2px 2px 0 rgba(255, 0, 255, 0.366);
}
.linker.active{
  text-shadow: -2px -2px 0 rgba(0, 213, 255, 0.85), 2px 2px 0 rgba(255, 0, 255, 0.85);
}
</style>
