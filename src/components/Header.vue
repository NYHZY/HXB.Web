<template>
  <el-header class="header-top">
    <div class="header-icon">
      <i :class="isfullscreen?'el-icon-s-fold el-icon-s-fold-transfrom':'el-icon-s-unfold el-icon-s-fold-transfrom1'" @click="AsideCollapse"></i>
    </div>
    <div class="header-title">管理系统</div>
    <div class="full-screen">
      <el-tooltip :content="isfullscreen?'取消全屏':'全屏'" placement="bottom" effect="light">
        <i class="el-icon-full-screen" @click="screen"></i>
      </el-tooltip>
    </div>
    <div class="icon-bell">
      <el-tooltip content="消息中心" placement="bottom" effect="light">
        <i class="el-icon-bell"></i>
      </el-tooltip>
    </div>
    <div class="user-info">
       <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <span style="font-size:14px;">黄小布</span><i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="忘记密码">忘记密码</el-dropdown-item>
        <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </el-header>
</template>
<script>
export default {
  data() {
    return {
      isfullscreen:false
    }
  },
  methods:{
    screen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        this.isfullscreen=false
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        }
      } else {
        this.isfullscreen=true
        if (element.requestFullscreen) {
        element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    AsideCollapse(){
      this.isfullscreen=!this.isfullscreen
      this.$emit('asideCollapse',this.isfullscreen);
    }
  }
}
</script>
<style scoped>
.header-top{
  widows: 100%;
  height: 60px;
  background: #303133;
  border-bottom:1px solid gray ;
  align-items: center;
  box-sizing: border-box;
  display: flex;
}
.header-title{
  flex: 2;
}
.header-icon{
  padding: 0 15px;
}
.el-icon-s-fold,.el-icon-s-unfold{
  font-size: 25px;
  color: white;
  cursor: pointer;
}
.el-icon-s-fold-transfrom{
  transform:rotate(180deg);
  -ms-transform:rotate(180deg); 	
  -moz-transform:rotate(180deg); 	
  -webkit-transform:rotate(180deg);
  -o-transform:rotate(180deg);
}
.el-icon-s-fold-transfrom1{
  transform:rotate(-180deg);
  -ms-transform:rotate(-180deg); 	
  -moz-transform:rotate(-180deg); 	
  -webkit-transform:rotate(-180deg);
  -o-transform:rotate(-180deg);
}
.el-icon-full-screen,.el-icon-bell,.el-icon-caret-bottom{
  font-size: 16px;
  color: white;
  cursor: pointer;
}
.el-icon-full-screen{
  justify-items: right;
}
.header-title{
  color: white;
}
.full-screen,.icon-bell{
  margin-right: 15px;
}
.el-dropdown-link{
  font-size: 16px;
  color: white;
  margin-right: 50px;
  cursor: pointer;
}
</style>