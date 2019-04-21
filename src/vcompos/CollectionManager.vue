<template>
  <div>
    <div> Status: <span v-if="saving">Saving Data...</span> <span v-if="!saving">Saved.</span> </div>

    <button @click="addTextDB()">Add Text DB</button>
    <button @click="addLayoutDB()">Add Layout DB</button>

    <nav v-if="root">
      Collections:
      <div :key="db.dbID" v-for="db in getDBS(root.dbs)">
        <span>{{ db.dbID }} is a {{ db.type }}</span>
        <button @click="$emit('dbID', db.dbID)">Open DB</button>
        <button @click="removeCollection({ dbID: db.dbID })">Remove DB: {{ db.dbID }}</button>
      </div>
    </nav>
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'

export default {
  props: {
    root: {
      required: true
    }
  },
  data () {
    return {
      saving: false
    }
  },
  methods: {
    getDBS (v) {
      if (!v || !this.root) {
        return []
      }
      return Object.keys(v || {}).map(kn => this.root.dbs[kn])
    },
    save () {
      this.saving = true
      SDK.save(this.root, () => {
        this.saving = false
      })
    },
    addTextDB () {
      let dbID = window.prompt('what is your database ID?')
      if (this.root.dbs[dbID]) {
        return window.alert('the database name is taken.')
      }
      if (dbID) {
        this.root.dbs[dbID] = this.root.dbs[dbID] || {
          dbID,
          type: 'textdb',
          array: []
        }
        this.save()
      }
    },
    addLayoutDB () {
      let dbID = window.prompt('what is your database ID?')
      if (this.root.dbs[dbID]) {
        return window.alert('the database name is taken.')
      }
      if (dbID) {
        this.root.dbs[dbID] = this.root.dbs[dbID] || {
          dbID,
          type: 'layoutdb',
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
    }
  }
}
</script>

<style>

</style>
