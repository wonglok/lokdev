
<template>
  <div>
    <div v-if="collection">

      <div class="adder" @click="onAdd">
        <img class="add-icon" src="../assets/icons/add-black.svg" title="add-entry" alt="add-entry">
      </div>

      <!-- <strong>{{ collection.dbID }} is a {{ collection.type }}</strong> -->
      <div>
        <div class="item-entry" :key="item.id" v-for="item in collection.array.filter(a => !a.trashed)">
          <div class="dot-li">
            <div class="dot-keyname">
              <div class="dot" ref="clickers" @click="$emit('enter', { dbID: collection.dbID, oid: item.oid })"></div>
              <div>
                <input type="text" class="input-keynanme" v-model="item.keyname" :class="{ duplicated: nameIsDuplicated(item.keyname) }" @input="upsertDBO({ dbID: collection.dbID, obj: item })">
                <div>
                  <div class="dot-desc">
                    <span v-if="nameIsDuplicated(item.keyname) && item.keyname" class="duplicated">Keyname is duplicated</span>
                  </div>
                  <div class="dot-desc">
                    <span v-if="item.keyname === ''" class="warn">Please give it a keyname.</span>
                  </div>
                </div>
              </div>
              <div class="dot-vis-icon">
                <img class="dot-vis-icon-img" src="../assets/icons/enter-black.svg" @click="$emit('enter', { dbID: collection.dbID, oid: item.oid })" alt="remove" title="remove item" />
              </div>
              <div class="dot-vis-icon">
                <img class="dot-vis-icon-img" src="../assets/icons/trash-black.svg" @click="transhItem({ item, collection })" alt="remove" title="remove item" />
              </div>
            </div>
          </div>
          <!-- <input type="text" v-model="item.text" @input="upsertDBO({ dbID: collection.dbID, obj: item })"> -->
        </div>

        <div v-if="collection.array.filter(a => a.trashed).length > 0">
          <div style="height: 1px; background-color: black; width: 100%; margin: 30px 0px"></div>
          <h2>
            Trashed items
          </h2>
          <div class="vertcenter">
            Confirm to delete:
            <img class="clickable iconer" v-if="protectedRemove" @click="protectedRemove = !protectedRemove" src="../assets/icons/switch-on-black.svg" alt="Switched On">
            <img class="clickable iconer" v-if="!protectedRemove" @click="protectedRemove = !protectedRemove" src="../assets/icons/switch-off-black.svg" alt="Switched Off">
          </div>
          <div>
            <div class="vertcenter" :key="item.id" v-for="(item, ii) in collection.array.filter(a => a.trashed)">
              <img class="iconer" src="../assets/icons/restore-green.svg" @click="restoreItem({ item, collection })" alt="remove" title="remove item" />
              <img class="iconer" src="../assets/icons/remove-red.svg" @click="removeDBO({ dbID: collection.dbID, obj: item })" alt="remove" title="remove item" />
              <strong>{{ item.keyname || ('Tashed item ' + ii) }}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'

export default {
  props: {
    collection: {
      required: true
    }
  },
  data () {
    return {
      protectedRemove: true
    }
  },
  watch: {
    'collection.type': {
      deep: true,
      handler () {
        // this.createExample()
      }
    }
  },
  methods: {
    restoreItem ({ item, collection }) {
      item.trashed = false
      this.upsertDBO({ dbID: collection.dbID, obj: item })
    },
    transhItem ({ item, collection }) {
      if (item.keyname === '') {
        SDK.doDBO({ db: collection.dbID, op: 'remove', oid: item.oid, data: item })
      } else {
        item.trashed = true
        this.upsertDBO({ dbID: collection.dbID, obj: item })
      }
      this.$forceUpdate()
    },
    rID () {
      return `o_${Math.floor(Math.random() * 100000000000)}`
    },
    upsertDBO ({ dbID, obj }) {
      SDK.doDBO({ db: dbID, op: 'upsert', oid: obj.oid, data: obj })
    },
    removeDBO ({ dbID, obj }) {
      if (this.protectedRemove) {
        if (window.confirm(`Remove item ${obj.keyname}?`)) {
          SDK.doDBO({ db: dbID, op: 'remove', oid: obj.oid, data: obj })
        }
      } else {
        SDK.doDBO({ db: dbID, op: 'remove', oid: obj.oid, data: obj })
      }
    },
    nameIsDuplicated (keyname) {
      return this.collection.array.filter(ins => ins.keyname === keyname).length >= 2
    },
    onAdd () {
      if (this.collection.array.length === 0) {
        this.createExample()
      } else {
        this.upsertDBO({
          dbID: this.collection.dbID,
          obj: {
            oid: this.rID(),
            trashed: false,
            keyname: `${this.collection.dbID}_${Math.floor(this.collection.array.length + 1)}`
          }
        })
      }
    },
    createExample () {
      if (this.collection.array.length === 0) {
        this.upsertDBO({
          dbID: this.collection.dbID,
          obj: {
            trashed: false,
            oid: this.rID(),
            keyname: `${this.collection.dbID}_1`
          }
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.clickers && this.$refs.clickers[0]) {
        this.$refs.clickers[0].click()
      }
    })
    // this.createExample()
  }
}
</script>

<style scoped>
.duplicated{
  color: rgb(0, 0, 0);
}
.warn{
  color: rgb(0, 0, 0);
}
.adder{
  cursor: pointer;
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
}
.adder .add-icon{
  width: 50px;
  height: 50px;
}
.dot{
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: inline-block;
  border: black solid 4px;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  transition: background-color 0.5s;
  margin-top: 10px;
  margin-right: 10px;
}
.dot-keyname{
  display: flex;
}
.item-entry:hover .dot{
  background-color: black;
}
.dot-li{
  margin-left: 10px;
}
.item-entry{
  margin-bottom: 26px;
  display: flex;
  align-items: flex-start;
}

.input-keynanme{
  background-color: transparent;
  font-size: 30px;
  border: none;
  box-shadow: none;
  appearance: none;
  padding-bottom: 5px;
  border-bottom: black solid 3px;
}
input:focus{
  outline: 0px transparent;
}

.dot-hov-show-img,
.dot-vis-icon-img{
  transition: 0.25s opacity;
  opacity: 0;
  margin-top: 5px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.dot-vis-icon-img{
  opacity: 1;
  cursor: pointer;
}
.item-entry:hover .dot-vis-icon-img{
  opacity: 1;
}
.item-entry:hover .dot-hov-show-img{
  opacity: 1;
}
</style>
