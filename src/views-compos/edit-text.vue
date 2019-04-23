<template>
  <div>
    <h1>
      Text
    </h1>
    <p>
      Text DB stores text for you.
    </p>
    <textarea v-model="getItem().text" cols="70" rows="20"  @input="upsertDBO({ dbID: collection.dbID, obj: getItem() })"></textarea>

  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'

export default {
  props: {
    oid: {
      required: true
    },
    collection: {
      required: true
    }
  },
  methods: {
    getItem () {
      return this.collection.array.find(a => a.oid === this.oid)
    },
    rID () {
      return `o_${Math.floor(Math.random() * 100000000000)}`
    },
    upsertDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'upsert', oid: obj.oid, data: obj })
      this.$forceUpdate()
    },
    removeDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'remove', oid: obj.oid, data: obj })
    }
  }
}
</script>

<style>

</style>
