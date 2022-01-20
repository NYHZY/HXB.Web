<template>
  <div class="hxb-pdatatabletool">
    <div class="hxb-pdatatabletool-btn">
      <el-button size="mini" type="primary" @click="addRowData">新增</el-button>
			<el-button size="mini" type="success" @click="saveData">保存</el-button>
			<el-button size="mini" type="danger" @click="delData">删除</el-button>
			<!-- 分割线 -->
			<el-divider direction="vertical" v-if="btnArray.length">
			</el-divider>
			<el-button size="mini" v-for="(item, index) in btnArray" :key="index" v-bind="item.OtherAtt"
				@click="item.btnEvent">{{item.Text}}</el-button>
    </div>
    <div class="hxb-pdatatabletool-page">
      <!-- 第一页 -->
      <el-button class="pageract" size="mini" @click="firstPage" :disabled="pageTool.pageindex==1||pageTool.count==0">
        <i class="el-icon-d-arrow-left btn-icon"></i>
      </el-button>
      <!-- 上一页 -->
      <el-button class="pageract" size="mini" @click="previousPage" :disabled="pageTool.pageindex==1||pageTool.count==0">
        <i class="el-icon-arrow-left btn-icon"></i>
      </el-button><span>&nbsp;当前第&nbsp;</span>
      <el-input-number size="mini" style="width:80px;text-align:center;" v-model="pageTool.pageindex" :controls="false">
      </el-input-number>&nbsp; <span>页 (共 {{pageTool.pagecnt}} 页)</span>
      <!-- 下一页 -->
      <el-button class="pageract" size="mini" @click="nextPage" :disabled="pageTool.pageindex==pageTool.pagecnt">
        <i class="el-icon-arrow-right btn-icon"></i>
      </el-button>

      <!-- 最后页 -->
      <el-button class="pageract" size="mini" @click="lastPage" :disabled="pageTool.pageindex==pageTool.pagecnt">
        <i  class="el-icon-d-arrow-right btn-icon"></i>
      </el-button>

      <!-- 每页条数 -->
      <el-select size="mini" style="width:68px" v-model="pageTool.pagesize" @change="select" :disabled="pageTool.count==0">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <!-- 刷新 -->
      <el-button class="pageract" size="mini" @click="refresh">
        <i class="el-icon-refresh btn-icon" style="">刷新</i>
      </el-button>
      <span v-if="pageTool.count!=0">
      &nbsp;
      第 {{(pageTool.pageindex-1)*pageTool.pagesize+1}} 到 {{ pageTool.datacnt}}
      条，共
      {{pageTool.count}} 条
      </span>
      <span v-else>
      &nbsp;
      暂无数据
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    gridParams:{
        type: Object,
            default: () => { }
      },
    gridCfg:{
      type: Object,
            default: () => { }
    },
    gridApi:{
      type: Object,
            default: () => { }
    },
    pageTool:{
      type: Object,
            default: () => { }
    }
  },
  data() {
    return {
      options:[20,50,100,500],
      changedata:{
        pageid:0,
        addlist:[],
        udplist:[]
      },
      btnArray:[],
    }
  },
  created(){
    this.init();
    
  },
  methods:{
    //渲染按钮
    init() {
      //处理底部工具按钮
      
      this.gridCfg.buttonInfo.forEach((_btn, _idx) => {
        let me = this;
        //处理事件
        this.convertButton(_btn);
        if (typeof (_btn.btnEvent) == "function") {
          let letEvent = (function () {
            return _btn.btnEvent.call(me, me.gridApi.api);
          })
          
          let _obj = {
              btnEvent: letEvent,
              Text: _btn.btnText,
              OtherAtt: _btn.OtherAtt
          }
          this.btnArray.push(_obj);
        }
      });
    },
    convertButton(_btnInfo) {//处理表格按钮
          if (typeof (_btnInfo.btnEvent) === "string") {
              try {
                _btnInfo.btnEvent = this.$common.getStrObjSync(_btnInfo.btnEvent) || new Function();
              }
              catch (e) {
                  alert(`解析【${_btnInfo.btnText}】事件出错！`);
              }
          }
          if (typeof (_btnInfo.OtherAtt) === "string") {
              try {
                
                  _btnInfo.OtherAtt = this.$common.getStrObjSync(_btnInfo.OtherAtt) || {};
              }
              catch (e) {
                  alert(`解析【${_btnInfo.btnText}】OtherAtt出错！`);
              }
          }
    },
    addRowData(){
        //新增行
        var data = Object.assign({}, this.gridParams.gridaddData, { _ColumnStatus: 2 });
        this.gridParams.gridApi.api.updateRowData({ add: [data] });
      },
    async saveData(){
      this.changedata={
        pageid:this.gridParams.pageid,
        addlist:[],
        udplist:[]
      }
      this.gridParams.gridApi.api.stopEditing();
      this.gridParams.gridApi.api.forEachNode((_node, _idx) => {
        switch(_node.data._ColumnStatus){
          case 1:
            this.changedata.udplist.push(_node.data);
            break;
          case 2:
            this.changedata.addlist.push(_node.data);
          break;
        }
      });
      if(this.changedata.udplist.length!=0||this.changedata.addlist.length!=0){
        //发起保存
        const res = await this.$Http.post("page/save-page-data",{data:JSON.stringify(this.changedata)});
        if(res.statusCode==200){
          this.$message({
            message: res.resMsg,
            type: 'success'
          });
          this.$emit("refreshData");
        }
        else{
          this.$message({
          message: '保存失败！',
          type: 'warning'
        });
        }
      }
    },
    delData(){
      //删除
      let selectedData = this.gridParams.gridApi.api.getSelectedRows();
      let delcnt=selectedData.length;
      let pageid='';
      if (delcnt==0) return
      let primaryKey=this.gridParams.primaryKey;
      if(this.$common.isEmpty(primaryKey)){
        this.$message({
          message: '删除失败！该动态界面未设置主键！',
          type: 'warning'
        });
        return
      }
      let ids=[];
      selectedData.forEach(item=>{
        ids.push(item[primaryKey])
      })
      this.$confirm('你确定删吗?删了就找不回来哟！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res=await this.$Http.post("page/del-page-data",{pageid:1,primaryKey:primaryKey,ids:ids});
          if(res.statusCode==200){
             this.$message({
            type: 'success',
            message: `恭喜你干掉了${delcnt}条数据！`
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '原来还是舍不得删！'
          });          
        });
    },
    refresh() {
          this.$emit("refreshData");
      },
    firstPage(){
      this.pageTool.pageindex=1;
      this.$emit("refreshData");
    },
    previousPage(){
      this.pageTool.pageindex=this.pageTool.pageindex-1;
      this.$emit("refreshData");
    },
    nextPage(){
      this.pageTool.pageindex=this.pageTool.pageindex+1;
      this.$emit("refreshData");
    },
    lastPage(){
      this.pageTool.pageindex=this.pageTool.pagecnt;
      this.$emit("refreshData");
    },
    select(){
      this.$emit("refreshData");
    }
  }
}
</script>

<style scoped>
.hxb-pdatatabletool-btn{
  float: left;
}
.hxb-pdatatabletool-page{
    float: right;
    margin-right: 20px;
  }
.pageract {
    padding: 5px 5px;
    border: 0px;
}
span{
  font-size: 12px;
}
 .btn-icon {
            color: #409eff;
            font-size: 14px;
            font-weight: bold;
        }

</style>>