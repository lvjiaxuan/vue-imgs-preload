export default {

  name: 'ImgsPreload',

  props: {

    imgs: {
      type: Array,
      require: true
    },

    preloadVisible: {
      type: Boolean,
      default: true
    },

    addConditionsNum: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {

      imgsLoaded: 0,
    }
  },

  computed: {

    imgsPercentage() {

      if(this.imgs.length === 0) return 0;
      return parseInt((this.imgsLoaded / (this.imgs.length + this.addConditionsNum)) * 100);
    }
  },

  watch: {

    imgsPercentage(val) {

      val >= 100 && this.imgsLoadedAll();
    }
  },

  created() {

    if(sessionStorage.getItem('imgsLoadedAll')) {
      this.imgsLoaded = this.imgs.length;
    } else {
      this.preloadImgs();
    }
  },

  methods: {

    preloadImgs() {

      if(this.imgs.length === 0) {
        this.imgsLoadedAll();
        return ;
      }

      this.imgs.forEach(item => {
        const img = new Image();
        img.onload = () => this.imgsLoaded++;
        img.onerror = () => this.imgsLoaded++;
        img.src = item;
      });
    },

    imgsLoadedAll() {

      this.$emit('imgsLoadedAll');
      this.$emit('update:preloadVisible', false);
      sessionStorage.setItem('imgsLoadedAll', 'imgsLoadedAll');
    }
  },

  render(h) {

    if(this.preloadVisible) {
      return  h(
        'div',
        {
          style: {
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            height: '100vh',
          }
        },
        [this.$scopedSlots.default({ imgsPercentage: this.imgsPercentage })]
      );
    } else {
      return h('');
    }
  }
}