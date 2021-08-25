<template>
 <div class="syshome">
 <Header @asideCollapse="controlaside"></Header>
 <div class="container">
   <Aside :isCollapse='isCollapse' :homevue="homevue"></Aside>
   <div class="tab">
     <div class="content-box">
       <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.id"
          :label="item.title"
          :name="item.name"
        >
        {{item.content}}
        </el-tab-pane>
      </el-tabs>
     </div>
    <div class="dropdown">
      <el-dropdown>
        <span class="el-dropdown-link">关闭<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span>关闭当前</span></el-dropdown-item>
          <el-dropdown-item><span>关闭其他</span></el-dropdown-item>
          <el-dropdown-item><span>关闭左侧</span></el-dropdown-item>
          <el-dropdown-item><span>关闭右侧</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
   </div>
 </div>
 </div>
</template>
<script>
import Aside from '../components/SysAside.vue'
import Header from '../components/Header.vue'
import SysMain from '../components/SysMain.vue'
import Drag from '../components/Drag.vue'
export default {
  data() {
    return {
      isCollapse:false,
      startx:0,
      homevue:this,
      editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 0
    }
  },
  methods:{
    controlaside(isCollapse){
      this.isCollapse=isCollapse
    },
    DragDiv(){
      console.log("鼠标在移动")
    },
    getTouchstartX(e){
      console.log(e.x)
    },
    addTab(item) {
      if(!item.leaf){
        if (this.editableTabs.some(it => { return (it.id == item.id) })){
          this.editableTabsValue=item.id+'';
        }
        else{
          let newTabName = item.id + '';
          this.editableTabs.push({
            id:item.id,
            title: item.menuname,
            name: newTabName,
            content: item.menuname
          });
          this.editableTabsValue = newTabName;
        }
        // let newTabName = item.id + '';
        //   this.editableTabs.push({
        //     id:item.id,
        //     title: item.menuname,
        //     name: newTabName,
        //     content: item.menuname
        //   });
        //   this.editableTabsValue = newTabName;
      }
        
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
  },
  components:{
    Aside,
    SysMain,
    Header,
    Drag
  }
}
</script>
<style scoped>
.syshome{
  width: 100%;
  height: 100%;
  position:absolute;
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}
.tab{
  display: flex;
  flex: 1;
  border-bottom: 1px solid #dcdfe6;
}
.content-box{
  position: relative;
  height: 40px;
  display: flex;
}
.dropdown {
  widows: 50px;
  height: 40px;
  line-height: 40px;
}
.tab>>>.el-tabs__item{
  height: 30px !important;
  line-height: 30px !important;
  padding: 0 10px !important;
  border-radius: 3px !important;
  margin: 0 5px !important;
}
.tab>>>.el-tabs--card>.el-tabs__header .el-tabs__item{
  border: 1px solid #dcdfe6;
}
.tab>>>.el-tabs--card>.el-tabs__header .el-tabs__item:hover{
  border: 1px solid #1890ff;
}
.tab>>>.el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none !important;
  height: 40px;
  widows: 100%;
  line-height: 40px;
}
.tab>>>.el-tabs--card>.el-tabs__header>.el-tabs__nav-wrap .el-tabs__content {
  position: absolute !important;
}

</style>