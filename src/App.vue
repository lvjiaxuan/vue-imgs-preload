<template>
  <div id="app">
    
    <vue-imgs-preload ref="imgs-preload" class="imgs-preload-wrap" :imgs="imgs" :preload-visible.sync="preloadVisible">
      <template #default="{ imgsPercentage }">{{ imgsPercentage }}%</template>
    </vue-imgs-preload>

    <section v-if="!preloadVisible">
      loaded!
    </section>

  </div>
</template>

<script>
import VueImgsPreload from '@/components/VueImgsPreload'

export default {

  name: 'app',

  components: {
    VueImgsPreload
  },

  data() {
    return {

      imgs: [require('@/assets/logo.png')],
      preloadVisible: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
