<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <li v-for="(i,index) in info" :key="index" > -->
         <el-card shadow="hover"  v-for="(i,index) in info" :key="index">{{i}}
</el-card>
        </div>
</template>

<script>
export default {
data(){
  return{
    info:null,
    count:30
  }
},
methods:{
  async gecom(){
    const info = await this.$http.get('/Tcom')
    if(info.meta.status!==200) return this.$message.success(info.meta.msg)
    this.info = info.data
    console.log(this.info)
  }
},
created(){
  this.gecom()
}
}
</script>

<style scoped>
.el-breadcrumb{
  margin-bottom: 40px;
}
.el-card{
  margin-bottom: 10px;
}
.el-card:hover{
  background-color: rgba(99, 101, 104,.3);
}
</style>