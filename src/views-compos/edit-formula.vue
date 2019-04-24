<template>
  <div>
    <h1>
      Layout: <input type="text" class="input-keynanme" v-model="getItem().keyname" @input="save">
    </h1>

    <p>
      This can be used for Responsive Three.js Layout Library. (work in progress.)
    </p>

    <ACE style="width: 100%; height: calc(50px); overflow: hidden;" :mode="'text'" :getter="() => { return getItem().position }" :setter="(v) => { getItem().position = v; save(); }"></ACE>
    <ACE style="width: 100%; height: calc(100px); overflow: hidden;" :mode="'text'" :getter="() => { return getItem().fx }" :setter="(v) => { getItem().fx = v; save(); }"></ACE>
    <ACE style="width: 100%; height: calc(100px); overflow: hidden;" :mode="'text'" :getter="() => { return getItem().fy }" :setter="(v) => { getItem().fy = v; save(); }"></ACE>
    <ACE style="width: 100%; height: calc(100px); overflow: hidden;" :mode="'text'" :getter="() => { return getItem().fz }" :setter="(v) => { getItem().fz = v; save(); }"></ACE>
    <pre><code class="javascript" v-html="`SDK.getItem(root, '${collection.dbID}', '${getItem().keyname}');`"></code></pre>

    <!-- <pre><code class="javascript" v-html="`SDK.getShader(root, '${getItem().keyname}');`"></code></pre> -->
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
    log (v) {
      console.log(v)
    },
    runlayout () {

    },
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
