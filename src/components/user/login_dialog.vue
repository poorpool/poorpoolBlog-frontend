<template>
  <div>
    <!-- 登录模态框 -->
    <v-dialog v-model="loginDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">登录</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form :lazy-validation="lazy" v-model="valid" ref="loginForm">
              <v-row>
                <v-col cols="24">
                  <v-text-field label="用户名*" required v-model="loginForm.userName" :rules="userNameRules"></v-text-field>
                </v-col>
                <v-col cols="24">
                  <v-text-field label="密码*" type="password" required v-model="loginForm.userPassword" :rules="userPasswordRules" @keyup.enter.native="login"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*为必填项</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="loginDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="login">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <error_dialog ref="errorDialog"></error_dialog>
  </div>
</template>

<script>
  import jwt from 'jwt-decode';
  export default {
    name: "login_dialog",
    data() {
      return {
        valid: true,
        lazy: true,
        loginDialog: false,
        loginForm: {
          userName: '',
          userPassword: ''
        },
        userNameRules: [
          v => !!v || '用户名不能为空'
        ],
        userPasswordRules: [
          v => !!v || '密码不能为空'
        ],
        loginUserId: null
      }
    },
    components: {
      'error_dialog': () => import('../error_dialog.vue')
    },
    methods: {
      login() {
        if (!this.$refs.loginForm.validate()) {
          return false;
        }
        let _this = this;
        let sha512 = require("crypto-js/sha512");
        this.axios({
          method: 'post',
          url: 'http://localhost:8181/user/login',
          data: {
            userName: _this.loginForm.userName,
            userPassword: sha512(_this.loginForm.userPassword).toString()
          }
        }).then(res => {
          if (res.data.code === 100) {
            const token = res.data.data.token;
            localStorage.setItem('blogToken', token);
            const decoded = jwt(token);
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);
            this.$store.dispatch("setToken", token);
            axios.defaults.headers['Authorization'] = "Bearer " + token;
            _this.loginDialog = false;
            this.$router.push('/management');
          } else {
            _this.$refs.errorDialog.show('登录失败', res.data.message);
          }
        }).catch(error => {
          _this.$refs.errorDialog.show('登录异常', '尝试登录失败，可能是服务器异常');
        });
      },
      isEmpty (value) {
        return(
          value ===undefined || value ===null ||
          (typeof  value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      }
    }
  }
</script>

<style scoped>

</style>