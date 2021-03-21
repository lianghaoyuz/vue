<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/info' }">教师评价情况</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <el-row :gutter="20">
            <el-col :span="6">
                <div>
                    <el-input placeholder="请输入内容" v-model="query" clearable @clear="getInfo">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </div>
             </el-col>
             <el-col :span="6">
                <el-button type="primary" @click="getUserList">搜索教师</el-button>
             </el-col>
             </el-row>

              <el-table border :data="userList" style="width: 100%">
                <el-table-column type="index"></el-table-column>
                
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="id" label="用户id" width="300"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="300"></el-table-column>
             <el-table-column width="180px" label="操作">
                    <template v-slot="scope">
                <el-tooltip class="item" effect="dark" content="删除老师" :enterable="false" placement="top-start">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button> 
                     </el-tooltip>   
                    <el-tooltip class="item" effect="dark" content="查看评价" :enterable="false" placement="top-start">
                     <el-button type="primary" icon="el-icon-search" size="mini" @click="getComments(scope.row.username,scope.row.id)"></el-button> 
                     </el-tooltip>   
                    </template>
            </el-table-column>
                 </el-table>
  </el-card>

<el-dialog :title=" '姓名：'+ this.active_teacher" :visible.sync="dialogVisible" width="50%" >
    满意度：
  <el-progress :percentage="this.score"></el-progress>
  <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="(item ,index) in this.comments" :key="index">
        <h3 class="small">{{ `第${index+1}页`}}</h3>
        <span style="text-">评价</span>
        <h2>{{item}}</h2>
      </el-carousel-item>
    </el-carousel>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" >关闭</el-button>
  </span>
</el-dialog>
<el-pagination
    layout="prev, pager, next,total, jumper"
    :page-count="Math.ceil(this.total/this.params.size)"
    :total="this.total" :size="5" :current-page="params.pagenum" @current-change="handleCurrentChange" >
  </el-pagination>

  </div>
</template>

<script>
export default {
    data(){
        return{
            params:{
                size:7,
                pagenum:1
            },
            total:null,
            query:'',
      dialogVisible:false,
      userList:[],
      active_teacher:'',
      active_teacherID:'',
      score:null,
      comments:null
        }
    },methods:{
        async getInfo(){
            const res = await this.$http.get('/info',{params:this.params})
            console.log(res)
            if(res.meta.status !== 200)
        return this.$message.error(res.meta.msg);
        this.total = res.data.length
            this.userList = res.data.users
            
        },
        async getUserList(){
            const reg = RegExp(`${this.query}`,"i")
            await this.getInfo()
            this.userList = this.userList.filter((item)=>{
                if(reg.test(item.username)){
                    return true
                }
                return false
            })
            this.total = this.userList.length
        },
        async handleCurrentChange(newPage){
             this.params.pagenum = newPage
             this.getInfo()
        },
        async deleteUser(id){
            const res = await this.$http.delete(`/delete/${id}`)
            console.log(res)
            if(res.meta.status === 200){
                this.getInfo()
                return this.$message.success(res.meta.msg)
            }
            else return this.$message.error("删除失败")
        },
        async getComments(username,id){
            this.active_teacher = username
            this.active_teacherID = id
            this.dialogVisible = true
            const res = await this.$http.get(`/comments/${id}`)
            this.comments = res.data
            this.score = res.score/5 *100
            if(this.score == 0) return this.$message.error('暂时无评价')
        }
    },
    created(){
        this.getInfo()
    }
}
</script>

<style scoped>
.el-pagination{
    margin-top: 10px;
}
.el-table{
    margin-top: 50px;
}
.el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    margin-top: 20px;
}
.el-carousel__container{
    margin-top:10px;
}
.el-carousel span{
    margin: auto 0;
}
</style>