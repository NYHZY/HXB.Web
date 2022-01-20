<template>
  <div class="syshome">
    <Header @asideCollapse="controlaside"></Header>
    <el-container class="container">
      <Aside :isCollapse="isCollapse" :homevue="homevue"></Aside>
      <div class="tab">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="rightclick($event)"
          @contextmenu.prevent.capture
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.id"
            :label="item.title"
            :name="item.name"
            @click="rightclick">
            <component :is="item.linktext" v-bind="item.linkconfig"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-container>
  </div>
</template>
<script>
import Aside from "../components/SysAside.vue";
import Header from "../components/Header.vue";
import SysMain from "../components/SysMain.vue";
import Drag from "../components/Drag.vue";
import PDataTable from "../components/DynamicTable/PDataTable.vue";
export default {
  data() {
    return {
      isCollapse: false,
      startx: 0,
      homevue: this,
      editableTabsValue: "2",
      editableTabs: [],
      tabIndex: 0,
      key: "PDataTable",
    };
  },
  methods: {
    controlaside(isCollapse) {
      this.isCollapse = isCollapse;
    },
    DragDiv() {
      console.log("鼠标在移动");
    },
    getTouchstartX(e) {
      console.log(e.x);
    },
    addTab(item) {
      let _this=this;
      if (!item.leaf) {
        if (
          this.editableTabs.some((it) => {
            return it.id == item.id;
          })
        ) {
          this.editableTabsValue = item.id + "";
        } else {
          let linkconfig=_this.$common.getStrObjSync(item.data.linkconfig);
          linkconfig.homePanel=_this;
          let newTabName = item.id + "";
          let _obj={
            id: item.id,
            title: item.menuname,
            name: newTabName,
            linktype:item.data.linktype,
            linkconfig:linkconfig,
            content: item.menuname
          }
          switch(Number(item.data.linktype)){
            case 1:
              _obj.linktext=item.data.linktext;
              break;
          }
          this.editableTabs.push(_obj);
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
    rightclick() {
      console.log("鼠标右击了");
    },
  },
  // components: {
  //   Aside,
  //   SysMain,
  //   Header,
  //   Drag,
  //   PDataTable,
  // },
};
</script>
<style scoped>
.syshome {
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 60px);
}
.tab {
  flex: 1;
  height: 100%;
}
.content-box {
  position: relative;
  height: 40px;
  display: flex;
}
.dropdown {
  widows: 50px;
  height: 40px;
  line-height: 40px;
}
.tab >>> .el-tabs__item {
  height: 30px !important;
  line-height: 30px !important;
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
.tab >>> .el-tabs--card > .el-tabs__header {
  border: none;
}
.tab >>> .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
  height: 40px;
  /* width: 100%; */
  line-height: 40px;
}
.tab >>> .el-tabs {
  width: 100%;
  height: 100%;
}
.tab >>> .el-tabs > .el-tabs__content {
  height: calc(100% - 55px);
}
.tab >>> .el-tabs > .el-tabs__content > .el-tab-pane {
  height: 100%;
}
.tab >>> .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 15px;
  width: 80%;
}
</style>