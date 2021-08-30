<template>
<div class="hxb-pdatatable">
  <div class="hxb-pdatatable-header">

  </div>
  <div class="hxb-pdatatable-middle"> 
    <!-- 使用ag-grid-vue组件 其中columnDefs为列，rowData为表格数据 -->
    <ag-grid-vue 
    style="height:100%"
     class="table ag-theme-balham"
     :gridReady="onGridReady"
     @cellClicked="onCellClicked"
     :gridOptions="gridApi"
     v-bind="gridOptions"
     ></ag-grid-vue>
  </div>
  <div class="hxb-pdatatable-bottom">
    <PDataTableTool :gridParams="this"></PDataTableTool>
  </div>
</div>
  
</template>

<script>
import PDataTableTool from './PDataTableTool.vue'
import PTableHeader from './PTableHeader.vue'
export default {
  data() {
    return {
      gridCfg: null,
      loading: null,
      gridApi: {},
      gridOptions:{
        suppressCopyRowsToClipboard: true,
        rowHeight: 40,
        headerHeight: 40,
        rowSelection: 'single',
        singleClickEdit: true,
        animateRows: true,
        enableCellChangeFlash: true,
        rowDragManaged: true,
        suppressRowDrag: true,
        suppressContextMenu: true,
        suppressMoveWhenRowDragging: true,
        columnDefs:[
          {headerName: '名称', field: 'title', checkboxSelection: true,headerComponentFramework:"PTableHeader",headerComponentParams:{Text:"名称"},cellEditorParams:{
            TextAlign:"center"
          }},
          {headerName: '网址', field: 'url', width: 200,cellStyle:{'text-align':'center'},headerComponentFramework:"PTableHeader",headerComponentParams:{Text:"名称",TextAlgin:"center"},cellEditorParams:{
            TextAlign:"center"
          }},
          {headerName: '分类', field: 'catalog',headerComponentFramework:"PTableHeader",headerComponentParams:{Text:"名称"},cellEditorParams:{
            TextAlign:"center"
          }},
          {headerName: 'PR', field: 'pr',headerComponentFramework:"PTableHeader",headerComponentParams:{Text:"名称"},cellEditorParams:{
            TextAlign:"center"
          }}
        ],
        rowData: [
          {title: '谷歌', url: 'www.google', catalog: '搜索引擎',pr:10},
          {title: '微软', url: 'www.microsoft.com', catalog: '操作系',pr:10},
          {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
          {title: '淘宝', url: 'www.taobao.com', catalog: '电商',pr:8},
          {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
          {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
          {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
          {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        ],
      },
      gridaddData: {},
    }
  },
  created(){
  },
  methods:{
    //ag-grid创建完成后执行的事件
    onGridReady (params) {
      console.log(params);
      // 获取gridApi
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      // 这时就可以通过gridApi调用ag-grid的传统方法了
      this.gridApi.sizeColumnsToFit();
    },
    //单元格点击事件
     onCellClicked (cell) {
      console.log(cell);
      // 获取选中单元格的数据
      console.log(cell.value);
      // 获取选中单元格所在行号
      console.log(cell.rowIndex);
      // 获取选中单元格所在行的数据
      console.log(cell.data); 
    },
    addRowData(){
      this.gridOptions.rowData.push({});
      this.gridApi.api.setRowData(this.rowData);

      console.log("新增行")
    },
    saveData(){
      //保存数据
      console.log("保存数据")
    }
  },
  components:{
    // AgGridVue:AgGridVue
    PDataTableTool,
    PTableHeader
  }
}
</script>

<style scoped>
.hxb-pdatatable{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.hxb-pdatatable-middle{
  flex: 1;
}
.hxb-pdatatable-bottom{
  margin-top: 10px;
}
.hxb-pdatatable-middle>>>.ag-body-viewport::-webkit-scrollbar{
  width:10px;
  height:10px;

}
.hxb-pdatatable-middle>>>.ag-body-viewport::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
.hxb-pdatatable-middle>>>.ag-body-viewport::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
.hxb-pdatatable-middle>>>.ag-body-viewport::-webkit-scrollbar-thumb:hover{
  background: rgb(134, 135, 233);
}
.hxb-pdatatable-middle>>>.ag-body-viewport::-webkit-scrollbar-corner{
  background: #179a16;
}
.hxb-pdatatable-middle>>>.ag-layout-normal::-webkit-scrollbar{
  width:10px;
  height:10px;
}
.hxb-pdatatable-middle>>>.ag-theme-balham .ag-cell, .ag-theme-balham .ag-full-width-row .ag-cell-wrapper.ag-row-group{
  line-height: 40px;
  border-right: 1px solid #ebeef5;
}
</style>