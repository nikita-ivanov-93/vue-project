import Vue from "vue"
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";


new Vue({
  el: "#slider-component",
  template: "#slider-container",
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: document.getElementById('reviews').offsetWidth <= 320 ? 1 :2,
        loop: false
      },
    }
  },
  computed: {
  },
  components: {
    Swiper, SwiperSlide
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        item.pic = require(`../images/content/${item.pic}`).default;
        return item;
      });
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper
      switch (direction) {
        case "next":
          slider.slideNext();
          break;
        case "prev":
          slider.slidePrev();
          break;
      }
    },
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  },
  
})