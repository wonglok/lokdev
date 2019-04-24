<template>
  <div class="full" :class="{ noscroll: !!enter }">
    <div class="left-right">
      <div class="left-div">
        <div class="wrapper-content">
          <db-title></db-title>
          <db-options v-if="dbTypes" :links="dbTypes" @item-click="(v) => { dbID = v.dbID }"></db-options>
          <db-collection-init v-if="root && dbID" :root="root" :dbInit="dbID"></db-collection-init>
          <list-keyname v-if="dbID && root" @enter="(v) => { enter = v }" :collection="root.dbs[dbID]"></list-keyname>
        </div>
      </div>
      <div class="right-div">
        <div class="wrapper-content">
          <h1 v-if="!!!enter">
            <img src="../assets/icons/enter-black.svg" alt="" />
            Please select item to start editing...
          </h1>
          <div v-else>
            <component v-if="dbID && root && enter && getItem(enter.oid)" :oid="enter.oid" :collection="root.dbs[dbID]" :root="root" :is="getCompos(dbID)"></component>
          </div>
        </div>
      </div>
    </div>

    <!-- <overlay v-if="enter" @enter="(v) => { enter = v }">
      <div v-if="enter" class="full">
        123
      </div>
    </overlay> -->
  </div>
</template>

<script>
import * as SDK from '../ui-database/sdk'

export default {
  components: {
    // 'overlay': require('../views-compos/overlay.vue').default,
    'edit-object': require('../views-compos/edit-object.vue').default,
    'edit-formula': require('../views-compos/edit-formula.vue').default,
    'edit-glsl': require('../views-compos/edit-glsl.vue').default,
    'edit-color': require('../views-compos/edit-color.vue').default,
    'edit-css': require('../views-compos/edit-css.vue').default,
    'edit-text': require('../views-compos/edit-text.vue').default,

    'list-keyname': require('../views-compos/list-keyname.vue').default,

    'db-collection-init': require('../views-compos/db-collection-init.vue').default,
    'db-options': require('../views-compos/db-options.vue').default,
    'db-title': require('../views-compos/db-title.vue').default
  },
  data () {
    return {
      enter: false,
      root: false,
      dbID: false,
      dbTypes: [
        {
          text: 'Text',
          compos: 'edit-text',
          dbID: 'text'
        },
        {
          text: 'CSS',
          compos: 'edit-css',
          dbID: 'css'
        },
        {
          text: 'Shaders',
          compos: 'edit-glsl',
          dbID: 'shader'
        },
        {
          text: 'Colors',
          compos: 'edit-color',
          dbID: 'color'
        },
        {
          text: 'Object3D',
          compos: 'edit-object',
          dbID: 'object'
        },
        {
          text: 'Layout3D',
          compos: 'edit-formula',
          dbID: 'formula'
        }
      ]
    }
  },
  watch: {
    dbID () {
      this.enter = false
    }
  },
  beforeDestroy () {
    this.clean()
  },
  methods: {
    getItem (oid) {
      return this.root.dbs[this.dbID].array.find(a => a.oid === oid)
    },
    getCompos (dbID) {
      return this.dbTypes.find(c => c.dbID === dbID).compos
    },
    onInit () {
      let cleaner = SDK.getRealTimeUpdates({
        getRoot: () => {
          return this.root
        },
        refresh: () => {
          var loop = (ea) => {
            ea.$children.forEach(e => {
              e.$forceUpdate()
              this.$nextTick(() => {
                loop(e)
              })
            })
          }
          loop(this)
        },
        onRootArrived: (data) => {
          this.root = data
          // console.log(JSON.stringify(data, null, '\t'))
        }
      })
      this.clean = () => {
        cleaner()
      }
    }
  },
  mounted () {
    this.onInit()
  }
}
</script>
<style>
@import url('../assets/source-sans-pro/source-sans-pro.css');
.clickable{
  cursor: pointer;
}
.iconer{
  width: 30px;
  height: 30px;
  margin: 10px;
}
.vertcenter{
  display: flex;
  align-items: center;
}
.noscroll{
  overflow: hidden;
}
</style>

<style>
.movin-enter-active, .movin-leave-active {
  transition: transform 0.9s 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: translateX(0);
}
.movin-enter, .movin-leave-to {
  transform: translateX(100vw);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style scoped>
.wrapper-content{
  margin: 25px;
  font-family: SourceSansPro-Regular, Arial, Helvetica, sans-serif !important;
}
.left-right{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}
.left-div{
  min-width: 450px;
  width: 50%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-image: linear-gradient(45deg, hotpink, cyan);
}
.right-div{
  width: 50%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(241, 241, 241);
}
</style>
