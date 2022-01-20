<template>
<div>
  <button @click="dialogVisible=true">开</button>
  <el-dialog
        @open="open"
        :visible.sync="dialogVisible"
        class="editor_container auto_dialog"
        width="90%"
        :append-to-body="true"
        :destroy-on-close="true">
        <div style="height: 100%; width: 100%; display: flex; flex-direction: column">
          <div ref="container" style="height: 360px;width: 100%;"></div>
        </div>
        
  </el-dialog>
</div>

   
</template>
<script>

export default {
  data(){
    return{
      monacoEditor: { },
      dialogVisible:false
    }
  },
  mounted() {
    console.log(this.$refs.container);
    
    
},
  methods:{
    changeEditor() { // 更改editor内容
        this.monacoEditor.setValue(result.data);
        this.monacoEditor.getAction('editor.action.formatDocument')._run();
    },
    destroyEditor() { // 销毁编辑器
        this.monacoEditor.dispose();
    },
    open(){
      let me=this;
      console.log(me.$monaco)
      this.$Vue.nextTick(() =>{
        me.monacoEditor = me.$monaco.editor.create(me.$refs.container, {
        value: '内容',
        readOnly: false,
        language: 'javascript',
        fontSize: 14,
        theme: 'vs-dark'
    });
      })
      
    }
  }
}
</script>
<style scoped>
.qrcode{
 width: 500px;
 height: 500px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
.box{
  widows: 100%;
  height: 100%;
}
</style>