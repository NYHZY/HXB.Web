<template>
  <div class="p-table-header">
	<div class="title" :style='titleStyle'>{{params.Text}} </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      titleStyle: {},//title样式
    }
  },
  created(){
    this.titleStyle["text-align"]=this.params.TextAlgin

    console.log(this.titleStyle["text-align"])
  }
}
</script>

<style>
.p-table-header{
  width: 100%;
}
</style>