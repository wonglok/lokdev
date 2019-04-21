<template>
  <div class="home">
    <pre v-if="root"><code>{{ root }}</code></pre>
  </div>
</template>

<script>
// @ is an alias to /src
import * as SDK from '../ui-database/sdk'

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      root: false
    }
  },
  mounted () {
    SDK.onRootDataArrive((data) => {
      this.root = data
      console.log('root updated', data)
    })
  }
}
</script>
