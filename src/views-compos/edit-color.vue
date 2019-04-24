<template>
  <div>
    <h1>
      Color: <input type="text" class="input-keynanme" v-model="getItem().keyname" @input="save">
    </h1>

    <div class="flexrow">
      <Chrome v-model="getColor().colors" @input="save"></Chrome>
      <div style="margin-left: 20px;">
        <p>Scheme</p>
        <select v-model="getItem().scheme" @change="save">
          <option :key="sc" :value="sc" v-for="sc in schemes">{{ sc }}</option>
        </select>

        <p>Variation</p>
        <select v-model="getItem().variation" @change="save">
          <option :key="sc" :value="sc" v-for="sc in variations">{{ sc }}</option>
        </select>

        <p>Distance</p>
        <input type="range" v-model="getItem().distance" min="0" max="1" step="0.0001" @input="save" />
      </div>
    </div>

    <div class="flexrow" style="margin-top: 20px;">
      <div class="colorBox">
        <div style="width: 100%; height: 100%;" @click="copy(getColor().colors.hex)" :style="{ backgroundColor: getColor().colors.hex8, textAlign: 'center', textShadow: '0px 0px 4px white', lineHeight: '60px' }">{{ getColor().colors.hex }}</div>
      </div>
    </div>
    <div :key="intt + 'intt'" v-for="intt in [0 * 4, 1 * 4, 2 * 4, 3 * 4]">
      <div class="flexrow" v-if="getColor().others && getOtherColor(intt + 0)">
        <div class="colorvar"><div @click="copy(getOtherColor(intt + 0))" :style="{ width: '100%', height: '100%', textAlign: 'center', textShadow: '0px 0px 4px white', lineHeight: '60px', opacity: opacity, backgroundColor: getOtherColor(intt + 0) }">{{ getOtherColor(intt + 0) }}</div></div>
        <div class="colorvar"><div @click="copy(getOtherColor(intt + 1))" :style="{ width: '100%', height: '100%', textAlign: 'center', textShadow: '0px 0px 4px white', lineHeight: '60px', opacity: opacity, backgroundColor: getOtherColor(intt + 1) }">{{ getOtherColor(intt + 1) }}</div></div>
        <div class="colorvar"><div @click="copy(getOtherColor(intt + 2))" :style="{ width: '100%', height: '100%', textAlign: 'center', textShadow: '0px 0px 4px white', lineHeight: '60px', opacity: opacity, backgroundColor: getOtherColor(intt + 2) }">{{ getOtherColor(intt + 2) }}</div></div>
        <div class="colorvar"><div @click="copy(getOtherColor(intt + 3))" :style="{ width: '100%', height: '100%', textAlign: 'center', textShadow: '0px 0px 4px white', lineHeight: '60px', opacity: opacity, backgroundColor: getOtherColor(intt + 3) }">{{ getOtherColor(intt + 3) }}</div></div>
      </div>
    </div>

    <!-- <ACE style="width: 100%; height: 400px; overflow: hidden;" :mode="'glsl'" :getter="() => { return getItem().glsl }" :setter="(v) => { getItem().glsl = v; save(); }"></ACE> -->
    <pre><code class="javascript" v-html="`SDK.getItem(root, '${collection.dbID}', '${getItem().keyname}');`"></code></pre>
    <pre><code class="javascript" v-html="getJSON()"></code></pre>
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'
// import ACE from '../views-compos/br-ace.vue'
import { Chrome } from 'vue-color'
var ColorScheme = require('color-scheme')
const copy = require('copy-text-to-clipboard')

export default {
  components: {
    // ACE,
    Chrome
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
    oid () {
      this.highlight()
      this.getOthers()
    }
  },
  created () {

  },
  data () {
    return {
      opacity: 1,
      schemes: ['mono', 'contrast', 'triade', 'tetrade', 'analogic'],
      variations: ['default', 'pastel', 'soft', 'light', 'hard', 'pale'],
      distance: 0.75,
      scheme: 'triade',
      variation: 'soft',
      tt: 0
    }
  },
  computed: {
  },
  mounted () {
    this.highlight()
    this.getOthers()
  },
  updated () {
    this.highlight()
  },
  methods: {
    copy (val) {
      copy(val)
      window.alert(`Coped Color: ${val}`)
    },
    getOtherColor (idx) {
      return this.getColor().others[idx]
    },
    getOthers () {
      let item = this.getItem()
      var scheme = new ColorScheme()
      if (!item || !item.colors) {
        return
      }
      scheme.from_hue(item.colors.hsl.h)
        .distance(item.distance)
        .scheme(item.scheme)
        .variation(item.variation)

      var colors = scheme.colors()
      item.others = colors.map(c => `#${c}`)
      this.opacity = item.colors.hsl.a
      this.$forceUpdate()
    },
    getColor () {
      let item = this.getItem()
      /* estlint-disable */
      item.colors = item.colors || {
        'hsl': {
          'h': 204.7058823529417,
          's': 0.5410695022345507,
          'l': 0.45228330000000005,
          'a': 1
        },
        'hex': '#357EB2',
        'hex8': '#357EB2FF',
        'rgba': {
          'r': 53,
          'g': 126,
          'b': 178,
          'a': 1
        },
        'hsv': {
          'h': 204.7058823529417,
          's': 0.7021999999999999,
          'v': 0.6970000000000001,
          'a': 1
        },
        'oldHue': 204.7058823529417,
        'source': 'hsva',
        'a': 1
      }
      /* eslint-enable */
      return item
    },
    highlight () {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightBlock(block)
      })
    },
    save () {
      clearTimeout(this.tt)
      this.tt = setTimeout(() => {
        this.getOthers()
        this.upsertDBO({ dbID: this.collection.dbID, obj: this.getItem() })
      }, 1000 / 120)
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
      item.variation = item.variation || this.variations[0]
      item.scheme = item.scheme || this.schemes[0]
      item.distance = item.distance || this.distance
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

.colorBox{
  background-image: url('../assets/bg/checkerbox.png');
  display: inline-block;
  width: calc(100%);
  height: 60px;
}

.colorvar{
  background-image: url('../assets/bg/checkerbox.png');
  display: inline-block;
  height: 60px;
  width: 25%;
}

.flexrow{
  display: flex;
  color: black;
}

</style>
