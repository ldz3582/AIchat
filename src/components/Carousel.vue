
<!--这里是实现一个轮播图效果-->
<template>
    <div class="carousel-container">
      <swiper
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
       
      >
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="image" alt="轮播图" />
        </swiper-slide>
      </swiper>
    </div>
  </template>
   <!-- navigation  启用导航箭头 -->
  <script>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import { Autoplay as SwiperAutoplay, Navigation as SwiperNavigation, Pagination as SwiperPagination } from "swiper/modules";
  
//  把 `import` 移到 `script` 顶部
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';


export default {
  components: { Swiper, SwiperSlide },
  setup() {
    const images = [pic1, pic2,pic3,pic4];
    return { images, SwiperAutoplay, SwiperNavigation, SwiperPagination };
  },
};
  </script>
  
  <style scoped>
  .carousel-container {
    width: 100%;
    height:100%;
    /* max-width: 500px; 限制最大宽度 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-container{
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: cover;
  }
  </style>