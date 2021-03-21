<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
  <el-card>
<el-row>
<el-col v-for="(item,index) in data" :key="index" :span="5">
        <el-avatar shape="square" :size="240" :src="url"></el-avatar>
        <h1>{{item.username}}</h1>
         <el-button type="primary" @click="voting(item)" :disabled="votedList.includes(item.id)?true:false">投票</el-button>
</el-col>
</el-row>
</el-card>
<el-dialog
  :title="this.active_item.username"
  :visible.sync="dialogVisible"
  width="30%"
  @closed="clear"
  >
  <span>请评分：{{score}}分</span>
  <el-rate
    v-model="score"
    >
  </el-rate>
  <textarea type="textarea" rows="5" cols="45" placeholder="请输入评价" tabindex="1" v-model="comment"/>
  <span slot="footer" class="dialog-footer">

    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="put" >确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      data:null,
      url:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      dialogVisible:false,
      active_item:{id:'a',username:'dd'},
      score:null,
      comment:'',
      votedList:null
    }
  },
  methods:{
    async voting(item){
      this.active_item = item
      this.dialogVisible = true
    },
    async put(){
      if(!this.score){
        this.$message.error('未评分')
      }
      this.dialogVisible = false
      const data = await this.$http.put(`/voting/put/${this.active_item.id}`,{score:this.score,comments:this.comment,username:this.active_item.username})
      if(data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.getTeacherInfo()
      return this.$message.success(data.meta.msg)
      
    },
   async getTeacherInfo(){
      const data = await this.$http.get('/voting')
      if(data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.data = data.data
      console.log(this.data)
      this.votedList = data.voted
  },clear(){
    this.comment = '',
    this.score = 0
  }
  },
  created(){
    this.getTeacherInfo()
  }
}
</script>

<style scoped>


.el-row{
  display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
}
.el-row:last-child{
  display: flex;
    justify-content:flex-start;
    flex-wrap: wrap;
    align-items: center;
}
.el-col{
  text-align: center;
  margin-right: 47px;
}
.el-avatar{
  margin-top: 20px;

}
.el-avatar{
  background-color: #fff;
}
.el-dialog  .el-dialog__body{
  padding: 10px 20px;
}
.el-rate{
    margin-bottom: 20px;
}
textarea{
  resize: none;
}
</style>