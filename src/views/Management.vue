<template>
  <div id="management">
    <v-container class="fill-height" fluid>
      <v-row align="start" justify="center">
        <v-col cols="2" xs="4">
          <v-card
              width="256"
              class="mx-auto"
          >
            <v-navigation-drawer permanent>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    后台管理
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list
                  dense
                  nav
              >
                  <v-list-item
                      v-for="item in items"
                      :to="item.link"
                      :key="item.title"
                      link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="10" xs="8">
          <router-view></router-view>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
  export default {
    name: "Management",
    data () {
      return {
        items: [
          { title: '用户信息', icon: 'mdi-card-account-details', link: '/management/user' },
          { title: '新建博客', icon: 'mdi-post', link: '/management/blog/new' }
        ],
        right: null,
      }
    }
  }
</script>

<style scoped>

</style>