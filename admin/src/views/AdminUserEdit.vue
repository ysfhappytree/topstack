<template>
<div>
    <h1>{{$route.name}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
         <el-form-item >
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
            model:{},
        }
    },
    methods:{
        async save(){
            if(this.id){
                await this.$http.put(`rest/admin_user/${this.id}`,this.model)
            }else{
                await this.$http.post("rest/admin_user",this.model)
            }
            this.$router.push("/admin_user/list")
            this.$message({
                type:"success",
                message:"保存成功"
            })
        },
        async fetch(){
           const res = await this.$http.get(`rest/admin_user/${this.id}`)
           this.model = res.data
        }
    },
    created(){
        this.id && this.fetch()
    }
}
</script>