<template>
  <div id="navibar">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down"  @click="changeRouter('/')">poorpool's blog</span>
      </v-toolbar-title>
      <v-text-field disabled flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down" dense></v-text-field>
      <v-spacer></v-spacer>
      <v-btn text @click="switchDialog" v-if="!this.$store.state.isAuthenticated">
        <v-icon left>mdi-login</v-icon>登录
      </v-btn>
      <div  v-else>
        <v-btn text @click="changeRouter('/management')">
          <v-icon>mdi-cog-outline</v-icon>
          管理
        </v-btn>
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>登出
        </v-btn>
      </div>
    </v-app-bar>

    <login_dialog ref="logindialog"></login_dialog>

  </div>
</template>

<script>
  export default {
    name: "navibar",
    components: {
      login_dialog: () => import('./user/login_dialog.vue')
    },
    methods: {
      switchDialog() {
        this.$refs.logindialog.loginDialog = !this.$refs.logindialog.loginDialog;
      },
      logout() {
        this.loginUserId = null;
        localStorage.removeItem("blogToken");
        this.$store.dispatch("setAuthenticated", false);
        this.$store.dispatch("setUser", null);
        this.$store.dispatch("setToken", '');
        this.$router.push('/');
      },
      changeRouter(path) {
        this.$router.push(path);
      }
    },
    data() {
      return {
        dialog: false,
        drawer: null,
        items: [
          { icon: 'mdi-home', text: '首页', link: '/' },
          { icon: 'mdi-view-list', text: '分类', link: '#' },
          { icon: 'mdi-label', text: '标签', link: '/label' },
          { icon: 'mdi-help', text: '关于', link: '#' }
        ],
      }
    }
  }
</script>

<style scoped>
  #logo {
    margin-left: 20%;
  }
</style>