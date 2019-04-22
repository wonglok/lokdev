<template>
  <div v-if="collection">
    <strong>{{ collection.dbID }} is a {{ collection.type }}</strong>
    <ul>
      <li><button @click="upsertDBO({ dbID: collection.dbID, obj: { oid: rID(), keyname: '', mode: 'layout', x: '', y: '', z: '0' }})">Add item</button></li>
      <li :key="item.id" v-for="item in collection.array">
        <input type="text" v-model="item.keyname" :class="{ duplicated: nameIsDuplicated(item.keyname) }" @input="upsertDBO({ dbID: collection.dbID, obj: item })">
        <br />
        <input type="text" class="numbers" placeholder="x" v-model="item.x" @input="upsertDBO({ dbID: collection.dbID, obj: item })">
        <input type="text" class="numbers" placeholder="y" v-model="item.y" @input="upsertDBO({ dbID: collection.dbID, obj: item })">
        <input type="text" class="numbers" placeholder="z" v-model="item.z" @input="upsertDBO({ dbID: collection.dbID, obj: item })">

        <button @click="removeDBO({ dbID: collection.dbID, obj: item })">Remove</button>
        <br />
        <span v-if="nameIsDuplicated(item.keyname)" class="duplicated">Keyname is duplicated</span>
      </li>
    </ul>
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
    },
    nameIsDuplicated (keyname) {
      return this.collection.array.filter(ins => ins.keyname === keyname).length >= 2
    }
  }
}
</script>

<style scoped>
.numbers{
  width: 60px;
}
.duplicated{
  color: red;
}
</style>
