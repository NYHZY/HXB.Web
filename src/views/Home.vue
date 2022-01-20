<template>
<div class="hxb-home">
  <el-container>
    <el-header>
      <Header @asideCollapse="controlaside"></Header>
    </el-header>
    <el-container class="hxb-home-container">
      <el-aside :style="isCollapse?'width:61px':'width:'+width+';-webkit-transition: width 0.3s;transition: width 0.3s;'">
        <Aside :isCollapse="isCollapse" :homevue="homevue" :width="width"></Aside>
      </el-aside>
      <div class="hxb-drag" @mousedown="handledown"></div>
      <el-main>
        <div class="tab">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @contextmenu.prevent.capture
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.id"
            :label="item.title"
            :name="item.name"
          >
            <component :is="key"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
      </el-main>
    </el-container>
  </el-container>
</div>
  
</template>

<script>
import Aside from "../components/SysAside.vue";
import Header from "../components/Header.vue";
import PDataTable from "../components/DynamicTable/PDataTable.vue";
export default {
  data() {
    return {
      isCollapse: false,
      homevue: this,
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 0,
      key:'PDataTable',
      ismousedown:false,
      initWidth:'',
      width:''
    }
  },
  components:{
    Aside,
    Header,
    PDataTable
  },
  methods:{
    controlaside(isCollapse) {
      this.isCollapse = isCollapse;
    },
    addTab(item) {
      if (!item.leaf) {
        if (
          this.editableTabs.some((it) => {
            return it.id == item.id;
          })
        ) {
          this.editableTabsValue = item.id + "";
        } else {
          let newTabName = item.id + "";
          this.editableTabs.push({
            id: item.id,
            title: item.menuname,
            name: newTabName,
            content: item.menuname,
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
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    handledown(e){
      this.ismousedown = true;
      this.initWidth = e.pageX;
      document.addEventListener('mousemove',this.handleMousemove)
      document.addEventListener('mouseup',this.handelMouseup);
      console.log("鼠标按下了")
    },
    handleMousemove(e){
            if(this.ismousedown) {
                this.width = e.pageX + 8 +'px';
                console.log(this.width)
                if(e.pageX < 65) this.handelMouseup(e);
            }
        },
    handelMouseup(e){
        this.ismousedown = false;
    },
  }
}
</script>

<style scoped>
.hxb-home{
  width: 100%;
  height: 100%;
}
.el-container{
  width: 100%;
  height: 100%;
}
.tab >>> .el-tabs--card>.el-tabs__nav {
  border: none;
}
.el-header{
  padding: 0;
}
.hxb-home>>>.el-main{
  padding: 5px;
}
.hxb-drag{
  width: 5px;
  height: 100%;
  cursor:e-resize;
}

.hxb-drag:hover{
  background-color: rgba(206,232,252); 
}
.hxb-aside{
  height: 100%;
}
.tab >>> .el-tabs__item {
  height: 35px !important;
  line-height: 35px !important;
  padding: 0 10px !important;
  border-radius: 3px !important;
  margin: 0 5px !important;
}
.tab >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #dcdfe6;
}
.tab >>> .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
  border: 1px solid #1890ff;
}
.tab >>> .el-tabs--card > .el-tabs__header .el-tabs__nav{
  border: none;
}

</style>