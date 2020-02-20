<template>
  <div>
    <h1>{{$route.name}}</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="300">
        </el-table-column>
        <el-table-column prop="username" label="分类名称">
        </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push(`/admin_user/edit/${scope.row._id}`)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    created(){
     this.fetch()
    },
    methods:{
        async fetch(){
            const res = await this.$http.get("rest/admin_user")
            this.items = res.data
        },
        async remove(row) {
            this.$confirm(`是否确定删除管理员 ${row.username}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`rest/admin_user/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                console.log(res.data)
                this.fetch()
            }).catch(()=>{})
        }
    }
}
</script>