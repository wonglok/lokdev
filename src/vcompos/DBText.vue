<template>
  <div>
    <div v-if="collection">
      <strong>{{ collection.dbID }} is a {{ collection.type }}</strong>
      <ul>
        <li><button @click="upsertDBO({ dbID: collection.dbID, obj: { oid: rID(), keyname: '', text: 'new item' }})">Add item</button></li>
        <li :key="item.id" v-for="item in collection.array">
          <input type="text" v-model="item.keyname" @input="upsertDBO({ dbID: collection.dbID, obj: item })">
          <input type="text" v-model="item.text" @input="upsertDBO({ dbID: collection.dbID, obj: item })">
          <button @click="removeDBO({ dbID: collection.dbID, obj: item })">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'

export default {
  props: {
    collection: {}
  },
  data () {
    return {
    }
  },
  methods: {
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

<style>

</style>
