<template>
  <div>
    <h1>
      Numbers: <input type="text" class="input-keynanme" v-model="getItem().keyname" @input="save">
    </h1>

    <!-- <ACE style="width: 100%; height: 400px; overflow: hidden;" :mode="'glsl'" :getter="() => { return getItem().glsl }" :setter="(v) => { getItem().glsl = v; save(); }"></ACE> -->
    <!-- <pre><code class="javascript" v-html="`SDK.getNumbers(root, '${getItem().keyname}');`"></code></pre> -->

    <strong class="labelme">item.position.x</strong>
    <input type="range" @input="save" v-model="getItem().position.x" min="-100" max="100" step="0.01"><input type="number" @input="save" v-model="getItem().position.x">
    <br />
    <strong class="labelme">item.position.y</strong>
    <input type="range" @input="save" v-model="getItem().position.y" min="-100" max="100" step="0.01"><input type="number" @input="save" v-model="getItem().position.y">
    <br />
    <strong class="labelme">item.position.z</strong>
    <input type="range" @input="save" v-model="getItem().position.z" min="-100" max="100" step="0.01"><input type="number" @input="save" v-model="getItem().position.z">

    <hr>

    <strong class="labelme">item.scale.x</strong>
    <input type="range" @input="save" v-model="getItem().scale.x" min="-10" max="10" step="0.01"><input type="number" @input="save" v-model="getItem().scale.x">
    <br />
    <strong class="labelme">item.scale.y</strong>
    <input type="range" @input="save" v-model="getItem().scale.y" min="-10" max="10" step="0.01"><input type="number" @input="save" v-model="getItem().scale.y">
    <br />
    <strong class="labelme">item.scale.z</strong>
    <input type="range" @input="save" v-model="getItem().scale.z" min="-10" max="10" step="0.01"><input type="number" @input="save" v-model="getItem().scale.z">

    <hr>

    <strong class="labelme">item.rotation.x</strong>
    <input type="range" @input="save" v-model="getItem().rotation.x" :min="-pi * 4.0" :max="pi * 4.0" step="0.01"><input type="number" @input="save" v-model="getItem().rotation.x">
    <br />
    <strong class="labelme">item.rotation.y</strong>
    <input type="range" @input="save" v-model="getItem().rotation.y" :min="-pi * 4.0" :max="pi * 4.0" step="0.01"><input type="number" @input="save" v-model="getItem().rotation.y">
    <br />
    <strong class="labelme">item.rotation.z</strong>
    <input type="range" @input="save" v-model="getItem().rotation.z" :min="-pi * 4.0" :max="pi * 4.0" step="0.01"><input type="number" @input="save" v-model="getItem().rotation.z">

    <pre><code class="javascript" v-html="`SDK.getItem(root, '${collection.dbID}', '${getItem().keyname}');`"></code></pre>

    <pre><code class="javascript" v-html="getJSON()"></code></pre>
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'
// import ACE from '../views-compos/br-ace.vue'
export default {
  components: {
    // ACE
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
      pi: Math.PI,
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
      let item = this.collection.array.find(a => a.oid === this.oid)
      item.position = item.position || { x: 0, y: 0, z: 0 }
      item.rotation = item.rotation || { x: 0, y: 0, z: 0 }
      item.scale = item.scale || { x: 0, y: 0, z: 0 }
      return item
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
.labelme{
  width: 120px;
  display: inline-block;
}
</style>
