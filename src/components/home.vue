<template>
  <el-container class="home-container">
          
  <el-header height="75px">
      
      <img src="../assets/logo.png" alt="">
      教师评价系统
      <el-button type="info" @click="back" class="btn">注销</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px">
         <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menuItem-group v-for="item in menuList" :key="item.value">
      <el-menu-item :index="it.toString()" v-for="(it,value) in item" v-bind:key="it" >
        <i class="el-icon-menu"></i>
        <span slot="title">{{value}}</span>
      </el-menu-item>
      </el-menuItem-group>
      </el-menu>
    </el-aside>
    <el-main ><router-view></router-view></el-main>
 </el-container>
</el-container>
</template>

<script>
export default {
    data(){
        return{
            msg:null,
            menuList:[]
        }
    },
    methods:{
        toggleRender(){},
        back(){
            window.localStorage.clear()
            this.$router.push('./login')
        }
    },
    async created(){
        const data = await this.$http.get('/home')
        this.menuList=data.data
        console.log(this.menuList)
    }
}
</script>

<style scoped>
.el-header,
.el-aside{
    background-color:rgb(94, 98, 110);
}
.home-container{

    height: 100%;
}
.btn{
    height: 60px;
    margin: auto 0;
}
.el-header{
justify-content: space-between;
display: flex;
font-size: 30px;
line-height: 75px;
}
.el-menu{
  border-right:none
}
</style>