<template>
  <div class="home">
    <InspectorEngine v-if="root" :root="root"></InspectorEngine>
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
        this.$children.forEach(e => e.$forceUpdate())
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
