<template>
  <div class="main-content">
  <SysTabs></SysTabs>
  </div>
</template>
<script>
import SysTabs from '../components/SysTabs.vue'
export default {
  data() {
    return {
      
    }
  },
  components:{
    SysTabs
  }
}
</script>
<style scoped>
.main-content{
  width: 100%;
  height: 100%;
  background-color:rgb(229, 241, 237);
}
</style>