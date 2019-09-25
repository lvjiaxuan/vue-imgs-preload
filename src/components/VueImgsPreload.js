export default {

  name: 'VueImgsPreload',

  props: {

    imgs: {
      type: Array,
      require: true
    },

    preloadVisible: {
      type: Boolean,
      require: true
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

      if(this.imgs.length === 0 && this.addConditionsNum === 0) return 100;
      return parseInt((this.imgsLoaded / (this.imgs.length + this.addConditionsNum)) * 100);
    }
  },

  watch: {

    imgsPercentage(val) {

      val >= 100 && this.imgsLoadedAll();
    }
  },

  created() {

    this.preloadImgs();
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