<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router unique-opened :default-active="$route.path" >
      <el-submenu v-for="(first,i) in MenuList" :key="i" :index="first.index">
        <template slot="title"><i class="el-icon-message"></i>{{first.name}}</template>
         <el-menu-item-group v-for="(second,j) in first.submenu" :key="j">
         <template slot="title">{{second.title}}</template>
          <el-menu-item 
            :index="third.herf" 
            v-for="(third,k) in second.subclass" 
            :key="k">
            {{third.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown  @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{currentUser}}</span>
    </el-header>
    
    <el-main>
      {{this.$route.name == "Main"?`欢迎访问后台管理系统,${currentUser}`:""}}
     <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-menu {
    height: 100%;
  }
</style>

<script>
  export default {
    data() {
      return {
        MenuList:JSON.parse(localStorage.MenuList),
        currentUser:localStorage.currentUser
      }
    },
    methods:{
      logout(){
        localStorage.clear()
        this.$router.push("/login")
      },
      handleCommand(command){
        switch(command){
          case "logout" :
            this.logout()
            this.$message("退出登录");
            break;
          default:
            break;
        }
        
      }
    },
    created(){
    }
  };

</script>
