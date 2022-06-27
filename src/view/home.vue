<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="head_box" @click="to">
          <div class="pain">
            <img src="../assets/logo1.png" alt="" />
          </div>
          <h3>后台管理系统</h3>
        </div>
        <el-button type="info" icon="el-icon-unlock" @click="Back"
          >退出</el-button
        >
      </el-header>
      <el-container>
        <el-aside :width="state ? '64px' : '200px'">
          <div class="target" @click="Tgell">
            <i :class="state ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
          <el-menu
            ref="menuDom"
            :default-active="$store.state.Activepath"
            class="el-menu-vertical-demo"
            background-color="#6ed3f4"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
            :unique-opened="true"
            :collapse="state"
            :collapse-transition="false"
            @open="Open"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in list"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>

              <el-menu-item-group
                v-for="items in item.children"
                :key="items.id"
              >
                <el-menu-item
                  :index="items.path"
                  @click="ActivePath(items.path)"
                  ><i class="el-icon-document"></i
                  >{{ items.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      iconObj: {
        1: "el-icon-user-solid",
        2: "el-icon-s-help",
        3: "el-icon-s-shop",
        4: "el-icon-s-order",
        5: "el-icon-s-data",
      },
      state: false,
    };
  },

  mounted() {
    this.$store.state.Activepath = sessionStorage.getItem("path");
    this.ListDate();
  },

  methods: {
    to(){
        this.$router.replace('/welcome')
    },
    Back() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    async ListDate() {
      const { data: res } = await this.$http.get("/api/menus");
      // console.log(res.data);

      if (res.meta.status !== 200)
        return this.$message.error(res.data.meta.message);
      this.list = res.data;
    },
    ActivePath(ActivePath) {
      sessionStorage.setItem("path", ActivePath);
      this.$store.commit("Tage", ActivePath);
      // this.Activepath=ActivePath
    },
    Tgell() {
      this.state = !this.state;
    },

    Open(index) {
      console.log(this.$refs.menuDom);
      this.$store.state.obj = this.$refs.menuDom;
      this.$store.state.num = index;
    },
  },
};
</script>

<style  lang="less" scoped>
.container {
  height: 100vh;
}
.el-container {
  height: 100%;
}
.el-header {
  background: #68cbed;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.pain {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  // border: 2px solid #fff;
  overflow: hidden;
  margin-right: 5px;
}
.pain img {
  width: 100%;
  height: 100%;
}
.head_box {
  display: flex;
  align-items: center;
}
.el-aside {
  height: 100%;
  background: #6ed3f4;
}
.el-icon-user-solid {
  color: #fff;
}
/deep/ .el-submenu__title i {
  color: #fff;
}
.el-icon-document {
  color: #fff;
}
.el-menu {
  border: none;
}
.target {
  height: 35px;
  background-color: rgb(120, 254, 254);
  text-align: center;
  line-height: 35px;
  color: #fff;
  font-size: 20px;
}
/deep/ .el-menu-item-group__title{
  padding: 0;
}
// .el-icon-document{
//   // color: #ccc;
// }
</style>