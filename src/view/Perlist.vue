<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="Perlist" style="width: 100%" :border="true">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="#" label="路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="Perlist[scope.$index].level == '0'">一级</el-tag>
            <el-tag v-else-if="Perlist[scope.$index].level == '1'" type="success"
              >二级</el-tag
            >
            <el-tag v-else-if="Perlist[scope.$index].level == '2'" type="warning"
              >三级</el-tag
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getPer(this.n);
  },
  data() {
    return {
      Perlist: [{ level: "" }],
      n: "list",
    };
  },
  methods: {
    async getPer(type) {
      const { data: res } = await this.$http.get("/api/rights/" + type, {});

      if (res.msg.status != 200) return this.$message.error("数据查询失败");
      this.Perlist = res.data;
      console.log(this.Perlist);
    },
  },
};
</script>

<style>
</style>