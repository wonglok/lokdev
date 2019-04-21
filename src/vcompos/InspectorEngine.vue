<template>
  <div class="home">
    <div v-if="root">
      <div> Status: <span v-if="saving">Saving Data...</span> <span v-if="!saving">Saved.</span> </div>
      <button @click="addTextDB()">Add Text DB</button>

      <nav>
        Collections:
        <div :key="db" v-for="db in getKeys(root.dbs)">
          <div v-if="db">
            <span>{{ db }}</span>
            <button @click="dbID = db">Open DB</button>
            <button @click="removeCollection({ dbID: db })">Remove DB: {{ db }}</button>
          </div>
        </div>
      </nav>

      <div v-if="dbID && root.dbs[dbID] && root">
        <hr>
        <strong>{{ dbID }}</strong>
        <ul>
          <li><button @click="upsertDBO({ dbID, obj: { oid: rID(), keyname: '', text: 'new item' }})">Add item</button></li>
          <li :key="item.id" v-for="item in root.dbs[dbID].array">
            <input type="text" v-model="item.keyname" @input="upsertDBO({ dbID, obj: item })">
            <input type="text" v-model="item.text" @input="upsertDBO({ dbID, obj: item })">

            <button @click="removeDBO({ dbID, obj: item })">Remove</button>
          </li>
        </ul>
      </div>

    </div>
    <pre v-if="root"><code>{{ root }}</code></pre>
  </div>
</template>

<script>
// @ is an alias to /src
import * as SDK from '../ui-database/sdk'

export default {
  name: 'inspector-engine',
  components: {
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
      dbs: [],
      clean () {},
      rID () {
        return `o_${Math.floor(Math.random() * 100000000000)}`
      },
      getKeys: (v) => {
        return Object.keys(v || {})
      },
      dbID: false
    }
  },
  beforeDestroy () {
    this.clean()
  },
  methods: {
    save () {
      this.saving = true
      SDK.save(this.root, () => {
        this.saving = false
      })
    },
    addTextDB () {
      let dbID = window.prompt('what is your database ID?')
      if (dbID) {
        this.root.dbs[dbID] = this.root.dbs[dbID] || {
          type: 'textdb',
          array: []
        }
        this.save()
      }
    },
    removeCollection ({ dbID }) {
      if (window.prompt(`Please enter '${dbID}' to delete collection`) === dbID && window.confirm('Fianl Confirm.')) {
        delete this.root.dbs[dbID]
        this.save()
      }
    },
    upsertDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'upsert', oid: obj.oid, data: obj })
    },
    removeDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'remove', oid: obj.oid, data: obj })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin-bottom: 40px;
}

</style>
