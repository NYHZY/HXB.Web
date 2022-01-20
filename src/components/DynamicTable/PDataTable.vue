<template>
  <div class="hxb-pdatatable">
    <div class="hxb-pdatatable-header"></div>
    <div class="hxb-pdatatable-middle">
      <!-- 使用ag-grid-vue组件 其中columnDefs为列，rowData为表格数据 -->
      <ag-grid-vue
        style="height: 100%"
        class="table ag-theme-balham"
        @gridReady="onGridReady"
        @cellClicked="onCellClicked"
        :gridOptions="gridApi"
        v-bind="gridOptions"
        :localeText="localeText"
        v-if="viewRender"
      ></ag-grid-vue>
    </div>
    <div class="hxb-pdatatable-bottom">
      <PDataTableTool
        :gridParams="this"
        @refreshData="reloadData"
        :pageTool="pageTool"
        :gridCfg="gridCfg"
        :gridApi="gridApi"
        v-if="viewRender"
      ></PDataTableTool>
    </div>
  </div>
</template>

<script>
import PDataTableTool from "./PDataTableTool.vue";
import PTableHeader from "./PTableHeader.vue";
import PTableEditbox from "../TableTool/P_Table_Editbox.vue";
import PTableTextArea from "../TableTool/P_Table_TextArea.vue";
import PTableCodeEdit from "../TableTool/P_Table_CodeEdit.vue";
import PTableSelectBoxEditor from "../TableTool/P_Table_SelectBoxEditor.vue";
export default {
  props: {
    pmsData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    otherPms: {
      type: Object,
      default: () => {
        return {};
      },
    },
    beforeOnReady: {
      type: Function,
      default: () => {
        return new Function();
      },
    },
    afterOnReady: {
      type: Function,
      default: () => {
        return new Function();
      },
    },
  },
  data() {
    return {
      cellWidth: 12,
      gridCfg: null,
      loading: null,
      gridApi: {},
      viewRender : false,
      gridOptions: {
        suppressCopyRowsToClipboard: true,
        rowHeight: 40,
        headerHeight: 40,
        rowSelection: "multiple",
        singleClickEdit: true,
        animateRows: true,
        enableCellChangeFlash: true,
        rowDragManaged: true,
        suppressRowDrag: true,
        suppressContextMenu: true,
        suppressNoRowsOverlay: true,
        suppressMoveWhenRowDragging: true,
        columnDefs: [],
        rowData: [],
        defaultColDef: {
          resizable: true,
        },
        buttonInfo:[],
      },
      localeText: {
        page: "页",
        more: "更多",
        to: "到",
        of: "of",
        next: "下一页",
        last: "上一页",
        first: "首页",
        previous: "上一页",
        loadingOoo: "加载中...",
        selectAll: "查询所有",
        searchOoo: "查询...",
        blanks: "空白",
        filterOoo: "过滤...",
        applyFilter: "daApplyFilter...",
        equals: "相等",
        notEqual: "不相等",
        lessThan: "小于",
        greaterThan: "大于",
        lessThanOrEqual: "小于等于",
        greaterThanOrEqual: "大于等于",
        inRange: "范围",
        contains: "包含",
        notContains: "不包含",
        startsWith: "开始于",
        endsWith: "结束于",
        group: "组",
        columns: "列",
        filters: "筛选",
        rowGroupColumns: "laPivot Cols",
        rowGroupColumnsEmptyMessage: "la drag cols to group",
        valueColumns: "laValue Cols",
        pivotMode: "laPivot-Mode",
        groups: "laGroups",
        values: "值",
        pivots: "laPivots",
        valueColumnsEmptyMessage: "la drag cols to aggregate",
        pivotColumnsEmptyMessage: "la drag here to pivot",
        toolPanelButton: "la tool panel",
        noRowsToShow: "暂无数据",
        pinColumn: "laPin Column",
        valueAggregation: "laValue Agg",
        autosizeThiscolumn: "laAutosize Diz",
        autosizeAllColumns: "laAutsoie em All",
        groupBy: "排序",
        ungroupBy: "不排序",
        resetColumns: "重置列",
        expandAll: "展开所有",
        collapseAll: "关闭",
        toolPanel: "工具面板",
        export: "导出",
        csvExport: "导出为CSV格式文件",
        excelExport: "导出到Excel",
        pinLeft: "laPin &lt;&lt;",
        pinRight: "laPin &gt;&gt;",
        noPin: "laDontPin &lt;&gt;",
        sum: "总数",
        min: "最小值",
        max: "最大值",
        none: "无",
        count: "总",
        average: "平均值",
        copy: "复制",
        copyWithHeaders: "携带表头复制",
        ctrlC: "ctrl + C",
        paste: "粘贴",
        ctrlV: "ctrl + V",
      },
      gridaddData: {},
      gridDefData: {},
      primaryKey: "",
      pageid: 0,
      pageTool: {
        pageindex: 1,
        pagesize: 20,
        count: 0,
        datacnt: 0,
        pagecnt:0
      },
    };
  },
  watch: {
    pmsData: {
      handler() {
        this.rendPageCfg();
      },
      deep: true,
    },
    gridOptions: {
      handler() {},
      deep: true,
    },
  },
  created() {
    this.init();
  },
  mounted() {
    // this.init();
  },
  methods: {
    //初始化表格
    init() {
      this.rendPageCfg();
    },
    //加载动态界面配置
    async rendPageCfg() {
      this.defaultInit();
      const res = await this.$Http.post(
        "page/page",
        Object.assign({}, this.pmsData)
      );
      if (res.statusCode == 200&&res.data) {
        //初始化配置
        this.initCfg(res.data);
        this.beforeOnReady.call(this, this);
        //初始化数据
        this.reqPageData();
      }
    },
    initCfg(_data) {
      this.gridCfg = _data;
      //初始化公共属性
      this.InitPublicProps(_data);
      this.gridOptions.buttonInfo=_data.buttonInfo;

      //固定列处理
      let fixedcolumn = -1;
      if (_data.publicAttribute.hasOwnProperty("fixedcolumn")) fixedcolumn = _data.publicAttribute.fixedcolumn;
      //存储页面id
      this.pageid = _data.id;
      //处理选择模式
      //this.gridOptions.rowSelection = _data.SelectedMode;
      //首列选框
      if (_data.isCheckbox == 1)
        this.gridOptions.columnDefs.push({
          width: 40,
          suppressMenu: true,
          pinned: "left",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          cellStyle: { "text-align": "center" },
        });
      //序号显示处理
      // if (_data.isCheckbox == 1) this.gridOptions.columnDefs.push({pinned: "left",suppressMenu: true,headerName: "序号",field: "ROW_INDEX",width: 55,cellStyle: { "text-align": "center" }});
      _data.colInfo.forEach((_obj,_idx) => {
        _obj.gridCfg=_data;
        //处理表格数据默认值
        this.gridaddData[_obj.columnName] = _obj.defaultValue;
        //处理列的公共属性
        this.convertPublicProps(_obj);
        //存储主键字段名
        if (_obj.primaryKey == 1) this.primaryKey = _obj.columnName;
        if (_obj.tableDisplay == 1) {
          let _col = {
            headerName: _obj.columnText,
            field: _obj.columnName,
            width: 12 * _obj.columnWidth,
            headerComponentFramework: "PTableHeader",
            headerComponentParams: _obj,
            editable: _obj.isReadonly == 0 ? true : false,
            cellEditorParams: _obj,
            valueSetter: (pms) => {
              //记录数据状态
              if (this.$common.isEmpty(pms.data._ColumnStatus)) {
                pms.data["_ColumnStatus"] = 1;
              }
              pms.api.flashCells({
                rowNodes: [pms.node],
                columns: [pms.colDef.field],
              });
              //保存修改值
              pms.data[pms.colDef.field] = pms.newValue;
              return true;
            },
          };
          //文本框类型渲染
          this.getEditType(_data, _obj, _col);

           //固定列处理
          if (_idx < fixedcolumn && fixedcolumn != -1) {
              _col.pinned = "left";
          }

          this.gridOptions.columnDefs.push(_col);
          //多级表头 to do
        }
      });
    },
    reloadData() {
      //重新加载数据
      this.reqPageData();
    },
    //获取动态界面数据
    async reqPageData() {
      //this.loadMsg("数据加载中......")
      let tool = this.$common;
      await this.$Http
        .post("page/page-data", Object.assign({}, this.pmsData, this.pageTool))
        .then((res) => {
          if (res.statusCode == 200) {
            res.data.forEach((item) => {
              item.tool = tool;
            });
            this.gridOptions.rowData = res.data;
            this.pageTool.count = res.count;
            this.pageTool.datacnt = res.data ? res.data.length : 0;
            this.pageTool.pagecnt = Math.ceil(this.pageTool.count / this.pageTool.pagesize);
            this.viewRender=true;
          }
        });
    },
    getEditType(_data, _obj, _col) {
      switch (Number(_obj.columnType)) {
        //文本编辑框
        case 1:
          _col.cellEditor = "PTableEditbox";
          break;
        //多行编辑框
        case 2:
          _col.cellEditor = "PTableTextArea";
          break;
        //代码编辑框
        case 3:
          _col.cellEditor = "PTableCodeEdit";
          break;
        //下拉框
        case 4:
          _col.cellEditor = "PTableSelectBoxEditor";
          _col.cellRenderer = (_pms) => {
            let _value = _pms.value;
            let _arrlist = _pms.colDef.cellEditorParams.ListArray.find((a) => {
              if (a.value == _value) return a;
            });
            if (!_arrlist) {
              return `<span style="color:red;">${_value}</span>`;
            } else {
              return _arrlist.display;
            }
          };
        //日期编辑框
        case 5:
          _col.cellEditor = "P_Table_DateTimeBoxEditor";
          _col.cellRenderer = function (params) {
            let _PublicProps = params.colDef.cellEditorParams.publicAttribute;
            if (_PublicProps.hasOwnProperty("inputAttrs")) {
              if (_PublicProps.inputAttrs.hasOwnProperty("dateformat")) {
                if (!this.$common.isEmpty(params.value)) {
                  let _date = new Date(
                    Date.parse(params.value.replace(/-/g, "/"))
                  );
                  return _date.format(_PublicProps.inputAttrs.dateformat);
                }
              }
            }
            return params.value;
          };
          break;
        case 6:
          _col.editable = false;
          _col.cellRenderer = function (params) {
              let _checkbox = document.createElement('span');
              let _isEdit = common.isBoolVal(params.colDef.cellEditorParams.isRequired)

              _checkbox.classList = ('el-checkbox__input ' + (_isEdit ? ' is-disabled' : ' ') + (common.isBoolVal(params.value) ? ' is-checked' : ' '));
              _checkbox.style = "height: 100%;width: 100%;display: flex;text-align: center;justify-content: center;align-items: center;"
              let _ch = document.createElement("span");
              _ch.classList = 'el-checkbox__inner';
              _checkbox.appendChild(_ch);
              if (!_isEdit) {
                  _checkbox.addEventListener("click", function () {
                      let me = params;
                      me.setValue((me.value == 1) ? 0 : 1);
                  });
              }
              return _checkbox;
          }
          break;
      }
      this.initTableRender(_obj, _col);
    },
    InitPublicProps(_data) {
      //处理表格公共属性
      if (this.$common.isEmpty(_data.publicAttribute)) {
        _data.publicAttribute = {};
      } else {
        if (typeof _data.publicAttribute === "string") {
          try {
            let _Obj = this.$common.getStrObjSync(_data.publicAttribute) || {};
            _data.publicAttribute = _Obj;
          } catch (e) {
            alert(`解析【${_data.id}】表格的公共属性字段出错！`);
          }
        }
      }
    },
    convertPublicProps(_col) {
      //处理列公共属性
      let me = this;
      //处理公共属性
      if (this.$common.isEmpty(_col.publicAttribute)) {
        _col.publicAttribute = {};
      } else {
        if (typeof _col.publicAttribute === "string") {
          try {
            let _colObj =
              this.$common.getStrObjSync(_col.publicAttribute) || {};
            _col.publicAttribute = _colObj;
          } catch (e) {
            alert(`解析【${_col.columnName}】字段publicAttribute出错！`);
          }
        }
      }
      //处理listArray
      if (this.$common.isEmpty(_col.selectData)) {
        _col.selectData = [];
      } else {
        if (typeof _col.selectData == "string") {
          try {
            let _list = this.$common.getStrObjSync(_col.selectData) || [];
            _col["selectData"] = _list;
          } catch (e) {
            alert(`解析【${_col.columnName}】字段处理selectData出错！`);
          }
        }
      }
    },
    initTableRender(_obj, _col) {
      //初始化列渲染函数
      let me = this;
      if (!this.$common.isEmpty(_obj.tabRender)) {
        try {
          let _tabcfg = this.getStrObjSync(_obj.tabRender);
          _col.cellRenderer = function (_pms) {
            return _tabcfg.call(me, _pms);
            //return `<span style="color:red;">123</span>`
            //return _tabcfg;
          };
        } catch (e) {
          alert(`解析【${_col.headerName}】字段tabRender出错！`);
        }
      }
    },
    getStrObjSync(v) {
      try {
        let _obj = null;
        var patt = new RegExp(/^(\s*return\s*{|\s*return)/);
        if (patt.test(v)) {
          _obj = new Function(v)();
        } else {
          _obj = new Function("'use strict';  return " + v)();
        }
        return _obj;
      } catch (e) {
        console.log(e);
        alert("转换失败" + v);
      }
    },
    //数据加载
    loadMsg(_msg) {
      this.loading = this.$loading({
        target: this.$el,
        spinner: "vab-loading-type9",
        lock: true,
        background: "rgba(150, 160, 165, 0.27)",
        text: _msg,
      });
    },
    //ag-grid创建完成后执行的事件
    onGridReady(params) {
      let me = this;
      // setTimeout(()=>console.log(me.gridCfg),1000)
      //事件处理
      if (this.gridCfg.publicAttribute.hasOwnProperty("events")) {
        let events = this.gridCfg.publicAttribute.events;
        for (var eventName in events) {
            this.gridApi.api.addEventListener(eventName, events[eventName]);
        }
      }
      if (this.otherPms.hasOwnProperty("events")) {
        let events = this.otherPms.events;
        for (var eventName in events) {
          this.gridApi.api.addEventListener(eventName, events[eventName]);
        }
      }
      this.afterOnReady.apply(me, arguments);
    },
    //单元格点击事件
    onCellClicked(cell) {
      //console.log(cell);
      // 获取选中单元格的数据
      //console.log(cell.value);
      // 获取选中单元格所在行号
      //console.log(cell.rowIndex);
      // 获取选中单元格所在行的数据
      //console.log(cell.data);
    },

    saveData() {
      //保存数据
      console.log("保存数据");
    },
    //初始化表格配置数据
    defaultInit() {
      this.cellWidth = 12;
      this.gridCfg = null;
      (this.loading = null),
        (this.gridApi = {}),
        (this.gridOptions = {
          defaultProps: {
            overlayNoRowsTemplate:
              '<span style="padding: 10px; border: 1px solid #999999; background: lightgoldenrodyellow;">数据为空</span>',
          },
          defaultColDef: {
            resizable: true,
          },
          suppressCopyRowsToClipboard: true,
          rowHeight: 40,
          headerHeight: 40,
          rowSelection: "single",
          singleClickEdit: true,
          animateRows: true,
          enableCellChangeFlash: true,
          rowDragManaged: true,
          suppressRowDrag: true,
          suppressContextMenu: true,
          suppressMoveWhenRowDragging: true,
          columnDefs: [],
          rowData: [],
        }),
        (this.gridaddData = {});
      this.gridDefData = {};
    },
  },
  components: {
    // AgGridVue:AgGridVue
    PDataTableTool,
    PTableHeader,
    PTableEditbox,
    PTableTextArea,
    PTableCodeEdit,
    PTableSelectBoxEditor,
  },
};
</script>

<style scoped>
.hxb-pdatatable {
  background: #fff;
  overflow: hidden;
  position: absolute;
  top: 0;
  margin: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
.hxb-pdatatable-middle {
  flex: 1;
}
.hxb-pdatatable-bottom {
  margin-top: 10px;
}
.hxb-pdatatable-middle >>> .ag-body-viewport::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.hxb-pdatatable-middle >>> .ag-body-viewport::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
.hxb-pdatatable-middle >>> .ag-body-viewport::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
.hxb-pdatatable-middle >>> .ag-body-viewport::-webkit-scrollbar-thumb:hover {
  background: rgb(134, 135, 233);
}
.hxb-pdatatable-middle >>> .ag-body-viewport::-webkit-scrollbar-corner {
  background: #179a16;
}
.hxb-pdatatable-middle >>> .ag-layout-normal::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.hxb-pdatatable-middle >>> .ag-theme-balham .ag-cell,
.ag-theme-balham .ag-full-width-row .ag-cell-wrapper.ag-row-group {
  line-height: 40px;
  border-right: 1px solid #ebeef5;
}
.hxb-pdatatable-middle >>> .ag-cell-inline-editing {
  height: 40px;
  border: 1px solid #409eff !important;
  padding: 0;
}
</style>