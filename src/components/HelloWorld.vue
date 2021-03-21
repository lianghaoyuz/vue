<template>
  <!-- <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
  <el-card>
<el-row>
<el-col v-for="fit in fits" :key="fit" :span="5">
  
        <el-avatar shape="square" :size="240" :fit="fit" :src="url"></el-avatar>
         <el-button type="primary">投票</el-button>
</el-col>
</el-row>
</el-card>
  </div> -->
  <div>welcome</div>
</template>

<script>
export default {
  data(){
    return{
      fits:['a','b','c','d','d','c'],
      url:'http://localhost:8080/logo.png'
    }
  }
}
</script>

<style scoped>

.el-card {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.el-row{
  display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
}
.el-row:last-child{
  display: flex;
    justify-content:flex-start;
    flex-wrap: wrap;
}
.el-col{
  margin-right: 40px;
  text-align: center;
}
.el-avatar{
  background-color: #fff;
}
</style>