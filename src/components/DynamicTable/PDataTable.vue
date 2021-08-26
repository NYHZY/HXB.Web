<template>
<div class="hxb-pdatatable">
  <div class="hxb-pdatatable-header">

  </div>
  <div class="hxb-pdatatable-middle"> 
    <!-- 使用ag-grid-vue组件 其中columnDefs为列，rowData为表格数据 -->
    <ag-grid-vue 
    style="height:100%"
     class="table ag-theme-balham"
     :columnDefs="columnDefs" 
     :rowData="rowData" 
     :enableColResize="true"
     :gridReady="onGridReady"
     @cellClicked="onCellClicked"
     ></ag-grid-vue>
  </div>
  <div class="hxb-pdatatable-bottom">
    <PDataTableTool></PDataTableTool>
  </div>
</div>
  
</template>

<script>
import PDataTableTool from './PDataTableTool.vue'
export default {
  data() {
    return {
      //定义ag-grid列
      columnDefs: [
        {headerName: '名称', field: 'title', checkboxSelection: true},
        {headerName: '网址', field: 'url', width: 200},
        {headerName: '分类', field: 'catalog'},
        {headerName: 'PR', field: 'pr'}
      ],
      //需要显示的数据
      rowData: [
        {title: '谷歌', url: 'www.google', catalog: '搜索引擎',pr:10},
        {title: '微软', url: 'www.microsoft.com', catalog: '操作系',pr:10},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: '淘宝', url: 'www.taobao.com', catalog: '电商',pr:8},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
        {title: 'ITXST', url: 'www.itxst.com', catalog: '小站',pr:1},
      ]
    }
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
    }
  },
  components:{
    // AgGridVue:AgGridVue
    PDataTableTool
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
</style>