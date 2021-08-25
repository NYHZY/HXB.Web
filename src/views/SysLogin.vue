<template>
<div class="box">
  <div id="login">
        <h1>后台管理平台</h1>
        <form method="post">
            <input type="text" placeholder="用户名" v-model="LoginParams.LoginName"/>
            <input type="password" placeholder="密码" v-model="LoginParams.LoginPwd"/>
            <el-button class="but" type="primary"  v-on:click.native="Login" :icon="loginState">登 陆</el-button>
        </form>
    </div>
</div>
  
</template>
<script>
export default {
  name:'Login',
  data (){
    
    return{
      LoginParams:{
        LoginName:'',
        LoginPwd:''
    },
    loginState:''
    }
  },
  methods:{
    async Login(){
      const res =await this.$Http.get("/api/login/login",{LoginName:this.LoginParams.LoginName,LoginPwd:this.LoginParams.LoginPwd});
      if(res.statusCode==200){
        console.log(res.data.model)
        // this.$store.dispatch("updatetuserinfo",res.data.model);
        // this.$store.dispatch("updatetoken",res.data.token);
        sessionStorage.setItem("token",res.data.token);
        sessionStorage.setItem("userinfo",JSON.stringify(res.data.model));
        this.$router.push('/home')
      }
      console.log(res)
    },
    settoken(){
      //this.$store.commit("settoken",res.data.token);
    }
  }
}
</script>
<style scoped>
.box{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/暗系1.jpg");
  background-position: center 0;
  
}
#login{
    position: absolute;
    top: 50%;
    left:50%;
    margin: -150px 0 0 -150px;
    width: 300px;
    height: 300px;
}
#login h1{
    color: #fff;
    text-shadow:0 0 10px;
    letter-spacing: 1px;
    text-align: center;
}
h1{
    font-size: 2em;
    margin: 0.67em 0;
}
input{
    width: 278px;
    height: 18px;
    margin-bottom: 10px;
    outline: none;
    padding: 10px;
    font-size: 13px;
    color: #fff;
    text-shadow:1px 1px 1px;
    border-top: 1px solid #312E3D;
    border-left: 1px solid #312E3D;
    border-right: 1px solid #312E3D;
    border-bottom: 1px solid #56536A;
    border-radius: 4px;
    background-color: #9898a5;
}
.but{
    width: 300px;
    min-height: 20px;
    display: block;
    background-color: #4a77d4;
    border: 1px solid #3762bc;
    color: #fff;
    padding: 9px 14px;
    font-size: 15px;
    line-height: normal;
    border-radius: 5px;
    margin: 0;
    cursor: pointer;
}
</style>