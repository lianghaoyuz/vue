<template>
  <el-container class="home-container">
          
  <el-header height="75px">
      
      <img src="../assets/logo.png" alt="">
      教师评价系统
      <span id="user">{{username + ' 你好!'}}</span>
      <el-button type="info" @click="back" class="btn">注销</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px">
         <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      background-color="#606266"
      text-color="#fff"
      :default-active="menu"
      active-text-color="#ffd04b">
      <el-menu-item :index="'welcome'" >
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
      </el-menu-item>
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
            menuList:[],
            menu:'/welcome',
            username:''
        }
    },
    methods:{
        toggleRender(){},
        back(){
            window.localStorage.clear()
            this.$store.commit('setInfo',{username:'',id:''})
            this.$router.push('./login')
        }
    },
    async created(){
        const data = await this.$http.get('/home')
        this.menuList=data.data
        this.$store.commit('setInfo',data.user)
        this.menu = location.pathname.slice(1)
        this.username = this.$store.state.username
    }
}
</script>

<style scoped>
.el-header,
.el-aside{
    background-color:#606266;
    position: relative;
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
#user{
position: absolute;
right:100px;
font-size:20px;
}
</style>