<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/8763ca2891599bfbfd8449e661625da0.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/cc7fff1deca48b4169bd6c826d250501.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/d8dc5fbf1aa475b34ff770731ab42a1a.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center text-dark-1 pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of icons -->

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
     <template #items="{category}">
        <router-link
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class='text-info'>[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
     </template>
    </m-list-card>

    <m-list-card icon="helmet-battle" title="英雄列表" :categories="herosCats">
     <template #items="{category}">
       <div class="d-flex flex-wrap">
        <router-link class="p-2 text-center" 
        v-for="(hero,i) in category.heroList" 
        :key="i" style="width:20%"
        :to="`/herodetail/${hero._id}`"
        >
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.name}}</div>
        </router-link>
       </div>
        
     </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        loop: true,
        autoplay: true
      },
      newsCats:[],
      herosCats:[]
    };
  },
  methods:{
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHerosCats(){
      const res = await this.$http.get('heros/list')
      this.herosCats = res.data
    }
  },
  created(){
     this.fetchNewsCats()
     this.fetchHerosCats()
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $boder-color;
  border-bottom: 1px solid $boder-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $boder-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>