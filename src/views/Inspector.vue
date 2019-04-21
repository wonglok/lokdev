<template>
  <div class="full">
    <InspectorEngine class="full" v-if="root" :root="root"></InspectorEngine>
  </div>
</template>

<script>
// @ is an alias to /src
import * as SDK from '../ui-database/sdk'

export default {
  name: 'home',
  components: {
    InspectorEngine: require('../vcompos/InspectorEngine.vue').default
  },
  data () {
    return {
      root: false
    }
  },
  beforeDestroy () {
    this.clean()
  },
  methods: {
  },
  mounted () {
    let cleaner = SDK.getRealTimeUpdates({
      getRoot: () => {
        return this.root
      },
      refresh: () => {
        function loop (ea) {
          ea.$children.forEach(e => {
            e.$forceUpdate()
            loop(e)
          })
        }
        loop(this)
      },
      onRootArrived: (data) => {
        this.root = data
      }
    })
    this.clean = () => {
      cleaner()
    }
  }
}
</script>
