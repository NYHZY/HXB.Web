<template>
  <div class="hxb-pdatatabletool">
    <div class="hxb-pdatatabletool-btn">
      <el-button size="mini" type="primary" @click="addData">新增</el-button>
			<el-button size="mini" type="success" @click="saveData">保存</el-button>
			<el-button size="mini" type="danger" @click="delData">删除</el-button>
			<!-- 分割线 -->
			<el-divider direction="vertical">
			</el-divider>
			<el-button size="mini" type="primary">扩展按钮</el-button>
    </div>
    <div class="hxb-pdatatabletool-page">
      <!-- 第一页 -->
      <el-button class="pageract" size="mini">
        <i class="el-icon-d-arrow-left btn-icon"></i>
      </el-button>
      <!-- 上一页 -->
      <el-button class="pageract" size="mini" >
        <i class="el-icon-arrow-left btn-icon"></i>
      </el-button><span>&nbsp;当前第&nbsp;</span>
      <el-input-number size="mini" style="width:80px;text-align:center;" v-model="tooldata.PageIndex" :controls="false">
      </el-input-number>&nbsp; <span>页 (共 {{1}} 页)</span>
      <!-- 下一页 -->
      <el-button class="pageract" size="mini">
        <i class="el-icon-arrow-right btn-icon"></i>
      </el-button>

      <!-- 最后页 -->
      <el-button class="pageract" size="mini">
        <i  class="el-icon-d-arrow-right btn-icon"></i>
      </el-button>

      <!-- 每页条数 -->
      <el-select size="mini" style="width:68px" v-model="tooldata.PageSize">
        <el-option v-for="item in options" :key="item.value+''" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <!-- 刷新 -->
      <el-button class="pageract" size="mini">
        <i class="el-icon-refresh btn-icon" style="">刷新</i>
      </el-button>
      <span v-if="true">
      &nbsp;
      第 {{1}} 到 {{ 20}}
      条，共
      {{63}} 条
      </span>
      <span v-else>
      &nbsp;
      暂无数据
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options:[
        {
          value: 10,
          label: 10
        },
        {
          value: 20,
          label: 20
        },
        {
          value: 50,
          label: 50
        },
        {
          value: 100,
          label: 100
        }
      ],
      tooldata:{
        PageIndex:1,
        PageSize:10
      }
    }
  },
  methods:{
    addData(){
        //新增行
      },
      saveData(){
        //保存
      },
      delData(){
        //删除
      }
  }
}
</script>

<style scoped>
.hxb-pdatatabletool-btn{
  float: left;
}
.hxb-pdatatabletool-page{
    float: right;
    margin-right: 20px;
  }
.pageract {
            padding: 5px 5px;
            border: 0px;
        }
span{
  font-size: 12px;
}
 .btn-icon {
            color: #409eff;
            font-size: 14px;
            font-weight: bold;
        }

</style>>