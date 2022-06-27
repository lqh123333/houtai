<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7"
          ><el-input
            clearable
            placeholder="请输入内容"
            v-model="query"
            @clear="clear"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="Sent">添加用户</el-button></el-col
        >
      </el-row>
      <el-table :data="Userlist" style="width: 100%" :border="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="r_name" label="角色"> </el-table-column>
        <el-table-column prop="isno" label="状态">
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.isno"
                @change="Change(scope.row)"
              >
              </el-switch>
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

              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-s-tools"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :model="FromDia"
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="FromDia"
        :rules="rules"
        ref="addform"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="FromDia.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="FromDia.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="FromDia.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="FromDia.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFrom"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :model="FromDia"
      title="修改用户"
      :visible.sync="update"
      width="50%"
    >
      <el-form
        :model="FromDia"
        :rules="Uprules"
        ref="addform"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="updated.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updated.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updated.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="update= false">取 消</el-button>
        <el-button type="primary" @click="Updates(updated.id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
   
  </div>
</template>

<script>
export default {
  mounted() {
    this.getUsers();
  },
  data() {

    let  checkEmail=(rule,value,ck)=>{
      var email=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-z0-9_-]+)+$/
      if(email.test(value)){
        return ck()
      }
      ck(new Error('请输入合法邮箱'))
      };
     var checkPhone=(rule,value,ck)=>{
      var phone=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

      if(phone.test(value)){
        return ck()
      }
      ck(new Error('请输入合法手机号'))
      };
    return {
      updated:{},
      pagenum: 1,
      pagesize: 2,
      Userlist: [],
      total: 0,
      query: "",
      dialogVisible: false,
      update:false,
      FromDia:{
        username:'',
        password:'',
        email:'',
        phone:''
      },
      rules:{
        username:[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 ~ 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 ~ 12 个字符', trigger: 'blur' }
        ],
        email:[
           { required: true, message: '请输入邮箱', trigger: 'blur' },
           {validator:checkEmail,trigger:"blur"}

        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
           {validator:checkPhone,trigger:"blur"}
        ]

      },
      Uprules:{
        // email:[
        //    { required: true, message: '请输入邮箱', trigger: 'blur' },
        //    {validator:checkEmail,trigger:"blur"}

        // ],
        // phone:[
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //    {validator:checkPhone,trigger:"blur"}
        // ]
      }
      
    };
  },
  methods: {
    async getUsers() {
      const { data: res } = await this.$http.get("/api/users", {
        params: {
          query: this.query,
          page: this.pagenum,
          size: this.pagesize,
        },
      });
      this.total = res.msg.total;
      // console.log(res);
      if (res.msg.status != 200) return this.$message.error("数据查询失败");
      this.Userlist = res.data;
      // this.$message.success(res.msg.message)
    },
    async Change(datas) {
      const { data: res } = await this.$http.get("/api/change", {
        params: {
          status: datas.isno,
          id: datas.id,
        },
      });
      console.log(res);
      if (res.status != 200) return this.$message.error("修改失败");
      this.$message.success(res.msg);
    },
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.getUsers();
    },
    handleCurrentChange(newpage) {
      this.pagenum = newpage;
      this.getUsers();
    },
    search() {
      this.getUsers();
    },
    clear() {
      this.getUsers();
    },
    Sent() {
      this.dialogVisible = true;
    },
    AddFrom(){
      this.$refs.addform.validate(async(vail)=>{
        if(!vail) return
        const {data:res}=await this.$http.post('/api/register',{
          ...this.FromDia
        })
        if(res.status!==200) return this.$message.error('用户添加失败')
        this.$message.success('添加成功')
        this.dialogVisible=false
        this.$refs.addform.resetFields()
         this.getUsers();

      })
    },
    async UpdateFun(id){
      const {data:res}=await this.$http.get('/api/users/'+id)
      // console.log(res);
      if(res.msg.status !==200) return this.$message.error('数据获取失败')
      this.updated=res.data
      this.update=true
    },
    async Updates(id){
      const {data:res}=await this.$http.post('/api/upuser',{
        id,
        email:this.updated.email,
        phone:this.updated.phone
      })
      // console.log(res);
      if(res.status!==200) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      this.update=false
      this.getUsers();
    },
     open(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data:res}=await this.$http.delete('/api/users/'+id)
          if(res.status!==200) return this.$message.error('删除失败')
          // console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUsers();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
 
};
</script >


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