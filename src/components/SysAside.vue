<template>
<div class="hxb-aside" :style="isCollapse?'width:65px;-webkit-transition: width 0.3s;transition: width 0.3s;':'width:'+width+';'">
  <el-menu default-active="1-4-1" 
    :collapse="isCollapse" 
    background-color="#303133"
    text-color="#fff"
    :style="'width:'+width+';-webkit-transition: width 0.3s;transition: width 0.3s;'">
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
      },
      width:String
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
            data:item,
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
      let _this=this;
      if(!item.isload){
        const res =await this.$Http.get("menu/menu-list",{systemid:10000,menuid:item.id});
        if(res.statusCode==200){
          res.data.forEach(_item=>{
            let obj={
              id:_item.id,
              icon:_item.icon,
              menuname:_item.menuname,
              leaf:_item.leaf>0?true:false,
              data:_item,
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
.hxb-aside{
  height: 100%;
  overflow: hidden;
}
.aside-left{
  text-align: center;
  background: #F2F6FC; 
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