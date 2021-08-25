<template>
<div>
  <el-menu default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    :collapse="isCollapse" 
    background-color="#303133"
    text-color="#fff"
    >
      <SysMenu :menuPanle="menuPanle" :menuList="menulist" :isCollapse="isCollapse"></SysMenu>
  </el-menu>
</div>
    
</template>
<script>
import SysMenu from './SysMenu.vue'
export default {
  props: {
      isCollapse: Boolean,
      homevue:{
        type: Object,
            default: () => { }
      }
    },
  data() {
    return {
      menulist:[],
      menuPanle:this
    }
  },
  methods:{
    async rendermenu(){
      const res =await this.$Http.get("menu/menu-list",{systemid:10000});
      if(res.statusCode==200){
        res.data.forEach(item=>{
          let obj={
            id:item.id,
            icon:item.icon,
            menuname:item.menuname,
            leaf:item.leaf>0?true:false,
            isload:false
          }
          if(obj.leaf){
            obj.leafs=[]
          }
          this.menulist.push(obj);
        })
      }
    },
    async getMenu(item){
      if(!item.isload){
        const res =await this.$Http.get("menu/menu-list",{systemid:10000,menuid:item.id});
        if(res.statusCode==200){
          res.data.forEach(_item=>{
            let obj={
              id:_item.id,
              icon:_item.icon,
              menuname:_item.menuname,
              leaf:_item.leaf>0?true:false,
              isload:false
            }
            if(obj.leaf){
              obj.leafs=[]
            }
            item.leafs.push(obj);
          })
          item.isload=true;
        }
      }
    },
    itemMouseover(item) {
            // this.menuactive = item.index; //控制菜单乱跳
            // this.getMenu(item);
        },
    itemClick(item) {
        this.getMenu(item);
        this.homevue.addTab(item);
    }
  },
  components:{
    SysMenu
  },
  created(){
    this.rendermenu();
  }
}
</script>
<style scoped>
.aside-left{
  text-align: center;
  background: rgb(229, 241, 237); 
  -webkit-transition: width 0.4s;
  transition: width 0.4s;
  transition-timing-function: ease-out;
  flex: 1;
}
.el-menu{
  background: #303133 !important;
  color: white !important;
  height: 100%;
} 
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */

.el-menu-item-group__title{
  color: #fff !important;
} 
.el-menu{
  text-align: left;
}
</style>