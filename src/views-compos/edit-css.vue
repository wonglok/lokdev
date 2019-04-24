<template>
  <div>
    <h1>
      CSS: <input type="text" class="input-keynanme" v-model="getItem().keyname" @input="save">
    </h1>
    <ACE style="width: 100%; height: 400px; overflow: hidden;" :mode="'css'" :getter="() => { return getItem().css }" :setter="(v) => { getItem().css = v; save(); }"></ACE>
    <!-- <pre><code class="javascript" v-html="`SDK.getCSS(root, '${getItem().keyname}');`"></code></pre> -->
    <pre><code class="javascript" v-html="`SDK.getItem(root, '${collection.dbID}', '${getItem().keyname}');`"></code></pre>

    <pre><code class="javascript" v-html="getJSON()"></code></pre>
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'
import ACE from '../views-compos/br-ace.vue'
export default {
  components: {
    ACE
  },
  props: {
    oid: {
      required: true
    },
    collection: {
      required: true
    }
  },
  watch: {
  },
  data () {
    return {
      tt: 0
    }
  },
  mounted () {
    this.highlight()
  },
  updated () {
    this.highlight()
  },
  methods: {
    highlight () {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightBlock(block)
      })
    },
    save () {
      this.upsertDBO({ dbID: this.collection.dbID, obj: this.getItem() })
    },
    getJSON () {
      let template = `var root = {
  dbs: {
    ${this.collection.dbID}: {
      dbID: '${this.collection.dbID}',
      type: '${this.collection.type}',
      array: [
${JSON.stringify(this.getItem(), null, '  ').split('\n').map(j => '        ' + j).join('\n')},
        // ... other item
      ]
    },
    // ... other db
  }
};
`
      return template
    },
    getItem () {
      return this.collection.array.find(a => a.oid === this.oid)
    },
    rID () {
      return `o_${Math.floor(Math.random() * 100000000000)}`
    },
    upsertDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'upsert', oid: obj.oid, data: obj })
    },
    removeDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'remove', oid: obj.oid, data: obj })
    }
  }
}
</script>

<style scoped>
.ta-keynanme{
  width: 80%;
  font-family: SourceSansPro-Regular, Arial, Helvetica, sans-serif;
  background-color: transparent;
  font-size: 18px;
  border: none;
  box-shadow: none;
  appearance: none;
  padding: 5px;
  border: black solid 3px;
}
.input-keynanme{
  font-family: SourceSansPro-Regular, Arial, Helvetica, sans-serif;
  background-color: transparent;
  font-size: 30px;
  border: none;
  box-shadow: none;
  appearance: none;
  padding-bottom: 5px;
  border-bottom: black solid 3px;
}
textarea:focus,
input:focus{
  outline: 0px transparent;
}
</style>
