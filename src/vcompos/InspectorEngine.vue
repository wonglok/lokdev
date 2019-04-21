<template>
  <div class="full">
    <div class="left-right">
      <div class="json-editor">
        <div v-if="root">
          <CollectionManager v-if="root" :root="root" @dbID="(v) => { dbID = v }"></CollectionManager>

          <div v-if="root.dbs && root.dbs[dbID]">
            <DBText v-if="root.dbs[dbID].type === 'textdb'" :collection="root.dbs[dbID]"></DBText>
            <DBLayout v-if="root.dbs[dbID].type === 'layoutdb'" :collection="root.dbs[dbID]"></DBLayout>
          </div>
        </div>
      </div>
      <div class="json-preview">
        <pre v-if="root"><code>{{ root }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DBText from '../vcompos/DBText.vue'
import DBLayout from '../vcompos/DBLayout.vue'
import CollectionManager from '../vcompos/CollectionManager.vue'
export default {
  name: 'inspector-engine',
  components: {
    DBText,
    DBLayout,
    CollectionManager
  },
  props: {
    root: {
    }
  },
  watch: {
  },
  data () {
    return {
      saving: false,
      dbID: false
    }
  },
  beforeDestroy () {
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped>
.left-right{
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.json-editor{
  display: block;
  width: calc(400px);
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.json-preview{
  display: block;
  width: calc(100% - 400px);
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
