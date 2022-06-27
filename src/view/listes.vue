<template>
  <div>
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="7"
          ><el-input clearable placeholder="请输入内容" v-model="query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button> </el-input
        ></el-col>
    <el-table :data="Userlist" style="width: 100%" :border="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="num" label="订单编号"> </el-table-column>
        <el-table-column prop="price" label="订单价格"> </el-table-column>
        <el-table-column prop="isno" label="是否付款"> </el-table-column>
        <el-table-column prop="isshow" label="是否发货"> </el-table-column>
        <el-table-column prop="time" label="下单时间"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <div>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-location-information"

              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            Userlist:[
                // {
                //     num:'',
                //     price:'',
                //     isno:'',
                //     isshow:'',
                //     time:''
                // }
            ]
        }
    },
}
</script>

<style scoped>
.box-card {
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.3) !important;
}
.el-table {
  margin-top: 80px;
}
.el-pagination {
  margin-top: 15px;
}
</style>