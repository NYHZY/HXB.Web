<template>
<div>
  <div v-for="menu in menuList" :key="menu.id">
    <div v-if="menu.leaf" @click.prevent="click(menu)" @mouseover="mouseover(menu)">
      <el-submenu :index="menu.id+''">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title" :class="isCollapse?'subdis':''">{{menu.menuname}}</span>
        </template>
        <SysMenu :menuPanle="menuPanle" :menuList="menu.leafs"></SysMenu>
      </el-submenu>
    </div>
    <div v-else @click.prevent="click(menu)">
      <el-menu-item :index="menu.id+''">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.menuname}}</span>
      </el-menu-item>
    </div>
  </div>
</div>
</template>

<script>
import SysMenu from '../components/SysMenu.vue'
export default {
  name:'SysMenu',
  props: {
        menuList: {
            type: Array,
            default: () => []
        },
        menuPanle: {
            type: Object,
            default: () => { }
        },
        isCollapse:Boolean
    },
  data() {
    return {
      
    }
  },
  methods:{
    click(item){
      this.menuPanle.itemClick(item);
    },
    mouseover(){
      // this.menuPanle
    }
  },
  components:{
    SysMenu
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.el-menu-item-group__title{
  color: #fff !important;
} 
.subdis{
  transition: opacity 0.3;
  opacity: 0;
}
</style>