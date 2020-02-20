<template>
        <div class="card p-3 mt-3 bg-white">
      <div class="card-header d-flex" 
        :class="{'border-bottom':!plain,'pb-3':!plain}">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
        <i class="icon-menu iconfont" v-if="!plain"></i>
      </div>
      <div class="card-body pt-3 ">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean,}
    }
}
</script>
<style lang="scss">
    @import '../assets/scss/variables.scss';
    .card{
        border-bottom:1px solid $boder-color;
    }
</style>