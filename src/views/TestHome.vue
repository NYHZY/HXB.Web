<template>
<div class="hxb_sys_home">
  <el-container>
    <el-header>
      <Header @asideCollapse="controlaside"></Header>
    </el-header>
    <el-container>
      <el-aside :style="isCollapse?'width:65px;-webkit-transition: width 0.3s;transition: width 0.3s;':'width:'+width+';'">
        <Aside :isCollapse="isCollapse" :homevue="homevue" :width="width"></Aside>
      </el-aside>
      <el-main>
          <!-- 面包屑 -->
          <div class="content_breadcrumb">
            <i class="el-icon-location" style="font-size:14px;padding-right: 5px;"></i>
            <div class="breadcrumb-lable"> 当前位置：</div>
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-for="(item, index) in pathItem" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="content_tab">
            <div style="height:100%;width:100%;position: relative;overflow: hidden;">
              <el-tabs
                v-model="editableTabsValue"
                type="card"
                closable
                @tab-remove="removeTab"
                @tab-click="rightclick($event)"
                @contextmenu.prevent.capture>
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
          </div>
      </el-main>
    </el-container>
  </el-container>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      isCollapse:false,
      homevue:this,
      width:'',
      pathItem:['首页','动态界面'],
      homevue: this,
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 0,
      key:'PDataTable',
      ismousedown:false,
      initWidth:'',
    }
  },
  created(){
  },
  methods:{
    controlaside(isCollapse) {
      this.isCollapse = isCollapse;
    },
    //添加tabs
    addTab(item) {
      let _this=this;
      if (!item.leaf) {
        if (this.editableTabs.some((it) => {return it.id == item.id;})) 
        {
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
  }
}
</script>

<style scoped>
.hxb_sys_home{
  display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.el-container{
  height: 100%;
}
.el-header{
  padding: 0 !important;
}
.hxb_home_content{
  flex: 1;
  position: relative;
}
.content_breadcrumb{
  position: absolute;
  left: 0;
  right: 0;
  font-size: 12px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  top: 0;
  height: 29px;
  border-bottom: 1px solid #d7e4d8;
  background: #f9f9f9;
}
.el-main{
  flex: 1;
  position: relative;
  padding: 0 !important;
}
.content_tab{
  position: absolute;
  left: 0px;
  right: 0;
  top: 30px;
  display: flex;
  flex-direction: column;
  bottom: 1px;
}
.content_tab >>> .el-tabs__content{
  position: absolute !important;
  left: 5px;
  bottom: 5px;
  right: 5px;
  top: 50px;
}

</style>