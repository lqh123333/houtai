<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input clearable placeholder="请输入内容" v-model="query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="sent">添加商品</el-button></el-col
        >
      </el-row>
      <el-table :data="Userlist" style="width: 100%" :border="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="商品名称"> </el-table-column>
        <el-table-column prop="price" label="商品价格"> </el-table-column>
        <el-table-column prop="weight" label="商品重量"> </el-table-column>
        <el-table-column prop="time" label="创建时间"> </el-table-column>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 6, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :model="FromDia"
      title="添加商品"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form :model="FromDia" ref="addform" label-width="70px">
        <el-form-item label="商品名称" prop="username">
          <el-input v-model="FromDia.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="password">
          <el-input v-model="FromDia.price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="password">
          <el-input v-model="FromDia.weight"></el-input>
        </el-form-item>
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
        <el-form-item label="商品名称" prop="username">
          <el-input v-model="updated.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="password">
          <el-input v-model="updated.price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="password">
          <el-input v-model="updated.weight"></el-input>
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
      FromDia: {
        name: "",
        price: "",
        weight: "",
        time: "",
      },
      updated: {
        i: "",
        name: "",
        price: "",
        weight: "",
      },
      dialogVisible: false,
      update: false,
      pagenum: 1,
      pagesize: 10,
      total: 6,
      query: "",
      Userlist: [
        {
          name: "王牌彩电",
          price: 999,
          weight: 110,
          time: "2021/11/28 10:33:11",
        },
        {
          name: "王牌手机",
          price: 3999,
          weight: 2,
          time: "2022/3/10 10:13:21",
        },
        {
          name: "王牌洗衣机",
          price: 599,
          weight: 100,
          time: "2022/1/27 10:21:11",
        },
        {
          name: "王牌电热锅",
          price: 199,
          weight: 50,
          time: "2021/4/28 10:21:11",
        },
        {
          name: "王牌空调",
          price: 2999,
          weight: 80,
          time: "2022/1/21 10:53:11",
        },
        {
          name: "王牌冰箱",
          price: 1999,
          weight: 110,
          time: "2021/9/11 12:00:00",
        },
      ],
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
          this.Userlist.splice(i, 1);
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
    Updates(i) {
      this.Userlist[i] = this.updated;
      this.update = false;
      this.$message.success("修改成功");
    },
    UpdateFun(i) {
      this.updated.i = i;
      this.updated = this.Userlist[i];
      this.update = true;
    },
    AddFrom() {
      const newarr = {
        name: this.FromDia.name,
        price: this.FromDia.price,
        weight: this.FromDia.weight,
        time: this.FromDia.time,
      };
      this.Userlist.push(newarr);
      this.dialogVisible = false;
      this.$message.success("添加成功");
      this.FromDia.name = "";
      this.FromDia.price = "";
      this.FromDia.weight = "";
      this.total = this.Userlist.length;
    },
    sent() {
      this.dialogVisible = true;
      var time=new Date().toLocaleString('chinese',{hour12:false});
      this.FromDia.time=time
    },
    search() {
      let newarr = [];
      this.Userlist.forEach((item) => {
        if (item.name.indexOf(this.query) > -1) {
          newarr.push(item);
        }
      });
      this.Userlist = newarr;
      this.total = this.Userlist.length;
    },
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.getUsers();
    },
    handleCurrentChange(newpage) {
      this.pagenum = newpage;
      this.getUsers();
    },
  },
};
</script>


<style scoped>
.box-card {
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.3) !important;
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>