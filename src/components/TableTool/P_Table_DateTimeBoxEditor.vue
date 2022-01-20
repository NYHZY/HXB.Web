<template>
  <el-date-picker
    v-model="value"
    type="date"
    ref="P_DateTimeBoxEditor"
  >
  </el-date-picker>
</template>
<script>
export default {
  name: "P_DateTimeBoxEditor",
  data() {
    return {
      type: "date",
      format: "yyyy-MM-dd",
      value: "",
    };
  },
  methods: {
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
      if (!common.isEmpty(this.value)) {
        let _date = new Date(this.value);
        return _date.format(this.format);
      } else {
        return "";
      }
    },
    onKeyDown(event) {},
    stop() {
      this.params.stopEditing(false);
    },
  },
  mounted() {
    if (this.params.PublicProps.hasOwnProperty("inputAttrs")) {
      if (this.params.PublicProps.inputAttrs.hasOwnProperty("dateformat")) {
        if (this.params.PublicProps.inputAttrs.dateformat == "yyyy-MM-dd") {
          this.type = "date";
          this.format = this.params.PublicProps.inputAttrs.dateformat;
        }
        if (this.params.PublicProps.inputAttrs.dateformat == "yyyy-MM") {
          this.type = "month";
          this.format = this.params.PublicProps.inputAttrs.dateformat;
        }
        if (
          this.params.PublicProps.inputAttrs.dateformat == "yyyy-MM-dd HH:mm:ss"
        ) {
          this.type = "datetime";
          this.format = this.params.PublicProps.inputAttrs.dateformat;
        }
      }
    }
    this.value = this.params.value;
    Vue.nextTick(() => {
      this.$refs.P_Table_DateTimeBoxEditor.focus();
    });
  },
};
</script>
<style scoped>
</style>