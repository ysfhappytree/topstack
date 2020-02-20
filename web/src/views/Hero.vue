<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-1 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-grow-1 text-left">
        <span>王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;&gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="my-1 fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div>{{model.categories.map( v=> v.name).join("/")}}</div>
        <div class="d-flex jc-between ai-center pt-1">
          <div class="scores" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary px-1 mx-1">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue px-1 mx-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger px-1 mx-1">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark-1 px-1 mx-1">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤：2 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="px-3 bg-white">
      <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>
    <swiper>
      <swiper-slide>
        <div>
          <div class="p-3 bg-white border-bottom">
            <!-- button -->
            <div class="d-flex">
              <router-link tag="button" to class="btn flex-1 btn-lg">
                <i class="iconfont icon-Scroll"></i>
                英雄介绍视频
              </router-link>
              <router-link tag="button" to class="btn flex-1 ml-2 btn-lg">
                <i class="iconfont icon-Scroll"></i>
                一图识英雄
              </router-link>
            </div>
            <!-- skills -->
            <div class="skills mt-4">
              <div class="d-flex jc-around">
                <img
                  class="icon"
                  :class="{active:currentSkillIndex === i}"
                  @click="currentSkillIndex = i"
                  :src="item.icon"
                  v-for="(item,i) in model.skills"
                  :key="item._id"
                />
              </div>
              <div v-if="currentSkill">
                <div class="d-flex pt-4 pb-3">
                  <h3 class="m-0">{{currentSkill.name}}</h3>
                  <span
                    class="text-grey-1 ml-4 fs-sm"
                  >(冷却值：{{currentSkill.delay}}消耗：{{currentSkill.cost}})</span>
                </div>
                <p>{{currentSkill.discription}}</p>
                <div class="border-bottom"></div>
                <p class="text-grey-1 fs-sm">小提示：{{currentSkill.tips}}</p>
              </div>
            </div>
            <!-- item -->
            
          </div>
            <m-card plain icon="menu1" title="出装推荐" class="items">
                <div class="fx-xl mb-2">顺丰出装</div>
                <div class="d-flex jc-around border-bottom pb-2">
                  <div v-for="item in model.items1" :key="item.name">
                    <img :src="item.icon" alt="" class="icon">
                    <div class="fs-xxs">{{item.name}}</div>
                  </div>
                </div>
                <div class="fx-xl mb-2 mt-3">韵达出装</div>
                <div class="d-flex jc-around">
                  <div v-for="item in model.items2" :key="item.name">
                    <img :src="item.icon" alt="" class="icon">
                    <div class="fs-xxs">{{item.name}}</div>
                  </div>
                </div>
            </m-card>

            <m-card plain icon="menu1" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="menu1" title="对抗技巧">  
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="menu1" title="团战思路">  
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>

            <m-card plain icon="menu1" title="英雄关系">  
              <div class="fx-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name"
              class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50">
                <p class="flex-1 ml-3 m-0">{{item.discription}}</p>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
        </div>
      </swiper-slide>
      <swiper-slide>第二页</swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    };
  },
  methods: {
    async fetchHeroDetail() {
      const res = await this.$http.get(`/herosdetail/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetchHeroDetail();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: 100% auto;
    .badge {
      border-radius: 50%;
      font-size: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .skills {
    img.icon {
      width: 4.6154rem;
      height: 4.6154rem;
      border: 3px solid map-get($colors, "white");
      border-radius: 45%;
      &.active {
        border-color: map-get($colors, "primary");
        border-radius: 45%;
      }
    }
  }
  .items{
    img.icon{
      width: 3.8462rem;
      height: 3.8462rem;
      border-radius: 50%;
    }
  }
}
</style>