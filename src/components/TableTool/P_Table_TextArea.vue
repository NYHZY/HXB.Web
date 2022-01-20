<template>
  <div class="P_Table_TextArea">
    <el-input style="width:100%" v-bind="option" type="text" v-model="value" ref="TextArea"></el-input>
    <i slot="suffix" class="el-input__icon el-icon-edit-outline input_icon" @click="dialogShow"></i>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogVisible" class="editor_container"
		width="600px" append-to-body destroy-on-close>
		<div slot="default">
			<el-input :autosize="{ minRows: 12, maxRows: 12}" type="textarea" placeholder="请输入内容" v-model="oldValue">
			</el-input>
		</div>
		<div slot="footer" class="dialog-footer" style="text-align: center;">
			<el-button @click="cancelBtn()">取 消</el-button>
			<el-button type="primary" @click="yesBtn()">确 定</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        size: "small"
      },
      value: null,
      title: null,
      dialogVisible: false,
      oldValue: ""
    }
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
    onKeyDown(event) { },
    dialogShow() {
        this.oldValue = this.value;
        this.dialogVisible = true;
    },
    yesBtn() {
        this.dialogVisible = false;
        this.value = this.oldValue;
        this.params.api.stopEditing();
    },
    cancelBtn() {
        this.dialogVisible = false;
    }
  },
  mounted(){
    this.value = this.params.value;
    this.title = this.params.colDef.headerName;
    this.$Vue.nextTick(() => {
        this.$refs.TextArea.select();
    });
  }
}
</script>

<style scoped>
.P_Table_TextArea{
  background: white;
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.P_Table_TextArea>>>.el-input__inner{
    border: none;
  }
</style>