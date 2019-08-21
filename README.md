# vue-imgs-preload

![images](https://img.shields.io/badge/vue-2.6.10-brightgreen)
![images](https://img.shields.io/badge/vue--cli-3.x-lightgrey)

> 一个简单的图片预加载组件，提供简单的百分比预加载页面

## Install

```
npm i vue-imgs-preload
```

## Options

**props：**

|     Property     |                description                |  type   | default |
| :--------------: | :---------------------------------------: | :-----: | :-----: |
|       imgs       |           需要预加载的图片数组            |  Array  |    /    |
|  preloadVisible  | 预加载页面的显示隐藏，一般配合`.sync`使用 | Boolean |    /    |
| addConditionsNum |         对预加载有影响的因素个数          | Number  |    0    |

**Events：**

|    method     |        description         |
| :-----------: | :------------------------: |
| imgsLoadedAll | 所有图片预加载成功后的事件 |

## Usage

*imgsPercentage到100后的默认事件是`preloadVisible = false`*

**App.vue：**

```vue
<template>
  <main id="app">

    <imgs-preload ref="imgs-preload" class="imgs-preload-wrap" :imgs="imgs" :preload-visible.sync="preloadVisible" :add-conditions-num="addConditionsNum" @imgsLoadedAll="imgsLoadedAll">
      <template #default="{ imgsPercentage }">{{ imgsPercentage }}%</template>
    </imgs-preload>

    <template v-if="!preloadVisible">
      loaded!
    </template>
  </main>
</template>

<script>
import imgs from '@/assets/imgs.json'// 可以把所有图片名称遍历到一个json文件
import ImgsPreload from 'vue-imgs-preload'
  
export default {

  name: 'App',

  components: {
    ImgsPreload
  },

  data() {
    return {
      preloadVisible: true,
      addConditionsNum: 1,// 影响预加载的因素个数，比如有一个异步接口
    }
  },

  computed: {
    imgs() {
      return imgs.map(item => require('@/assets/images/' + item));
    }
  },
  
  created() {
    this.init();
  },
  
  methods: {
    
    init() {
      setTimeout(() => this.$refs['imgs-preload'].imgsLoaded++, 1000);
    },
    
    imgsLoadedAll() {
      // do sth...
    }
  }
}
</script>

<style>
#app { min-height: 100vh; }
.imgs-preload-wrap {
  background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
  color: #fff;
  font-size: .35rem;
}
</style>
```

