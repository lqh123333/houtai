<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请选择商品分类：">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="家电" value="1"></el-option>
          <el-option label="手机" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-col :span="4"
      ><el-button type="primary" @click="sent">添加参数</el-button></el-col
    >
    <el-table
      :data="Userlist"
      style="width: 100%"
      :border="true"
      v-if="formInline.region == 2"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="参数名称"> </el-table-column>
      <el-table-column prop="size" label="参数值"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="UpdateFun(scope.$index)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="open(scope.$index)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="Userlist1"
      style="width: 100%"
      :border="true"
      v-if="formInline.region == 1"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="参数名称"> </el-table-column>
      <el-table-column prop="size" label="参数值"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="UpdateFun(scope.$index)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="open(scope.$index)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="Userlist2"
      style="width: 100%"
      :border="true"
      v-if="formInline.region == ''"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="参数名称"> </el-table-column>
      <el-table-column prop="size" label="参数值"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="UpdateFun(scope.$index)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="open(scope.$index)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :model="FromDia"
      title="添加参数"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form :model="FromDia" ref="addform" label-width="70px">
        <el-form-item label="参数名称" prop="username">
          <el-input v-model="FromDia.name"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="password">
          <el-input v-model="FromDia.size"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFrom">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      :model="updated"
      title="修改参数"
      :visible.sync="update"
      width="50%"
    >
      <el-form :model="updated" ref="addform" label-width="70px">
        <el-form-item label="参数名称" prop="username">
          <el-input v-model="updated.name"></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="password">
          <el-input v-model="updated.size"></el-input>
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
        updated:{
            i:'',
            name:'',
            size:''
        },
        update:false,

      FromDia: {
        name: "",
        size: ""
      },
      dialogVisible: false,
      Userlist2: [],
      Userlist: [
        {
          name: "屏幕",
          size: "曲面",
        },
        {
          name: "重量",
          size: "2.3",
        },
        {
          name: "尺寸",
          size: "6.62",
        },
        {
          name: "刷新率",
          size: "120",
        },
      ],
      Userlist1: [
        {
          name: "功率",
          size: "5",
        },
        {
          name: "重量",
          size: "40",
        },
        {
          name: "尺寸",
          size: "50",
        },
        {
          name: "刷新率",
          size: "120",
        },
      ],
      formInline: {
        region: "",
      },
    };
  },
  methods: {
    open(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            if (this.formInline.region == 2){
            this.Userlist.splice(i, 1);
         }else if(this.formInline.region == 1){
            this.Userlist1.splice(i, 1);
         }
          
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
        this.update=true
         if (this.formInline.region == 2){
            this.updated=this.Userlist[i]
         }else if(this.formInline.region == 1){
            this.updated=this.Userlist1[i]
         }
    },
     Updates(i){
         if (this.formInline.region == 2){
            this.Userlist[i]=this.updated
         }else if(this.formInline.region == 1){
            this.Userlist1[i]=this.updated
         }
        this.update=false
        this.$message.success("修改成功");
        
    },
    AddFrom() {
      const newarr = {
        name: this.FromDia.name,
        size: this.FromDia.size,
      };
       if (this.formInline.region == 2) {
        this.Userlist.push(newarr);
        this.dialogVisible = false;
        this.$message.success("添加成功");
        this.FromDia.name = "";
        this.FromDia.size = "";
      }else if (this.formInline.region == 1) {
        this.Userlist1.push(newarr);
        this.dialogVisible = false;
        this.$message.success("添加成功");
        this.FromDia.name = "";
        this.FromDia.size = "";
      }
    },
    sent() {
        if (this.formInline.region == ''){
            this.$message.error("请选择商品");
        }else{
            this.dialogVisible = true;
        }
      
    },
  },
};
</script>

<style scoped>
.box-card {
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.3) !important;
}
.el-table {
  margin-top: 60px;
}
.el-pagination {
  margin-top: 15px;
}
</style>