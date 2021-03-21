<template>
<div class="login_box">
  <div class="box">
    <img src="../assets/logo.png" alt="" width="100px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="ruleForm"  @keydown.enter.native="enter">
      <el-form-item  prop="username">
        <el-input  prefix-icon="iconfont icon-RectangleCopy" v-model="ruleForm.username" autocomplete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item  prop="password" class="in">
        <el-input prefix-icon="iconfont icon-RectangleCopy1" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
        <span @click="$router.push('/login')" id="choice">有账号？点击登录</span>
        <span id="ind"><input type="radio" id="teacher" name="ind" value="teacher" v-model="ind"><label for="teacher">老师</label><input type="radio" id="student" name="ind" v-model="ind" value="student"><label for="student">学生</label></span>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="enter" >注册</el-button>
         <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
data () {
    return {
      ind:'student',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.ruleForm.resetFields()
    },
    enter () {
      this.$refs.ruleForm.validate(async valid => {

        if (valid) {
          let right = null
          if(this.ind === 'student')
            right = 2
          else right = 1
          const response = await this.$http.post(`/login/${right}`, this.ruleForm)
          if (response.meta.status === 200) {
            console.log('注册成功')
            this.$store.commit('setInfo',response.data.user)
            this.$message.success(response.meta.msg)
            window.localStorage.setItem('ac_token', response.data.access_token)
            window.localStorage.setItem('rf_token', response.data.refresh_token)
            this.$router.push('/home')
          } else this.$message.error(response.meta.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.login_box{
background-color: rgb(195, 195, 195);
height: 100%;
}
 img{
   border-radius: 100px;
   border: 5px solid rgb(235, 235, 235);
   background-color: white;
   position: absolute;
   top: -30px;
   left: 175px;
   box-shadow:0 0 7px rgb(224, 223, 223) ;
 }
.box{
  
  width: 450px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
 border-radius: 10px;
}
.btns{
justify-content: flex-end;
display: flex;
}
.ruleForm{
  position: absolute;
  height: 50%;
  top: 35%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
span{
  font-size: 5px;
}
.in >>> .el-form-item__content{
  line-height: 15px;
  position: relative;
}
#choice:hover{
  text-decoration: underline;
  color: rgb(94, 170, 200);
  cursor: pointer;
}
span#ind{
  
position: absolute;
right: 30px;
}
span#ind[data-v-366a0166]{
  font-size: 15px;
}
</style>