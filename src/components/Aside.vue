<template>
  <div class="aside-left" :style="isCollapse?'width:64px;':'width:200px;'">
    <el-menu default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse" 
    background-color="#303133"
    text-color="#fff"
    collapse-transition="false">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2" text-color="#fff">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
  </div>
</template>
<script>
export default {
  props: {
      isCollapse: Boolean
    },
  data() {
    return {
    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style>
.aside-left{
  text-align: center;
  background: rgb(229, 241, 237); 
  -webkit-transition: width 0.4s;
  transition: width 0.4s;
  transition-timing-function: ease-out;
}
.el-menu{
  background: #303133 !important;
  color: white !important;
  height: 100%;
} 
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.el-menu-item-group__title{
  color: #fff !important;
} 
.is-active{
  color: black !important;
  background-color: rgb(229, 241, 237) !important;
}
</style>