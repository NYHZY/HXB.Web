<template>
 <div class="syshome">
 <Header @asideCollapse="controlaside"></Header>
 <div class="container">
   <Aside :isCollapse='isCollapse'></Aside>
   <SysMain></SysMain>
 </div>
 </div>
</template>
<script>
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import SysMain from '../components/SysMain.vue'
export default {
  data() {
    return {
      isCollapse:false
    }
  },
  methods:{
    controlaside(isCollapse){
      this.isCollapse=isCollapse
    }
  },
  components:{
    Aside,
    SysMain,
    Header
  }
}
</script>
<style scoped>
.syshome{
  width: 100%;
  height: 100%;
  position:absolute;
}
.container{
  width: 100%;
  height: 100%;
  display: flex;
}
</style>