<template>
  <div class="p-table-header">
	<div class="title" :style='titleStyle'>{{params.columnText}} </div>
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
  }
}
</script>

<style>
.p-table-header{
  width: 100%;
}
</style>