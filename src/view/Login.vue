<template>
  <div class="container">
    <div class="cont_box">
      <div class="cont_left">
        <h2>welcome</h2>
        <h2 style="margin-top: 15px">后台管理系统</h2>
      </div>
      <div class="cont_right">
        <div class="portrait">
          <img src="../assets/logo.png" alt="" />
        </div>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              type="username"
              v-model="loginForm.username"
              autocomplete="off"
              prefix-icon="el-icon-user"
              placeholder="请输入账号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="passward">
            <el-input
              type="password"
              autocomplete="off"
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              clearable
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
   
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
         
          username:[
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 ~ 10 个字符', trigger: 'blur' }
        ],
         password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 ~ 12 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async(v) => {
        if (!v) return;
       const {data:res}= await this.$http({
           method:'post',
           url:"/api/login",
           data:{
               username: this.loginForm.username,
            password: this.loginForm.password,
           }
       });
       if(res.status!==200){
           this.$message.error(res.message)
           return
       }
       sessionStorage.setItem('token',res.token)
       //base64加密
        sessionStorage.setItem('key',window.btoa(res.token))  
       this.$message.success(res.message)
       this.$router.push('/home')
          
      });
      
    },
  },
};
</script>

<style scoped>
.container {
  background-image: linear-gradient(120deg, aqua, #a7ace2);
  height: 100%;
}
.cont_box {
  display: flex;
  width: 700px;
  height: 380px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.cont_left {
  width: 40%;
  height: 100%;
  background-image: linear-gradient(120deg, aqua, #a7ace2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.cont_right {
  padding: 20px;
  width: 60%;
  height: 100%;
  background: #fff;
}
.el-input {
  margin-bottom: 20px;
}
.portrait {
  width: 160px;
  height: 70px;
  border-radius: 50%;
  /* border: 5px solid skyblue; */
  overflow: hidden;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
}
.portrait img {
  width: 100%;
  height: 100%;
}
.el-button {
  width: 100%;
  height: 40px;

  border-radius: 8px;
  margin: 0 auto;
}
</style>