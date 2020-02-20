<template>
  <div>
    <h1>{{$route.name}}</h1>
      <el-table :data="heros">
        <el-table-column prop="_id" label="ID" width="300">
        </el-table-column>
        <el-table-column prop="name" label="英雄名">
        </el-table-column>
        <el-table-column prop="title" label="称号">
        </el-table-column>
        <el-table-column prop="icon" label="头像">
          <template slot-scope="scope">
              <img :src="scope.row.avatar" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push(`/heros/edit/${scope.row._id}`)">编辑</el-button>
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
            heros:[]
        }
    },
    created(){
     this.fetch()
    },
    methods:{
        async fetch(){
            const res = await this.$http.get("rest/heros")
            this.heros = res.data
        },
        async remove(row) {
            this.$confirm(`是否确定删除英雄 ${row.name}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                await this.$http.delete(`rest/heros/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()
            }).catch(()=>{})
        }
    }
}
</script>