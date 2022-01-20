<template>
  <div class="P_SelectBoxEditor">
    <el-select
      v-model="value"
      v-bind="option"
      placeholder=""
      v-on="inputEvents"
      ref="SelectBoxEditor"
      :clearable="isMust"
      style="width: 100%;background:white"
      @change="change()"
    >
      <el-option
        v-for="item in listArry"
        :key="item.value"
        :label="item.display"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "P_SelectBoxEditor",
  data() {
    return {
      option: {
        filterable: true,
        size: "small",
      },
      listArry: [],
      inputEvents: {}, //文本框事件
      value: "",
      isMust: true,
    };
  },
  methods: {
    isPopup() {
      return false;
    },
    focusOut() {
      return false;
    },

    getValue() {
      return this.value;
    },
    change() {
      this.params.api.stopEditing();
    },
  },
  mounted() {
    let me = this;
    let api = this.params;
    this.value = this.params.value;
    //是否必填
    this.isMust = this.params.IsMust != 1;
    //数据类型转换
    try {
      if (this.params.ListArray.length) {
        if (
          typeof this.params.ListArray[0].value == "string" 
        ) {
          this.value = String(this.params.value);
        }
        if (
          typeof this.params.ListArray[0].value == "number" 
        ) {
          this.value = Number(this.params.value);
        }
      }
      if (!this.value) this.value = "";
    } catch (error) {
      console.log(error);
    }
    //处理公共事件
    // if (this.params.PublicProps.hasOwnProperty("inputEvents")) {
    //   Object.keys(this.params.PublicProps.inputEvents).forEach((name) => {
    //     let _func = this.params.PublicProps.inputEvents[name];

    //     if (typeof _func == "function") {
    //       let letEvent = function () {
    //         let _arguments = arguments;
    //         return _func.apply(me, _arguments);
    //       };
    //       let _obj = {};
    //       _obj[name] = letEvent;
    //       Object.assign(this.inputEvents, _obj);
    //     }
    //   });
    // }
    //数据获取
    // if (this.params.PublicProps.hasOwnProperty("cascade")) {
    //   let cascadeField = this.params.PublicProps.cascade.cascadeField;
    //   let cascadeValue = this.params.data[cascadeField];
    //   let _obj = { colid: this.params.Id };
    //   _obj[cascadeField] = cascadeValue;
    //   httpPost(
    //     appHome.basesrc + "/page/GetDataArray",
    //     Object.assign({}, common.getRouteParmter(), _obj)
    //   )
    //     .then((res) => {
    //       if (res.success) {
    //         this.listArry = res.data;
    //       } else {
    //         this.$alert(res.message, "错误提示", { type: "error" });
    //       }
    //     })
    //     .catch((err) => {
    //       this.$alert(err, "错误提示", { type: "error" });
    //     });
    // } else {
    //   this.listArry = this.params.ListArray;
    // }
    this.listArry = this.params.ListArray;
  },
};
</script>

<style scoped>
.P_SelectBoxEditor>>>.el-input--small .el-input__inner{
  border: none!important;
}
</style>