<template>
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