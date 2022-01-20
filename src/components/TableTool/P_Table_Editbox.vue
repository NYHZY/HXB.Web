<template>
  <div class="P_Table_Editbox">
    <el-input
    style="100%"
    ref="Editbox"
    v-model="value"
    v-bind="option">
    </el-input>
  </div>
</template>

<script>
export default {
  data(){
    name:'Editbox'
    return{
      option: {
        clearable:true,
        size:'small',
        type:'text'
      },
      value:null
    }
  },
  methods:{
    isPopup(x) {
            return false;
    },
    focusOut() {
        return true;
    },
    focusIn() {
        return true;
    },
    getValue() {
        return this.value;
    },
    onKeyDown(event) {

    },
    stop() {
        this.params.stopEditing(false);
    }
  },
  mounted(){
    console.log(this.params);
    this.value = this.params.value;
    if (this.params.dataType == 1) {
          this.option.type = "password";
      }
      if (this.params.dataType == 1) {
          this.option.type = "number";
      }
    this.$Vue.nextTick(() => {
        this.$refs.Editbox.select();
      });
  }
}
</script>

<style scoped>
.P_Table_Editbox{
  height: 100%;
  width: 100%;
}
input {
        border: 0px;

    }
.P_Table_Editbox>>>.el-input__inner{
    border: none;
  }
.P_Table_Editbox>>>.el-input{
  background-color: white;
}
</style>