<template>
  <div class="hxb-ptreelayout">
    <div class="hxb-tree" :style="widthStyle">
      <el-tree
      :props="props"
      :load="loadNode"
      lazy
      :expand-on-click-node="false"
      @node-click="NodeClick"
      icon-class="el-icon-folder-opened"
      >
      </el-tree>
    </div>
    <div class="dragdiv" @mousedown="mouseDown"><div class="dragbutton" @click="btnClick"></div></div>
    <div class="hxb-tabs">
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
</template>

<script>
export default {
  props:{
    pmsData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      widthStyle:{ width: "220px" },
      viewRender:false,
      props: {
          label: 'text',
          children: 'children',
          isLeaf: 'leaf'
        },
        treecfg:{},
        editableTabs:[],
        editableTabsValue:0
    }
    
  },
  created() {
    this.getTree();
  },
  methods:{
     NodeClick(data) {
        let paramstr=data.nodedata.paramstr;
       if(!this.$common.isEmpty(paramstr)){
         if (this.editableTabs.some((it) => {return it.id == data.id;})) {
           this.editableTabsValue = data.id;
         }else{
            let _idx=data.nodedata.paramstr.indexOf("?");
            let linkconfig=Object.assign({},{pmsData:this.$Qs.parse(paramstr.substr(_idx+1,paramstr.length))});
            let newTabName = data.id;
            linkconfig.homePanel=this;
            let _obj={
                id: data.id,
                title: data.text,
                name: data.id,
                linktype:1,
                linkconfig:linkconfig,
                content: data.text,
                linktext:paramstr.substr(0,_idx)
              }
              console.log(_obj);
              this.editableTabs.push(_obj);
              this.editableTabsValue = newTabName;
         }
       }
      },
      mouseDown(e) { //大小调整
        let resizeDiv = this.$el.getElementsByClassName('dragdiv')[0];
        let startX = e.clientX || e.screenX;
        let _leftWidth = resizeDiv.offsetLeft;
        document.onmousemove = (e) => {
            let endX = e.clientX || e.screenX;
            let moveLen = parseInt(_leftWidth + (endX - startX));
            this.widthStyle.width = moveLen + 'px'
        };
        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
      },
      btnClick() {
        if (this.expand) {
            this.oldWidth = this.widthStyle.width;
            this.widthStyle.width = "1px"
            this.expand = false;
        } else {
            this.widthStyle.width = this.oldWidth;
            this.expand = true;
        }
      },
      loadNode(node, resolve) {
        if (node.level === 0) {         
          this.$Http.post("tree/tree-data",Object.assign({},{treenodeid:0},this.pmsData)).then(res=>{
            if (res.statusCode == 200){
              return resolve(res.data);
            }
          }).catch(err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        }
        if (node.level > 0){
          this.$Http.post("tree/tree-data",Object.assign({},{treenodeid:node.data.treenodeid},this.pmsData,node.data.nodedata)).then(res=>{
            if (res.statusCode == 200){
              return resolve(res.data);
            }
          }).catch(err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
        }
      },
      //获取树组件配置
      async getTree(){
        await this.$Http.get("tree/tree",Object.assign({},this.pmsData)).then(res=>{
          if (res.statusCode == 200){
            this.treecfg=res.data;
          }

        }).catch(err=>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      //获取树节点值
      getTreeData(treeid,treenodeid){
        console.log(treeid)
        treenodeid=this.$common.isEmpty(treenodeid)?0:treenodeid;
        this.$Http.post("tree/tree-data",Object.assign({},{treeid:treeid,treenodeid:treenodeid},this.pmsData)).then(res=>{
          if (res.statusCode == 200){
            return res.data;
          }
        }).catch(err=>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      //删除tab
      removeTab(targetName){
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
      //右键删除
      rightclick(){}
  }
}
</script>

<style scoped>
.hxb-ptreelayout{
  position: absolute;
    top: 0px;
    background: #fff;
    display: flex;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
.hxb-tree{
  width: 220px;
  height: 100%;
}
.dragdiv {
        width: 8px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        border-right: 1px solid #2196f338;
        border-left: 1px solid transparent;
    }
.dragdiv:hover {
  cursor: w-resize;
  color: #409eff;
  background-color: #8cccf750;

  border-left: 1px solid #2196f338;
  background: rgba(24, 144, 255, 0.03);
  border-right: 1px solid #2196f338;
}
.dragbutton {
            cursor:pointer;
            display: none;
            height: 30px;
            width: 100%;
            background: #607d8b30;
        }
.hxb-tabs{
    flex: 1;
    margin-left: 0;
    right: 0;
    width: auto;
    height: 100%;
    overflow-y: hidden;
    position: relative;
}
.hxb-tabs>>>.el-tabs__content{
  position: absolute !important;
  left: 5px;
  bottom: 5px;
  right: 5px;
  top: 50px;
}
</style>