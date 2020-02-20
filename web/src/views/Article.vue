<template>
  <div class="page-article" v-if="model">
    <div class="d-flex border-bottom text-blue pl-2 py-2">
      <div class="iconfont icon-helmet-battle"></div>
      <strong class="flex-1 text-ellipsis  pl-2">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xxs ">
        {{model.createdAt | date}}
      </div>
    </div>
    <div v-html="model.body" class="px-3 article-body"></div>
    <div class="px-3 py-2 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <span class="text-blue fs-lg ml-1">相关资讯</span>
      </div>
      <router-link 
        class="mt-2 text-ellipsis"
        tag="div" 
        v-for="item in model.related" 
        :key="item._id"
        :to="`/articles/${item._id}`"
      >{{item.title}}</router-link>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  watch:{
    id:"fetchArticle",
    // id(){
    //   this.fetchArticle()
    // }
  },
  filters:{
    date(val){
      return dayjs(val).format('YYYY/MM/DD')
    }
  },
  data(){
    return{
      model:null
    }
  },
  props:{
    id:{required:true}
  },
  methods:{
    async fetchArticle(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.fetchArticle()
  }
}
</script>
<style lang="scss">
  .page-article{
    .article-body{
      img{
        max-width: 100%;
        height:auto;
      }
    }
  }
</style>
