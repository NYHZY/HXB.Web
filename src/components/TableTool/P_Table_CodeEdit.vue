<template>
  <div class="P_Table_CodeEdit">
    <el-input
      style="width: 100%"
      v-bind="option"
      type="text"
      v-model="value"
      ref="CodeEdit"
    ></el-input>
    <i
      slot="suffix"
      class="el-input__icon el-icon-edit-outline input_icon"
      @click="dialogShow"
    ></i>
    <el-dialog
      @open="init"
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      class="editor_container auto_dialog"
      width="90%"
      top="2vh"
      :append-to-body="true"
      :destroy-on-close="true">
      <div slot="default"
        style="height: 100%; width: 100%; display: flex; flex-direction: column">
        <el-select
          v-if="selectrender"
          v-model="language"
          size="small"
          style="width: 100%; margin-bottom: 5px"
          @change="change">
          <el-option
            v-for="item in languageList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div ref="MonacoEditor_Input" style="flex:2;width:100%;"></div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="yesBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    name: "P_Table_CodeEdit";
    return {
      option: {
        size: "small",
      },
      selectrender: false,
      language: 'plaintext',
      languageList: [
        { label: 'plaintext', value: 'plaintext', disabled: false },
        { label: 'html', value: 'html', disabled: false },
        { label: 'javascript', value: 'javascript', disabled: false },
        { label: 'json', value: 'json', disabled: false },
        { label: 'less', value: 'less', disabled: false },
        { label: 'css', value: 'css', disabled: false },
        { label: 'sql', value: 'sql', disabled: false },
        { label: 'typescript', value: 'typescript', disabled: false },
        { label: 'xml', value: 'xml', disabled: false }
      ],
      code_edit_type: {},
      monacoBox: {},
      value: '',
      title: null,
      dialogVisible: false,
    };
  },
  methods: {
    isPopup(x) {
      return false;
    },
    focusOut() {
      return false;
    },
    focusIn() {
      return false;
    },
    getValue() {
      return this.value;
    },
    onKeyDown(event) {},
    dialogShow() {
      this.dialogVisible = true;
    },
    yesBtn() {
      this.dialogVisible = false;
      this.value = this.monacoBox.getValue();
      this.params.api.stopEditing();
    },
    cancelBtn() {
      this.dialogVisible = false;
    },
    change(value) {

      this.code_edit_type[this.params.colDef.cellEditorParams.Id] = value;
      localStorage.setItem(
        "code_edit_type",
        JSON.stringify(this.code_edit_type)
      );
      this.monacoBox.setModel(
        this.$monaco.editor.createModel(this.monacoBox.getValue(), value)
      );
    },
    init() {
      let me = this;
      let _options={
        value:me.value,
        fontSize:14,
        theme:'vs-dark',
        language:me.language
      }
      this.$Vue.nextTick(() =>{
        this.monacoBox=me.$monaco.editor.create(me.$refs.MonacoEditor_Input, _options);
      });
    },
    open() {
      this.init();
    },
  },
  mounted() {
    this.value = this.params.value;
    this.title = this.params.colDef.headerName;
    this.code_edit_type =JSON.parse(localStorage.getItem("code_edit_type")) || {};
    this.language =this.code_edit_type[this.params.colDef.cellEditorParams.Id] ||"plaintext";
    this.selectrender = true;
    this.$Vue.nextTick(() => {
      this.$refs.CodeEdit.select();
    });
  },
};
</script>

<style scoped>
.P_Table_CodeEdit {
  background: white;
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.editor_container>>>.el-dialog__header{
  padding: 5px 5px 5px !important;
}
.P_Table_CodeEdit >>> .el-input__inner {
  border: none;
}
.editor_container>>>.el-dialog__body{
  padding: 5px 5px;
  height: 80vh;overflow: auto;
}
</style>