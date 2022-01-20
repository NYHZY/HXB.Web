import Vue from 'vue'
import Aside from "../components/SysAside.vue";
import Header from "../components/Header.vue";
import SysMain from "../components/SysMain.vue";
import Drag from "../components/Drag.vue";
import PDataTable from "../components/DynamicTable/PDataTable.vue";
import PTreeLayout from "../components/DynamicTree/PTreeLayout.vue"



const components = { Aside, Header, Header, SysMain, Drag, PDataTable,PTreeLayout}
Object.keys(components).forEach((key)=>{
  var name=key.replace(/(\w)/,(v)=>v.toUpperCase());;
  Vue.component(`${name}`,components[key])
})