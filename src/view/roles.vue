<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="4"
      ><el-button type="primary" @click="Sent">添加用户</el-button></el-col
    >

    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="角色名称" >
      </el-table-column>
      <el-table-column prop="name" label="角色描述" >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="UpdateFun(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="open(scope.$index)"
              >删除</el-button
            >
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button size="mini" type="warning" icon="el-icon-s-tools"
                >分配权限</el-button
              >
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :model="FromDia"
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form :model="FromDia" ref="addform" label-width="70px">
        <el-form-item label="角色名称" prop="username">
          <el-input v-model="FromDia.date"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="password">
          <el-input v-model="FromDia.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFrom">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :model="FromDia"
      title="修改用户"
      :visible.sync="update"
      width="50%"
    >
      <el-form :model="updated" ref="addform" label-width="70px">
        <el-form-item label="角色名称" prop="username">
          <el-input v-model="updated.date"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="password">
          <el-input v-model="updated.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button type="primary" @click="Updates(updated.i)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updated: {
        i:'',
        date:'',
        name:''
      },
      update: false,
      FromDia: {
        date: "",
        name: "",
      },
      dialogVisible: false,
      tableData: [
        {
          date: "主管",
          name: "技术负责人",
        },
        {
          date: "销售部",
          name: "部门经理",
        },
        {
          date: "一般管理员",
          name: "管理一般事务",
        },
        {
          date: "普通管理员",
          name: "管理普通事务",
        },
      ],
    };
  },
  methods: {
    Sent() {
      this.dialogVisible = true;
    },
    AddFrom() {
      if (this.FromDia.date != "") {
        const newarr = {
          date: this.FromDia.date,
          name: this.FromDia.name,
        };
        this.tableData.push(newarr);
        this.dialogVisible = false;
        this.$message.success("添加成功");
        this.FromDia.date = "";
        this.FromDia.name = "";
      } else {
        this.$message.error("角色名称不能为空");
      }
    },
    open(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(i, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    UpdateFun(i){
        this.updated.i=i
        this.updated=this.tableData[i]
        this.update=true
    },
    Updates(i){
        this.tableData[i]=this.updated
        this.update=false
        this.$message.success("修改成功");
        
    }
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 70px;
}
</style>