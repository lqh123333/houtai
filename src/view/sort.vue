<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="4"
      ><el-button type="primary" @click="sent">添加商品</el-button></el-col
    >
    <el-table
      :data="Userlist"
      style="width: 100%"
      row-key="id"
      :border="true"
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column prop="isno" label="是否有效">
        <template slot-scope="scope">
          <div>
            <i
              class="el-icon-success"
              style="color: #aeff5e"
              v-if="scope.row.isno == true"
            ></i>
            <i
              class="el-icon-error"
              v-if="scope.row.isno == false"
              style="color: red"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="leve" label="排序">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.leve == '1'">一级</el-tag>
            <el-tag v-else-if="scope.row.leve == '2'" type="success"
              >二级</el-tag
            >
            <el-tag v-else-if="scope.row.leve == '3'" type="warning"
              >三级</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="UpdateFun(scope.row.id)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="open(scope.row.id)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :model="FromDia"
      title="添加商品"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form :model="FromDia" ref="addform" label-width="70px">
        <el-form-item label="分类名称" prop="username">
          <el-input v-model="FromDia.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-select v-model="FromDia.region" placeholder="请选择">
            <el-option label="大家电" value="1"> </el-option>
            <el-option label="车" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-switch
          v-model="FromDia.value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFrom">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :model="updated"
      title="修改商品"
      :visible.sync="update"
      width="50%"
    >
      <el-form :model="updated" ref="addform" label-width="70px">
        <el-form-item label="分类名称" prop="username">
          <el-input v-model="updated.name"></el-input>
        </el-form-item>
        <el-switch
          v-model="updated.isno"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button type="primary" @click="Updates(updated.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updated: {
        id: "",
        name: "",
        isno: "",
        leve:''
      },
      update: false,
      dialogVisible: false,
      FromDia: {
        name: "",
        region: "",
        value: false,
      },
      Userlist: [
        {
          id: 1,
          name: "大家电",
          isno: true,
          leve: "1",
          children: [
            {
              id: 21,
              name: "电视",
              isno: true,
              leve: "2",
            },
            {
              id: 22,
              name: "空调",
              isno: true,
              leve: "2",
            },
          ],
        },
        {
          id: 2,
          name: "车",
          isno: true,
          leve: "1",
          children: [
            {
              id: 23,
              name: "小轿车",
              isno: true,
              leve: "2",
            },
            {
              id: 24,
              name: "面包车",
              isno: true,
              leve: "2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    Updates(i) {
        if(i<10){
        this.Userlist[this.Userlist.findIndex((role) => role.id === i)]=this.updated;
      }else if(i==21||i==22){
        this.Userlist[0].children[this.Userlist[0].children.findIndex((role) => role.id === i)]=this.updated;
      }else if(i==23||i==24){
        this.Userlist[1].children[this.Userlist[1].children.findIndex((role) => role.id === i)]=this.updated;
      }if(i==101){
        this.Userlist[0].children[this.Userlist[0].children.findIndex((role) => role.id === i)]=this.updated;
      }if(i==102){
        this.Userlist[1].children[this.Userlist[1].children.findIndex((role) => role.id === i)]=this.updated;
      }
      
      this.update=false
      this.$message.success("修改成功");
    },
    UpdateFun(i) {
      let arr = [];
      this.update = true;
      if(i<10){
        arr =this.Userlist[this.Userlist.findIndex((role) => role.id === i)];
      }else if(i==21||i==22){
        arr =this.Userlist[0].children[this.Userlist[0].children.findIndex((role) => role.id === i)];
      }else if(i==23||i==24){
        arr =this.Userlist[1].children[this.Userlist[1].children.findIndex((role) => role.id === i)];
      }else if(i==101){
        arr =this.Userlist[0].children[this.Userlist[0].children.findIndex((role) => role.id === i)];
      }else if(i==102){
        arr =this.Userlist[1].children[this.Userlist[1].children.findIndex((role) => role.id === i)];
      }
      this.updated=arr
      console.log(arr,i);
    },
    AddFrom() {
      const newarr = {
        id: 101,
        name: this.FromDia.name,
        isno: this.FromDia.value,
        leve: "2",
      };
       const newarr1 = {
        id: 102,
        name: this.FromDia.name,
        isno: this.FromDia.value,
        leve: "2",
      };
      if (this.FromDia.region == 1) {
        this.Userlist[0].children.push(newarr);
        this.FromDia.name = "";
        this.FromDia.value = false;
        this.dialogVisible = false;
      }
      if (this.FromDia.region == 2) {
        this.Userlist[1].children.push(newarr1);
        this.FromDia.name = "";
        this.FromDia.value = false;
        this.dialogVisible = false;
      }
    },
    sent() {
      this.dialogVisible = true;
    },
    open(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Userlist = this.Userlist.filter((item) => {
            return item.id != i;
          });
          this.Userlist[0].children = this.Userlist[0].children.filter(
            (item) => {
              return item.id != i;
            }
          );
          this.Userlist[1].children = this.Userlist[1].children.filter(
            (item) => {
              return item.id != i;
            }
          );

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
  },
};
</script>

<style scoped>
.box-card {
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.3) !important;
}
.el-table {
  margin-top: 70px;
}
.el-pagination {
  margin-top: 15px;
}
</style>