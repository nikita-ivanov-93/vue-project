import Vue from "vue"
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import axios from "axios";
axios.defaults.baseURL = "https://webdev-api.loftschool.com";
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
  async created() {
    const {data} = await axios.get("/reviews/464")
    this.reviews = data;
},
  
})